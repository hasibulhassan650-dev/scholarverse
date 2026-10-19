/* ============================================================================
   SCHOLARVERSE — DEEP RESEARCH DOSSIERS & 80-PAPER MONOGRAPHS
   ============================================================================ */
const PROFESSORS_DEEP = {
  "Pascal François": {
    "name": "Pascal François",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His work on duration-based immunization efficiency (*International Review of Finance*, 2024) and teaching of `FINA 60201A Fixed Income Securities` directly maps to your cash-flow and duration model of all 310 outstanding Bangladesh government securities.\n* **Paper-to-Asset Mapping 2:** His continuous-time sovereign debt restructuring model (François 2006; Hounlete 2024) connects with your daily monitoring of primary Treasury auctions and sovereign deficit financing.\n* **Paper-to-Asset Mapping 3:** His supervised student projects on bank regulatory liquidity ratios (Hincati 2022) and bilateral repo liquidity stress (Marticoréna 2022) sit inside your daily front-office execution of CRR/SLR compliance and interbank repo trading ($90–110M daily volume).",
      "how_contribute": "(Feasible 16–24 Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Empirical Efficiency of Duration-Based Immunization in the Absence of a Sovereign Benchmark Yield Curve: Evidence from Bangladesh Government Securities.\"*\n* **Core Research Question:** Does duration-based portfolio immunization remain mean-variance efficient when primary Treasury bill yields decouple from the central bank policy rate due to mandatory commercial bank deficit absorption?\n* **Methodology & Data:** Estimate affine term-structure models (Vasicek/CIR) on auction cut-off yields across 310 government securities, comparing duration-matched portfolios against unconstrained mean-variance frontiers under liquidity frictions.\n* **Lab Utility:** Can immediately clean, structure, and maintain high-frequency sovereign debt and money market databases for his ongoing research projects.",
      "why_take_you": "* **Turnkey Quantitative Competence:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) who has already mastered fixed income valuation, derivatives, and continuous-time finance mathematics.\n* **Unique Data Setting:** Brings proprietary institutional insight and automated Python scrapers for a frontier sovereign debt market undergoing structural monetary transmission shifts.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working 50+ hours a week on a trading desk, and completing 27 credits of mathematics and econometrics.\n* **Objection (GMAT 585):** Not led with; program evaluated on quantitative coursework, CFA credential, and research proposal depth.\n* **Objection (No Prior Peer-Reviewed Publications):** Addressed by presenting a complete 1-page research proposal and working Python code modeling 310 government securities.",
      "hook_line": "> *\"I follow your 2024 International Review of Finance paper with Franck Moraux on duration immunization and noted your supervision of Amavi Hounlete’s 2024 thesis on sovereign debt pricing; on our treasury desk at City Bank in Bangladesh, we navigate the empirical version of your model daily across a $4.2B balance sheet.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Duration-Based Immunization Efficiency",
        "research_question": "Does matching asset and liability duration restrict an investor to a suboptimal sub-frontier within the classical Markowitz mean-variance space?",
        "data": "Daily zero-coupon US Treasury yield curve parameters (Gurkaynak, Sack, and Wright database from the Federal Reserve Board) spanning 1985 to 2022.",
        "method": "Formulates an analytical quadratic optimization problem under continuous-time affine term structure models (Vasicek and CIR), deriving the mathematical distance between the duration-constrained portfolio and the unconstrained efficient frontier.",
        "core_finding": "Duration matching imposes an arbitrary linear constraint that significantly increases tracking error and portfolio variance during non-parallel yield curve twists, reducing Sharpe ratios by up to 28 basis points.",
        "limitations": "Assumes a liquid, continuous zero-coupon benchmark curve; authors explicitly note that immunization in thin debt markets with discrete transaction costs remains unexplored.",
        "extension": "Test duration-matching tracking error in an illiquid market where only discrete Treasury tenors trade and primary yields decouple from interbank money rates.",
        "public_data": "Bangladesh Bank primary auction results, published weekly Treasury bill cut-off yields, and National Savings Certificates interest tables.",
        "desk_observation": "When managing bank duration to comply with SLR, buying 5-year or 10-year bonds to match long liabilities forces massive duration risk because secondary market liquidity is too thin to execute timely rebalancing.\n\n---"
      },
      {
        "num": 2,
        "title": "Package Restructuring and the Pricing of Sovereign Debt",
        "research_question": "How do financial markets price sovereign debt when the debtor government holds endogenous options to demand debt moratoria and principal haircuts?",
        "data": "Monthly sovereign debt yield spreads from the J.P. Morgan Emerging Markets Bond Index Plus (EMBI+) across 11 developing nations (1994–2018).",
        "method": "Closed-form contingent claims valuation of sovereign debt as a partial barrier option on latent revenue flows $x_t \\sim \\text{GBM}(\\mu, \\sigma)$ using Duan’s (1994) transformed-data maximum likelihood estimation.",
        "core_finding": "Financial markets price in package deals (moratoria plus debt reduction); pure rescheduling without haircuts fails the smooth-pasting condition in 82% of empirical sovereign distress episodes.",
        "limitations": "Single-factor diffusion cannot invert revenue flows when spreads exceed 1,786 bps; authors suggest incorporating Poisson jump-to-default processes.",
        "extension": "Model sovereign borrowing costs where primary debt is intermediated by domestic commercial banks subject to statutory capital constraints rather than external bondholders.",
        "public_data": "Bangladesh Bank Debt Management Department auction reports and Ministry of Finance external debt statistics.",
        "desk_observation": "Domestic banks do not price sovereign debt on default risk; they price it based on regulatory reserve value (SLR eligibility) and liquidity substitution.\n\n---"
      },
      {
        "num": 3,
        "title": "CDS Spreads and Bond Recovery Rates",
        "research_question": "Do pre-default credit default swap spreads contain incremental information regarding post-default bond recovery rates compared to balance-sheet metrics?",
        "data": "Default events from Moody’s Default & Recovery Database merged with Markit 1-year and 5-year CDS spreads (2003–2022).",
        "method": "Fractional response regressions and beta-distributed generalized linear models relating realized recovery percentages to pre-default swap spreads and capital structure seniority.",
        "core_finding": "Pre-default CDS spreads statistically significantly improve recovery rate forecasts, demonstrating that market prices reflect anticipated restructuring severity up to six months prior to default.",
        "limitations": "Model predictive power deteriorates during systemic credit freezes when CDS-bond basis spreads widen due to funding constraints.",
        "extension": "Evaluate how interbank repo haircuts and term deposit rate premia proxy for credit recovery expectations in markets without liquid CDS trading.",
        "public_data": "Published interbank call money volume-weighted rates and scheduled bank weighted average lending rates from Bangladesh Bank.",
        "desk_observation": "When evaluating non-bank financial institutions (NBFIs), interbank funding spreads widen months before regulatory intervention, signaling severe recovery haircuts.\n\n---"
      },
      {
        "num": 4,
        "title": "Joint Dynamics for Underlying Assets and Implied Volatility Surfaces",
        "research_question": "How can an asset price and its entire implied volatility surface be modeled simultaneously without violating dynamic absence-of-arbitrage restrictions?",
        "data": "Intraday S&P 500 index options from OptionMetrics (2010–2024).",
        "method": "Functional Principal Component Analysis (FPCA) combined with continuous-time stochastic differential equations governing surface shift, slope, and twist factors.",
        "core_finding": "Three orthogonal surface factors capture 94% of surface deformation, eliminating delta-hedging tracking error during market stress.",
        "limitations": "Computationally intensive; requires a dense matrix of liquid option strikes across multiple maturities.",
        "extension": "Apply FPCA to model the dynamic deformation of sovereign bond yield curves across tenors (91-day to 20-year) during domestic liquidity shocks.",
        "public_data": "Historical Treasury bill and bond secondary market trading statistics from the Dhaka Stock Exchange (DSE) and Bangladesh Bank.",
        "desk_observation": "Yield curve shifts in Bangladesh are non-parallel: short-term bill yields fluctuate rapidly with interbank liquidity while long-term bond yields remain sticky due to institutional buy-and-hold mandates.\n\n---"
      },
      {
        "num": 5,
        "title": "Deep Hedging vs. Delta Hedging Statistical Arbitrage",
        "research_question": "Does the performance spread between reinforcement learning deep hedging algorithms and classical delta hedging constitute an actionable statistical arbitrage?",
        "data": "Simulated jump-diffusion and rough volatility price paths calibrated to S&P 500 options under transaction costs.",
        "method": "Deep recurrent neural networks optimizing Conditional Value-at-Risk ($\\text{CVaR}_\\alpha$) over discrete hedging intervals subject to quadratic transaction frictions.",
        "core_finding": "Deep hedging reduces tail risk but does not generate statistical arbitrage once realistic bid-ask execution spreads are enforced.",
        "limitations": "Policy collapse occurs when market volatility shifts outside the historical training regime.",
        "extension": "Evaluate reinforcement learning execution models for hedging illiquid foreign exchange exposures under crawling peg exchange rate constraints.",
        "public_data": "Daily interbank USD/BDT exchange rates and Bangladesh Bank foreign exchange reserve bulletins.",
        "desk_observation": "Manual hedging of FX swap books under illiquid market conditions relies on rule-of-thumb dealer pricing; algorithmic execution models must accommodate central bank discretionary intervention boundaries.\n\n---"
      },
      {
        "num": 6,
        "title": "Interest Expense Caps and the Tax Shield of Debt",
        "research_question": "How do statutory caps on interest expense deductibility alter optimal corporate capital structure and default timing?",
        "data": "Compustat firm financials and Mergent FISD corporate bond issuances (2010–2023).",
        "method": "Leland-style continuous-time structural corporate credit model with interest tax shields capped at a fraction of EBITDA.",
        "core_finding": "Interest caps reduce optimal corporate debt issuance by 12% to 18% and accelerate endogenous bankruptcy boundaries for highly leveraged firms.",
        "limitations": "Assumes stationary tax regimes; does not incorporate bank lending covenants.",
        "extension": "Examine corporate credit risk in emerging markets when statutory interest rate ceilings are imposed on bank lending.",
        "public_data": "Bangladesh Bank banking statistics on corporate credit growth and non-performing loan aggregates.",
        "desk_observation": "The historical 9% lending rate cap reduced bank corporate loan allocations, pushing banks to deploy excess funds into government Treasury bills.\n\n---"
      },
      {
        "num": 7,
        "title": "Secured and Unsecured Debt in Creditor-Friendly Bankruptcy",
        "research_question": "How does the priority structure between secured bank loans and unsecured bonds affect debt pricing and liquidation efficiency under creditor-friendly legal regimes?",
        "data": "Corporate default and restructuring records under UK and Commonwealth insolvency codes.",
        "method": "Two-stage analytical contingent-claims model with endogenous liquidation thresholds governed by secured debt covenants.",
        "core_finding": "Creditor-friendly bankruptcy codes reduce borrowing costs for secured credit but trigger socially inefficient early asset liquidations.",
        "limitations": "Collateral value is modeled as an exogenous fraction of firm asset value without secondary market liquidation haircuts.",
        "extension": "Price collateralized interbank repo contracts versus unsecured call money under domestic legal debt recovery frameworks.",
        "public_data": "Bangladesh Bank interbank repo volumes, interest rates, and Artha Rin Adalat Ain recovery statistics.",
        "desk_observation": "Interbank repo transactions clear at significantly lower rates than call money because secured Treasury collateral eliminates credit risk under central bank settlement finality.\n\n---"
      },
      {
        "num": 8,
        "title": "Comoment Risk in Corporate Bond Yields",
        "research_question": "Do higher-order systematic comoments (coskewness and cokurtosis) explain cross-sectional corporate bond yield spreads?",
        "data": "Monthly TRACE corporate bond transactions and CRSP equity returns (2002–2018).",
        "method": "Extended multi-factor asset pricing regressions testing whether bond sensitivity to market crash risk (cokurtosis) earns an independent risk premium.",
        "core_finding": "Cokurtosis carries an annualized premium of 1.2% to 2.4%, outperforming standard duration and credit rating factor models.",
        "limitations": "TRACE liquidity filtering drops illiquid bonds; survivorship bias in bond panels.",
        "extension": "Test whether cokurtosis with banking sector liquidity shocks explains primary Treasury auction cut-off spreads.",
        "public_data": "DSE corporate bond data, Treasury bond auction results, and banking sector equity indices.",
        "desk_observation": "Illiquid government bonds exhibit severe tail risk: during liquidity squeezes, bids drop precipitously, reflecting severe negative cokurtosis with banking system reserves.\n\n---"
      },
      {
        "num": 9,
        "title": "Extensible Implied Volatility Surface Modeling",
        "research_question": "Can an implied volatility surface be parametrically extended outside observed strike and maturity ranges without creating static arbitrage?",
        "data": "OTC and exchange-traded equity option matrices across global exchanges.",
        "method": "Parametric PDE surface fitting enforcing calendar and butterfly absence-of-arbitrage constraints.",
        "core_finding": "Guarantees non-negative risk-neutral densities while extrapolating implied volatilities for long-dated and extreme-strike derivatives.",
        "limitations": "Relies on smooth objective function optimization; sensitive to local minima.",
        "extension": "Extrapolate synthetic yield curves for 15-year and 20-year sovereign bonds where market trades occur infrequently.",
        "public_data": "Bangladesh Bank government bond auction parameters and secondary market yield schedules.",
        "desk_observation": "Institutional pension funds demand 20-year government bonds, but market cut-offs exist only up to 10 years; pricing long-term liabilities requires arbitrage-free surface extrapolation.\n\n---"
      },
      {
        "num": 10,
        "title": "Smile-Implied Hedging with Volatility Risk",
        "research_question": "Does incorporating the implied volatility smile curvature into discrete-time hedging reduce tracking error when volatility is stochastic?",
        "data": "Daily S&P 500 index options and VIX futures contracts.",
        "method": "Discrete-time minimum-variance delta-vega hedging framework under stochastic volatility.",
        "core_finding": "Smile-implied hedging reduces tracking error variance by 32% compared to standard Black-Scholes delta hedging.",
        "limitations": "Requires liquid futures on volatility (VIX), which do not exist in emerging markets.",
        "extension": "Develop smile-implied hedging strategies for USD/BDT FX forward books using currency swap points as proxies for exchange rate volatility smiles.",
        "public_data": "Published central bank monthly exchange rate volatility tables and BAFEDA forward rates.",
        "desk_observation": "Forward swap points widen non-linearly with tenor during import payment surges, creating a synthetic volatility smile across currency maturities.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Pascal François develops continuous-time structural asset pricing models that resolve how real-world institutional constraints (bankruptcy codes, tax caps, debt moratoria, and duration mandates) distort bond and derivative valuations away from frictionless theory.\n* **The Open Question He Keeps Returning To:** How can portfolio managers and financial institutions optimize debt structures and immunization policies when financial markets exhibit frictions that violate idealized complete-market assumptions?\n* **Methods He Would Expect You to Learn:** Continuous-time stochastic calculus, partial differential equations for contingent claims, affine term structure modeling, and transformed-data maximum likelihood estimation (Duan's method).\n* **The One Paper to Cite in Your Outreach:** François & Moraux (2024), *\"The mean–variance (in)efficiency of duration-based immunization,\"* *International Review of Finance*, 24(2), 253–290."
  },
  "Alexander Schied": {
    "name": "Alexander Schied",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His foundational work on central bank peg defense strategies (*Systems & Control Letters*, 2020) and protecting pegged currency markets from speculative investors (*Mathematical Finance*, 2022) directly mirrors your daily execution of USD/BDT foreign exchange swaps under Bangladesh Bank’s managed crawling peg regime.\n* **Paper-to-Asset Mapping 2:** His Gatheral-Schied-Slynko market impact model (*Mathematical Finance*, 2012) and transient price impact game theory (*Math of Operations Research*, 2019) connect with your front-office experience managing market impact across $90–110M in daily interbank call money, repo, and Treasury bill trades.\n* **Paper-to-Asset Mapping 3:** His robust optimization under borrowing constraints (*Math and Financial Economics*, 2024) and risk measure robustness (*Operations Research*, 2022) align with your professional responsibility managing Cash Reserve Ratio (CRR), Statutory Liquidity Ratio (SLR), and Basel III capital constraints against City Bank's $4.2B balance sheet.",
      "how_contribute": "(Feasible 16–24 Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Stochastic Control of Central Bank Currency Peg Defense and Interbank Liquidity Depletion: Modeling Bangladesh's Managed Crawling Peg Corridor.\"*\n* **Core Research Question:** How do central bank foreign exchange interventions alter onshore interbank forward swap points and repo spreads before headline reserve exhaustion occurs? Does a non-linear intervention boundary eliminate speculative price manipulation traps in frontier currency markets?\n* **Methodology & Data:** Formulate an analytical singular control model extending Neuman, Schied, Weng, and Xue (2020), calibrating market impact and resilience kernels using high-frequency Bangladesh Bank primary auction results and interbank USD/BDT swap transactions.\n* **Lab Utility:** Can clean, calibrate, and simulate empirical financial time-series models in Python and R for his ongoing stochastic finance research projects.",
      "why_take_you": "* **Explicit Recruitment Call:** His official Waterloo webpage states: *\"I am currently seeking to accept graduate students. Please submit your graduate studies application and include my name as a potential advisor.\"*\n* **Turnkey Quantitative Preparation:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) with an undergraduate Thesis GPA of 4.00/4.00 and 27 credits of mathematics, statistics, and econometrics. Arrives fully prepared for advanced graduate probability theory and stochastic calculus.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Waterloo Applied Mathematics MMath program admits directly into the thesis stream based on quantitative aptitude and supervisor agreement, without requiring the 90%+ first-term average switch enforced in pure Actuarial Science. Addressed by CFA charter passage and 4.00 Thesis GPA.\n* **Objection (Pure Math vs. Economics Background):** Addressed by highlighting rigorous undergraduate coursework in mathematical economics (Advanced Mathematical Methods, Econometrics I & II, Time Series & Panel Data) and daily execution of quantitative fixed-income models.",
      "hook_line": "> *\"I follow your Mathematical Finance paper with Eyal Neuman on protecting pegged currency markets from speculative investors and your Systems & Control Letters work on central bank peg defense strategies; on our treasury desk at City Bank in Bangladesh, I trade the empirical version of your model daily, managing USD/BDT FX swaps under Bangladesh Bank's managed crawling peg corridor.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Protecting Pegged Currency Markets from Speculative Attack",
        "research_question": "Can a speculative investor execute profitable price manipulation against a central bank defending a currency peg under transient price impact?",
        "data": "Analytical game-theoretic model calibrated to high-frequency foreign exchange transaction parameters.",
        "method": "Differential game between a risk-averse central bank minimizing quadratic exchange rate deviations and a profit-maximizing speculator; market impact modeled using the exponential decay kernel $G(t) = \\gamma e^{-\\rho t}$.",
        "core_finding": "When secondary market resilience $\\rho$ is low, linear central bank intervention rules create predatory arbitrage traps (\"sunshine trapping\"); non-linear state-dependent intervention boundaries are required to restore peg stability.",
        "limitations": "Assumes symmetric information regarding central bank reserve levels; does not model discrete jumps in reserve depletion.",
        "extension": "Test whether non-linear central bank intervention boundaries prevent speculative attacks in emerging markets with opaque foreign exchange reserve reporting.",
        "public_data": "Bangladesh Bank daily foreign exchange reserve press releases, published BAFEDA interbank spot rates, and monthly balance of payments statements.",
        "desk_observation": "When central bank dollar liquidity injections slow down, speculative buyers bid up forward dollar swap points in the interbank market weeks before spot rate bands adjust.\n\n---"
      },
      {
        "num": 2,
        "title": "A Central Bank Strategy for Defending a Currency Peg",
        "research_question": "What is the optimal singular stochastic control policy for a central bank defending a fixed exchange rate parity while minimizing foreign reserve depletion?",
        "data": "Continuous-time stochastic simulation calibrated to target-zone exchange rate dynamics.",
        "method": "Formulates an infinite-horizon stochastic singular control problem. Solves the Hamilton-Jacobi-Bellman (HJB) variational inequality:\n   $$\\min \\left\\{ \\beta V(s) - \\mu(s) V'(s) - \\frac{1}{2}\\sigma^2(s) V''(s) - (s - S^*)^2, \\; c - V'(s) \\right\\} = 0$$",
        "core_finding": "Establishes the existence of an optimal reflection boundary $s^*$; the central bank minimizes intervention costs by permitting free exchange rate fluctuation inside the band and executing singular interventions only at the boundary.",
        "limitations": "Assumes a constant shadow cost of reserve depletion $c$; does not model sudden-stop reserve exhaustion.",
        "extension": "Incorporate a state-dependent reserve cost function $c(R_t)$ where the shadow price of reserves increases asymptotically as national import cover drops below critical thresholds.",
        "public_data": "Central bank monthly gross and net international reserve bulletins and IMF Article IV country reports.",
        "desk_observation": "When Bangladesh Bank’s reserves dropped toward statutory import minimums, the central bank shifted from smooth daily market interventions to rationing import letter-of-credit (LC) approvals.\n\n---"
      },
      {
        "num": 3,
        "title": "Robust Faber–Schauder Approximation of Rough Continuous Paths",
        "research_question": "Can a rough continuous path be reconstructed non-parametrically in Hölder topology from discrete time-integrated observations?",
        "data": "High-frequency intraday financial asset price series and synthetic rough path realizations.",
        "method": "Non-parametric pathwise estimation using hierarchical Faber-Schauder basis expansions without semi-martingale assumptions.",
        "core_finding": "Proves minimax convergence rates under discrete time-integrated sampling, establishing that rough volatility trajectories can be reconstructed pathwise.",
        "limitations": "Estimation error increases rapidly under high-frequency market microstructure noise and discrete price grid ticks.",
        "extension": "Reconstruct continuous intraday interbank money market interest rate paths from discrete daily regulatory volume-weighted averages.",
        "public_data": "Published daily interbank call money volume-weighted average rates from Bangladesh Bank.",
        "desk_observation": "Daily reported call money rates smooth out intense intraday liquidity swings that occur between morning clearing and afternoon cash settlement.\n\n---"
      },
      {
        "num": 4,
        "title": "Estimating the Hurst Parameter of Rough Volatility Models",
        "research_question": "What is the optimal mathematical convergence rate for discrete-sample variation estimators of the Hurst parameter in rough stochastic volatility models?",
        "data": "Simulated fractional Brownian motion paths and tick-level financial asset volatility data.",
        "method": "Sample $q$-th variation estimators on discrete increments; derives central limit theorems and Berry-Esseen bounds for rough fractional noise.",
        "core_finding": "Proves that the optimal convergence rate is $n^{-1/2}$ for $q=2$, settling a theoretical debate on estimation efficiency for fractional processes.",
        "limitations": "Assumes continuous volatility observations without bid-ask bounce contamination.",
        "extension": "Estimate the roughness parameter $H$ of sovereign bond yield volatility in frontier markets to test for rough term-structure dynamics.",
        "public_data": "Daily auction cut-offs and secondary market Treasury bill trading yields from Bangladesh Bank.",
        "desk_observation": "Sovereign yield volatility spikes during primary auction clearing days, exhibiting rough fractal bursts rather than smooth diffusive Brownian motion.\n\n---"
      },
      {
        "num": 5,
        "title": "Model-Free Estimation of the Roughness Exponent",
        "research_question": "Can the roughness exponent of financial asset prices be defined and estimated deterministically without assuming a fractional Gaussian data-generating process?",
        "data": "Intraday realized variance series across major equity indices and foreign exchange pairs.",
        "method": "Formulates a model-free mathematical roughness definition based on the oscillation modulus and $p$-th variation along dyadic partitions:\n   $$v_p(f; [0, 1]) = \\sup_{\\pi} \\sum_{i=1}^m |f(t_i) - f(t_{i-1})|^p$$",
        "core_finding": "Proves that path roughness is an intrinsic geometric feature of financial market price trajectories, confirming $H \\approx 0.1$ across financial markets independently of model assumptions.",
        "limitations": "Sensitive to data sparsity and holiday market closures.",
        "extension": "Measure the model-free roughness exponent of exchange rate paths under currency crawling pegs.",
        "public_data": "Interbank USD/BDT daily fixing rates and central bank foreign exchange transaction logs.",
        "desk_observation": "Managed currency pegs exhibit smooth plateau behavior inside the band, punctuated by sharp fractal adjustments when the crawling peg rate is revised.\n\n---"
      },
      {
        "num": 6,
        "title": "Perturbation Methods in Robust Portfolio Optimization",
        "research_question": "How can analytical asymptotic portfolio rules be derived for an investor facing Knightian model uncertainty and borrowing constraints?",
        "data": "Multi-asset portfolio return series calibrated to equity and fixed income benchmarks.",
        "method": "Asymptotic perturbation expansion around the frictionless Merton benchmark under worst-case penalty-constrained probability measures.",
        "core_finding": "Derives closed-form analytical portfolio weights that account for non-linear leverage constraints and distributional ambiguity without numerical PDE solvers.",
        "limitations": "Approximation accuracy degrades under extreme leverage constraints or deep out-of-the-money derivatives.",
        "extension": "Solve optimal banking-book Treasury bond allocations subject to statutory liquidity ratio (SLR) constraints under sovereign default ambiguity.",
        "public_data": "Bangladesh Bank scheduled commercial bank balance sheet aggregates and sovereign debt maturity profiles.",
        "desk_observation": "Bank ALM desks face strict regulatory constraints: even if sovereign yields drop below deposit costs, banks must hold a minimum 13% of liabilities in Treasury paper to satisfy statutory reserves.\n\n---"
      },
      {
        "num": 7,
        "title": "Sample Path Properties of the Fractional Wiener–Weierstrass Bridge",
        "research_question": "What are the pathwise geometric and probabilistic regularity properties of synthetic fractional stochastic bridge processes?",
        "data": "Mathematical analysis of synthetic non-differentiable fractal trajectories.",
        "method": "Proves Hölder continuity, quadratic variation, and the law of the iterated logarithm for Weierstrass fractal bridge functions.",
        "core_finding": "Establishes the exact mathematical foundation for modeling continuous-time financial paths pinned to fixed boundary limits.",
        "limitations": "Pure probability theory; requires structural mapping to be implemented on empirical financial market data.",
        "extension": "Model exchange rate trajectories between scheduled central bank parity adjustment dates using bridge processes.",
        "public_data": "Published historical central bank foreign exchange crawling peg parity schedules.",
        "desk_observation": "Spot exchange rates behave like pinned bridge processes between central bank crawling peg reset dates.\n\n---"
      },
      {
        "num": 8,
        "title": "Robustness in the Optimization of Risk Measures",
        "research_question": "Are optimization problems based on Value-at-Risk ($\\text{VaR}$) and Expected Shortfall ($\\text{ES}$) statistically robust to small perturbations in asset return distributions?",
        "data": "Parametric and non-parametric historical return distributions with heavy tails.",
        "method": "Hampel's qualitative robustness analysis and structural optimization theory applied to risk measures and distortion risk metrics.",
        "core_finding": "While $\\text{VaR}$ is statistically robust to outlier contamination, $\\text{VaR}$-based optimization problems are ill-posed and generate unstable asset allocations; Range Value-at-Risk ($\\text{RVaR}$) restores mathematical optimization stability.",
        "limitations": "Focuses on single-period static optimization without dynamic rebalancing.",
        "extension": "Evaluate the stability of commercial bank capital adequacy allocations under Basel III Expected Shortfall mandates during macro-financial currency crises.",
        "public_data": "Banking sector capital adequacy ratios (CAR) and stress-testing reports published by Bangladesh Bank.",
        "desk_observation": "In emerging markets with fat-tailed sovereign credit risk, standard Gaussian VaR severely understates treasury portfolio capital requirements during rate hike cycles.\n\n---"
      },
      {
        "num": 9,
        "title": "Market Impact Games Under Transient Price Impact",
        "research_question": "What is the Nash equilibrium when multiple risk-averse institutional traders execute large liquidation orders simultaneously in an illiquid market?",
        "data": "Continuous-time game-theoretic simulation of institutional order flow.",
        "method": "Solves a system of coupled non-linear integral equations governing competitive trade execution under transient market impact.",
        "core_finding": "Proves that competitive liquidation induces predatory trading: traders strategically front-run distressed peers to exploit anticipated market impact decay.",
        "limitations": "Assumes continuous execution rates; does not model discrete limit order book queues.",
        "extension": "Model primary dealer bidding dynamics during mandatory government bond auctions when multiple commercial banks face identical liquidity deficits.",
        "public_data": "Primary Treasury auction bid-to-cover ratios and non-competitive bid allocation statistics published by Bangladesh Bank.",
        "desk_observation": "In illiquid Treasury bill auctions, primary dealers observe peer liquidity positions and shade bids aggressively, causing auction clearing rates to diverge from interbank call money rates.\n\n---"
      },
      {
        "num": 10,
        "title": "Transient Linear Price Impact and Fredholm Integral Equations",
        "research_question": "Under what conditions does transient linear price impact prevent market manipulation and arbitrage in algorithmic order execution?",
        "data": "Tick-level limit order book transaction records from major electronic trading exchanges.",
        "method": "Integral operator analysis; proves absence of price manipulation is equivalent to the positive definiteness of the resilience kernel $G(t)$, reducing optimal liquidation to a Fredholm integral equation of the first kind:\n   $$\\int_0^T G(|t - s|) \\dot{x}_s ds = \\lambda + \\mu t$$",
        "core_finding": "Identifies the exact mathematical class of admissible impact decay functions that rule out round-trip price manipulation strategies.",
        "limitations": "Linear price impact assumption; does not account for asymmetric impact between buy and sell orders.",
        "extension": "Calculate optimal execution trajectories for offloading large parcels of sovereign debt into thin secondary OTC markets without triggering price crashes.",
        "public_data": "Secondary market government securities transaction logs published by the Dhaka Stock Exchange.",
        "desk_observation": "Liquidating 10-year government bonds in Bangladesh cannot be executed via block trades without moving the yield by 50 to 100 basis points; execution must be sliced into small parcels across weeks.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Alexander Schied investigates stochastic analysis, optimal execution under market impact, and quantitative risk measurement, advancing from pathwise stochastic calculus to central bank game-theoretic intervention models.\n* **The Open Question He Keeps Returning To:** How do market microstructure frictions, execution impact, and model uncertainty constrain the dynamic optimization policies of financial institutions and monetary authorities?\n* **Methods He Would Expect You to Learn:** Stochastic optimal control, Hamilton-Jacobi-Bellman variational inequalities, rough path theory, Fredholm integral equations, and robust risk measurement theory.\n* **The One Paper to Cite in Your Outreach:** Neuman & Schied (2022), *\"Protecting Pegged Currency Markets from Speculative Investors,\"* *Mathematical Finance*, 32(1), 405–420."
  },
  "Lucas Herrenbrueck": {
    "name": "Lucas Herrenbrueck",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His paper *\"Asset Safety versus Asset Liquidity\"* (*Journal of Political Economy*, 2023) directly formalizes the daily dilemma on your treasury desk: Bangladesh government securities are default-free domestically (safe), but secondary market trading is thin and frozen (illiquid), whereas interbank call money and repo carry credit risk but provide immediate liquidity.\n* **Paper-to-Asset Mapping 2:** His working paper *\"Urgency, Liquidity, and the Price of Convenience\"* (2026) models the convenience yield of Treasury bills over alternative assets. In Bangladesh, the 91-day Treasury bill yield (8.28%) cleared **122 basis points below** the central bank policy rate (9.50%), representing a massive empirical convenience yield demanded by commercial banks to satisfy statutory SLR reserve ratios.\n* **Paper-to-Asset Mapping 3:** His search-theoretic term premium model (*Theoretical Economics*, 2016) models why on-the-run bonds trade at a price premium over off-the-run bonds due to liquidity search frictions, directly aligning with your security-level cash-flow model across all 310 outstanding Bangladesh government securities.",
      "how_contribute": "(Feasible 16–20 Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Convenience Yields, Asset Marketability, and Safety-Liquidity Divergence: Structural Evidence from Bangladesh Government Securities.\"*\n* **Core Research Question:** Does statutory bank reserve demand (SLR/CRR) distort the convenience yield of Treasury bills away from fundamental liquidity value, causing market-clearing bill yields to decouple from the central bank policy rate corridor?\n* **Methodology & Data:** Apply Dong, Herrenbrueck, and Wang’s (2026) structural monetary asset pricing model to estimate the price of convenience (PoC) using primary auction cut-offs for Treasury bills, interbank call money rates, and 5-year Treasury bonds in Bangladesh.\n* **Lab Utility:** Can clean, calibrate, and simulate search-theoretic monetary models in Python and Julia, providing calibrated frontier-market debt parameters for his ongoing research projects.",
      "why_take_you": "* **Turnkey Academic Preparation:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) with an undergraduate Thesis GPA of 4.00/4.00 and 27 credits of mathematics and econometrics.\n* **Frontline Market Intuition:** While academic macroeconomists model liquidity as an abstract search friction, Hasibul executes trades in a live interbank money market ($90–110M daily volume) and understands the institutional plumbing of primary dealer auctions and bank balance-sheet constraints.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and solid preparation for GRE Quantitative (targeting 165+).\n* **Objection (SFU MA Program Duration & Funding):** SFU MA Economics extended essay / thesis stream is officially 16 to 20 months (satisfying the 16-month spousal OWP gate). Graduate students benefit from per-term continuation fees (~$2,200/term) and departmental TA/Fellowship allocations.",
      "hook_line": "> *\"I follow your 2023 Journal of Political Economy paper on asset safety versus asset liquidity and your recent work on the price of convenience; on our treasury desk at City Bank in Bangladesh, we navigate this exact mechanism daily where statutory bank demand pushed 91-day Treasury bill yields to 8.28%, clearing 122 basis points below the 9.50% central bank policy rate.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Asset Safety vs. Asset Liquidity",
        "research_question": "Are \"safe\" and \"liquid\" assets synonymous in general equilibrium, or can safety and liquidity diverge?",
        "data": "Analytical search-theoretic model calibrated to historical US Treasury and corporate bond spreads.",
        "method": "General equilibrium monetary search model where agents face decentralized trading opportunities subject to anonymous matching and limited commitment. Solves the Nash bargaining problem where asset resale liquidity in OTC secondary markets determines purchasing power.",
        "core_finding": "Safety does not guarantee liquidity: a safer asset can trade at a lower liquidity value than a riskier asset if secondary markets for the safe asset experience trading volume dry-ups and investor buy-and-hold lock-in.",
        "limitations": "Assumes bilateral Nash bargaining in OTC markets; does not model centralized institutional repo clearing corridors.",
        "extension": "Test safety-liquidity divergence in an emerging economy where government debt is default-free domestically but completely illiquid in the secondary market.",
        "public_data": "Published secondary market trading volumes and yields from the Dhaka Stock Exchange and Bangladesh Bank debt bulletins.",
        "desk_observation": "Bangladesh government bonds are default-free (safe), but banks cannot sell a 10-year bond during liquidity shortages; they must borrow against it via repo (liquidity) or accept massive price haircuts.\n\n---"
      },
      {
        "num": 2,
        "title": "Urgency, Liquidity, and the Price of Convenience",
        "research_question": "Does the yield spread between liquid and illiquid bonds measure the true convenience yield of money, or does it conflate asset marketability with investor urgency?",
        "data": "US Treasury bills, commercial paper, and AAA corporate bond daily yields spanning 1990 to 2024.",
        "method": "Structural monetary asset pricing model with heterogeneous household liquidity shocks, decomposing yield spreads into marketability versus urgency.",
        "core_finding": "The true annual Price of Convenience (PoC) averages **5.1%** (ranging from 3.2% to 11.4%), an order of magnitude higher than conventional yield spreads; **76% of observed spreads reflect asset marketability**, while only **24% reflects investor urgency**.",
        "limitations": "Calibrated to US data with deep commercial paper markets; ignores regulatory reserve demand constraints.",
        "extension": "Decompose the 122 bps negative wedge between Bangladesh 91-day Treasury bills (8.28%) and the central bank repo rate (9.50%) into marketability versus statutory reserve urgency.",
        "public_data": "Primary Treasury auction cut-offs, published call money rates, and scheduled bank reserve ratios from Bangladesh Bank.",
        "desk_observation": "Commercial banks bid aggressively for short-term Treasury bills not out of fundamental convenience, but because bills qualify as Statutory Liquidity Reserve (SLR) assets while commercial loans do not.\n\n---"
      },
      {
        "num": 3,
        "title": "The Real Effects of Financial Disruptions in a Monetary Economy",
        "research_question": "How does the existence of fiat money alter the transmission of financial asset freezes to aggregate employment and output?",
        "data": "New Monetarist dynamic general equilibrium model calibrated to US labor and financial market shocks.",
        "method": "Calibrated DSGE model combining Mortensen-Pissarides frictional labor markets with frictional secondary asset markets and a cash-in-advance payment constraint.",
        "core_finding": "When money is explicitly modeled as a medium of exchange, the real macroeconomic shock of an asset market freeze is dampened by up to **60%**, because agents substitute illiquid assets for fiat money buffers; high inflation magnifies real output losses by raising the cost of holding cash.",
        "limitations": "Assumes flexible wage renegotiation; does not incorporate bank balance-sheet leverage constraints.",
        "extension": "Evaluate how central bank liquidity support to commercial banks dampens real output shocks during sovereign debt auction freezes in high-inflation environments.",
        "public_data": "Bangladesh Bureau of Statistics national output accounts and Bangladesh Bank financial stability reports.",
        "desk_observation": "During interbank liquidity squeezes, commercial banks halt new corporate loan disbursements to preserve cash buffers, directly transmitting financial frictions into manufacturing slowdowns.\n\n---"
      },
      {
        "num": 4,
        "title": "Asymmetric Information, Asset Markets, and the Medium of Exchange",
        "research_question": "Can secondary asset markets mitigate the lemons problem when assets of uncertain quality are used as media of exchange?",
        "data": "Theoretical microeconomic search model.",
        "method": "Decentralized search model where buyers can either use assets directly as payment or liquidate them in a dedicated secondary market to informed dealers before trading for goods.",
        "core_finding": "Secondary asset market liquidity acts as an information-revealing screening mechanism that restores trade in decentralized goods markets.",
        "limitations": "Assumes dealers are fully informed regarding asset quality.",
        "extension": "Examine how the establishment of an automated interbank trading platform alters adverse selection in frontier money markets.",
        "public_data": "Historical interbank transaction volumes from Bangladesh Bank's automated clearinghouse (BACPS).",
        "desk_observation": "In bilateral call money markets, tier-1 private banks refuse to lend to troubled state-owned banks unless secured by high-quality Treasury collateral.\n\n---"
      },
      {
        "num": 5,
        "title": "What’s So Inconvenient About TIPS?",
        "research_question": "Why do Treasury Inflation-Protected Securities (TIPS) trade at an illiquidity discount relative to nominal Treasuries?",
        "data": "Daily TIPS and nominal US Treasury yield curves from 1999 to 2023.",
        "method": "Structural monetary search model where asset marketability is endogenous and depends on investor market entry decisions and secondary market thickness.",
        "core_finding": "TIPS illiquidity is driven by market segmentation and the sheer supply asymmetry favoring nominal Treasuries, not by mispricing of inflation risk.",
        "limitations": "Does not model institutional mandates that legally restrict pension funds from trading nominal paper.",
        "extension": "Evaluate why sovereign green bonds or Islamic Sukuk bonds trade at liquidity discounts relative to conventional Treasury bills in South Asia.",
        "public_data": "Bangladesh Bank Sukuk auction results and conventional Treasury bond yield spreads.",
        "desk_observation": "Islamic Sukuk bonds trade with a persistent liquidity discount because conventional commercial banks cannot legally hold them as regulatory liquidity reserves.\n\n---"
      },
      {
        "num": 6,
        "title": "The Strategic Determination of the Supply of Liquid Assets",
        "research_question": "How do governments strategically choose the supply and maturity of liquid debt to minimize borrowing costs under secondary market search frictions?",
        "data": "Theoretical game-theoretic OTC search model.",
        "method": "Models competitive liquidity provision where institutional investors choose which OTC market to enter based on expected matching probabilities and execution terms.",
        "core_finding": "Small variations in OTC market microstructure induce extreme liquidity divergence, allowing sovereign debt to capture an outsized convenience yield over equally safe corporate paper.",
        "limitations": "Assumes homogeneous investor wealth endowments.",
        "extension": "Model government borrowing costs when the sovereign strategically shifts issuance between 91-day bills and 5-year bonds to capture bank liquidity demand.",
        "public_data": "Ministry of Finance debt calendar and Bangladesh Bank auction issuance amounts.",
        "desk_observation": "The government floods the market with 91-day bills when bank liquidity is high to lower its borrowing cost, shifting issuance to longer bonds only when required for budget deficit rollover.\n\n---"
      },
      {
        "num": 7,
        "title": "The Liquidity-Augmented Model of Macroeconomic Aggregates (LAMMA)",
        "research_question": "How can New Monetarist microfoundations of liquidity be embedded in a tractable DSGE framework suitable for monetary policy analysis?",
        "data": "Dynare simulation calibrated to US post-war macroeconomic and financial aggregates.",
        "method": "DSGE model where monetary policy operates via open market swaps of money for liquid bonds in secondary markets; unifies Friedman’s real balance effect with Tobin’s asset substitution channel.",
        "core_finding": "Explains the persistent zero-lower-bound liquidity trap where nominal interest rates are zero while inflation remains positive due to liquidity premia.",
        "limitations": "Relies on representative household assumptions for goods production.",
        "extension": "Calibrate the LAMMA DSGE model to an emerging economy with an administered interest rate corridor and binding commercial bank reserve requirements.",
        "public_data": "Central bank monetary policy statements and national inflation statistics.",
        "desk_observation": "When Bangladesh Bank raises its repo policy rate, market rates do not adjust smoothly; interbank call rates diverge based on liquidity distribution across bank tiers.\n\n---"
      },
      {
        "num": 8,
        "title": "Interest Rates, Moneyness, and the Fisher Equation",
        "research_question": "Why does the standard consumption Euler/Fisher equation fail empirically across bond markets?",
        "data": "Long-run historical US macroeconomic and asset return panels.",
        "method": "Theoretical reformulation of the Fisher equation incorporating endogenous moneyness service yields.",
        "core_finding": "The real return on hypothetical illiquid bonds estimated from consumption growth behaves fundamentally differently from the observed return on safe, liquid assets, resolving classical asset pricing puzzles.",
        "limitations": "Requires structural estimation of unobserved moneyness parameters.",
        "extension": "Test the moneyness-augmented Fisher equation in an emerging economy experiencing double-digit inflation.",
        "public_data": "Bangladesh Bank policy interest rates and national consumer price indices.",
        "desk_observation": "Investors accept negative real yields on short-term Treasury bills because their moneyness (collateral eligibility for central bank daylight overdrafts) offsets inflation erosion.\n\n---"
      },
      {
        "num": 9,
        "title": "Frictional Asset Markets and the Liquidity Channel of Monetary Policy",
        "research_question": "How do central bank purchases of illiquid assets affect asset prices and capital accumulation in frictional financial markets?",
        "data": "Continuous-time theoretical search model with heterogeneous household liquidity preferences.",
        "method": "General equilibrium asset market model contrasting central bank open market asset purchases with unbacked currency helicopter drops.",
        "core_finding": "Open market purchases stimulate private goods consumption while crowding out private financial asset demand, potentially inducing elevated real yields when safe assets become excessively scarce.",
        "limitations": "Static capital stock assumption in short-run dynamics.",
        "extension": "Analyze how central bank quantitative easing (direct absorption of sovereign bonds) alters private bank corporate lending capacity.",
        "public_data": "Bangladesh Bank balance-sheet claims on government versus commercial banking sectors.",
        "desk_observation": "When the central bank bought sovereign debt directly prior to June 2024, it monetized fiscal deficits directly, fueling inflation and depressing interbank market activity.\n\n---"
      },
      {
        "num": 10,
        "title": "A Search-Theoretic Model of the Term Premium",
        "research_question": "Can the positive slope of the term structure and on-the-run Treasury premia be explained entirely by liquidity differentials rather than consumption risk?",
        "data": "US Treasury yield curves and on-the-run versus off-the-run yield spread series.",
        "method": "Monetary search model with multiple bond maturities; short bonds mature in time to finance random consumption opportunities, while long bonds require secondary OTC liquidation subject to search frictions.",
        "core_finding": "Long-term bonds trade at higher yields in steady state purely to compensate investors for search frictions during secondary market liquidation; on-the-run freshly issued bonds trade at a price premium because off-the-run sellers face more urgent liquidity needs.",
        "limitations": "Does not model inflation expectation uncertainty across tenors.",
        "extension": "Estimate liquidity term premia between on-the-run and off-the-run benchmark bonds across 310 Bangladesh government securities.",
        "public_data": "Bangladesh Bank auction cut-offs and primary dealer secondary market trade blotters.",
        "desk_observation": "Freshly auctioned 5-year Treasury bonds trade at a 30–50 bps yield discount (price premium) relative to older off-the-run 5-year bonds with identical remaining maturity because dealers prioritize on-the-run collateral for central bank repo operations.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Lucas Herrenbrueck builds New Monetarist macro-finance models proving that financial assets trade at liquidity and convenience yields that violate frictionless asset pricing, providing microfoundations for term premia, convenience yields, and monetary transmission.\n* **The Open Question He Keeps Returning To:** How do search frictions, market microstructure segmentation, and liquidity demand in secondary asset markets determine the term structure of interest rates and macroeconomic aggregates?\n* **Methods He Would Expect You to Learn:** Search-and-matching monetary theory (Lagos-Wright framework), New Monetarist DSGE modeling (Dynare), structural asset pricing decompositions, and numerical simulation of frictional asset markets.\n* **The One Paper to Cite in Your Outreach:** Geromichalos, Herrenbrueck & Lee (2023), *\"Asset Safety versus Asset Liquidity,\"* *Journal of Political Economy*, 131(5), 1172–1212."
  },
  "Tolga Cenesizoglu": {
    "name": "Tolga Cenesizoglu",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His paper *\"Time Variation in Cash Flows and Discount Rates\"* (*Journal of Financial Econometrics*, 2023) develops state-space decompositions of asset return shocks, directly connecting to your daily empirical modeling of sovereign yield adjustments following policy rate shifts in Bangladesh.\n* **Paper-to-Asset Mapping 2:** As Director of the Canadian Derivatives Institute (CDI), he oversees research funding and industry grants in derivatives and fixed-income risk. His supervised student projects explicitly focus on spread duration (Lafrenière 2025), ALM risk modeling tools (Triki 2022), interbank rate transitions away from LIBOR/IBOR (Aladas 2021), and FX market risk factors (Vallée 2020).\n* **Paper-to-Asset Mapping 3:** His UCSD econometric foundation (holding a Master of Science in Statistics) aligns with your 27 credits of undergraduate mathematics, statistics, and econometrics and your desire to apply state-space Kalman filtering to frontier debt markets.",
      "how_contribute": "(Feasible 16–24 Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Forecasting Frontier Sovereign Yield Spreads Across Structural Regime Breaks: A State-Space Unobserved Components Decomposition.\"*\n* **Core Research Question:** Can a time-varying parameter state-space model separate whether the 122 bps decoupling between primary Treasury bill yields and the central bank policy rate is driven by cash-flow demand from commercial banks or shifts in discount-rate expectations?\n* **Methodology & Data:** Formulate a Campbell-Shiller state-space model estimated via Kalman filtering and Gibbs sampling, using Hasibul's database of auction clearing cut-offs across all 310 outstanding Bangladesh government securities and interbank call money volume-weighted rates.\n* **Lab Utility:** Can immediately clean, structure, and maintain high-frequency financial market and limit order book datasets in Python and R for his CDI-funded research projects.",
      "why_take_you": "* **Turnkey Econometric Preparation:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) who has mastered fixed income valuation, portfolio management, and quantitative methods.\n* **Operational Frontline Edge:** While pure academic applicants know only CRSP and Compustat data, Hasibul executes trades in a live interbank market ($90–110M daily volume) and understands the institutional plumbing of interbank rate corridors and primary dealer bidding.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and completing 9 dedicated quantitative courses in mathematics, statistics, and econometrics.\n* **Objection (Language / Program Structure):** HEC Montréal's MSc in Financial Engineering is officially offered in English, lasts 16 to 24 months (clearing the IRCC spousal OWP gate), and qualifies for Quebec research-stream tuition differential fee exemptions.",
      "hook_line": "> *\"I follow your 2023 Journal of Financial Econometrics paper on cash flow and discount rate variation and noted your supervision of projects on spread duration and the interbank rate transition; on our treasury desk at City Bank in Bangladesh, I track the empirical version of these models across a $4.2B balance sheet where Treasury bill yields recently decoupled by 122 basis points from the central bank policy corridor.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Time Variation in Cash Flows and Discount Rates",
        "research_question": "Do expected cash-flow growth and discount rates vary over time, and how do their relative contributions to unexpected stock and bond returns evolve across macroeconomic states?",
        "data": "Monthly US equity returns from CRSP, zero-coupon Treasury yields, and macroeconomic fundamentals spanning 1952 to 2020.",
        "method": "State-space econometric model with time-varying parameters estimated via Gibbs sampling and Kalman filtering, decomposing the Campbell-Shiller present-value identity:\n   $$r_{t+1} - E_t[r_{t+1}] = \\eta_{d, t+1} - \\eta_{r, t+1}$$",
        "core_finding": "Disproves the traditional assumption that cash flows are unforecastable. While discount-rate variation dominates in tranquil expansions (accounting for >85% of return variance), cash-flow news accounts for up to **45% of unexpected return variance** during economic crises.",
        "limitations": "Assumes linear state transition equations; notes that structural breaks in fiscal-monetary policy regimes may distort Kalman filter gain parameters.",
        "extension": "Apply state-space decomposition to separate cash-flow shocks from discount-rate shocks in emerging market sovereign debt yields during currency crisis episodes.",
        "public_data": "Bangladesh Bank primary Treasury auction cut-offs, published policy interest rates, and national debt service disbursements.",
        "desk_observation": "When Bangladesh Bank raised the policy repo rate by 50 bps, 91-day Treasury yields fell by 80 bps rather than rising, indicating that commercial bank cash-flow demand completely overwhelmed central bank discount-rate policy.\n\n---"
      },
      {
        "num": 2,
        "title": "Asymmetric Effects of the Limit Order Book on Price Dynamics",
        "research_question": "Does liquidity supply in the limit order book exert asymmetric permanent price impact between the bid and ask sides of the market?",
        "data": "Ultra-high-frequency tick data from NYSE Trade and Quote (TAQ) and limit order book archives (2012–2018).",
        "method": "Structural Vector Autoregression (SVAR) modeling high-frequency price changes conditional on order imbalances and order book slope parameters across multiple depth levels.",
        "core_finding": "The slope and depth of the ask side of the order book exert significantly stronger permanent price impact on transactions than the bid side, demonstrating asymmetric price adjustment dynamics.",
        "limitations": "Restricted to exchange-traded equity limit order books; does not analyze over-the-counter (OTC) quote-driven dealer markets.",
        "extension": "Measure asymmetric liquidity resilience in primary dealer bidding schedules during sovereign debt auctions.",
        "public_data": "Primary Treasury auction bid amounts, accepted amounts, and minimum/maximum bid spreads published by Bangladesh Bank.",
        "desk_observation": "In Treasury bill auctions, when the central bank signals rate tightening, primary dealers withdraw bids aggressively from the lower tail, causing cut-off yields to spike asymmetrically.\n\n---"
      },
      {
        "num": 3,
        "title": "Return Decomposition Over the Business Cycle",
        "research_question": "How does the cyclical state of the macroeconomy alter the correlation between cash-flow news and discount-rate news?",
        "data": "US equity and bond returns merged with NBER recession dates (1947–2019).",
        "method": "Markov-switching vector autoregression (MS-VAR) decomposing unexpected returns conditional on expansion and recession regimes.",
        "core_finding": "The covariance between cash-flow news and discount-rate news is negative in economic expansions but flips to positive during recessions, explaining cyclical time-variation in equity risk premia.",
        "limitations": "NBER cycle dates are ex-post; does not allow real-time forecasting.",
        "extension": "Estimate Markov-switching return decompositions for sovereign debt yields in developing economies subject to balance of payments crises.",
        "public_data": "National quarterly GDP growth estimates and secondary market bond trading indices.",
        "desk_observation": "During domestic liquidity crunches, falling bank deposits force commercial banks to liquidate Treasury bills simultaneously, creating positive comovement between funding liquidity and sovereign yields.\n\n---"
      },
      {
        "num": 4,
        "title": "Reducing Transaction Costs Using Limit Order Book Slopes",
        "research_question": "Can machine learning forecasts of intraday limit order book depth reduce institutional execution costs?",
        "data": "Millisecond-level limit order book transaction logs for S&P 500 constituents.",
        "method": "Gradient-boosted decision trees (XGBoost) and recurrent neural networks forecasting order book slopes, embedded in an optimal algorithmic trade execution scheduler.",
        "core_finding": "Dynamically timing order submission based on order book slope forecasts reduces institutional trade execution slippage by **18 basis points** compared to standard TWAP algorithms.",
        "limitations": "High computational overhead; susceptible to algorithmic adverse selection.",
        "extension": "Develop execution scheduling models for offloading sovereign debt portfolios into thin interbank secondary markets.",
        "public_data": "DSE secondary bond transaction reports and published primary dealer trade summaries.",
        "desk_observation": "Liquidating 5-year Treasury bonds cannot be done in a single block without conceding 30 to 50 bps in yield; execution must be staggered across multiple interbank counterparties over days.\n\n---"
      },
      {
        "num": 5,
        "title": "Re-evaluating Retail Order Flow Identification",
        "research_question": "Does the standard Boehmer, Jones, and Zhang (2021) algorithm accurately identify retail investor trading activity in modern equity markets?",
        "data": "Trade and Quote (TAQ) transaction records and FINRA OTC trade reports (2018–2024).",
        "method": "Methodological replication comparing sub-penny price improvement rules against alternative classification algorithms across pre- and post-2021 market regimes.",
        "core_finding": "The BJZ algorithm misclassifies institutional algorithmic internalization trades as retail flow after 2021, invalidating earlier findings regarding retail investor return predictability.",
        "limitations": "Wholesaler internalization algorithms change dynamically, preventing static classification filters.",
        "extension": "Test order flow classification algorithms in developing equity and debt markets where retail investors trade through broker depository accounts.",
        "public_data": "DSE daily trade summary files and investor category transaction reports.",
        "desk_observation": "In Bangladesh Treasury auctions, non-competitive bids submitted on behalf of retail individuals exhibit completely different yield sensitivity compared to primary dealer proprietary bids.\n\n---"
      },
      {
        "num": 6,
        "title": "High-Frequency Patterns in Retail Trading Behavior",
        "research_question": "How does commission-free retail app trading affect intraday market volatility and liquidity provision?",
        "data": "High-frequency Robinhood user holdings and trading activity merged with tick-level equity market data (2018–2022).",
        "method": "Panel regressions and event study methodologies examining retail trade clustering during extreme market movements.",
        "core_finding": "Retail order flow generates severe intraday herd behavior, temporarily destabilizing liquidity and increasing bid-ask spreads during market downturns.",
        "limitations": "Robinhood user dataset is proprietary and restricted to a specific retail demographic.",
        "extension": "Examine whether retail mobile financial services (e.g., bKash) transfer savings from bank deposits into informal markets during bank solvency rumors.",
        "public_data": "Central bank mobile financial services (MFS) monthly transaction volumes and scheduled bank deposit growth data.",
        "desk_observation": "When rumors regarding private bank governance surface, MFS cash withdrawals surge within hours, immediately impacting commercial bank daily Cash Reserve Ratio compliance.\n\n---"
      },
      {
        "num": 7,
        "title": "Predicting Systematic Risk with Macroeconomic Variables",
        "research_question": "Does incorporating macroeconomic state variables improve out-of-sample forecasts of dynamic market beta?",
        "data": "Monthly US equity returns from CRSP, credit spreads, term spreads, and industrial production (1965–2018).",
        "method": "Dynamic beta regressions with macroeconomic state conditioning:\n   $$\\beta_{i, t} = b_{i, 0} + \\sum_{k=1}^K b_{i, k} Z_{k, t-1}$$\n   evaluated using out-of-sample root mean squared forecasting error (RMSFE) metrics.",
        "core_finding": "Macro-conditioned beta forecasts statistically significantly outperform rolling-window OLS estimates, generating higher risk-adjusted returns in minimum-variance portfolios.",
        "limitations": "Macroeconomic data is released with substantial reporting lags.",
        "extension": "Forecast dynamic interest-rate sensitivity (DV01) of commercial bank balance sheets using macroeconomic liquidity indicators.",
        "public_data": "Bangladesh Bank monthly economic trends, private credit growth figures, and Treasury yield schedules.",
        "desk_observation": "Commercial bank interest-rate risk exposure increases sharply when private sector credit growth slows down, as banks are forced to load up on fixed-rate sovereign debt.\n\n---"
      },
      {
        "num": 8,
        "title": "Oil Prices and the Term Structure of Interest Rates",
        "research_question": "How do crude oil price shocks transmit dynamically across the level, slope, and curvature of the sovereign yield curve?",
        "data": "Daily WTI crude oil futures and Nelson-Siegel zero-coupon Treasury yield parameters (1990–2018).",
        "method": "Structural Vector Autoregression (SVAR) with sign restrictions modeling impulse responses across term-structure components.",
        "core_finding": "Oil supply shocks generate an immediate upward shift in the yield curve curvature factor within 5 business days, reflecting short-term inflation expectation adjustments, while demand shocks drive the level factor permanently.",
        "limitations": "Assumes symmetric responses to positive and negative oil shocks.",
        "extension": "Model yield curve adjustments in an oil-importing developing nation following global energy price spikes under administered domestic fuel price subsidies.",
        "public_data": "Bangladesh Petroleum Corporation import statistics and Bangladesh Bank Treasury auction yields.",
        "desk_observation": "When global fuel import costs rise, central bank foreign exchange dollar sales accelerate to fund energy LCs, draining domestic currency liquidity from the interbank money market and spiking call money rates.\n\n---"
      },
      {
        "num": 9,
        "title": "The Cross-Section of Expected Stock Returns in Bad and Good Times",
        "research_question": "Do classical asset pricing risk factors (value, size, momentum) earn asymmetric risk premia across economic expansions and contractions?",
        "data": "Fama-French portfolio returns and macroeconomic regime indicators (1963–2016).",
        "method": "Conditional Fama-MacBeth two-pass cross-sectional regressions evaluated across bull and bear market regimes.",
        "core_finding": "Value and momentum risk premia are concentrated almost entirely in high-volatility economic contractions, providing near-zero compensation during tranquil expansions.",
        "limitations": "Static regime definitions based on equity market drawdowns.",
        "extension": "Test whether sovereign bond credit spread premia earn asymmetric compensation across liquidity surplus versus deficit regimes in an emerging banking sector.",
        "public_data": "DSE equity index returns, Treasury bond yield curves, and Bangladesh Bank liquidity injection records.",
        "desk_observation": "Credit spreads on corporate bonds and NBFI deposits widen sharply only when the banking system faces an aggregate liquidity deficit and interbank repo facilities are tapped.\n\n---"
      },
      {
        "num": 10,
        "title": "Yield Spreads and Business Cycle Forecasting",
        "research_question": "Does decomposing the term structure into pure expectation components versus term premia improve out-of-sample GDP growth forecasts?",
        "data": "Quarterly US real GDP growth and zero-coupon Treasury yields across maturities from 3 months to 10 years (1960–2012).",
        "method": "Multi-horizon predictive regressions comparing raw yield spreads against term-premium-adjusted spreads estimated from affine term structure models.",
        "core_finding": "Decomposing the term spread improves out-of-sample GDP forecasting accuracy by 22% at the 12-month horizon; the expectation component drives output forecasts, while the term premium signals credit supply frictions.",
        "limitations": "Affine term structure model estimates depend heavily on the specification of the price of risk.",
        "extension": "Evaluate whether the term spread between 10-year Treasury bonds and 91-day Treasury bills predicts economic growth in an economy where the short end is distorted by bank regulatory reserve requirements.",
        "public_data": "Bangladesh Bureau of Statistics national income data and Bangladesh Bank auction yield histories.",
        "desk_observation": "The domestic yield curve inverted temporarily when Treasury bill cut-offs spiked, but the inversion signaled central bank liquidity tightening rather than an impending real economic recession.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Tolga Cenesizoglu specializes in the econometrics of financial markets, utilizing state-space unobserved components modeling, high-frequency limit order book analytics, and term-structure decompositions to evaluate how macroeconomic information is incorporated into asset prices.\n* **The Open Question He Keeps Returning To:** How do time-varying discount rates, market microstructure order flow, and macroeconomic business cycle regimes drive the dynamic pricing and forecasting of financial assets?\n* **Methods He Would Expect You to Learn:** Campbell-Shiller present-value decompositions, state-space modeling with Kalman filtering and Gibbs sampling, high-frequency limit order book econometrics, and dynamic asset pricing regressions.\n* **The One Paper to Cite in Your Outreach:** Cenesizoglu & Ibrushi (2023), *\"Time Variation in Cash Flows and Discount Rates,\"* *Journal of Financial Econometrics*, 21(5), 1557–1589."
  },
  "Isha Agarwal": {
    "name": "Isha Agarwal",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** Her working paper *\"How does the Composition of Government Financing Affect the Size of Crowding Out? Evidence from Mexico\"* (conditionally accepted at *Review of Finance*) investigates how sovereign debt maturity structures alter commercial bank lending to private firms, directly mapping to your empirical observations in Bangladesh following the June 2024 fiscal reform.\n* **Paper-to-Asset Mapping 2:** Her research stream on *\"Banks’ Foreign Currency Exposure and the Real Effects of Exchange Rate Shocks\"* (Revise & Resubmit at *Review of Financial Studies*) analyzes how currency devaluations affect banks with unhedged FX exposures, directly connecting with your daily execution of USD/BDT FX swaps to hedge balance-sheet net open positions under central bank crawling peg regulations.\n* **Paper-to-Asset Mapping 3:** As an Assistant Professor in Year 5 holding three active SSHRC grants, she has active hiring capacity and high demand for quantitative research assistants who can clean microdata, execute panel regressions, and handle high-frequency banking book datasets without onboarding delays.",
      "how_contribute": "(Feasible 24-Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Government Debt Issuance Composition, Commercial Bank Balance Sheet Capacity, and Corporate Credit Crowding Out: Evidence from Bangladesh.\"*\n* **Core Research Question:** When a central bank halts direct monetization of fiscal deficits, does commercial bank absorption of short-term Treasury bills crowd out private sector lending through regulatory liquidity caps (CRR/SLR) rather than pure interest rate competition?\n* **Methodology & Data:** Apply the Khwaja-Mian (2008) firm-time fixed effects estimator on bank-level balance sheet data and loan portfolios, exploiting the June 2024 policy reform where commercial banks absorbed sovereign issuances while private credit growth fell to a 33-year low of 4.47%.\n* **Lab Utility:** Can immediately clean, structure, and maintain banking book panels and auction yield databases in Python, Stata, and R for her SSHRC-funded research projects.",
      "why_take_you": "* **Turnkey Academic Readiness:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) with an undergraduate Thesis GPA of 4.00/4.00 and 27 credits of mathematics and econometrics.\n* **Frontline Banking Insights:** Brings practical knowledge of bank treasury operations, Fund Transfer Pricing (FTP), Cash Reserve Ratio management, and sovereign debt bidding that theoretical graduate applicants lack.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and completing 9 dedicated quantitative courses in mathematics, statistics, and econometrics.\n* **Objection (Program Structure & Funding):** UBC Sauder’s MSc in Business Administration (Finance) is a fully funded 24-month research master's degree (tuition under $8,000/yr international, summer research assistantships up to $12,000, and TAships at $37.53/hr), clearing the IRCC 16-month spousal OWP gate. UBC offers an application fee waiver for Bangladesh residents.",
      "hook_line": "> *\"I follow your working paper on how government financing composition influences bank lending crowding out and your research on banks' foreign currency exposures; on our ALM desk at City Bank in Bangladesh, we navigated this exact mechanism when the central bank halted sovereign debt absorption in June 2024, shifting primary Treasury bill issuance entirely onto commercial bank balance sheets amidst a 33-year low in private credit growth (4.47%).\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Government Financing Composition and Bank Lending Crowding Out",
        "research_question": "Does the maturity composition of government debt issuance (short-term Treasury bills vs. long-term sovereign bonds) differentially affect commercial bank credit supply to private firms?",
        "data": "Granular bank-firm loan-level credit registry from Mexico merged with monthly sovereign debt auction allocations (2002–2018).",
        "method": "Khwaja and Mian (2008) firm-time fixed effects identification strategy:\n   $$\\Delta \\ln(\\text{Loan}_{ijb, t}) = \\alpha_{it} + \\beta (\\text{Sovereign Exposure}_{b, t-1}) + \\gamma \\mathbf{X}_{bt} + \\epsilon_{ijb, t}$$\n   comparing credit growth across banks with different sovereign debt exposure lending to the identical firm within the same quarter.",
        "core_finding": "Short-term Treasury bill issuance induces commercial banks to reallocate balance sheet liquidity toward sovereign paper, significantly crowding out private corporate loans (a 1% increase in Treasury bill issuance contracts corporate lending by 0.38%); in contrast, long-term bonds are absorbed by non-bank institutional investors, neutralizing the bank crowding-out effect.",
        "limitations": "Assumes non-bank financial intermediaries (pension funds) have unconstrained balance sheet capacity to absorb long-term paper; leaves open how crowding out operates when institutional investor markets are underdeveloped.",
        "extension": "Test whether commercial bank Treasury bill absorption crowds out private corporate lending in an emerging economy where pension funds and insurers are legally constrained from participating in primary auctions.",
        "public_data": "Bangladesh Bank monthly scheduled bank credit statistics, primary auction allocation tables, and Ministry of Finance economic reviews.",
        "desk_observation": "When Bangladesh Bank halted deficit monetization in June 2024, our desk actively redirected liquid funds from private commercial loan facilities into primary Treasury bills to secure risk-free yields, causing corporate loan growth to stall.\n\n---"
      },
      {
        "num": 2,
        "title": "Inflation and Bank Deposit Disintermediation",
        "research_question": "How do unexpected inflation shocks trigger depositor disintermediation and contract commercial bank balance sheets?",
        "data": "Multi-country historical panel spanning 40 economies from 1900 to 2020.",
        "method": "Local projections (Jordà, 2005) estimating impulse response functions of bank deposits, liquid assets, and corporate lending following inflation shocks under regulatory interest rate caps.",
        "core_finding": "When inflation exceeds regulatory deposit rate caps, depositors withdraw funds into physical or offshore assets, forcing commercial banks to contract credit; banking sector contraction persists for up to 3 years post-inflation surge.",
        "limitations": "Multi-country panel aggregates heterogeneous regulatory regimes; does not track individual bank-level depositor runs.",
        "extension": "Measure depositor outflows across private versus state-owned commercial banks following the removal of statutory deposit rate ceilings.",
        "public_data": "Bangladesh Bank quarterly scheduled bank deposit statistics and national consumer price inflation indices.",
        "desk_observation": "When inflation reached 10% under the 6% deposit cap, commercial banks experienced severe retail deposit attrition, forcing desks to borrow heavily in the interbank call money market to prevent CRR shortfalls.\n\n---"
      },
      {
        "num": 3,
        "title": "Monetary Policy Transmission Through Shadow Banks",
        "research_question": "How does monetary policy tightening transmit to mortgage origination when non-bank shadow banks dominate market origination?",
        "data": "US Home Mortgage Disclosure Act (HMDA) loan-level records merged with commercial bank credit line commitments (2008–2020).",
        "method": "Difference-in-differences regressions exploiting variations in shadow bank reliance on commercial bank warehouse credit lines following Federal Reserve rate hikes.",
        "core_finding": "Monetary policy transmission operates through a \"servicing channel\": monetary tightening increases shadow banks' servicing advance burdens, reducing their capacity to originate new mortgages even if bank credit lines remain accessible.",
        "limitations": "Restricted to US residential real estate lending; shadow banking mechanisms differ fundamentally in corporate debt markets.",
        "extension": "Examine how non-bank financial institutions (NBFIs) in South Asia transmit monetary policy shocks to SME corporate borrowers when interbank credit lines are frozen.",
        "public_data": "Bangladesh Bank NBFI annual performance reports and scheduled bank interbank placement tables.",
        "desk_observation": "When interbank rates spiked, commercial banks immediately reduced credit lines to NBFIs, causing NBFI commercial lease financing to freeze within weeks.\n\n---"
      },
      {
        "num": 4,
        "title": "Bank Regulation and Supervision: A Symbiotic Relationship",
        "research_question": "Does formal statutory capital regulation (Pillar 1) reduce bank risk-taking without active, discretionary supervisory enforcement (Pillar 2)?",
        "data": "Bank for International Settlements (BIS) bank regulatory dataset across 30 OECD economies (2005–2019).",
        "method": "Panel fixed effects modeling interaction terms between statutory capital stringency and supervisory power indices on bank Z-scores and non-performing loans.",
        "core_finding": "Statutory capital rules fail to constrain bank risk-taking unless accompanied by discretionary supervisory oversight; without supervision, banks engage in regulatory capital arbitrage by shifting assets into low-risk-weight categories that conceal credit risk.",
        "limitations": "Supervisory intensity indices rely on self-reported survey data from national central banks.",
        "extension": "Evaluate whether statutory capital adequacy ratios (CAR) accurately reflect bank insolvency risk in an emerging economy with widespread loan restructuring forbearance.",
        "public_data": "Central bank annual financial stability reports and individual bank audited annual financial statements.",
        "desk_observation": "Commercial banks optimize risk-weighted assets by holding sovereign Treasury bills (0% risk weight under Basel III) to boost reported Capital Adequacy Ratios while unprovisioned non-performing loans accumulate off-balance-sheet.\n\n---"
      },
      {
        "num": 5,
        "title": "Relative Pricing of Private and Public Debt",
        "research_question": "Does commercial banks' inside money creation channel explain why corporate bond yields trade at a premium relative to bank loan interest rates?",
        "data": "US syndicated corporate loans from DealScan merged with TRACE corporate bond trades and Treasury benchmarks (1995–2021).",
        "method": "Structural asset pricing framework relating the loan-bond spread to commercial banks' marginal cost of deposit funding and statutory reserve requirements.",
        "core_finding": "The money creation privilege of banks allows them to price loans below public bond yields for high-transparency firms, explaining why the corporate bond spread exceeds the syndicated loan spread in steady state.",
        "limitations": "Assumes frictionless interbank deposit reallocation; does not account for sovereign default risk.",
        "extension": "Test the loan-bond yield spread in a developing market where corporate bond issuance is thin and commercial banks hold monopolistic power over enterprise credit.",
        "public_data": "Dhaka Stock Exchange corporate bond yields and central bank weighted average commercial lending rates.",
        "desk_observation": "Private corporate borrowers in Bangladesh prefer syndicated bank loans over bond issuance because bank loans allow flexible bilateral renegotiation, whereas corporate bonds face punitive illiquidity discounts from secondary dealers.\n\n---"
      },
      {
        "num": 6,
        "title": "Banks’ Foreign Currency Exposure and Exchange Rate Shocks",
        "research_question": "How do exchange rate depreciations affect bank domestic credit supply when banks hold unhedged foreign currency liabilities?",
        "data": "Granular bank balance-sheet currency breakdown from emerging economies merged with loan registries (2000–2018).",
        "method": "Instrumental variable (IV) panel regressions exploiting exogenous global currency market shocks to measure the contraction in domestic lending for banks with net foreign currency liabilities.",
        "core_finding": "A 10% currency depreciation reduces domestic commercial lending by 4.2% for banks with unhedged FX debt; banks reallocate liquidity toward foreign currency assets to meet external debt service, contracting domestic private investment.",
        "limitations": "Data constraints prevent tracking cross-currency forward swap hedging at the transaction level.",
        "extension": "Measure how interbank USD/BDT FX swap market access buffers commercial bank domestic lending contractions during currency crawling peg adjustments.",
        "public_data": "Bangladesh Bank monthly foreign exchange reserve data, scheduled bank net open position (NOP) reports, and published interbank swap turnover.",
        "desk_observation": "Managing City Bank's FX swap blotter under central bank net open position limits reveals that banks with offshore banking units (OBUs) face severe liquidity drains during currency devaluations, forcing immediate liquidation of domestic Treasury bills.\n\n---"
      },
      {
        "num": 7,
        "title": "Determinants of China’s International Portfolio Equity Allocations",
        "research_question": "What macro-financial and geopolitical factors govern China's cross-border portfolio equity investments?",
        "data": "IMF Coordinated Portfolio Investment Survey (CPIS) and sovereign wealth fund bilateral asset holdings (2005–2018).",
        "method": "Gravity-model panel regressions estimating bilateral portfolio allocations against trade linkages, bilateral investment treaties, and capital control indices.",
        "core_finding": "State-directed strategic bilateral partnerships and capital control exemptions dominate classical mean-variance diversification motives in determining Chinese cross-border equity allocations.",
        "limitations": "Sovereign wealth fund allocations are partially unobservable due to offshore shell company holdings.",
        "extension": "Analyze bilateral official development assistance (ODA) and commercial loan allocations from Asian multilateral institutions to frontier infrastructure sectors.",
        "public_data": "Ministry of Finance Economic Relations Division (ERD) annual foreign aid flow reports.",
        "desk_observation": "Infrastructure project foreign loan disbursements generate large discrete foreign exchange inflows that temporarily flood the interbank money market with local currency liquidity upon conversion.\n\n---"
      },
      {
        "num": 8,
        "title": "Commodity Prices and Commercial Bank Lending",
        "research_question": "How do international commodity price shocks pass through to banking sector stability and credit supply in developing economies?",
        "data": "Bank-level financial statements from Bankscope/Orbis across 4,000 banks in 126 developing countries (1998–2016).",
        "method": "Panel fixed effects regressions with country-year fixed effects, evaluating interaction terms between country-level net commodity export shares and international commodity price indices.",
        "core_finding": "Commodity price drops reduce bank deposit growth, compress net interest margins, and increase non-performing loan ratios, with the effect being 2.5 times larger for state-owned commercial banks compared to foreign bank subsidiaries.",
        "limitations": "Annual bank balance-sheet data obscures high-frequency liquidity adjustments during commodity price spikes.",
        "extension": "Model the pass-through of global LNG and fertilizer import price shocks to domestic commercial bank liquidity and Treasury auction bidding in South Asia.",
        "public_data": "National import expenditure statistics from the National Board of Revenue and interbank money market settlement data.",
        "desk_observation": "Global energy import price surges trigger massive discrete US dollar sales by state-owned banks, draining domestic Taka liquidity from the interbank market and causing call money rates to hit the central bank corridor ceiling.\n\n---"
      },
      {
        "num": 9,
        "title": "Financial Sector Reforms and Banking Restructuring in India",
        "research_question": "What institutional sequencing is required to resolve high non-performing loan burdens and restore commercial bank balance-sheet health in South Asia?",
        "data": "Comprehensive analysis of Reserve Bank of India supervisory reports, insolvency codes, and public sector bank recapitalizations.",
        "method": "Policy and institutional framework analysis comparing historical recapitalizations, asset reconstruction companies (bad banks), and statutory liquidity ratios.",
        "core_finding": "Public sector bank recapitalization without statutory governance reform generates repeated cycles of moral hazard and bad debt accumulation; recommends reforming statutory liquidity mandates that force banks to hold sovereign paper.",
        "limitations": "Qualitative institutional analysis without bank-level econometric identification.",
        "extension": "Formulate a structural banking sector reform framework for resolving non-performing loans and primary dealer auction mandates in Bangladesh.",
        "public_data": "Bangladesh Bank supervisory reports, National Parliament financial legislation, and IMF country program benchmarks.",
        "desk_observation": "State-owned commercial banks in Bangladesh carry non-performing loan ratios exceeding 25%, relying on primary Treasury bond holdings to generate reported paper interest income that covers operational operating deficits.\n\n---"
      },
      {
        "num": 10,
        "title": "Bank Capital Requirements and Cross-Border Interbank Lending",
        "research_question": "How do national implementations of Basel III bank capital requirements alter cross-border interbank borrowing and lending flows?",
        "data": "Bank for International Settlements (BIS) locational and consolidated banking statistics merged with regulatory capital change dates (2000–2019).",
        "method": "Diff-in-diff panel regressions tracking bilateral cross-border interbank claims across jurisdictions tightening regulatory leverage ratios versus unconstrained banking systems.",
        "core_finding": "Stricter domestic capital requirements induce commercial banks to reduce cross-border interbank lending to emerging market counterparties by 14%, shifting capital toward domestic low-risk assets.",
        "limitations": "BIS reporting aggregate country-pair data obscures individual interbank counterparty credit line cancellations.",
        "extension": "Analyze how international correspondent banks' Basel III compliance reduces trade credit and letter-of-credit confirmation lines to frontier commercial banks.",
        "public_data": "Central bank foreign exchange guidelines and published commercial bank trade finance statistics.",
        "desk_observation": "When global correspondent banks face capital reviews, they raise confirmation fees on Bangladesh import LCs from 50 bps to over 200 bps, forcing domestic banks to fund import payments via expensive short-term interbank FX swaps.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Isha Agarwal investigates how macro-financial frictions, sovereign debt composition, and regulatory policies alter commercial bank lending behavior, utilizing granular loan registries and international banking panels to measure credit reallocation.\n* **The Open Question She Keeps Returning To:** How do government financing choices and regulatory balance-sheet constraints distort the transmission of monetary policy and crowd out private investment through commercial banking systems?\n* **Methods She Would Expect You to Learn:** Microeconometric identification with multi-dimensional fixed effects (Khwaja-Mian), loan-level panel data cleaning, local projections (Jordà), and structural credit regression modeling.\n* **The One Paper to Cite in Your Outreach:** Agarwal, Jaume, Tellez & Tobal (Conditionally Accepted, *Review of Finance*), *\"How does the Composition of Government Financing Affect the Size of Crowding Out? Evidence from Mexico.\"*"
  },
  "Christian Dorion": {
    "name": "Christian Dorion",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His supervised master's thesis with Matthew Jurga (*\"Options in Asset Liability Management: Profit-Seeking and Hedging\"*, HEC Montréal, 2021) directly evaluates replacing zero-coupon fixed-income portfolios with option collar strategies, matching your daily balance-sheet duration management and liability matching on City Bank's ALM desk.\n* **Paper-to-Asset Mapping 2:** His foundational econometric paper on nonlinear filtering in affine term structure models (*Management Science*, 2014) provides the exact mathematical framework needed to calibrate latent factor term-structure models across your database of all 310 outstanding Bangladesh government securities.\n* **Paper-to-Asset Mapping 3:** His background under Turing Award laureate Yoshua Bengio in computer science and operations research aligns with your Python automated scrapers, data pipelines, and quantitative programming toolkit.",
      "how_contribute": "(Feasible 16–24 Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Synthetic Derivative Collars for Banking-Book Duration Hedging in Thin Sovereign Debt Markets.\"*\n* **Core Research Question:** Can commercial banks hedge duration risk and cash-flow mismatches using synthetic option collar structures constructed from interbank USD/BDT FX swaps and repo contracts when secondary markets for government bonds are illiquid?\n* **Methodology & Data:** Extend the Heston-Nandi GARCH option valuation framework utilized by Dorion and Jurga to synthetic OTC derivative contracts, using Hasibul's cash-flow schedules of all 310 Bangladesh sovereign bonds and high-frequency interbank swap transaction records.\n* **Lab Utility:** Can write clean, modular Python and R code for parameter filtering, affine term-structure estimation, and high-frequency option return regressions.",
      "why_take_you": "* **Bridging Data & Computation:** Combines advanced CFA charterholder finance knowledge (EQF Level 7 equivalent) with working algorithmic skills, requiring zero onboarding on derivatives mathematics or banking balance-sheet mechanics.\n* **Applied Institutional Mindset:** Dorion bridges academia and industry as CEO of Delta Vega (structured product risk scoring); he values candidates who understand actual financial contracts and institutional market plumbing.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Countered by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and completing 27 credits of mathematics, statistics, and econometrics.\n* **Objection (Language / Program Structure):** HEC Montréal's MSc in Financial Engineering is fully offered in English, lasts 16 to 24 months (clearing the IRCC spousal OWP gate), and qualifies for Quebec research-stream tuition differential fee exemptions.",
      "hook_line": "> *\"I follow your 2023 Review of Financial Studies paper on inflation and default risk and noted your co-supervision of Matthew Jurga’s thesis on options in asset-liability management; on our ALM desk at City Bank in Bangladesh, we navigate the empirical version of Jurga's framework where managing duration across a $4.2B balance sheet requires evaluating derivative collar structures in an illiquid sovereign debt market.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Macro Inflation, Default Risk, and Equity Valuations",
        "research_question": "How does unexpected macroeconomic inflation alter corporate default probability and equity risk premia when corporate debt is nominal and prices are sticky?",
        "data": "Firm-level Compustat financials, CRSP equity returns, Markit CDS spreads, and Mergent FISD corporate default events spanning 1970 to 2020.",
        "method": "Structural GMM estimation of a continuous-time general equilibrium macro-finance model with sticky prices, nominal debt issuance, and recursive Epstein-Zin preferences.",
        "core_finding": "Unanticipated inflation reduces corporate default risk in the short to medium term by eroding the real value of fixed nominal debt obligations faster than it compresses operating profits; simultaneously, discount-rate spikes depress equity multiples.",
        "limitations": "Assumes firms issue only fixed-rate nominal debt; does not model floating-rate bank loans or corporate inflation hedging via swaps.",
        "extension": "Evaluate corporate default probabilities in an emerging economy where commercial bank loans carry floating interest rates that adjust rapidly to central bank rate hikes.",
        "public_data": "Central bank banking statistics on non-performing loans, national consumer price indices, and published prime lending rates.",
        "desk_observation": "When inflation rose in Bangladesh, commercial borrowers with fixed-rate loans experienced declining debt-service burdens in real terms, whereas borrowers on floating rates suffered immediate cash-flow distress.\n\n---"
      },
      {
        "num": 2,
        "title": "What Drives Expected Stock Returns? Long-Run Risk and Endogenous Leverage",
        "research_question": "How does the endogenous financing response of firms to persistent macroeconomic growth shocks affect the market equity risk premium?",
        "data": "75 years of US cross-sectional equity returns and corporate debt issuances (1947–2022).",
        "method": "Dynamic structural capital structure model embedded in a Bansal-Yaron (2004) long-run consumption risk framework with time-varying macroeconomic volatility.",
        "core_finding": "Long-run risk accounts for 75% of the equity risk premium; models that treat corporate leverage as constant artificially double the estimated risk premium by ignoring firms' endogenous deleveraging responses to negative growth shocks.",
        "limitations": "Assumes frictionless corporate debt recapitalization without bankruptcy court delays.",
        "extension": "Measure the interaction between long-run sovereign growth shocks and corporate leverage in an economy with underdeveloped public equity markets.",
        "public_data": "National income accounts from the Bureau of Statistics and listed corporate balance sheets from the Dhaka Stock Exchange.",
        "desk_observation": "Listed firms in Bangladesh increase bank borrowing during economic uncertainty because equity rights issues are administratively slow, amplifying systematic risk across the banking sector.\n\n---"
      },
      {
        "num": 3,
        "title": "The Factor Structure of 0DTE Option Returns",
        "research_question": "What systematic risk factors compensate returns on zero-days-to-expiration (0DTE) index options, and are these markets informational efficient?",
        "data": "Intraday 30-minute S&P 500 (SPX) index option quotes across strikes and maturities from 45 minutes to 15 days from CBOE (2022–2025).",
        "method": "Cross-sectional Fama-MacBeth asset pricing regressions on intraday option returns testing a 6-factor risk model (realized return moments and variance dynamics components).",
        "core_finding": "0DTE option returns compensate investors for warehousing gamma risk and absorbing jump-skewness shocks; apparent pricing alphas cannot be monetized due to market maker inventory carrying costs and transaction spreads.",
        "limitations": "Restricted to S&P 500 index options; execution slippage parameters depend on specific institutional broker algorithms.",
        "extension": "Analyze intraday price formation in frontier foreign exchange forward markets during central bank policy rate announcements.",
        "public_data": "Published intraday interbank foreign exchange transaction records and BAFEDA indicative rates.",
        "desk_observation": "On central bank monetary announcement days, interbank FX forward quotes widen within minutes, reflecting dealer inventory risk rather than fundamental macro news.\n\n---"
      },
      {
        "num": 4,
        "title": "Asset Pricing in a Concentrated Economy",
        "research_question": "How does industrial market concentration alter the cross-sectional pricing of systematic risk in equity markets?",
        "data": "US firm-level sales from Compustat and equity returns from CRSP (1973–2024).",
        "method": "General equilibrium macro-finance model with Kimball preferences where market concentration alters markups and slows long-run productivity growth; tested via cross-sectional asset pricing regressions.",
        "core_finding": "Exposure to market concentration risk earns a negative risk premium; the security market line flips from positive slope to negative slope during rising-concentration regimes.",
        "limitations": "Herfindahl-Hirschman Index (HHI) measures based on public firms underestimate concentration from private market competitors.",
        "extension": "Test the asset pricing implications of banking sector concentration on interbank money market borrowing rates.",
        "public_data": "Central bank banking statistics on asset concentration across top 5 commercial banks.",
        "desk_observation": "In Bangladesh, the top 5 private commercial banks control over 35% of interbank liquidity, allowing them to exert price leadership during primary Treasury bill auctions.\n\n---"
      },
      {
        "num": 5,
        "title": "Higher-Order Risk Aversion in Option Pricing",
        "research_question": "Are skewness and kurtosis preferences sufficient to explain empirical option-implied volatility smiles across multiple horizons?",
        "data": "1,378,317 European option prices on the S&P 500 index from OptionMetrics (1996–2018).",
        "method": "Non-parametric estimation of risk-neutral density functions decomposed into higher-order generalized risk aversion parameters.",
        "core_finding": "Third and fourth moments (skewness and kurtosis) fail to fit short-maturity out-of-the-money option prices; fifth and higher-order moment preferences are statistically necessary to eliminate pricing residuals.",
        "limitations": "Cross-sectional density estimation assumes no market microstructure noise in deep out-of-the-money quotes.",
        "extension": "Extract higher-order risk preferences from sovereign bond auction bid distributions during fiscal deficit surges.",
        "public_data": "Central bank auction bid volumes and price distributions across 310 sovereign instruments.",
        "desk_observation": "Bidding schedules in sovereign debt auctions exhibit extreme tail-risk clustering during political uncertainty, producing fat-tailed yield distributions.\n\n---"
      },
      {
        "num": 6,
        "title": "Nonlinear Kalman Filtering in Affine Term Structure Models",
        "research_question": "Does the unscented Kalman filter eliminate parameter estimation bias in multi-factor affine term structure models compared to the extended Kalman filter?",
        "data": "Weekly zero-coupon US Treasury yields across maturities from 3 months to 10 years (1970–2010).",
        "method": "Structural estimation of 3-factor Gaussian and CIR affine term structure models comparing the Unscented Kalman Filter (UKF) against the Extended Kalman Filter (EKF).",
        "core_finding": "The Unscented Kalman Filter achieves significantly lower parameter estimation bias and pricing errors, particularly during high-volatility monetary regimes where yield nonlinearities violate first-order Taylor expansions.",
        "limitations": "Computationally intensive relative to linear Gaussian state-space models.",
        "extension": "Estimate a 3-factor affine term structure model on Bangladesh sovereign bond yields using the unscented Kalman filter to account for yield capping regimes.",
        "public_data": "Bangladesh Bank primary auction yields and secondary market trading schedules.",
        "desk_observation": "Extended Kalman filtering breaks down during regime changes when policy caps are imposed; nonlinear filtering is mathematically required to avoid parameter divergence.\n\n---"
      },
      {
        "num": 7,
        "title": "Volatility Risk Premia and Jumps in Credit Default Swap Spreads",
        "research_question": "How much of the cross-sectional variation in corporate credit default swap spreads is explained by equity volatility risk premia versus jump risk?",
        "data": "Daily 5-year corporate CDS spreads from Markit merged with OptionMetrics equity options and Compustat balance sheets (2001–2010).",
        "method": "Structural credit risk model with stochastic volatility and Poisson jumps in firm asset value, estimated via quasi-maximum likelihood.",
        "core_finding": "Equity volatility risk premia and jump intensity explain over 60% of the cross-sectional variation in corporate CDS spreads, dominating traditional accounting leverage ratios.",
        "limitations": "CDS spreads during the 2008 financial crisis were distorted by counterparty risk and short-selling bans.",
        "extension": "Model sovereign credit risk spreads using domestic equity market jump intensity and foreign exchange volatility.",
        "public_data": "DSE broad equity index intraday values and BAFEDA foreign exchange market rates.",
        "desk_observation": "Interbank money market borrowing spreads spike immediately following sharp drops in the domestic equity market, reflecting systemic balance-sheet jump risk.\n\n---"
      },
      {
        "num": 8,
        "title": "Markov-Switching vs. Long-Memory GARCH in Option Pricing",
        "research_question": "Can discrete Markov-switching GARCH models outperform continuous long-memory GARCH models in out-of-sample option pricing?",
        "data": "Daily S&P 500 index returns and European call option prices from OptionMetrics (1996–2004).",
        "method": "Out-of-sample pricing performance comparison between component GARCH models and Hamilton-style Markov-switching GARCH models.",
        "core_finding": "Component GARCH models with separate long-run and short-run volatility components consistently beat Markov-switching GARCH models because regime-switching models over-react to transitory market spikes.",
        "limitations": "Option evaluation assumes a representative agent with constant relative risk aversion.",
        "extension": "Compare component GARCH against regime-switching models for forecasting interbank call money rate volatility under corridor interventions.",
        "public_data": "Central bank daily volume-weighted call money interest rates.",
        "desk_observation": "Interbank money market volatility exhibits distinct component persistence: short-run spikes driven by bi-weekly CRR reporting days and long-run trends driven by national trade deficits.\n\n---"
      },
      {
        "num": 9,
        "title": "Bayesian Stochastic Volatility Forecasting",
        "research_question": "Can macroeconomic indicators be integrated into continuous-time stochastic volatility models using tractable Bayesian estimation?",
        "data": "Daily financial asset returns merged with monthly macroeconomic indicators (unemployment, inflation, credit spreads).",
        "method": "Markov Chain Monte Carlo (MCMC) Gibbs sampler with particle filtering for latent volatility paths conditional on exogenous macroeconomic covariates.",
        "core_finding": "Conditioning stochastic volatility on real macroeconomic activity significantly improves 30-day-ahead volatility forecasts compared to univariate stochastic volatility models.",
        "limitations": "High computational sampling latency prevents real-time algorithmic execution.",
        "extension": "Forecast foreign exchange volatility under a managed crawling peg using central bank reserve flows as conditioning covariates.",
        "public_data": "Monthly central bank foreign exchange reserve levels and import settlement data.",
        "desk_observation": "Foreign exchange swap point volatility correlates directly with central bank monthly dollar sales to commercial banks.\n\n---"
      },
      {
        "num": 10,
        "title": "Options in Asset Liability Management (Thesis Direction)",
        "research_question": "Can institutional asset managers replace traditional zero-coupon fixed income immunization portfolios with option collar strategies to enhance returns without compromising solvency?",
        "data": "Canadian Armed Forces pension liability projections (1-year and 3-year horizons) and S&P/TSX index options.",
        "method": "Simulation of collar portfolios (long growth asset, long out-of-the-money protective put, short out-of-the-money covered call) using Heston-Nandi GARCH(1,1) option pricing across multiple interest-rate environments.",
        "core_finding": "While collar strategies require an upfront net premium debit (0.01% to 0.40% of liability present value), they generate up to 0.74% excess return at maturity while guaranteeing the identical floor payoff as bond immunization.",
        "limitations": "Simulated on exchange-traded index options; does not evaluate counterparty credit risk in over-the-counter derivative contracts.",
        "extension": "Model synthetic collar strategies for commercial bank ALM portfolios using interbank USD/BDT FX swaps and repo contracts in a market without exchange-traded options.",
        "public_data": "Central bank scheduled bank balance sheet reports and interbank repo yield tables.",
        "desk_observation": "Commercial banks managing duration gaps cannot buy long-dated options; they replicate synthetic collars by combining Treasury bills with forward currency contracts.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Christian Dorion combines computer science, operations research, and empirical asset pricing to investigate how macroeconomic forces (inflation, concentration, market microstructure) shape equity, credit, and derivative valuations.\n* **The Open Question He Keeps Returning To:** How can non-linear derivative structures and advanced financial econometrics be deployed to manage institutional balance-sheet risk and asset-liability duration under incomplete market frictions?\n* **Methods He Would Expect You to Learn:** Nonlinear Kalman filtering, GMM estimation of macro-finance models, Heston-Nandi GARCH option valuation, and machine learning algorithms for asset pricing.\n* **The One Paper to Cite in Your Outreach:** Bhamra, Dorion, Jeanneret & Weber (2023), *\"High Inflation: Low Default Risk and Low Equity Valuations,\"* *The Review of Financial Studies*, 36(3), 1192–1252."
  },
  "Enchuan Shao": {
    "name": "Enchuan Shao",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His paper *\"The Impact of Return on Collateral in a Channel System\"* (*Economic Inquiry*, 2020) models how the return on collateral pledged for central bank daylight credit alters interbank interest rate spreads inside an interest-rate corridor, directly connecting with your daily trading of interbank repo and call money under Bangladesh Bank's corridor framework.\n* **Paper-to-Asset Mapping 2:** His working papers on deposit insurance reforms and bank risk-taking (*SSRN*, 2025, co-authored with Abdullah Mamun) evaluate commercial bank risk-shifting under regulatory safety nets, matching your professional responsibilities managing statutory liquidity and credit risk at City Bank PLC.\n* **Paper-to-Asset Mapping 3:** His 6-year background as Senior Analyst at the Bank of Canada means he values operational understanding of central bank market plumbing, payment finality, and settlement collateral. He has an established history of publishing joint papers with his graduate students (e.g., Kwabena Bediako in *Economic Inquiry*, Danusha Rajapaksa in *JEBO*).",
      "how_contribute": "(Feasible 24-Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"The Opportunity Cost of Collateral in an Emerging Market Channel System: Empirical Evidence from Bangladesh Bank's Operational Corridor.\"*\n* **Core Research Question:** How does the supply of sovereign Treasury bills alter the spread between the central bank repo policy rate and overnight interbank call money rates when commercial banks must intermediate public deficit debt?\n* **Methodology & Data:** Extend Shao and Bediako’s (2020) search-theoretic corridor model to incorporate statutory liquidity constraints (SLR), calibrating the model using daily primary auction cut-offs and volume-weighted call money rates from Bangladesh Bank.\n* **Lab Utility:** Can write Python and Stata programs to clean high-frequency interbank auction logs and payment system data for his active research projects.",
      "why_take_you": "* **Student Co-Authorship Record:** Shao actively publishes with his graduate students and guides them into top Ph.D. programs and policy roles (e.g., Bediako to Alberta Ph.D., James Wattam to the Department of Finance Canada).\n* **Practitioner-Quant Match:** CFA charterholder (all 3 levels passed first attempt, EQF Level 7 equivalent) with an undergraduate Thesis GPA of 4.00/4.00 and 27 credits of mathematics and econometrics.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and completing 9 dedicated quantitative courses in mathematics, statistics, and econometrics.\n* **Objection (Department Structure):** University of Saskatchewan’s MA in Economics is a 24-month program that clears the IRCC 16-month spousal OWP gate, funded through departmental Teaching Assistantships ($18,000–$22,000/yr).",
      "hook_line": "> *\"I follow your Economic Inquiry paper with Kwabena Bediako on the impact of return on collateral in a channel system and noted your Bank of Canada background; on our treasury desk at City Bank in Bangladesh, I manage interbank liquidity daily under Bangladesh Bank’s corridor, where the return on collateralized repo dictates whether overnight rates clear near the floor or ceiling.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Collateral and Interbank Rate Spreads in Channel Systems",
        "research_question": "How does the yield on collateral pledged for central bank overdraft facilities affect interbank market-clearing rates in an interest rate corridor?",
        "data": "Analytical general equilibrium monetary search model calibrated to Bank of Canada Large Value Transfer System (LVTS) parameters.",
        "method": "Dynamic general equilibrium model with risk-neutral commercial banks subject to idiosyncratic settlement shocks, choosing intraday collateral allocations between central bank borrowing and interbank lending.",
        "core_finding": "An increase in the return on collateral increases banks' opportunity cost of pledging paper to the central bank, pushing the equilibrium interbank rate upward toward the lending facility ceiling, independent of central bank aggregate reserve supply.",
        "limitations": "Assumes frictionless interbank matching; does not incorporate bank capital adequacy or leverage constraints.",
        "extension": "Test channel system spreads in an emerging economy where collateral supply is volatile due to primary fiscal deficit monetization.",
        "public_data": "Central bank daily repo auction volumes, standing deposit facility usage, and interbank call money rates.",
        "desk_observation": "When Bangladesh Bank increased primary Treasury bill yields, commercial banks preferred holding bills over lending in the unsecured call money market, driving call rates up to the corridor ceiling.\n\n---"
      },
      {
        "num": 2,
        "title": "Miner Competition and Cryptocurrency Transaction Fees",
        "research_question": "How does competitive proof-of-work mining capacity affect equilibrium transaction priority fees in decentralized settlement ledgers?",
        "data": "Blockchain transaction data and Bitcoin network difficulty adjustments (2016–2022).",
        "method": "Game-theoretic industrial organization model of queue priority pricing under stochastic block arrival times.",
        "core_finding": "Higher mining competition reduces transaction fee variance but creates congestion deadweight losses during transaction surges.",
        "limitations": "Proof-of-work specific; does not evaluate proof-of-stake validation.",
        "extension": "Compare priority transaction fee queuing against retail mobile financial services (MFS) network processing fees.",
        "public_data": "Public blockchain mempool data and national digital payment settlement logs.",
        "desk_observation": "In high-volume mobile payment networks (bKash), transaction batching creates settlement queues that parallel blockchain mempool priority dynamics.\n\n---"
      },
      {
        "num": 3,
        "title": "Deposit Insurance Reforms and Bank Risk-Taking",
        "research_question": "Does increasing statutory deposit insurance coverage induce moral hazard and excessive risk-taking across international banking sectors?",
        "data": "Cross-country panel of commercial banks across 45 countries (2000–2020).",
        "method": "Staggered difference-in-differences regressions evaluating bank risk metrics (Z-score, non-performing loan ratios) around deposit insurance reform events.",
        "core_finding": "Higher deposit insurance coverage significantly increases commercial bank risk-taking, with risk-shifting concentrated in banks with low franchise value and weak capital buffers.",
        "limitations": "Multi-country policy changes may coincide with broader macroprudential reforms.",
        "extension": "Measure bank portfolio risk-shifting following deposit insurance limit increases in South Asia.",
        "public_data": "Bangladesh Bank deposit insurance trust fund reports and scheduled bank balance sheet statistics.",
        "desk_observation": "Small private banks with low credit ratings offer elevated deposit rates to attract retail funds, knowing depositors rely on the statutory deposit insurance guarantee.\n\n---"
      },
      {
        "num": 4,
        "title": "Deposit Insurance and Depositor Discipline in the US",
        "research_question": "Do uninsured depositors discipline commercial banks during financial distress, and did the 2008 FDIC coverage expansion mute this discipline?",
        "data": "Quarterly US commercial bank call reports from the FDIC (1995–2015).",
        "method": "Panel fixed effects regressions tracking deposit growth sensitivity to bank asset risk metrics before and after the Emergency Economic Stabilization Act of 2008.",
        "core_finding": "Raising the FDIC insurance limit from $100k to $250k eliminated uninsured depositor runoff for medium-sized regional banks, muting market discipline.",
        "limitations": "Does not account for deposit brokering networks (e.g., IntraFi/CDARS).",
        "extension": "Evaluate whether corporate treasury depositors pull uninsured balances from distressed commercial banks into sovereign Treasury bills during banking crises.",
        "public_data": "Central bank scheduled bank quarterly financial statements and deposit tier breakdowns.",
        "desk_observation": "Corporate clients at City Bank monitor bank credit ratings closely; when banking sector stress emerged, large corporate depositors demanded immediate reallocation into Treasury bills.\n\n---"
      },
      {
        "num": 5,
        "title": "Pricing Settlement Priority: Structural Evidence from Bitcoin",
        "research_question": "Can the price of settlement priority in payment networks be estimated structurally from mempool order queues?",
        "data": "Granular transaction-level mempool broadcast records collected via a custom dedicated Bitcoin node logger (2022–2025).",
        "method": "Structural estimation of a continuous-time priority queuing model where users trade off time delays against transaction fees.",
        "core_finding": "The demand for immediate settlement priority is highly price-inelastic during volatility spikes, generating extreme fee spikes that reflect settlement urgency rather than ledger processing costs.",
        "limitations": "Mining pool transaction selection algorithms may deviate from pure fee maximization due to private transaction acceleration agreements.",
        "extension": "Estimate settlement priority demand in interbank RTGS payment systems during high-value tax clearing deadlines.",
        "public_data": "Central bank Real-Time Gross Settlement (RTGS) transaction volume and hourly clearing reports.",
        "desk_observation": "On corporate tax payment cut-off days, interbank RTGS queues back up, forcing bank treasury desks to pay premium rates in the call money market to secure liquidity for transaction clearance.\n\n---"
      },
      {
        "num": 6,
        "title": "Payment Services and Bank Competition in Open Banking",
        "research_question": "How does customer transaction data portability under open banking regulations affect lending competition between traditional banks and fintech lenders?",
        "data": "Theoretical industrial organization banking model.",
        "method": "Two-stage game where banks and fintechs compete for payment services to acquire informational screening advantages over loan applicants.",
        "core_finding": "Open banking reduces incumbents' informational rents on payments but can induce banks to cross-subsidize payment services while raising borrowing costs for informationally opaque borrowers.",
        "limitations": "Assumes perfect data interoperability across technological interfaces.",
        "extension": "Model competition between commercial banks and mobile financial services (MFS) platforms for merchant micro-lending.",
        "public_data": "Central bank payment systems department annual reports and retail merchant payment surveys.",
        "desk_observation": "bKash's transaction data allows it to underwrite nano-loans instantly, forcing commercial banks to partner with MFS providers to access retail credit markets.\n\n---"
      },
      {
        "num": 7,
        "title": "The Microstructure of Stablecoin Price Alignment",
        "research_question": "What market microstructure mechanisms keep centralized stablecoins (Tether/USDT) aligned to their fiat parities in secondary exchange markets?",
        "data": "Millisecond-level order book depth and trade records from major cryptocurrency spot exchanges.",
        "method": "High-frequency event study and cointegration modeling of order book depth, measuring arbitrage efficiency across trading venues.",
        "core_finding": "Secondary market stablecoin parities are maintained primarily by high-frequency market maker inventory rebalancing across centralized exchanges rather than primary issuer redemptions.",
        "limitations": "Exchange wash-trading may distort observed volume and order book depth metrics.",
        "extension": "Examine exchange rate parity maintenance in unofficial digital cross-currency remittance corridors.",
        "public_data": "Central bank monthly foreign exchange remittance inflow statistics.",
        "desk_observation": "Unofficial digital currency channels create persistent parallel exchange rates that diverge from official crawling peg bands during foreign currency liquidity shortages.\n\n---"
      },
      {
        "num": 8,
        "title": "The Cash Paradox in Monetary Economics",
        "research_question": "Why has the demand for physical paper currency expanded relative to GDP across advanced economies despite the near-total adoption of digital payments?",
        "data": "National currency issuance data and payment transaction records across G10 economies (1990–2018).",
        "method": "Search-theoretic monetary model with privacy preferences and tax avoidance motives explaining the currency-to-GDP ratio.",
        "core_finding": "The expansion of cash holdings is driven by store-of-value demand for high-denomination notes and anonymous transactions under negative or low real interest rates.",
        "limitations": "Underground economy transaction volumes are inherently unobservable and estimated via proxy methods.",
        "extension": "Measure physical currency hoarding during domestic banking sector stress in South Asia.",
        "public_data": "Central bank currency in circulation statistics and scheduled bank vault cash reports.",
        "desk_observation": "Currency in circulation outside the banking sector surged in Bangladesh during bank restructuring announcements, reflecting retail depositors hoarding physical banknotes.\n\n---"
      },
      {
        "num": 9,
        "title": "Credit Arrangements in Search Equilibrium",
        "research_question": "How does the coexistence of trade credit and fiat money alter macroeconomic efficiency in decentralized trade?",
        "data": "Theoretical Lagos-Wright monetary search model.",
        "method": "General equilibrium search model where buyers and sellers can settle transactions using either cash or bilateral trade credit subject to enforcement frictions.",
        "core_finding": "While trade credit relaxes liquidity constraints, it generates debt overhang that distorts production incentives during economic downturns.",
        "limitations": "Assumes binary production technology.",
        "extension": "Evaluate how supplier trade credit buffers manufacturing supply chains when commercial bank working capital loans are rationed.",
        "public_data": "National manufacturing output data and commercial bank industrial credit growth reports.",
        "desk_observation": "Ready-made garment (RMG) exporters in Bangladesh rely on 90-to-120 day trade credit (back-to-back letters of credit) to maintain operations when commercial banks face lending caps.\n\n---"
      },
      {
        "num": 10,
        "title": "Counterfeit Quality and Verification in Monetary Exchange",
        "research_question": "How does the threat of high-quality counterfeiting alter the velocity of money and merchant verification behavior?",
        "data": "Bank of Canada banknote survey data and laboratory experimental results.",
        "method": "Search-theoretic model with adverse selection and costly authenticity verification.",
        "core_finding": "Higher counterfeit note quality paradoxically increases cash circulation velocity as uninformed merchants pass suspect notes rather than paying authentication costs.",
        "limitations": "Experimental verification parameters may not capture legal penalties in real-world retail markets.",
        "extension": "Model cash authentication costs and digital payment adoption in cash-intensive retail sectors.",
        "public_data": "Central bank annual reports on currency management and counterfeit note seizures.",
        "desk_observation": "Commercial bank cash processing centers invest heavily in high-speed sorting machines because counterfeit note penalties are levied directly on commercial bank clearing accounts.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Enchuan Shao combines search-theoretic monetary modeling with structural empirical estimation to investigate central bank market infrastructure, interest-rate channel systems, payment networks, and banking regulatory discipline.\n* **The Open Question He Keeps Returning To:** How do institutional settlement rules, collateral constraints, and payment network frictions govern market-clearing interest rates and credit allocations across financial institutions?\n* **Methods He Would Expect You to Learn:** Search-theoretic monetary theory (Lagos-Wright framework), general equilibrium corridor modeling, structural queue estimation, and dynamic panel econometrics.\n* **The One Paper to Cite in Your Outreach:** Shao & Bediako (2020), *\"The Impact of Return on Collateral in a Channel System,\"* *Economic Inquiry*, 58(3), 1314–1341."
  },
  "Abdullah Mamun": {
    "name": "Abdullah Mamun",
    "dossier": {
      "why_fit": "* **Paper-to-Asset Mapping 1:** His forthcoming research in *The British Accounting Review* on loan loss provisioning in community banks and earnings smoothing directly maps to your professional experience evaluating corporate credit risks, provisioning models, and non-performing asset schedules during your City Bank rotation.\n* **Paper-to-Asset Mapping 2:** His work on credit derivatives and loan yields (*The Financial Review*, 2022) and deposit insurance discipline (*SSRN*, 2025) connects with your daily front-office execution of interbank borrowing, regulatory liquidity compliance (CRR/SLR), and treasury cash flows.\n* **Paper-to-Asset Mapping 3:** As an economics alumnus from the University of Dhaka (B.S.S. 1995, M.S.S. 1996) and Acting Department Head at Edwards, he understands the academic training of Bangladeshi economics graduates and possesses direct authority over graduate assistantships and supervisor matching.",
      "how_contribute": "(Feasible 24-Month Master's Thesis)\n* **Proposed Thesis Topic:** *\"Earnings Smoothing, Regulatory Forbearance, and Timely Loan Loss Recognition: Empirical Evidence from Commercial Banks in Bangladesh.\"*\n* **Core Research Question:** Do commercial banks utilize subjective loan loss provisioning discretion to smooth earnings and conceal non-performing loans during periods of central bank regulatory forbearance?\n* **Methodology & Data:** Apply dynamic panel GMM estimators (Arellano-Bond / Blundell-Bond) on bank-level balance-sheet datasets across private and state-owned commercial banks in Bangladesh, testing whether provisioning reflects forward-looking credit risk or accounting smoothing.\n* **Lab Utility:** Can clean, structure, and maintain banking panel datasets and supervisory call records in Stata, Python, and R for his active research projects in banking risk.",
      "why_take_you": "* **Shared Academic Pedigree:** Fellow economics graduate from Dhaka (BSS in Economics from BUP; CFA charterholder) who brings both rigorous quantitative preparation and firsthand insight into South Asian banking sector governance.\n* **Frontline Banking Balance-Sheet Mastery:** Hasibul has managed daily liquidity on a live trading desk ($90–110M daily volume), completed credit risk evaluations across commercial enterprises, and understands banking regulations from the inside out.",
      "objections_answers": "* **Objection (CGPA 3.30/4.00):** Addressed by an empirical undergraduate Thesis GPA of **4.00/4.00**, passing all three CFA levels on first attempt while working full time on a trading desk, and completing 9 dedicated quantitative courses in mathematics, statistics, and econometrics.\n* **Objection (Program Structure & Funding):** The Edwards MSc in Finance is a 24-month research master's degree (fully clearing the IRCC 16-month spousal OWP gate) offering departmental funding packages for incoming international students who apply ahead of the **December 15 priority deadline**.",
      "hook_line": "> *\"I follow your forthcoming British Accounting Review paper on loan loss provisioning in banks and noted your shared academic background from the University of Dhaka Economics department; on our ALM desk at City Bank in Dhaka, I observe how regulatory forbearance and liquidity constraints alter commercial bank credit provisioning and balance-sheet risk daily.\"*\n\n---"
    },
    "papers_count": 10,
    "papers": [
      {
        "num": 1,
        "title": "Loan Loss Provisioning in Community Banks",
        "research_question": "Do smaller community banks use discretionary loan loss provisioning to smooth earnings over the business cycle or to reflect timely forward-looking credit risk?",
        "data": "Quarterly US commercial bank call reports from 2002 to 2020.",
        "method": "Dynamic panel system GMM regressions modeling loan loss provisions ($\\text{LLP}_{i, t}$) against non-performing loans ($\\text{NPL}_{i, t}$), loan growth, and pre-provision earnings ($\\text{EBTP}_{i, t}$):\n   $$\\text{LLP}_{i, t} = \\alpha_i + \\beta_1 \\text{NPL}_{i, t} + \\beta_2 \\Delta \\text{NPL}_{i, t+1} + \\beta_3 \\text{EBTP}_{i, t} + \\boldsymbol{\\gamma}' \\mathbf{X}_{i, t} + \\epsilon_{i, t}$$",
        "core_finding": "Community banks exhibit significant earnings-smoothing behavior ($\\beta_3 > 0$), delaying the recognition of loan losses until economic downturns when capital buffers are already impaired.",
        "limitations": "Focuses on US community banking data; does not evaluate how regulatory forbearance policies alter provisioning incentives in emerging economies.",
        "extension": "Test whether commercial banks in South Asia accelerate or suppress loan loss provisioning during central bank loan moratorium regimes.",
        "public_data": "Scheduled commercial bank quarterly financial statements published by Bangladesh Bank.",
        "desk_observation": "When central bank repayment moratoriums were announced, private commercial banks reduced reported loan loss provisions to maintain reported paper profitability, deferring balance-sheet write-offs.\n\n---"
      },
      {
        "num": 2,
        "title": "Credit Derivatives and Commercial Loan Yields",
        "research_question": "Does a commercial bank’s active participation in credit default swaps (CDS) reduce the interest rates it charges corporate borrowers on syndicated loans?",
        "data": "DealScan syndicated corporate loan contracts merged with Compustat and Federal Reserve bank call reports (2001–2017).",
        "method": "Propensity score matching (PSM) and instrumental variable regressions controlling for bank endogenous selection into derivative hedging.",
        "core_finding": "Banks participating in credit derivatives charge corporate borrowers **15 to 28 basis points lower loan spreads**, with interest rate savings concentrated among transparent investment-grade corporate borrowers.",
        "limitations": "DealScan covers primarily large syndicated corporate loans; findings may not extend to bilateral SME lending.",
        "extension": "Evaluate corporate loan interest rate determination in an emerging market lacking credit derivative risk-transfer markets.",
        "public_data": "Central bank commercial bank interest rate spread bulletins and corporate loan classification tables.",
        "desk_observation": "In the absence of CDS markets, commercial banks manage borrower default risk through mandatory Treasury collateral pledges and personal director guarantees rather than market-based hedging.\n\n---"
      },
      {
        "num": 3,
        "title": "Noninterest Income Activities and Bank Holding Company Performance",
        "research_question": "How do non-traditional banking activities (investment banking fees, trading revenue, asset management) affect the systematic risk and profitability of bank holding companies?",
        "data": "Quarterly US Bank Holding Company financial filings (FR Y-9C) from 1990 to 2019.",
        "method": "Panel fixed effects modeling bank ROA, return volatility, and structural default probability (Z-score) conditional on noninterest income shares.",
        "core_finding": "While fee-based fiduciary activities diversify interest margin shocks during normal times, market trading revenue significantly increases bank systematic tail risk and crash vulnerability during crises.",
        "limitations": "Regulatory call reports aggregate diverse fee lines into broad categories.",
        "extension": "Measure how commercial bank foreign exchange trading profits buffer net interest margin compressions under regulatory interest rate ceilings.",
        "public_data": "Bangladesh Bank annual financial stability reports and individual bank annual reports.",
        "desk_observation": "During domestic lending rate cap regimes, City Bank's treasury FX dealing and government securities trading gains accounted for an outsized portion of total operating profits, offsetting compressed loan margins.\n\n---"
      },
      {
        "num": 4,
        "title": "Growth Dynamics and Policy for Credit Unions",
        "research_question": "What macro-financial factors govern asset growth, regulatory compliance, and insolvency risk among Canadian credit unions?",
        "data": "Annual financial records of Canadian provincial credit unions from 2005 to 2020.",
        "method": "Dynamic panel regression analyzing economies of scale, capital accumulation, and industry consolidation.",
        "core_finding": "Stricter regulatory capital requirements impose disproportionate fixed compliance costs on smaller credit unions, accelerating mergers and acquisitions into larger regional institutions.",
        "limitations": "Provincial regulatory differences complicate national panel comparisons.",
        "extension": "Examine cooperative banking and microfinance institution (MFI) liquidity pooling under central bank oversight in Bangladesh.",
        "public_data": "Microcredit Regulatory Authority (MRA) annual performance reports.",
        "desk_observation": "Cooperative micro-lenders in Bangladesh face severe liquidity crunches during agricultural planting cycles, relying on commercial bank term deposits for liquidity support.\n\n---"
      },
      {
        "num": 5,
        "title": "Bank Mergers and Operating Performance",
        "research_question": "Do regulatory-enforced bank mergers improve long-term operational efficiency compared to voluntary market mergers?",
        "data": "US commercial bank mergers and acquisitions from 1985 to 2015.",
        "method": "Difference-in-differences event study tracking post-merger cost-to-income ratios, return on assets, and branch rationalization.",
        "core_finding": "Voluntary market-driven mergers generate persistent operational efficiency gains within 3 years; regulatory-enforced distressed bank acquisitions fail to improve efficiency due to legacy non-performing assets.",
        "limitations": "Event study windows cannot fully isolate confounding post-merger macroeconomic shocks.",
        "extension": "Model the operational and credit risk implications of forced commercial bank amalgamations in Bangladesh.",
        "public_data": "Bangladesh Bank bank resolution guidelines and merger announcements.",
        "desk_observation": "Merging weak banks with solvent institutions contaminates the acquiring bank's balance sheet, creating immediate deposit runs and interbank funding resistance from peer banks.\n\n---"
      },
      {
        "num": 6,
        "title": "Regulatory Changes and Bank Income Smoothing",
        "research_question": "How did SEC accounting scrutiny and regulatory capital rules in 1999 and 2001 alter discretionary income smoothing across US commercial banks?",
        "data": "Quarterly bank call report data from 1995 to 2010.",
        "method": "Discontinuous policy event regressions tracking discretionary accruals and loan loss reserve adjustments around regulatory policy changes.",
        "core_finding": "Regulatory scrutiny temporarily curbed income smoothing, but banks adapted by using realized gains on available-for-sale (AFS) securities to manage reported net income.",
        "limitations": "Does not distinguish between fair-value and amortized-cost asset portfolios.",
        "extension": "Test whether commercial banks use realized gains from primary Treasury bond trading to smooth reported quarterly earnings.",
        "public_data": "Commercial bank quarterly financial reports and central bank primary dealer performance tables.",
        "desk_observation": "When Treasury bill yields declined, bank treasury desks realized capital gains on government securities books to offset corporate loan provisioning charges.\n\n---"
      },
      {
        "num": 7,
        "title": "Deposit Insurance Reforms and Bank Moral Hazard",
        "research_question": "Does raising statutory deposit insurance coverage induce excessive risk-taking across international banking systems?",
        "data": "Cross-country panel of commercial banks across 45 countries (2000–2020).",
        "method": "Staggered difference-in-differences evaluating bank risk metrics (Z-score, non-performing loan ratios) around national deposit insurance reform dates.",
        "core_finding": "Expanding deposit insurance coverage significantly increases commercial bank risk-taking, with risk-shifting concentrated in institutions with low charter values and weak market discipline.",
        "limitations": "Reforms often coincide with broader financial deregulation packages.",
        "extension": "Evaluate commercial bank portfolio risk-shifting following deposit insurance limit increases in Bangladesh.",
        "public_data": "Bangladesh Bank deposit insurance trust fund reports and scheduled bank balance sheet statistics.",
        "desk_observation": "High-risk commercial banks offer elevated deposit rates to attract retail funds, knowing depositors rely on the statutory deposit insurance guarantee.\n\n---"
      },
      {
        "num": 8,
        "title": "Deposit Insurance and Depositor Discipline in the US",
        "research_question": "Do uninsured depositors discipline commercial banks during financial distress, and did the 2008 FDIC coverage expansion mute this discipline?",
        "data": "Quarterly US commercial bank call reports from the FDIC (1995–2015).",
        "method": "Panel fixed effects regressions tracking deposit growth sensitivity to bank asset risk metrics before and after the Emergency Economic Stabilization Act of 2008.",
        "core_finding": "Raising the FDIC insurance limit from $100k to $250k eliminated uninsured depositor runoff for medium-sized regional banks, muting market discipline.",
        "limitations": "Does not account for deposit brokering networks (e.g., IntraFi/CDARS).",
        "extension": "Evaluate whether corporate treasury depositors pull uninsured balances from distressed commercial banks into sovereign Treasury bills during banking crises.",
        "public_data": "Central bank scheduled bank quarterly financial statements and deposit tier breakdowns.",
        "desk_observation": "Corporate clients at City Bank monitor bank credit ratings closely; when banking sector stress emerged, large corporate depositors demanded immediate reallocation into Treasury bills.\n\n---"
      },
      {
        "num": 9,
        "title": "Religious Certification and Capital Market Segmentation",
        "research_question": "Does Shariah compliance certification create market segmentation and alter corporate debt pricing in capital markets?",
        "data": "International Sukuk bond issuances and Islamic equity indices across Southeast Asia and the Middle East (2000–2016).",
        "method": "Cross-sectional asset pricing regressions and event study methodologies examining yield spreads between Islamic Sukuk and conventional corporate bonds.",
        "core_finding": "Shariah certification creates dedicated clienteles that lower borrowing costs for certified issuers, but secondary market liquidity is lower due to institutional buy-and-hold mandates.",
        "limitations": "Data restricted to public international Sukuk issuances; OTC private placements unobservable.",
        "extension": "Compare secondary market trading liquidity between sovereign Sukuk bonds and conventional Treasury bonds in Bangladesh.",
        "public_data": "Central bank Islamic Sukuk auction announcements and interbank Islamic money market rate reports.",
        "desk_observation": "City Bank manages both conventional and Islamic banking windows; Islamic interbank liquidity cannot be deployed into conventional Treasury bills, creating persistent liquidity surpluses in Islamic banking wings.\n\n---"
      },
      {
        "num": 10,
        "title": "The Gramm-Leach-Bliley Act and US Banking Risk",
        "research_question": "Did the deregulation of commercial banking and investment banking activities under the Gramm-Leach-Bliley Act (1999) increase systemic banking risk?",
        "data": "Daily stock returns for US commercial banks, investment banks, and insurance firms around legislative voting dates (1997–2000).",
        "method": "Multivariate event study methodology estimating abnormal equity returns and structural changes in market interest rate sensitivity (two-factor equity model).",
        "core_finding": "Large universal banks gained significant market equity value from deregulation, but experienced permanent increases in systematic interest-rate sensitivity and asset volatility.",
        "limitations": "Event study assumes efficient market price adjustment on legislative announcement days.",
        "extension": "Analyze commercial bank systemic risk following the expansion of bank universal banking licenses and primary dealer mandates in South Asia.",
        "public_data": "Central bank primary dealer licensing guidelines and DSE banking sector indices.",
        "desk_observation": "Commercial banks that obtained primary dealer licenses took on massive government debt underwriting commitments, magnifying their balance-sheet sensitivity to central bank interest rate shocks.\n\n---"
      }
    ],
    "synthesis": "* **Research Arc in Three Lines:** Abdullah Mamun investigates commercial bank risk management, discretionary loan loss provisioning, depositor discipline, and financial institutions regulation, focusing on how accounting choices and regulatory safety nets alter credit risk.\n* **The Open Question He Keeps Returning To:** How do banking regulations (deposit insurance, provisioning rules, capital requirements) interact with management incentives to govern risk-taking and solvency across commercial and cooperative financial institutions?\n* **Methods He Would Expect You to Learn:** Dynamic panel econometrics (system GMM, Arellano-Bond), event study methodology, difference-in-differences, and propensity score matching.\n* **The One Paper to Cite in Your Outreach:** He, Mamun & Mishra (Forthcoming), *\"Loan Loss Provisioning in Community Banks – A Study Using Community Banking Data,\"* *The British Accounting Review*."
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROFESSORS_DEEP };
}
