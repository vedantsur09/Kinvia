/* Kinvia family-session demo engine.
   Rule-based stand-in for the production counselling graph: it tags concerns by
   speaker, answers from the synthetic outcome store, and runs a grounding check
   that refuses any figure not backed by a record or a published scheme rule. */
(() => {
  const D = KV_DATA;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  // ---------- Text ----------
  const T = {
    en: {
      note: "Prototype · runs in your browser · all outcome figures are synthetic demo data",
      eyebrow: "Learner + parents, together", title: "Family session", restart: "Start over",
      learner: "Learner", parent: "Parent", autoread: "Read replies aloud", send: "Send",
      placeholder: "Type or speak a question…", context: "Family context", district: "District",
      schooling: "Learner’s schooling", trade: "Trade being considered", concerns: "Concerns raised",
      noconcerns: "Concerns appear here as the family asks questions.", pathway: "Pathway", years: "First five years",
      schemes: "Schemes you may be eligible for", checkelig: "Check eligibility with a counsellor. Kinvia never promises a benefit.",
      confidence: "How confident do you feel?", confhint: "1 = very unsure · 5 = very confident",
      before: "Before", after: "Now", escalate: "Talk to a counsellor", trust: "Create Family Trust Card",
      cEyebrow: "Before we begin", cTitle: "Your family’s consent",
      cItems: ["Kinvia helps your family understand vocational training options together.",
               "Your conversation stays in this tab and is cleared when you leave or start over. You can download your own copy.",
               "Voice is turned into text and the recording is not kept.",
               "If you agree and ask for a counsellor, only a summary goes to the demo Counsellor Desk on this device: district, trade, concerns and records shown, never your words. For human help, also ask a training centre.",
               "You can ask for a person, stop, or delete your session at any time."],
      cCheck: "I am the parent or guardian. I agree to save district, trade, concern codes and confidence scores on this device for summary statistics and, if we ask for a counsellor, a Desk summary. Our conversation text is never saved.",
      cRead: "Read aloud", cGuest: "Continue without saving", cGo: "Agree and start",
      transcript: "Save the conversation", storageError: "Not saved: browser storage is unavailable or full. You can continue and download your own copy.",
      typing: "Kinvia is typing", listening: "Listening… speak now", micErr: "I didn’t catch that. Try again, or type it.",
      ctxDistrict: "District", ctxTrade: "Trade", ctxPick: "Choose a trade",
      pickTrade: "Which trade is your family considering? Tap one below, or just say its name.",
      CMP: t => `Here is every district in the demo store with a verified ${t} record, best placement first. Nothing here is guessed — each row is one record.`,
      CMPnone: t => `The demo store has only one verified record for ${t}, so there is nothing to compare it against yet.`,
      cmpHead: ["District", "Monthly, year one", "Placed", "Record"],
      sugMore: "What else can I ask?", sugHostel: "What about hostel and safety?", sugCost: "What will it cost?",
      sugFurther: "Can she study further?", sugCompare: "Which district does better?", sugCounsellor: "Talk to a counsellor",
      sugTrust: "Make the Trust Card", sugJobs: "What jobs come after?",
      nudgeOpen: "A few concerns are still open. Ask a counsellor at your training centre for help. You can download a summary to take with you.",
      wa: "Share on WhatsApp", dl: "Save as image", print: "Print", close: "Close",
      schoolOpts: ["Class 8 pass", "Class 10 pass", "Class 12 pass", "ITI / diploma started", "Other"],
      quick: [["INC", "Will he earn enough?"], ["STA", "Log kya kahenge?"], ["SAF", "Is it safe for my daughter?"],
              ["PRG", "Can I study further?"], ["CST", "What will it cost?"], ["JOB", "Is the job secure?"], ["DIS", "It is too far"], ["ESC", "Talk to a counsellor"]],
      welcome: "Namaste! I’m Kinvia. I answer only from verified training records — if there is no record, I will say so rather than guess. Ask me anything, in Hindi or English.",
      guest: "You’re in guest mode: nothing from this session will be saved.",
      
      noData: (t, d) => `We don’t have verified data for ${t} in ${d} yet, so I won’t guess a number. I can connect you to a counsellor, or show districts where verified records exist.`,
      INC: r => `Trainees who finished ${r.t} at ${r.provider} in ${r.d} earned ${KV.inr(r.p25)}–${KV.inr(r.p75)} a month in their first year, and ${r.placement}% were placed within six months.`,
      STA: r => `Skilled trades are respected work with steady demand. In ${r.d}, ${r.placement}% of ${r.t} trainees found jobs, and the path continues: an NSQF level-up or a diploma through lateral entry. A certificate is a qualification, not a fallback.`,
      SAFyes: r => `${r.provider} runs women-friendly batches in this record. Women trainees can also get boarding, lodging and transport support under Common Norms. For hostel details, a counsellor can confirm.`,
      SAFno: r => `This record does not show women-only batches for ${r.t} in ${r.d}. Women trainees can get boarding, lodging and transport support under Common Norms. I’ve marked this for a counsellor to confirm hostel and timing details.`,
      PRG: r => `Yes. ${r.t} is NSQF Level ${r.nsqf}. After it you can work or apprentice, level up to NSQF Level 5, or join a diploma through lateral entry. The full pathway is in your session summary.`,
      CST: () => `PMKVY training is free at empanelled centres. During an apprenticeship, the government shares 25% of the stipend, up to ₹1,500 a month. The PM Internship Scheme pays ₹5,000 a month. Check eligibility with a counsellor.`,
      JOB: r => `${r.placement}% of ${r.t} trainees in ${r.d} were placed within six months. Typical roles: ${r.jobs}.`,
      DIS: (t, list) => list.length ? `Verified records for ${t} also exist in: ${list}. Women trainees can get transport support under Common Norms.` : `No other district in the demo store has a record for ${t}.`,
      ESC: id => `Your summary is on the demo Counsellor Desk as ticket ${id}: district, trade, concerns and the records shown, never your words. This prototype has no live counsellor, so also speak to one at your training centre and take your Trust Card.`,
      ESCguest: "Guest mode sends nothing to the Counsellor Desk. For human help, speak to a counsellor at your training centre and take your Trust Card or downloaded conversation.",
      fallback: "I can help with earnings, job security, social respect, safety, further study, cost or distance. You can also ask for a counsellor.",
      grounded: id => `Verified · figures from ${id}`, groundedScheme: "Verified · published scheme rules",
      blocked: "Grounding guard blocked an unverified figure", unresolved: "Open · counsellor", resolved: "Answered",
      speak: "Listen", trustTitle: "Family Trust Card", tcTrade: "Trade", tcEvidence: "Verified figures", tcConcerns: "Your concerns",
      tcNext: "Next steps", tcSchemes: "Schemes to check", tcNone: "No concerns recorded yet.",
      tcNextOpen: "Take this card to a training-centre counsellor.", tcNextVisit: p => `Visit ${p} and ask about apprenticeships.`,
      tcFoot: "Figures from synthetic demo records · Kinvia prototype",
      degree: "Degree route", voc: "Vocational route", study: "studying", earn: "earning", vocBand: r => `${KV.inr(r.p25)}–${KV.inr(r.p75)} / month (record)`, degBand: "No verified local record in the demo store",
      micNo: "Voice input isn’t supported in this browser. Please type instead.",
    },
    hi: {
      note: "प्रोटोटाइप · आपके ब्राउज़र में चलता है · सभी आंकड़े सिंथेटिक डेमो डेटा हैं",
      eyebrow: "विद्यार्थी और माता-पिता, साथ में", title: "पारिवारिक सत्र", restart: "फिर से शुरू करें",
      learner: "विद्यार्थी", parent: "माता-पिता", autoread: "जवाब पढ़कर सुनाएँ", send: "भेजें",
      placeholder: "सवाल लिखें या बोलें…", context: "परिवार की जानकारी", district: "ज़िला",
      schooling: "विद्यार्थी की पढ़ाई", trade: "कौन-सा ट्रेड", concerns: "उठाई गई चिंताएँ",
      noconcerns: "परिवार के सवालों के साथ चिंताएँ यहाँ दिखेंगी।", pathway: "आगे का रास्ता", years: "पहले पाँच साल",
      schemes: "योजनाएँ जिनके लिए आप पात्र हो सकते हैं", checkelig: "पात्रता काउंसलर से जाँचें। किनविया किसी लाभ का वादा नहीं करता।",
      confidence: "आप कितना भरोसा महसूस करते हैं?", confhint: "1 = बिल्कुल पक्का नहीं · 5 = पूरा भरोसा",
      before: "पहले", after: "अब", escalate: "काउंसलर से बात करें", trust: "फ़ैमिली ट्रस्ट कार्ड बनाएँ",
      cEyebrow: "शुरू करने से पहले", cTitle: "आपके परिवार की सहमति",
      cItems: ["किनविया आपके परिवार को मिलकर व्यावसायिक प्रशिक्षण के विकल्प समझने में मदद करता है।",
               "बातचीत इसी टैब में रहती है। पेज छोड़ने या फिर से शुरू करने पर मिट जाती है। अपनी कॉपी डाउनलोड कर सकते हैं।",
               "आवाज़ को टेक्स्ट में बदला जाता है और रिकॉर्डिंग नहीं रखी जाती।",
               "अगर आप सहमति देकर काउंसलर माँगते हैं, तो इसी डिवाइस पर डेमो काउंसलर डेस्क को केवल सारांश जाता है: ज़िला, ट्रेड, चिंताएँ और दिखाए गए रिकॉर्ड, आपकी बातें कभी नहीं। मदद के लिए प्रशिक्षण केंद्र में भी पूछें।",
               "आप कभी भी किसी व्यक्ति से बात कर सकते हैं, रुक सकते हैं या अपना सत्र मिटा सकते हैं।"],
      cCheck: "मैं माता-पिता या अभिभावक हूँ। मैं कुल आंकड़ों के लिए इसी डिवाइस पर ज़िला, ट्रेड, चिंता के कोड और भरोसे के स्कोर, और काउंसलर माँगने पर डेस्क सारांश सहेजने की सहमति देता हूँ। हमारी बातचीत कभी नहीं सहेजी जाती।",
      cRead: "पढ़कर सुनाएँ", cGuest: "बिना सहेजे जारी रखें", cGo: "सहमत हूँ, शुरू करें",
      transcript: "बातचीत सहेजें", storageError: "सहेजा नहीं गया: ब्राउज़र स्टोरेज उपलब्ध नहीं है या भर गया है। जारी रखें और अपनी कॉपी डाउनलोड कर सकते हैं।",
      typing: "किनविया लिख रहा है", listening: "सुन रहा हूँ… अब बोलिए", micErr: "मैं समझ नहीं पाया। दोबारा बोलें या लिखें।",
      ctxDistrict: "ज़िला", ctxTrade: "ट्रेड", ctxPick: "ट्रेड चुनें",
      pickTrade: "आपका परिवार कौन-सा ट्रेड सोच रहा है? नीचे से चुनें, या बस उसका नाम बोलें।",
      CMP: t => `डेमो डेटा में ${t} के सत्यापित रिकॉर्ड वाले सभी ज़िले — सबसे अच्छे प्लेसमेंट से शुरू। कुछ भी अंदाज़े से नहीं; हर पंक्ति एक रिकॉर्ड है।`,
      CMPnone: t => `डेमो डेटा में ${t} का सिर्फ़ एक सत्यापित रिकॉर्ड है, इसलिए अभी तुलना नहीं हो सकती।`,
      cmpHead: ["ज़िला", "मासिक, पहला साल", "नौकरी", "रिकॉर्ड"],
      sugMore: "और क्या पूछ सकते हैं?", sugHostel: "हॉस्टल और सुरक्षा?", sugCost: "खर्च कितना होगा?",
      sugFurther: "क्या आगे पढ़ाई हो सकती है?", sugCompare: "कौन-सा ज़िला बेहतर है?", sugCounsellor: "काउंसलर से बात करें",
      sugTrust: "ट्रस्ट कार्ड बनाएँ", sugJobs: "आगे कौन-सा काम मिलेगा?",
      nudgeOpen: "कुछ चिंताएँ अभी खुली हैं। प्रशिक्षण केंद्र के काउंसलर से मदद माँगें। साथ ले जाने के लिए सारांश डाउनलोड कर सकते हैं।",
      wa: "व्हाट्सऐप पर भेजें", dl: "इमेज सहेजें", print: "प्रिंट", close: "बंद करें",
      schoolOpts: ["8वीं पास", "10वीं पास", "12वीं पास", "ITI / डिप्लोमा शुरू", "अन्य"],
      quick: [["INC", "कमाई कितनी होगी?"], ["STA", "लोग क्या कहेंगे?"], ["SAF", "क्या बेटी के लिए सुरक्षित है?"],
              ["PRG", "क्या आगे पढ़ाई हो सकती है?"], ["CST", "खर्च कितना होगा?"], ["JOB", "क्या नौकरी पक्की है?"], ["DIS", "बहुत दूर है"], ["ESC", "काउंसलर से बात करें"]],
      welcome: "नमस्ते! मैं किनविया हूँ। मैं सिर्फ़ सत्यापित रिकॉर्ड से जवाब देता हूँ — रिकॉर्ड न हो तो अंदाज़ा लगाने के बजाय साफ़ कह दूँगा। हिंदी या अंग्रेज़ी में कुछ भी पूछिए।",
      guest: "आप गेस्ट मोड में हैं: इस सत्र से कुछ भी सहेजा नहीं जाएगा।",
      
      noData: (t, d) => `${d} में ${t} के लिए अभी सत्यापित डेटा नहीं है, इसलिए मैं अंदाज़े से कोई आंकड़ा नहीं बताऊँगा। मैं आपको काउंसलर से जोड़ सकता हूँ, या वे ज़िले दिखा सकता हूँ जहाँ सत्यापित रिकॉर्ड हैं।`,
      INC: r => `${r.d} में ${r.provider} से ${r.t} प्रशिक्षण पूरा करने वालों ने पहले साल में ${KV.inr(r.p25)}–${KV.inr(r.p75)} प्रति माह कमाए, और ${r.placement}% को छह महीने में नौकरी मिली।`,
      STA: r => `कुशल ट्रेड सम्मानजनक काम है और इसकी मांग लगातार है। ${r.d} में ${r.t} के ${r.placement}% प्रशिक्षुओं को नौकरी मिली, और आगे का रास्ता खुला है: NSQF लेवल-अप या लेटरल एंट्री से डिप्लोमा। प्रमाणपत्र एक योग्यता है, मजबूरी नहीं।`,
      SAFyes: r => `इस रिकॉर्ड के अनुसार ${r.provider} में महिलाओं के लिए बैच चलते हैं। महिला प्रशिक्षुओं को कॉमन नॉर्म्स के तहत रहने, खाने और यात्रा की सहायता भी मिल सकती है। हॉस्टल की जानकारी काउंसलर पक्की करेंगे।`,
      SAFno: r => `इस रिकॉर्ड में ${r.d} में ${r.t} के लिए केवल-महिला बैच नहीं दिखते। महिला प्रशिक्षुओं को कॉमन नॉर्म्स के तहत रहने, खाने और यात्रा की सहायता मिल सकती है। हॉस्टल और समय की पुष्टि के लिए मैंने इसे काउंसलर के लिए चिह्नित किया है।`,
      PRG: r => `हाँ। ${r.t} NSQF लेवल ${r.nsqf} है। इसके बाद आप नौकरी या अप्रेंटिसशिप कर सकते हैं, NSQF लेवल 5 तक बढ़ सकते हैं, या लेटरल एंट्री से डिप्लोमा कर सकते हैं। पूरा रास्ता आपके सत्र सारांश में है।`,
      CST: () => `चुने हुए केंद्रों पर PMKVY प्रशिक्षण मुफ्त है। अप्रेंटिसशिप के दौरान सरकार स्टाइपेंड का 25%, अधिकतम ₹1,500 प्रति माह देती है। पीएम इंटर्नशिप योजना में ₹5,000 प्रति माह मिलते हैं। पात्रता काउंसलर से जाँचें।`,
      JOB: r => `${r.d} में ${r.t} के ${r.placement}% प्रशिक्षुओं को छह महीने में नौकरी मिली। आम काम: ${r.jobs}।`,
      DIS: (t, list) => list.length ? `${t} के सत्यापित रिकॉर्ड इन ज़िलों में भी हैं: ${list}। महिला प्रशिक्षुओं को कॉमन नॉर्म्स के तहत यात्रा सहायता मिल सकती है।` : `डेमो डेटा में ${t} के लिए किसी और ज़िले का रिकॉर्ड नहीं है।`,
      ESC: id => `आपका सारांश डेमो काउंसलर डेस्क पर टिकट ${id} के रूप में है: ज़िला, ट्रेड, चिंताएँ और दिखाए गए रिकॉर्ड, आपकी बातें कभी नहीं। इस प्रोटोटाइप में कोई लाइव काउंसलर नहीं है, इसलिए प्रशिक्षण केंद्र के काउंसलर से भी बात करें और ट्रस्ट कार्ड साथ ले जाएँ।`,
      ESCguest: "गेस्ट मोड में काउंसलर डेस्क को कुछ नहीं भेजा जाता। मदद के लिए प्रशिक्षण केंद्र के काउंसलर से बात करें और ट्रस्ट कार्ड या डाउनलोड की हुई बातचीत साथ ले जाएँ।",
      fallback: "मैं कमाई, नौकरी की सुरक्षा, सामाजिक सम्मान, सुरक्षा, आगे की पढ़ाई, खर्च या दूरी के बारे में मदद कर सकता हूँ। आप काउंसलर से बात भी कर सकते हैं।",
      grounded: id => `सत्यापित · आंकड़े ${id} से`, groundedScheme: "सत्यापित · प्रकाशित योजना नियम",
      blocked: "ग्राउंडिंग गार्ड ने असत्यापित आंकड़ा रोका", unresolved: "खुला · काउंसलर", resolved: "जवाब दिया",
      speak: "सुनें", trustTitle: "फ़ैमिली ट्रस्ट कार्ड", tcTrade: "ट्रेड", tcEvidence: "सत्यापित आंकड़े", tcConcerns: "आपकी चिंताएँ",
      tcNext: "अगले कदम", tcSchemes: "जाँचने योग्य योजनाएँ", tcNone: "अभी कोई चिंता दर्ज नहीं।",
      tcNextOpen: "यह कार्ड प्रशिक्षण केंद्र के काउंसलर को दिखाएँ।", tcNextVisit: p => `${p} जाएँ और अप्रेंटिसशिप के बारे में पूछें।`,
      tcFoot: "आंकड़े सिंथेटिक डेमो रिकॉर्ड से · किनविया प्रोटोटाइप",
      degree: "डिग्री रास्ता", voc: "व्यावसायिक रास्ता", study: "पढ़ाई", earn: "कमाई", vocBand: r => `${KV.inr(r.p25)}–${KV.inr(r.p75)} / माह (रिकॉर्ड)`, degBand: "डेमो डेटा में कोई सत्यापित स्थानीय रिकॉर्ड नहीं",
      micNo: "इस ब्राउज़र में आवाज़ से इनपुट उपलब्ध नहीं है। कृपया लिखें।",
    },
  };
  const ESC_CUES = ["counsellor", "counselor", "person", "human", "talk to someone", "call me", "काउंसलर", "किसी से बात", "insaan", "baat karni"];
  // "Compare districts" is an intent, not a family concern, so it stays out of the objection taxonomy.
  const CMP_CUES = ["compare", "which district", "which city", "better place", "kaha behtar", "kahan behtar",
                    "तुलना", "कौन सा ज़िला", "कौन-सा ज़िला", "कहाँ बेहतर", "कहां बेहतर"];

  // ---------- State ----------
  const fresh = () => ({
    lang: KV.get("kinvia.lang", "en") === "hi" ? "hi" : "en", saving: false, speaker: "parent",
    district: "pune", schooling: 1, trade: null,
    objections: [], evidence: [], messages: [], pending: null, nudged: false,
    conf: { learner: { before: 2, after: 2 }, parent: { before: 2, after: 2 } },
    ticket: null, id: "S-" + Date.now().toString(36).toUpperCase(),
  });
  let S = fresh();
  const t = () => T[S.lang];
  const tradeName = id => D.trade(id)?.[S.lang] ?? "";
  const distName = id => D.district(id)?.[S.lang] ?? "";

  // ---------- Grounding guard ----------
  // Every ₹ amount and percentage in a reply must match a record field or a published scheme rule.
  const SCHEME_NUMBERS = new Set(["25", "1500", "5000", "6000"]);
  function ground(text, record) {
    const allowed = new Set(SCHEME_NUMBERS);
    if (record) [record.p25, record.p75, record.placement, record.nsqf, record.n].forEach(v => allowed.add(String(v)));
    D.OUTCOMES.filter(o => record && o.trade === record.trade).forEach(o => allowed.add(String(o.placement)));
    const nums = [...text.matchAll(/₹\s?([\d,]+)|(\d+(?:\.\d+)?)\s?%/g)].map(m => (m[1] || m[2]).replace(/,/g, ""));
    const bad = nums.filter(n => !allowed.has(n));
    return { ok: bad.length === 0, bad };
  }

  // ---------- Classification ----------
  function classify(text) {
    const s = text.toLowerCase();
    if (ESC_CUES.some(c => s.includes(c))) return ["ESC"];
    if (CMP_CUES.some(c => s.includes(c))) {
      D.TRADES.forEach(tr => { if (s.includes(tr.en.toLowerCase()) || s.includes(tr.hi)) setTrade(tr.id); });
      return ["CMP"];
    }
    const codes = Object.entries(D.OBJECTIONS).filter(([, o]) => o.cues.some(c => s.includes(c))).map(([k]) => k);
    D.TRADES.forEach(tr => { if (s.includes(tr.en.toLowerCase()) || s.includes(tr.hi)) setTrade(tr.id); });
    D.DISTRICTS.forEach(d => { if (s.includes(d.en.toLowerCase()) || s.includes(d.hi)) setDistrict(d.id); });
    return codes;
  }

  // ---------- Replies ----------
  function recordView(r) {
    return { ...r, t: tradeName(r.trade), d: distName(r.district), nsqf: D.trade(r.trade).nsqf, jobs: D.trade(r.trade).jobs[S.lang] };
  }
  function evidenceCard(r, code) {
    const tag = code ? `<span class="tag tag-leaf">${D.OBJECTIONS[code][S.lang]}</span>` : "";
    return `<div class="evidence" style="margin-top:10px"><span class="seal">VERIFIED · DEMO</span>
      <div class="ev-head"><span class="ev-title">${KV.esc(tradeName(r.trade))} · ${KV.esc(distName(r.district))} · ${KV.esc(r.provider)}</span>${tag}</div>
      <div class="ev-figs"><div class="ev-fig"><b>${KV.inr(r.p25)}–${KV.inr(r.p75)}</b><span>${S.lang === "hi" ? "मासिक, पहला साल" : "monthly, year one"}</span></div>
      <div class="ev-fig"><b>${r.placement}%</b><span>${S.lang === "hi" ? "6 महीने में नौकरी" : "placed in 6 months"}</span></div></div>
      <div class="ev-src"><span>${r.id}</span><span>n = ${r.n}</span><span>${S.lang === "hi" ? "तारीख" : "as of"} ${r.asOf}</span><span>${S.lang === "hi" ? "सिंथेटिक डेमो डेटा" : "synthetic demo data"}</span></div></div>`;
  }
  function missingCard() {
    return `<div class="evidence missing" style="margin-top:10px"><span class="seal">NO VERIFIED DATA</span>
      <div class="ev-head"><span class="ev-title">${KV.esc(tradeName(S.trade))} · ${KV.esc(distName(S.district))}</span><span class="tag tag-verm">${S.lang === "hi" ? "काउंसलर" : "Counsellor"}</span></div>
      <div class="ev-src"><span>${S.lang === "hi" ? "कोई रिकॉर्ड नहीं · अंदाज़ा नहीं लगाया गया" : "no record · no number guessed"}</span></div></div>`;
  }

  // Every figure here is read straight off a record, so the card needs no separate grounding pass.
  function compareCard(rows) {
    const L = t(), best = rows[0];
    return `<div class="cmp"><table><thead><tr>${L.cmpHead.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>
      ${rows.map(r => `<tr${r.district === S.district ? ' class="is-you"' : ""}><td data-l="${L.cmpHead[0]}">${KV.esc(distName(r.district))}${r.district === S.district ? ` <span class="tag tag-leaf">${S.lang === "hi" ? "आपका" : "yours"}</span>` : ""}</td>
      <td data-l="${L.cmpHead[1]}"><b>${KV.inr(r.p25)}–${KV.inr(r.p75)}</b></td><td data-l="${L.cmpHead[2]}">${r.placement}%</td><td class="mono" data-l="${L.cmpHead[3]}">${r.id} · n=${r.n}</td></tr>`).join("")}
      </tbody></table><p class="tiny">${S.lang === "hi" ? "सबसे अच्छा रिकॉर्ड" : "Best record"}: ${KV.esc(distName(best.district))} · ${KV.esc(best.provider)} · ${S.lang === "hi" ? "सिंथेटिक डेमो डेटा" : "synthetic demo data"}</p></div>`;
  }

  // The trade picker lives in the sidebar, which stacks *below* the chat on a phone.
  // Offering it inline keeps the conversation from dead-ending on a control nobody can see.
  function inlineTrades() {
    return `<div class="inline-trades">${D.TRADES.map(tr =>
      `<button class="chip" type="button" data-pick="${tr.id}">${KV_ICON(tr.icon)}${KV.esc(tr[S.lang])}</button>`).join("")}</div>`;
  }

  function addConcern(code, resolved, evidenceId) {
    S.objections.push({ code, speaker: S.speaker, resolved, evidence: evidenceId || null, at: Date.now() });
    renderConcerns();
  }

  function respond(codes, rawText) {
    codes = [...codes];
    const L = t();
    if (codes[0] === "ESC") return escalate();
    if (codes[0] === "CMP") return compare();
    if (!codes.length) return kinviaSay(L.fallback, { suggest: true });
    if (!S.trade && codes.some(c => c !== "CST")) {
      codes.forEach(c => addConcern(c, false));
      S.pending = codes.filter(c => c !== "CST");
      return kinviaSay(L.pickTrade, { html: inlineTrades() });
    }
    const rec = S.trade ? D.findOutcome(S.trade, S.district) : null;
    if (!rec) {
      // One honest "no verified data" answer for every record-backed concern, never a guessed number.
      const needRecord = codes.filter(c => !["CST", "DIS"].includes(c));
      needRecord.forEach(c => addConcern(c, false));
      if (needRecord.length) kinviaSay(L.noData(tradeName(S.trade), distName(S.district)), { html: missingCard() });
      codes = codes.filter(c => ["CST", "DIS"].includes(c));
    }
    codes.forEach(code => {
      if (code === "CST") {
        const text = L.CST();
        addConcern(code, true, "scheme-rules");
        return kinviaSay(text, { grounded: ground(text, null), scheme: true });
      }
      if (code === "DIS") {
        const others = D.OUTCOMES.filter(o => o.trade === S.trade && o.district !== S.district)
          .map(o => `${distName(o.district)} (${o.placement}%)`).join(", ");
        const text = L.DIS(tradeName(S.trade), others);
        addConcern(code, true, "district-list");
        return kinviaSay(text, { grounded: ground(text, D.OUTCOMES.find(o => o.trade === S.trade) || null), id: "district list" });
      }
      if (!rec) {
        addConcern(code, false);
        return kinviaSay(L.noData(tradeName(S.trade), distName(S.district)), { html: missingCard() });
      }
      const r = recordView(rec);
      let text, resolved = true;
      if (code === "SAF") { text = rec.women ? L.SAFyes(r) : L.SAFno(r); resolved = rec.women; }
      else text = L[code](r);
      addConcern(code, resolved, rec.id);
      if (!S.evidence.includes(rec.id)) S.evidence.push(rec.id);
      const g = ground(text, rec);
      kinviaSay(text, { grounded: g, id: rec.id, html: ["INC", "JOB", "STA"].includes(code) ? evidenceCard(rec, code) : "" });
    });
    suggestNext();
    nudgeCounsellor();
  }

  function compare() {
    const L = t();
    if (!S.trade) return kinviaSay(L.pickTrade, { html: inlineTrades() });
    const rows = D.OUTCOMES.filter(o => o.trade === S.trade).sort((a, b) => b.placement - a.placement);
    if (rows.length < 2) return kinviaSay(L.CMPnone(tradeName(S.trade)), { suggest: true });
    rows.forEach(r => { if (!S.evidence.includes(r.id)) S.evidence.push(r.id); });
    kinviaSay(L.CMP(tradeName(S.trade)), { html: compareCard(rows), scheme: false, grounded: { ok: true }, id: rows.map(r => r.id).join(", ") });
    suggestNext();
  }

  // Follow-ups the family is actually likely to want next, rather than a fixed chip row.
  function suggestNext() {
    const L = t(), asked = new Set(S.objections.map(o => o.code));
    const pool = [];
    if (S.trade && !asked.has("INC")) pool.push(["INC", t().quick[0][1]]);
    if (S.trade && !asked.has("SAF")) pool.push(["SAF", L.sugHostel]);
    if (!asked.has("PRG")) pool.push(["PRG", L.sugFurther]);
    if (!asked.has("CST")) pool.push(["CST", L.sugCost]);
    if (!asked.has("JOB")) pool.push(["JOB", L.sugJobs]);
    if (S.trade && D.OUTCOMES.filter(o => o.trade === S.trade).length > 1) pool.push(["CMP", L.sugCompare]);
    if (S.objections.length >= 2) pool.push(["TRUST", L.sugTrust]);
    pool.push(["ESC", L.sugCounsellor]);
    renderSuggest(pool.slice(0, 4));
  }

  // After a couple of unresolved concerns, offer a human rather than waiting to be asked.
  function nudgeCounsellor() {
    if (S.ticket || S.nudged) return;
    if (S.objections.filter(o => !o.resolved).length < 2) return;
    S.nudged = true;
    kinviaSay(t().nudgeOpen);
  }

  // ---------- Rendering ----------
  const log = () => $("#log");
  function push(role, html, opts = {}) {
    const b = document.createElement("div");
    b.className = "bubble " + role;
    const who = role === "kinvia" ? "Kinvia" : (role === "learner" ? t().learner : t().parent);
    b.innerHTML = `<span class="who">${who}</span>${html}`;
    if (opts.meta) b.insertAdjacentHTML("beforeend", `<div class="meta-row">${opts.meta}</div>`);
    log().appendChild(b);
    log().scrollTop = log().scrollHeight;
    return b;
  }
  // A brief "typing" beat before each reply: it paces multi-part answers so the family
  // reads them in order instead of having three cards appear at once.
  let typingEl = null, chain = Promise.resolve(), generation = 0, pendingReply = null;
  function showTyping() {
    if (typingEl) return;
    typingEl = document.createElement("div");
    typingEl.className = "bubble kinvia typing";
    typingEl.setAttribute("aria-label", t().typing);
    typingEl.innerHTML = `<span class="who">Kinvia</span><span class="dots"><i></i><i></i><i></i></span>`;
    log().appendChild(typingEl);
    log().scrollTop = log().scrollHeight;
  }
  function hideTyping() { typingEl?.remove(); typingEl = null; }

  function kinviaSay(text, opts = {}) {
    const delay = opts.instant ? 0 : Math.min(900, 280 + text.length * 2.2);
    const current = generation;
    chain = chain.then(() => current !== generation ? undefined : new Promise(resolve => {
      showTyping();
      const timer = setTimeout(() => {
        pendingReply = null;
        if (current === generation) { hideTyping(); renderReply(text, opts); }
        resolve();
      }, delay);
      pendingReply = { timer, resolve };
    }));
    return chain;
  }

  function renderReply(text, opts = {}) {
    let body = KV.esc(text);
    let meta = "";
    if (opts.grounded) {
      if (!opts.grounded.ok) { body = KV.esc(t().blocked); meta = `<span class="tag tag-verm">${t().blocked}</span>`; }
      else meta = `<span class="tag tag-leaf">${opts.scheme ? t().groundedScheme : t().grounded(opts.id)}</span>`;
    }
    meta += `<button class="chip" type="button" data-say style="padding:3px 10px;font-size:11.5px">${KV_ICON("sound")} ${t().speak}</button>`;
    const b = push("kinvia", body + (opts.html || ""), { meta });
    b.querySelector("[data-say]").addEventListener("click", () => KV.speak(text, S.lang));
    b.querySelectorAll("[data-pick]").forEach(btn => btn.addEventListener("click", () => {
      const id = btn.dataset.pick, group = btn.closest(".inline-trades");
      // Spent controls stay visible as history but stop being clickable.
      group.classList.add("used");
      group.querySelectorAll("[data-pick]").forEach(x => {
        x.disabled = true;
        x.setAttribute("aria-pressed", String(x.dataset.pick === id));
      });
      userSay(tradeName(id));
      setTrade(id);
      const pending = S.pending || [];
      S.pending = null;
      S.objections = S.objections.filter(o => !(pending.includes(o.code) && !o.resolved));
      renderConcerns();
      if (pending.length) respond(pending, "");
      else { setTrade(id, true); suggestNext(); }
    }));
    S.messages.push({ role: "kinvia", text });
    if ($("#autoread").checked) KV.speak(text, S.lang);
    if (opts.quick) renderQuick();
    if (opts.suggest) suggestNext();
  }
  function userSay(text) {
    push(S.speaker, KV.esc(text));
    S.messages.push({ role: S.speaker, text });
  }

  function renderSuggest(pairs) {
    const el = $("#quick");
    el.innerHTML = `<span class="suggest-label">${KV.esc(t().sugMore)}</span>` +
      pairs.map(([code, label]) => `<button class="chip" type="button" data-q="${code}">${KV.esc(label)}</button>`).join("");
    wireQuick();
  }
  function wireQuick() {
    $$("#quick [data-q]").forEach(btn => btn.addEventListener("click", () => {
      const code = btn.dataset.q, label = btn.textContent;
      if (code === "TRUST") return trustCard(btn);
      userSay(label);
      if (code === "ESC") return escalate();
      if (code === "CMP") return compare();
      respond([code], label);
    }));
  }

  function renderCtxBar() {
    const L = t(), bar = $("#ctxbar");
    if (!bar) return;
    const rec = S.trade ? D.findOutcome(S.trade, S.district) : null;
    bar.innerHTML = `
      <button type="button" data-jump="district"><span>${L.ctxDistrict}</span>${KV.esc(distName(S.district))}</button>
      <button type="button" data-jump="trades" class="${S.trade ? "" : "needs"}"><span>${L.ctxTrade}</span>${KV.esc(tradeName(S.trade) || L.ctxPick)}</button>
      ${S.trade ? `<span class="ctx-flag ${rec ? "ok" : "no"}">${rec
        ? (S.lang === "hi" ? "सत्यापित रिकॉर्ड है" : "verified record")
        : (S.lang === "hi" ? "कोई रिकॉर्ड नहीं" : "no record")}</span>` : ""}`;
    bar.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => {
      const el = $("#" + b.dataset.jump);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (b.dataset.jump === "district") el?.focus();
      el?.closest(".panel")?.classList.add("flash");
      setTimeout(() => el?.closest(".panel")?.classList.remove("flash"), 1200);
    }));
  }

  function renderQuick() {
    $("#quick").innerHTML = t().quick.map(([code, label]) => `<button class="chip" type="button" data-q="${code}">${KV.esc(label)}</button>`).join("");
    wireQuick();
  }
  function renderContext() {
    $("#district").innerHTML = D.DISTRICTS.map(d => `<option value="${d.id}" ${d.id === S.district ? "selected" : ""}>${d[S.lang]} · ${d.state}</option>`).join("");
    $("#schooling").innerHTML = t().schoolOpts.map((o, i) => `<option value="${i}" ${i === S.schooling ? "selected" : ""}>${o}</option>`).join("");
    $("#trades").innerHTML = D.TRADES.map(tr => `<button class="trade-btn" type="button" data-trade="${tr.id}" aria-pressed="${tr.id === S.trade}">${KV_ICON(tr.icon)}<span>${tr[S.lang]}</span></button>`).join("");
    $$("#trades [data-trade]").forEach(b => b.addEventListener("click", () => setTrade(b.dataset.trade, true)));
  }
  function renderConcerns() {
    const el = $("#objlist");
    if (!S.objections.length) { el.innerHTML = `<p class="tiny">${t().noconcerns}</p>`; return; }
    el.innerHTML = S.objections.map(o => `<div class="objitem"><span><span class="who-mark">${o.speaker === "learner" ? (S.lang === "hi" ? "विद्यार्थी" : "Learner") : (S.lang === "hi" ? "अभिभावक" : "Parent")}</span>${D.OBJECTIONS[o.code]?.[S.lang] ?? (S.lang === "hi" ? "काउंसलर अनुरोध" : "Counsellor request")}</span>
      <span class="tag ${o.resolved ? "tag-leaf" : "tag-verm"}">${o.resolved ? t().resolved : t().unresolved}</span></div>`).join("");
  }
  function renderPath() {
    const tr = S.trade ? D.trade(S.trade) : null;
    $("#path").innerHTML = D.PATHWAYS.default.map((p, i) => `<div class="path-step"><span>${i === 0 && tr ? `${tr[S.lang]} · NSQF ${tr.nsqf}` : p[S.lang]}</span></div>`).join("");
    const rec = S.trade ? D.findOutcome(S.trade, S.district) : null;
    const L = t();
    const months = tr ? tr.months : 24;
    const studyYears = Math.max(1, Math.round(months / 12));
    $("#twopath").innerHTML = `
      <div class="bar-row"><span>${L.voc}</span><div class="bar"><i style="left:0;width:${studyYears * 20}%;background:var(--rose)"></i><i style="left:${studyYears * 20}%;width:${100 - studyYears * 20}%;background:var(--violet)"></i></div></div>
      <p class="tiny">${studyYears} ${L.study} · ${5 - studyYears} ${L.earn} · ${rec ? L.vocBand(rec) : L.degBand}</p>
      <div class="bar-row"><span>${L.degree}</span><div class="bar"><i style="left:0;width:60%;background:var(--rose)"></i><i style="left:60%;width:40%;background:var(--violet)"></i></div></div>
      <p class="tiny">3 ${L.study} · 2 ${L.earn} · ${L.degBand}</p>`;
  }
  function renderSchemes() {
    $("#schemes").innerHTML = D.SCHEMES.map(s => `<div class="objitem" style="display:grid;gap:2px"><b style="font-weight:600">${s[S.lang]}</b><span class="tiny">${s.what[S.lang]}</span></div>`).join("");
  }
  function renderConf() {
    const L = t();
    $("#conf").innerHTML = ["learner", "parent"].map(who => ["before", "after"].map(k => `
      <div class="conf"><span>${L[who]} · ${L[k]}</span>
      <input type="range" min="1" max="5" step="1" value="${S.conf[who][k]}" data-who="${who}" data-k="${k}" aria-label="${L[who]} ${L[k]}">
      <b class="mono">${S.conf[who][k]}</b></div>`).join("")).join("");
    $$("#conf input").forEach(inp => inp.addEventListener("input", () => {
      S.conf[inp.dataset.who][inp.dataset.k] = +inp.value;
      inp.nextElementSibling.textContent = inp.value;
    }));
  }
  function applyText() {
    const L = t();
    document.documentElement.lang = S.lang === "hi" ? "hi" : "en";
    $$("[data-t]").forEach(el => { const v = L[el.dataset.t]; if (typeof v === "string") el.textContent = v; });
    $("#msg").placeholder = L.placeholder;
    $("#consent-list").innerHTML = L.cItems.map(i => `<li>${KV.esc(i)}</li>`).join("");
    $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === S.lang)));
    renderContext(); renderConcerns(); renderPath(); renderSchemes(); renderConf(); renderQuick(); renderCtxBar();
  }

  // ---------- Actions ----------
  function setTrade(id, announce) {
    S.trade = id;
    $$("#trades [data-trade]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trade === id)));
    renderPath(); renderCtxBar();
    if (announce) {
      const rec = D.findOutcome(id, S.district);
      kinviaSay(S.lang === "hi"
        ? `${tradeName(id)} चुना गया। ${rec ? "इस ज़िले का सत्यापित रिकॉर्ड उपलब्ध है।" : "इस ज़िले में अभी सत्यापित रिकॉर्ड नहीं है।"} अब कुछ भी पूछें।`
        : `${tradeName(id)} selected. ${rec ? "A verified record exists for this district." : "There is no verified record for this district yet."} Ask anything.`);
    }
  }
  function setDistrict(id) { S.district = id; $("#district").value = id; renderPath(); renderCtxBar(); }

  // Only a consented session reaches the Desk, and only as categorical fields and record ids:
  // the Desk is readable by anyone using this browser, so conversation text never goes there.
  function escalate() {
    const open = S.objections.filter(o => !o.resolved).map(o => o.code);
    addConcern(open[0] || "ESC_REQ", false);
    S.nudged = true;
    if (!S.saving) return kinviaSay(t().ESCguest);
    const id = S.ticket || "T-" + Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, "0");
    const known = c => D.OBJECTIONS[c];
    const ticket = {
      id, at: new Date().toISOString(), lang: S.lang, district: S.district, trade: S.trade, schooling: T.en.schoolOpts[S.schooling],
      concerns: S.objections.filter(o => known(o.code)).map(o => ({ code: o.code, speaker: o.speaker, resolved: o.resolved })),
      open: open.filter(known), evidence: [...S.evidence], status: "open",
    };
    const desk = KV.deskSummaries().filter(x => x.id !== id);
    if (!KV.set("kinvia.deskSummaries", [ticket, ...desk].slice(0, 20))) {
      KV.notice(t().storageError);
      return kinviaSay(t().ESCguest);
    }
    S.ticket = id;
    kinviaSay(t().ESC(id));
  }

  function saveSession() {
    if (!S.saving || !S.objections.length) return;
    const all = KV.sessions();
    const rec = { id: S.id, district: S.district, trade: S.trade, codes: S.objections.map(o => o.code).filter(c => D.OBJECTIONS[c]),
                  before: (S.conf.learner.before + S.conf.parent.before) / 2, after: (S.conf.learner.after + S.conf.parent.after) / 2, at: Date.now() };
    const i = all.findIndex(x => x.id === S.id);
    if (i >= 0) all[i] = rec; else all.push(rec);
    if (!KV.set("kinvia.sessions", all)) KV.notice(t().storageError);
  }

  let trustOpener = null;
  function trustCard(opener = $("#trustbtn")) {
    const L = t();
    const rec = S.trade ? D.findOutcome(S.trade, S.district) : null;
    const latest = new Map();
    S.objections.filter(o => D.OBJECTIONS[o.code]).forEach(o => latest.set(o.code, o));
    const concerns = [...latest.values()];
    const conc = concerns.length ? concerns.map(o => `${D.OBJECTIONS[o.code][S.lang]}${o.resolved ? "" : (S.lang === "hi" ? " (खुला)" : " (open)")}`).join(" · ") : L.tcNone;
    const next = [concerns.some(o => !o.resolved) || S.ticket ? L.tcNextOpen : "", rec ? L.tcNextVisit(rec.provider) : ""].filter(Boolean).join(" ");
    const shown = S.evidence.map(id => D.OUTCOMES.find(o => o.id === id)).filter(Boolean);
    const ev = shown.length ? shown.map(r => `<b>${KV.inr(r.p25)}–${KV.inr(r.p75)}</b> · ${r.placement}% · n = ${r.n} · ${KV.esc(tradeName(r.trade))}, ${KV.esc(distName(r.district))} · ${r.id}`).join("<br>") : "—";
    const schemes = D.SCHEMES.slice(0, 3).map(s => s[S.lang]).join(" · ");
    $("#trustcard").innerHTML = `<div class="trust">
      <div class="trust-top"><div><span class="eyebrow" style="color:var(--rose)">${L.trustTitle}</span><h3 id="trust-title">${KV.esc(tradeName(S.trade) || "—")} · ${KV.esc(distName(S.district))}</h3></div><span class="mono tiny" style="color:rgba(255,255,255,.72)">${S.id}</span></div>
      <div class="trust-body">
        <div class="trust-row"><span>${L.tcEvidence}</span><span>${ev}</span></div>
        <div class="trust-row"><span>${L.tcConcerns}</span><span>${KV.esc(conc)}</span></div>
        <div class="trust-row"><span>${L.tcSchemes}</span><span>${KV.esc(schemes)}</span></div>
        <div class="trust-row"><span>${L.tcNext}</span><span>${KV.esc(next || "—")}</span></div>
      </div>
      <div class="trust-foot"><span>${L.tcFoot}</span><span>${new Date().toLocaleDateString("en-IN")}</span></div></div>`;
    const waText = `${L.trustTitle} — ${tradeName(S.trade) || "-"}, ${distName(S.district)}\n${rec ? `${KV.inr(rec.p25)}–${KV.inr(rec.p75)} / month · ${rec.placement}% placed · n=${rec.n} (${rec.id}, demo data)` : ""}\n${conc}\n${next}`;
    $("#wa").href = "https://wa.me/?text=" + encodeURIComponent(waText);
    if (!$("#trustmodal").open) {
      trustOpener = opener;
      $("#trustmodal").showModal();
    }
    saveSession();
    $("#trustclose").focus();
    return { rec: shown[0] || rec, conc, next, schemes };
  }

  function downloadCard() {
    const { rec, conc, next, schemes } = trustCard();
    const L = t();
    const c = document.createElement("canvas"); c.width = 1080; c.height = 1080;
    const g = c.getContext("2d");
    // Bone paper, graphite header, one gold rule — the on-screen card, printed.
    g.fillStyle = "#faf8ff"; g.fillRect(0, 0, 1080, 1080);
    const wash=(x,y,r,c)=>{const rg=g.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,c);rg.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=rg;g.fillRect(0,0,1080,1080);};
    wash(60,980,640,"rgba(124,92,255,.18)"); wash(1010,900,560,"rgba(231,154,216,.22)");
    const hd=g.createLinearGradient(0,0,1080,272); hd.addColorStop(0,"#5733d4"); hd.addColorStop(1,"#1b1038");
    g.fillStyle = hd; g.fillRect(0, 0, 1080, 272);
    g.fillStyle = "#c89433"; g.fillRect(0, 266, 1080, 6);
    g.fillStyle = "#ecc978"; g.font = "500 25px 'IBM Plex Mono', monospace";
    g.fillText(L.trustTitle.toUpperCase().split("").join(" ").slice(0, 60), 70, 96);
    g.fillStyle = "#ffffff"; g.font = "400 76px 'Bodoni Moda', Georgia, serif";
    g.fillText(`${tradeName(S.trade) || "—"} · ${distName(S.district)}`, 70, 196);
    const wrap = (text, x, y, max, lh) => { let line = ""; for (const w of text.split(" ")) { const tryL = line ? line + " " + w : w; if (g.measureText(tryL).width > max) { g.fillText(line, x, y); y += lh; line = w; } else line = tryL; } g.fillText(line, x, y); return y + lh; };
    let y = 364;
    const row = (label, value) => {
      g.strokeStyle = "rgba(124,92,255,.22)"; g.setLineDash([]); g.lineWidth = 1;
      g.beginPath(); g.moveTo(70, y - 44); g.lineTo(1010, y - 44); g.stroke();
      g.fillStyle = "#7c5cff"; g.font = "500 23px 'IBM Plex Mono', monospace";
      g.fillText(label.toUpperCase(), 70, y);
      y += 46; g.fillStyle = "#241a3d"; g.font = "34px Figtree, Mukta, sans-serif";
      y = wrap(value, 70, y, 940, 46) + 46;
    };
    row(L.tcEvidence, rec ? `${KV.inr(rec.p25)}–${KV.inr(rec.p75)} / month · ${rec.placement}% placed · n = ${rec.n}` : "—");
    row(L.tcConcerns, conc); row(L.tcSchemes, schemes); row(L.tcNext, next || "—");
    g.strokeStyle = "rgba(124,92,255,.22)"; g.setLineDash([]); g.beginPath(); g.moveTo(70, 992); g.lineTo(1010, 992); g.stroke();
    g.fillStyle = "#8f87a8"; g.font = "21px 'IBM Plex Mono', monospace";
    g.fillText(`${rec ? rec.id + " · " : ""}${L.tcFoot}`.slice(0, 74), 70, 1034);
    const a = document.createElement("a"); a.download = `kinvia-trust-card-${S.id}.png`; a.href = c.toDataURL("image/png"); a.click();
  }

  // ---------- Voice input ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null, micTimer = null;
  function micState(msg) {
    const el = $("#micstate");
    el.textContent = msg || "";
    el.hidden = !msg;
  }
  function toggleMic() {
    const btn = $("#mic");
    if (!SR) return kinviaSay(t().micNo);
    if (rec) { rec.stop(); return; }
    clearTimeout(micTimer);
    const current = rec = new SR(), version = generation;
    current.lang = S.lang === "hi" ? "hi-IN" : "en-IN"; current.interimResults = true;
    let got = false;
    // Interim results are shown in the input so the family can see it is hearing them.
    current.onresult = e => {
      if (version !== generation || rec !== current) return;
      const r = e.results[e.results.length - 1];
      $("#msg").value = r[0].transcript;
      if (r.isFinal) { got = true; $("#form").requestSubmit(); }
    };
    const finish = failed => {
      if (version !== generation || rec !== current) return;
      rec = null; btn.setAttribute("aria-pressed", "false");
      micState(failed || !got ? t().micErr : "");
      if (failed || !got) micTimer = setTimeout(() => micState(""), 3000);
    };
    current.onend = () => finish(false);
    current.onerror = () => finish(true);
    btn.setAttribute("aria-pressed", "true"); micState(t().listening);
    try { current.start(); } catch { finish(true); }
  }

  function downloadTranscript() {
    const L = t(), rec = S.trade ? D.findOutcome(S.trade, S.district) : null;
    const lines = [
      `Kinvia — ${L.title}`, `${S.id} · ${new Date().toLocaleString("en-IN")}`,
      `${L.district}: ${distName(S.district)}`, `${L.trade}: ${tradeName(S.trade) || "—"}`,
      rec ? `${L.tcEvidence}: ${KV.inr(rec.p25)}–${KV.inr(rec.p75)} / month · ${rec.placement}% · n=${rec.n} (${rec.id})` : "",
      "", "— ".repeat(24), "",
      ...S.messages.map(m => `${m.role === "kinvia" ? "Kinvia" : (m.role === "learner" ? L.learner : L.parent)}: ${m.text}`),
      "", "— ".repeat(24), "",
      `${L.concerns}: ${S.objections.filter(o => D.OBJECTIONS[o.code]).map(o => `${D.OBJECTIONS[o.code][S.lang]} (${o.resolved ? L.resolved : L.unresolved})`).join(", ") || "—"}`,
      S.ticket ? `Ticket: ${S.ticket}` : "",
      "", L.tcFoot,
    ].filter(l => l !== "");
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.download = `kinvia-session-${S.id}.txt`; a.href = url; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- Wiring ----------
  function start(saving) {
    S.saving = saving;
    $("#consent").close();
    kinviaSay(t().welcome, { instant: true, quick: true });
    if (!saving) kinviaSay(t().guest);
    if (!S.trade) kinviaSay(t().pickTrade, { html: inlineTrades() });
    $("#msg").focus();
  }
  function setLang(l) {
    S.lang = l; applyText();
    if (!KV.set("kinvia.lang", l)) KV.notice(t().storageError);
  }

  function resetSession(showConsent = true) {
    generation++;
    if (pendingReply) { clearTimeout(pendingReply.timer); pendingReply.resolve(); pendingReply = null; }
    chain = Promise.resolve(); hideTyping();
    if (rec) {
      const current = rec; rec = null;
      current.onresult = current.onend = current.onerror = null;
      try { current.abort(); } catch { /* already stopped */ }
    }
    clearTimeout(micTimer); micState("");
    $("#mic").setAttribute("aria-pressed", "false");
    window.speechSynthesis?.cancel();
    const lang = S.lang; S = fresh(); S.lang = lang;
    log().innerHTML = ""; $("#msg").value = "";
    $("#trustmodal").close(); $("#trustcard").replaceChildren(); $("#wa").removeAttribute("href");
    $("#consent-ok").checked = false; $("#consent-go").disabled = true;
    $$("[data-speaker]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.speaker === S.speaker)));
    applyText();
    if (showConsent && !$("#consent").open) $("#consent").showModal();
  }

  $$("[data-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  $$("[data-speaker]").forEach(b => b.addEventListener("click", () => {
    S.speaker = b.dataset.speaker;
    $$("[data-speaker]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  }));
  $("#consent-ok").addEventListener("change", e => { $("#consent-go").disabled = !e.target.checked; });
  $("#consent-go").addEventListener("click", () => start(true));
  $("#consent-guest").addEventListener("click", () => start(false));
  $("#consent-read").addEventListener("click", () => KV.speak([t().cTitle, ...t().cItems].join(". "), S.lang));
  $("#district").addEventListener("change", e => { setDistrict(e.target.value); if (S.trade) setTrade(S.trade, true); });
  $("#schooling").addEventListener("change", e => { S.schooling = +e.target.value; });
  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    const text = $("#msg").value.trim();
    if (!text) return;
    $("#msg").value = "";
    userSay(text);
    respond(classify(text), text);
    $("#msg").focus();
  });
  $("#transcript").addEventListener("click", downloadTranscript);
  $("#mic").addEventListener("click", toggleMic);
  $("#escalate").addEventListener("click", () => { userSay(t().escalate); escalate(); });
  $("#trustbtn").addEventListener("click", () => trustCard($("#trustbtn")));
  $("#trustclose").addEventListener("click", () => $("#trustmodal").close());
  $("#trustmodal").addEventListener("close", () => {
    if (trustOpener?.isConnected && !$("#consent").open) trustOpener.focus();
    trustOpener = null;
  });
  $("#dl").addEventListener("click", downloadCard);
  $("#print").addEventListener("click", () => window.print());
  $("#restart").addEventListener("click", () => {
    saveSession();
    resetSession();
  });
  window.addEventListener("pagehide", () => { saveSession(); resetSession(false); });
  window.addEventListener("pageshow", e => { if (e.persisted) resetSession(); });
  $("#consent").addEventListener("cancel", e => e.preventDefault());

  document.querySelectorAll("[data-icon]").forEach(el => el.insertAdjacentHTML("afterbegin", KV_ICON(el.dataset.icon)));

  applyText();
  const legacyWarning = $("#legacy-storage-status");
  if (legacyWarning) $("#consent .dialog").append(legacyWarning);
  $("#consent").showModal();
})();
