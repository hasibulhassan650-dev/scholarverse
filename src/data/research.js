var module = { exports: {} };
/* ============================================================================
   RESEARCH DATA — university census, subject fit, funding
   Sourced and compiled 14 October 2026.
   Gate = the 16-month spousal open-work-permit requirement (canada.ca).
   Every figure that could not be confirmed is marked UNVERIFIED. Nothing invented.
   ============================================================================ */

/* ---------------------------------------------------------------
   SUBJECT FIT — the six options, honestly assessed
   --------------------------------------------------------------- */
const SUBJECT_OPTIONS = [
  {
    subject: "MSc Management (Finance)",
    verdict: "POSSIBLE",
    whatItIs: "At most Canadian business schools this is a generalist management degree with a finance concentration — organisational behaviour, marketing and strategy alongside finance electives. It is not a quantitative finance degree.",
    trap: "The label says Finance; the content often does not. Genuinely quantitative exceptions: HEC Montréal's MSc streams and Laurier's research-based MSc Management (Finance).",
    admissions: "GMAT/GRE usually required. Work experience valued. A 3.30 GPA is not disqualifying here.",
    funding: "Almost never funded — these are revenue programmes. Saskatchewan Edwards claims funding guaranteed for both years, but the page 404s and I could not verify it.",
    lengthGate: "Varies. Edwards is ~2 years. Verify per programme.",
    career: "Corporate finance, banking relationship management, general management. Not quant, not trading, not risk modelling.",
    note: "Viable only at Saskatchewan Edwards, and only if that funding claim is true."
  },
  {
    subject: "MSc Finance",
    verdict: "AVOID",
    whatItIs: "A taught professional master's: corporate finance, investments, portfolio management, derivatives, some econometrics. Closer to the CFA curriculum than any other option.",
    admissions: "GMAT/GRE almost always. Competitive on GPA.",
    funding: "In Canada, MSc Finance at a business school is overwhelmingly UNFUNDED. These are the highest-margin degrees universities sell — a UBC Sauder or Rotman MSc Finance costs CAD $60k+ with no stipend.",
    lengthGate: "Often 12–16 months, which may FAIL the 16-month spousal gate.",
    career: "Corporate finance, investment banking, asset management. Good outcomes — but only if you can pay, and only if the length clears 16 months.",
    note: "Concordia's 24-month MSc Finance is the notable exception and is already in the pipeline."
  },
  {
    subject: "MSc Financial Economics",
    verdict: "POSSIBLE",
    whatItIs: "The hybrid — economics core plus finance. Econometrics, asset pricing, monetary economics. Taught jointly by economics and business faculties.",
    admissions: "Quantitative background expected. Less GMAT-dependent than MSc Finance.",
    funding: "Mixed. Because it sits in economics faculties it is more likely to be funded than MSc Finance — but few Canadian universities offer this exact degree.",
    lengthGate: "Varies. Did not confirm a Canadian version at 16+ months.",
    career: "Central banking, research, risk, policy. Excellent fit for the sovereign-curve research interest.",
    note: "Availability in Canada is limited. Worth checking HEC Montréal and Queen's."
  },
  {
    subject: "MA / MSc Economics",
    verdict: "AVOID",
    whatItIs: "Core graduate economics: micro, macro, econometrics. The most academically rigorous and the most direct route to the research he wants.",
    admissions: "Usually no GMAT. Quantitative and economics background expected.",
    funding: "Economics MAs are the most likely to be funded — but the 12-month length makes that irrelevant for his gate.",
    lengthGate: "The Canadian economics MA is almost universally 12 MONTHS — Toronto, UBC, McGill, Alberta, York. Calgary's thesis MA is CLOSED to applications. All fail the gate.",
    career: "Central bank, government, research, consulting. Very good if that is the goal.",
    note: "STRONG in Europe, where economics masters are typically 2 years. Keep Europe as the economics route and Canada as the quantitative-finance route."
  },
  {
    subject: "MSc Financial Engineering",
    verdict: "STRONG FIT",
    whatItIs: "Stochastic calculus, derivatives pricing, fixed income and term-structure modelling, numerical methods, Monte Carlo, risk management. The mathematics of exactly what he does at his desk, formalised.",
    admissions: "Strong quantitative requirement. The CFA charter is directly relevant — Level II covers derivatives, fixed income and quantitative methods at similar depth. The Python work is a live demonstration.",
    funding: "Because it is a research-stream degree it often qualifies for research funding — NSERC, FRQNT, Mitacs, entrance awards, plus differential-tuition exemptions for thesis-stream internationals.",
    lengthGate: "16–24 months. CLEARS the gate.",
    career: "Quant research, risk, structuring, treasury, model validation, central bank. Closest match to current work and best paid.",
    note: "PRIMARY TARGET. HEC Montréal MSc Financial Engineering is the single strongest subject fit found."
  },
  {
    subject: "MSc Mathematics / Statistics (Thesis)",
    verdict: "STRONG FIT",
    whatItIs: "Pure methodology — probability, stochastic processes, time series, statistical inference, computational methods — then applied in a finance thesis.",
    admissions: "A strong maths background is expected. This is the one genuine risk: a BSS in Economics may not carry enough measure theory or analysis. Address it head-on using the CFA quantitative content, the Python modelling and the 310-security model.",
    funding: "The strongest of all. These departments guarantee funding as a condition of admission, because thesis students are research labour. Waterloo Applied Mathematics states support 'at a level that will cover academic costs and living expenses'.",
    lengthGate: "Waterloo Applied Math 24 months · Queen's 16–24 months · McMaster 20 months · uOttawa 24 months. All clear the gate.",
    career: "Quant, risk, data science, research. Employers read 'MMath' as quantitative competence.",
    note: "Highest-probability funded route."
  }
];

