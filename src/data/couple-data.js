var module = { exports: {} };
/* ============================================================================
   SCHOLARVERSE — COUPLE ROADMAP & MIGRATION MATRIX
   Joint strategic synchronization for Hasibul Hasan, CFA & Zarin Tasnim.
   Analysis of dual scholarships, spousal open work permits, financial stacking,
   and long-term permanent residence (PR) corridors across Europe & Canada.
   ============================================================================ */

const COUPLE_COUNTRIES = [
  {
    country: "Sweden",
    flag: "🇸🇪",
    rating: "⭐⭐⭐⭐⭐ (Highest Couple Synergy)",
    title: "The Nordic Double Full-Ride & Dual Career Corridor",
    summary: "Sweden provides the highest immediate couple standard of living: both can win independent full scholarships, or one can study while the other holds an unrestricted spousal work permit.",
    hisRoute: "Stockholm University / Lund University — MSc in Finance or Banking & Finance (SISGP full ride)",
    herRoute: "Lund University / University of Gothenburg — MSc in Logistics & Supply Chain Management (SISGP full ride)",
    visaBasis: "Migrationsverket (Swedish Migration Agency): Spouses of master's students receive concurrent residence permits with FULL, UNRESTRICTED WORK RIGHTS. No job offer required in advance. ZERO Swedish language requirement for spouse.",
    financialStack: "Dual SISGP Award: SEK 12,000 + SEK 12,000 = SEK 24,000/month tax-free couple income (~€2,100/mo) + 100% free tuition for both degrees + SEK 30,000 travel grants. If one studies and one works: SEK 12,000 scholarship + SEK 30,000–38,000/mo corporate salary.",
    prPathway: "Both receive a 12-month post-study job-seeker visa. 4 years of work permit employment leads to Permanent Residence (PR). Citizenship after 5 years.",
    nextAction: "Both submit applications on universityadmissions.se before 15 January 2027, then submit SISGP scholarship applications in February."
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    rating: "⭐⭐⭐⭐⭐ (Fastest PR & Zero-Tuition Foundation)",
    title: "DAAD EPOS + §30 AufenthG Full Employment Authorization",
    summary: "Germany offers guaranteed institutional tuition waivers and a legal family reunification pathway with full, unrestricted employment rights.",
    hisRoute: "University of Göttingen (M.Sc. Dev Econ, DAAD EPOS €992/mo) or University of Hohenheim (M.Sc. AgEcon, DAAD EPOS €992/mo)",
    herRoute: "Hochschule Bremen (MBA International Logistics, EPOS €992/mo) OR joins on Family Reunification Visa with full work authorization",
    visaBasis: "§ 30 Aufenthaltsgesetz (AufenthG): Spousal family reunification grants unrestricted work authorization ('Erwerbstätigkeit gestattet') across all German commercial sectors without Federal Employment Agency labor market priority checks. DAAD adds a €276/month spousal allowance.",
    financialStack: "DAAD EPOS Stipend (€992/mo) + DAAD Spousal Allowance (€276/mo) = €1,268/mo guaranteed base + Zarin's full-time salary in German freight/logistics (€2,800–€3,600 gross/mo) + zero tuition fees.",
    prPathway: "EU Blue Card lower salary threshold (€45,934.20/yr). Permanent Residence in just 21 months with German B1 (or 33 months with A1). German citizenship under the 2024 reform in 3–5 years.",
    nextAction: "Hasibul submits Göttingen EPOS by 15 Nov; Zarin prepares Bremen MBA / spousal dossier."
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    rating: "⭐⭐⭐⭐⭐ (Direct PR Corridor & Logistics Demand)",
    title: "Funded Research Master's + IRCC C42 Spousal Open Work Permit",
    summary: "Canada provides the most direct transition from master's graduation to Permanent Residence (PR) via Express Entry, with direct employer demand for both profiles.",
    hisRoute: "University of Waterloo (MMath Applied Math, guaranteed departmental funding ~$28k–$34k/yr) or Saskatchewan Edwards (MSc Finance, $18k–$22k/yr)",
    herRoute: "Accompanies on an IRCC C42 Spousal Open Work Permit (OWP), clearing the 16-month master's degree gate through Hasibul's program",
    visaBasis: "IRCC C42 Regulation: Spouses of international students in master's programs of 16+ months are legally entitled to an Open Work Permit for the entire duration of the study permit and subsequent 3-year PGWP.",
    financialStack: "Hasibul's research assistantship ($25,000–$32,000 CAD/yr) + Zarin's full-time salary in Canadian freight forwarding (CargoWise/SAP forwarders in Mississauga / Brampton / Vancouver pay $52,000–$65,000 CAD/yr) = $80,000–$95,000 CAD combined annual household income.",
    prPathway: "Graduation yields a 3-year Post-Graduation Work Permit (PGWP). 1 year of Canadian skilled work experience (Hasibul in Treasury/Banking, Zarin in Freight Logistics) generates maximum Comprehensive Ranking System (CRS) points for Express Entry Canadian Experience Class (CEC) PR. Canadian passport after 3 years of PR.",
    nextAction: "Hasibul submits Waterloo (Jan 6) and Edwards (Dec 15); Zarin prepares MGH/Akij CargoWise employment portfolio."
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    rating: "⭐⭐⭐⭐ (Corporate Multinational Gateway)",
    title: "Invest Your Talent in Italy (IYT) Dual Track",
    summary: "Italy's official IYT scheme provides tuition waivers, monthly living stipends, and mandatory corporate internships in Italian multinational enterprises.",
    hisRoute: "University of Bologna / Rome Tor Vergata — MSc in Finance (IYT Scholarship)",
    herRoute: "University of Bologna / University of Padua — MSc in Global Supply Chain / International Management (IYT Scholarship)",
    visaBasis: "Both apply as primary students or one accompanies as dependent. Italian student visa allows 20 hours/week work during semester and full-time during holidays.",
    financialStack: "100% Tuition Exemption + €10,800/yr stipend each = €21,600/year combined couple stipend + mandatory paid 3-month corporate internship in Italian multinationals.",
    prPathway: "12-month post-study search visa (permesso di soggiorno per ricerca lavoro), convertible into standard subordinate work residence permit upon job offer.",
    nextAction: "Apply for pre-admission to Bologna/Padua in Jan–March 2027; submit IYT portal in April."
  },
  {
    country: "Czechia",
    flag: "🇨🇿",
    rating: "⭐⭐⭐⭐ (Prague Co-Location Double)",
    title: "Czech Government Scholarship Dual Submissions",
    summary: "Both Hasibul and Zarin have already submitted applications for Czech Government Scholarships for the 2027/28 academic year in Prague.",
    hisRoute: "Charles University, Prague — Master in Economics and Finance (MEF) (Already submitted)",
    herRoute: "Prague University of Economics and Business (VSE) — Master in Management (Application #79074 already submitted)",
    visaBasis: "Both hold individual student visas with free access to the Czech labor market (no work permit needed for university students).",
    financialStack: "Full tuition paid by Czech Government + monthly living allowance (~CZK 14,000/mo each = ~CZK 28,000/mo couple base) + part-time corporate earnings in Prague's multinational hub.",
    prPathway: "EU long-term residence permit after 5 years in Czechia.",
    nextAction: "Monitor Czech Ministry results announcement in early 2027."
  }
];

