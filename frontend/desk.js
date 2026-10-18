/* Counsellor Desk: escalated sessions from the family-session demo plus marked example tickets. */
(() => {
  const D = KV_DATA;
  const $ = s => document.querySelector(s);
  const DEMO = [
    { id: "T-DEMO1", at: "2026-10-04T10:12:00", lang: "hi", district: "ahmednagar", trade: "solar", schooling: "Class 10 pass", status: "open", demo: true,
      concerns: [{ code: "SAF", speaker: "parent", resolved: false }, { code: "INC", speaker: "parent", resolved: true }, { code: "DIS", speaker: "learner", resolved: true }],
      open: ["SAF"], evidence: ["OUT-AHM-SOL-25"], reason: "Hostel ke baare mein kisi se baat karni hai",
      messages: [{ role: "parent", text: "Beti ke liye hostel safe hai?" }, { role: "kinvia", text: "This record shows women-friendly batches. I’ve marked hostel details for a counsellor." }] },
    { id: "T-DEMO2", at: "2026-10-04T15:40:00", lang: "en", district: "lucknow", trade: "auto", schooling: "Class 12 pass", status: "open", demo: true,
      concerns: [{ code: "STA", speaker: "parent", resolved: true }, { code: "PRG", speaker: "learner", resolved: true }, { code: "CST", speaker: "parent", resolved: false }],
      open: ["CST"], evidence: ["OUT-LUC-AUT-25"], reason: "Wants to know about scholarships before deciding",
      messages: [{ role: "parent", text: "People will say he failed in studies." }, { role: "learner", text: "Can I do a diploma later?" }] },
    { id: "T-DEMO3", at: "2026-10-03T12:05:00", lang: "en", district: "pune", trade: "electrician", schooling: "Class 10 pass", status: "resolved", demo: true,
      concerns: [{ code: "INC", speaker: "parent", resolved: true }], open: [], evidence: ["OUT-PUN-ELE-25"], reason: "Confirmed admission dates", messages: [] },
  ];

  // What the counsellor should have ready before calling, per unanswered concern.
  const BRIEF = {
    INC: "Bring the district earnings band and its record id. Quote the range, never a single promised figure.",
    STA: "Offer an alumni contact in the same trade, and name local employers who hire from this centre.",
    SAF: "Confirm hostel, batch timings and women-only batches with the centre before you call.",
    PRG: "Walk through the NSQF level-up and diploma lateral entry, with admission dates.",
    CST: "Check PMKVY empanelment for the centre and whether this family qualifies for a stipend.",
    JOB: "Bring current placement and apprenticeship openings at the centre.",
    DIS: "Check transport support under Common Norms and any nearer centre for the same trade.",
    REQ: "The family asked for a person without naming a concern. Open by asking what prompted it.",
  };

  let filter = "open", selected = null, query = "", sort = "priority";
  const load = () => {
    const real = KV.get("kinvia.desk", []);
    const statuses = KV.get("kinvia.deskStatus", {});
    return [...real, ...DEMO].map(t => ({ ...t, status: statuses[t.id] || t.status }));
  };
  const label = c => D.OBJECTIONS[c]?.en ?? "Counsellor request";
  const when = iso => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  const days = iso => (Date.now() - new Date(iso).getTime()) / 864e5;
  function waited(iso) {
    const d = days(iso);
    if (d < 1 / 24) return "just now";
    if (d < 1) return `${Math.round(d * 24)} h waiting`;
    return `${Math.floor(d)} day${Math.floor(d) === 1 ? "" : "s"} waiting`;
  }

  // Triage the counsellor can argue with: a named reason, not an opaque score.
  function priority(t) {
    if (t.status === "resolved") return null;
    const open = t.open || [], d = days(t.at);
    if (open.includes("SAF")) return { k: "now", label: "Call first", why: "a safety concern is unanswered" };
    if (open.length && d >= 3) return { k: "now", label: "Call first", why: `unanswered for ${Math.floor(d)} days` };
    if (open.length) return { k: "soon", label: "Call soon", why: `${open.length} concern${open.length > 1 ? "s" : ""} unanswered` };
    return { k: "low", label: "No open concerns", why: "the family still asked for a person" };
  }
  const RANK = { now: 0, soon: 1, low: 2 };

  function visible() {
    const q = query.trim().toLowerCase();
    let list = load().filter(t => filter === "all" || t.status === (filter === "active" ? "active" : "open"));
    if (q) list = list.filter(t => [t.id, D.trade(t.trade)?.en, D.district(t.district)?.en, t.reason, t.schooling]
      .filter(Boolean).join(" ").toLowerCase().includes(q));
    const by = {
      priority: (a, b) => (RANK[priority(a)?.k] ?? 3) - (RANK[priority(b)?.k] ?? 3) || new Date(a.at) - new Date(b.at),
      wait: (a, b) => new Date(a.at) - new Date(b.at),
      new: (a, b) => new Date(b.at) - new Date(a.at),
    };
    return list.sort(by[sort]);
  }

  function renderList() {
    const all = load();
    const counts = { open: 0, active: 0, resolved: 0 };
    all.forEach(t => { counts[t.status] = (counts[t.status] || 0) + 1; });
    const urgent = all.filter(t => priority(t)?.k === "now").length;
    $("#qcounts").innerHTML = `${counts.open} open · ${counts.active} in progress · ${counts.resolved} resolved` +
      (urgent ? ` <span class="tag tag-verm">${urgent} need calling first</span>` : "");

    const list = visible();
    if (!list.some(t => t.id === selected)) selected = list.length ? list[0].id : null;
    $("#tickets").innerHTML = list.length ? list.map(t => {
      const p = priority(t);
      return `<button class="ticket" type="button" data-id="${t.id}" aria-pressed="${t.id === selected}">
        <span class="t-top"><span>${KV.esc(D.trade(t.trade)?.en || "Trade not chosen")} · ${KV.esc(D.district(t.district)?.en || "")}</span><span class="tag ${t.status === "open" ? "tag-verm" : t.status === "active" ? "tag-mari" : "tag-leaf"}">${t.status === "active" ? "in progress" : t.status}</span></span>
        ${p ? `<span class="prio p-${p.k}">${p.label} — ${p.why}</span>` : ""}
        <span class="tiny">${t.id} · ${waited(t.at)}${t.demo ? " · demo" : ""}</span>
        <span style="display:flex;gap:6px;flex-wrap:wrap">${(t.open.length ? t.open : ["REQ"]).map(c => `<span class="tag tag-mari">${label(c)}</span>`).join("")}</span>
      </button>`;
    }).join("") : `<p class="tiny">${query ? "Nothing matches that search." : "No escalations here. Start a <a href=\"try.html\">family session</a> and choose “Talk to a counsellor”."}</p>`;
    document.querySelectorAll("#tickets [data-id]").forEach(b => b.addEventListener("click", () => {
      selected = b.dataset.id;
      renderList();
      // On a phone the detail panel sits below the queue, so bring it into view.
      if (window.matchMedia("(max-width: 1000px)").matches) $("#detail").scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    renderDetail(load().find(t => t.id === selected));
  }

  function renderDetail(t) {
    const el = $("#detail");
    if (!t) { el.innerHTML = `<h2>Select a family</h2><p class="muted">Pick a ticket from the queue.</p>`; return; }
    const evidence = t.evidence.map(id => D.OUTCOMES.find(o => o.id === id)).filter(Boolean);
    const p = priority(t);
    const openCodes = t.open.length ? t.open : ["REQ"];
    const notes = KV.get("kinvia.deskNotes", {})[t.id];
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:start">
        <div><span class="eyebrow">${t.id}${t.demo ? " · demo ticket" : ""}</span><h2 style="margin-top:4px">${KV.esc(D.trade(t.trade)?.en || "Trade not chosen")} · ${KV.esc(D.district(t.district)?.en || "")}</h2>
        <p class="tiny">${when(t.at)} · ${waited(t.at)} · Language: ${t.lang === "hi" ? "Hindi" : "English"} · Learner: ${KV.esc(t.schooling || "—")}</p></div>
        <div class="d-actions">
          <button class="btn btn-ghost btn-sm" type="button" id="copy">Copy summary</button>
          ${t.status !== "active" && t.status !== "resolved" ? `<button class="btn btn-ghost btn-sm" type="button" id="claim">Start calling</button>` : ""}
          <button class="btn ${t.status === "resolved" ? "btn-ghost" : "btn-primary"} btn-sm" type="button" id="toggle">${t.status === "resolved" ? "Reopen" : "Mark resolved"}</button>
        </div>
      </div>
      ${p ? `<p class="prio-bar p-${p.k}"><b>${p.label}</b> — ${p.why}</p>` : ""}
      <h3 style="margin-top:18px">Why they asked for you</h3>
      <p class="muted">${KV.esc(t.reason || "Family requested a counsellor.")}</p>
      <h3 style="margin-top:18px">Before you call</h3>
      <ul class="brief">${openCodes.map(c => `<li><span>${label(c)}</span>${KV.esc(BRIEF[c] || BRIEF.REQ)}</li>`).join("")}</ul>
      <h3 style="margin-top:18px">Concerns, by speaker</h3>
      <div class="objlist">${t.concerns.length ? t.concerns.map(c => `<div class="objitem"><span><span class="who-mark">${c.speaker === "learner" ? "Learner" : "Parent"}</span>${label(c.code)}</span><span class="tag ${c.resolved ? "tag-leaf" : "tag-verm"}">${c.resolved ? "answered by Kinvia" : "needs you"}</span></div>`).join("") : `<p class="tiny">No concerns tagged.</p>`}</div>
      <h3 style="margin-top:18px">Evidence already shown</h3>
      <div style="display:grid;gap:14px;margin-top:6px">${evidence.length ? evidence.map(r => `<div class="evidence"><span class="seal">VERIFIED · DEMO</span>
        <div class="ev-head"><span class="ev-title">${D.trade(r.trade).en} · ${D.district(r.district).en} · ${KV.esc(r.provider)}</span></div>
        <div class="ev-figs"><div class="ev-fig"><b>${KV.inr(r.p25)}–${KV.inr(r.p75)}</b><span>monthly, year one</span></div><div class="ev-fig"><b>${r.placement}%</b><span>placed in 6 months</span></div></div>
        <div class="ev-src"><span>${r.id}</span><span>n = ${r.n}</span><span>as of ${r.asOf}</span><span>synthetic demo data</span></div></div>`).join("") : `<p class="tiny">No records shown yet.</p>`}</div>
      <h3 style="margin-top:18px">Last messages</h3>
      <div style="display:flex;flex-direction:column;gap:8px">${t.messages.length ? t.messages.map(m => `<div class="bubble ${m.role}" style="animation:none"><span class="who">${m.role}</span>${KV.esc(m.text)}</div>`).join("") : `<p class="tiny">No transcript kept for this ticket.</p>`}</div>
      <h3 style="margin-top:18px">Your notes</h3>
      <textarea id="notes" class="notes" rows="3" placeholder="What you agreed, what you promised to send, when you will call back…">${KV.esc(notes?.text || "")}</textarea>
      <div class="notes-row"><button class="btn btn-ghost btn-sm" type="button" id="savenote">Save note</button>
        <span class="tiny" id="noteat">${notes?.at ? "Saved " + when(notes.at) : "Not saved yet"}</span></div>
      <p class="tiny" style="margin-top:16px">Counsellors see escalated sessions only. Administrators never see this view.</p>`;

    const setStatus = s => {
      const st = KV.get("kinvia.deskStatus", {});
      st[t.id] = s; KV.set("kinvia.deskStatus", st); renderList();
    };
    $("#toggle").addEventListener("click", () => setStatus(t.status === "resolved" ? "open" : "resolved"));
    $("#claim")?.addEventListener("click", () => setStatus("active"));

    const saveNote = () => {
      const all = KV.get("kinvia.deskNotes", {});
      const text = $("#notes").value.trim();
      if (text) all[t.id] = { text, at: new Date().toISOString() }; else delete all[t.id];
      KV.set("kinvia.deskNotes", all);
      $("#noteat").textContent = text ? "Saved " + when(all[t.id].at) : "Not saved yet";
    };
    $("#savenote").addEventListener("click", saveNote);
    $("#notes").addEventListener("blur", saveNote);

    $("#copy").addEventListener("click", async () => {
      const lines = [
        `${t.id} · ${D.trade(t.trade)?.en || "Trade not chosen"} · ${D.district(t.district)?.en || ""}`,
        `${when(t.at)} · ${waited(t.at)} · ${t.lang === "hi" ? "Hindi" : "English"} · ${t.schooling || "—"}`,
        p ? `Priority: ${p.label} (${p.why})` : "",
        `Reason: ${t.reason || "Family requested a counsellor."}`,
        `Concerns: ${t.concerns.map(c => `${label(c.code)} [${c.speaker}] ${c.resolved ? "answered" : "NEEDS YOU"}`).join("; ") || "none tagged"}`,
        `Evidence shown: ${evidence.map(r => `${r.id} ${KV.inr(r.p25)}–${KV.inr(r.p75)}, ${r.placement}%`).join("; ") || "none"}`,
        notes?.text ? `Notes: ${notes.text}` : "",
        "Figures are synthetic demo records.",
      ].filter(Boolean).join("\n");
      const btn = $("#copy");
      try { await navigator.clipboard.writeText(lines); btn.textContent = "Copied"; }
      catch { btn.textContent = "Press Ctrl+C"; const ta = $("#notes"); ta.focus(); }
      setTimeout(() => { btn.textContent = "Copy summary"; }, 1800);
    });
  }

  document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
    filter = b.dataset.filter; selected = null;
    document.querySelectorAll("[data-filter]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    renderList();
  }));
  $("#q").addEventListener("input", e => { query = e.target.value; renderList(); });
  $("#sort").addEventListener("change", e => { sort = e.target.value; renderList(); });
  renderList();
})();