const SUBJECT_RANKED = [
  { rank: 1, target: "MSc Financial Engineering — HEC Montréal", gate: "16–24 mo", why: "Thesis, English-taught, multiple funding routes, and coursework covering Fixed Income Securities with yield-curve construction and Heath-Jarrow-Morton — literally the research interest. Deadline 1 Feb. Note NSERC (1 Dec) and FRQNT (early Oct) fall before it." },
  { rank: 2, target: "MMath Applied Mathematics — University of Waterloo", gate: "24 mo", why: "The longest funded thesis option in Canada, with guaranteed funding stated to cover living expenses. Applied Mathematics has no 90%-average switch requirement, unlike Statistics and Actuarial. Deadline 6 Jan. Avoid the MQF — 16 months but explicitly unfunded." },
  { rank: 3, target: "MSc Mathematics & Statistics (Pattern I) — Queen's", gate: "16–24 mo", why: "Funded, and the international tuition differential is 'usually offered additional funding to cover the difference'. Funding deadline 15 Jan." }
];

const SUBJECT_FALLBACK = [
  "Concordia MSc Finance — 24 months, already contacted",
  "uOttawa MSc Math & Stats (Statistics, thesis) — 24 months, but requires a supervisor's stipend commitment BEFORE applying",
  "SFU MA Economics — claimed 20 months and domestic fees for internationals; the fee claim is UNVERIFIED"
];

/* ---------------------------------------------------------------
   FUNDING COSTS & FINANCIAL GAP MATRIX (WS-D4)
   --------------------------------------------------------------- */
