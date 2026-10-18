/* Kinvia prototype data.
   Every outcome record here is SYNTHETIC demo data, shaped like the verified
   outcome store described in docs/architecture.md. It must never be presented
   as real placement or earnings figures. */

const KV_DATA = (() => {
  const DISTRICTS = [
    { id: "pune", state: "Maharashtra", en: "Pune", hi: "पुणे" },
    { id: "nashik", state: "Maharashtra", en: "Nashik", hi: "नाशिक" },
    { id: "ahmednagar", state: "Maharashtra", en: "Ahmednagar", hi: "अहमदनगर" },
    { id: "lucknow", state: "Uttar Pradesh", en: "Lucknow", hi: "लखनऊ" },
    { id: "varanasi", state: "Uttar Pradesh", en: "Varanasi", hi: "वाराणसी" },
  ];

  const TRADES = [
    { id: "electrician", icon: "electrician", en: "Electrician", hi: "इलेक्ट्रीशियन", sector: "Power", nsqf: 4, months: 24,
      jobs: { en: "Electrician, maintenance technician, solar & EV service", hi: "इलेक्ट्रीशियन, मेंटेनेंस टेक्नीशियन, सोलर व EV सर्विस" } },
    { id: "fitter", icon: "fitter", en: "Fitter", hi: "फिटर", sector: "Capital Goods", nsqf: 4, months: 24,
      jobs: { en: "Fitter, machine assembler, plant maintenance", hi: "फिटर, मशीन असेंबलर, प्लांट मेंटेनेंस" } },
    { id: "solar", icon: "solar", en: "Solar PV Installer", hi: "सोलर पीवी इंस्टॉलर", sector: "Green Jobs", nsqf: 4, months: 6,
      jobs: { en: "Rooftop solar installer, O&M technician", hi: "रूफटॉप सोलर इंस्टॉलर, ओ एंड एम टेक्नीशियन" } },
    { id: "gda", icon: "gda", en: "General Duty Assistant", hi: "जनरल ड्यूटी असिस्टेंट", sector: "Healthcare", nsqf: 4, months: 6,
      jobs: { en: "Hospital ward assistant, home-care aide", hi: "अस्पताल वार्ड सहायक, होम-केयर सहायक" } },
    { id: "auto", icon: "auto", en: "Automotive Service Technician", hi: "ऑटोमोटिव सर्विस टेक्नीशियन", sector: "Automotive", nsqf: 4, months: 12,
      jobs: { en: "Workshop technician, two-wheeler & EV service", hi: "वर्कशॉप टेक्नीशियन, दोपहिया व EV सर्विस" } },
    { id: "sewing", icon: "sewing", en: "Sewing Machine Operator", hi: "सिलाई मशीन ऑपरेटर", sector: "Apparel", nsqf: 4, months: 3,
      jobs: { en: "Garment unit operator, own tailoring unit", hi: "गारमेंट यूनिट ऑपरेटर, अपनी सिलाई यूनिट" } },
  ];

  // Synthetic outcome records: placement = share placed within 6 months; p25/p75 = monthly earnings band (INR).
  const R = (trade, district, provider, placement, p25, p75, n, women) =>
    ({ id: `OUT-${district.slice(0, 3).toUpperCase()}-${trade.slice(0, 3).toUpperCase()}-25`, trade, district, provider,
       placement, p25, p75, n, women, cohort: "2025", asOf: "Sep 2026", source: "Synthetic demo record" });

  const OUTCOMES = [
    R("electrician", "pune", "Govt ITI Aundh (sample)", 66, 13000, 18500, 120, true),
    R("electrician", "nashik", "Skill Centre Satpur (sample)", 58, 12000, 16500, 85, false),
    R("electrician", "lucknow", "Govt ITI Aliganj (sample)", 55, 11000, 15500, 96, true),
    R("fitter", "pune", "Govt ITI Aundh (sample)", 61, 12500, 17000, 95, false),
    R("fitter", "varanasi", "Govt ITI Chaukaghat (sample)", 52, 10500, 14500, 70, false),
    R("solar", "ahmednagar", "Green Skills Centre (sample)", 54, 11500, 16000, 60, true),
    R("solar", "lucknow", "Surya Skill Centre (sample)", 57, 11000, 15000, 64, true),
    R("gda", "pune", "Health Skills Centre (sample)", 63, 10500, 14500, 110, true),
    R("gda", "varanasi", "City Health Skills (sample)", 59, 9500, 13000, 88, true),
    R("auto", "lucknow", "Govt ITI Aliganj (sample)", 57, 11000, 15500, 75, false),
    R("auto", "nashik", "Auto Skills Satpur (sample)", 60, 11500, 16000, 72, false),
    R("sewing", "lucknow", "Women's Skill Centre (sample)", 52, 8500, 12000, 130, true),
    R("sewing", "ahmednagar", "Mahila Skill Centre (sample)", 49, 8000, 11500, 115, true),
  ];

  const PATHWAYS = {
    default: [
      { en: "Trade course (NSQF 4)", hi: "ट्रेड कोर्स (NSQF 4)" },
      { en: "First job or apprenticeship", hi: "पहली नौकरी या अप्रेंटिसशिप" },
      { en: "NSQF level-up (Level 5)", hi: "NSQF लेवल-अप (लेवल 5)" },
      { en: "Diploma via lateral entry", hi: "लेटरल एंट्री से डिप्लोमा" },
      { en: "Supervisor or own business", hi: "सुपरवाइज़र या अपना व्यवसाय" },
    ],
  };

  const SCHEMES = [
    { id: "pmkvy", en: "PMKVY short-term training", hi: "PMKVY अल्पकालिक प्रशिक्षण",
      what: { en: "Free training and certification at empanelled centres", hi: "चुने हुए केंद्रों पर निःशुल्क प्रशिक्षण और प्रमाणपत्र" } },
    { id: "naps", en: "National Apprenticeship Promotion Scheme", hi: "राष्ट्रीय अप्रेंटिसशिप प्रोत्साहन योजना",
      what: { en: "Govt shares 25% of the apprentice stipend, up to ₹1,500 a month", hi: "सरकार अप्रेंटिस स्टाइपेंड का 25%, अधिकतम ₹1,500 प्रति माह देती है" } },
    { id: "pmis", en: "PM Internship Scheme", hi: "पीएम इंटर्नशिप योजना",
      what: { en: "₹5,000 a month for 12 months plus ₹6,000 one-time grant", hi: "12 महीने तक ₹5,000 प्रति माह और ₹6,000 एकमुश्त" } },
    { id: "women", en: "Support for women trainees", hi: "महिला प्रशिक्षुओं के लिए सहायता",
      what: { en: "Boarding, lodging and transport support under Common Norms", hi: "कॉमन नॉर्म्स के तहत रहने, खाने और यात्रा की सहायता" } },
  ];

  // Objection taxonomy (Objection Graph) with simple bilingual keyword cues for the demo engine.
  const OBJECTIONS = {
    INC: { en: "Income", hi: "कमाई", cues: ["earn", "salary", "income", "money", "pay", "kamai", "kamaai", "paisa", "tankhwah", "कमाई", "पैसा", "तनख्वाह", "वेतन", "कमा"] },
    STA: { en: "Social status", hi: "सामाजिक सम्मान", cues: ["log kya", "people will", "respect", "status", "failed", "fail", "izzat", "society", "लोग", "इज़्ज़त", "इज्जत", "सम्मान", "फेल"] },
    SAF: { en: "Safety", hi: "सुरक्षा", cues: ["safe", "safety", "daughter", "girl", "hostel", "night", "beti", "suraksha", "बेटी", "सुरक्षा", "सुरक्षित", "हॉस्टल", "लड़की"] },
    PRG: { en: "Further study", hi: "आगे की पढ़ाई", cues: ["study further", "further", "degree", "diploma", "college", "aage", "padhai", "dead end", "आगे", "पढ़ाई", "डिग्री", "डिप्लोमा"] },
    CST: { en: "Cost", hi: "खर्च", cues: ["cost", "fee", "fees", "afford", "kharcha", "free", "scholarship", "खर्च", "फीस", "मुफ्त", "छात्रवृत्ति"] },
    JOB: { en: "Job security", hi: "नौकरी की सुरक्षा", cues: ["job", "placement", "naukri", "permanent", "security", "नौकरी", "प्लेसमेंट", "पक्की"] },
    DIS: { en: "Distance", hi: "दूरी", cues: ["far", "distance", "travel", "door", "migrate", "दूर", "दूरी", "सफ़र", "बाहर"] },
  };

  const SDG_ALIGNMENT = [
    ["Learner and parent counselling", "Joint family session with speaker roles"],
    ["Regional-language access", "Hindi and English now; 22-language architecture"],
    ["Parental objection handling", "Concern tagging and evidence-based answers"],
    ["Verified outcome backend", "Trade × centre × district records with source"],
    ["Personalised pathway explanation", "Course → job → NSQF level-up → diploma"],
    ["Human counsellor escalation", "One-tap handoff with session summary"],
    ["Engagement and sentiment tracking", "Before/after confidence score"],
    ["Administrator dashboard", "District objection heatmap and trends"],
    ["Low-literacy accessibility", "Voice, icons, read-aloud, shared phone"],
    ["Traceable family evidence", "Sourced figures and Family Trust Card"],
  ];

  // Synthetic aggregate for the Scheme Insights dashboard (sessions per district, objection counts).
  const INSIGHTS = {
    pune: { sessions: 412, INC: 168, STA: 121, SAF: 64, PRG: 88, CST: 47, JOB: 72, DIS: 25, before: 2.4, after: 3.7 },
    nashik: { sessions: 238, INC: 102, STA: 84, SAF: 41, PRG: 39, CST: 33, JOB: 51, DIS: 30, before: 2.2, after: 3.4 },
    ahmednagar: { sessions: 176, INC: 70, STA: 81, SAF: 58, PRG: 22, CST: 40, JOB: 29, DIS: 44, before: 2.0, after: 3.3 },
    lucknow: { sessions: 351, INC: 141, STA: 133, SAF: 97, PRG: 61, CST: 52, JOB: 66, DIS: 38, before: 2.1, after: 3.5 },
    varanasi: { sessions: 204, INC: 77, STA: 96, SAF: 71, PRG: 30, CST: 45, JOB: 33, DIS: 41, before: 1.9, after: 3.2 },
  };

  const SOURCES = {
    aser: "https://asercentre.org/wp-content/uploads/2022/12/ASER-2023-Main-Findings_Final-22.2.24-1.pdf",
    niti: "https://niti.gov.in/sites/default/files/2023-02/ITI_Report_02022023_0.pdf",
    wadhwani: "https://wadhwanifoundation.org/press/why-career-guidance-is-important-for-students/",
    iamai: "https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI%20report_2024_.pdf",
    pmkvy: "https://news.careers360.com/pmkvy-pm-kaushal-vikas-yojana-15-pc-target-skill-india-development-msde-plan-voucher-loan-outcome-bond-apaar-id-new-format",
  };

  const findOutcome = (trade, district) => OUTCOMES.find(o => o.trade === trade && o.district === district) || null;
  const trade = id => TRADES.find(t => t.id === id);
  const district = id => DISTRICTS.find(d => d.id === id);

  return { DISTRICTS, TRADES, OUTCOMES, PATHWAYS, SCHEMES, OBJECTIONS, SDG_ALIGNMENT, INSIGHTS, SOURCES, findOutcome, trade, district };
})();

/* Shared helpers: storage that never throws, number formatting, speech. */
const KV = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ } },
  inr: n => "₹" + n.toLocaleString("en-IN"),
  esc: s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  speak(text, lang) {
    if (!("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ""));
    u.lang = lang === "hi" ? "hi-IN" : "en-IN";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
    return true;
  },
};

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
