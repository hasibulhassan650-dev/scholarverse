var module = { exports: {} };
/* ============================================================================
   CANADIAN UNIVERSITY MASTER LIST — ranked and subject-organised
   Built for the 16-MONTH SPOUSAL WORK PERMIT CONSTRAINT (hard).
   Status key:
     PASS         = verified 16+ months AND thesis/research AND funded
     AMBIGUOUS    = checked, but length or funding not determinable from official pages
     EXCLUDED     = checked and FAILS (length / course-based / unfunded / not admitting)
     UNVERIFIED   = not yet investigated
   Tier = reputational standing for FRONT-OFFICE FINANCE / ECON / QUANT recruiting in Canada.
   Tier is a judgement, clearly labelled as such. Length + funding claims carry official wording.
   ============================================================================ */

const UNIVERSITIES = [
  /* ===================== TIER 1 — ELITE ===================== */
  {
    name: "University of Toronto", city: "Toronto", province: "ON", tier: 1,
    why: "Canada's strongest finance/econ brand. Rotman, the Math department and the Economics department all recruit nationally into front-office roles.",
    programmes: [
      { subject: "Quant", programme: "Master of Mathematical Finance (MMF)", dept: "Mathematical Finance Program", length: "12 months", thesis: false, funding: "Unfunded (professional)", mechanism: "None", status: "EXCLUDED", note: "VERBATIM: 'In the 12-month Master of Mathematical Finance (MMF) program...' Fails the 16-month rule and is not thesis-based." },
      { subject: "Math/Stats", programme: "MSc in Mathematics", dept: "Mathematics", length: "12 months", thesis: false, funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "EXCLUDED", note: "VERBATIM: 'MSc Program (12-Month Full-Time and 24-Month Part-Time)'. The 24-month route is PART-TIME and therefore not available to an international student on a study permit." }
    ]
  },
  {
    name: "University of British Columbia", city: "Vancouver", province: "BC", tier: 1,
    why: "Sauder + the Vancouver School of Economics. Strong capital-markets and buy-side pipeline in Vancouver and Toronto.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics — thesis", dept: "Vancouver School of Economics", length: "12 months core", thesis: true, funding: "UNVERIFIED for the thesis route", mechanism: "UNVERIFIED", status: "AMBIGUOUS", note: "⚠️ VERBATIM: 'Thesis option is up to 12 additional months.' AMBIGUOUS — could mean the thesis adds up to 12 months on top, which would exceed 16 total. MUST confirm with VSE before excluding. Bonus: UBC waives the application fee for citizens of the world's 50 least developed countries resident there — Bangladesh qualifies." }
    ]
  },
  {
    name: "McGill University", city: "Montréal", province: "QC", tier: 1,
    why: "Desautels + a strong Economics department. Best English-language brand in Quebec.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "12 months", thesis: true, funding: "—", mechanism: "—", status: "EXCLUDED", note: "Already settled: 12-month length fails the 16-month rule." }
    ]
  },
  {
    name: "University of Waterloo", city: "Waterloo", province: "ON", tier: 1,
    why: "⭐ The strongest QUANT brand in Canada. Mathematics faculty is elite for statistics, actuarial science and quantitative finance. Its MQF places 100% of interns into RBC/TD/CPP/OTPP/Optiver.",
    programmes: [
      { subject: "Math/Stats", programme: "MMath in Applied Mathematics — Thesis", dept: "Applied Mathematics (Math Faculty)", length: "24 months", thesis: true, funding: "GUARANTEED", mechanism: "Department-funded", status: "PASS", note: "⭐ VERBATIM: 'The MMath (thesis) program typically takes two years to complete' and 'Graduate students in the Department of Applied Mathematics enrolled in PhD and Master's (thesis) programs normally receive financial support during the course of their graduate studies, at a level that will cover academic costs and living expenses.' ⚠️ The research-paper stream is part-time only and explicitly unfunded — the THESIS stream is the qualifying route." },
      { subject: "Math/Stats", programme: "MMath in Statistics — Thesis option", dept: "Statistics & Actuarial Science", length: "~16 months (4 terms)", thesis: true, funding: "Funded (TA + supervisor)", mechanism: "Department-funded", status: "PASS", note: "VERBATIM: 'normally funded for one year (3 academic terms). Students that successfully switch to the Thesis stream will be provided one additional term of funding.' 3 terms + 1 thesis term = ~16 months. ⚠️ CRITICAL: all students are ADMITTED to the Research Paper stream; the thesis switch requires 'normally an average of 90% or higher' plus supervisor AND departmental approval. Deadline: priority 15 Dec, FINAL 6 Jan, fall only." },
      { subject: "Quant", programme: "MMath in Actuarial Science — Thesis option", dept: "Statistics & Actuarial Science", length: "~16 months (4 terms)", thesis: true, funding: "Funded (TA + supervisor)", mechanism: "Department-funded", status: "PASS", note: "Identical structure and funding to MMath Statistics. Research areas include Quantitative Finance & Econometrics, Mathematical Finance, Quantitative Risk Management. Same 90%-average caveat." },
      { subject: "Quant", programme: "Master of Quantitative Finance (MQF)", dept: "Statistics & Actuarial Science", length: "16 months", thesis: false, funding: "❌ NONE", mechanism: "None — professional programme", status: "EXCLUDED", note: "🔴 THE TRAP. 16 months (passes length) and the BEST placement data in Canada — 100% intern placement in most years (16/16 in 2024, 18/18 in 2022) into RBC, TD Securities, Scotiabank, CIBC, BMO, CPP Investments, OTPP, CDPQ, OMERS, Optiver; alumni at Bank of Canada, JP Morgan, Morgan Stanley, UBS HK. BUT VERBATIM: 'Part-time students and students in coursework or professional programs, such as the MActSc and MQF, do not receive funding.' Listed as 'Master's, Professional'. Fails the funding constraint." }
    ]
  },
  {
    name: "Queen's University", city: "Kingston", province: "ON", tier: 1,
    why: "Smith School of Business is a national front-office recruiter. Also a solid Math & Stats department.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics and Statistics — Pattern I (Thesis)", dept: "Mathematics and Statistics", length: "16–24 months", thesis: true, funding: "Department-funded; no separate application needed", mechanism: "Department-funded (TA + scholarships + research fellowships)", status: "PASS", note: "⭐ VERBATIM: 'It typically takes 16-24 months to complete.' AND 'There is no separate application to complete in order to be considered for funding... Applicants simply indicate in the appropriate section of the application form that they require financial support. Applications should be submitted by January 15th in order to receive full funding consideration.' AND 'Students assessed fees at the international rate are usually offered additional funding to cover the difference between the international and the domestic tuition fee.' ⚠️ Pattern II (12 months, research project) is EXCLUDED." },
      { subject: "Finance", programme: "MSc Management — Finance (Smith)", dept: "Smith School of Business", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ Admissions office already contacted. Priority list item — verify whether a 16+ month thesis track exists." }
    ]
  },
  {
    name: "Western University (Western Ontario)", city: "London", province: "ON", tier: 1,
    why: "Ivey Business School is a top front-office recruiter; strong Statistical & Actuarial Sciences department.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc in Statistics — thesis option", dept: "Statistical and Actuarial Sciences", length: "AMBIGUOUS", thesis: true, funding: "Published minimums", mechanism: "Mixed (TA + WGRS + research grants)", status: "AMBIGUOUS", note: "⚠️ VERBATIM: 'Students are expected to complete their MSc program in three terms. A second year of Masters' study, with thesis, is available... Normally students will not be admitted directly into this option.' So 16+ months is NOT guaranteed at admission — the thesis is a second year granted during the winter term of year 1 by supervisor + graduate chair. ⚠️ FUNDING WARNING: Western's own table shows a no-TAship Statistics student receives only CAD $5,000 — far below a living income. With TAship, international receives CAD $25,653.12 minimum." },
      { subject: "Finance", programme: "MSc in Financial Modelling / Ivey MSc", dept: "Ivey Business School", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Verify length and thesis availability — most Ivey MSc routes are 12 months and would be EXCLUDED." }
    ]
  },

  /* ===================== TIER 2 — STRONG ===================== */
  {
    name: "HEC Montréal", city: "Montréal", province: "QC", tier: 2,
    why: "⭐⭐ THE STANDOUT FIND. Elite for finance and derivatives in Canada — a partner of the Canadian Derivatives Institute, hosts the Canada Research Chair in Risk Management, and runs a live National Bank Capital Markets trading room. Quebec's 2-year MSc structure is structurally perfect for the 16-month rule.",
    programmes: [
      { subject: "Quant", programme: "MSc Financial Engineering — THESIS stream", dept: "Finance / Mathematics", length: "16–24 months", thesis: true, funding: "NSERC $27,000/yr · FRQNT $20,000 × 2 yrs · Mitacs $15,000 · entrance scholarships $2,000–$10,000", mechanism: "Mixed — competitive entrance scholarships (no application) + external granting agencies + differential tuition exemption for thesis-stream internationals", status: "PASS", note: "⭐⭐ BEST SUBJECT FIT FOUND IN CANADA. VERBATIM: 'This specialization offers either a thesis or a supervised project stream, for a total of 45 credits over a period of 16 to 24 months.' Thesis = 7 courses (21 credits) + a 24-credit thesis. CORE INCLUDES: Fixed Income Securities (FINA 60201) covering 'Construction and smoothing of the yield curve', 'Single- and multi-factor models' and the 'Heath-Jarrow-Morton framework and market models'; Derivative Products (FINA 60206); Stochastic Calculus (MATH 60646); Machine Learning Applied to Financial Data (MATH 60610). ✅ ENGLISH-TAUGHT — English test required, no French. Deadline: 1 FEBRUARY (international). International tuition: thesis stream CAD $34,500 total for 4 terms. ⭐ 'HEC Montréal offers a number of differential tuition fee exemptions to international newly admitted in the thesis stream.' ⚠️ NSERC deadline is 1 DECEMBER and FRQNT early OCTOBER — both BEFORE the admission deadline, so grant applications must be filed first." },
      { subject: "Finance", programme: "MSc Finance — THESIS stream", dept: "Finance", length: "16–24 months", thesis: true, funding: "MSc Entrance Scholarship (thesis stream) · SSHRC $27,000 · FRQSC $20,000 × 2 yrs", mechanism: "Mixed", status: "PASS", note: "VERBATIM: 'either a thesis or a supervised project stream, for a total of 45 credits over a period of 16 to 24 months.' Core: Fixed Income Securities, Time Series Econometrics (MATH 60837 — ARMA/ARIMA/VAR/cointegration), Financial Econometrics (MATH 60231 — GARCH, VaR, Campbell-Shiller), Empirical Finance (MATH 60230 — 'estimation of the yield curve and portfolio optimization'), Risk Management (FINA 60218), Financial Institutions (FINA 60208). ⚠️ SSHRC (not NSERC) applies to this specialisation. Deadline 1 February." },
      { subject: "Econ", programme: "MSc Applied Financial Economics", dept: "Applied Economics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Sibling programme — several MSc Finance courses list it as a prerequisite track. Verify length, thesis and funding." }
    ]
  },
  {
    name: "Concordia University", city: "Montréal", province: "QC", tier: 2,
    why: "John Molson School of Business — a serious research-based finance MSc in Quebec.",
    programmes: [
      { subject: "Finance", programme: "MSc in Finance — thesis", dept: "John Molson School of Business", length: "24 months", thesis: true, funding: "Research funding + Mitacs; amount UNVERIFIED", mechanism: "UNVERIFIED — appears external/competitive rather than a guaranteed stipend", status: "PASS", note: "VERBATIM: 'This Master of Science is a 45-credit applied research program consisting of both course work (seminars) and a thesis. Full-time students take three or four courses per term and complete the program in two years.' ⚠️ ALREADY CONTACTED — GPD Christian Sigouin and Prof. Paul Gomme. Do NOT redraft. Admission is 'very competitive due to the limited number of seats available each year.'" }
    ]
  },
  {
    name: "McMaster University", city: "Hamilton", province: "ON", tier: 2,
    why: "DeGroote School of Business plus a solid Mathematics & Statistics department.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc in Mathematics — Thesis Option", dept: "Mathematics & Statistics", length: "20 months", thesis: true, funding: "⚠️ No admission-attached guarantee found", mechanism: "UNVERIFIED / Mixed — only competitive awards (OGS, OGF) listed", status: "PASS", note: "VERBATIM: 'The duration of this option is normally 20 months.' Confirmed from two official pages ('Length Thesis - 20 months / Project - 12 months'). ⚠️ FUNDING IS THE WEAK POINT — no guaranteed package found, only merit competitions. MUST confirm the base package before committing. Deadline ~1 February." }
    ]
  },
  {
    name: "University of Ottawa", city: "Ottawa", province: "ON", tier: 2,
    why: "Telfer School of Management and a joint OCIMS math/stats institute with Carleton. Strong Bank of Canada and federal-policy proximity.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics and Statistics — Statistics with thesis", dept: "Math & Stats / OCIMS", length: "24 months", thesis: true, funding: "⚠️ NOT guaranteed — supervisor-funded", mechanism: "Supervisor-funded", status: "PASS", note: "VERBATIM: 'with thesis (6 full-time terms; 24 consecutive months)'. ⚠️ CRITICAL SEQUENCING: 'International students must provide proof of financial support: i.e., a stipend provided by a supervisor as well as a combination of awards and/or trust funds' AND 'Identify at least one professor who is willing to supervise your research and thesis... The supervisor's name is required at the time of application.' So a professor must commit BEFORE you can even apply — outreach is mandatory here, not optional." }
    ]
  },
  {
    name: "York University", city: "Toronto", province: "ON", tier: 2,
    why: "Schulich School of Business is a top-tier national recruiter; York's Economics MA is a 1-year coursework degree.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics", dept: "Economics (LAPS)", length: "12 months", thesis: false, funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "EXCLUDED", note: "VERBATIM: 'We offer a one-year, course-work master's degree program.' Fails the 16-month rule AND is course-work based. ⚠️ NOTE: an agent flagged 'York is a strong PASS with a confirmed 2027 deadline' but died before recording which programme — the Economics MA is NOT that programme. A Schulich or Math/Stats thesis route may exist and remains UNVERIFIED." }
    ]
  },
  {
    name: "University of Alberta", city: "Edmonton", province: "AB", tier: 2,
    why: "Alberta School of Business and a strong Economics department.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "—", thesis: false, funding: "—", mechanism: "—", status: "EXCLUDED", note: "Already settled: course-based only — no thesis track." }
    ]
  },
  {
    name: "University of Calgary", city: "Calgary", province: "AB", tier: 2,
    why: "Haskayne School of Business — strong energy-finance and capital-markets links.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics (thesis)", dept: "Economics", length: "—", thesis: true, funding: "—", mechanism: "—", status: "EXCLUDED", note: "Already settled: not admitting." },
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Priority: verify length and whether a funded thesis route reaches 16+ months." }
    ]
  },
  {
    name: "Simon Fraser University", city: "Burnaby", province: "BC", tier: 2,
    why: "Beedie School of Business — strong BC finance recruiting.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Verify length — most BC economics MAs are 12 months and would be EXCLUDED." },
      { subject: "Math/Stats", programme: "MSc Mathematics / Statistics", dept: "Mathematics / Statistics & Actuarial Science", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Priority: SFU actuarial science is well regarded — verify a funded 16+ month thesis route." }
    ]
  },
  {
    name: "Carleton University", city: "Ottawa", province: "ON", tier: 2,
    why: "Sprott School of Business; joint OCIMS math/stats with uOttawa; very strong Bank of Canada and public-policy links.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics and Statistics (OCIMS joint)", dept: "Math & Stats / OCIMS", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Runs jointly with uOttawa, whose thesis route was verified at 24 months with supervisor funding — Carleton's own listing likely mirrors this. Priority to confirm." },
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Verify length." }
    ]
  },
  {
    name: "Dalhousie University", city: "Halifax", province: "NS", tier: 2,
    why: "Rowe School of Business; leading Atlantic Canadian option.",
    programmes: [
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "12 months", thesis: false, funding: "—", mechanism: "—", status: "EXCLUDED", note: "An agent reported 'Dalhousie = 12 months → EXCLUDED' before dying. Marked EXCLUDED but the source page was not captured — TREAT AS PROBABLE, not verified." },
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Dalhousie publishes a master's scholarship list flagging international eligibility — worth checking for a funded 16+ month thesis route." }
    ]
  },
  {
    name: "University of Victoria", city: "Victoria", province: "BC", tier: 2,
    why: "Gustavson School of Business; solid BC option.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },

  /* ===================== TIER 3 — SOLID REGIONAL ===================== */
  {
    name: "Université de Montréal", city: "Montréal", province: "QC", tier: 3,
    why: "Strong research university; its Math & Stats and Economics departments are well regarded. Quebec 2-year structure may help.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathématiques / Statistique", dept: "Mathématiques et statistique", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ An agent noted 'UdeM quotes credits, not months — I need its official duration wording' before dying. Quebec MSc programmes are typically 45 credits over 4 sessions (~16 months) which would PASS — verify. ⚠️ Also verify LANGUAGE: UdeM is largely French-taught at graduate level." }
    ]
  },
  {
    name: "Université Laval", city: "Québec City", province: "QC", tier: 3,
    why: "FSA (Faculté des sciences de l'administration) is a serious French-language business school; strong actuarial tradition.",
    programmes: [
      { subject: "Finance", programme: "MSc Finance (FSA)", dept: "Faculté des sciences de l'administration", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ Verify LANGUAGE — Laval is predominantly French-taught. If French-taught it requires French proficiency and may not be viable." }
    ]
  },
  {
    name: "UQAM", city: "Montréal", province: "QC", tier: 3,
    why: "ESG business school; strong quantitative economics.",
    programmes: [
      { subject: "Econ", programme: "MA / MSc Économique", dept: "Sciences économiques (ESG)", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ Verify language (French) and length." }
    ]
  },
  {
    name: "Université de Sherbrooke", city: "Sherbrooke", province: "QC", tier: 3,
    why: "Strong co-op culture; solid finance programmes.",
    programmes: [
      { subject: "Finance", programme: "MSc Finance", dept: "École de gestion", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ Verify language (French) and length." }
    ]
  },
  {
    name: "Bishop's University", city: "Sherbrooke", province: "QC", tier: 3,
    why: "English-language university in Quebec — removes the French barrier, though research depth is lower.",
    programmes: [
      { subject: "Finance", programme: "MSc Finance / Economics", dept: "Williams School of Business", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "✅ ENGLISH-LANGUAGE Quebec option — worth checking for a 16+ month thesis route." }
    ]
  },
  {
    name: "University of Manitoba", city: "Winnipeg", province: "MB", tier: 3,
    why: "Asper School of Business; the leading Prairie option west of Ontario.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics / Statistics", dept: "Mathematics / Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." },
      { subject: "Economics", programme: "MA in Economics", dept: "Economics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "University of Saskatchewan", city: "Saskatoon", province: "SK", tier: 3,
    why: "Edwards School of Business — a baseline Prairie option.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "University of Guelph", city: "Guelph", province: "ON", tier: 3,
    why: "Solid Math & Stats and Economics departments.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "Wilfrid Laurier University", city: "Waterloo", province: "ON", tier: 3,
    why: "Lazaridis School of Business is strong for finance, and it sits next to Waterloo's math faculty.",
    programmes: [
      { subject: "Finance", programme: "MSc Finance (Lazaridis)", dept: "Lazaridis School of Business & Economics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "University of Windsor", city: "Windsor", province: "ON", tier: 3,
    why: "Odette School of Business; solid regional option.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "Brock University", city: "St. Catharines", province: "ON", tier: 3,
    why: "Goodman School of Business — strong accounting/finance teaching reputation.",
    programmes: [
      { subject: "Finance", programme: "MSc Management (Finance)", dept: "Goodman School of Business", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "Toronto Metropolitan University", city: "Toronto", province: "ON", tier: 3,
    why: "Ted Rogers School of Management — downtown Toronto location helps industry access.",
    programmes: [
      { subject: "Finance", programme: "MSc Management (Finance)", dept: "Ted Rogers School of Management", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "Memorial University of Newfoundland", city: "St. John's", province: "NL", tier: 3,
    why: "Lowest tuition in Canada for international students; a genuine cost advantage.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⭐ Worth checking specifically — Memorial has among the lowest international tuition in Canada, which improves the funding arithmetic even without a full stipend." }
    ]
  },
  {
    name: "University of New Brunswick", city: "Fredericton", province: "NB", tier: 3,
    why: "Solid Atlantic option.",
    programmes: [
      { subject: "Math/Stats", programme: "MSc Mathematics & Statistics", dept: "Mathematics & Statistics", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Not yet investigated." }
    ]
  },
  {
    name: "Université de Moncton", city: "Moncton", province: "NB", tier: 3,
    why: "French-language Atlantic university.",
    programmes: [
      { subject: "Econ", programme: "MA / MSc Économique", dept: "École de gestion", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "⚠️ Verify language (French)." }
    ]
  },

  /* ===================== TIER 4 — REGIONAL / TEACHING-FOCUSED ===================== */
  {
    name: "Ontario Tech University", city: "Oshawa", province: "ON", tier: 4,
    why: "Newer university; limited research-master's depth in finance/quant.",
    programmes: [{ subject: "—", programme: "No verified 16+ month funded thesis route in finance/econ/quant", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority given the tier." }]
  },
  {
    name: "Trent University", city: "Peterborough", province: "ON", tier: 4,
    why: "Teaching-focused; limited graduate research capacity in this field.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Lakehead University", city: "Thunder Bay", province: "ON", tier: 4,
    why: "Regional university.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Laurentian University", city: "Sudbury", province: "ON", tier: 4,
    why: "Regional university; has had financial restructuring.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Nipissing University", city: "North Bay", province: "ON", tier: 4,
    why: "Primarily undergraduate.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "University of Northern British Columbia", city: "Prince George", province: "BC", tier: 4,
    why: "Small research university.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Thompson Rivers University", city: "Kamloops", province: "BC", tier: 4,
    why: "Teaching-focused.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "University of Lethbridge", city: "Lethbridge", province: "AB", tier: 4,
    why: "Small Alberta research university.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "University of Regina", city: "Regina", province: "SK", tier: 4,
    why: "Regional Prairie university.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "University of Winnipeg", city: "Winnipeg", province: "MB", tier: 4,
    why: "Primarily undergraduate.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Acadia University", city: "Wolfville", province: "NS", tier: 4,
    why: "Primarily undergraduate.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Saint Mary's University", city: "Halifax", province: "NS", tier: 4,
    why: "Sobey School of Business; solid regional finance teaching.",
    programmes: [{ subject: "Finance", programme: "MSc Applied Economics / Finance", dept: "Sobey School of Business", length: "UNVERIFIED", thesis: "UNVERIFIED", funding: "UNVERIFIED", mechanism: "UNVERIFIED", status: "UNVERIFIED", note: "Low-to-medium priority." }]
  },
  {
    name: "Mount Allison University", city: "Sackville", province: "NB", tier: 4,
    why: "Primarily undergraduate.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "St. Francis Xavier University", city: "Antigonish", province: "NS", tier: 4,
    why: "Primarily undergraduate.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "Cape Breton University", city: "Sydney", province: "NS", tier: 4,
    why: "Regional.",
    programmes: [{ subject: "—", programme: "Not yet investigated", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Low priority." }]
  },
  {
    name: "ÉTS (École de technologie supérieure)", city: "Montréal", province: "QC", tier: 4,
    why: "Engineering-focused; little finance/econ research.",
    programmes: [{ subject: "—", programme: "Not applicable", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Not a fit." }]
  },
  {
    name: "INRS", city: "Québec", province: "QC", tier: 4,
    why: "Research institute; no finance/econ master's.",
    programmes: [{ subject: "—", programme: "Not applicable", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "UNVERIFIED", note: "Not a fit." }]
  },
  {
    name: "Athabasca University", city: "Athabasca", province: "AB", tier: 4,
    why: "Online/distance university.",
    programmes: [{ subject: "—", programme: "Not applicable", dept: "—", length: "—", thesis: false, funding: "—", mechanism: "—", status: "EXCLUDED", note: "⚠️ Distance/online delivery — would also fail the spousal OWP requirement that the student be physically studying in Canada." }]
  }
];

/* ---- Derived rankings, computed at render time ---- */
const SUBJECT_ORDER = ["Quant", "Finance", "Math/Stats", "Economics", "Econ"];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UNIVERSITIES, SUBJECT_ORDER };
}
