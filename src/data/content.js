var module = { exports: {} };
/* ============================================================================
   SCHOLARVERSE — CONTENT BRAIN
   All verified scholarship intelligence for Hasibul Hasan, CFA.
   Verified against primary sources, October 2026.
   Every entry carries its status. Nothing is invented.
   ============================================================================ */

/* ---------------------------------------------------------------------------
   PROFILE — the verified record
   --------------------------------------------------------------------------- */
const PROFILE = {
  name: "Hasibul Hasan, CFA",
  email: "santohasib.bup@gmail.com",
  phone: "+880 1628 859387",
  location: "Dhaka, Bangladesh",
  linkedin: "linkedin.com/in/hasibul-hasan-santo",
  citizenship: "Bangladesh",
  dob: "2001-12-21",
  age: 24,
  field: "Economics / Finance",
  targetDegree: "Master's (taught or research)",
  targetIntake: "September / October 2027",
  cfa: {
    status: "CHARTER AWARDED September 2026",
    detail: "All three levels passed on the FIRST ATTEMPT while working full time. EQF/RQF Level 7 — equivalent to master's level.",
    leverage: "This is the strongest asset in the file. It is exactly the quantitative proof the transcript lacks. A 3.30 CGPA plus a CFA charter reads nothing like a 3.30 alone."
  },
  education: {
    degree: "BSS (Hons) in Economics",
    institution: "Bangladesh University of Professionals (BUP), Dhaka",
    years: "2019 – 2022",
    completed: "2022",
    cgpa: 3.30,
    cgpaScale: 4.0,
    germanGrade: 2.05,
    thesisGpa: 4.0,
    credits: 126,
    hsc: "Savar Cantonment Public School & College, 2016–2018, Science",
    gradeNote: "Modified Bavarian formula: 1 + 3 × (4.00 − 3.30) / (4.00 − 2.00) = 2.05. On the German scale LOWER is better. Hohenheim's ranking-letter trigger is 2.5 — 2.05 PASSES it."
  },
  research: {
    paper: "Correlates of Financial Literacy among University Students in Bangladesh: Survey Evidence from BUP",
    method: "318 respondents; 10-item financial literacy index; reliability analysis, ANOVA, binary logistic regression",
    finding: "Business/economics students had ~3.24× the odds of scoring above median; financial behaviour, attitude and learning sources were NOT statistically significant — a genuine negative finding.",
    interest: "Term-structure modelling of the sovereign yield curve; how bank liquidity and government borrowing — rather than the policy rate — determine the curve; Nelson-Siegel and affine term-structure models; monetary transmission; emerging-market sovereign debt.",
    distinctive: "He wrote a scraper for Bangladesh Bank auction results, built the database, and modelled cash flows and duration across ALL 310 outstanding Bangladeshi government securities. Nobody asked him to."
  },
  tests: {
    ielts: null,
    toefl: null,
    moi: "Medium of Instruction certificate held — but INSUFFICIENT for DAAD EPOS and Hohenheim",
    gmatFocus: 585,
    gmatNote: "Mid-distribution (~50–60th percentile band). Neutral, NOT an asset. Do not lead with it.",
    german: "A1, no certificate"
  },
  work: [
    {
      employer: "City Bank PLC",
      role: "Associate Manager – ALM & Money Market, Treasury & Market Risk",
      start: "2025-03",
      end: null,
      hoursPerWeek: 45,
      current: true,
      note: "Promoted to Manager from January 2027",
      bullets: [
        "Executes 200–300 interbank transactions monthly (~$90–110M USD daily) — REPOs, Call/SND, USD/BDT FX swaps across conventional and Islamic books",
        "Manages daily CRR compliance, maintaining bi-weekly ratios within 4.05–4.10%",
        "Optimises HQLA yield via T-bill/REPO arbitrage within Bangladesh Bank constraints (Basel III LCR/NSFR equivalent)",
        "Represents City Bank at BAFEDA/BAMDA industry programmes; holds counterpart relationships with domestic banks and NBFIs",
        "Teaches a derivatives course to treasury colleagues"
      ]
    },
    {
      employer: "City Bank PLC",
      role: "Management Trainee",
      start: "2024-03",
      end: "2025-02",
      hoursPerWeek: 45,
      bullets: [
        "Top 10 graduate of the 2024 MT cohort; ranked Top 10 at BIBM Banking Foundation training",
        "Level 2 Reward & Recognition for building a cross-divisional MIS dashboard tracking front-office deal volumes and turnaround times",
        "Rotated across Wholesale Banking, Retail, SME, Operations, Risk & Support; completed 5 credit-risk evaluations"
      ]
    },
    {
      employer: "bKash Ltd",
      role: "Officer – Revenue Assurance & Operations, Finance",
      start: "2023-10",
      end: "2024-01",
      hoursPerWeek: 45,
      bullets: [
        "Reduced revenue leakage by 15% via financial reconciliations across IDTP, Bangla QR and airtime payments for 5 MNOs",
        "Automated Binimoy/Astha QR reconciliation (20% efficiency gain)",
        "Built Monthly Revenue visualisations using Tableau, Flourish and R (ggplot2)"
      ]
    }
  ],
  workNote: "⚠️ February 2024 is a genuine GAP month between bKash and City Bank. Declare it honestly. Do not stretch dates — mismatched dates between CV and employment certificates are a stated rejection reason.",
  achievements: [
    { year: "2021", text: "ISCEA Ptak Prize Global Case Competition — 70% Scholarship Winner (international management case competition)" },
    { year: "2022", text: "Guinness World Record Holder — longest single-line bicycle parade" },
    { year: "2022", text: "CFA Institute Scholarship" },
    { year: "2019–2021", text: "3× AIMS-certified half marathon finisher; key organiser, Savar Half Marathon" },
    { year: "2022", text: "Joint Secretary, BUP Economics Club — led ECONTALK & POMAC; Teaching Assistant, Datalytics 2022 (R & data visualisation) alongside international faculty" },
    { year: "2016–2018", text: "Cadet Corporal, BNCC; House Leader (Yellow House) — led house to Football Championship twice" }
  ],
  background: "First-generation university student. Mother left school before class ten and moved the family from Faridpur to Savar for better schooling; father worked twelve years in Dubai.",
  skills: {
    treasury: "ALM, Money Market Ops, HQLA, CRR/SLR Compliance, Fixed Income, Interbank Dealing, FX Swaps (USD/BDT)",
    analytics: "R (ggplot2), Python, Tableau, Flourish, MS Excel (VBA), LaTeX",
    languages: "English (Fluent), Bengali (Native), German (A1), Hindi (Basic)"
  },
  alreadyApplied: [
    { programme: "MSc Economics, University of Mannheim", status: "Submitted", note: "Motivation letter + academic project paper submitted" },
    { programme: "Master in Economics and Finance (MEF), Charles University, Prague", status: "Submitted", note: "Czech Government Scholarship, academic year 2027/2028" }
  ],
  referees: [
    {
      name: "Molla Karimul Islam",
      role: "Senior Assistant Vice President (SAVP) & Operational Head, Sustainable Finance Department (Green & Climate Finance)",
      employer: "The City Bank PLC",
      academicRole: "Adjunct Faculty, Department of Economics and Social Sciences, BRAC University",
      education: "M.Sc. in Environmental Sciences, Universität Greifswald, Germany (DAAD Scholar, July 2014 Award)",
      awardProof: "https://www.dropbox.com/s/972ct8vrgyhm61k/DAAD%20Award%20Letter.pdf?dl=0",
      linkedin: "https://www.linkedin.com/in/karimul/",
      type: "Professional & DAAD Alumnus Referee",
      strategicValue: "⭐ EXCEPTIONAL ASSET FOR GERMAN DAAD EPOS APPLICATIONS. As an alumnus of the DAAD scholarship programme from Universität Greifswald, an Environmental Economist, and a Senior AVP in Sustainable Finance at your employer City Bank, his recommendation directly connects your Treasury ALM & sovereign bond work with German development economics and sustainable banking criteria."
    },
    {
      name: "Line Manager / Head of Treasury",
      role: "Head of Treasury / ALM Desk Head",
      employer: "The City Bank PLC",
      type: "Primary Operational Supervisor",
      strategicValue: "Mandatory employer recommendation certifying daily $90–110M interbank flow, statutory CRR/SLR compliance, 310 G-sec cash-flow model, and institutional re-employment guarantee upon degree completion."
    },
    {
      name: "Undergraduate Academic Referee",
      role: "Associate Professor / Project Paper Advisor",
      employer: "Bangladesh University of Professionals (BUP)",
      type: "Academic Referee",
      strategicValue: "Testifies to Thesis GPA 4.00/4.00, empirical econometric methodology in logistic regression and financial literacy survey data, and quantitative aptitude."
    }
  ]
};

/* ---------------------------------------------------------------------------
   TARGETS — every verified scheme, with cycle status
   --------------------------------------------------------------------------- */
