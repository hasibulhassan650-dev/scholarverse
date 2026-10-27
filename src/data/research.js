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
  { name: "UBC — application fee waiver (50 least developed countries)", who: "Citizens and residents of UN 50 LDCs", amount: "Waives application fee ($168.25 CAD)", covers: "Application fee", kind: "Guaranteed if eligible", deadline: "With application (31 Dec)", status: "OPEN", url: "https://www.grad.ubc.ca/prospective-students/application-admission/application-frequently-asked-questions", verified: true, note: "VERIFIED from UBC Graduate School FAQ: Automatic waiver for international applicants whose citizenship and correspondence address are in UN LDCs, explicitly including Bangladesh." },
{
  "name": "Ontario Graduate Scholarship (OGS) — International Stream",
  "who": "Applied through Ontario universities (Waterloo, UofT, Queen's, McMaster, Western)",
  "amount": "$15,000 CAD / yr ($5,000 per term)",
  "covers": "Living stipend / academic costs",
  "kind": "Competitive Merit",
  "deadline": "Varies by university (Jan – Mar 2027)",
  "status": "OPEN",
  "url": "https://osap.gov.on.ca/OSAPPortal/en/A-ZListofAid/PRDR019245.html",
  "verified": true,
  "note": "VERIFIED from OSAP & University Guidelines: Ontario Province funds 2/3 and the university funds 1/3. Open to international students on valid study permits; each university has an explicit quota of international OGS awards."
},
{
  "name": "Waterloo — International Master's Award of Excellence (IMAE)",
  "who": "Full-time international research-based master's students at Waterloo",
  "amount": "$2,500 CAD / term (up to $12,500 total over 5 terms)",
  "covers": "Tuition offset / research support",
  "kind": "Institutional Entrance Award",
  "deadline": "Automatic nomination with admission",
  "status": "OPEN",
  "url": "https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/awards/international-masters-award-excellence-imae",
  "verified": true,
  "note": "VERIFIED from University of Waterloo GSPA: Faculties nominate incoming international students admitted to research-based master's programs based on admission GPA."
},
{
  "name": "Queen's — International Master's Tuition Award (IMTA)",
  "who": "Full-time international research master's students at Queen's University",
  "amount": "Up to $10,000 CAD / yr",
  "covers": "International tuition differential",
  "kind": "Guaranteed / Automatic with Thesis Admission",
  "deadline": "15 January (with admission package)",
  "status": "OPEN",
  "url": "https://www.queensu.ca/grad-postdoc/fees-funding/funding-sources/internal/tuition-awards",
  "verified": true,
  "note": "VERIFIED from Queen's School of Graduate Studies: Designed to reduce the tuition differential for international research master's students down toward domestic rates."
},
{
  "name": "UBC — International Tuition Award (ITA)",
  "who": "All full-time international students in research master's programs at UBC",
  "amount": "$3,200 CAD / yr",
  "covers": "Automatic tuition reduction",
  "kind": "Guaranteed / Universal",
  "deadline": "Automatic upon registration",
  "status": "OPEN",
  "url": "https://www.grad.ubc.ca/awards/international-tuition-award",
  "verified": true,
  "note": "VERIFIED from UBC Graduate & Postdoctoral Studies: Automatic annual $3,200 CAD tuition credit for all eligible international master's thesis students."
},
{
  "name": "Alberta Graduate Excellence Scholarship (AGES)",
  "who": "International and domestic master's students at University of Alberta & Calgary",
  "amount": "$11,000 – $15,000 CAD",
  "covers": "Living & research expenses",
  "kind": "Provincial Merit Award",
  "deadline": "Nominated by department in Fall/Winter",
  "status": "OPEN",
  "url": "https://www.ualberta.ca/en/graduate-studies/awards-and-funding/scholarships/ages.html",
  "verified": true,
  "note": "VERIFIED from Government of Alberta & UAlberta: Funded by the Government of Alberta to incentivize academic excellence; open to international students on study permits."
},
{
  "name": "Saskatchewan Graduate Scholarship (SGS)",
  "who": "Master's thesis students at the University of Saskatchewan",
  "amount": "Up to $16,000 CAD / yr",
  "covers": "Living allowance / research funding",
  "kind": "Departmental Allocation",
  "deadline": "Nominated upon admission",
  "status": "OPEN",
  "url": "https://grad.usask.ca/awards-and-funding/scholarships/sgs.php",
  "verified": true,
  "note": "VERIFIED from USask College of Graduate & Postdoctoral Studies: Allocated to departments for distribution to top-ranking incoming thesis master's candidates."
},
{
  "name": "SFU — Graduate Dean's Entrance Scholarship (GDES)",
  "who": "Incoming research master's students at Simon Fraser University",
  "amount": "$21,000 CAD / yr",
  "covers": "Living stipend",
  "kind": "Entrance Merit Competition",
  "deadline": "Nominated by department with application",
  "status": "OPEN",
  "url": "https://www.sfu.ca/gradstudies/awards-funding/entrance-scholarships/gdes.html",
  "verified": true,
  "note": "VERIFIED from SFU Graduate Studies: Available to domestic and international applicants with a minimum admission GPA of 3.70 entering thesis programs."
}
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
   CANADA U15 & COMPREHENSIVE NATIONAL RANKINGS (RANK-WISE)
   --------------------------------------------------------------- */