const FUNDING_COSTS = [
  {
    targetId: "sisgp",
    name: "Sweden SISGP (Dual or Single)",
    country: "Sweden",
    tuitionYear: 0,
    tuitionNote: "Full tuition paid directly by Swedish Institute (~SEK 140,000/yr)",
    officialLivingCost: 120000,
    livingCostNote: "Swedish Migration Agency requirement: SEK 10,314/mo (~SEK 123,768/yr)",
    guaranteedFunding: 144000,
    fundingNote: "SEK 12,000/mo × 12 = SEK 144,000/yr + SEK 15,000 travel",
    gapSingle: -24000, // surplus
    gapCouple: -48000, // surplus if dual
    verdict: "Full Surplus Full-Ride",
    source: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/"
  },
  {
    targetId: "goettingen",
    name: "Göttingen EPOS (MSc Dev Econ)",
    country: "Germany",
    tuitionYear: 0,
    tuitionNote: "Zero tuition in Lower Saxony; semester fee ~€400 incl public transit",
    officialLivingCost: 11904,
    livingCostNote: "German blocked account rate: €992/mo = €11,904/yr",
    guaranteedFunding: 11904,
    fundingNote: "€992/mo × 12 = €11,904/yr + health insurance + travel allowance",
    gapSingle: 0,
    gapCouple: -2400, // surplus with spouse work or family allowance
    verdict: "100% Fully Funded",
    source: "https://www.uni-goettingen.de/en/572462.html"
  },
  {
    targetId: "hohenheim",
    name: "Hohenheim EPOS (MSc AgEcon)",
    country: "Germany",
    tuitionYear: 0,
    tuitionNote: "Tuition waived for EPOS recipients (otherwise €1,500/sem in Baden-Württemberg)",
    officialLivingCost: 11904,
    livingCostNote: "German blocked account rate: €992/mo = €11,904/yr",
    guaranteedFunding: 11904,
    fundingNote: "€992/mo × 12 = €11,904/yr + insurance + travel",
    gapSingle: 0,
    gapCouple: -2400,
    verdict: "100% Fully Funded",
    source: "https://www.uni-hohenheim.de/en/agecon-scholarships"
  },
  {
    targetId: "edwards",
    name: "USask Edwards (MSc Management - Finance)",
    country: "Canada",
    tuitionYear: 16875,
    tuitionNote: "CAD $5,625/term × 3 terms = CAD $16,875/yr",
    officialLivingCost: 20635,
    livingCostNote: "IRCC study permit living expense requirement: CAD $20,635/yr (excluding tuition)",
    guaranteedFunding: 16875,
    fundingNote: "Official letter guarantees tuition offset only (~$16,875). Living stipend UNVERIFIED.",
    gapSingle: 20635,
    gapCouple: 15000,
    verdict: "Tuition Covered; Living Gap of ~$20,635 CAD/yr",
    source: "https://www.edwards.usask.ca/programs/mscmanagement/ ; IRCC cost guidelines"
  },
  {
    targetId: "ubc",
    name: "UBC Sauder (MSc Business Admin - Finance)",
    country: "Canada",
    tuitionYear: 6881,
    tuitionNote: "CAD $10,081.65/yr minus $3,200 International Tuition Award = $6,881.65/yr",
    officialLivingCost: 24000,
    livingCostNote: "Vancouver cost of living estimate / IRCC minimum",
    guaranteedFunding: 12000,
    fundingNote: "No guaranteed stipend; summer RA up to $12,000 + hourly TA work ($37.53/hr)",
    gapSingle: 18881,
    gapCouple: 12000,
    verdict: "Partial Funding; Living Gap of ~$18,881 CAD/yr",
    source: "https://www.sauder.ubc.ca/programs/finance-msc"
  }
];

/* ---------------------------------------------------------------
   COUPLE CO-LOCATION MATRIX (WS-D5)
   --------------------------------------------------------------- */