const TARGETS = [
  {
    id: "sisgp",
    name: "SISGP — SI Scholarship for Global Professionals",
    short: "SISGP",
    country: "Sweden",
    flag: "🇸🇪",
    tier: 1,
    priority: "P0",
    subjectFit: "PERFECT — funds Finance/Banking, not development",
    funding: "Full tuition + SEK 12,000/month + SEK 15,000 travel grant",
    fundingDetail: "A genuine full ride. Tuition paid directly to the university each semester, plus a monthly living allowance and a one-time travel grant.",
    deadline: "2027-02-25",
    deadlineLabel: "SI portal: ~9–25 Feb 2027 (14:59 CET close)",
    gateDeadline: "2027-01-15",
    gateLabel: "Swedish university application: ~16 Oct 2026 – 15 Jan 2027",
    status: "opening_soon",
    route: "Two-stage: apply to the university FIRST via universityadmissions.se, then the scholarship",
    why: "Your BEST overall verified target. It funds FINANCE — the subject you actually want — not development economics. This breaks the trade-off that EPOS forces on you. Bangladesh is explicitly on the 34-country list.",
    eligibleProgrammes: [
      "Stockholm School of Economics — Finance (HHS-34041, 120cr) ⭐ most prestigious",
      "Stockholm School of Economics — Economics (HHS-34051, 120cr)",
      "Stockholm University — Banking & Finance (SU-31068, 120cr) ⭐ closest match to your job",
      "Stockholm University — Data Science, Statistics and Decision Analysis (SU-43004, 120cr)",
      "Lund University — Economics (LU-18250, 120cr)",
      "Lund University — Finance (LU-18260, 60cr)",
      "Lund University — Data Analytics and Business Economics (LU-18270, 60cr)",
      "University of Gothenburg — Finance (GU-82011, 120cr)",
      "University of Gothenburg — Economics (GU-82012, 120cr)",
      "Umeå University — Finance (UMU-M2014, 120cr)",
      "Umeå University — Economics (UMU-M2018, 120cr)",
      "Mälardalen University — Financial Engineering (MDU-49000, 120cr)",
      "Jönköping University — Finance (HJ-MU113, 60cr)",
      "Jönköping University — Applied Economics and Data Analysis (HJ-MU119, 120cr)",
      "Uppsala University — Statistics and Data Science (UU-M2660, 120cr)",
      "Linnaeus University — Economics (F3224, 120cr)"
    ],
    gates: [
      "Must be ADMITTED to an eligible programme on announcement day — reserve listings are rejected",
      "≥3,000 hours work experience prior to February 2026, from a MAXIMUM of THREE employers",
      "Demonstrated LEADERSHIP experience from employer or civil society",
      "Must be liable to pay tuition fees (non-EU — satisfied)",
      "Must pay the university application fee on time"
    ],
    gatesMet: [
      "Work experience: ~4,840 hours from 2 employers (bKash + City Bank; City Bank Mar 2024–Feb 2026 ≈ 4,160 hrs, bKash ≈ 680 hrs) — CLEARS the 3,000h gate with 2 of 3 employers used ✅",
      "Tuition liability: non-EU ✅",
      "No Swedish degree held ✅",
      "No prior SI scholarship ✅"
    ],
    gatesRisk: [
      "LEADERSHIP EVIDENCE must be assembled — you have it, but it must be documented",
      "Must secure a Swedish admission by the announcement date"
    ],
    source: "si.se — verified 6 October 2026",
    nextAction: "Create a universityadmissions.se account — the Swedish application window opens ~16 October (10 days)."
  },
  {
    id: "goettingen",
    name: "DAAD EPOS — MSc Development Economics",
    short: "Göttingen EPOS",
    country: "Germany",
    flag: "🇩🇪",
    tier: 1,
    priority: "P0",
    subjectFit: "PARTIAL — development economics, not finance",
    funding: "€992/month + health/accident/liability insurance + travel allowance + possible rent subsidy (to €350) + family allowance",
    fundingDetail: "12–42 months. No tuition at Göttingen (Lower Saxony). Includes a funded intensive German course Aug–Sep.",
    deadline: "2026-11-15",
    deadlineLabel: "15 November 2026 — HARD",
    status: "open",
    route: "DIRECT to the university. ONE application covers BOTH the programme and the funding.",
    why: "Your most immediate hard deadline. Rich-country applicants cannot touch EPOS. Field match is economies. Roughly 6–7 scholarships a year.",
    eligibleProgrammes: ["MSc Development Economics, University of Göttingen, 24 months, English-taught"],
    gates: [
      "2+ years RELEVANT professional experience after the bachelor's, held AT TIME OF APPLICATION",
      "Degree normally not more than 6 years old (2022 → safe to 2028 ✅)",
      "'Far above average results (upper third)' — documented top-third standing",
      "Max 3 courses with ONE uniform motivation letter justifying the ranking",
      ">15 months residence in Germany at the deadline = excluded"
    ],
    gatesMet: [
      "Work experience: ~3 years post-degree ✅",
      "Degree age: 2022, within 6 years ✅",
      "Bangladesh confirmed on the DAAD DAC country list ✅",
      "APS NOT required for Bangladesh (only India, China, Vietnam) ✅",
      "No age limit ✅"
    ],
    gatesRisk: [
      "⚠️ 'UPPER THIRD' is the real risk. A 3.30 CGPA is unlikely to be top-third at BUP.",
      "Counter-arguments: thesis GPA 4.00/4.00; CFA charter (EQF Level 7); grade progression; Top 10 MT cohort; Top 10 BIBM"
    ],
    source: "uni-goettingen.de/en/572462.html + DAAD — verified 5–6 October 2026",
    nextAction: "Finish the EPOS document pack and submit before 15 November. Needs IELTS in hand.",
    warning: "This is a competitive reach, not a lock. Hohenheim is the safer of the two EPOS routes."
  },
  {
    id: "hohenheim",
    name: "DAAD EPOS — MSc Agricultural Economics (AgEcon)",
    short: "Hohenheim EPOS",
    country: "Germany",
    flag: "🇩🇪",
    tier: 1,
    priority: "P0",
    subjectFit: "PARTIAL — agricultural/development economics",
    funding: "€992/month + insurance + travel — AND tuition is WAIVED for EPOS recipients",
    fundingDetail: "24 months, English-taught. Same EPOS package as Göttingen but with an explicit tuition waiver.",
    deadline: "2026-12-15",
    deadlineLabel: "15 December 2026 (window opens 15 Nov)",
    status: "opening_soon",
    route: "TWO PARTS — email PDFs to agecon@uni-hohenheim.de AND apply via HohCampus. Both required.",
    why: "⭐ THE SAFER OF YOUR TWO EPOS ROUTES. Hohenheim states an explicit numeric grade threshold of 2.5 on the German scale — your 2.05 PASSES it. English results accepted until 6 January.",
    eligibleProgrammes: ["MSc Agricultural Economics, University of Hohenheim, 24 months, English-taught"],
    gates: [
      "Same DAAD EPOS gates as Göttingen",
      "Ranking letter required ONLY if GPA is worse than 2.5 German — yours is 2.05, so NOT required here",
      "IELTS Academic 6.5 overall, or TOEFL iBT 90",
      "AgEcon PreTest self-evaluation required"
    ],
    gatesMet: [
      "German grade 2.05 BEATS the 2.5 threshold ✅",
      "Work experience ~3 years ✅",
      "Bangladesh eligible ✅",
      "English may be submitted until 6 January 2027 ✅ — your safety valve"
    ],
    gatesRisk: [
      "English test still required — a university language certificate is NOT sufficient ('There are no exceptions')",
      "Official verdict: 'A language proficiency certificate from your university is NOT SUFFICIENT! ... There are no exceptions.'"
    ],
    source: "uni-hohenheim.de/en/agecon-scholarships — verified 5–6 October 2026",
    nextAction: "Prepare the same EPOS pack. Window opens 15 November."
  },
  {
    id: "epfl",
    name: "EPFL Master Excellence Fellowship",
    short: "EPFL Excellence",
    country: "Switzerland",
    flag: "🇨🇭",
    tier: 1,
    priority: "P0",
    subjectFit: "STRONG — Financial Engineering / Statistics / Applied Math fits your term-structure work",
    funding: "CHF 10,000 per semester × up to 4 semesters (≈ CHF 40,000) + GUARANTEED HOUSING",
    fundingDetail: "Master's-level VERIFIED. No nationality restriction. No extra documents required — you simply tick the box on the admission application.",
    deadline: "2026-12-15",
    deadlineLabel: "Round 1 closes 15 December 2026",
    status: "open",
    route: "Apply for admission to an EPFL master's and TICK THE EXCELLENCE FELLOWSHIP BOX",
    why: "🟢 BEST EFFORT-TO-REWARD RATIO FOUND. CHF 40,000 plus guaranteed housing, master's-level confirmed, no nationality barrier, and zero extra paperwork. Just tick the box.",
    eligibleProgrammes: [
      "MSc Financial Engineering ⭐ best fit for term-structure work",
      "MSc Statistics",
      "MSc Applied Mathematics"
    ],
    gates: [
      "Master's-level confirmed ✅",
      "No nationality restriction ✅",
      "No extra documents — tick the box ✅",
      "UNVERIFIED: whether GRE/GMAT is required"
    ],
    gatesMet: ["No nationality bar ✅", "No extra documents ✅", "Master's level ✅"],
    gatesRisk: ["UNVERIFIED which programme is the best fit — and whether GRE/GMAT is required"],
    source: "EPFL — verified 6 October 2026",
    nextAction: "Choose MSc Financial Engineering, check GRE/GMAT requirements, and apply before 15 December.",
    warning: "Switzerland has the best short-term money but the WORST long-term residency route (6-month job search, quota-limited permits, 10-year C-permit where student years likely don't count)."
  },
  {
    id: "emjm",
    name: "Erasmus Mundus Joint Masters (EMJM)",
    short: "EMJM",
    country: "EU — multi-country",
    flag: "🇪🇺",
    tier: 1,
    priority: "P1",
    subjectFit: "STRONG — economics/finance consortia exist",
    funding: "€1,400/month × 24 months = €33,600 + full tuition + travel (€2–3k/yr) + €1,000 installation ≈ €51,600 total",
    fundingDetail: "VALUE NOW VERIFIED from two consortium primary sources (QEM and EMLE), not an assumption. Highest total value available to you in Europe.",
    deadline: "2027-01-12",
    deadlineLabel: "Consortia run Nov 2026 – Jan 2027 (varies by consortium)",
    status: "opening_soon",
    route: "Direct to each consortium",
    why: "Highest total value in Europe (~€51,600). But you MUST verify each consortium actually awards an EMJM scholarship — many catalogue entries award none.",
    eligibleProgrammes: [
      "⭐ EGEI — Economics of Globalisation and European Integration (coordinator: Italy/Bari; partners: Lille, Ghent, Xiamen, Santander, Valparaíso, Tartu) — ~15 scholarships/yr, pure economics, BEST FIT",
      "⭐ GLOBAL COOP — Economic Policies for New Global Cooperation and Alliances (coordinator: Brazil) — newly selected for 2027",
      "⚠️ GLODEP — Global Development Policy (coordinator: Czechia) — development, not finance",
      "🔴 QEM — TRAP, awards NO EMJM scholarship (tuition-only)",
      "⚠️ EMLE — awards real EMJM scholarships but needs 240 ECTS + IELTS 7.0 + it's law-econ",
      "⚠️ EPOG-JM — genuine economics EMJM (tuition + €1,400/mo) but heterodox/ecological focus, not finance"
    ],
    gates: [
      "MAXIMUM 3 EMJM programmes — CONFIRMED, stated verbatim by QEM and EMLE",
      "🔴 10% NATIONALITY CAP — 'no more than 10% of the students selected for a scholarship should have the same nationality'. If a consortium awards ~15, only ~1–2 can go to any one nationality",
      "Prior EMJM scholarship holders are INELIGIBLE (you have none ✅)",
      "Cannot hold another EU grant concurrently",
      "Admission does NOT guarantee a scholarship — they are separate selections",
      "There is NO central EU application — you apply direct to each consortium",
      "EMLE requires 240 ECTS — UNVERIFIED whether BUP's BSS qualifies",
      "EMLE requires IELTS 7.0 — above your 6.5 target"
    ],
    gatesMet: [
      "No prior EMJM ✅",
      "Bangladesh eligible ✅ — and you qualify as a PARTNER COUNTRY student (you have not lived/studied/worked in an EU Programme Country for more than 12 months in the last 5 years)",
      "Partner Country status unlocks the HIGHER travel band: €3,000/yr travel + €1,000 installation for locations ≥4,000 km from the coordinator — Bangladesh qualifies ✅"
    ],
    gatesRisk: [
      "⚠️ The 3-programme cap means you must choose carefully — the verified economics shortlist is exactly EGEI, GLOBAL COOP, GLODEP",
      "⚠️ The 10% nationality cap is a real throttle you cannot control",
      "⚠️ ⚠️ SCHOLARSHIP VALUE DISCREPANCY: EGEI's own page quotes €1,000/month (the OLD EMJMD action) while the current EMJM framework is €1,400/month. Verify against EGEI's 2027/28 call",
      "⚠️ EGEI's page currently says scholarships are 'not offered in academic year 2026-2027' because the programme is relaunching under the new 2027 selection — confirm the 2027/28 position",
      "⚠️ 240 ECTS for EMLE is UNVERIFIED — request an ECTS statement from BUP"
    ],
    source: "EACEA RSS feed + EPOG-JM, EGEI primary pages + 2026 selection announcement — verified 7 October 2026",
    nextAction: "Monitor epog.eu, master-egei.eu and the EACEA catalogue from mid-November 2026 when consortia publish 2027/28 calls. Then apply to exactly 3: EGEI, GLOBAL COOP, GLODEP.",
    trap: "🔴 QEM (Models & Methods of Quantitative Economics) — the famous 'Erasmus Mundus economics' master — awards NO EMJM scholarship. Its consortium and excellence scholarships cover TUITION ONLY. It is the top search result and it is a trap for anyone who cannot self-fund.",
    bonus: "💡 USEFUL PRECEDENT: EPOG-JM coordinates Eiffel applications on behalf of its second-year Paris students — 'The EPOG team will be in charge of coordinating the application with the eligible students.' That is a working example of a programme acting as your EIFFEL NOMINATOR, which is otherwise your hardest gate. When you email French programmes, this is the precedent to cite."
  },
  {
    id: "eiffel",
    name: "Eiffel Excellence Scholarship",
    short: "Eiffel",
    country: "France",
    flag: "🇫🇷",
    tier: 2,
    priority: "P1",
    subjectFit: "STRONG — economics/finance",
    funding: "~€1,181/month + travel + insurance + extras (verify current amount)",
    fundingDetail: "Master's and PhD level.",
    deadline: "2027-01-08",
    deadlineLabel: "Campaign pattern ~1 Oct – 8 Jan (2027 call not yet open)",
    status: "opening_soon",
    route: "🔴 THE FRENCH UNIVERSITY APPLIES — NOT YOU",
    why: "You are age-ELIGIBLE (the master's cap is 29, you are 24 — a correction from the widely-cited 25). But you cannot apply yourself.",
    eligibleProgrammes: [],
    gates: [
      "Age: up to 29 at master's level ✅ (you are 24)",
      "ONLY French higher education institutions may submit the application",
      "Institution must nominate you",
      "Field must be among those covered"
    ],
    gatesMet: ["Age cap 29 — you are 24 ✅"],
    gatesRisk: ["🔴 Without a nominating French institution you cannot apply AT ALL"],
    source: "campusfrance.org/en/france-excellence-eiffel-scholarship-program — verified 5 October 2026",
    nextAction: "Email French economics/finance programmes in October asking for an Eiffel nomination.",
    correction: "CORRECTION: Eiffel's master's age cap is 29, NOT 25. Campus France states verbatim: 'encourages applicants from foreign countries up to 29 years old at master's level'."
  },
  {
    id: "eth-esop",
    name: "ETH Zurich Excellence Scholarship (ESOP)",
    short: "ETH ESOP",
    country: "Switzerland",
    flag: "🇨🇭",
    tier: 2,
    priority: "P2",
    subjectFit: "STRONG but gate is brutal",
    funding: "CHF 13,500 per semester from HS27 + tuition waiver (~60 awards total for 2027/28)",
    fundingDetail: "Requires a master's thesis pre-proposal plus TWO professor referees.",
    deadline: "2026-11-30",
    deadlineLabel: "1–30 November 2026 — NOT 15 December",
    status: "open",
    route: "Direct to ETH",
    why: "High value, but the hard gate is 'top 10% of Bachelor's' — a long shot on a 3.30 CGPA.",
    eligibleProgrammes: ["ETH has no conventional MSc Economics — which master's to target is UNVERIFIED"],
    gates: [
      "HARD GATE: 'top 10% of Bachelor's' — likely fails at 3.30",
      "Master's thesis pre-proposal required (the slow item)",
      "Two professor referees required"
    ],
    gatesMet: [],
    gatesRisk: ["'Top 10% of Bachelor's' gate is a real long shot", "Thesis pre-proposal is slow — must start now", "Two professor referees needed"],
    source: "ETH Zurich — verified 6 October 2026",
    nextAction: "LOW PRIORITY given the top-10% gate. Only pursue if the working paper lands well.",
    correction: "CORRECTION: The ETH ESOP deadline is 1–30 November 2026, NOT 15 December. ~3 weeks earlier than commonly assumed."
  },
  {
    id: "canada",
    name: "Canada — programme-level funding",
    short: "Canada",
    country: "Canada",
    flag: "🇨🇦",
    tier: 3,
    priority: "P2",
    subjectFit: "STRONG — but the 16-MONTH gate eliminates most programmes",
    funding: "⚠️ NO federal scholarship for incoming international master's students. Funding must be programme-level (TA/RA/entrance award).",
    fundingDetail: "VERIFIED PASS: Waterloo MMath (Statistics or Actuarial Science, thesis option) — research-based and FUNDED, reaching exactly 16 months. VERIFIED TRAP: Waterloo MQF is 16 months with the best placement in Canada but is EXPLICITLY UNFUNDED.",
    deadline: "2027-01-06",
    deadlineLabel: "Waterloo MMath: priority 15 Dec 2026, FINAL 6 Jan 2027 (fall only)",
    status: "open",
    route: "Two routes only: (a) funded research master's with a thesis, 16+ months; (b) unfunded professional programme if employer-sponsored",
    why: "Canada has the best immigration architecture of any option and the worst funding architecture. The 16-month spousal-work-permit rule then eliminates most MA Economics programmes, which run 12 months.",
    eligibleProgrammes: [
      "✅✅ HEC Montréal MSc FINANCIAL ENGINEERING (thesis) — 16–24 months, English-taught, STRONGEST FUNDING: NSERC $27k/yr, FRQNT $20k×2yr, Mitacs $15k, entrance scholarships $2k–$10k, PLUS differential tuition exemptions for thesis-stream internationals. Core includes Fixed Income Securities (yield curve construction + HJM), Derivative Products, Stochastic Calculus. Deadline 1 February. ⭐ BEST SUBJECT FIT IN CANADA",
      "✅✅ HEC Montréal MSc FINANCE (thesis) — 16–24 months, English-taught, entrance scholarship for thesis stream + SSHRC $27k. Fixed Income Securities, Time Series Econometrics, Financial Econometrics. Deadline 1 February",
      "✅ Concordia MSc FINANCE (JMSB, thesis) — 2 years / 24 months, research-based with thesis. ⚠️ ALREADY CONTACTED (GPD Sigouin, Prof. Gomme) — do not redraft",
      "✅ Waterloo MMath APPLIED MATHEMATICS (thesis) — 24 months, GUARANTEED funding: 'Master's (thesis) programs normally receive financial support... at a level that will cover academic costs and living expenses.' (Research-paper stream is part-time only and unfunded)",
      "✅ Queen's MSc MATHEMATICS & STATISTICS, Pattern I (thesis) — 'typically 16–24 months'. No separate funding application; indicate need on the form by 15 Jan for full funding consideration. International students 'usually offered additional funding to cover the difference between international and domestic tuition'",
      "✅ McMaster MSc MATHEMATICS (thesis) — 20 months. ⚠️ No admission-attached funding guarantee found; only competitive awards (OGS/OGF). Verify the base package",
      "✅ uOttawa MSc MATHEMATICS & STATISTICS, Statistics with thesis — 24 months. ⚠️ SUPERVISOR-FUNDED: admission is conditional on a professor committing a stipend, and the supervisor's name is required AT APPLICATION",
      "✅ Waterloo MMath STATISTICS / ACTUARIAL SCIENCE (thesis) — ~16 months, funded (TA + supervisor), deadline 6 Jan. ⚠️ Thesis switch needs a 90% average after term 1",
      "⚠️ AMBIGUOUS — Western MSc Statistics (thesis) — year 1 is 3 terms, thesis is a SECOND year, but 'students will not be admitted directly into this option'. Funding table shows a no-TAship Statistics student receives only CAD $5,000/yr — far below a living income",
      "🔴 TRAP — Waterloo MQF: 16 months and 100% internship placement, but the department states professional-programme students 'do not receive funding'",
      "❌ EXCLUDED — Toronto MMF (12 months), Toronto MSc Mathematics (12 months), UBC MA Econ (12 months), McGill MA Econ (12 months), Alberta MA Econ (course-based), Calgary (not admitting)"
    ],
    gates: [
      "🔴 SPOUSAL OPEN WORK PERMIT: master's must be 16 MONTHS OR LONGER (canada.ca, effective 21 Jan 2025). Anything 12 months or less is excluded",
      "Thesis or research-based ONLY — no course-based, no unfunded professional programmes",
      "Full funding or full tuition waiver + stipend, documented on an official page",
      "Accepting international students for Fall 2027"
    ],
    gatesMet: [
      "PGWP: master's graduates get a 3-YEAR PGWP even for programmes under 2 years (≥8 months), since 15 Feb 2024 ✅",
      "PGWP field-of-study restriction: master's graduates are FULLY EXEMPT ✅",
      "PAL/TAL: master's students exempt from the Provincial Attestation Letter from 1 Jan 2026 ✅",
      "Waterloo MMath admission minimum is a 78% average — his 3.30/4.00 ≈ 82.5% clears it ✅"
    ],
    gatesRisk: [
      "⚠️⚠️ CRITICAL: MMath students are ADMITTED to the Research Paper stream. The thesis switch requires ~90% average after term one plus approvals. The 16-month length is NOT guaranteed at admission",
      "🔴 CGS-M explicitly bars international students (Canadian citizen/PR/Protected Person only)",
      "🔴 Canada has NO national master's funding for him at all — CGRS-M bars internationals, and Vanier is doctoral-only",
      "⚠️ MQF — the best placement route — is unfunded"
    ],
    source: "canada.ca (spousal OWP + PGWP) + uwaterloo.ca (MMath, MQF, funding, placements) — verified 7 October 2026",
    nextAction: "Confirm the Schied email address on the official directory, verify a 2022+ paper for Weng, then send Wave 1 (Schied) on Tue 13 Oct 2026 between 6–8 pm Dhaka.",
    advantages: [
      "⭐ Master's graduates FULLY EXEMPT from the PGWP field-of-study restriction (canada.ca, verbatim)",
      "⭐ 3-YEAR PGWP for master's graduates even under 2 years (≥8 months), since 15 Feb 2024",
      "⭐ PAL/TAL exemption for master's students from 1 January 2026",
      "⭐ Best PR pathway of any option — Express Entry / CEC / PNP",
      "💡 UBC waives the application fee for citizens of the world's 50 least developed countries resident there — Bangladesh qualifies"
    ],
    faculty: [
      { name: "Tolga Cenesizoglu", tier: "A", score: 86, role: "Full Professor, Finance, HEC Montréal", why: "Financial econometrics and forecasting — the exact toolkit a Bangladesh yield-curve thesis needs. Closest methodological match at HEC.", paper: "UNVERIFIED — must find a 2022+ paper before drafting", draft: "BLOCKED — needs a verified paper", email: "tolga.cenesizoglu@hec.ca ✅ VERIFIED from the official HEC Finance directory" },
      { name: "Pascal François", tier: "A", score: 82, role: "Full Professor, Finance, HEC Montréal", why: "Derivatives and volatility — maps directly onto the CCS models and OTC derivatives offering he is building at City Bank", paper: "UNVERIFIED", draft: "BLOCKED — needs a verified paper", email: "pascal.francois@hec.ca ✅ VERIFIED" },
      { name: "Georges Dionne", tier: "A", score: 78, role: "Professor; Canada Research Chair in Risk Management, HEC Montréal", why: "Holds the Canada Research Chair in Risk Management — so grant funding exists, which matters given the supervisor-funded risk elsewhere", paper: "UNVERIFIED", draft: "BLOCKED — verify status and willingness to take a master's student first", email: "UNVERIFIED — confirm on the directory" },
      { name: "Alexander Schied", tier: "A", score: 88, role: "Professor; Munich Re Chair in Stochastic Finance; MQF Program Director, Waterloo", why: "Market microstructure and price impact — closest match in Canada to a money-market desk role", paper: "Luo, Schied & Xue (2024), 'The perturbation method applied to a robust optimization problem with constraint', Mathematics and Financial Economics 18(4) ✅ VERIFIED", draft: "✅ READY", email: "aschied@uwaterloo.ca — confirm on the official profile page" },
      { name: "Chengguo Weng", tier: "A", score: 79, role: "Professor, Waterloo", why: "Quantitative Finance AND Econometrics", paper: "UNVERIFIED", draft: "BLOCKED", email: "UNVERIFIED" },
      { name: "Iwan Meier", tier: "B", score: 74, role: "Full Professor, Finance, HEC Montréal", why: "Asset pricing and portfolio management", paper: "UNVERIFIED", draft: "HOLD", email: "iwan.meier@hec.ca ✅ VERIFIED" },
      { name: "David Saunders", tier: "B", score: 72, role: "Professor, Waterloo", why: "Quantitative risk management maps onto Basel III LCR/NSFR work", paper: "UNVERIFIED", draft: "HOLD", email: "UNVERIFIED" }
    ],
    facultyNote: "⚠️ DEPARTMENT CAP: HEC Finance has THREE Tier A names (Cenesizoglu 86, François 82, Dionne 78) but the brief caps outreach at 2 per department. Rank and choose two. Nicolas Vincent sits in HEC's APPLIED ECONOMICS department, so he does not count against the Finance cap."
  },
  {
    id: "bonn",
    name: "Bonn BGSE — MSc Economics / Economic Research",
    short: "Bonn BGSE",
    country: "Germany",
    flag: "🇩🇪",
    tier: 3,
    priority: "P2",
    subjectFit: "STRONG — economics with a research track",
    funding: "MSc-level grants EXIST — amount UNVERIFIED",
    fundingDetail: "BGSE states: 'There are grants available from the very beginning of the MSc/Economic Research program.' No tuition at Bonn.",
    deadline: "2027-03-31",
    deadlineLabel: "Deadline UNVERIFIED",
    status: "opening_soon",
    route: "Direct to Bonn BGSE",
    why: "The ONLY German university-level master's funding route worth chasing. Everything else is doctoral-only, unaffordable, or unverified.",
    eligibleProgrammes: ["MSc Economics with specialisation in Economic Research (integrated into the PhD track)"],
    gates: ["Amount and deadline UNVERIFIED", "Note: ECONtribute's Young ECONtribute Program (YEP) is DOCTORAL ONLY"],
    gatesMet: [],
    gatesRisk: ["Amount, deadline and application route all UNVERIFIED"],
    source: "econ.uni-bonn.de/bgse — verified 6 October 2026",
    nextAction: "Verify the grant amount and deadline on the BGSE page."
  },
  {
    id: "emle",
    name: "EMLE — European Master in Law and Economics",
    short: "EMLE",
    country: "EU — Hamburg-coordinated",
    flag: "🇪🇺",
    tier: 3,
    priority: "P2",
    subjectFit: "WEAK — law and economics, not finance",
    funding: "€1,400/month EMJM scholarship + tuition",
    fundingDetail: "~15 scholarships/yr. Bangladesh eligible.",
    deadline: "2026-12-31",
    deadlineLabel: "Non-European deadline 31 December 2026",
    status: "open",
    route: "Direct to the consortium",
    why: "Awards REAL EMJM scholarships. But three gates and a weaker subject fit.",
    eligibleProgrammes: ["European Master in Law and Economics (Hamburg-coordinated)"],
    gates: [
      "Requires 240 ECTS — ⚠️ UNVERIFIED whether BUP's BSS qualifies",
      "Requires IELTS 7.0 — higher than your 6.5 target",
      "Law-and-economics focus, not finance"
    ],
    gatesMet: ["Bangladesh eligible ✅"],
    gatesRisk: ["⚠️ 240 ECTS unverified — request an ECTS statement from BUP", "⚠️ IELTS 7.0 required", "⚠️ Law-econ, not finance"],
    source: "EMLE consortium — verified 6 October 2026",
    nextAction: "Request an ECTS equivalence statement from BUP — it gates this and helps the EPOS argument."
  }
];

