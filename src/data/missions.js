var module = { exports: {} };
/* ============================================================
   SCHOLARVERSE — MISSIONS, XP AND GAMIFICATION
   Every action earns XP. Every target has a mission chain.
   ============================================================ */

/* ------------------------------------------------------------
   LEVELS — progression with real meaning
   ------------------------------------------------------------ */
const LEVELS = [
  { level: 1,  title: "Applicant",              xp: 0,    icon: "🌱" },
  { level: 2,  title: "Planner",                xp: 150,  icon: "📋" },
  { level: 3,  title: "Preparer",               xp: 350,  icon: "✍️" },
  { level: 4,  title: "Strategist",             xp: 600,  icon: "🎯" },
  { level: 5,  title: "Portfolio Builder",      xp: 900,  icon: "📚" },
  { level: 6,  title: "Shortlist Contender",    xp: 1300, icon: "⚔️" },
  { level: 7,  title: "Interview Candidate",    xp: 1800, icon: "🎤" },
  { level: 8,  title: "Offer Holder",           xp: 2400, icon: "🏅" },
  { level: 9,  title: "Scholar",                xp: 3200, icon: "🎓" },
  { level: 10, title: "ScholarVerse Legend",    xp: 4200, icon: "👑" }
];

/* ------------------------------------------------------------
   ACHIEVEMENTS — unlockable badges
   ------------------------------------------------------------ */
const ACHIEVEMENTS = [
  { id: "first-step",     name: "First Step",           icon: "👣", xp: 25,  desc: "Complete your first mission" },
  { id: "test-booked",    name: "Test Booked",          icon: "📝", xp: 50,  desc: "Book your IELTS Academic test" },
  { id: "employer-cert",  name: "Employer Onboard",     icon: "🏦", xp: 60,  desc: "Obtain the Certificate of Employment" },
  { id: "two-refs",       name: "Two Referees Locked",  icon: "🤝", xp: 50,  desc: "Secure two referees" },
  { id: "epos-ready",     name: "EPOS Ready",           icon: "📦", xp: 100, desc: "Complete the full EPOS document pack" },
  { id: "submitted-1",    name: "First Submission",     icon: "🚀", xp: 150, desc: "Submit your first application" },
  { id: "submitted-3",    name: "Portfolio Started",    icon: "🎯", xp: 250, desc: "Submit three applications" },
  { id: "submitted-8",    name: "Serious Contender",    icon: "⚔️", xp: 400, desc: "Submit eight applications" },
  { id: "sweden-bound",   name: "Sweden Bound",         icon: "🇸🇪", xp: 100, desc: "Submit the Swedish university application" },
  { id: "paper-drafted",  name: "Researcher",           icon: "📄", xp: 200, desc: "Draft your yield-curve working paper" },
  { id: "prof-outreach",  name: "Networker",            icon: "✉️", xp: 120, desc: "Send 20 professor emails" },
  { id: "prof-reply",     name: "He Replied",           icon: "💬", xp: 150, desc: "Receive your first professor reply" },
  { id: "streak-7",       name: "One Week Strong",      icon: "🔥", xp: 80,  desc: "Maintain a 7-day streak" },
  { id: "streak-30",      name: "Relentless",           icon: "🔥", xp: 300, desc: "Maintain a 30-day streak" },
  { id: "no-deadline-missed", name: "Nothing Missed",   icon: "🛡️", xp: 200, desc: "Pass a month with no missed deadlines" },
  { id: "funded",         name: "FUNDED",               icon: "🏆", xp: 1000, desc: "Accept a funded offer" }
];

/* ------------------------------------------------------------
   MISSION CHAINS — the actual work, in order
   Each mission: id, title, detail, why, xp, target(s), owner, deadline, category
   ------------------------------------------------------------ */
