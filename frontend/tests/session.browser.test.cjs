const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium, webkit } = require("playwright");

let server, browser, origin, disconnected = false;
before(async () => {
  const root = path.resolve(__dirname, "..");
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json" };
  server = http.createServer(async (req, res) => {
    if (disconnected) { req.socket.destroy(); return; }
    const file = path.resolve(root, "." + new URL(req.url, "http://localhost").pathname.replace(/\/$/, "/index.html"));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { res.setHeader("Content-Type", types[path.extname(file)] || "text/plain"); res.end(await fs.readFile(file)); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  const engine = process.env.BROWSER_ENGINE === "webkit" ? webkit : chromium;
  browser = await engine.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
});
after(async () => { await browser?.close(); if (server) await new Promise(resolve => server.close(resolve)); });

async function visit(run, { init, pageName = "try", viewport = { width: 1280, height: 900 }, serviceWorkers = "block" } = {}) {
  const context = await browser.newContext({ viewport, serviceWorkers, acceptDownloads: true });
  // Keep all regression traffic local, including the existing Google Fonts links.
  await context.route("**/*", route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  if (init) await context.addInitScript(init);
  const page = await context.newPage(), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  try { await page.goto(`${origin}/${pageName}.html`); await run(page); assert.deepEqual(errors, []); }
  finally { await context.close(); }
}
async function start(page, saving = false) {
  if (saving) await page.locator("#consent-ok").check();
  await page.locator(saving ? "#consent-go" : "#consent-guest").click();
}
async function settled(page) {
  await page.waitForFunction(() => !document.querySelector(".typing") && document.querySelector("[data-pick]"));
}
async function submit(page, text) {
  await page.locator("#msg").fill(text); await page.locator('#form [type="submit"]').click();
}

test("legacy conversation copies are purged at every public entry, including old Desk notes", async () => {
  for (const pageName of ["index", "try", "desk", "insights"]) await visit(async page => {
    assert.equal(await page.evaluate(() => ["kinvia.active", "kinvia.desk", "kinvia.deskNotes"].every(k => localStorage.getItem(k) === null)), true);
    assert.equal(await page.locator("body").innerText().then(t => t.includes("SYNTHETIC-PRIVATE-MARKER")), false);
  }, { pageName, init: () => {
    for (const k of ["kinvia.active", "kinvia.desk", "kinvia.deskNotes"]) localStorage.setItem(k, JSON.stringify({ messages: ["SYNTHETIC-PRIVATE-MARKER"], html: "<img src=x onerror=alert(1)>" }));
  } });
});

test("guest and consented chat retain exports and evidence without durable conversation text", async () => {
  for (const saving of [false, true]) await visit(async page => {
    await start(page, saving); await settled(page);
    await page.locator('[data-pick="electrician"]').click();
    assert.notEqual(await page.locator("#twopath .bar i").nth(1).evaluate(el => getComputedStyle(el).backgroundColor), "rgba(0, 0, 0, 0)");
    await submit(page, "Will he earn enough? SYNTHETIC-FAMILY-MARKER <svg onload=alert(1)>");
    await page.waitForFunction(() => document.querySelector("#log .evidence"));
    const download = page.waitForEvent("download"); await page.locator("#transcript").click();
    const transcript = await (await download).createReadStream();
    let text = ""; for await (const chunk of transcript) text += chunk;
    assert.match(text, /SYNTHETIC-FAMILY-MARKER/);
    await page.locator("#escalate").click();
    await page.waitForFunction(() => document.querySelector("#log").textContent.includes("no message has been sent"));
    await page.locator("#trustbtn").click();
    assert.equal(await page.locator("#trustmodal").evaluate(el => el.open), true);
    assert.match(await page.locator("#wa").getAttribute("href"), /^https:\/\/wa.me\//);
    const image = page.waitForEvent("download"); await page.locator("#dl").click();
    assert.match((await image).suggestedFilename(), /\.png$/);
    const stored = await page.evaluate(() => JSON.stringify({ ...localStorage }));
    assert.doesNotMatch(stored, /SYNTHETIC-FAMILY-MARKER|messages|html|kinvia\.active|kinvia\.desk"/);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("kinvia.sessions") || "[]").length), saving ? 1 : 0);
    await page.locator("#trustclose").click();
    await page.reload();
    assert.equal(await page.locator("#log").innerText(), "");
    assert.equal(await page.locator("#consent-resume").count(), 0);
    await page.goto(`${origin}/desk.html`);
    assert.equal(await page.locator(".ticket").count(), 2);
    assert.doesNotMatch(await page.locator("body").innerText(), /SYNTHETIC-FAMILY-MARKER/);
    await page.locator("#toggle").click();
    assert.equal(await page.locator("#toggle").innerText(), "Reopen");
    await page.locator("#toggle").click();
    assert.equal(await page.locator("#toggle").innerText(), "Mark resolved");
    await page.goto(`${origin}/insights.html`);
    assert.equal((await page.locator("#kpis").innerText()).includes("from this browser"), saving);
  });
});

test("unavailable storage reports failed cleanup and writes without disabling guest counselling", async () => {
  await visit(async page => {
    assert.match(await page.locator("#legacy-storage-status").innerText(), /could not be cleared/);
    await page.locator('#consent [data-lang="hi"]').click();
    assert.match(await page.locator("#storage-status").innerText(), /सहेजा नहीं/);
    await start(page); await settled(page);
  }, { init: () => {
    for (const name of ["getItem", "setItem", "removeItem"]) Storage.prototype[name] = () => { throw new DOMException("denied", "SecurityError"); };
  } });
  await visit(async page => {
    await page.locator("#toggle").click();
    assert.match(await page.locator("#storage-status").innerText(), /not saved/);
    assert.equal(await page.locator("#toggle").innerText(), "Mark resolved");
  }, { pageName: "desk", init: () => { Storage.prototype.setItem = () => { throw new DOMException("full", "QuotaExceededError"); }; } });
  await visit(async page => {
    await start(page, true); await settled(page); await submit(page, "What will it cost?");
    await page.locator("#trustbtn").click();
    assert.match(await page.locator("#storage-status").innerText(), /Not saved/);
  }, { init: () => { Storage.prototype.setItem = () => { throw new DOMException("full", "QuotaExceededError"); }; } });
});

test("restart cancels queued replies, microphone callbacks, drafts and generated cards", async () => {
  await visit(async page => {
    await start(page); await settled(page);
    await page.locator("#trustbtn").click(); await page.locator("#trustclose").click();
    await page.locator("#mic").click();
    await submit(page, "What will it cost?");
    await page.locator("#msg").fill("UNSENT-PRIVATE-DRAFT");
    await page.locator("#restart").click();
    await page.evaluate(() => window.lateSpeech({ results: [{ 0: { transcript: "STALE-MIC-RESULT" }, isFinal: true }] }));
    await page.waitForTimeout(2200);
    assert.equal(await page.locator("#log").innerText(), "");
    assert.equal(await page.locator("#msg").inputValue(), "");
    assert.equal(await page.locator("#trustcard").innerText(), "");
    assert.equal(await page.locator("#wa").getAttribute("href"), null);
    assert.equal(await page.evaluate(() => window.micAborted), true);
    await start(page); await settled(page);
    assert.doesNotMatch(await page.locator("#log").innerText(), /STALE-MIC|PM Internship/);
  }, { init: () => {
    window.SpeechRecognition = class {
      start() { window.lateSpeech = this.onresult; }
      abort() { window.micAborted = true; }
    };
  } });
});

test("consent and Trust Card contain keyboard focus and retain reachable mobile actions", async () => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 375, height: 600 }]) await visit(async page => {
    assert.equal(await page.evaluate(() => document.activeElement.closest("#consent") !== null), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#consent").evaluate(el => el.open), true);
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press(i % 2 ? "Shift+Tab" : "Tab");
      assert.equal(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest("#consent")), true);
    }
    await start(page); await settled(page);
    await page.locator("#trustbtn").click();
    await page.evaluate(() => document.querySelector("#restart").focus());
    assert.notEqual(await page.evaluate(() => document.activeElement.id), "restart");
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest("#trustmodal")), true);
    }
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#trustmodal").evaluate(el => el.open), false);
    await page.waitForFunction(() => document.activeElement.id === "trustbtn");
    assert.equal(await page.evaluate(() => document.activeElement.id), "trustbtn");
  }, { viewport });
});

