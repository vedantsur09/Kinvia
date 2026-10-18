/* Thin-line icon set, drawn to echo the trade icons inside the Kinvia gear mark.
   1.5px strokes on a 24-grid, currentColor, no fills. */
const KV_ICON = (() => {
  const s = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    // trades
    electrician: s('<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>'),
    fitter: s('<path d="M14.7 6.3a4 4 0 0 1 5.4 5.2l-8.8 8.8a2.1 2.1 0 0 1-3-3l8.8-8.8a1 1 0 0 0-1.3-1.5"/><path d="M6.8 3.6 3.6 6.8l3.1 3.1 3.2-3.2z"/>'),
    solar: s('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>'),
    gda: s('<path d="M8 3v4a4 4 0 0 0 8 0V3"/><path d="M6 3h4M14 3h4"/><path d="M12 11v3a5 5 0 0 1-5 5 3 3 0 0 1-3-3"/><circle cx="18" cy="15" r="2"/><path d="M18 17v1a3 3 0 0 1-3 3"/>'),
    auto: s('<path d="M5 17h14M4 17v-4l2-5h12l2 5v4"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M6 13h12"/>'),
    sewing: s('<path d="M3 6h14a4 4 0 0 1 4 4v3H7a4 4 0 0 1-4-4z"/><path d="M17 13v5M6 18h14"/><path d="M8 9h.01"/>'),
    // ui
    mic: s('<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>'),
    sound: s('<path d="M4 9v6h3.5L12 19V5L7.5 9z"/><path d="M15.8 9.2a4 4 0 0 1 0 5.6M18.4 6.6a7.7 7.7 0 0 1 0 10.8"/>'),
    arrow: s('<path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5"/>'),
    person: s('<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
    family: s('<circle cx="8" cy="7.5" r="2.8"/><circle cx="16.5" cy="9" r="2.3"/><path d="M3 20a5 5 0 0 1 10 0M13.5 20a4 4 0 0 1 7.5-2"/>'),
    shield: s('<path d="M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
    doc: s('<path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z"/><path d="M14 3v4.5h4.5M8.5 13h7M8.5 16.5h5"/>'),
    chart: s('<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12.5 16V8M17 16v-6"/>'),
  };
  return (name, cls) => {
    const svg = I[name] || I.person;
    return cls ? svg.replace("<svg ", `<svg class="${cls}" `) : svg;
  };
})();
