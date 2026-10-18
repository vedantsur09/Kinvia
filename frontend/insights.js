/* Scheme Insights: synthetic district aggregates plus sessions completed in this browser. */
(() => {
  const D = KV_DATA;
  const $ = s => document.querySelector(s);
  const CODES = Object.keys(D.OBJECTIONS);

  function data() {
    const agg = JSON.parse(JSON.stringify(D.INSIGHTS));
    KV.get("kinvia.sessions", []).forEach(s => {
      const a = agg[s.district]; if (!a) return;
      const n = a.sessions;
      a.before = (a.before * n + s.before) / (n + 1);
      a.after = (a.after * n + s.after) / (n + 1);
      a.sessions = n + 1;
      new Set(s.codes).forEach(c => { if (c in a) a[c] += 1; });
    });
    return agg;
  }

  const ACTIONS = {
    INC: "Share district earnings cards at school parent meetings",
    STA: "Run alumni talks with local trainees to counter stigma",
    SAF: "Publicise women-only batches, hostels and transport support",
    PRG: "Explain NSQF level-ups and diploma lateral entry",
    CST: "Promote free PMKVY training and apprenticeship stipends",
    JOB: "Bring employers and apprenticeship offers to centres",
    DIS: "Map transport support and nearer centres",
  };

  let focus = null; // a concern code the administrator has singled out

  function scope() {
    const v = $("#state").value;
    if (v === "all") return D.DISTRICTS;
    if (v.startsWith("d:")) return D.DISTRICTS.filter(d => d.id === v.slice(2));
    return D.DISTRICTS.filter(d => d.state === v);
  }

  function renderAreas() {
    const byState = {};
    D.DISTRICTS.forEach(d => (byState[d.state] ||= []).push(d));
    $("#state").innerHTML = `<option value="all">All areas</option>` +
      Object.entries(byState).map(([s, list]) =>
        `<option value="${KV.esc(s)}">${KV.esc(s)} — all districts</option>` +
        list.map(d => `<option value="d:${d.id}">&nbsp;&nbsp;${KV.esc(d.en)}</option>`).join("")).join("");
  }

  function render() {
    const agg = data();
    const ds = scope();
    const total = ds.reduce((s, d) => s + agg[d.id].sessions, 0);
    const sums = Object.fromEntries(CODES.map(c => [c, ds.reduce((s, d) => s + agg[d.id][c], 0)]));
    const top = CODES.slice().sort((a, b) => sums[b] - sums[a]);
    const before = ds.reduce((s, d) => s + agg[d.id].before * agg[d.id].sessions, 0) / total;
    const after = ds.reduce((s, d) => s + agg[d.id].after * agg[d.id].sessions, 0) / total;
    const live = KV.get("kinvia.sessions", []).length;

    $("#kpis").innerHTML = `
      <div class="kpi"><b>${total.toLocaleString("en-IN")}</b><span>family sessions${live ? ` · ${live} from this browser` : ""}</span></div>
      <div class="kpi"><b>${D.OBJECTIONS[top[0]].en}</b><span>most common concern</span></div>
      <div class="kpi"><b>+${(after - before).toFixed(1)}</b><span>average confidence shift (1–5)</span></div>
      <div class="kpi"><b>${ds.length}</b><span>districts reporting</span></div>`;

    // Heatmap: share of sessions raising each concern
    let max = 0;
    const share = (d, c) => agg[d.id][c] / agg[d.id].sessions;
    ds.forEach(d => CODES.forEach(c => { max = Math.max(max, share(d, c)); }));
    const shade = v => Math.round((v / max) * 85);
    $("#heat").innerHTML = `<span></span>${CODES.map(c => `<button type="button" class="h" data-focus="${c}" aria-pressed="${focus === c}">${D.OBJECTIONS[c].en}</button>`).join("")}` +
      ds.map(d => `<span class="d">${d.en}<br><span class="tiny">${agg[d.id].sessions} sessions</span></span>` + CODES.map(c => {
        const v = share(d, c), pct = Math.round(v * 100), k = shade(v);
        const dim = focus && focus !== c;
        return `<span class="c${dim ? " dim" : ""}" style="background:color-mix(in srgb, var(--violet) ${k}%, transparent);color:${k > 58 ? "#fff" : "var(--ink)"}">
          <span class="vh">${d.en}, ${D.OBJECTIONS[c].en}: </span>${pct}%</span>`;
      }).join("")).join("");
    document.querySelectorAll("#heat [data-focus]").forEach(b => b.addEventListener("click", () => {
      focus = focus === b.dataset.focus ? null : b.dataset.focus;
      render();
    }));

    // A scale, so a shade can actually be read as a number.
    $("#legend").innerHTML = `<span class="tiny">Share of sessions</span>` +
      [0, .25, .5, .75, 1].map(f => `<span class="sw" style="background:color-mix(in srgb, var(--violet) ${Math.round(f * 85)}%, transparent)"></span>`).join("") +
      `<span class="tiny">0% – ${Math.round(max * 100)}%</span>` +
      (focus ? `<button type="button" class="chip" id="clearfocus">Clear focus: ${D.OBJECTIONS[focus].en}</button>` : "");
    $("#clearfocus")?.addEventListener("click", () => { focus = null; render(); });

    // Need score: how widely concerns are raised, less how far the session moves confidence.
    const need = ds.map(d => {
      const a = agg[d.id];
      const raised = CODES.reduce((s, c) => s + share(d, c), 0) / CODES.length;
      const lift = (a.after - a.before) / 4;
      const worst = CODES.slice().sort((x, y) => share(d, y) - share(d, x))[0];
      return { d, score: raised * 100 - lift * 40, raised, lift, worst, sessions: a.sessions };
    }).sort((a, b) => b.score - a.score);
    $("#priority").innerHTML = need.map((n, i) => `
      <div class="pri-row">
        <span class="pri-rank">${i + 1}</span>
        <div><b>${n.d.en}</b> <span class="tiny">· ${n.d.state} · ${n.sessions} sessions</span>
          <p class="tiny">${D.OBJECTIONS[n.worst].en} raised in ${Math.round(share(n.d, n.worst) * 100)}% of sessions · confidence moves +${((n.lift) * 4).toFixed(1)} of 4</p></div>
        <span class="tag ${i === 0 ? "tag-verm" : i < 3 ? "tag-mari" : "tag-leaf"}">${i === 0 ? "highest need" : i < 3 ? "watch" : "steady"}</span>
      </div>`).join("");

    const topMax = sums[top[0]];
    $("#bars").innerHTML = top.map(c => `<div class="hbar"><span>${D.OBJECTIONS[c].en}</span><div class="bar"><i style="width:${(sums[c] / topMax) * 100}%"></i></div><span class="v">${sums[c]}</span></div>`).join("");

    $("#shift").innerHTML = ds.map(d => {
      const a = agg[d.id], l = ((a.before - 1) / 4) * 100, r = ((a.after - 1) / 4) * 100;
      return `<div class="shift-row"><span>${d.en}</span><div class="shift-track"><i style="left:${l}%;width:${r - l}%"></i><b style="left:${l}%;background:var(--clay)"></b><b style="left:${r}%;background:var(--gold)"></b></div><span class="mono tiny">${a.before.toFixed(1)} → ${a.after.toFixed(1)}</span></div>`;
    }).join("");

    // With a concern focused, outreach answers "what do we do about this one, everywhere".
    $("#actnote").textContent = focus ? `Focused on ${D.OBJECTIONS[focus].en}` : "Each district's most-raised concern";
    $("#actions").innerHTML = ds.map(d => {
      const c = focus || CODES.slice().sort((x, y) => share(d, y) - share(d, x))[0];
      return `<div class="objitem"><span><b style="font-weight:600">${d.en}</b> · ${D.OBJECTIONS[c].en} raised in ${Math.round(share(d, c) * 100)}% of sessions</span><span class="tag tag-mari">${ACTIONS[c]}</span></div>`;
    }).join("");

    // Officials work in spreadsheets; hand them the numbers behind the view.
    lastCsv = [
      ["District", "State", "Sessions", ...CODES.map(c => `${D.OBJECTIONS[c].en} (%)`), "Confidence before", "Confidence after"],
      ...ds.map(d => [d.en, d.state, agg[d.id].sessions, ...CODES.map(c => Math.round(share(d, c) * 100)),
        agg[d.id].before.toFixed(2), agg[d.id].after.toFixed(2)]),
    ].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  }

  let lastCsv = "";
  function exportCsv() {
    const url = URL.createObjectURL(new Blob(["﻿" + lastCsv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.download = `kinvia-insights-${new Date().toISOString().slice(0, 10)}.csv`;
    a.href = url; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  $("#state").addEventListener("change", render);
  $("#csv").addEventListener("click", exportCsv);
  $("#printbtn").addEventListener("click", () => window.print());
  renderAreas();
  render();
})();