/* ---------------------------------------------------------------------------
   DEAD SCHEMES — do not spend time here
   --------------------------------------------------------------------------- */
const DEAD_ENDS = [
  { name: "Chevening 2027/28", reason: "Closed 6 October 2026 at 11:00 UTC (5 PM Dhaka). You were confirmed ELIGIBLE — the next cycle opens ~August 2027.", status: "missed_this_cycle" },
  { name: "Swiss Government Excellence (ESKAS)", reason: "🔴 DEAD for master's. SBFI's official country list for Bangladesh shows ONLY 'Research Fellowship · PhD'. No master's track exists.", status: "ineligible" },
  { name: "Orange Knowledge Programme (Netherlands)", reason: "🔴 CONFIRMED ENDED. KIT states: 'The Orange Knowledge Programme (OKP) ended. There are no scholarships foreseen anymore for short courses or masters programmes in 2026 and the following years.'", status: "dead" },
  { name: "Norway", reason: "🔴 Non-EU students must now pay tuition, and studyinnorway.no states plainly: 'The Norwegian government offers no individual scholarships open to all international students.'", status: "dead" },
  { name: "SEPT MBA, Leipzig", reason: "EPOS window was 1 August – 1 October 2026. CLOSED for 2027/28.", status: "closed" },
  { name: "DAAD STEM Scholarships", reason: "Excludes economics and finance entirely — it covers mathematics, computer science, natural sciences and engineering only.", status: "ineligible" },
  { name: "DAAD Study Scholarships (All Disciplines)", reason: "DAAD states master's scholarships are 'available, in particular, for persons from industrial countries.' Bangladesh is not in a country-specific call. Currently CLOSED anyway.", status: "ineligible" },
  { name: "QEM (Models & Methods of Quantitative Economics)", reason: "🔴 TRAP. The famous 'Erasmus Mundus economics' master awards NO EMJM scholarship — its consortium and excellence scholarships cover TUITION ONLY.", status: "no_funding" },
  { name: "Charpak (France)", reason: "India-only. Not available to Bangladeshi nationals.", status: "ineligible" },
  { name: "Holland Scholarship (~€5,000) / Govt of Ireland (~€10,000)", reason: "PARTIAL only. A part-award still leaves you needing the blocked account, which defeats your objective.", status: "insufficient" },
  { name: "Deutschlandstipendium", reason: "€300/month — PARTIAL, covers only ~30% of living costs. And a FULL DAAD scholarship PRECLUDES it, so it is unusable alongside EPOS.", status: "insufficient" },
  { name: "All German Länder schemes (BaWü, Berlin NaFöG, NRW, Lower Saxony, Hamburg)", reason: "All are PhD/doctoral-only. No German Land runs a full-funding master's scholarship.", status: "ineligible" },
  { name: "TUM (TU Munich)", reason: "Charges non-EU master's tuition of €4,000–6,000 per semester. DAAD will not pay it. Disqualified on cost.", status: "unaffordable" },
  { name: "Spain (MAEC-AECID, Fundación Carolina)", reason: "MAEC-AECID excludes Bangladesh (Africa/ME/LatAm list plus a fixed-public-employee gate). Fundación Carolina is LatAm/Portugal only.", status: "ineligible" },
  { name: "Portugal (FCT, Camões)", reason: "Lusophone and/or PhD-focused. Not a route for you.", status: "ineligible" },
  { name: "Mannheim CDSE", reason: "Its 5-year funding commitment attaches to CDSE DOCTORAL-track students. Your standalone MSc Economics application is separate — if admitted, the Research Track is the funding on-ramp.", status: "partial" }
];