const MISSIONS = [

  /* =====  CRITICAL PATH — THIS WEEK  ===== */
  {
    id: "book-ielts",
    title: "Decide the English-test question (Göttingen: NOT needed)",
    detail: "⚠️ REVISED after Göttingen replied on 13 Oct 2026. They confirmed IN WRITING that your Medium of Instruction certificate is sufficient: 'Yes, your University attestating that your degree was entirely taught in English is sufficient and meets the language criteria.' So IELTS is NOT required for Göttingen. It may still be required for SISGP, EMJM, EPFL, EMLE and Hohenheim — and Hohenheim's published wording differs.",
    why: "This mission previously said the lack of IELTS 'blocks EVERYTHING'. That was WRONG for Göttingen, and Göttingen told you so directly. The real remaining question is which OTHER targets still need a test. Hohenheim has NOT been asked and its published wording says a university certificate is 'NOT SUFFICIENT... There are no exceptions' — so email them and ask the same question you asked Göttingen.",
    xp: 100,
    targets: ["sisgp", "hohenheim", "emjm", "epfl"],
    owner: "You",
    deadline: "2026-11-15",
    urgency: "high",
    category: "English",
    unlock: [],
    actionUrl: "https://ielts.org",
    checklist: [
      "✅ DONE — Göttingen confirmed the MOI certificate is sufficient (13 Oct 2026)",
      "Email Hohenheim the SAME question and ask whether they accept it",
      "Check each remaining target's official page for its English requirement",
      "Book IELTS ONLY if a target you actually want still requires it",
      "If you do book: Academic, not General Training, earliest Dhaka slot",
      "Save any written confirmation — Göttingen's reply is now your evidence"
    ]
  },
  {
    id: "credit-audit",
    title: "Review & Send Göttingen Transcript Credit Audit",
    detail: "✅ AUDITED & VERIFIED 100% PASS: Your BUP BSS in Economics comprises 126.0 total credits. Pure Economics: 87.0 credits (29 courses / 69.0% vs. 33.3% required). Dedicated Mathematics, Statistics & Econometrics: 27.0 credits across 9 semester courses (21.4% vs. 6.7% / 12 credits required). You possess more than TRIPLE the required quantitative credits!",
    why: "Göttingen EPOS eligibility is UNLOCKED. No credit or language blockers remain. The email reply is drafted with your exact 126-credit breakdown, ready to copy and send to epos-devecon@uni-goettingen.de.",
    xp: 150,
    targets: ["goettingen"],
    owner: "You",
    deadline: "2026-10-26",
    urgency: "high",
    category: "Eligibility",
    unlock: [],
    actionUrl: "https://www.uni-goettingen.de/en/572462.html",
    checklist: [
      "✅ DONE: 126 credits audited across all 42 courses from BUP Module Book",
      "✅ DONE: 87 credits confirmed in pure Economics (Micro, Macro, Public, Trade, Dev)",
      "✅ DONE: 27 credits confirmed in Math & Stats across 9 dedicated courses",
      "Copy-paste the prepared audit breakdown into the Göttingen email thread",
      "Attend the Zoom info session on 26 October at 2:30pm CEST (6:30pm Dhaka)",
      "Submit application through Göttingen EPOS portal before 15 November 2026"
    ]
  },
  {
    id: "employer-cert",
    title: "Obtain Certificate of Employment from City Bank",
    detail: "Request an official Certificate of Employment covering BOTH roles (Management Trainee Mar 2024–Feb 2025, and Associate Manager Mar 2025–present). Also request one from bKash for Oct 2023–Jan 2024.",
    why: "MANDATORY for DAAD EPOS. It must prove you are currently employed and meet the 2+ year minimum. Dates and titles must align EXACTLY with your CV — mismatched dates are a stated rejection reason.",
    xp: 120,
    targets: ["goettingen", "hohenheim", "sisgp"],
    owner: "City Bank HR",
    deadline: "2026-10-14",
    urgency: "critical",
    category: "Documents",
    actionUrl: "https://www.thecitybank.com",
    actionLabel: "City Bank Portal",
    submissionGuide: "Where & how: Request from City Bank HR Operations (Dhaka). Ensure letterhead includes date of issue, official company seal, and physical or code-certified digital signature by HR Manager. Required for upload in Göttingen portal and Hohenheim application package.",
    sources: [
      { label: "DAAD EPOS Checklist - Section: Professional Experience", url: "https://www.static.tu.berlin/fileadmin/www/40000121/Dokumente_Formulare/EPOS_Checklist_2023.pdf" },
      { label: "Göttingen EPOS Document Requirements #11", url: "https://www.uni-goettingen.de/en/572463.html" },
      { label: "Hohenheim AgEcon Required Documents - Employment Certificate", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    checklist: [
      "Email City Bank HR requesting the certificate",
      "Specify both roles with exact start/end months (MT Mar 2024–Feb 2025; AM Mar 2025–present)",
      "Request bKash certificate for Oct 2023 – Jan 2024",
      "Confirm letterhead, signature, official stamp, current date",
      "NOT in a sealed envelope (you must scan it)",
      "Check the dates match your CV to the month"
    ]
  },
  {
    id: "employer-letter",
    title: "Obtain employer recommendation letter",
    detail: "Request a recommendation letter from your line manager at City Bank.",
    why: "MANDATORY for DAAD EPOS. Must be on official letterhead with position and referee contact details, signed and dated, unsealed — and ideally include a re-employment guarantee.",
    xp: 120,
    targets: ["goettingen", "hohenheim"],
    owner: "City Bank manager",
    deadline: "2026-10-16",
    urgency: "critical",
    category: "Documents",
    submissionGuide: "Where & how: Have your direct supervisor / Head of Treasury sign on official bank letterhead with direct corporate email and phone. Do not seal; scan to PDF for direct upload.",
    sources: [
      { label: "DAAD EPOS Regulations on Recommendation Letters", url: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777" },
      { label: "Hohenheim Official AgEcon Recommendation Rules", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    checklist: [
      "Ask your line manager (or Head of Treasury)",
      "Share your CV and the EPOS criteria with them",
      "Request: letterhead, position, contact details, signature, date",
      "Ask for a re-employment guarantee if possible ('Mr. Hasan is expected to resume his duties upon completion...')",
      "Keep it unsealed and scan in color at 300 DPI"
    ]
  },
  {
    id: "ranking-letter",
    title: "Request ranking letter from BUP",
    detail: "Ask BUP to certify your class standing — top half or better if true. Also request an ECTS equivalence statement.",
    why: "Hohenheim names this explicitly as acceptable evidence. Your 2.05 already clears Hohenheim's 2.5 bar, so it is not needed there — but Göttingen's 'upper third' wording is vaguer and this is your best defence. The ECTS statement separately gates EMLE.",
    xp: 90,
    targets: ["goettingen", "emjm"],
    owner: "BUP",
    deadline: "2026-10-20",
    urgency: "high",
    category: "Documents",
    actionUrl: "https://bup.edu.bd",
    actionLabel: "BUP Registrar Portal",
    submissionGuide: "Where & how: Apply to BUP Controller of Examinations / Registrar Office. Request letter stating either class rank (e.g. top 20%) or that 3.30 is in the upper third of the graduating cohort.",
    sources: [
      { label: "Hohenheim Ranking Letter Requirement (Clause 2.5)", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" },
      { label: "DAAD EPOS Upper-Third Grade Standard", url: "https://www.static.tu.berlin/fileadmin/www/40000121/Dokumente_Formulare/EPOS_Checklist_2023.pdf" }
    ],
    checklist: [
      "Request a ranking letter (top half / upper third if true)",
      "Request an ECTS equivalence statement for the BSS degree",
      "Ask for the grading scale to be stated",
      "Get both in English"
    ]
  },
  {
    id: "epos-form",
    title: "Download, print, sign and rescan the EPOS checklist + form",
    detail: "Download the official DAAD EPOS checklist and application form. Fill the form, print both, sign with an ink pen (original physical signature), and scan to PDF. Keep local copies ready for both university portal submission and DAAD portal upload.",
    why: "It sounds absurd but it is a LITERAL requirement stated on the DAAD form: 'Checklist: mandatory documents... original signature (no inserted scan)'. An unsigned, digitally typed, or digitally pasted signature can invalidate the application at the formal screening stage.",
    xp: 60,
    targets: ["goettingen", "hohenheim"],
    owner: "You",
    deadline: "2026-10-18",
    urgency: "high",
    category: "Application",
    actionUrl: "downloads/EPOS_Checklist.pdf",
    actionLabel: "📥 Download Official EPOS Checklist (PDF)",
    actionUrl2: "downloads/EPOS_Application_Form.docx",
    actionLabel2: "📥 Download DAAD Application Form (DOCX)",
    portalUrl: "https://www.uni-goettingen.de/en/572462.html",
    portalLabel: "🏛️ Göttingen EPOS Application Portal",
    checklist: [
      "Download the official EPOS Checklist PDF (link above or local download)",
      "Download the official DAAD Application Form (DOCX / fillable format)",
      "Fill Table 1 (Personal data: Hasibul Hasan, BUP BSS Economics, CFA charter)",
      "Fill Table 2 (1st Choice: Göttingen M.Sc. Development Economics; 2nd Choice: Hohenheim M.Sc. Agricultural Economics)",
      "Fill Table 3 (Current: Associate Manager, Treasury ALM, City Bank PLC)",
      "Print both documents physically on A4 paper",
      "Sign both by hand with a blue or black ink pen (with date and place: Dhaka, Bangladesh)",
      "Scan to high-resolution clean PDFs (color or clear grayscale, 300 DPI)",
      "Keep copies of everything — you re-upload to the DAAD Portal if nominated"
    ],
    sources: [
      { label: "DAAD Official EPOS Checklist PDF", url: "https://www.static.tu.berlin/fileadmin/www/40000121/Dokumente_Formulare/EPOS_Checklist_2023.pdf" },
      { label: "Hohenheim Official DAAD EPOS Form (DOCX)", url: "https://www.uni-hohenheim.de/fileadmin/uni_hohenheim/Studiengaenge/Agrar/Master/agecon/EPOS_2025_EN_FINAL.docx" },
      { label: "Göttingen EPOS Application Guidelines", url: "https://www.uni-goettingen.de/en/572462.html" },
      { label: "Göttingen Required Documents Regulations", url: "https://www.uni-goettingen.de/en/572463.html" },
      { label: "Hohenheim EPOS Scholarship Regulations", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    submissionGuide: "Where to submit:\n1. Göttingen: Upload PDF in Step 3 of the online portal (https://www.uni-goettingen.de/en/572462.html) before 15 November 2026.\n2. Hohenheim: Email to agecon@uni-hohenheim.de (Subject: 'DAAD - [HohCampus No.] - Hasibul Hasan') AND submit HohCampus portal before 15 December 2026."
  },
  {
    id: "europass-cv",
    title: "Build the Europass CV (no unexplained gaps)",
    detail: "Build a CV in reverse chronological order using the official Europass template. Declare the February 2024 gap honestly.",
    why: "LITERAL EPOS requirement: 'CV in reverse chronological order with no unexplained gaps.' February 2024 IS a real gap — declare it rather than stretching dates.",
    xp: 70,
    targets: ["goettingen", "hohenheim"],
    owner: "You",
    deadline: "2026-10-22",
    urgency: "high",
    category: "Writing",
    actionUrl: "https://europa.eu/europass/eportfolio/screen/cv-editor?lang=en",
    actionLabel: "🌐 Official Europass CV Editor",
    sources: [
      { label: "European Union Official Europass Portal", url: "https://europa.eu/europass/en" },
      { label: "DAAD EPOS Checklist - Section: CV Format", url: "https://www.static.tu.berlin/fileadmin/www/40000121/Dokumente_Formulare/EPOS_Checklist_2023.pdf" }
    ],
    submissionGuide: "Where to create & submit: Create online at europa.eu/europass, export as clean PDF, and upload in Step 3 of the Göttingen Application Portal and attach to Hohenheim application email.",
    checklist: [
      "Use the official Europass online builder",
      "Reverse chronological order",
      "Declare Feb 2024 as a transition gap",
      "Add a Publications/Research section",
      "Include the CFA charter prominently (EQF Level 7)",
      "Add a note: 3.30/4.00 converts to German 2.05; thesis GPA 4.00/4.00"
    ]
  },
  {
    id: "epos-motivation",
    title: "Write the EPOS motivation letter (ONE uniform letter)",
    detail: "Write ONE motivation letter (max 2 pages, dated) that serves BOTH Göttingen and Hohenheim, and includes a paragraph justifying your ranking of the courses.",
    why: "DAAD: 'you have to submit one motivation letter explaining why you are applying for these specific courses and why you chose that priority. If this information is ignored, the application cannot be considered or an already awarded scholarship might be withdrawn.'",
    xp: 150,
    targets: ["goettingen", "hohenheim"],
    owner: "You",
    deadline: "2026-10-28",
    urgency: "high",
    category: "Writing",
    actionUrl: "https://www.uni-goettingen.de/en/572462.html",
    actionLabel: "Göttingen EPOS Motivation Guide",
    sources: [
      { label: "DAAD Motivation Letter Regulation", url: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777" },
      { label: "Hohenheim Priority Ranking Letter Rules", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    submissionGuide: "Where & how: Type in English, maximum 2 pages, sign and date at the bottom. Upload to Göttingen portal and email to Hohenheim.",
    checklist: [
      "Max 2 pages, dated",
      "Cover academic, professional and personal reasons",
      "Include the ranking paragraph — why these courses, why this order",
      "Lead with the developmental framing: a yield curve is financial infrastructure",
      "Name specific modules and faculty",
      "Use STAR structure; 'I' not 'we'",
      "Write it YOURSELF — AI-generated text is screened for and disqualifying"
    ],
    warning: "Do NOT use AI to generate this. Both DAAD and Chevening actively screen for AI-generated text, and Chevening requires a signed declaration. I coach the structure — you write the sentences."
  },
  {
    id: "certified-translations",
    title: "Order certified translations (degree, transcript, HSC)",
    detail: "Order certified English translations of your degree certificate, full transcript, and HSC certificate.",
    why: "MANDATORY for EPOS. Your HSC is almost certainly in Bengali. The degree and transcript may be in English — verify. Transcripts must also state the grading scale; if not, a supplement is required.",
    xp: 80,
    targets: ["goettingen", "hohenheim"],
    owner: "Translation service",
    deadline: "2026-10-25",
    urgency: "high",
    category: "Documents",
    submissionGuide: "Where & how: Contact an authorized notary or official certified translation agency in Dhaka. BUP degree and transcript are in English, but HSC certificate/mark sheet issued in Bengali requires a certified notary English translation with official stamp and seal.",
    sources: [
      { label: "Göttingen Document Translation Clause", url: "https://www.uni-goettingen.de/en/572463.html" },
      { label: "DAAD Translation Certification Standards", url: "https://www.daad.de/en/studying-in-germany/requirements/application-process/" }
    ],
    checklist: [
      "Check whether degree and transcript are already in English",
      "HSC is likely Bengali — needs certified translation",
      "Confirm the transcript states the grading scale",
      "Order 2+ certified copies of each",
      "Keep the originals safe"
    ]
  },
  {
    id: "submit-goettingen",
    title: "SUBMIT Göttingen EPOS",
    detail: "Submit the complete EPOS application to the University of Göttingen before 15 November 2026.",
    why: "This is your most immediate hard deadline. One application covers both the programme and the funding. Roughly 6–7 scholarships a year. No late applications.",
    xp: 200,
    targets: ["goettingen"],
    owner: "You",
    deadline: "2026-11-15",
    urgency: "critical",
    category: "Submission",
    actionUrl: "https://www.uni-goettingen.de/en/572462.html",
    actionLabel: "🏛️ Göttingen Online Application Portal",
    submissionGuide: "Where & how: Portal opens Oct 1 – Nov 15. Create account, select 'Regular Procedure' -> 'Development Economics with DAAD EPOS SCHOLARSHIP'. Complete Step 1 (Acquired skills), Step 2 (Declarations), Step 3 (Upload all PDF documents), then click 'Submit Application'.",
    sources: [
      { label: "Göttingen EPOS Application Portal", url: "https://www.uni-goettingen.de/en/572462.html" },
      { label: "Göttingen Application Guide PDF", url: "https://www.uni-goettingen.de/de/document/download/286b93d1993ca230ab1a72d483aa26ec.pdf/Application%20Guide_2026_v2.pdf" }
    ],
    checklist: [
      "Signed EPOS checklist",
      "EPOS application form",
      "Europass CV (no gaps)",
      "Motivation letter with ranking paragraph",
      "Employer recommendation letter",
      "Certificate(s) of Employment",
      "Degree certificates + certified translations",
      "Full transcripts + grading scale explanation",
      "HSC + certified translation",
      "Submit BEFORE 15 November"
    ]
  },

  /* =====  SWEDEN PATH  ===== */
  {
    id: "submit-swedish-uni",
    title: "Submit the Swedish university application",
    detail: "Apply to 3–4 eligible master's programmes via universityadmissions.se. Applications open ~16 October 2026 and close ~15 January 2027.",
    why: "THIS IS THE GATE. SISGP states you must be 'admitted (or conditionally admitted) to one of the eligible master's programmes on the day of admissions announcements.' Reserve listings are not accepted. No admission = no scholarship.",
    xp: 200,
    targets: ["sisgp"],
    owner: "You",
    deadline: "2027-01-15",
    urgency: "critical",
    category: "Submission",
    actionUrl: "https://www.universityadmissions.se/intl/start",
    actionLabel: "🏛️ UniversityAdmissions.se Sweden Portal",
    submissionGuide: "Where & how: Register on universityadmissions.se (Sweden's national central portal). Select up to 4 eligible master's programmes in Economics/Finance (Stockholm University, Lund, Uppsala, Gothenburg). Pay 900 SEK application fee and upload transcripts by late January deadline.",
    sources: [
      { label: "UniversityAdmissions.se Swedish Central Portal", url: "https://www.universityadmissions.se/intl/start" },
      { label: "Swedish Institute Scholarship Application Procedure", url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/" }
    ],
    checklist: [
      "Create a universityadmissions.se account",
      "Shortlist 3–4 programmes from the eligible list",
      "Re-verify against the 2027/28 list published ~mid-Nov 2026",
      "Prepare degree certificate + transcript + IELTS",
      "Submit before 15 January 2027",
      "PAY the application fee on time — SISGP requires it"
    ]
  },
  {
    id: "collect-leadership-evidence",
    title: "Assemble your leadership evidence dossier",
    detail: "Compile documented evidence of leadership for the SISGP application.",
    why: "SISGP requires 'demonstrated leadership experience from a current or previous employer, or from civil society engagement.' This is a real gate, not a formality. You have the evidence — it must be assembled.",
    xp: 110,
    targets: ["sisgp"],
    owner: "You",
    deadline: "2026-12-01",
    urgency: "high",
    category: "Documents",
    actionUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    actionLabel: "🌐 Swedish Institute Leadership Requirements",
    submissionGuide: "Where & how: Assemble written verification letters using the official Swedish Institute template. Have your City Bank line manager or BUP faculty sign confirming your leadership roles.",
    sources: [
      { label: "Swedish Institute Leadership Criteria", url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/" }
    ],
    checklist: [
      "Derivatives course you teach to treasury colleagues — get evidence",
      "BAFEDA/BAMDA representation on behalf of City Bank",
      "Level 2 Reward & Recognition for the cross-divisional MIS dashboard",
      "Promotion letter to Manager (January 2027)",
      "Joint Secretary, BUP Economics Club — led ECONTALK & POMAC",
      "Cadet Corporal, BNCC; House Leader (led house to Football Championship twice)"
    ]
  },
  {
    id: "submit-sisgp",
    title: "SUBMIT SISGP scholarship application",
    detail: "Submit the SI Scholarship application during the two-week window in February 2027.",
    why: "Full tuition + SEK 12,000/month + SEK 15,000 travel. This is your best overall target. The portal is open for TWO WEEKS ONLY and closes at 14:59 CET on the final day.",
    xp: 200,
    targets: ["sisgp"],
    owner: "You",
    deadline: "2027-02-25",
    urgency: "critical",
    category: "Submission",
    actionUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    actionLabel: "🇸🇪 Swedish Institute Portal",
    submissionGuide: "Where & how: Apply online on the Swedish Institute scholarship portal in February (portal open ~9–25 Feb). Submit SI Europass CV, Proof of Work (City Bank + bKash), and Proof of Leadership. Must have application number from universityadmissions.se.",
    sources: [
      { label: "Swedish Institute Global Professionals Call", url: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/" }
    ],
    checklist: [
      "Confirm you are admitted to an eligible programme",
      "Complete the SI work-experience certification forms (their template)",
      "Motivate how your studies serve Bangladesh's sustainable development",
      "Submit before 14:59 CET on the final day"
    ]
  },

  /* =====  HOHENHEIM PATH  ===== */
  {
    id: "agecon-pretest",
    title: "Complete the AgEcon PreTest",
    detail: "Complete Hohenheim's AgEcon PreTest (self-evaluation online quiz) and save the completion confirmation certificate.",
    why: "Hohenheim requires proof of self-evaluation through the AgEcon PreTest as a mandatory admission document for MSc Agricultural Economics.",
    xp: 50,
    targets: ["hohenheim"],
    owner: "You",
    deadline: "2026-12-05",
    urgency: "medium",
    category: "Application",
    actionUrl: "https://www.uni-hohenheim.de/bewerbung-agecon-pre-test",
    actionLabel: "📝 Open AgEcon PreTest Portal",
    submissionGuide: "Where & how: Complete the online self-test at Hohenheim's portal. Print or save the resulting PDF certificate. Attach it to your application email to agecon@uni-hohenheim.de.",
    sources: [
      { label: "Hohenheim AgEcon PreTest Regulation", url: "https://www.uni-hohenheim.de/bewerbung-agecon-pre-test" },
      { label: "Hohenheim AgEcon Scholarship Requirements", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    checklist: [
      "Access Hohenheim AgEcon PreTest page",
      "Complete the self-evaluation test in economics & statistics",
      "Save the confirmation result as PDF",
      "Include with application documents"
    ]
  },
  {
    id: "hohcampus",
    title: "Create HohCampus account and start the application",
    detail: "Register on HohCampus and begin Hohenheim's application — this is SEPARATE from the email submission.",
    why: "⚠️ Hohenheim requires a TWO-PART application: email the PDFs to agecon@uni-hohenheim.de AND apply via HohCampus. Both are required.",
    xp: 60,
    targets: ["hohenheim"],
    owner: "You",
    deadline: "2026-11-20",
    urgency: "high",
    category: "Application",
    actionUrl: "https://hohcampus.verw.uni-hohenheim.de",
    actionLabel: "🏛️ Open HohCampus Portal",
    submissionGuide: "Where & how: Register on hohcampus.verw.uni-hohenheim.de. Note that HohCampus opens for Winter semester in mid-November. Create application, obtain HohCampus Application Number, and quote this number in your email to agecon@uni-hohenheim.de.",
    sources: [
      { label: "HohCampus Application Portal", url: "https://hohcampus.verw.uni-hohenheim.de" },
      { label: "Hohenheim Application Guide", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" }
    ],
    checklist: [
      "Create account on HohCampus",
      "Start application for MSc Agricultural Economics",
      "Note the generated application number",
      "Quote application number in DAAD email subject"
    ]
  },
  {
    id: "submit-hohenheim",
    title: "SUBMIT Hohenheim EPOS (both parts)",
    detail: "Submit by email to agecon@uni-hohenheim.de AND via HohCampus before 15 December 2026.",
    why: "The safer of your two EPOS routes — your 2.05 clears their explicit 2.5 threshold, tuition is waived, and English results are accepted until 6 January. Name files as 'Number - Surname Name - Document Type'.",
    xp: 200,
    targets: ["hohenheim"],
    owner: "You",
    deadline: "2026-12-15",
    urgency: "critical",
    category: "Submission",
    actionUrl: "mailto:agecon@uni-hohenheim.de",
    actionLabel: "✉️ Email Documents to agecon@uni-hohenheim.de",
    portalUrl: "https://hohcampus.verw.uni-hohenheim.de",
    portalLabel: "🏛️ HohCampus Portal",
    submissionGuide: "Where & how: 1. Send email to agecon@uni-hohenheim.de with subject 'DAAD - [HohCampus Number] - Hasan Hasibul'. Attach separate PDFs named '1 - Hasan Hasibul - DAAD Application Form.pdf', '2 - Hasan Hasibul - Motivation Letter.pdf', etc.\n2. Submit corresponding online application on HohCampus before 15 December 2026.",
    sources: [
      { label: "Hohenheim AgEcon Scholarship Regulations", url: "https://www.uni-hohenheim.de/en/agecon-scholarships" },
      { label: "Hohenheim AgEcon Admission Regulations PDF", url: "https://www.uni-hohenheim.de/fileadmin/uni_hohenheim/Studiengaenge/Agrar/Master/ZS_msc_Agrar_englisch_EN.pdf" }
    ],
    checklist: [
      "Ensure HohCampus application is completed",
      "Format PDFs with exact naming standard: 'Number - Surname Name - Document Type'",
      "Attach signed EPOS checklist and DAAD form",
      "Attach Europass CV and Motivation letter",
      "Attach City Bank Certificate of Employment and Recommendation letter",
      "Attach Degree, Transcripts, and translations",
      "Attach PreTest confirmation",
      "Send email to agecon@uni-hohenheim.de before 15 December 2026"
    ]
  },

  /* =====  EMJM / EPFL / EIFFEL  ===== */
  {
    id: "emjm-shortlist",
    title: "Confirm the 3 EMJM economics consortia",
    detail: "Your verified shortlist is EGEI (Economics of Globalisation, coordinator Italy/Bari — best fit), GLOBAL COOP (Economic Policies for New Global Cooperation, coordinator Brazil) and GLODEP (Global Development Policy, coordinator Czechia). The cap IS 3, so this is complete. From mid-November 2026, check each consortium publishes its 2027/28 call with a scholarship, then confirm the exact monthly figure — EGEI's page quotes €1,000 (old EMJMD action) while the current framework is €1,400.",
    why: "Max 3 applications (VERIFIED, stated by QEM and EMLE). There is no central EU application — you apply direct to each consortium. And the 10% same-nationality cap means applying to only one is strategically weak.",
    xp: 90,
    targets: ["emjm"],
    owner: "You",
    deadline: "2026-11-30",
    urgency: "high",
    category: "Research",
    checklist: [
      "Watch epog.eu, master-egei.eu and the EACEA catalogue from mid-November 2026",
      "Use the EACEA RSS feed workaround: eacea.ec.europa.eu/node/253/rss_en",
      "Confirm EGEI awards a scholarship for 2027/28 and resolve the €1,000 vs €1,400 discrepancy",
      "Verify GLOBAL COOP's consortium and deadline (newly selected — little published)",
      "Decide whether GLODEP is worth a slot given it is development, not finance",
      "Do NOT apply to QEM — it awards no EMJM scholarship",
      "Request an ECTS statement from BUP (gates EMLE)"
    ],
    warning: "🔴 The 10% nationality cap limits any single nationality to ~10% of a consortium's scholarships. With ~15 awards that is ~1–2 places. This is why you must apply to all 3 permitted programmes."
  },
  {
    id: "emjm-apply-3",
    title: "Submit 3 EMJM applications",
    detail: "Submit your three Erasmus Mundus applications as consortia windows open (Nov 2026 – Jan 2027).",
    why: "Highest total value available to you: ~€51,600 over two years (€1,400/month + full tuition + travel + €1,000 installation).",
    xp: 180,
    targets: ["emjm"],
    owner: "You",
    deadline: "2027-01-12",
    urgency: "high",
    category: "Submission"
  },
  {
    id: "epfl-apply",
    title: "Apply to EPFL and tick the Excellence Fellowship box",
    detail: "Apply for admission to an EPFL master's (Financial Engineering / Statistics / Applied Mathematics) and tick the Excellence Fellowship box. Round 1 closes 15 December 2026.",
    why: "Best effort-to-reward ratio found. CHF 10,000/semester × up to 4 semesters + GUARANTEED HOUSING. Master's-level verified, no nationality restriction, and NO extra documents — just tick the box.",
    xp: 150,
    targets: ["epfl"],
    owner: "You",
    deadline: "2026-12-15",
    urgency: "high",
    category: "Submission",
    checklist: [
      "Choose Financial Engineering (best fit for your term-structure work)",
      "Check whether GRE/GMAT is required",
      "Complete the admission application",
      "TICK THE EXCELLENCE FELLOWSHIP BOX",
      "Submit before 15 December 2026"
    ]
  },
  {
    id: "email-french-progs",
    title: "Email French programmes to secure an Eiffel nominator",
    detail: "Email economics/finance master's programmes at French universities asking whether they would nominate you for Eiffel.",
    why: "🔴 'Only applications submitted by French higher education institutions are accepted.' You CANNOT apply yourself. With no nominating university you cannot apply at all. Start in October or the cycle is lost.",
    xp: 90,
    targets: ["eiffel"],
    owner: "You",
    deadline: "2026-11-15",
    urgency: "high",
    category: "Outreach",
    checklist: [
      "Identify French programmes in economics/finance",
      "Email the programme director or international office",
      "State clearly that you are seeking an Eiffel nomination",
      "Attach your CV and explain your fit",
      "You are age-eligible — the cap is 29"
    ]
  },
  {
    id: "eth-preproposal",
    title: "Draft the ETH master's thesis pre-proposal",
    detail: "Draft a thesis pre-proposal for the ETH Excellence Scholarship (ESOP).",
    why: "ESOP requires a master's thesis pre-proposal plus two professor referees — the pre-proposal is the slow item. Deadline 1–30 November 2026. But note the 'top 10% of Bachelor's' gate likely fails at 3.30.",
    xp: 100,
    targets: ["eth-esop"],
    owner: "You",
    deadline: "2026-11-10",
    urgency: "medium",
    category: "Writing"
  },

  /* =====  HIGH-LEVERAGE PROFILE BUILDING  ===== */
  {
    id: "working-paper",
    title: "Draft the yield-curve working paper",
    detail: "Fit Nelson-Siegel or an affine term-structure model to your auction data. Decompose the curve. Test whether bank liquidity or the policy rate explains the level, slope and curvature factors. Write it up as a 15–25 page working paper.",
    why: "⚡ HIGHEST-LEVERAGE ACTIVITY AVAILABLE TO YOU. You already have a scraped dataset of all 310 outstanding government securities, a structural break, and a well-formed research question. This converts 'no publications' into 'has produced independent empirical research', gives you a real attachment for professor outreach, becomes the centrepiece of every motivation letter, and is a genuine differentiator — very few applicants show up with independent empirical work on a live policy question.",
    xp: 250,
    targets: ["goettingen", "hohenheim", "emjm", "epfl", "eth-esop"],
    owner: "You",
    deadline: "2026-12-31",
    urgency: "high",
    category: "Research",
    checklist: [
      "Clean the auction dataset",
      "Fit Nelson-Siegel / Svensson to the yield curve",
      "Decompose into level, slope, curvature",
      "Test bank liquidity vs policy rate as explanatory factors",
      "Write 15–25 pages",
      "Post to SSRN for a citable artifact",
      "Use it as your professor-outreach attachment"
    ]
  },
  {
    id: "ects-statement",
    title: "Request an ECTS equivalence statement",
    detail: "Ask BUP for a statement converting your degree credits into ECTS.",
    why: "EMLE requires 240 ECTS and this is UNVERIFIED for BUP's BSS. It also helps the EPOS 'upper third' argument.",
    xp: 50,
    targets: ["emjm", "goettingen"],
    owner: "BUP",
    deadline: "2026-11-30",
    urgency: "medium",
    category: "Documents"
  },
  {
    id: "ask-gate4",
    title: "Ask both EPOS programmes the Gate-4 question",
    detail: "Write to Göttingen and Hohenheim asking: 'Where do your graduates actually work — banking and markets, or development agencies and government?'",
    why: "This is the most important unresolved question in your entire plan. If these programmes funnel graduates into development agencies rather than European banking, the scholarship solves your funding while moving you away from your career goal.",
    xp: 70,
    targets: ["goettingen", "hohenheim"],
    owner: "You",
    deadline: "2026-11-01",
    urgency: "high",
    category: "Research"
  },
  {
    id: "ask-citybank-sponsorship",
    title: "Ask City Bank about sponsorship or study leave",
    detail: "Ask HR or your manager whether City Bank would sponsor or part-fund a master's, or grant study leave, in exchange for a return commitment.",
    why: "You are being promoted to Manager in January 2027 and you are building the desk's analytics capability. Employers sometimes fund exactly this. Worst case, the answer is no. This avenue is completely untested.",
    xp: 60,
    targets: [],
    owner: "You",
    deadline: "2026-11-30",
    urgency: "medium",
    category: "Funding"
  },
  {
    id: "confirm-passport",
    title: "Confirm passport number and expiry",
    detail: "Confirm your passport number and expiry date. It must be valid well into 2028.",
    why: "Required for every application form and for the visa. Visa processing needs 6+ months of validity, and renewals in Dhaka are slow.",
    xp: 40,
    targets: [],
    owner: "You",
    deadline: "2026-10-08",
    urgency: "high",
    category: "Documents"
  },
  {
    id: "verify-visa-queue",
    title: "Verify the Dhaka visa appointment backlog",
    detail: "Check the German Embassy Dhaka and the Consular Services Portal for current student-visa appointment wait times.",
    why: "⚠️ A scholarship waives the PROOF OF FUNDS requirement — not the appointment queue. These are two separate problems, and a fully funded candidate can still miss an intake because the appointment came too late. Build this into your intake choice.",
    xp: 50,
    targets: ["goettingen", "hohenheim"],
    owner: "You",
    deadline: "2026-11-15",
    urgency: "medium",
    category: "Visa"
  }
];

/* ------------------------------------------------------------
   DAILY / WEEKLY ROUTINE
   ------------------------------------------------------------ */
const ROUTINE = [
  { day: "Monday",     task: "Review the deadline list. Recompute countdowns. Pick the week's five tasks." },
  { day: "Tue–Thu",    task: "Send professor emails (their morning). Do deep work. Send Tue–Thu only." },
  { day: "Friday",     task: "Follow up on emails sent 10–14 days ago. Chase outstanding documents." },
  { day: "Weekend",    task: "Write: motivation letters, research note, the working paper." }
];

/* ------------------------------------------------------------
   FIVE THINGS THIS WEEK — the standing answer to "what now?"
   ------------------------------------------------------------ */
const THIS_WEEK = [
  { id: "credit-audit",          label: "Send Göttingen Credit Breakdown", note: "PASSED: 27 cr Math/Stats (triple requirement)" },
  { id: "employer-cert",         label: "Request Certificate of Employment", note: "Mandatory for EPOS" },
  { id: "employer-letter",       label: "Request employer recommendation letter", note: "Mandatory for EPOS" },
  { id: "ranking-letter",        label: "Request BUP ranking + ECTS letter", note: "Your CGPA defence" },
  { id: "confirm-passport",      label: "Confirm passport number and expiry", note: "Needed everywhere" }
];

/* ------------------------------------------------------------
   EXPORT
   ------------------------------------------------------------ */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEVELS, ACHIEVEMENTS, MISSIONS, ROUTINE, THIS_WEEK };
}
