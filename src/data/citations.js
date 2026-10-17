var module = { exports: {} };
/* ============================================================================
   CITATION VERIFICATION LAYER
   Verified 12 October 2026 against publisher / RePEc / SSRN records.
   Method: DuckDuckGo Lite + publisher pages (web_search returned HTTP 401).
   Keyed by professor name so it can be overlaid on the professor registry.

   STATUS VALUES
     VERIFIED          — title, authors, journal and year all confirmed
     VERIFIED_PARTIAL  — paper confirmed to exist, but one detail is imprecise
     NOT_PUBLISHED     — exists but is a working paper / under review
     YEAR_UNCERTAIN    — paper confirmed, publication year disputed between sources
     FOUND_BY_ME       — the source file said no paper existed; I found one
     WRONG_AUTHOR      — the name cited differs from the published author
     PAPER_MISSING     — no paper could be verified
   ============================================================================ */

const CITATIONS = [
  {
    professor: "Pascal François",
    status: "YEAR_UNCERTAIN",
    verified: true,
    citation: "François, P. & Moraux, F., \"The mean-variance (in)efficiency of duration-based immunization\", International Review of Finance",
    doi: "10.1111/irfi.12447",
    findings: [
      "✅ Paper EXISTS — confirmed on Wiley Online Library and SSRN (abstract 4245994)",
      "✅ Authors correct: Pascal François and Franck Moraux",
      "✅ Journal correct: International Review of Finance",
      "⚠️ YEAR DISPUTED — the draft says 2024; ResearchGate records 1 Jan 2022 and the SSRN version is 2022. This looks like an early-view vs issue-date difference.",
      "🔎 ACTION: open the Wiley page and read the issue year. Use the year the publisher prints."
    ],
    abstractNote: "Provides a mean-variance framework explaining the puzzle that more sophisticated strategies do not outperform Macaulay-duration immunization; characterises efficient allocations in a barbell trading reinvestment risk against discounting risk.",
    verdict: "SAFE TO SEND after confirming the year"
  },
  {
    professor: "James McNeil",
    status: "VERIFIED",
    verified: true,
    citation: "Coulombe, R. G. & McNeil, J. (2025), \"The term structure of interest rates in a noisy information model\", Journal of International Money and Finance, 159(C)",
    findings: [
      "✅ FULLY VERIFIED — RePEc record: ideas.repec.org/a/eee/jimfin/v159y2025ics0261560625001780.html",
      "✅ Author order correct: Coulombe first, McNeil SECOND",
      "✅ His email mcneilj@dal.ca is confirmed — it appears in the RePEc author metadata",
      "✅ Keywords confirmed: term premium; yield curve; information frictions; Bayesian estimation",
      "✅ Free preprint exists: wp.economics.dal.ca/RePEc/dal/wpaper/DalEconWP2025-01.pdf"
    ],
    abstractNote: "A noisy-information endowment economy with CRRA preferences: prices and consumption have temporary and permanent components but the household observes only the aggregate. On average the term spread is positive and on a scale close to the data.",
    verdict: "✅ SEND — the best-verified email in the set"
  },
  {
    professor: "Lucas Herrenbrueck",
    status: "VERIFIED",
    verified: true,
    citation: "Geromichalos, A., Herrenbrueck, L. & Lee, S. (2023), \"Asset Safety versus Asset Liquidity\", Journal of Political Economy, 131(5), 1172-1212",
    doi: "10.1086/722225",
    findings: [
      "✅ FULLY VERIFIED — RePEc and EconPapers confirm vol. 131, issue 5, pages 1172-1212 (2023)",
      "✅ Author order exactly as cited",
      "🏆 THE MOST PRESTIGIOUS PAPER IN THE SET — Journal of Political Economy is a top-5 economics journal",
      "ℹ️ An earlier 2018 UC Davis working-paper version exists — cite the 2023 JPE version"
    ],
    abstractNote: "Many economists assume safer assets are more liquid and some treat 'safe' and 'liquid' as synonyms. But they are not synonyms, and conflating them leads to confusion and wrong policy recommendations. Builds a multi-asset model where safety and liquidity are distinct.",
    verdict: "✅ SEND — fully verified"
  },
  {
    professor: "Isha Agarwal",
    status: "NOT_PUBLISHED",
    verified: true,
    citation: "Agarwal, I., Jaume, D., Tellez, E. & Tobal, M., \"Differential Crowding out Effects of Government Bonds and Loans: Evidence from an Emerging Market Economy\"",
    findings: [
      "✅ Paper EXISTS — confirmed on UBC Sauder's own faculty page AND on her CV (agarwalisha.com), both 2026 versions",
      "✅ Author order correct: Agarwal, Jaume, Tellez, Tobal",
      "⚠️ STATUS: 'conditionally accepted' at Review of Finance (Sauder page) / 'R&R, Review of Finance' (her CV). IT IS NOT YET PUBLISHED.",
      "✅ GOOD NEWS: the draft email never names the journal, so it remains accurate as written",
      "ℹ️ Optional upgrade: say 'currently under review at the Review of Finance' — it signals diligence"
    ],
    abstractNote: "Compares how government borrowing from banks versus from the bond market crowds out private lending differently, in an emerging-market setting.",
    verdict: "✅ SEND — verify her email address first"
  },
  {
    professor: "Abdullah Mamun",
    status: "NOT_PUBLISHED",
    verified: true,
    citation: "Jareski Tuma, T., Mamun, A. & Shao, E. (2025, rev. 28 Jan 2026), \"Deposit Insurance Reforms and Bank Risk-Taking: An International Perspective on Discipline and Moral Hazard\", SSRN Working Paper 5243565",
    findings: [
      "✅ Paper EXISTS — SSRN abstracts 6482434 and 5243565",
      "⚠️ AUTHOR ORDER IS INCONSISTENT ACROSS LISTINGS: SSRN 6482434 shows Mamun-Shao-Jareski Tuma; SSRN 5243565 and Shao's own CV show Jareski Tuma first",
      "⚠️ YEAR: posted 7 May 2025, last revised 28 Jan 2026 — a 2025 working paper revised in 2026, not simply '2026'",
      "⚠️ STATUS: UNDER REVIEW, not published (per Shao's CV)",
      "✅ THE DRAFT IS SAFE: it says 'your recent working papers', which is accurate",
      "📊 Discussant slides (CEA 2025) cite sample 2005-2019, bank-level data, risk proxied by loan-loss reserves ratio"
    ],
    abstractNote: "Finds a policy trilemma: expanding deposit-insurance coverage stabilises funding in normal times but weakens depositor discipline and heightens the sensitivity of bank risk-taking to the business and financial cycle.",
    verdict: "✅ SEND — 'working papers' wording is accurate"
  },
  {
    professor: "Enchuan Shao",
    status: "VERIFIED_PARTIAL",
    verified: true,
    citation: "Shao, E. & Bediako, K. (2020), \"The Impact of Return on Collateral in a Channel System\", Economic Inquiry, 58(3), 1314-1341",
    doi: "10.1111/ecin.12863",
    findings: [
      "✅ FULLY VERIFIED on the citation itself — DOI, volume, issue, pages, month all confirmed",
      "✅ Author order correct: Shao first, Bediako second",
      "⚠️ IT IS 2020, NOT 2022+ — the paper is six years old, outside the 'recent paper' window most guides recommend",
      "ℹ️ A NEWER paper of his exists: 'Miner Competition and Transaction Fees' with Rajapaksa, Journal of Economic Behavior and Organization, vol. 227, November 2024",
      "⚠️ But the newer paper is about MINING COMPETITION, not collateral — off-topic",
      "🎯 RECOMMENDATION: keep the 2020 paper. Its abstract matches the corridor question almost line for line; relevance beats recency."
    ],
    abstractNote: "Empirically investigates the relationship between the return on collateral and monetary policy implementation in the channel system: the return on government assets, measuring the opportunity cost of holding collateral, should have negative impacts on the interest-rate spread and the interbank market rate.",
    verdict: "✅ SEND — correct, though old"
  },
  {
    professor: "Vasco Gabriel",
    status: "VERIFIED",
    verified: true,
    citation: "Mirfatah, M., Gabriel, V. J. & Levine, P. (2025), \"LAMP, informality and monetary growth rules in an emerging economy\", Economic Modelling, 143, article 106946",
    findings: [
      "✅ FULLY VERIFIED — ScienceDirect S0264999324003031, published February 2025",
      "✅ Author order correct: Mirfatah first, Gabriel SECOND, Levine third",
      "⚠️ BUT he is claimed to be ON LEAVE UNTIL JUNE 2027 — if true, he may not supervise a Fall 2027 start. UNVERIFIED."
    ],
    abstractNote: "Develops a small open economy model interacting with a rest-of-the-world bloc, containing relevant emerging-economy features including an informal sector.",
    verdict: "⚠️ DEPRIORITISE — leave until June 2027 unverified"
  },
  {
    professor: "Apostolos Serletis",
    status: "VERIFIED_PARTIAL",
    verified: true,
    citation: "Isakin, M. & Serletis, A. (2026), \"Divisia monetary aggregates with unobserved assets\", Macroeconomic Dynamics, 30, e33",
    findings: [
      "✅ FULLY VERIFIED — Cambridge Core, published 28 May 2026, vol. 30, article e33",
      "✅ Author order correct: Isakin first, Serletis second",
      "✅ His email serletis@ucalgary.ca is confirmed IN THE ARTICLE ITSELF (corresponding-author line)",
      "✅ SSRN version: abstract 4579531",
      "🔴 BUT THE PROGRAMME IS CLOSED — see the programme verdict. The paper is real; the application premise is not."
    ],
    abstractNote: "Assumes some monetary assets are unobserved and that demand for them affects demand for observed assets; augments Divisia monetary aggregates with unobserved assets using a normalized quadratic flexible functional form.",
    verdict: "🔴 DO NOT SEND — Calgary's Economics thesis MA is not admitting"
  },
  {
    professor: "Sonja Chen",
    status: "WRONG_AUTHOR",
    verified: true,
    citation: "Chen, Y. & Serletis, A. (2024), \"Monetary Policy Strategies in Advanced and Emerging Economies\", Open Economies Review, 36(1), 1-23",
    doi: "10.1007/s11079-024-09751-y",
    findings: [
      "✅ Paper EXISTS — Springer, published 13 February 2024, vol. 36(1), pp. 1-23",
      "🔴 THE FIRST AUTHOR IS 'Yu Chen', NOT 'Sonja Chen' — Springer and RePEc both list 'Yu Chen & Apostolos Serletis'",
      "⚠️ I COULD NOT CONFIRM whether 'Yu Chen' is the person at yusonja.chen@ucalgary.ca. UNVERIFIED.",
      "🔴 AND Calgary's Economics thesis MA is CLOSED — the email premise fails regardless"
    ],
    abstractNote: "Investigates the time-series properties of the price level in advanced and emerging economies, motivated by whether central banks should accommodate past inflation shocks (inflation targeting) or reverse them (price-level targeting), using G7 and E7 data.",
    verdict: "🔴 DO NOT SEND — wrong first name AND programme closed"
  },
  {
    professor: "Madhu Kalimipalli",
    status: "FOUND_BY_ME",
    verified: true,
    citation: "Han, S., Huang, A. G., Kalimipalli, M. & Wang, K. (2022), \"Information and liquidity of over-the-counter securities: Evidence from public registration of Rule 144A bonds\", Journal of Financial Markets, 59(PB)",
    findings: [
      "🆕 THE SOURCE FILE SAID: 'I could not verify a specific title.' I FOUND ONE.",
      "✅ VERIFIED — RePEc: ideas.repec.org/a/eee/finmar/v59y2022ipbs1386418121000379.html · ScienceDirect S1386418121000379",
      "✅ Published June 2022, Journal of Financial Markets, vol. 59, Part B",
      "⚠️ He is THIRD of four authors — weaker than first or second, but acceptable where the topic matches directly",
      "✅ His Google Scholar: scholar.google.com/citations?user=sxca2MIAAAAJ",
      "✅ Verified email domain: wlu.ca",
      "⚠️ HIS ROLE: he was 'Director of PhD and Research-based Master's Programs in Management during 2016-2023' — that role ENDED in 2023. Whether he still supervises for Fall 2027 is UNVERIFIED.",
      "⚠️ Laurier's MSc length and funding remain UNPUBLISHED"
    ],
    abstractNote: "Examines how improved firm-level disclosure through public registration affects market liquidity in the corporate bond market, focusing on OTC private (Rule 144A) bonds.",
    verdict: "⚠️ SEND ONLY after confirming his current supervisory role and Laurier's programme details"
  },
  {
    professor: "George Tannous",
    status: "PAPER_MISSING",
    verified: false,
    citation: "Claimed recent paper with him as THIRD of three authors — title NOT verified",
    findings: [
      "🔴 NO PAPER COULD BE VERIFIED for him",
      "⚠️ He is claimed to teach the programme's Fixed Income Securities course — also unverified",
      "ℹ️ The draft deliberately leads with his TEACHING and field instead of a paper, which sidesteps the gap",
      "ℹ️ Edwards funding is claimed to be automatic with admission, so this email buys supervisor fit, not money"
    ],
    abstractNote: "—",
    verdict: "⚠️ OPTIONAL — only if Mamun never replies"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CITATIONS };
}
