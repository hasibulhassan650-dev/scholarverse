/* ============================================================================
   OFFLINE API SHIM — replaces the Node server with in-browser equivalents.
   State persists in localStorage, so progress survives across sessions.
   ============================================================================ */
(function () {
  const LS_KEY = 'scholarverse-state-v1';
  const realFetch = window.fetch ? window.fetch.bind(window) : null;

  /* Do NOT redeclare LEVELS or AGENTS inside this IIFE. The top-level const
     declarations from the data scripts live in the shared global lexical scope
     and are reachable here. Redeclaring would shadow them and silently break
     the level maths and agent lookups. */
  function levelsList() {
    try { return LEVELS; } catch (e) { return []; }
  }

  function computeLevel(xp) {
    let lvl = 1;
    for (const l of levelsList()) {
      if (xp >= l.xp) lvl = l.level;
    }
    return lvl;
  }

  function defaultState() {
    return {
      profile: (typeof PROFILE !== 'undefined') ? PROFILE : null,
      missions: (typeof MISSIONS !== 'undefined' ? MISSIONS : []).map(m => ({ id: m.id, status: 'todo', completedAt: null })),
      xp: 0, level: 1, streak: 0, longestStreak: 0, lastActiveDate: null,
      achievements: [], notes: {}, agentLog: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
  }

  /* in-memory copy: keeps progress working where the browser blocks storage
     (sandboxed previews, some private windows) */
  let MEM = null;
  function loadState() {
    try {
      let raw = null;
      try { raw = localStorage.getItem(LS_KEY); } catch (e) { raw = null; }
      if (!raw && MEM) raw = JSON.stringify(MEM);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      const known = new Set((s.missions || []).map(m => m.id));
      for (const m of (typeof MISSIONS !== 'undefined' ? MISSIONS : [])) {
        if (!known.has(m.id)) s.missions.push({ id: m.id, status: 'todo', completedAt: null });
      }
      return Object.assign(defaultState(), s);
    } catch (e) {
      console.warn('[scholarverse] state load failed, starting fresh', e);
      return defaultState();
    }
  }

  function saveState(s) {
    s.updatedAt = new Date().toISOString();
    MEM = JSON.parse(JSON.stringify(s));
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); }
    catch (e) { console.warn('[scholarverse] could not save state', e); }
  }

  function missionById(id) {
    return (typeof MISSIONS !== 'undefined' ? MISSIONS : []).find(m => m.id === id);
  }

  function completeMission(missionId) {
    const mission = missionById(missionId);
    if (!mission) throw new Error('Mission not found: ' + missionId);
    const state = loadState();
    const rec = state.missions.find(m => m.id === missionId);
    if (!rec) throw new Error('Mission record not found');

    if (rec.status === 'done') {
      rec.status = 'todo'; rec.completedAt = null;
      state.xp = Math.max(0, state.xp - mission.xp);
    } else {
      rec.status = 'done'; rec.completedAt = new Date().toISOString();
      state.xp += mission.xp;
    }

    // streak
    const today = new Date().toISOString().slice(0, 10);
    if (rec.status === 'done' && state.lastActiveDate !== today) {
      const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      state.streak = (state.lastActiveDate === y) ? state.streak + 1 : 1;
      state.longestStreak = Math.max(state.longestStreak, state.streak);
      state.lastActiveDate = today;
    }
    state.level = computeLevel(state.xp);

    // achievements
    const doneIds = state.missions.filter(m => m.status === 'done').map(m => m.id);
    const doneCount = doneIds.length;
    const unlocked = [];
    const award = (id) => {
      if (state.achievements.includes(id)) return;
      const a = (typeof ACHIEVEMENTS !== 'undefined' ? ACHIEVEMENTS : []).find(x => x.id === id);
      if (a) { state.achievements.push(id); state.xp += a.xp; unlocked.push(a); }
    };
    if (doneCount >= 1) award('first-step');
    if (doneIds.includes('book-ielts')) award('test-booked');
    if (doneIds.includes('employer-cert')) award('employer-cert');
    if (doneIds.includes('referees')) award('two-refs');
    if (doneIds.includes('epos-form') && doneIds.includes('europass-cv') && doneIds.includes('epos-motivation')) award('epos-ready');
    if (doneIds.includes('submit-goettingen')) award('submitted-1');
    if (doneIds.includes('submit-swedish-uni')) award('sweden-bound');
    if (doneIds.includes('working-paper')) award('paper-drafted');
    if (state.streak >= 7) award('streak-7');
    if (state.streak >= 30) award('streak-30');
    const subs = doneIds.filter(id => id.startsWith('submit-')).length;
    if (subs >= 3) award('submitted-3');
    if (subs >= 8) award('submitted-8');

    state.level = computeLevel(state.xp);
    saveState(state);
    return { state, mission: Object.assign({}, mission, { status: rec.status, completedAt: rec.completedAt }), unlocked };
  }

  function agentRun(agentId) {
    const state = loadState();
    /* reference the global AGENTS directly (do NOT shadow it) */
    let agentList = [];
    try { agentList = AGENTS; } catch (e) { agentList = []; }
    const agent = agentList.find(a => a.id === agentId) || { name: agentId };
    const T = (typeof TARGETS !== 'undefined') ? TARGETS : [];
    const D = (typeof DOCUMENTS !== 'undefined') ? DOCUMENTS : [];
    const DE = (typeof DEAD_ENDS !== 'undefined') ? DEAD_ENDS : [];
    const PB = (typeof PLAYBOOK !== 'undefined') ? PLAYBOOK : [];
    let report = '';

    switch (agentId) {
      case 'quartermaster': {
        const crit = D.filter(d => d.critical);
        const miss = D.filter(d => ['missing','unconfirmed','partial','verify'].includes(d.status));
        report = 'DOCUMENT AUDIT\n\n' + crit.length + ' CRITICAL blockers:\n' +
          crit.map(d => '  • ' + d.name + ' — owner: ' + d.owner).join('\n') +
          '\n\n' + miss.length + ' items not yet ready.\n\nThis week, secure:\n  1. IELTS booking\n  2. City Bank Certificate of Employment\n  3. City Bank recommendation letter\n  4. BUP ranking + ECTS letters';
        break;
      }
      case 'chronos': {
        const now = Date.now();
        const rows = T.filter(t => t.deadline)
          .map(t => ({ name: t.short || t.name, date: t.deadline, days: Math.ceil((new Date(t.deadline) - now) / 86400000), pri: t.priority }))
          .sort((a,b) => a.days - b.days);
        const urg = rows.filter(r => r.days <= 45 && r.days >= 0);
        report = 'DEADLINE TRIAGE\n\n' + urg.length + ' deadlines inside 45 days:\n' +
          urg.map(r => '  [' + r.pri + '] ' + r.name + ' — ' + r.days + ' days (' + r.date + ')').join('\n') +
          '\n\nTRIAGE RULE: hard deadlines beat everything. Booked beats planned.';
        break;
      }
      case 'strategist': {
        const m = state.missions.filter(x => x.status === 'done').length;
        const total = state.missions.length;
        const pct = Math.round((m/total)*100);
        const sd = state.missions.filter(x => x.status === 'done' && x.id.startsWith('submit-')).length;
        report = 'PORTFOLIO STATUS\n\nMission progress: ' + m + '/' + total + ' (' + pct + '%)\nApplications submitted: ' + sd + ' of a 15-application target\n\n' +
          'EXPECTED-VALUE REMINDER:\n  3 applications at 4% each  → 11% chance of a win\n 15 applications at 4% each  → 46% chance of a win\n 15 applications at 7% each  → 66% chance of a win\n\n' +
          'The lever you control is the NUMBER of well-targeted applications, not the brilliance of one.\n\n' +
          'UNRESOLVED (Gate 4): your two winnable EPOS routes are development subjects; your goal is finance. SISGP is the one target that sidesteps this — it funds Finance.';
        break;
      }
      case 'scout': {
        report = 'SCHEME STATUS\n\nOPEN NOW:\n' + T.filter(t=>t.status==='open').map(t=>'  🟢 '+(t.short||t.name)+' — '+t.deadlineLabel).join('\n') +
          '\n\nOPENING SOON:\n' + T.filter(t=>t.status==='opening_soon').map(t=>'  🟡 '+(t.short||t.name)+' — '+t.deadlineLabel).join('\n') +
          '\n\nCONFIRMED DEAD (do not revisit):\n' + DE.slice(0,8).map(d=>'  🔴 '+d.name).join('\n');
        break;
      }
      case 'envoy': {
        report = 'OUTREACH PRIORITIES\n\n1. Göttingen EPOS coordinator — epos-devecon@uni-goettingen.de\n2. Hohenheim AgEcon — agecon@uni-hohenheim.de\n3. French programmes — request an Eiffel NOMINATION (you cannot apply yourself)\n4. HEC Montréal Finance — tolga.cenesizoglu@hec.ca, pascal.francois@hec.ca (BOTH VERIFIED from the official directory)\n5. Waterloo — Alexander Schied (evidence: market microstructure / price impact)\n\n' +
          'TIMING: send Tue–Thu. Their 8:30 am = 6:30 pm Dhaka (Toronto/Montréal), 9:30 pm (Vancouver), 12:30 pm (Germany).\n' +
          'DST from 1 Nov 2026 shifts Ontario/Quebec to 7:00–9:00 pm Dhaka.\n\n' +
          'THE GATE-4 EMAIL TO SEND BOTH EPOS PROGRAMMES:\n  "Where do your graduates actually work — banking and markets, or development agencies and government?"';
        break;
      }
      case 'scribe': {
        report = 'WRITING PRIORITIES\n\n1. EPOS motivation letter — ONE uniform letter for BOTH universities, max 2 pages, dated, WITH the ranking paragraph.\n2. Europass CV — reverse chronological, declare the Feb 2024 gap.\n3. Yield-curve working paper — HIGHEST LEVERAGE. Fit Nelson-Siegel to your 310-security dataset.\n\n' +
          '⚠️ RULE: Chevening and DAAD screen for AI-generated text. I coach structure — you write the sentences.';
        break;
      }
      case 'oracle': {
        report = 'KNOWLEDGE BASE — ' + PB.length + ' playbooks loaded\n\n' + PB.map(p => '  ' + p.icon + ' ' + p.title).join('\n') +
          '\n\nKEY CORRECTIONS ON FILE:\n  • Eiffel age cap is 29, not 25\n  • DAAD does not pay tuition\n  • ESKAS is PhD-only for Bangladesh\n  • ETH ESOP closes 30 Nov, not 15 Dec\n  • EMJM cap is exactly 3 programmes\n  • Canada: spousal work permit needs a 16-month master\n  • Canadian Economics MAs are 12 months and dead — the 16+ month funded routes are in MATH/STATS and Quebec';
        break;
      }
      default:
        report = 'Agent has no runnable routine yet.';
    }

    state.agentLog.unshift({ agentId, agent: agent.name, at: new Date().toISOString(), report });
    state.agentLog = state.agentLog.slice(0, 30);
    saveState(state);
    return { report, agent };
  }

  function route(url, body) {
    if (url === '/api/state') { const s = loadState(); s.level = computeLevel(s.xp); return s; }
    if (url === '/api/content') return {
      profile: (typeof PROFILE !== 'undefined') ? PROFILE : null,
      targets: (typeof TARGETS !== 'undefined') ? TARGETS : [],
      deadEnds: (typeof DEAD_ENDS !== 'undefined') ? DEAD_ENDS : [],
      gates: (typeof GATES !== 'undefined') ? GATES : [],
      documents: (typeof DOCUMENTS !== 'undefined') ? DOCUMENTS : [],
      agents: (typeof AGENTS !== 'undefined') ? AGENTS : [],
      playbook: (typeof PLAYBOOK !== 'undefined') ? PLAYBOOK : []
    };
    if (url === '/api/missions') return {
      missions: (typeof MISSIONS !== 'undefined') ? MISSIONS : [],
      levels: (typeof LEVELS !== 'undefined') ? LEVELS : [],
      achievements: (typeof ACHIEVEMENTS !== 'undefined') ? ACHIEVEMENTS : [],
      routine: (typeof ROUTINE !== 'undefined') ? ROUTINE : [],
      thisWeek: (typeof THIS_WEEK !== 'undefined') ? THIS_WEEK : []
    };
    if (url === '/api/universities') return {
      universities: (typeof UNIVERSITIES !== 'undefined') ? UNIVERSITIES : [],
      subjectOrder: (typeof SUBJECT_ORDER !== 'undefined') ? SUBJECT_ORDER : []
    };
    if (url === '/api/professors') return {
      professors: mergedProfessors(),
      tiers: (typeof PROFESSOR_TIERS !== 'undefined') ? PROFESSOR_TIERS : []
    };
    if (url === '/api/citations') return {
      citations: (typeof CITATIONS !== 'undefined') ? CITATIONS : []
    };
    if (url === '/api/excel') return {
      database: (typeof EXCEL_DATABASE !== 'undefined') ? EXCEL_DATABASE : {}
    };
    if (url === '/api/research') return {
      subjectOptions:  (typeof SUBJECT_OPTIONS  !== 'undefined') ? SUBJECT_OPTIONS  : [],
      subjectRanked:   (typeof SUBJECT_RANKED   !== 'undefined') ? SUBJECT_RANKED   : [],
      subjectFallback: (typeof SUBJECT_FALLBACK !== 'undefined') ? SUBJECT_FALLBACK : [],
      fundingSchemes:  (typeof FUNDING_SCHEMES  !== 'undefined') ? FUNDING_SCHEMES  : [],
      fundingDeadEnds: (typeof FUNDING_DEAD_ENDS !== 'undefined') ? FUNDING_DEAD_ENDS : [],
      uniCensus:       (typeof UNI_CENSUS       !== 'undefined') ? UNI_CENSUS       : [],
      uniRanked:       (typeof UNI_RANKED       !== 'undefined') ? UNI_RANKED       : []
    };
    if (url === '/api/mission/complete') return completeMission(body.missionId);
    if (url === '/api/agent/run') return agentRun(body.agentId);
    if (url === '/api/note') { const s = loadState(); s.notes[body.key] = body.value; saveState(s); return { ok: true }; }
    if (url === '/api/import') { const s = Object.assign(defaultState(), body); saveState(s); return loadState(); }
    if (url === '/api/reset') { const s = defaultState(); saveState(s); return s; }
    throw new Error('Unknown endpoint: ' + url);
  }

  window.fetch = async function (input, init) {
    const url = (typeof input === 'string') ? input : (input && input.url) || '';
    if (!url.startsWith('/api/')) {
      if (realFetch) return realFetch(input, init);
      throw new Error('Network unavailable offline: ' + url);
    }
    let body = {};
    try { if (init && init.body) body = JSON.parse(init.body); } catch (e) {}
    try {
      const result = route(url, body);
      return { ok: true, status: 200, json: async () => result, text: async () => JSON.stringify(result) };
    } catch (e) {
      console.error('[scholarverse] api error', url, e);
      return { ok: false, status: 500, json: async () => ({ error: e.message }), text: async () => e.message };
    }
  };
})();