/* ---------------------------------------------------------------------------
   THE FIVE DECISION GATES
   --------------------------------------------------------------------------- */
const GATES = [
  {
    n: 1,
    name: "Quantitative credit composition",
    status: "PASSED — verified 100%",
    summary: "✅ AUDITED & PASSED. Your BUP BSS in Economics exceeds both Göttingen requirements by over 200%.",
    detail: "Audit executed from official BUP Course Module Book on 15 Oct 2026. Degree comprises 126.0 credits (42 courses). Pure Economics: 87.0 credits / 29 courses (69.0% vs. 33.3% required). Dedicated Mathematics, Statistics, Econometrics & Time-Series: 27.0 credits / 9 courses (21.4% vs. 6.7% / 12 credits required). You have more than TRIPLE the required quantitative credits.",
    action: "Send the prepared reply to the Göttingen EPOS thread with your audited breakdown, attend the 26 Oct Zoom info session, and submit before 15 Nov.",
    impact: "Göttingen EPOS eligibility is 100% UNLOCKED. No academic or language blockers remain."
  },
  {
    n: 2,
    name: "English test — ⚠️ NO LONGER A BLOCKER FOR GÖTTINGEN",
    status: "corrected",
    summary: "Göttingen has confirmed IN WRITING that your Medium of Instruction certificate is sufficient.",
    detail: "⚠️ THIS CORRECTS AN EARLIER ERROR IN THIS FILE. The previous entry said DAAD EPOS 'explicitly rejects' a university language certificate and that this 'blocks EVERYTHING'. On 13 Oct 2026 you asked Göttingen directly, and their EPOS Scholarship Coordination Team replied: 'Yes, your University attestating that your degree was entirely taught in English is sufficient and meets the language criteria.' That is a written confirmation from the admissions team. The MOI certificate you already hold — already scanned and attached — clears Göttingen's language requirement. ⚠️ SCOPE: this is GÖTTINGEN ONLY. Hohenheim is a separate programme with stricter published wording ('NOT SUFFICIENT... There are no exceptions') and has NOT been asked. Do not assume the same answer applies there.",
    action: "Do NOT book IELTS for Göttingen's sake — it is not required. DO email Hohenheim separately to ask whether they accept the same certificate, because their published wording differs.",
    impact: "Removes the single most urgent item from the previous critical path. Frees the next 31 days for the credit audit instead."
  },
  {
    n: 3,
    name: "Funding model",
    status: "decided",
    summary: "Germany/Sweden/EU fund you. Canada does not.",
    detail: "No federal Canadian scholarship exists for an incoming international master's student — CGRS-M requires Canadian citizenship or PR. Canada's funding is programme-level only.",
    action: "Treat Canada as a settlement target, not a funding target.",
    impact: "Canada = excellent PR pathway, poor funding pathway. That tension defines the decision."
  },
  {
    n: 4,
    name: "Course type",
    status: "decided",
    summary: "Thesis-based needs a professor. Course-based does not.",
    detail: "For a thesis-based master's a professor must agree to supervise you — outreach is decisive. For a course-based master's, a central committee allocates funding and professor emails are nearly worthless.",
    action: "Decide thesis-based vs course-based BEFORE sending a single professor email.",
    impact: "This single decision governs whether the professor outreach campaign is worth running at all."
  },
  {
    n: 5,
    name: "The development-economics trap",
    status: "OPEN — most important",
    summary: "Your two winnable EPOS routes are development-focused. Your goal is finance.",
    detail: "Göttingen is Development Economics; Hohenheim is Agricultural Economics. Both are development subjects. Your stated goal is a finance career in Europe followed by PR. If these programmes funnel graduates into development agencies, NGOs and government rather than European banking, the scholarship solves your funding while quietly moving you away from your career goal.",
    action: "Ask BOTH programmes in writing: 'Where do your graduates actually work — banking and markets, or development agencies and government?'",
    impact: "This is the single most important unresolved question in the entire plan. SISGP is the one target that sidesteps it, because it funds Finance."
  },
  {
    n: 6,
    name: "Immigration route",
    status: "decided",
    summary: "Canada has the best PR architecture. Germany has the best funded-and-fast route.",
    detail: "GERMANY: 18-month post-study job-seeking visa; EU Blue Card with a 2026 graduate concession giving the LOWER salary threshold (€45,934.20); Blue Card → permanent residence in 21 months WITH German B1, versus ~33 months with only A1. SWITZERLAND: 6-month job search, quota-limited permits, and a 10-year C-permit where student years likely do not count — best short-term money, worst long-term residency.",
    action: "German B1 is a FINANCIAL decision, not just a language one — it cuts your PR timeline by roughly 12 months.",
    impact: "Germany's post-study package is the strongest combination of funded + fast residency."
  }
];