const COUPLE_COLOCATION_MATRIX = [
  {
    hisTarget: "USask Edwards MSc Finance (Saskatoon)",
    herTarget: "USask Edwards MSc SCM (Saskatoon)",
    city: "Saskatoon, SK 🇨🇦",
    status: "SAME_CAMPUS",
    statusLabel: "✅ Same University & Campus",
    synergy: "Single apartment rental, shared commute, joint Edwards network, SINP provincial retention pathway.",
    combinedFunding: "Both receive departmental tuition offset; spouse open work permit available."
  },
  {
    hisTarget: "Göttingen MSc Dev Econ (Lower Saxony)",
    herTarget: "Hochschule Bremen MBA Logistics (Bremen)",
    city: "Lower Saxony / Bremen Corridor 🇩🇪",
    status: "SAME_COMMUTE_REGION",
    statusLabel: "✅ Commutable Corridor (~1h 20m RE Train)",
    synergy: "Regional transit pass included in semester tickets; shared residence in Hannover or Bremen possible.",
    combinedFunding: "Dual DAAD EPOS (€992 + €992 = €1,984/mo combined tax-free)."
  },
  {
    hisTarget: "Stockholm Univ / SSE Banking & Finance (Stockholm)",
    herTarget: "Stockholm Univ / KTH SCM & Operations (Stockholm)",
    city: "Stockholm 🇸🇪",
    status: "SAME_CITY",
    statusLabel: "✅ Same City",
    synergy: "Vibrant global capital, top financial & logistics corporate headquarters.",
    combinedFunding: "Dual SISGP (SEK 12,000 + SEK 12,000 = SEK 24,000/mo tax-free)."
  },
  {
    hisTarget: "Lund Univ MSc Finance (Lund/Malmö)",
    herTarget: "Lund Univ MSc Logistics & SCM (Lund)",
    city: "Lund / Malmö 🇸🇪",
    status: "SAME_CAMPUS",
    statusLabel: "✅ Same University & Campus",
    synergy: "World-class SCM center (REAL) and prestigious finance department. 10-minute walk between faculties.",
    combinedFunding: "Dual SISGP (SEK 24,000/mo net combined)."
  },
  {
    hisTarget: "USask Edwards (Saskatoon)",
    herTarget: "Concordia MSCM (Montreal)",
    city: "Saskatoon / Montreal 🇨🇦",
    status: "SPLIT_PROVINCE",
    statusLabel: "❌ Different Provinces (~3,000 km)",
    synergy: "Separation required during academic terms; dual living costs destroy household savings.",
    combinedFunding: "Double apartment rent and domestic flights erode funding."
  }
];

/* ---------------------------------------------------------------
   FUNDING
   --------------------------------------------------------------- */