const COUPLE_BUDGETS = {
  sweden: {
    income: "SEK 24,000 / mo (Dual SISGP tax-free)",
    housing: "SEK 8,500 – 10,500 / mo (Student couple apartment in Lund/Gothenburg)",
    foodLiving: "SEK 6,500 / mo",
    insurance: "SEK 0 (Included in Kammarkollegiet)",
    netSavings: "SEK 7,000 – 9,000 / mo (~৳80,000–100,000 BDT/month surplus)"
  },
  germany: {
    income: "€1,268 / mo (DAAD EPOS + Spouse allowance) + €2,200 / mo (Zarin net salary)",
    housing: "€750 – 950 / mo (Couple apartment in Göttingen / Bremen)",
    foodLiving: "€600 / mo",
    insurance: "€0 (DAAD covers health insurance)",
    netSavings: "€1,800 – 2,100 / mo (~৳240,000 BDT/month surplus)"
  },
  canada: {
    income: "CAD $2,500 / mo (Hasibul RA/TA) + CAD $3,600 / mo (Zarin net salary)",
    housing: "CAD $1,800 – 2,200 / mo (1-bedroom in Waterloo/Saskatoon)",
    foodLiving: "CAD $1,000 / mo",
    insurance: "CAD $150 / mo (University health plan)",
    netSavings: "CAD $2,800 – 3,200 / mo (~৳250,000 BDT/month surplus)"
  }
};

const COUPLE_DATA = {
  countries: COUPLE_COUNTRIES,
  budgets: COUPLE_BUDGETS
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COUPLE_DATA, COUPLE_COUNTRIES, COUPLE_BUDGETS };
}