/* ---------------------------------------------------------------------------
   DOCUMENTS — the vault
   --------------------------------------------------------------------------- */
const DOCUMENTS = [
  { id: "passport", name: "Passport", type: "Identity", status: "unconfirmed", req: ["All"], spec: "Confirm number and expiry. Must be valid well into 2028. Name must match forms exactly.", owner: "You", blocker: true },
  { id: "photo", name: "Passport-style photograph", type: "Identity", status: "missing", req: ["Some forms", "Visa"], spec: "Digital + print, white background, recent.", owner: "You" },
  { id: "degree", name: "Degree / Provisional certificate", type: "Academic", status: "have", req: ["EPOS", "SISGP", "EMJM"], spec: "Official document proving degree and grade. Chevening rejects transcripts as degree proof.", owner: "You" },
  { id: "transcript", name: "Transcript of Records", type: "Academic", status: "have", req: ["EPOS", "SISGP", "EMJM"], spec: "MUST include a grading scale. If it does not, a supplement is required.", owner: "You", blocker: true },
  { id: "trans-degree", name: "Certified translation — degree", type: "Academic", status: "verify", req: ["EPOS"], spec: "Required if not in English or German. Verify whether yours already is.", owner: "Translation service" },
  { id: "trans-transcript", name: "Certified translation — transcript", type: "Academic", status: "verify", req: ["EPOS"], spec: "Same check as the degree.", owner: "Translation service" },
  { id: "hsc", name: "HSC certificate + certified translation", type: "Academic", status: "partial", req: ["EPOS"], spec: "EPOS calls this the University Entrance Qualification. Almost certainly Bengali → certified English translation REQUIRED.", owner: "Translation service", blocker: true },
  { id: "ielts", name: "IELTS Academic or TOEFL iBT", type: "English", status: "missing", req: ["EPOS", "SISGP", "EMJM", "EPFL"], spec: "IELTS Academic 6.5 overall (Hohenheim) or TOEFL iBT 90. EMLE needs 7.0. Result must be no older than 3 years for DAAD.", owner: "You", blocker: true, critical: true },
  { id: "moi", name: "Medium of Instruction certificate", type: "English", status: "have", req: [], spec: "✅ ACCEPTED BY GÖTTINGEN — they confirmed in writing on 13 Oct 2026: 'Yes, your University attestating that your degree was entirely taught in English is sufficient and meets the language criteria.' You already hold this and it is already scanned. ⚠️ Hohenheim states the opposite for their programme ('NOT SUFFICIENT... There are no exceptions') and has NOT been asked — so this is Göttingen-specific.", owner: "You" },
  { id: "emp-cert", name: "Certificate(s) of Employment", type: "Employment", status: "missing", req: ["EPOS", "SISGP"], spec: "MANDATORY. Must show you are currently employed AND meet the 2-year minimum. Letterhead, signature, official stamp, current date, UNSEALED. Dates must match your CV exactly.", owner: "City Bank HR", blocker: true, critical: true },
  { id: "emp-letter", name: "Employer recommendation letter (Head of Treasury)", type: "Employment", status: "missing", req: ["EPOS"], spec: "MANDATORY. Official letterhead, position and referee contact details, signed and dated, unsealed. Ideally includes a re-employment guarantee.", owner: "City Bank manager", blocker: true, critical: true },
  { id: "karimul-letter", name: "DAAD Scholar Recommendation (Molla Karimul Islam, SAVP City Bank)", type: "References", status: "verify", req: ["EPOS", "SISGP", "EMJM"], spec: "⭐ HIGHEST LEVERAGE GERMAN REFERENCE. SAVP & Operational Head of Sustainable Finance Department, City Bank PLC | Adjunct Faculty, BRAC University | M.Sc. Germany (DAAD Scholar 2014, Universität Greifswald). Bridges your Treasury ALM & sovereign bond work with German sustainable development finance.", owner: "Molla Karimul Islam", critical: true },
  { id: "ranking", name: "Ranking letter (class standing)", type: "Academic", status: "missing", req: ["Göttingen"], spec: "Named explicitly by Hohenheim as acceptable evidence. Not required at Hohenheim (your 2.05 clears 2.5) but valuable for Göttingen's vaguer 'upper third' bar.", owner: "BUP" },
  { id: "ects", name: "ECTS equivalence statement", type: "Academic", status: "missing", req: ["EMLE", "Göttingen"], spec: "EMLE requires 240 ECTS — UNVERIFIED whether BUP's BSS qualifies. Also helps the EPOS 'upper third' argument.", owner: "BUP" },
  { id: "europass", name: "Europass CV (no unexplained gaps)", type: "Writing", status: "missing", req: ["EPOS"], spec: "LITERAL requirement: reverse chronological order with NO unexplained gaps. February 2024 is a real gap — declare it.", owner: "You", blocker: true },
  { id: "motivation", name: "EPOS motivation letter (ONE uniform letter)", type: "Writing", status: "missing", req: ["EPOS"], spec: "Max 2 pages, dated. ONE letter for BOTH universities, including a paragraph justifying your course ranking. Ignoring the ranking paragraph can mean 'an already awarded scholarship might be withdrawn.'", owner: "You", blocker: true, critical: true },
  { id: "epos-checklist", name: "EPOS checklist (printed, pen-signed, rescanned)", type: "Application", status: "missing", req: ["EPOS"], spec: "Must be PRINTED, signed with an ACTUAL PEN, then rescanned. A literal requirement.", owner: "You", blocker: true },
  { id: "epos-form", name: "EPOS application form", type: "Application", status: "missing", req: ["EPOS"], spec: "Typed, signed and dated.", owner: "You" },
  { id: "referees", name: "Two referees secured", type: "References", status: "missing", req: ["SISGP", "EMJM"], spec: "One City Bank manager (leadership) + one BUP academic (academic capability). Not friends or relatives. Ask permission FIRST.", owner: "You", critical: true },
  { id: "leadership", name: "Leadership evidence dossier", type: "SISGP", status: "missing", req: ["SISGP"], spec: "SISGP requires demonstrated leadership. You have it: derivatives teaching, BAFEDA/BAMDA representation, Level 2 MIS dashboard award, Manager promotion, BUP Economics Club, BNCC. Assemble it.", owner: "You", blocker: true },
  { id: "hohcampus", name: "HohCampus application", type: "Application", status: "missing", req: ["Hohenheim"], spec: "Hohenheim requires a TWO-PART application: email AND HohCampus. Both.", owner: "You" },
  { id: "pretest", name: "AgEcon PreTest", type: "Application", status: "missing", req: ["Hohenheim"], spec: "Self-evaluation required by Hohenheim.", owner: "You" },
  { id: "working-paper", name: "Yield-curve working paper", type: "Research", status: "not_started", req: ["All"], spec: "⚡ HIGHEST-LEVERAGE ASSET. Fit Nelson-Siegel to your 310-security dataset. Converts 'no publications' into independent empirical research and becomes your professor-outreach attachment.", owner: "You" }
];