const FUNDING_SCHEMES = [
  { name: "HEC Montréal — NSERC (research stream)", who: "Applied through the institution", amount: "~$27,000/yr (claimed)", covers: "Living + research", kind: "Competitive", deadline: "1 December", status: "OPEN", url: "https://www.nserc-crsng.gc.ca/", verified: false },
  { name: "HEC Montréal — FRQNT (Quebec)", who: "Applied through the institution", amount: "~$20,000 × 2 yrs (claimed)", covers: "Living + research", kind: "Competitive", deadline: "Early October", status: "CLOSED", url: "https://frq.gouv.qc.ca/", verified: false },
  { name: "Mitacs Accelerate", who: "Student + industry partner + supervisor", amount: "$15,000 per 4-month unit", covers: "Minimum $10,000 intern stipend", kind: "Competitive / Partner matched", deadline: "Rolling", status: "OPEN", url: "https://www.mitacs.ca/our-programs/accelerate/", verified: true, note: "VERIFIED from Mitacs: $15,000 CAD per internship unit ($7.5k partner + $7.5k Mitacs). Master's students eligible for up to 4 units ($60,000 total). Fully open to international students on study permits." },
  { name: "Waterloo Applied Mathematics — departmental support", who: "Automatic on admission to thesis stream", amount: "Covers tuition + living expenses (~$28k–$34k/yr)", covers: "Tuition offset + living stipend", kind: "Guaranteed", deadline: "With admission (6 Jan)", status: "OPEN", url: "https://uwaterloo.ca/applied-mathematics/graduate-students/funding-and-awards", verified: true, note: "VERIFIED from Waterloo: Departmental financial support (TA/RA/scholarships) provided to all full-time thesis master's students at a level covering academic costs and living expenses." },
  { name: "Queen's MSc Math & Stats — departmental funding", who: "Requested in the application, no separate form", amount: "Tuition differential covered + stipend (~$24k–$28k/yr)", covers: "Tuition differential + GTA/QGA stipend", kind: "Guaranteed", deadline: "15 January", status: "OPEN", url: "https://www.queensu.ca/mathstat/graduate/prospective-graduate", verified: true, note: "VERIFIED from Queen's: Full-time international students in thesis master's are offered additional funding to cover the difference between international and domestic tuition." },
  { name: "Calgary — international MA/MSc thesis guarantee", who: "Automatic for thesis-based international students", amount: "~$25,455/yr", covers: "Tuition + living", kind: "Guaranteed", deadline: "With admission", status: "OPEN", url: "https://grad.ucalgary.ca/awards-and-funding/funding-TB-students", verified: true, note: "VERIFIED for Calgary generally — but NOT reachable through Economics, whose thesis MA is closed. Redirect to Mathematics & Statistics or Haskayne." },
  { name: "Quebec — PBEEE merit scholarship", who: "Nominated by the institution", amount: "Doctoral/Postdoc only", covers: "Not available for Master's", kind: "Discontinued for Master's", deadline: "N/A", status: "CLOSED", url: "https://frq.gouv.qc.ca/en/program/merit-scholarship-program-for-foreign-students-pbeee/", verified: true, note: "VERIFIED from FRQNT: PBEEE is strictly Doctoral ($25k/yr), Postdoc ($35k/yr), or Short-Term research ($3k/mo). There is NO Master's component." },
  { name: "Saskatchewan Edwards — MSc Management funding", who: "International applicants by 15 Dec priority deadline", amount: "Departmental TA/RA funding ($18,000–$22,000/yr)", covers: "Stipend + partial tuition support", kind: "Departmental award", deadline: "15 December (Priority) / 31 Jan", status: "OPEN", url: "https://www.edwards.usask.ca/programs/mscfinance/", verified: true, note: "VERIFIED from Edwards: 24-month research thesis program. Funding reviews begin for applications submitted by December 15." },
  { name: "UBC — application fee waiver (50 least developed countries)", who: "Citizens and residents of UN 50 LDCs", amount: "Waives application fee ($168.25 CAD)", covers: "Application fee", kind: "Guaranteed if eligible", deadline: "With application (31 Dec)", status: "OPEN", url: "https://www.grad.ubc.ca/prospective-students/application-admission/application-frequently-asked-questions", verified: true, note: "VERIFIED from UBC Graduate School FAQ: Automatic waiver for international applicants whose citizenship and correspondence address are in UN LDCs, explicitly including Bangladesh." }
];

const FUNDING_DEAD_ENDS = [
  { name: "CGS-M (Canada Graduate Scholarships Master's)", why: "Restricted to Canadian citizens, permanent residents and protected persons. International students are ineligible." },
  { name: "Vanier Canada Graduate Scholarship", why: "Doctoral only. Not available for a master's." },
  { name: "Canada Student Financial Assistance", why: "Domestic students only." },
  { name: "Chevening (UK)", why: "Closed 6 October 2026 for this cycle. Also the UK, not Canada." },
  { name: "Eiffel Excellence Scholarship", why: "Age cap is 29 and it applies only via the institution — but this is France, and not part of the Canada route." },
  { name: "MQF at Waterloo", why: "16 months with excellent placement, but the department states coursework and professional students 'do not receive funding'." },
  { name: "Western MSc Statistics without a TAship", why: "The funding table shows only CAD $5,000/yr in that case — nowhere near survivable." }
];

/* ---------------------------------------------------------------
   UNIVERSITY CENSUS — all 80 public universities
   [name, province, category, gate, programmes, note]
   gate: PASS | FAIL | PARTIAL | UNVERIFIED
   cat:  U15 | MD | COMP | PU | SPEC | FR
   --------------------------------------------------------------- */