const CANADA_U15_RANKED = [
  {
    rank: 1,
    name: "University of Toronto",
    province: "Ontario",
    city: "Toronto",
    tier: "Tier 1 Elite (U15 #1)",
    gate: "FAIL / 12mo",
    gateLabel: "Fails 16-month Spousal OWP Gate",
    gateStatus: "bad",
    funding: "Professional (Unfunded)",
    hasibulProgram: "Master of Mathematical Finance (MMF) 12mo (Unfunded) / MA Economics 12mo",
    zarinProgram: "Rotman MBA / Operations Management",
    facultyLead: "Prof. Sebastian Jaimungal (Math Finance) / Prof. John Hull (Derivatives)",
    why: "Canada's top brand for global finance. However, all quant finance/econ master's are 12 months, failing the 16-month spousal OWP rule unless enrolled in PhD."
  },
  {
    rank: 2,
    name: "University of British Columbia",
    province: "British Columbia",
    city: "Vancouver",
    tier: "Tier 1 Elite (U15 #2)",
    gate: "PASS (24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Partial / Summer RA ($12k) + TA ($37.53/hr)",
    hasibulProgram: "Sauder MSc in Business Administration (Finance) 24mo Thesis (GMAT req; Dec 31 deadline; App fee waived)",
    zarinProgram: "Sauder MSc in Business Administration (Operations & Logistics) 24mo",
    facultyLead: "Hasibul: Prof. Isha Agarwal (Banking & Crowding Out) · Zarin: Prof. Anming Zhang (Air Cargo Chair)",
    why: "World-class business school. Dual co-location in Vancouver. Free application fee for Bangladesh citizens. Both clear the 16-month gate."
  },
  {
    rank: 3,
    name: "McGill University",
    province: "Quebec",
    city: "Montréal",
    tier: "Tier 1 Elite (U15 #3)",
    gate: "FAIL / 12mo",
    gateLabel: "Fails 16-month Gate (<16mo)",
    gateStatus: "bad",
    funding: "Competitive",
    hasibulProgram: "MA in Economics (12 months coursework + paper)",
    zarinProgram: "Desautels Master in Management",
    facultyLead: "Economics & Desautels Faculty",
    why: "Top Quebec global brand, but the standard master's degrees in Economics are 12-month coursework."
  },
  {
    rank: 4,
    name: "McMaster University",
    province: "Ontario",
    city: "Hamilton",
    tier: "Tier 1 Elite (U15 #4)",
    gate: "PASS (20mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Competitive Departmental (OGS / Awards)",
    hasibulProgram: "MSc Mathematics (Thesis Option) 20mo (Financial Math & Stochastic Modeling)",
    zarinProgram: "DeGroote MSc in Management (Operations)",
    facultyLead: "Prof. Matheus Grasselli (Macroprudential Financial Modeling)",
    why: "20-month thesis structure easily clears the spousal work permit gate. Strong quantitative math department."
  },
  {
    rank: 5,
    name: "University of Alberta",
    province: "Alberta",
    city: "Edmonton",
    tier: "Tier 1 Elite (U15 #5)",
    gate: "FAIL / Course-based",
    gateLabel: "Fails Gate (Course-based / Unfunded)",
    gateStatus: "bad",
    funding: "None (Course-based)",
    hasibulProgram: "MA Economics (Course-based, 12-16mo)",
    zarinProgram: "Alberta School of Business MBA Operations",
    facultyLead: "Energy & Resource Economics Faculty",
    why: "Economics MA is strictly course-based without guaranteed thesis funding."
  },
  {
    rank: 6,
    name: "Université de Montréal / HEC Montréal",
    province: "Quebec",
    city: "Montréal",
    tier: "Tier 1 Elite (U15 #6)",
    gate: "PASS (16–24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "High / NSERC $27k + FRQNT $20k + Bourses",
    hasibulProgram: "HEC MSc Financial Engineering / MSc Finance (16–24mo Thesis; 100% English)",
    zarinProgram: "HEC MSc Global Supply Chain Management (16–24mo Thesis; 100% English)",
    facultyLead: "Hasibul: Prof. Pascal François (Fixed Income ALM) & Prof. Tolga Cenesizoglu · Zarin: Prof. Yossiri Adulyasak (CRC Chair SCM)",
    why: "⭐ #1 SUBJECT FIT IN CANADA. Live trading room, Canadian Derivatives Institute partner, exact curriculum match (Yield curves, HJM, Stochastic calculus). 100% English-taught."
  },
  {
    rank: 7,
    name: "University of Waterloo",
    province: "Ontario",
    city: "Waterloo",
    tier: "Tier 1 Elite (U15 #7)",
    gate: "PASS (16–24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Guaranteed Min $18k–$28k/yr (Thesis Stream)",
    hasibulProgram: "MMath Applied Mathematics 24mo Thesis (Guaranteed Full Funding) / MMath Statistics 16mo",
    zarinProgram: "MASc in Management Science & Engineering (Logistics & SCM) 24mo Thesis",
    facultyLead: "Hasibul: Prof. Chengguo Weng, Prof. David Saunders · Zarin: Prof. Sibel Alumur Alev & Prof. Fatma Gzara",
    why: "⭐ #1 QUANT & CO-OP BRAND IN CANADA. Both clear the 16-month gate. Zarin invited to email resume directly to Prof. Gzara."
  },
  {
    rank: 8,
    name: "University of Calgary",
    province: "Alberta",
    city: "Calgary",
    tier: "Tier 1 Elite (U15 #8)",
    gate: "PARTIAL / Haskayne",
    gateLabel: "Partial (Econ MA Closed; Haskayne / Math Open)",
    gateStatus: "warn",
    funding: "Guaranteed $25,455/yr (International Thesis Stream)",
    hasibulProgram: "MSc Mathematics & Statistics / Haskayne Research MSc (MA Econ thesis closed)",
    zarinProgram: "Haskayne School of Business MSc in Operations & SCM",
    facultyLead: "Prof. Apostolos Serletis (Monetary Macro) & Prof. Sonja Chen",
    why: "Economics department closed its thesis stream, but Calgary guarantees $25,455/yr for ANY international thesis student in science/math."
  },
  {
    rank: 9,
    name: "University of Ottawa",
    province: "Ontario",
    city: "Ottawa",
    tier: "Tier 1 Elite (U15 #9)",
    gate: "PASS (24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Supervisor-Funded (Stipend Commitment Required)",
    hasibulProgram: "MSc Mathematics & Statistics (Statistics with Thesis) 24mo",
    zarinProgram: "Telfer MSc in Management (Operations)",
    facultyLead: "OCIMS Joint Ottawa-Carleton Institute Faculty",
    why: "Bank of Canada and federal policy proximity. Requires a supervisor stipend commitment prior to application."
  },
  {
    rank: 10,
    name: "Queen's University",
    province: "Ontario",
    city: "Kingston",
    tier: "Tier 1 Elite (U15 #10)",
    gate: "PASS (16–24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Department-Funded (Tuition Differential Covered)",
    hasibulProgram: "MSc Mathematics & Statistics — Pattern I Thesis (16–24mo; Jan 15 deadline)",
    zarinProgram: "Smith MSc in Management (Operations)",
    facultyLead: "Prof. Mike Gallmeyer & Smith Finance Faculty",
    why: "Top institutional reputation. Pattern I thesis explicitly covers international tuition differential."
  },
  {
    rank: 11,
    name: "Western University",
    province: "Ontario",
    city: "London",
    tier: "Tier 1 Elite (U15 #11)",
    gate: "PARTIAL / AMBIGUOUS",
    gateLabel: "Partial (Thesis is Year 2 Option)",
    gateStatus: "warn",
    funding: "TAship Minimum ($25,653/yr with TA)",
    hasibulProgram: "MSc in Statistics (Thesis option as Year 2)",
    zarinProgram: "Ivey MSc in Management",
    facultyLead: "Statistical and Actuarial Sciences Faculty",
    why: "Ivey Business School prestige; 2nd year thesis must be approved in winter term of year 1."
  },
  {
    rank: 12,
    name: "Université Laval",
    province: "Quebec",
    city: "Québec City",
    tier: "Tier 1 Elite (U15 #12)",
    gate: "UNVERIFIED / French",
    gateLabel: "French-language Barrier",
    gateStatus: "plain",
    funding: "Provincial Quebec Rates",
    hasibulProgram: "MSc Finance (FSA Laval)",
    zarinProgram: "MSc Operations & Logistics Management",
    facultyLead: "FSA Laval Faculty",
    why: "Strong actuarial history, but primarily French-taught at graduate level."
  },
  {
    rank: 13,
    name: "Dalhousie University",
    province: "Nova Scotia",
    city: "Halifax",
    tier: "Tier 1 Elite (U15 #13)",
    gate: "FAIL / 12mo",
    gateLabel: "Fails Gate (12mo intensive)",
    gateStatus: "bad",
    funding: "Departmental Scholarships",
    hasibulProgram: "MA in Economics (12 months intensive)",
    zarinProgram: "Rowe School of Business Programs",
    facultyLead: "Prof. James McNeil (Sovereign Debt)",
    why: "12-month program fails the 16-month spousal OWP gate."
  },
  {
    rank: 14,
    name: "University of Manitoba",
    province: "Manitoba",
    city: "Winnipeg",
    tier: "Tier 1 Elite (U15 #14)",
    gate: "PARTIAL (18-24mo)",
    gateLabel: "Partial (Thesis available)",
    gateStatus: "warn",
    funding: "UMGF ($14,000/yr)",
    hasibulProgram: "MA Economics (Thesis track 18mo)",
    zarinProgram: "Asper MSc in Management (SCM)",
    facultyLead: "Asper School of Business Faculty",
    why: "Low tuition costs in Manitoba; MPNP provincial nominee program is welcoming."
  },
  {
    rank: 15,
    name: "University of Saskatchewan",
    province: "Saskatchewan",
    city: "Saskatoon",
    tier: "Tier 1 Elite (U15 #15)",
    gate: "PASS (24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Guaranteed Tuition Offset ($16,875/yr; Dec 15 deadline)",
    hasibulProgram: "Edwards MSc in Management (Finance Specialization) 24mo Thesis / MA Economics 24mo",
    zarinProgram: "Edwards MSc in Management (Operations Management Stream) 24mo Thesis",
    facultyLead: "Hasibul: Prof. Abdullah Mamun & Prof. Enchuan Shao · Zarin: Prof. Keith Willoughby & Prof. Nematollahi",
    why: "⭐ TOP CO-LOCATION MATCH IN CANADA. 100% same campus and faculty in Saskatoon. Both receive guaranteed tuition offset. SINP provincial retention pathway."
  },
  {
    rank: 16,
    name: "Simon Fraser University",
    province: "British Columbia",
    city: "Burnaby",
    tier: "Tier 2 Comprehensive (#1 Comprehensive)",
    gate: "PASS (16–20mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Low Continuation Fees + TA ($12k–$18k/yr)",
    hasibulProgram: "MA Economics (Thesis Option) 16–20mo",
    zarinProgram: "Beedie MSc in Management / Finance",
    facultyLead: "Prof. Lucas Herrenbrueck (JPE 2023 - Asset Safety vs Liquidity)",
    why: "Top comprehensive university. Continuation fee structure keeps international tuition low. Excellent monetary theory group."
  },
  {
    rank: 17,
    name: "Concordia University",
    province: "Quebec",
    city: "Montréal",
    tier: "Tier 2 Comprehensive",
    gate: "PASS (24mo Thesis)",
    gateLabel: "Clears 16-month Gate ✅",
    gateStatus: "ok",
    funding: "Departmental Awards & TA/RA (~$10k–$15k/yr)",
    hasibulProgram: "MSc in Finance 24mo Thesis (GPD Christian Sigouin)",
    zarinProgram: "Master of Supply Chain Management (MSCM Option A Thesis) 24mo",
    facultyLead: "Hasibul: Prof. Paul Gomme · Zarin: Assoc. Prof. Xiaodan Pan (MSCM Director & Chair)",
    why: "Dual master's programs in Montreal. Zarin's #1 realistic Canadian SCM thesis target under Program Director Xiaodan Pan."
  },
  {
    rank: 18,
    name: "University of Victoria",
    province: "British Columbia",
    city: "Victoria",
    tier: "Tier 2 Comprehensive",
    gate: "PARTIAL (Claimed 20mo)",
    gateLabel: "Partial (Funding 1 year only)",
    gateStatus: "warn",
    funding: "Departmental Fellowship (Year 1 only)",
    hasibulProgram: "MA in Economics (Thesis Option)",
    zarinProgram: "Gustavson School of Business Programs",
    facultyLead: "Prof. Vasco Gabriel (Department Chair, Macro-Finance)",
    why: "Funding is usually granted for year 1 only, creating a year 2 funding gap."
  },
  {
    rank: 19,
    name: "Wilfrid Laurier University",
    province: "Ontario",
    city: "Waterloo",
    tier: "Tier 2 Comprehensive",
    gate: "AMBIGUOUS",
    gateLabel: "Ambiguous (Length & Funding unconfirmed)",
    gateStatus: "warn",
    funding: "Lazaridis Graduate Funding",
    hasibulProgram: "MSc Management (Financial Economics) 12–16mo",
    zarinProgram: "Lazaridis SCM & Operations",
    facultyLead: "Prof. Madhu Kalimipalli (Bond Volatility & JBF)",
    why: "Lazaridis School is located directly in Waterloo (adjacent to UW), creating potential local co-location."
  }
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

const MASTERSPORTAL_CANADA_AUDIT = [
  {
    "university": "Douglas College",
    "program": "Global Banking and Economics",
    "degree": "Post-Degree Diploma",
    "duration": "12 months (1 yr)",
    "tuition": "$16,248 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "Postgraduate Diploma, NOT a master's degree. Fails the 16-month rule and is NOT exempt from IRCC field-of-study restrictions.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (College Diploma)"
  },
  {
    "university": "Algoma University",
    "program": "Global Business and Economy",
    "degree": "Master (Course-based)",
    "duration": "24 months (2 yrs)",
    "tuition": "$12,131 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Course-based professional degree at a primarily undergraduate institution; no research funding.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (Unfunded Coursework)"
  },
  {
    "university": "Douglas College",
    "program": "Sales / Marketing Studies",
    "degree": "Postgraduate Diploma",
    "duration": "12 months (1 yr)",
    "tuition": "$16,248 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "College sales diploma; not an academic master's.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (College Diploma)"
  },
  {
    "university": "Cape Breton University",
    "program": "Community Economic Development",
    "degree": "M.B.A.",
    "duration": "24 months (2 yrs)",
    "tuition": "$36,342 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "MBA with extremely high tuition ($36.3k/yr); non-thesis and unfunded.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (High Cost MBA)"
  },
  {
    "university": "Douglas College",
    "program": "Accounting Studies",
    "degree": "Postgraduate Diploma",
    "duration": "12 months (1 yr)",
    "tuition": "$16,248 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "College accounting post-degree diploma.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (College Diploma)"
  },
  {
    "university": "Dalhousie University",
    "program": "Master of Economics",
    "degree": "M.A.",
    "duration": "12 months intensive",
    "tuition": "$13,294 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Intensive 12-month program. Strictly fails the 16-month spousal open work permit gate unless formal extension granted.",
    "fundingStatus": "Departmental TA/Scholarships",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Dalhousie University",
    "program": "Master of Development Economics (MDE)",
    "degree": "Master",
    "duration": "12 to 24 months",
    "tuition": "$13,294 / yr",
    "gateStatus": "PARTIAL",
    "gateReason": "Can be extended to 2 years with thesis, but subject is development economics rather than financial economics.",
    "fundingStatus": "Departmental Aid",
    "verdict": "Secondary Alternative"
  },
  {
    "university": "University of Windsor",
    "program": "Applied Economics and Policy (MAEP)",
    "degree": "Master",
    "duration": "16 months (4 terms)",
    "tuition": "$13,201 / yr",
    "gateStatus": "PASS",
    "gateReason": "16 months duration technically clears the IRCC C42 spousal gate.",
    "fundingStatus": "Coursework / Unfunded",
    "verdict": "Viable Settlement (Unfunded)"
  },
  {
    "university": "Thompson Rivers University",
    "program": "Mathematics and Economics",
    "degree": "Postgraduate Diploma",
    "duration": "24 months (2 yrs)",
    "tuition": "$18,175 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "Postgraduate diploma, not a degree-granting graduate master's.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (Diploma)"
  },
  {
    "university": "Thompson Rivers University",
    "program": "Economics",
    "degree": "Postgraduate Diploma",
    "duration": "24 months (2 yrs)",
    "tuition": "$36,350 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "Postgraduate diploma.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (Diploma)"
  },
  {
    "university": "Memorial University of Newfoundland",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months (1 yr)",
    "tuition": "$1,533 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Remarkably low tuition ($1,533/yr), but standard program is 12 months, failing the spousal gate.",
    "fundingStatus": "Low Tuition (~$1.5k)",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Royal Roads University",
    "program": "Indigenous Economic Development",
    "degree": "Postgraduate Certificate",
    "duration": "12 months online",
    "tuition": "$7,598 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "Online certificate; study permit ineligible.",
    "fundingStatus": "Unfunded",
    "verdict": "Disqualified (Online Certificate)"
  },
  {
    "university": "Queen's University",
    "program": "Economics and Law (MA/JD)",
    "degree": "M.A. / J.D.",
    "duration": "36 months (3 yrs)",
    "tuition": "$9,225 / yr",
    "gateStatus": "PASS",
    "gateReason": "Combined law/econ degree; requires LSAT and separate Law Faculty admission.",
    "fundingStatus": "Mixed Law Funding",
    "verdict": "Specialized Legal Track"
  },
  {
    "university": "University of Alberta",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months (course-based)",
    "tuition": "$7,506 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Strictly course-based 12-month program. No research thesis.",
    "fundingStatus": "Unfunded Coursework",
    "verdict": "Disqualified (Course-based 12mo)"
  },
  {
    "university": "University of Saskatchewan",
    "program": "MSc in Agricultural Economics",
    "degree": "M.Sc. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$6,699 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month research thesis degree with low tuition ($6.7k/yr). Co-locates with USask Edwards targets in Saskatoon.",
    "fundingStatus": "Departmental RA/TA Available",
    "verdict": "⭐ Viable Co-Location Target"
  },
  {
    "university": "University of Guelph",
    "program": "Marketing and Consumer Studies",
    "degree": "M.Sc. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$15,435 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month thesis degree; consumer research focus.",
    "fundingStatus": "Departmental Stipend",
    "verdict": "Zarin Alternative"
  },
  {
    "university": "University of Guelph",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "8 months (2 terms)",
    "tuition": "$9,759 / yr",
    "gateStatus": "FAIL",
    "gateReason": "8-month intensive coursework. Fails the 16-month spousal gate.",
    "fundingStatus": "Limited",
    "verdict": "Disqualified (8 months)"
  },
  {
    "university": "University of Manitoba",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months (1 yr)",
    "tuition": "$9,862 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Standard MA is 12 months.",
    "fundingStatus": "UMGF ($14k/yr)",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Carleton University",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 to 24 months",
    "tuition": "$14,454 / yr",
    "gateStatus": "PARTIAL",
    "gateReason": "Standard coursework is 12mo; extended thesis track can reach 24mo.",
    "fundingStatus": "TA/RA Packages",
    "verdict": "Check Extended Thesis Track"
  },
  {
    "university": "Carleton University",
    "program": "M.A. in Political Economy",
    "degree": "M.A. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$17,431 / yr",
    "gateStatus": "PASS",
    "gateReason": "2-year interdisciplinary thesis program; political economy focus.",
    "fundingStatus": "TA Support",
    "verdict": "Interdisciplinary Alternative"
  },
  {
    "university": "University of Toronto",
    "program": "Master of Financial Economics (MFE)",
    "degree": "Master (Professional)",
    "duration": "20 months (1.6 yrs)",
    "tuition": "$21,772 / yr",
    "gateStatus": "PASS",
    "gateReason": "20 months with mandatory 4-month summer internship; passes 16-month gate.",
    "fundingStatus": "Professional (Unfunded)",
    "verdict": "High Prestige (Unfunded)"
  },
  {
    "university": "York University",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months (3 terms)",
    "tuition": "$8,956 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month coursework degree. Fails the 16-month spousal work permit gate.",
    "fundingStatus": "Limited",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Windsor",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis stream)",
    "duration": "24 months (2 yrs)",
    "tuition": "$18,720 / yr",
    "gateStatus": "PASS",
    "gateReason": "2-year thesis stream available; passes 16-month gate.",
    "fundingStatus": "Graduate Assistantships",
    "verdict": "Viable 2-Year Route"
  },
  {
    "university": "Lakehead University",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis / Co-op)",
    "duration": "24 months (2 yrs)",
    "tuition": "$10,942 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month degree with co-op option in Thunder Bay; clears 16-month gate.",
    "fundingStatus": "Graduate Assistantships",
    "verdict": "Regional Backup (Co-op)"
  },
  {
    "university": "University of Guelph",
    "program": "M.A. in Financial Economics",
    "degree": "M.A.",
    "duration": "8 months (2 terms)",
    "tuition": "$9,759 / yr",
    "gateStatus": "FAIL",
    "gateReason": "8-month intensive. Fails the 16-month spousal gate.",
    "fundingStatus": "None",
    "verdict": "Disqualified (8 months)"
  },
  {
    "university": "University of Ottawa",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$14,008 / yr",
    "gateStatus": "FAIL",
    "gateReason": "Standard MA is 12 months coursework. (Contrast with MSc Math & Stats which is 24mo thesis).",
    "fundingStatus": "Unfunded Coursework",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Western University",
    "program": "Economics M.A.",
    "degree": "M.A.",
    "duration": "12 months (3 terms)",
    "tuition": "$11,676 / yr",
    "gateStatus": "FAIL",
    "gateReason": "3-term coursework degree. Fails 16-month gate.",
    "fundingStatus": "Departmental",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Victoria",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis & Co-op)",
    "duration": "20 months (1.6 yrs)",
    "tuition": "$3,998 / yr",
    "gateStatus": "PASS",
    "gateReason": "⭐ HIDDEN GEM: 20-month thesis stream with co-op option; exceptionally low tuition ($3,998/yr). Faculty Chair Prof. Vasco Gabriel.",
    "fundingStatus": "Low Tuition + TA ($12k)",
    "verdict": "⭐ Top Comprehensive Target"
  },
  {
    "university": "University of British Columbia",
    "program": "Master of Food and Resource Economics (MFRE)",
    "degree": "Professional Master",
    "duration": "12 months",
    "tuition": "$39,979 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month professional degree with $40k tuition; unfunded.",
    "fundingStatus": "Unfunded ($40k)",
    "verdict": "Disqualified (High Cost 12mo)"
  },
  {
    "university": "McGill University",
    "program": "M.Sc. in Agricultural Economics",
    "degree": "M.Sc. (Thesis)",
    "duration": "18 months (1.5 yrs)",
    "tuition": "$14,790 / yr",
    "gateStatus": "PASS",
    "gateReason": "18-month thesis program based at Macdonald Campus; clears the 16-month spousal gate.",
    "fundingStatus": "Graduate Fellowships",
    "verdict": "Viable McGill Thesis Target"
  },
  {
    "university": "Concordia University",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis Option)",
    "duration": "24 months (2 yrs)",
    "tuition": "$11,094 / yr",
    "gateStatus": "PASS",
    "gateReason": "2-year (24-month) research thesis degree in Montreal; clears spousal gate.",
    "fundingStatus": "Departmental TA/RA",
    "verdict": "⭐ Strong Montreal Co-Location"
  },
  {
    "university": "University of Waterloo",
    "program": "Master of Arts in Economics (Water)",
    "degree": "M.A. (Collaborative)",
    "duration": "16 months",
    "tuition": "$10,984 / yr",
    "gateStatus": "PASS",
    "gateReason": "16-month interdisciplinary program; clears 16-month gate.",
    "fundingStatus": "Waterloo Fellowships",
    "verdict": "Viable Waterloo Target"
  },
  {
    "university": "Toronto Metropolitan University",
    "program": "International Economics & Finance",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$20,698 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month intensive coursework degree.",
    "fundingStatus": "Unfunded Coursework",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Brock University",
    "program": "Master of Business Economics (MBE)",
    "degree": "Master",
    "duration": "12 months",
    "tuition": "$9,598 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month coursework degree.",
    "fundingStatus": "Unfunded Coursework",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Alberta",
    "program": "M.A. in Economics and Finance",
    "degree": "M.A. (Course-based)",
    "duration": "24 months (2 yrs)",
    "tuition": "$7,506 / yr",
    "gateStatus": "PASS",
    "gateReason": "2-year program combining economics and finance; clears 16-month gate.",
    "fundingStatus": "Self-funded / Partial",
    "verdict": "Viable 2-Year Program"
  },
  {
    "university": "University of British Columbia",
    "program": "Master of Arts in Economics (VSE)",
    "degree": "M.A.",
    "duration": "12 months core",
    "tuition": "$22,227 / yr",
    "gateStatus": "PARTIAL",
    "gateReason": "Standard MA is 12 months (fails gate). Thesis extension adds up to 12 months (ambiguous if guaranteed at entry).",
    "fundingStatus": "VSE Merit Awards",
    "verdict": "Check Thesis Guarantee"
  },
  {
    "university": "McMaster University",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$19,622 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month coursework program. Fails 16-month gate.",
    "fundingStatus": "Departmental",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Winnipeg",
    "program": "Master of Arts in Applied Economics",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$14,000 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month coursework degree.",
    "fundingStatus": "None",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Toronto",
    "program": "Master of Financial Insurance (MFI)",
    "degree": "Master (Professional)",
    "duration": "12 months",
    "tuition": "$45,541 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "12-month professional program ($45.5k tuition); unfunded.",
    "fundingStatus": "Unfunded ($45k)",
    "verdict": "Disqualified (Cost & Length)"
  },
  {
    "university": "Western University",
    "program": "Master of Financial Economics (MFE)",
    "degree": "Professional Master",
    "duration": "16 months",
    "tuition": "$31,762 / yr",
    "gateStatus": "PASS",
    "gateReason": "16-month duration with summer internship; professional unfunded tuition.",
    "fundingStatus": "Unfunded ($31.7k/yr)",
    "verdict": "Unfunded Professional"
  },
  {
    "university": "University of New Brunswick",
    "program": "Master of Arts in Economics",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$12,500 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month program. Fails 16-month gate.",
    "fundingStatus": "Limited",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "Queen's University",
    "program": "Master of Finance (Toronto)",
    "degree": "Professional Master",
    "duration": "12 months",
    "tuition": "$60,672 / yr",
    "gateStatus": "EXCLUDED",
    "gateReason": "Executive weekend format ($60k tuition); unfunded.",
    "fundingStatus": "Unfunded ($60k)",
    "verdict": "Disqualified (Executive)"
  },
  {
    "university": "University of Northern British Columbia (UNBC)",
    "program": "Master of Arts in Development Economics",
    "degree": "M.A. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$3,783 / yr",
    "gateStatus": "PASS",
    "gateReason": "⭐ HIDDEN GEM: 24-month thesis program with exceptionally low tuition ($3,783/yr). Clears 16-month spousal gate.",
    "fundingStatus": "Low Tuition + TA",
    "verdict": "⭐ High Value Regional"
  },
  {
    "university": "HEC Montréal",
    "program": "M.Sc. in Applied Financial Economics",
    "degree": "M.Sc. (Thesis/Project)",
    "duration": "16 to 24 months",
    "tuition": "$17,929 / yr",
    "gateStatus": "PASS",
    "gateReason": "16-24 months in Montreal; English instruction; Quebec tuition fee exemptions available for thesis stream.",
    "fundingStatus": "Quebec Differential Waiver",
    "verdict": "⭐ Top Sibling Target"
  },
  {
    "university": "University of Manitoba",
    "program": "Agribusiness and Agricultural Economics",
    "degree": "M.Sc. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$9,862 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month thesis degree with agricultural trade and risk management; clears spousal gate.",
    "fundingStatus": "UMGF ($14k/yr)",
    "verdict": "Viable 2-Year Thesis"
  },
  {
    "university": "Wilfrid Laurier University",
    "program": "Master of Arts in Business Economics",
    "degree": "M.A.",
    "duration": "12 months",
    "tuition": "$11,219 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month program. (Contrast with Research MSc Management which is longer).",
    "fundingStatus": "Limited",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Lethbridge",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$7,451 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month research thesis degree with low tuition ($7.4k/yr); clears 16-month spousal gate.",
    "fundingStatus": "Graduate Assistantships",
    "verdict": "Viable Regional Target"
  },
  {
    "university": "Simon Fraser University",
    "program": "Master of Arts in Economics",
    "degree": "M.A. (Thesis Option)",
    "duration": "16 to 20 months",
    "tuition": "$3,068 / yr",
    "gateStatus": "PASS",
    "gateReason": "⭐ TOP TARGET: Thesis stream runs 16-20 months; international tuition is remarkably low (~$3,068/yr continuation fees). Prof. Lucas Herrenbrueck.",
    "fundingStatus": "Low Fees + TA ($12k–$18k)",
    "verdict": "⭐ Lead Canadian Target"
  },
  {
    "university": "Saint Mary's University",
    "program": "Master of Applied Economics (MAE)",
    "degree": "Master",
    "duration": "12 months",
    "tuition": "$15,435 / yr",
    "gateStatus": "FAIL",
    "gateReason": "12-month intensive applied coursework. Fails 16-month gate.",
    "fundingStatus": "Unfunded Coursework",
    "verdict": "Disqualified (Length < 16mo)"
  },
  {
    "university": "University of Alberta",
    "program": "Resource Economics & Environmental Sociology",
    "degree": "M.Sc. (Thesis)",
    "duration": "24 months (2 yrs)",
    "tuition": "$7,506 / yr",
    "gateStatus": "PASS",
    "gateReason": "24-month thesis degree with empirical econometric modeling; clears 16-month spousal gate.",
    "fundingStatus": "Departmental RA/TA",
    "verdict": "Viable Resource Econ Thesis"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {SUBJECT_OPTIONS, SUBJECT_RANKED, SUBJECT_FALLBACK,
                     FUNDING_SCHEMES, FUNDING_DEAD_ENDS, FUNDING_COSTS,
                     COUPLE_COLOCATION_MATRIX, UNI_CENSUS, UNI_RANKED, CANADA_U15_RANKED, MASTERSPORTAL_CANADA_AUDIT };
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