/* ---------------------------------------------------------------------------
   AGENTS — what the system can do for you
   --------------------------------------------------------------------------- */
const AGENTS = [
  {
    id: "scout",
    name: "Scout",
    icon: "🔭",
    role: "Scholarship discovery & verification",
    detail: "Finds and verifies new schemes, checks cycle status against today's date, and flags eligibility gates before you invest time.",
    skills: ["Scheme discovery", "Eligibility screening", "Cycle-status checks", "Deadline verification"],
    canRun: true,
    lastRun: null
  },
  {
    id: "quartermaster",
    name: "Quartermaster",
    icon: "📦",
    role: "Document readiness & pack assembly",
    detail: "Tracks every document against every scheme's requirements, identifies blockers, and tells you exactly what is missing and who must issue it.",
    skills: ["Document audit", "Blocker detection", "Pack assembly", "Spec checking"],
    canRun: true,
    lastRun: null
  },
  {
    id: "chronos",
    name: "Chronos",
    icon: "⏰",
    role: "Deadline command & triage",
    detail: "Maintains the countdown, detects conflicts between deadlines, and ranks what must happen next by triage rules.",
    skills: ["Countdown", "Conflict detection", "Triage", "Contingency routing"],
    canRun: true,
    lastRun: null
  },
  {
    id: "envoy",
    name: "Envoy",
    icon: "✉️",
    role: "Professor & institution outreach",
    detail: "Identifies faculty, drafts outreach on the correct timing (Tue–Thu, their morning), and tracks replies. Also drafts the Eiffel nomination requests and the Gate-4 questions.",
    skills: ["Faculty matching", "Email drafting", "Timing optimisation", "Reply tracking"],
    canRun: true,
    lastRun: null
  },
  {
    id: "scribe",
    name: "Scribe",
    icon: "✍️",
    role: "Writing coach & drafting support",
    detail: "Coaches structure for motivation letters, CVs and the working paper. Builds outlines and checks your drafts against each scheme's stated criteria. Does NOT write prose for AI-screened applications.",
    skills: ["Outline generation", "Structure coaching", "Criteria checking", "Draft review"],
    canRun: true,
    lastRun: null,
    warning: "Chevening and DAAD actively screen for AI-generated text. Scribe coaches — you write."
  },
  {
    id: "strategist",
    name: "Strategist",
    icon: "🎯",
    role: "Portfolio & career strategy",
    detail: "Runs the portfolio maths, tracks the development-economics trade-off, and evaluates every programme against your actual career goal of finance-in-Europe then PR.",
    skills: ["Portfolio optimisation", "Expected-value modelling", "Gate-4 analysis", "Risk assessment"],
    canRun: true,
    lastRun: null
  },
  {
    id: "oracle",
    name: "Oracle",
    icon: "🧠",
    role: "Knowledge & playbook answering",
    detail: "Holds every verified finding from the research and answers questions from it — including every correction and every dead end, so you never re-tread a closed path.",
    skills: ["Playbook retrieval", "Correction tracking", "Dead-end lookup", "Deep-dive summaries"],
    canRun: true,
    lastRun: null
  }
];

/* ---------------------------------------------------------------------------
   PLAYBOOK — the knowledge, so you never need another website
   --------------------------------------------------------------------------- */