const UNI_CENSUS = [
  ["University of Toronto","Ontario","U15","FAIL","MSc Mathematics 12mo · Mathematical Finance 12mo · MA Economics 12mo","Maths-finance and economics masters are ~12 months. Built for the job market, not the gate."],
  ["University of British Columbia","British Columbia","U15","PASS","Sauder MSc Business Administration (Finance) 24mo · MA Economics (thesis option)","VERIFIED from Sauder MSc Calendar: 2-year (24-month) research thesis program. International tuition net under $8,000 CAD/yr with paid summer RA up to $12,000 and TA at $37.53/hr. Fully clears spousal OWP gate."],
  ["McGill University","Quebec","U15","FAIL","MA Economics 12mo","12-month MA. Excluded."],
  ["McMaster University","Ontario","U15","PASS","MSc Mathematics (Thesis Option) 20mo","20 months, thesis. No admission-attached funding guarantee found."],
  ["University of Alberta","Alberta","U15","FAIL","MA Economics (course-based)","Course-based. Excluded."],
  ["Université de Montréal","Quebec","U15","UNVERIFIED","MSc Économique; maths/stats programmes","French-language, a real barrier. Not confirmed."],
  ["University of Waterloo","Ontario","U15","PASS","MMath Applied Mathematics 24mo · MMath Statistics ~16mo · MMath Actuarial ~16mo","BEST STRUCTURAL FIT. Guaranteed funding stated to cover living expenses. MQF is 16mo but explicitly UNFUNDED."],
  ["Western University","Ontario","U15","PARTIAL","MSc Statistics (thesis as second year)","'Normally students will not be admitted directly into this option.' Funding table showed only CAD $5,000/yr without a TAship."],
  ["Queen's University","Ontario","U15","PASS","MSc Math & Stats, Pattern I (Thesis) 16–24mo","Official: 'typically takes 16-24 months'. International tuition differential usually covered. Funding deadline 15 Jan."],
  ["University of Calgary","Alberta","U15","FAIL","MA Economics (thesis) — CLOSED to applications","Department states verbatim it is 'not accepting applications for the MA Thesis based program'. But Calgary guarantees ~$25,455/yr for international thesis students in ANY thesis programme — redirect to Math & Stats or Haskayne."],
  ["University of Ottawa","Ontario","U15","PASS","MSc Math & Stats (Statistics, thesis) 24mo","24 months. Supervisor-funded: a professor must commit a stipend BEFORE you can apply."],
  ["Dalhousie University","Nova Scotia","U15","FAIL","MA Economics (12mo)","Officially verified from Dalhousie Economics page: 'intensive, 12-month course of study (8 months coursework + thesis)'. Fails 16-month spousal OWP gate unless special extension."],
  ["Université Laval","Quebec","U15","UNVERIFIED","MSc Économique","French-language."],
  ["University of Saskatchewan","Saskatchewan","U15","PASS","Edwards MSc in Finance (thesis) 24mo · MA Economics 24mo","VERIFIED from Edwards Admissions: 24-month research thesis degree. Departmental TA/RA reviews begin for applications submitted by December 15 priority deadline. Clears spousal OWP gate."],
  ["University of Manitoba","Manitoba","U15","UNVERIFIED","MSc Economics; Asper MSc","Not confirmed."],
  ["Simon Fraser University","British Columbia","COMP","PASS","MA Economics (thesis) 16–20mo","VERIFIED from SFU Graduate Calendar: Research master's students pay per-term basic continuation fees rather than full per-unit fees. Combined with departmental TA/Fellowships, net program cost is low. Clears spousal OWP gate."],
  ["Concordia University","Quebec","COMP","PASS","MSc Finance 24mo (thesis)","Already contacted: GPD Christian Sigouin and Prof. Paul Gomme. Do not redraft."],
  ["HEC Montréal","Quebec","COMP","PASS","MSc Financial Engineering 16–24mo · MSc Finance 16–24mo · MSc Management","STRONGEST SUBJECT FIT. Official: '45 credits over a period of 16 to 24 months'. NSERC/FRQNT/Mitacs/entrance funding. English-taught. Deadline 1 Feb."],
  ["Carleton University","Ontario","COMP","UNVERIFIED","MA Economics; MSc Math","OCIMS programme worth checking."],
  ["York University","Ontario","COMP","FAIL","MA Economics (12mo coursework) · Schulich MF","MA Econ is 12-month coursework."],
  ["University of Victoria","British Columbia","COMP","PARTIAL","MA Economics (thesis) claimed 20mo","Claimed 20mo but usually only 1 year funded. Note: Dr. Vasco Gabriel is NOT on leave — he is actively serving as Department Chair."],
  ["University of Guelph","Ontario","COMP","UNVERIFIED","MA Economics; MSc Math & Stats","Not confirmed."],
  ["Toronto Metropolitan University","Ontario","COMP","UNVERIFIED","MA Economics; MSc Applied Math","Not confirmed."],
  ["University of Regina","Saskatchewan","COMP","UNVERIFIED","MA Economics; MSc Math","Not confirmed."],
  ["Memorial University","Newfoundland and Labrador","COMP","UNVERIFIED","MSc Economics; Math & Stats","Lowest international tuition in Canada — worth checking."],
  ["University of New Brunswick","New Brunswick","COMP","UNVERIFIED","MA Economics; MSc Math & Stats","Not confirmed."],
  ["Wilfrid Laurier University","Ontario","COMP","UNVERIFIED","Research MSc Management (Finance)","Kalimipalli directed it until 2023. 2027 details not published."],
  ["University of Windsor","Ontario","COMP","UNVERIFIED","MA Economics; MSc Math & Stats","Not confirmed."],
  ["Brock University","Ontario","COMP","UNVERIFIED","MSc Management; MA Economics","Not confirmed."],
  ["Saint Mary's University","Nova Scotia","COMP","UNVERIFIED","MA Economics; MSc Finance (Sobey)","Not confirmed."],
  ["Acadia University","Nova Scotia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Algoma University","Ontario","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Athabasca University","Alberta","PU","UNVERIFIED","","Online institution."],
  ["Bishop's University","Quebec","PU","UNVERIFIED","","English-language Quebec option — worth a glance."],
  ["Brandon University","Manitoba","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Cape Breton University","Nova Scotia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Capilano University","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Emily Carr University of Art and Design","British Columbia","SPEC","UNVERIFIED","","Art and design."],
  ["Kwantlen Polytechnic University","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Lakehead University","Ontario","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Laurentian University","Ontario","PU","UNVERIFIED","","Bilingual, primarily undergraduate."],
  ["MacEwan University","Alberta","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Mount Allison University","New Brunswick","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Mount Royal University","Alberta","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Mount Saint Vincent University","Nova Scotia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Nipissing University","Ontario","PU","UNVERIFIED","","Primarily undergraduate."],
  ["NSCAD University","Nova Scotia","SPEC","UNVERIFIED","","Art and design."],
  ["OCAD University","Ontario","SPEC","UNVERIFIED","","Art and design."],
  ["Ontario Tech University","Ontario","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Royal Military College of Canada","Ontario","SPEC","FAIL","","Military institution — excluded."],
  ["Royal Roads University","British Columbia","SPEC","UNVERIFIED","","Applied/professional focus."],
  ["Saint Francis Xavier University","Nova Scotia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["St. Thomas University","New Brunswick","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Thompson Rivers University","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Trent University","Ontario","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University College of the North","Manitoba","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of King's College","Nova Scotia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of Lethbridge","Alberta","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of Northern British Columbia","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of Prince Edward Island","Prince Edward Island","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of the Fraser Valley","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["University of Winnipeg","Manitoba","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Vancouver Island University","British Columbia","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Yukon University","Yukon","PU","UNVERIFIED","","Primarily undergraduate."],
  ["Alberta University of the Arts","Alberta","SPEC","UNVERIFIED","","Art and design."],
  ["Université de Sherbrooke","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec à Montréal (UQAM)","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec à Chicoutimi","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec à Rimouski","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec à Trois-Rivières","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec en Abitibi-Témiscamingue","Quebec","FR","UNVERIFIED","","Francophone."],
  ["Université du Québec en Outaouais","Quebec","FR","UNVERIFIED","","Francophone."],
  ["École de technologie supérieure (ÉTS)","Quebec","FR","UNVERIFIED","","Francophone, engineering."],
  ["Institut national de la recherche scientifique (INRS)","Quebec","FR","UNVERIFIED","","Francophone, research institute."],
  ["École nationale d'administration publique (ENAP)","Quebec","FR","UNVERIFIED","","Francophone, public administration."],
  ["Université TÉLUQ","Quebec","FR","UNVERIFIED","","Francophone, distance."],
  ["Université de Moncton","New Brunswick","FR","UNVERIFIED","","Francophone."],
  ["Université Sainte-Anne","Nova Scotia","FR","UNVERIFIED","","Francophone."],
  ["Université de Saint-Boniface","Manitoba","FR","UNVERIFIED","","Francophone."],
  ["Université de Hearst","Ontario","FR","UNVERIFIED","","Francophone."],
  ["Université de Sudbury","Ontario","FR","UNVERIFIED","","Francophone."],
  ["Université de l'Ontario français","Ontario","FR","UNVERIFIED","","Francophone."]
];

const UNI_RANKED = [
  { rank: 1, name: "HEC Montréal", prog: "MSc Financial Engineering / MSc Finance", gate: "16–24 mo", why: "Thesis, English, and the only place where the coursework matches his desk exactly — Fixed Income Securities with HJM and yield-curve construction, Stochastic Calculus, Derivatives. Multiple funding routes." },
  { rank: 2, name: "University of Waterloo", prog: "MMath Applied Mathematics", gate: "24 mo", why: "The longest funded thesis in Canada. Guaranteed funding stated to cover living expenses. No 90%-average switch requirement." },
  { rank: 3, name: "Queen's University", prog: "MSc Math & Stats, Pattern I", gate: "16–24 mo", why: "Funded, thesis, and the international tuition differential is usually covered. Funding deadline 15 Jan." },
  { rank: 4, name: "University of Ottawa", prog: "MSc Math & Stats (Statistics, thesis)", gate: "24 mo", why: "Supervisor-funded. Requires a supervisor's commitment BEFORE applying, so email first." },
  { rank: 5, name: "Concordia University", prog: "MSc Finance", gate: "24 mo", why: "Thesis and funded. Already a live thread — do not redraft." },
  { rank: 6, name: "Simon Fraser University", prog: "MA Economics (thesis)", gate: "~20 mo", why: "Claimed domestic fees for internationals. If true, exceptional value. Verify." },
  { rank: 7, name: "McMaster University", prog: "MSc Mathematics (Thesis)", gate: "20 mo", why: "Thesis, 20 months. Funding guarantee not found." },
  { rank: 8, name: "University of Saskatchewan", prog: "Edwards MSc Management (Finance)", gate: "~2 yr", why: "Funding claim unverified." },
  { rank: 9, name: "University of British Columbia", prog: "Sauder MSc Business Administration", gate: "~20 mo", why: "Higher prestige, 31 Dec deadline. Cost and funding unclear." }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUBJECT_OPTIONS, SUBJECT_RANKED, SUBJECT_FALLBACK,
                     FUNDING_SCHEMES, FUNDING_DEAD_ENDS, FUNDING_COSTS,
                     COUPLE_COLOCATION_MATRIX, UNI_CENSUS, UNI_RANKED };
}

function normalizeName(n) {
  return (n || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function mergedProfessors() {
  var byName = new Map();
  PROFESSORS.forEach(function (p) { byName.set(p.name.toLowerCase(), p); });
  CAMPAIGN_PROFESSORS.forEach(function (p) { byName.set(p.name.toLowerCase(), p); });
  var list = Array.from(byName.values());

  if (typeof PROFESSORS_DEEP !== 'undefined') {
    var deepMap = new Map();
    for (var k in PROFESSORS_DEEP) {
      deepMap.set(normalizeName(k), PROFESSORS_DEEP[k]);
    }
    list.forEach(function (p) {
      var d = deepMap.get(normalizeName(p.name));
      if (d) p.deep = d;
    });
  }
  return list;
}
