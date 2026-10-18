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

  function render() {
    const st = $("#state").value;
    const agg = data();
    const ds = D.DISTRICTS.filter(d => st === "all" || d.state === st);
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
    $("#heat").innerHTML = `<span></span>${CODES.map(c => `<span class="h">${D.OBJECTIONS[c].en}</span>`).join("")}` +
      ds.map(d => `<span class="d">${d.en}<br><span class="tiny">${agg[d.id].sessions} sessions</span></span>` + CODES.map(c => {
        const v = share(d, c), pct = Math.round(v * 100), k = Math.round((v / max) * 85);
        return `<span class="c" style="background:color-mix(in srgb, var(--violet) ${k}%, transparent);color:${k > 58 ? "#fff" : "var(--ink)"}" title="${d.en} · ${D.OBJECTIONS[c].en}: ${pct}% of sessions">${pct}%</span>`;
      }).join("")).join("");

    const topMax = sums[top[0]];
    $("#bars").innerHTML = top.map(c => `<div class="hbar"><span>${D.OBJECTIONS[c].en}</span><div class="bar"><i style="width:${(sums[c] / topMax) * 100}%"></i></div><span class="v">${sums[c]}</span></div>`).join("");

    $("#shift").innerHTML = ds.map(d => {
      const a = agg[d.id], l = ((a.before - 1) / 4) * 100, r = ((a.after - 1) / 4) * 100;
      return `<div class="shift-row"><span>${d.en}</span><div class="shift-track"><i style="left:${l}%;width:${r - l}%"></i><b style="left:${l}%;background:var(--clay)"></b><b style="left:${r}%;background:var(--gold)"></b></div><span class="mono tiny">${a.before.toFixed(1)} → ${a.after.toFixed(1)}</span></div>`;
    }).join("");

    $("#actions").innerHTML = ds.map(d => {
      const c = CODES.slice().sort((x, y) => share(d, y) - share(d, x))[0];
      return `<div class="objitem"><span><b style="font-weight:600">${d.en}</b> · ${D.OBJECTIONS[c].en} raised in ${Math.round(share(d, c) * 100)}% of sessions</span><span class="tag tag-mari">${ACTIONS[c]}</span></div>`;
    }).join("");
  }

  $("#state").addEventListener("change", render);
  render();
})();