const PLAYBOOK = [
  {
    id: "epos",
    title: "DAAD EPOS — the complete picture",
    icon: "🇩🇪",
    sections: [
      {
        heading: "Two staggered windows — your two independent shots",
        body: "The EPOS deadlines are PER-COURSE, and your two viable economics courses have DIFFERENT windows. Göttingen: 1 Oct – 15 Nov 2026. Hohenheim: 15 Nov – 15 Dec 2026, with English accepted until 6 Jan 2027. EPOS allows up to 3 courses with ONE motivation letter, so you apply to both — two independent chances at the same €992/month, from one letter, a month apart."
      },
      {
        heading: "You apply to the UNIVERSITY, not to DAAD",
        body: "DAAD states: 'Applications have only to be sent to the respective course directly! ... Applications sent to the DAAD will not be forwarded.' Hohenheim is unusual — it wants documents emailed to agecon@uni-hohenheim.de AND a HohCampus application. Both."
      },
      {
        heading: "The four-step selection process",
        body: "1. You send your complete application directly to the course. 2. A selection committee proposes candidates for a scholarship. 3. Suggested candidates are contacted by DAAD to upload to the DAAD Portal. 4. Final selection is made. Keep a copy of EVERY document — you re-upload all of them as PDFs if proposed."
      },
      {
        heading: "What DAAD does NOT cover",
        body: "DAAD: 'DAAD does not pay tuition fees for its scholarship holders.' Baden-Württemberg charges non-EU master's students €1,500/semester. TUM charges €4,000–6,000/semester. Göttingen (Lower Saxony) charges none. Hohenheim waives it for EPOS recipients."
      },
      {
        heading: "The motivation letter is a hard gate",
        body: "DAAD: 'you have to submit one motivation letter explaining why you are applying for these specific courses and why you chose that priority. If this information is ignored, the application cannot be considered or an already awarded scholarship might be withdrawn.'"
      },
      {
        heading: "DAAD's published selection criteria",
        body: "Professional qualification: academic achievements and GRADE DEVELOPMENT, language knowledge, relevant internships/work experience. Quality of the study project: preparation, choice of programme, host university, establishment of contacts. Potential of the applicant: motivation, prospects, extracurricular commitment and SOCIAL COMMITMENT. This is why your CFA, your treasury role, your teaching of colleagues and your first-generation background are not decoration — they map onto named criteria."
      },
      {
        heading: "Advantages that are easy to miss",
        body: "No age limit — 'there is usually no fixed age limit.' No APS certificate needed for Bangladesh (APS is required only for India, China and Vietnam). Degree recency extensions are available for care responsibilities, illness, disability and military service — declare them in the 'Other comments' field and it can rescue eligibility."
      }
    ]
  },
  {
    id: "sisgp",
    title: "SISGP — your strongest target",
    icon: "🇸🇪",
    sections: [
      {
        heading: "Why this is your best fit",
        body: "It is the only scheme verified that funds tuition AND living costs, has Bangladesh on the country list, AND explicitly covers FINANCE programmes. It breaks the development-economics trade-off, because you can pursue Banking & Finance rather than development economics."
      },
      {
        heading: "The two-stage trap",
        body: "SISGP states you must be 'admitted (or conditionally admitted) to one of the eligible master's programmes on the day of admissions announcements... Master's programmes to which you are listed as a reserve cannot be considered. There are no scholarships available for late admissions.' So the university application is not groundwork — it IS the gate."
      },
      {
        heading: "Your work-experience maths",
        body: "Bangladesh applicants need ≥3,000 hours acquired prior to February 2026, from a MAXIMUM OF THREE EMPLOYERS. You have bKash (Oct 2023–Jan 2024 ≈ 680 hrs) plus City Bank (Mar 2024–Feb 2026 ≈ 4,160 hrs) = ~4,840 hours from 2 employers. You clear it comfortably and have one employer slot spare."
      },
      {
        heading: "The leadership gate is real",
        body: "SISGP requires 'demonstrated leadership experience from a current or previous employer, or from civil society engagement.' Your evidence: teaching derivatives to treasury colleagues; representing City Bank at BAFEDA/BAMDA; the Level 2 award for the cross-divisional MIS dashboard; the Manager promotion; Joint Secretary of the BUP Economics Club; Cadet Corporal in BNCC and House Leader."
      },
      {
        heading: "The timing",
        body: "Swedish university application: ~16 Oct 2026 – 15 Jan 2027 via universityadmissions.se, and you must PAY THE FEE. The SI portal is open for TWO WEEKS ONLY, ~9–25 Feb 2027, closing at 14:59 CET on the final day."
      }
    ]
  },
  {
    id: "professors",
    title: "Professor outreach — when it matters and when it doesn't",
    icon: "✉️",
    sections: [
      {
        heading: "The fork in the road — decide this first",
        body: "For a THESIS-BASED master's, a specific professor must agree to supervise you — no supervisor means no admission in most Canadian research programmes, so outreach is decisive. For a COURSE-BASED master's (MFin, MFE, taught MA) a central admissions committee allocates funding by formula, and a professor replying 'good luck' changes nothing. Decide which you are pursuing before sending a single email."
      },
      {
        heading: "Where it helps, and where it wastes time",
        body: "HELPS: research/thesis master's supervision; RA and TA positions funded from a professor's own grant; nomination-based scholarships; being named in a statement of purpose. WASTES TIME: taught master's admissions; DAAD EPOS (a course-level committee decides — contact the coordinator, not faculty); Erasmus Mundus (consortium staff run admissions); SISGP (a central body decides after you are admitted)."
      },
      {
        heading: "The correct contacts in Europe",
        body: "For Göttingen EPOS, contact the EPOS Study Coordinator (epos-devecon@uni-goettingen.de), not professors. For Hohenheim, contact agecon@uni-hohenheim.de. These are the people who know the answer. Professors at those departments do not run EPOS admissions."
      },
      {
        heading: "Timing, to the hour",
        body: "Send Tue–Thu only (never Monday backlog, never Friday). Send so the email lands at the top of their inbox at the start of their working day. Their 8:30 am in Toronto is 6:30 pm in Dhaka; Calgary is 8:30 pm; Vancouver is 9:30 pm. Germany is 12:30 pm. Best months: September–mid-November, then January–February. Worst: mid-December–early January, and July–August."
      },
      {
        heading: "The email itself",
        body: "Under 200 words. One specific paper named correctly, with year — this alone puts you in the top few percent. ONE clear, small, answerable question. Attach a one-page CV and nothing else. No flattery. Never mass-mail: academics talk to each other and it is a small field."
      },
      {
        heading: "Ask structure, not charity",
        body: "Don't ask 'can you fund me?' Ask 'Are you accepting master's students for Sept 2027, and is funding in your department available to international students or mainly through research assistantships?' An easy question gets a reply. A vague request for help gets deleted."
      },
      {
        heading: "Realistic expectations",
        body: "Cold emails from unknown international applicants get replies 10–25% of the time. A 20% reply rate on 30 emails means 6 conversations — that is a SUCCESSFUL campaign. Silence is the norm, not a verdict on you. Follow up once at 10–14 days, once more at 3–4 weeks, then stop."
      }
    ]
  },
  {
    id: "funding",
    title: "Blended funding — the layers",
    icon: "💰",
    sections: [
      {
        heading: "Why tuition-free is not funded",
        body: "Germany's public universities charge little or no tuition, but that is not funding. You still must prove roughly €12,000/year in a blocked account (Sperrkonto) for the visa, plus €70–430 per semester in contributions. For a Bangladeshi applicant the blocked account is often the real wall, not tuition. So the honest goal is: tuition-free PLUS a monthly stipend."
      },
      {
        heading: "A scholarship replaces the blocked account",
        body: "DAAD's own finance page states acceptable visa proof is 'an allocated amount on a blocked account' OR 'proof of receipt of a recognised scholarship.' So a full scholarship GENUINELY REPLACES the blocked account requirement."
      },
      {
        heading: "But a scholarship does NOT bypass the visa queue",
        body: "The Dhaka embassy's appointment backlog is a separate administrative constraint. A fully funded candidate can still miss an intake because the appointment came too late. Verify current wait times with the German Embassy Dhaka and build that into your intake choice. UNVERIFIED: current Dhaka wait times."
      },
      {
        heading: "The layers you can stack",
        body: "1. Tuition: tuition-free public university, EPOS waiver at Hohenheim, or EMJM full tuition. 2. Living costs: EPOS €992/mo, EMJM €1,400/mo, SISGP SEK 12,000/mo. 3. Top-ups: DAAD rent subsidy to €350/mo, family allowance. 4. Earned income: TA/RA ships — but DAAD deducts income above €603/month gross from the stipend. 5. Blocked account: your own money, returned monthly. 6. Employer sponsorship: City Bank — completely untested, and worth asking, because you are being promoted and building the desk's analytics."
      }
    ]
  },
  {
    id: "career",
    title: "Career and residency reality",
    icon: "🧭",
    sections: [
      {
        heading: "Germany — the strongest combined package",
        body: "18-month post-study job-seeking visa. EU Blue Card with a 2026 graduate concession giving the LOWER salary threshold (€45,934.20) — this matters because a first job out of a master's will not pay €50,700. Blue Card → permanent residence in 21 MONTHS with German B1, versus ~33 months with only A1. B1 is therefore a FINANCIAL decision worth roughly a year of your life. The 2026 thresholds should be re-verified: sources differ slightly."
      },
      {
        heading: "Switzerland — best money, worst residency",
        body: "6-month job search after graduation (versus Germany's 18). Quota-limited work permits with a labour-market test. A 10-year C-permit where student years likely do NOT count. EPFL pays CHF 40,000 plus housing, but Switzerland is the inverse of Germany: excellent short-term money, poor long-term residency."
      },
      {
        heading: "Canada — best residency, no funding",
        body: "Master's graduates are FULLY EXEMPT from the PGWP field-of-study restriction. A 3-year PGWP is available for master's graduates even for programmes under two years (≥8 months) since 15 February 2024. Master's students are exempt from PAL/TAL from 1 January 2026. But there is NO federal scholarship for an incoming international master's student — CGRS-M requires Canadian citizenship or PR. Canada converts a master's into PR more reliably than any European option, if you can solve the funding at programme level."
      },
      {
        heading: "The language barrier in finance — the decisive unknown",
        body: "Finance and banking roles are far more local-language-dependent than tech. Germany's finance sector generally requires German. Sweden, the Netherlands, Switzerland and Ireland have relatively stronger English-language finance markets. This remains INCOMPLETE research — and it is decisive for your plan, because a funded development-economics degree in a country where you cannot work in finance serves neither goal."
      },
      {
        heading: "The CFA in Europe",
        body: "Your charter is EQF/RQF Level 7 — master's level. It is your strongest differentiator and it compensates for the 3.30 CGPA by supplying exactly the quantitative proof the transcript lacks. It is also evidence of scarce skill, which is relevant to visa sponsorship. UNVERIFIED: how much weight European finance employers give it relative to a target-university master's."
      }
    ]
  },
  {
    id: "emjm",
    title: "Erasmus Mundus — the verified economics shortlist",
    icon: "🇪🇺",
    sections: [
      {
        heading: "The value, now verified",
        body: "€1,400/month × up to 24 months = €33,600, plus the funded programme CANNOT charge scholarship holders tuition or mandatory participation costs, plus travel and installation. Total value roughly €51,600. Verified from multiple primary consortium sources, not an aggregator."
      },
      {
        heading: "Your verified economics shortlist — exactly 3",
        body: "The Commission selected 37 new Joint Masters in July 2026 for September 2027 entry. Only THREE are economics: EGEI (Economics of Globalisation and European Integration, coordinator Italy/Bari — BEST FIT, ~15 scholarships/yr, partners in Lille, Ghent, Xiamen, Santander, Valparaíso, Tartu); GLOBAL COOP (Economic Policies for New Global Cooperation and Alliances, coordinator Brazil); GLODEP (Global Development Policy, coordinator Czechia — but this is DEVELOPMENT, the same trap as Göttingen). The cap is 3, so this is your clean shortlist."
      },
      {
        heading: "🔴 The 10% nationality cap — a real throttle",
        body: "EPOG-JM states it plainly: 'in order to ensure geographical diversity among students, no more than 10% of the students selected for a scholarship should have the same nationality.' If a consortium awards ~15 scholarships, only ~1–2 can go to any single nationality. Your odds therefore depend partly on how many other Bangladeshis apply that year — which you cannot control. This is precisely why EMJM alone cannot carry your portfolio."
      },
      {
        heading: "The Partner Country advantage you already qualify for",
        body: "As a Bangladeshi citizen you are a PARTNER COUNTRY student — provided you have not lived, studied or worked in an EU Programme Country for more than 12 months in the last 5 years. You qualify. That unlocks the higher travel band: €3,000/year travel plus €1,000 installation for locations 4,000 km or more from the coordinator. Bangladesh qualifies."
      },
      {
        heading: "⚠️ The value discrepancy you must resolve",
        body: "EGEI's own page quotes €1,000/month. The current EMJM framework is €1,400/month. EGEI's page reflects the OLDER EMJMD action. EGEI also states scholarships are 'not offered in academic year 2026-2027' because the programme is relaunching under the new selection. Treat €1,400 as current, but VERIFY both points against EGEI's 2027/28 call before relying on them."
      },
      {
        heading: "Where to apply, and when",
        body: "There is NO central EU application — you apply directly to each consortium. Consortia publish their 2027/28 calls from around mid-November 2026, with deadlines typically October to January. Watch epog.eu, master-egei.eu and the EACEA catalogue. The EACEA RSS feed (eacea.ec.europa.eu/node/253/rss_en) is the workaround that renders when the filtered catalogue will not."
      },
      {
        heading: "The traps, named",
        body: "QEM (Models & Methods of Quantitative Economics) — the top search result for 'Erasmus Mundus economics' — awards NO EMJM scholarship; its consortium and excellence scholarships cover TUITION ONLY. EMLE awards real scholarships but needs 240 ECTS (unverified for your BSS), IELTS 7.0, and it is law-and-economics. EPOG-JM is a genuine economics EMJM but heterodox and ecological in focus, not finance."
      },
      {
        heading: "💡 A precedent worth exploiting for Eiffel",
        body: "EPOG-JM coordinates Eiffel applications on behalf of its second-year Paris students: 'The EPOG team will be in charge of coordinating the application with the eligible students.' That is a working example of a programme acting as your EIFFEL NOMINATOR — which is otherwise your hardest gate, since only French institutions may submit. Cite this precedent when you email French programmes."
      }
    ]
  },
  {
    id: "canada",
    title: "Canada — the 16-month gate that decides everything",
    icon: "🇨🇦",
    sections: [
      {
        heading: "🔴 HIS WIFE IS COMING — CONFIRMED, NON-NEGOTIABLE",
        body: "Confirmed 7 October 2026. This makes the 16-month rule ABSOLUTE, not a preference. There is no fallback to a 12-month programme and no 'she arrives later' variant. A 12-month programme is functionally WORTHLESS no matter how good its placement or funding. This is now the single hardest filter in the entire pipeline — harder than funding, harder than grades."
      },
      {
        heading: "🚨 THE HARD GATE — verified verbatim from canada.ca",
        body: "Spousal open work permit: 'Starting January 21, 2025, your spouse or common-law partner may be eligible for an open work permit if you have a valid study permit and you're either studying in a MASTER'S DEGREE PROGRAM OF 16 MONTHS OR LONGER, studying in a doctoral degree program, participating in an eligible program, or studying in one of the following professional degree programs at a university: DDS/DMD, LLB/JD/BCL, MD, OD, PharmD, BScN/BSN/BNSc/BN, BEd, BEng/BE/BASc.' Effective 21 January 2025. Work permit duration: 'Most of the time, your spouse or common-law partner's work permit will be valid for the same period of time as your study permit.'"
      },
      {
        heading: "💡 THE KEY STRATEGIC INSIGHT — search the WRONG departments and you find nothing",
        body: "Canadian ECONOMICS MA programmes are overwhelmingly 12 months and therefore automatically excluded. The programmes that genuinely run 16–24 months with a funded thesis live in MATHEMATICS, STATISTICS, ACTUARIAL SCIENCE, FINANCIAL MATHEMATICS and business-school research MSc routes. Quebec is structurally advantaged because its MSc programmes are often two years (four sessions) rather than 12 months."
      },
      {
        heading: "⭐ THE FINDING SO FAR: Waterloo MMath (thesis option)",
        body: "MMath in Statistics and MMath in Actuarial Science are RESEARCH-BASED and FUNDED. Waterloo's own funding page: 'Full-time MMath students (in good academic standing) in the Master's Research Paper stream are normally funded for one year (3 academic terms). Students that successfully switch to the Thesis stream will be provided one additional term of funding.' 3 terms (12 months) + 1 thesis term = 4 terms = 16 MONTHS — exactly the threshold. Funding = guaranteed TA in the offer letter + scholarships + supervisor GRA/GRS. Deadline: priority 15 Dec 2026, FINAL 6 Jan 2027, fall admission only."
      },
      {
        heading: "⚠️ THE CRITICAL CAVEAT you must not miss",
        body: "All students are ADMITTED to the Master's Research Paper stream. The thesis switch must be requested AFTER the first term and 'normally an average of 90% or higher is required', plus supervisor and department approval. So the 16-month length is NOT guaranteed at admission — it depends on earning a 90% average in term one. That is a real risk, not a formality. Admission minimum is a four-year bachelor's in a quantitative discipline with a 78% average (your 3.30/4.00 ≈ 82.5% clears it)."
      },
      {
        heading: "🔴 THE TRAP: Waterloo MQF looks perfect and is unfunded",
        body: "The Master of Quantitative Finance is 16 months — it PASSES the length rule — and has the best career outcomes found anywhere in Canada: 100% internship placement in most years (16/16 in 2024, 15/15 in 2023, 18/18 in 2022), with employers including RBC, TD Securities, Scotiabank, CIBC, BMO, CPP Investments, OTPP, CDPQ, OMERS, OPTrust, Manulife, Deloitte, KPMG, Polar Asset Management and Optiver. Alumni have gone to Bank of Canada, Barclays, Bloomberg NY, Citigroup, Deutsche Bank, JP Morgan, Morgan Stanley and UBS Hong Kong. BUT the department states plainly: 'Part-time students and students in coursework or professional programs, such as the MActSc and MQF, do not receive funding.' It is listed as 'Master's, Professional'. It fails the funding constraint."
      },
      {
        heading: "⚙️ MAILING IS PARALLEL-OPTIONAL",
        body: "You asked that outreach can be deferred if needed but must run in parallel and never block the applications that actually close. Operating rule: PRIORITY 1 are the hard deadlines (Göttingen EPOS 15 Nov, EPFL and Hohenheim 15 Dec, Swedish university application 15 Jan, SISGP 9–25 Feb). PRIORITY 2 are the unblockers (IELTS, City Bank letters, BUP ranking and ECTS, certified translations). PRIORITY 3 is Canada outreach, which is QUEUED, NOT URGENT — professor emails have no deadline and stay valuable for months. If a week is consumed by the EPOS pack, the emails simply slide to the next Tue–Thu window. Nothing is lost. But note Waterloo's MMath deadline is 6 January 2027, so Wave 1 should go by mid-November to leave room for a reply."
      },
      {
        heading: "✉️ CONTACT DETAILS — ⚠️ ONE UNRESOLVED CONFLICT",
        body: "⚠️ TWO DIFFERENT SENDER ADDRESSES ARE IN PLAY AND YOU MUST SETTLE THIS BEFORE SENDING ANYTHING. You told me professors should see santohasib.bup@gmail.com. But the existing 11 drafted emails say to send from hasibulhassan650@gmail.com. These conflict. RECOMMENDATION: use santohasib.bup@gmail.com — you confirmed it, it is already the address on your CV, and one guide notes that a new address can land in spam while an established one does not. Whichever you pick, the address on the CV you attach MUST match the address you send from. LinkedIn is linkedin.com/in/hasibul-hasan-santo."
      },
      {
        heading: "🔴 THREE ERRORS FOUND IN THE EXISTING EMAIL DRAFTS",
        body: "1) CALGARY IS CLOSED. The draft to Apostolos Serletis says you plan to apply to Calgary's thesis-based MA in Economics. Calgary's own Economics page states verbatim: 'The department of Economics is not accepting applications for the MA Thesis based program. Students are encouraged to apply for the MA Course based program.' My earlier exclusion of Calgary was CORRECT; the new file is wrong. BUT the funding claim is real — Calgary guarantees MA/MSc thesis students a minimum of $25,455/yr for internationals — so redirect the approach to a Calgary thesis programme that IS admitting (Mathematics & Statistics, or Haskayne). 2) KALIMIPALLI (Laurier) HAS NO VERIFIED PAPER — the source admits 'I could not verify a specific title', so that email has an empty paragraph 2, which is the one paragraph every guide says must name a real paper. DO NOT SEND IT. 3) SASKATCHEWAN EDWARDS 'funding guaranteed both years' is UNVERIFIED, and the file itself says funding comes automatically with admission — so the Tannous email buys supervisor fit, not money."
      },
      {
        heading: "Funding mechanism — what changes in the email",
        body: "DEPARTMENT-FUNDED: funding comes WITH admission (TA/RA ship, entrance award). The professor does not control the money — ask about supervision and what to highlight for the department's funding decision. SUPERVISOR-FUNDED: funding depends on a professor's grant (NSERC, SSHRC, Mitacs, RA). The professor controls the money — ask DIRECTLY about a funded RA position. Waterloo's MMath is department-funded, so the Schied and Weng drafts ask about supervision and funding consideration, not for cash."
      },
      {
        heading: "The verified professor lead",
        body: "Alexander Schied — Professor, Munich Re Chair in Stochastic Finance, University Research Chair, and MQF Program Director, Department of Statistics and Actuarial Science, Waterloo. Research includes risk measurement and management, robustness and model uncertainty, and MARKET MICROSTRUCTURE AND PRICE IMPACT — the closest match in Canada to a money-market desk role. Verified 2024 paper: Luo, Schied & Xue, 'The perturbation method applied to a robust optimization problem with constraint', Mathematics and Financial Economics vol. 18 no. 4. Profile: uwaterloo.ca/statistics-and-actuarial-science/profile/aschied — confirm the email address on that page; never guess an address format."
      },
      {
        heading: "Send timing (Dhaka, UTC+6)",
        body: "Tuesday–Thursday, 8:00–10:00 recipient local time. Max 5 per day. NEVER two professors in the same department on the same day. DST changes 1 Nov 2026: Ontario/Quebec is 6:00–8:00 pm Dhaka before, 7:00–9:00 pm after. Avoid Mondays, Fridays, weekends, Thanksgiving 12 Oct 2026, Remembrance Day 11 Nov, reading weeks and December exam weeks. Follow up once at 10 business days, then stop."
      }
    ]
  },
  {
    id: "chronology",
    title: "The chronology — every date in order",
    icon: "📅",
    sections: [
      { heading: "October 2026", body: "Book IELTS. Request City Bank Certificate of Employment and employer recommendation letter. Request the BUP ranking and ECTS letters. Download, print, pen-sign and rescan the EPOS checklist and form. Build the Europass CV. Confirm passport expiry. Email French programmes for an Eiffel nomination. Swedish university applications OPEN ~16 Oct." },
      { heading: "1–30 November 2026", body: "ETH ESOP window (low priority — the top-10% gate is a long shot)." },
      { heading: "15 November 2026", body: "🔴 GÖTTINGEN EPOS CLOSES. Hohenheim EPOS OPENS the same day. EMJM window opens ~mid-Nov. SI publishes the 2027/28 eligible-programme list ~mid-Nov." },
      { heading: "15 December 2026", body: "🔴 HOHENHEIM EPOS CLOSES (email + HohCampus). 🔴 EPFL Excellence Fellowship ROUND 1 CLOSES." },
      { heading: "31 December 2026", body: "EMLE non-European deadline." },
      { heading: "6 January 2027", body: "⭐ Hohenheim English-test grace deadline — your safety valve." },
      { heading: "~8 January 2027", body: "Eiffel closes (only if a French institution nominated you)." },
      { heading: "~15 January 2027", body: "🔴 SWEDISH UNIVERSITY APPLICATION CLOSES — must be admitted or SISGP is impossible." },
      { heading: "9–25 February 2027", body: "🎯 SISGP SCHOLARSHIP PORTAL — two weeks only, closes 14:59 CET on the final day." },
      { heading: "February 2027", body: "Hohenheim selection." },
      { heading: "January–March 2027", body: "Göttingen online interviews for shortlisted candidates." },
      { heading: "Mid-March 2027", body: "Göttingen decisions." },
      { heading: "August–September 2027", body: "EPOS intensive German course (funded)." },
      { heading: "October 2027", body: "Programme start." }
    ]
  },
  {
    id: "corrections",
    title: "Corrections — things that were reported wrong",
    icon: "🔧",
    sections: [
      { heading: "Eiffel's age cap is 29, not 25", body: "Campus France states verbatim: 'encourages applicants from foreign countries up to 29 years old at master's level, and applicants up to 35 years old at PhD level.' You are 24 — comfortably eligible." },
      { heading: "DAAD does not pay tuition", body: "DAAD F.7: 'DAAD does not pay tuition fees for its scholarship holders.' At TUM (€4,000–6,000/semester) an EPOS award would leave roughly €10,000/year unfunded. Verify tuition is zero before applying." },
      { heading: "ESKAS is dead for master's", body: "SBFI's official country list for Bangladesh shows only 'Research Fellowship · PhD'. No master's track exists. The age cap was never the problem — the LEVEL was." },
      { heading: "The ETH ESOP deadline is 30 November, not 15 December", body: "The window is 1–30 November 2026 — about three weeks earlier than commonly cited." },
      { heading: "EMJM's value and cap are now facts, not assumptions", body: "€1,400/month × 24 = €33,600, plus full tuition, travel and a €1,000 installation allowance — roughly €51,600. And the cap is a MAXIMUM OF 3 programmes, stated verbatim by both QEM and EMLE." },
      { heading: "Chevening closed before you could use it", body: "Verified against the clock: the deadline was 6 October 2026 at 11:00 UTC, and at 14:45 UTC the portal had closed 3.8 hours earlier. You were confirmed ELIGIBLE. The next cycle opens around August 2027." }
    ]
  }
];

/* ---------------------------------------------------------------------------
   EXPORT
   --------------------------------------------------------------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROFILE, TARGETS, DEAD_ENDS, GATES, DOCUMENTS, AGENTS, PLAYBOOK };
}
