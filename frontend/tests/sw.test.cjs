const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");
// Read the current names from the worker so version bumps do not need test edits.
const CACHE = source.match(/const CACHE = "([^"]+)"/)[1], STYLES = source.match(/"(styles\.css\?v=\d+)"/)[1];
const OLD = CACHE.replace(/\d+$/, n => n - 1);
function worker(network, failWrite = false) {
  const handlers = {}, deleted = [], writes = [];
  const cache = {
    addAll: async () => {},
    put: async (request, response) => {
      if (failWrite) throw Error("quota");
      writes.push([request.url, await response.text()]);
    },
    match: async request => request.url?.includes("styles.css") ? new Response("healthy CSS") : undefined,
  };
  vm.runInNewContext(source, {
    self: { addEventListener: (name, fn) => handlers[name] = fn,
      registration: { scope: "https://example.test/kinvia/" }, clients: { claim: async () => {} } },
    location: { origin: "https://example.test" }, URL, Response, fetch: network,
    caches: { open: async () => cache, keys: async () => ["other-app-v1", OLD, CACHE],
      delete: async key => deleted.push(key) },
  });
  return { handlers, deleted, writes };
}

test("activation removes only old Kinvia caches", async () => {
  const w = worker(); let done;
  w.handlers.activate({ waitUntil: promise => done = promise }); await done;
  assert.deepEqual(w.deleted, [OLD]);
});

test("fetch tracks successful shell writes without caching errors or unrelated paths", async () => {
  for (const [status, file, expected] of [[200, STYLES, 1], [500, STYLES, 0], [200, "other.txt", 0]]) {
    const w = worker(async () => new Response("network", { status })); let response;
    const work = [];
    w.handlers.fetch({ request: { method: "GET", mode: "cors", url: "https://example.test/kinvia/" + file },
      waitUntil: promise => work.push(promise), respondWith: promise => response = promise });
    assert.equal((await response).status, status); await Promise.all(work);
    assert.equal(w.writes.length, expected);
    assert.equal(work.length, 1);
  }
});

test("cache write failure still returns the network response; offline assets use their cached type", async () => {
  for (const offline of [false, true]) {
    const w = worker(async () => { if (offline) throw Error("offline"); return new Response("network"); }, true);
    let response; const work = [];
    w.handlers.fetch({ request: { method: "GET", mode: "cors", url: "https://example.test/kinvia/" + STYLES },
      waitUntil: p => work.push(p), respondWith: p => response = p });
    assert.equal(await (await response).text(), offline ? "healthy CSS" : "network");
    await Promise.all(work);
  }
});

test("every versioned page asset is present in the offline shell", () => {
  for (const name of ["index", "try", "desk", "insights"]) {
    const html = fs.readFileSync(path.join(__dirname, `../${name}.html`), "utf8");
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"\s]+\?v=\d+)"/g)) assert.ok(source.includes(`"${asset}"`), asset);
  }
});
