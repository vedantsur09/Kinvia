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

  let filter = "open", selected = null;
  const load = () => {
    const real = KV.get("kinvia.desk", []);
    const statuses = KV.get("kinvia.deskStatus", {});
    return [...real, ...DEMO].map(t => ({ ...t, status: statuses[t.id] || t.status }));
  };
  const label = c => D.OBJECTIONS[c]?.en ?? "Counsellor request";
  const when = iso => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  function renderList() {
    const list = load().filter(t => filter === "all" || t.status === "open");
    if (!selected && list.length) selected = list[0].id;
    $("#tickets").innerHTML = list.length ? list.map(t => `
      <button class="ticket" type="button" data-id="${t.id}" aria-pressed="${t.id === selected}">
        <span class="t-top"><span>${KV.esc(D.trade(t.trade)?.en || "Trade not chosen")} · ${KV.esc(D.district(t.district)?.en || "")}</span><span class="tag ${t.status === "open" ? "tag-verm" : "tag-leaf"}">${t.status}</span></span>
        <span class="tiny">${t.id} · ${when(t.at)} ${t.demo ? "· demo" : ""}</span>
        <span style="display:flex;gap:6px;flex-wrap:wrap">${(t.open.length ? t.open : ["REQ"]).map(c => `<span class="tag tag-mari">${label(c)}</span>`).join("")}</span>
      </button>`).join("") : `<p class="tiny">No open escalations. Start a <a href="try.html">family session</a> and choose “Talk to a counsellor”.</p>`;
    document.querySelectorAll("#tickets [data-id]").forEach(b => b.addEventListener("click", () => { selected = b.dataset.id; renderList(); }));
    renderDetail(load().find(t => t.id === selected));
  }

  function renderDetail(t) {
    const el = $("#detail");
    if (!t) { el.innerHTML = `<h2>Select a family</h2><p class="muted">Pick a ticket from the queue.</p>`; return; }
    const evidence = t.evidence.map(id => D.OUTCOMES.find(o => o.id === id)).filter(Boolean);
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:start">
        <div><span class="eyebrow">${t.id}${t.demo ? " · demo ticket" : ""}</span><h2 style="margin-top:4px">${KV.esc(D.trade(t.trade)?.en || "Trade not chosen")} · ${KV.esc(D.district(t.district)?.en || "")}</h2>
        <p class="tiny">${when(t.at)} · Language: ${t.lang === "hi" ? "Hindi" : "English"} · Learner: ${KV.esc(t.schooling || "—")}</p></div>
        <button class="btn ${t.status === "open" ? "btn-primary" : "btn-ghost"} btn-sm" type="button" id="toggle">${t.status === "open" ? "Mark resolved" : "Reopen"}</button>
      </div>
      <h3 style="margin-top:18px">Why they asked for you</h3>
      <p class="muted">${KV.esc(t.reason || "Family requested a counsellor.")}</p>
      <h3 style="margin-top:18px">Concerns, by speaker</h3>
      <div class="objlist">${t.concerns.length ? t.concerns.map(c => `<div class="objitem"><span><span class="who-mark">${c.speaker === "learner" ? "Learner" : "Parent"}</span>${label(c.code)}</span><span class="tag ${c.resolved ? "tag-leaf" : "tag-verm"}">${c.resolved ? "answered by Kinvia" : "needs you"}</span></div>`).join("") : `<p class="tiny">No concerns tagged.</p>`}</div>
      <h3 style="margin-top:18px">Evidence already shown</h3>
      <div style="display:grid;gap:14px;margin-top:6px">${evidence.length ? evidence.map(r => `<div class="evidence"><span class="seal">VERIFIED · DEMO</span>
        <div class="ev-head"><span class="ev-title">${D.trade(r.trade).en} · ${D.district(r.district).en} · ${KV.esc(r.provider)}</span></div>
        <div class="ev-figs"><div class="ev-fig"><b>${KV.inr(r.p25)}–${KV.inr(r.p75)}</b><span>monthly, year one</span></div><div class="ev-fig"><b>${r.placement}%</b><span>placed in 6 months</span></div></div>
        <div class="ev-src"><span>${r.id}</span><span>n = ${r.n}</span><span>as of ${r.asOf}</span><span>synthetic demo data</span></div></div>`).join("") : `<p class="tiny">No records shown yet.</p>`}</div>
      <h3 style="margin-top:18px">Last messages</h3>
      <div style="display:flex;flex-direction:column;gap:8px">${t.messages.length ? t.messages.map(m => `<div class="bubble ${m.role}" style="animation:none"><span class="who">${m.role}</span>${KV.esc(m.text)}</div>`).join("") : `<p class="tiny">No transcript kept for this ticket.</p>`}</div>
      <p class="tiny" style="margin-top:16px">Counsellors see escalated sessions only. Administrators never see this view.</p>`;
    $("#toggle").addEventListener("click", () => {
      const st = KV.get("kinvia.deskStatus", {});
      st[t.id] = t.status === "open" ? "resolved" : "open";
      KV.set("kinvia.deskStatus", st);
      renderList();
    });
  }

  document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
    filter = b.dataset.filter; selected = null;
    document.querySelectorAll("[data-filter]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    renderList();
  }));
  renderList();
})();