test("page departure and back-forward restoration clear the previous conversation", async () => {
  await visit(async page => {
    await start(page); await settled(page); await submit(page, "SYNTHETIC-BACK-FORWARD-MARKER");
    await page.goto(`${origin}/desk.html`); await page.goBack();
    assert.equal(await page.locator("#log").innerText(), "");
    assert.equal(await page.locator("#consent").evaluate(el => el.open), true);
    await start(page); await settled(page); await submit(page, "SYNTHETIC-RESTORE-MARKER");
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
    assert.equal(await page.locator("#log").innerText(), "");
  });
});

test("malformed stored settings and summaries do not break the pages", async () => {
  for (const pageName of ["try", "desk", "insights"]) await visit(async page => {
    assert.equal(await page.locator("h1").count(), 1);
    if (pageName === "try") { await start(page); await settled(page); }
  }, { pageName, init: () => {
    localStorage.setItem("kinvia.lang", '"unknown"');
    localStorage.setItem("kinvia.sessions", JSON.stringify([null, { id: "bad", district: "pune", codes: null }]));
    localStorage.setItem("kinvia.deskStatus", "null");
  } });
});

test("registered service worker retains the working shell offline", async () => {
  await visit(async page => {
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.waitForFunction(() => navigator.serviceWorker.controller);
    await page.reload(); disconnected = true;
    try {
      await page.goto(`${origin}/desk.html`);
      assert.equal(await page.locator(".ticket").count(), 2);
    } finally { disconnected = false; }
  }, { pageName: "index", serviceWorkers: "allow" });
});
