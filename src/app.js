/* ============================================================================
   SCHOLARVERSE — CLIENT v3 ("Runway")
   Renders every view from the in-page data brain via the offline API shim.
   Hash routing (#missions), command palette (Ctrl/⌘K), light & dark themes.
   ============================================================================ */

const app = {
  state: null, content: null, missions: null, unis: null, profs: null, cits: null, res: null, excel: null,
  profileMode: (typeof localStorage !== 'undefined' && localStorage.getItem('sv-profile-mode')) || 'hasibul',
  view: 'dashboard',
  f: { mission: 'all', doc: 'all', target: 'all', uniGate: 'all', uniMode: 'directory105', uniQuery: '', mpGate: 'all', mpQuery: '',
       dirDiscipline: 'all', dirGate: 'all', dirProvince: 'all', dirQuery: '',
       profTrack: 'all', profTier: 'all', profStatus: 'all', profQuery: '', fundKind: 'all', fundQuery: '', citStatus: 'all', cal: 'all', sheet: null, sheetQuery: '' },
  calDate: null
};
if (typeof window !== 'undefined') window.app = app;

/* ---------------- dual profile & couple data accessors ---------------- */
function getActiveProfile() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_PROFILE !== 'undefined') ? ZARIN_PROFILE : ((app.content && app.content.zarin && app.content.zarin.profile) || {});
  }
  return (typeof PROFILE !== 'undefined') ? PROFILE : ((app.content && app.content.profile) || {});
}

function getActiveTargets() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_TARGETS !== 'undefined') ? ZARIN_TARGETS : ((app.content && app.content.zarin && app.content.zarin.targets) || []);
  }
  return (typeof TARGETS !== 'undefined') ? TARGETS : ((app.content && app.content.targets) || []);
}

function getActiveDocuments() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_DOCUMENTS !== 'undefined') ? ZARIN_DOCUMENTS : ((app.content && app.content.zarin && app.content.zarin.documents) || []);
  }
  return (typeof DOCUMENTS !== 'undefined') ? DOCUMENTS : ((app.content && app.content.documents) || []);
}

function getActiveMissions() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_MISSIONS !== 'undefined') ? ZARIN_MISSIONS : ((app.content && app.content.zarin && app.content.zarin.missions) || []);
  }
  return (typeof MISSIONS !== 'undefined') ? MISSIONS : ((app.missions && app.missions.missions) || []);
}

function getActiveProfessors() {
  if (app.profileMode === 'zarin') {
    const list = (typeof ZARIN_PROFESSORS !== 'undefined') ? ZARIN_PROFESSORS : ((app.content && app.content.zarin && app.content.zarin.professors) || []);
    const deepData = (typeof ZARIN_PROFESSORS_DEEP !== 'undefined') ? ZARIN_PROFESSORS_DEEP : null;
    if (deepData) {
      for (const p of list) {
        if (deepData[p.name]) p.deep = deepData[p.name];
      }
    }
    return list;
  }
  return app.profs.professors;
}

function getActiveGates() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_GATES !== 'undefined') ? ZARIN_GATES : ((app.content && app.content.zarin && app.content.zarin.gates) || []);
  }
  return (typeof GATES !== 'undefined') ? GATES : ((app.content && app.content.gates) || []);
}

function getActiveDeadEnds() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_DEAD_ENDS !== 'undefined') ? ZARIN_DEAD_ENDS : ((app.content && app.content.zarin && app.content.zarin.deadEnds) || []);
  }
  return (typeof DEAD_ENDS !== 'undefined') ? DEAD_ENDS : ((app.content && app.content.deadEnds) || []);
}

function getActivePlaybook() {
  if (app.profileMode === 'zarin') {
    return (typeof ZARIN_PLAYBOOK !== 'undefined') ? ZARIN_PLAYBOOK : ((app.content && app.content.zarin && app.content.zarin.playbook) || []);
  }
  return (typeof PLAYBOOK !== 'undefined') ? PLAYBOOK : ((app.content && app.content.playbook) || []);
}

/* ---------------- helpers ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fv = (x) => (x && typeof x === 'object' && x.value !== undefined) ? x.value : x;
const factBadge = (f) => {
  if (!f || typeof f !== 'object' || f.value === undefined) return '';
  const isStale = f.checked && ((TODAY - new Date(f.checked)) / 86400000 > 30);
  if (f.status === 'verified') {
    return `<span class="tag ${isStale ? 'warn' : 'ok'}" title="Verified on ${esc(f.checked)}${f.source ? ` from ${esc(f.source)}` : ''}">${isStale ? '⚠️ Stale' : '✅ Verified'}</span>`;
  }
  if (f.status === 'user_reported') {
    return `<span class="tag acc" title="User reported${f.checked ? ` on ${esc(f.checked)}` : ''}">👤 Self-reported</span>`;
  }
  return `<span class="tag warn plain" title="${esc(f.source || 'Unverified source')}">❓ Unverified</span>`;
};
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const isoLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const TODAY_ISO = isoLocal(TODAY);
const parse = (iso) => { if (!iso) return null; const d = new Date(String(iso).slice(0, 10) + 'T00:00:00'); return isNaN(d) ? null : d; };
const daysUntil = (iso) => { const d = parse(iso); return d ? Math.round((d - TODAY) / 86400000) : null; };
const fmt = (iso, o = { day: 'numeric', month: 'short', year: 'numeric' }) => { const d = parse(iso); return d ? d.toLocaleDateString('en-GB', o) : '—'; };
const fmtShort = (iso) => fmt(iso, { day: 'numeric', month: 'short' });
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const dueText = (d) => d === null ? '' : d < 0 ? `${Math.abs(d)}d overdue` : d === 0 ? 'today' : `${d}d left`;
const dueCls = (d) => d === null ? '' : d < 0 ? 'over' : d <= 30 ? 'hot' : '';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clean = (s) => String(s ?? '').replace(/^\?\s+/, '✓ ');

async function api(path, opts = {}) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...opts });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
const post = (path, body) => api(path, { method: 'POST', body: JSON.stringify(body) });

function toast(title, sub = '') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<div><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div>`;
  $('#toasts').appendChild(el);
  setTimeout(() => el.classList.add('out'), 3200);
  setTimeout(() => el.remove(), 3600);
}

const I = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  line: '<path d="M4 6h10M4 12h16M4 18h7"/>',
  check: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
  doc: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  sheet: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  uni: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.5 3.5 5.2"/>',
  quote: '<path d="M7 7h4v5H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V8a1 1 0 0 1 1-1zM15 7h4v5h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V8a1 1 0 0 1 1-1z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3"/><path d="M20 4v14h-7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4-7 8-7s7 2.5 8 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  tick: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'
};
const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;

const VIEWS = {
  dashboard:    { t: 'Dashboard',     s: 'Where the campaign stands today, and what to do next.', ic: 'home', g: 'Overview' },
  calendar:     { t: 'Calendar',      s: 'Every deadline, mission and session on one month grid.', ic: 'cal', g: 'Overview' },
  timeline:     { t: 'Timeline',      s: 'Targets, documents and missions in date order.', ic: 'line', g: 'Overview' },
  missions:     { t: 'Missions',      s: 'Tick a mission to log it and earn XP.', ic: 'check', g: 'Act' },
  documents:    { t: 'Documents',     s: 'What you hold, what is missing, and who has to produce it.', ic: 'doc', g: 'Act' },
  excel:        { t: 'Workbook',      s: 'The master spreadsheet, searchable sheet by sheet.', ic: 'sheet', g: 'Act' },
  targets:      { t: 'Targets',       s: 'Verified scholarship schemes, their windows, and the gates you must clear.', ic: 'target', g: 'Research' },
  portfolio:    { t: 'Portfolio',     s: 'Decision engine: weighted admissions & funding analytics across targets.', ic: 'compass', g: 'Research' },
  universities: { t: 'Universities',  s: 'Ranked for usefulness to you, plus the full Canadian census against the 16-month gate.', ic: 'uni', g: 'Research' },
  subjects:     { t: 'Subject fit',   s: 'Which degree label actually gets funded.', ic: 'compass', g: 'Research' },
  funding:      { t: 'Funding',       s: 'What each scheme pays for, and which ones are dead ends.', ic: 'coin', g: 'Research' },
  professors:   { t: 'Professors',    s: 'Potential supervisors, with verified contacts and outreach drafts.', ic: 'people', g: 'Research' },
  citations:    { t: 'Citations',     s: 'Every paper cited in outreach, checked against the primary record.', ic: 'quote', g: 'Research' },
  agents:       { t: 'Agents',        s: 'Run a routine against your live data and keep the report.', ic: 'bolt', g: 'Toolkit' },
  playbook:     { t: 'Playbook',      s: 'The verified rules for each route, in one place.', ic: 'book', g: 'Toolkit' },
  profile:      { t: 'Profile',       s: 'The record every application draws on.', ic: 'user', g: 'Toolkit' }
};

/* fixed milestones that aren't stored as targets */
const CRITICAL_DATES = [
  { name: 'Göttingen EPOS', date: '2026-11-15' },
  { name: 'ETH ESOP', date: '2026-11-30' },
  { name: 'EPFL Excellence', date: '2026-12-15' },
  { name: 'Hohenheim EPOS', date: '2026-12-15' },
  { name: 'Swedish universities (ranking locked)', date: '2027-01-15' },
  { name: 'Sweden 900 SEK fee & document upload', date: '2027-02-01' }
];
const ZOOM = { name: 'Göttingen info session', date: '2026-10-26' };

/* ============================================================================
   BOOT & SHELL
   ============================================================================ */
async function boot() {
  try {
    [app.state, app.content, app.missions, app.unis, app.profs, app.cits, app.res, app.excel] = await Promise.all([
      api('/api/state'), api('/api/content'), api('/api/missions'), api('/api/universities'),
      api('/api/professors'), api('/api/citations'), api('/api/research'), api('/api/excel')
    ]);
    buildNav();
    wireShell();
    const h = location.hash.slice(1);
    app.view = VIEWS[h] ? h : 'dashboard';
    render();
  } catch (e) {
    $('#page').innerHTML = `<div class="note bad"><div><strong>The data didn't load.</strong> Refresh the page. If it keeps failing, the data script in this file is damaged.<br><span class="num">${esc(e.message)}</span></div></div>`;
    console.error(e);
  }
}

function buildNav() {
  const groups = {};
  Object.entries(VIEWS).forEach(([k, v]) => (groups[v.g] = groups[v.g] || []).push([k, v]));
  $('#nav').innerHTML = Object.entries(groups).map(([g, items]) => `
    <div><div class="nav-group-label">${esc(g)}</div>
      ${items.map(([k, v]) => `<button class="nav-item" type="button" data-view="${k}">${icon(v.ic)}<span>${esc(v.t)}</span><span class="nav-count" id="nc-${k}" hidden></span></button>`).join('')}
    </div>`).join('');
}

function wireShell() {
  $$('#nav .nav-item').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  $$('#profileSwitchTabs button').forEach(b => {
    b.addEventListener('click', () => {
      app.profileMode = b.dataset.profile;
      try { localStorage.setItem('sv-profile-mode', app.profileMode); } catch (e) {}
      render();
    });
  });

  $('#themeBtn').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  let saved = null; try { saved = localStorage.getItem('sv-theme'); } catch (e) {}
  setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const openRail = (on) => { $('#rail').classList.toggle('is-open', on); $('#scrim').classList.toggle('is-open', on); };
  $('#burger').addEventListener('click', () => openRail(true));
  $('#scrim').addEventListener('click', () => openRail(false));
  $('#paletteOpen').addEventListener('click', openPalette);
  $('#paletteOpen2').addEventListener('click', openPalette);
  $('#palette').addEventListener('click', (e) => { if (e.target.id === 'palette') closePalette(); });
  $('#paletteInput').addEventListener('input', renderPalette);
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
  window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (VIEWS[h] && h !== app.view) { app.view = h; render(); } });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
    if (e.key === 'Escape') { closePalette(); closeModal(); openRail(false); return; }
    if ($('#palette').classList.contains('is-open')) {
      const items = $$('#paletteList .pal-item');
      const cur = items.findIndex(i => i.dataset.sel === 'true');
      const sel = (n) => { items.forEach(i => i.dataset.sel = 'false'); if (items[n]) { items[n].dataset.sel = 'true'; items[n].scrollIntoView({ block: 'nearest' }); } };
      if (e.key === 'ArrowDown') { e.preventDefault(); sel(Math.min(cur + 1, items.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); sel(Math.max(cur - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); items[cur]?.click(); }
    }
  });
}

function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('sv-theme', t); } catch (e) {}
  $('#themeBtn').textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
}

function go(view) {
  if (!VIEWS[view]) return;
  app.view = view;
  /* history is blocked in sandboxed previews; navigation must never depend on it */
  try { if (location.hash.slice(1) !== view) history.pushState(null, '', '#' + view); } catch (e) {}
  $('#rail').classList.remove('is-open'); $('#scrim').classList.remove('is-open');
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function render() { renderChrome(); renderView(); }

function renderChrome() {
  $$('#nav .nav-item').forEach(b => b.setAttribute('aria-current', b.dataset.view === app.view ? 'page' : 'false'));

  $$('#profileSwitchTabs button').forEach(b => {
    const on = b.dataset.profile === app.profileMode;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  const pTitle = app.profileMode === 'zarin' ? 'Zarin Tasnim' : app.profileMode === 'couple' ? 'Couple Plan' : 'Hasibul Hasan';
  document.title = `${VIEWS[app.view].t} · ${pTitle} · ScholarVerse`;

  const setCount = (k, n, hot) => { const el = $('#nc-' + k); if (!el) return; el.hidden = !n; el.textContent = n; el.classList.toggle('hot', !!hot); };

  if (app.profileMode === 'zarin') {
    const zState = getProfileState('zarin');
    const ZM = getActiveMissions();
    const totalXp = ZM.reduce((sum, m) => sum + (m.xp || 0), 0);
    const zXp = zState.xp || 0;
    const L = app.missions.levels;
    const lv = [...L].reverse().find(l => zXp >= l.xp) || L[0];
    const next = L.find(l => l.xp > zXp);
    $('#lvlTitle').textContent = `${lv.title} · level ${lv.level}`;
    $('#xpText').textContent = next ? `${zXp} / ${next.xp} XP` : `${zXp} / ${totalXp} XP`;
    const pct = totalXp ? Math.min(100, Math.round((zXp / totalXp) * 100)) : 0;
    $('#xpFill').style.width = Math.max(2, pct) + '%';
    $('#streakText').textContent = 'Zarin Track';
    setCount('missions', ZM.filter(m => !isDone(m.id)).length);
    const missingDocs = getActiveDocuments().filter(d => ['missing','not_started'].includes(d.status)).length;
    setCount('documents', missingDocs, missingDocs > 0);
    setCount('targets', getActiveTargets().length);
    setCount('professors', getActiveProfessors().length);
    setCount('universities', (app.res.uniCensus || []).length);
    setCount('citations', 0);
  } else if (app.profileMode === 'couple') {
    $('#lvlTitle').textContent = `Couple Mode · Dual Applicants`;
    $('#xpText').textContent = `Combined Assets`;
    $('#xpFill').style.width = `100%`;
    $('#streakText').textContent = `5 Shared Destinations`;
    setCount('missions', app.missions.missions.length + (typeof ZARIN_MISSIONS !== 'undefined' ? ZARIN_MISSIONS.length : 10));
    setCount('documents', 23);
    setCount('targets', (app.content.targets.length + (typeof ZARIN_TARGETS !== 'undefined' ? ZARIN_TARGETS.length : 5)));
    setCount('professors', app.profs.professors.length + (typeof ZARIN_PROFESSORS !== 'undefined' ? ZARIN_PROFESSORS.length : 10));
    setCount('universities', (app.res.uniCensus || []).length);
    setCount('citations', 2);
  } else {
    const st = app.state, L = app.missions.levels;
    const lv = [...L].reverse().find(l => st.xp >= l.xp) || L[0];
    const next = L.find(l => l.xp > st.xp);
    $('#lvlTitle').textContent = `${lv.title} · level ${lv.level}`;
    $('#xpText').textContent = next ? `${st.xp} / ${next.xp} XP` : `${st.xp} XP`;
    const pct = next ? Math.round(((st.xp - lv.xp) / (next.xp - lv.xp)) * 100) : 100;
    $('#xpFill').style.width = Math.max(2, pct) + '%';
    $('#streakText').textContent = st.streak ? `${plural(st.streak, 'day')} streak` : 'No streak yet';

    const open = st.missions.filter(m => m.status !== 'done').length;
    setCount('missions', open);
    const missing = app.content.documents.filter(d => ['missing', 'not_started'].includes(d.status)).length;
    setCount('documents', missing, missing > 0);
    setCount('targets', app.content.targets.length);
    setCount('professors', app.profs.professors.length);
    setCount('universities', (app.res.uniCensus || []).length);
    const flagged = app.cits.citations.filter(c => ['WRONG_AUTHOR', 'PAPER_MISSING'].includes(c.status)).length;
    setCount('citations', flagged, flagged > 0);
  }
}

function pageHead(extra = '') {
  const v = VIEWS[app.view];
  return `<header class="page-head"><div><h1 class="page-title">${esc(v.t)}</h1><p class="page-sub">${esc(v.s)}</p></div>${extra ? `<div class="page-tools">${extra}</div>` : ''}</header>`;
}

function renderView() {
  const fn = {
    dashboard: renderDashboard, calendar: renderCalendar, timeline: renderTimeline, missions: renderMissions,
    documents: renderDocuments, excel: renderExcel, targets: renderTargets, portfolio: renderPortfolio, universities: renderUniversities,
    subjects: renderSubjects, funding: renderFunding, professors: renderProfessors, citations: renderCitations,
    agents: renderAgents, playbook: renderPlaybook, profile: renderProfile
  }[app.view];
  const page = $('#page');
  page.innerHTML = `<section class="view is-active" id="view-${app.view}"></section>`;
  fn($('#view-' + app.view));
}

const stats = (items) => `<div class="stats">${items.map(([k, v, s, cls, linkView, filterKey, filterVal]) =>
  `<div class="stat ${linkView ? 'stat-link' : ''}" ${linkView ? `data-goview="${linkView}" ${filterKey ? `data-fkey="${filterKey}" data-fval="${filterVal}"` : ''} style="cursor:pointer" title="Open ${linkView}"` : ''}><div class="stat-k">${esc(k)}</div><div class="stat-v ${cls || ''}">${v}</div>${s ? `<div class="stat-s">${esc(s)}</div>` : ''}</div>`).join('')}</div>`;
const chips = (id, opts, cur) => `<div class="chips" id="${id}">${opts.map(([k, l]) =>
  `<button class="chip" type="button" data-k="${esc(k)}" aria-pressed="${cur === k}">${esc(l)}</button>`).join('')}</div>`;
const wireChips = (root, id, fn) => $$(`#${id} .chip`, root).forEach(b => b.onclick = () => fn(b.dataset.k));

/* ============================================================================
   MISSIONS — profile-aware state & toggle
   ============================================================================ */
function getProfileState(mode = app.profileMode) {
  if (mode === 'zarin') {
    let s = null;
    try { s = JSON.parse(localStorage.getItem('sv-zarin-state')); } catch (e) {}
    if (!s || !Array.isArray(s.missions)) {
      const ms = (typeof ZARIN_MISSIONS !== 'undefined' ? ZARIN_MISSIONS : []).map(m => ({ id: m.id, status: 'todo' }));
      s = { missions: ms, xp: 0 };
    }
    return s;
  }
  return app.state;
}

const missionMeta = (id) => {
  if (app.profileMode === 'zarin') {
    const ZM = (typeof ZARIN_MISSIONS !== 'undefined' ? ZARIN_MISSIONS : []);
    return ZM.find(m => m.id === id) || { id, title: 'Mission', xp: 50 };
  }
  return app.missions.missions.find(m => m.id === id) || { id, title: 'Mission', xp: 50 };
};

const isDone = (id) => {
  if (app.profileMode === 'zarin') {
    const s = getProfileState('zarin');
    return (s.missions.find(m => m.id === id) || {}).status === 'done';
  }
  return (app.state.missions.find(m => m.id === id) || {}).status === 'done';
};

async function toggleMission(id) {
  if (app.profileMode === 'zarin') {
    const s = getProfileState('zarin');
    const m = missionMeta(id);
    let rec = s.missions.find(x => x.id === id);
    if (!rec) { rec = { id, status: 'todo' }; s.missions.push(rec); }
    if (rec.status === 'done') {
      rec.status = 'todo';
      s.xp = Math.max(0, (s.xp || 0) - (m.xp || 0));
      toast('Mission reopened', `−${m.xp || 0} XP`);
    } else {
      rec.status = 'done';
      s.xp = (s.xp || 0) + (m.xp || 0);
      toast('Mission complete', `${m.title.slice(0, 60)} · +${m.xp || 0} XP`);
    }
    try { localStorage.setItem('sv-zarin-state', JSON.stringify(s)); } catch (e) {}
    render();
    return;
  }
  try {
    const r = await post('/api/mission/complete', { missionId: id });
    app.state = r.state;
    const m = missionMeta(id);
    if (r.mission.status === 'done') toast('Mission complete', `${m.title.slice(0, 60)} · +${m.xp} XP`);
    else toast('Mission reopened', `−${m.xp} XP`);
    (r.unlocked || []).forEach((a, i) => setTimeout(() => toast(`${a.icon} ${a.name}`, `Achievement · +${a.xp} XP`), 300 + i * 250));
    render();
  } catch (e) { toast('Could not save', e.message); }
}

/* ============================================================================
   DOCUMENT VAULT & STORAGE (IndexedDB + App State)
   ============================================================================ */
function fmtBytes(bytes) {
  if (!bytes || isNaN(bytes)) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const MISSION_DOC_MAP = {
  'employer-cert': 'emp-cert',
  'employer-letter': 'emp-letter',
  'referee-karimul': 'karimul-letter',
  'ranking-letter': 'ranking',
  'certified-translations': 'hsc',
  'epos-form': 'epos-form',
  'europass-cv': 'europass',
  'epos-motivation': 'motivation',
  'confirm-passport': 'passport',
  'credit-audit': 'transcript',
  'book-ielts': 'ielts'
};

const DocStore = {
  dbName: 'ScholarVerseVaultDB',
  storeName: 'attachments',
  _db: null,
  async openDB() {
    if (this._db) return this._db;
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return null;
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(this.dbName, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => {
          this._db = e.target.result;
          resolve(this._db);
        };
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  },
  async save(docId, file) {
    const db = await this.openDB();
    if (!db) return null;
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const tx = db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const record = {
              id: docId,
              name: file.name,
              size: file.size,
              type: file.type || 'application/pdf',
              date: new Date().toISOString(),
              buffer: reader.result
            };
            const putReq = store.put(record);
            putReq.onsuccess = () => resolve(record);
            putReq.onerror = () => reject(putReq.error);
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
      } catch (err) {
        reject(err);
      }
    });
  },
  async get(docId) {
    const db = await this.openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.get(docId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  },
  async delete(docId) {
    const db = await this.openDB();
    if (!db) return true;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.delete(docId);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  },
  async download(docId, fallbackName) {
    const record = await this.get(docId);
    if (!record || !record.buffer) {
      toast('File not found in local vault', 'Attach the file on this device first');
      return;
    }
    const blob = new Blob([record.buffer], { type: record.type || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = record.name || fallbackName || (docId + '.pdf');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 2000);
    toast('Downloading ' + (record.name || 'document'));
  },
  async view(docId) {
    const record = await this.get(docId);
    if (!record || !record.buffer) {
      toast('File not found in local vault', 'Attach the file on this device first');
      return;
    }
    const blob = new Blob([record.buffer], { type: record.type || 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  }
};

async function attachFileToDoc(docId, file) {
  if (!file) return;
  // Pre-Flight Document Upload & Compliance Inspector (Upgrade 4)
  const MAX_PORTAL_SIZE = 5 * 1024 * 1024; // 5 MB standard DAAD/university limit
  const isTooLarge = file.size > MAX_PORTAL_SIZE;
  const isPdf = file.name.toLowerCase().endsWith('.pdf');
  
  if (isTooLarge) {
    toast('Warning: Large File Size', `${(file.size / (1024 * 1024)).toFixed(1)} MB exceeds standard 5 MB portal limit. Consider compressing.`);
  }
  if (!isPdf && !file.name.match(/\.(jpg|jpeg|png)$/i)) {
    toast('Warning: File Type', 'Most scholarship portals accept PDF format only.');
  }

  try {
    await DocStore.save(docId, file);
    const fileMeta = {
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      date: new Date().toISOString(),
      compliance: {
        sizeOk: !isTooLarge,
        formatOk: isPdf
      }
    };
    app.state.docFiles = app.state.docFiles || {};
    app.state.docFiles[docId] = fileMeta;

    const doc = (app.content.documents || []).find(d => d.id === docId);
    if (doc) doc.status = 'have';

    await post('/api/doc/attach', { docId, fileMeta });
    toast('Attached ' + file.name, isTooLarge ? 'Saved in vault (Warning: >5MB)' : 'Document is now saved & verified in vault');
    render();
  } catch (err) {
    toast('Attachment failed', err.message);
  }
}

async function removeFileFromDoc(docId) {
  try {
    await DocStore.delete(docId);
    if (app.state.docFiles) delete app.state.docFiles[docId];

    const doc = (app.content.documents || []).find(d => d.id === docId);
    if (doc) doc.status = 'missing';

    await post('/api/doc/remove', { docId });
    toast('Attachment removed', 'File cleared from vault');
    render();
  } catch (err) {
    toast('Remove failed', err.message);
  }
}

function openMission(id) {
  const m = missionMeta(id); if (!m) return;
  const d = daysUntil(m.deadline);
  const tgts = (m.targets || []).map(t => app.content.targets.find(x => x.id === t)).filter(Boolean);
  const linkedDocId = MISSION_DOC_MAP[id];
  const linkedDoc = linkedDocId ? (app.content.documents || []).find(x => x.id === linkedDocId) : null;
  const attachedFile = linkedDocId && app.state.docFiles && app.state.docFiles[linkedDocId];

  openModal(`
    <h2>${esc(m.title)}</h2>
    <div class="dialog-sub">${esc(m.category || '')}${m.owner ? ` · owner: ${esc(m.owner)}` : ''}</div>
    <div class="tags">
      <span class="tag ${isDone(id) ? 'ok' : 'warn'}">${isDone(id) ? 'Done' : 'To do'}</span>
      <span class="tag acc">+${m.xp} XP</span>
      ${m.deadline ? `<span class="tag ${d < 0 ? 'bad' : d <= 30 ? 'warn' : 'plain'}">Due ${fmt(m.deadline)} · ${dueText(d)}</span>` : ''}
      ${m.urgency === 'critical' ? '<span class="tag bad">Critical</span>' : ''}
    </div>

    ${linkedDoc ? `
      <div class="vault-card">
        <div class="vault-header">
          <h4>📎 Document Vault: ${esc(linkedDoc.name)}</h4>
          <span class="dim" style="font-size:12px">${attachedFile ? 'File Saved' : 'No File Attached'}</span>
        </div>
        ${attachedFile ? `
          <div class="file-meta-box">
            <div>
              <div style="font-weight:600;font-size:13.5px;color:var(--teal)">📎 ${esc(attachedFile.name)}</div>
              <div class="dim" style="font-size:12px;margin-top:2px">${fmtBytes(attachedFile.size)} · Saved in vault on ${fmt(attachedFile.date)}</div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn btn-sm btn-primary" type="button" id="mMissionDocView">👁️ View</button>
              <button class="btn btn-sm btn-primary" type="button" id="mMissionDocDown">📥 Download</button>
              <label class="btn btn-sm" style="cursor:pointer">🔄 Replace<input type="file" id="mMissionDocReplace" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png" hidden></label>
            </div>
          </div>
        ` : `
          <label class="drop-zone" style="display:block">
            <div style="font-size:22px;margin-bottom:2px">📎</div>
            <div style="font-weight:600;font-size:13px">Attach official ${esc(linkedDoc.name)}</div>
            <div class="dim" style="font-size:11.5px;margin-top:2px">Upload PDF, Word, or Scanned Image so you can view, download, and bring it when applying anywhere</div>
            <input type="file" id="mMissionDocUpload" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png" hidden>
          </label>
        `}
      </div>
    ` : ''}

    ${(m.actionUrl || m.actionUrl2 || m.portalUrl) ? `
      <div class="field" style="margin-top:16px">
        <div class="field-k">Direct Downloads &amp; Official Portals</div>
        <div class="tags" style="gap:8px;margin-top:6px">
          ${m.actionUrl ? `<a class="btn btn-primary btn-sm" href="${esc(m.actionUrl)}" target="_blank" rel="noopener" download>${esc(m.actionLabel || 'Download File / Open Site')}</a>` : ''}
          ${m.actionUrl2 ? `<a class="btn btn-primary btn-sm" href="${esc(m.actionUrl2)}" target="_blank" rel="noopener" download>${esc(m.actionLabel2 || 'Download Secondary File')}</a>` : ''}
          ${m.portalUrl ? `<a class="btn btn-sm" href="${esc(m.portalUrl)}" target="_blank" rel="noopener">${esc(m.portalLabel || 'Official Portal ↗')}</a>` : ''}
        </div>
      </div>
    ` : ''}

    ${m.detail ? `<div class="field"><div class="field-k">What to do</div><div class="field-v">${esc(m.detail)}</div></div>` : ''}

    ${m.submissionGuide ? `
      <div class="note acc" style="margin:14px 0">
        <div><strong>Where &amp; How to Submit:</strong><br><span style="white-space:pre-wrap">${esc(m.submissionGuide)}</span></div>
      </div>
    ` : ''}

    ${id === 'goettingen-pack-audit' ? `
      <div class="note ok" style="margin:14px 0;border-left:4px solid var(--teal)">
        <div>
          <strong>🏛️ Göttingen 12-Document Section C Pre-Flight Bundle</strong>
          <p style="font-size:12.5px;margin:4px 0 8px">Audit and inspect all 12 mandatory Section C items, check their status in your vault, and view documents directly before final portal submission.</p>
          <button class="btn btn-sm btn-primary" type="button" id="mOpenGoeDossier">Open Complete 12-Doc Dossier Audit →</button>
        </div>
      </div>
    ` : ''}

    ${m.why ? `<div class="field"><div class="field-k">Why it matters</div><div class="field-v">${esc(m.why)}</div></div>` : ''}
    ${m.checklist?.length ? `<div class="field"><div class="field-k">Checklist</div><ul class="list">${m.checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>` : ''}

    ${(m.sources || []).length ? `
      <div class="field">
        <div class="field-k">Verified Primary Sources &amp; Guidelines</div>
        <ul class="list" style="margin-top:4px">
          ${m.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener"><strong>${esc(s.label)}</strong> ↗</a></li>`).join('')}
        </ul>
      </div>
    ` : ''}

    ${tgts.length ? `<div class="field"><div class="field-k">Unlocks</div><div class="tags">${tgts.map(t => `<span class="tag plain">${t.flag || ''} ${esc(t.short || t.name)}</span>`).join('')}</div></div>` : ''}
    <div style="display:flex;gap:8px;margin-top:22px;flex-wrap:wrap">
      <button class="btn btn-primary" id="mToggle" type="button">${isDone(id) ? 'Reopen mission' : `Mark done · +${m.xp} XP`}</button>
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>`);

  if (linkedDoc) {
    if (attachedFile) {
      const vBtn = $('#mMissionDocView');
      if (vBtn) vBtn.onclick = () => DocStore.view(linkedDocId);
      const dBtn = $('#mMissionDocDown');
      if (dBtn) dBtn.onclick = () => DocStore.download(linkedDocId, linkedDoc.name);
      const repInp = $('#mMissionDocReplace');
      if (repInp) repInp.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          attachFileToDoc(linkedDocId, e.target.files[0]).then(() => openMission(id));
        }
      };
    } else {
      const upInp = $('#mMissionDocUpload');
      if (upInp) upInp.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          attachFileToDoc(linkedDocId, e.target.files[0]).then(() => openMission(id));
        }
      };
    }
  }

  const goeBtn = $('#mOpenGoeDossier');
  if (goeBtn) goeBtn.onclick = () => { closeModal(); openTarget('goettingen'); };

  $('#mToggle').onclick = async () => { closeModal(); await toggleMission(id); };
}

/* ============================================================================
   DASHBOARD
   ============================================================================ */
function horizonEvents() {
  const seen = new Set(), out = [];
  const add = (name, rawDate, kind, open) => {
    const date = fv(rawDate);
    const key = name.toLowerCase().split(' ')[0] + date;
    if (!date || seen.has(key)) return; seen.add(key);
    out.push({ name, date, kind, d: daysUntil(date), open });
  };
  app.content.targets.forEach(t => {
    add(t.short || t.name, t.deadline, 'target', () => openTarget(t.id));
  });
  CRITICAL_DATES.forEach(c => add(c.name, c.date, 'critical', () => openCritical(c)));
  add(ZOOM.name, ZOOM.date, 'session', openZoom);
  return out.sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function runwayHTML(evs) {
  const upcoming = evs.filter(e => e.d >= 0);
  const next = upcoming.find(e => e.kind !== 'session') || upcoming[0];
  const start = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const lastD = parse(evs[evs.length - 1]?.date) || new Date(TODAY.getTime() + 150 * 864e5);
  const end = new Date(lastD.getFullYear(), lastD.getMonth() + 1, 1);
  const span = end - start;
  const pos = (d) => ((d - start) / span) * 100;
  const months = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) months.push(d);
  const visible = evs.filter(e => parse(e.date) >= start && parse(e.date) <= end);
  const ticks = visible.map(e => ({ ...e, x: pos(parse(e.date)) }));
  const AXIS = 100;
  return `
  <section class="runway" aria-label="Deadline runway">
    <div class="runway-top">
      <div>
        <div class="runway-label">Next hard deadline</div>
        <div class="runway-big">
          <span class="runway-days num">${next ? next.d : '—'}</span>
          <span class="runway-unit">${next ? `days to ${esc(next.name)}` : 'No deadlines ahead'}<span>${next ? fmt(next.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span></span>
        </div>
      </div>
      <div class="runway-goal"><strong>A fully funded master's in economics or finance</strong>Europe first, Canada as the fallback. Good subject, then a good job, then a realistic long-term route.</div>
    </div>
    <div class="axis"><div class="axis-inner" style="position:relative;height:150px">
      <div class="axis-line"></div>
      <div class="axis-elapsed" style="width:${pos(TODAY)}%"></div>
      ${months.map(m => `<span class="axis-month" style="left:${pos(m)}%">${m.toLocaleDateString('en-GB', { month: 'short' })}${m.getMonth() === 0 ? ` ${m.getFullYear()}` : ''}</span>`).join('')}
      <div class="axis-today" style="left:${pos(TODAY)}%"><span>Today</span></div>
      ${ticks.map((t, i) => `<button class="tick ${t.d >= 0 && t.d <= 30 ? 'hot' : ''} ${t.d < 0 ? 'done' : ''}" type="button" data-tk="${i}" data-x="${t.x}" style="left:${t.x}%">
          <span class="tick-label">${esc(t.name)}<b>${fmtShort(t.date)} · ${t.d < 0 ? 'passed' : t.d + 'd'}</b></span>
          <span class="tick-stem"></span>
          <span class="tick-dot"></span>
        </button>`).join('')}
    </div></div>
  </section>`;
  /* note: ticks are wired by renderDashboard */
}

/* place runway labels in lanes so none overlap; measured after render */
function layoutRunway(root) {
  const inner = $('.axis-inner', root); if (!inner) return;
  const W = inner.clientWidth, GAP = 8, LANE_H = 34, TOP = 22;
  const lanes = [];
  const ticks = $$('.tick', inner).map(el => ({ el, x: (+el.dataset.x / 100) * W, w: $('.tick-label', el).offsetWidth }));
  ticks.forEach(t => {
    /* keep labels inside the strip at the edges */
    let left = t.x - t.w / 2, shift = 0;
    if (left < 0) shift = -left; if (left + t.w > W) shift = W - (left + t.w);
    left += shift; t.shift = shift;
    let lane = lanes.findIndex(r => left > r + GAP);
    if (lane < 0) { lane = lanes.length; lanes.push(-1e9); }
    lanes[lane] = left + t.w; t.lane = lane;
  });
  const AXIS = TOP + lanes.length * LANE_H + 26;
  inner.style.height = (AXIS + 32) + 'px';
  const axLine = $('.axis-line', inner);
  const axElapsed = $('.axis-elapsed', inner);
  if (axLine) axLine.style.top = AXIS + 'px';
  if (axElapsed) axElapsed.style.top = AXIS + 'px';
  $$('.axis-month', inner).forEach(m => { if (m) m.style.top = (AXIS + 14) + 'px'; });
  const axToday = $('.axis-today', inner);
  if (axToday) axToday.style.height = (AXIS + 6) + 'px';
  ticks.forEach(t => {
    if (!t.el) return;
    const top = TOP + t.lane * LANE_H;
    t.el.style.top = top + 'px';
    const tLbl = $('.tick-label', t.el);
    if (tLbl) tLbl.style.transform = t.shift ? `translateX(${t.shift}px)` : '';
    const tStem = $('.tick-stem', t.el);
    if (tStem) tStem.style.height = Math.max(2, AXIS - top - (tLbl ? tLbl.offsetHeight : 0) - 5) + 'px';
  });
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('resize', () => { if (app.view === 'dashboard') layoutRunway(document); });
}

function renderZarinDashboard(root) {
  const Z = (typeof ZARIN_DATA !== 'undefined') ? ZARIN_DATA : (app.content && app.content.zarin) || {};
  const tgts = Z.targets || [];
  const mis = Z.missions || [];
  const docs = Z.documents || [];

  const zarinEvs = [
    { name: 'Bremen MBA Logistics (EPOS)', date: '2026-12-15', kind: 'target', d: daysUntil('2026-12-15'), open: () => openTarget('zarin-germany-epos') },
    { name: 'Sweden Universities SCM (Lund/Gothenburg)', date: '2027-01-15', kind: 'target', d: daysUntil('2027-01-15'), open: () => openTarget('zarin-sweden-sisgp') },
    { name: 'Czech Govt VSE Prague Results', date: '2027-02-15', kind: 'milestone', d: daysUntil('2027-02-15'), open: () => openTarget('zarin-czech-vse') },
    { name: 'Swedish Institute SISGP Scholarship', date: '2027-02-25', kind: 'critical', d: daysUntil('2027-02-25'), open: () => openTarget('zarin-sweden-sisgp') },
    { name: 'Bologna Pre-Admission (IYT)', date: '2027-03-31', kind: 'target', d: daysUntil('2027-03-31'), open: () => openTarget('zarin-italy-iyt') },
    { name: 'Italy IYT Scholarship Portal', date: '2027-05-11', kind: 'critical', d: daysUntil('2027-05-11'), open: () => openTarget('zarin-italy-iyt') },
    { name: 'Canada Spousal OWP Filing', date: '2027-05-01', kind: 'target', d: daysUntil('2027-05-01'), open: () => openTarget('zarin-canada-spousal') }
  ].sort((a,b) => a.date.localeCompare(b.date));

  const upcoming = zarinEvs.filter(e => e.d >= 0);
  const next = upcoming[0];
  const nextEv = next;

  root.innerHTML = `
    ${pageHead(`<button class="btn btn-sm btn-primary" type="button" data-goview="targets">View Her Targets</button>`)}

    <section class="runway" aria-label="Zarin Deadline runway">
      <div class="runway-top">
        <div>
          <div class="runway-label">Zarin's next deadline</div>
          <div class="runway-big" style="cursor:pointer">
            <span class="runway-days num">${next ? next.d : '—'}</span>
            <span class="runway-unit">${next ? `days to ${esc(next.name)}` : 'No deadlines ahead'}<span>${next ? fmt(next.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span></span>
          </div>
        </div>
        <div class="runway-goal"><strong>Fully funded master's in Supply Chain Management, Logistics or Management</strong>Sweden SISGP, Germany EPOS, Italy IYT, or Canada Spousal Open Work Permit.</div>
      </div>
    </section>

    <div class="pin" style="margin-top:20px;border-left:4px solid var(--amber)">
      <div class="pin-ic" style="color:var(--amber)">${icon('shield')}</div>
      <div>
        <h3>Zarin Tasnim: Verified Academic &amp; Industry Profile on File</h3>
        <p>• <strong>IELTS Academic: 7.0 Overall / C1 Level</strong> (Listening 7.5, Reading 6.5) — British Council TRF 24BD047817TASZ001A, valid to 28 Dec 2026.<br>
        • <strong>BUP BBA Marketing: CGPA 3.42 / 4.00</strong> (converts to German <strong>1.87 / gut</strong>, comfortably beating 2.0/2.5 cutoffs).<br>
        • <strong>Global Logistics Track Record:</strong> MGH Group &amp; Akij Logistics (~7,000 certified work hours, 120+ flights, ~4,000 tons, CargoWise &amp; SAP).<br>
        • <strong>Academic Referee:</strong> Official Letterhead Recommendation from Prof. Dr. Mohammad Zahedul Alam (BUP Marketing) on file.</p>
      </div>
      <div class="pin-act" style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-sm" type="button" data-goview="profile">Full Dossier →</button>
      </div>
    </div>

    <div style="margin-top:22px">${stats([
      ['Target Schemes', tgts.length, 'Sweden, Germany, Italy, Czech, Canada', 'ok', 'targets'],
      ['IELTS Score', '7.0 C1', 'Valid to Dec 2026 (No test needed!)', 'acc', 'documents'],
      ['German Grade', '1.87', 'BBA 3.42/4.00 (Top gut tier)', 'acc'],
      ['Work Volume', '~7,000 hrs', '3.5 yrs (Exceeds 3,000h SISGP gate)', 'ok'],
      ['Documents Ready', docs.filter(d=>d.status==='have').length, `of ${docs.length} on file`, 'ok', 'documents']
    ])}</div>

    <div class="grid split" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>Zarin's Priority Missions</h2><span class="aside">Next action steps</span></div>
        <div class="rows" style="margin-top:8px">
          ${mis.slice(0, 5).map(m => {
            const d = daysUntil(m.deadline);
            return `<div class="task">
              <button class="check" type="button" data-toggle="${esc(m.id)}" aria-label="Mark ${esc(m.title)} done">${icon('tick')}</button>
              <div style="cursor:pointer" data-mission="${esc(m.id)}"><div class="task-t">${esc(m.title)}</div><div class="task-n">${esc(m.detail.slice(0, 110))}…</div></div>
              <div class="task-side"><div class="xp">+${m.xp} XP</div>${d !== null ? `<div class="due ${dueCls(d)}">${dueText(d)}</div>` : ''}</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h2>Upcoming Dates</h2><button class="btn btn-sm" type="button" data-goview="timeline">Timeline</button></div>
        <div class="rows" style="margin-top:8px">
          ${upcoming.slice(0, 5).map((e, i) => `<button class="ladder-row ${dueCls(e.d)}" type="button" data-zup="${i}">
            <span class="ladder-name">${esc(e.name)}</span><span class="ladder-d num">${e.d}<small>d</small></span>
            <span class="ladder-date">${fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </button>`).join('')}
        </div>
      </div>
    </div>
  `;

  const rb = $('.runway-big', root);
  if (rb && nextEv) rb.onclick = () => nextEv.open?.();
  $$('[data-zup]', root).forEach(b => b.onclick = () => upcoming[+b.dataset.zup]?.open?.());
  $$('[data-mission]', root).forEach(b => b.onclick = () => openMission(b.dataset.mission));
  $$('[data-goview]', root).forEach(b => b.onclick = () => go(b.dataset.goview));
}

function renderCoupleDashboard(root) {
  const cData = (typeof COUPLE_DATA !== 'undefined') ? COUPLE_DATA : (app.content && app.content.couple) || {};
  const countries = cData.countries || [];
  const budgets = cData.budgets || {};

  root.innerHTML = `
    ${pageHead(`<button class="btn btn-sm btn-primary" type="button" data-goview="targets">View All Targets</button>`)}

    <div class="thesis" style="background:linear-gradient(135deg, #172b4b 0%, #0f1f38 100%)">
      <h2>Couple Strategic Migration Command Centre</h2>
      <p>Hasibul Hasan, CFA (Economics &amp; Treasury ALM) &amp; Zarin Tasnim (BBA, IELTS 7.0 C1, Global Freight Forwarding).</p>
      <p style="margin-top:8px"><strong>Strategic Rule:</strong> Run parallel scholarship hunts in <strong>Sweden, Germany, Italy, and Czechia</strong>, while using <strong>Canada</strong> as the high-certainty spousal open work permit PR corridor.</p>
    </div>

    <div style="margin-top:22px">${stats([
      ['Dual Full Rides', 'Sweden & Italy', 'SEK 24k/mo & €21.6k/yr couple stipends', 'acc'],
      ['Spousal Work Rights', 'Canada & Germany', 'Unrestricted full-time work permitted', 'ok'],
      ['Combined English', 'Both Cleared', 'Hasibul MOI accepted · Zarin IELTS 7.0 C1', 'ok'],
      ['Submitted Apps', '2 in Prague', 'Charles MEF + VSE Prague (#79074)', 'ok'],
      ['Couple Savings Potential', '৳200k–250k / mo', 'Net household surplus in Sweden/Canada', 'acc']
    ])}</div>

    <div class="section-title"><h2>Country Migration Corridors</h2><span class="aside">Ranked by couple synergy</span></div>
    <div class="couple-grid">
      ${countries.map(c => `
        <div class="couple-card">
          <div class="couple-card-top">
            <div>
              <div class="couple-country">${c.flag} ${esc(c.country)}</div>
              <div class="dim" style="font-size:12.5px;margin-top:2px">${esc(c.title)}</div>
            </div>
            <span class="couple-badge">${esc(c.rating.split(' ')[0])}</span>
          </div>
          <p style="font-size:13.5px;margin:0;color:var(--ink-2);line-height:1.55">${esc(c.summary)}</p>
          <div class="field" style="margin:0"><div class="field-k">👨‍💼 Hasibul Route</div><div class="field-v" style="font-size:13px">${esc(c.hisRoute)}</div></div>
          <div class="field" style="margin:0"><div class="field-k">👩‍💼 Zarin Route</div><div class="field-v" style="font-size:13px">${esc(c.herRoute)}</div></div>
          <div class="field" style="margin:0"><div class="field-k">📜 Spousal Visa &amp; Work Rights</div><div class="field-v" style="font-size:13px;color:var(--green)">${esc(c.visaBasis)}</div></div>
          <div class="field" style="margin:0"><div class="field-k">💰 Financial Stacking &amp; Earnings</div><div class="field-v" style="font-size:13px;font-weight:600">${esc(c.financialStack)}</div></div>
          <div class="field" style="margin:0"><div class="field-k">🎯 Permanent Residence (PR) Pathway</div><div class="field-v" style="font-size:13px">${esc(c.prPathway)}</div></div>
          <div class="note acc" style="margin-top:8px;font-size:12.5px"><div><strong>Next Joint Action:</strong> ${esc(c.nextAction)}</div></div>
        </div>
      `).join('')}
    </div>

    <div class="section-title" style="margin-top:28px"><h2>Couple Co-Location Matrix (WS-D5)</h2><span class="aside">Same City vs. Split Province Risk Assessment</span></div>
    <div class="panel" style="margin-bottom:24px">
      <div class="table-wrap" style="max-height:none">
        <table class="tbl dense">
          <thead>
            <tr>
              <th>Hasibul Target</th>
              <th>Zarin Target</th>
              <th>Location / Corridor</th>
              <th>Status</th>
              <th>Synergy / Risk Detail</th>
              <th>Combined Funding</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof COUPLE_COLOCATION_MATRIX !== 'undefined' ? COUPLE_COLOCATION_MATRIX : []).map(cm => `
              <tr style="background:${cm.status === 'SPLIT_PROVINCE' ? 'rgba(239, 68, 68, 0.05)' : 'var(--card-bg, #fff)'}">
                <td><strong>${esc(cm.hisTarget)}</strong></td>
                <td><strong>${esc(cm.herTarget)}</strong></td>
                <td>${esc(cm.city)}</td>
                <td><span class="tag ${cm.status === 'SPLIT_PROVINCE' ? 'bad' : 'ok'}">${esc(cm.statusLabel)}</span></td>
                <td>${esc(cm.synergy)}</td>
                <td style="font-weight:600;font-size:12.5px">${esc(cm.combinedFunding)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-title" style="margin-top:28px"><h2>🇸🇪 Sweden 4-Program Synchronizer &amp; Rank Optimizer</h2><span class="aside">Avoid Automatic Choice Deletion on universityadmissions.se</span></div>
    <div class="panel" style="margin-bottom:24px;padding:18px 20px">
      <p style="font-size:13.5px;color:var(--ink-2);margin:0 0 16px;line-height:1.55">
        <strong>The Sweden Central Admissions Rule:</strong> You can apply to a maximum of 4 programs. If you are admitted to your higher choice (e.g. #1), all lower choices (#2, #3, #4) are deleted automatically. To live together, both applicants must synchronize their 4 rankings by city corridor.
      </p>
      <div class="grid g2" style="gap:20px">
        ${(typeof SWEDEN_RANK_OPTIMIZER !== 'undefined' && SWEDEN_RANK_OPTIMIZER.strategies ? SWEDEN_RANK_OPTIMIZER.strategies : []).map(st => `
          <div style="background:var(--sheet-2);padding:16px;border-radius:var(--r-ctl);border:1px solid var(--rule)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <h3 style="font-size:15px;margin:0">${esc(st.name)}</h3>
              <span class="tag acc">${esc(st.location)}</span>
            </div>
            <div class="dim" style="font-size:12px;margin:4px 0 12px">${esc(st.synergyRating)}</div>
            
            <div style="margin-bottom:12px">
              <div style="font-size:12px;font-weight:700;color:var(--teal);margin-bottom:4px">👨‍💼 Hasibul 4-Rank Order</div>
              <ol style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.45">
                ${st.hisRank.map(r => `<li><strong>${esc(r.name)}</strong> <span class="dim">(${esc(r.code)})</span> — ${esc(r.fit)}</li>`).join('')}
              </ol>
            </div>

            <div style="margin-bottom:12px">
              <div style="font-size:12px;font-weight:700;color:var(--amber);margin-bottom:4px">👩‍💼 Zarin 4-Rank Order</div>
              <ol style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.45">
                ${st.herRank.map(r => `<li><strong>${esc(r.name)}</strong> <span class="dim">(${esc(r.code)})</span> — ${esc(r.fit)}</li>`).join('')}
              </ol>
            </div>

            <div class="note ok" style="font-size:12px;margin:0">
              <div><strong>Combined Funding &amp; Living:</strong> ${esc(st.financialSummary)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-title" style="margin-top:28px"><h2>Couple Household Budget &amp; Net Surplus Comparison</h2><span class="aside">Realistic monthly estimates</span></div>
    <div class="panel">
      <div class="table-wrap" style="max-height:none">
        <table class="budget-table">
          <thead>
            <tr>
              <th>Country / Corridor</th>
              <th>Combined Monthly Income</th>
              <th>Couple Housing / Apartment</th>
              <th>Food &amp; Living Costs</th>
              <th>Health Insurance</th>
              <th>Net Monthly Surplus (Savings)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🇸🇪 Sweden (Dual SISGP)</strong></td>
              <td class="num">${esc(budgets.sweden.income)}</td>
              <td>${esc(budgets.sweden.housing)}</td>
              <td>${esc(budgets.sweden.foodLiving)}</td>
              <td>${esc(budgets.sweden.insurance)}</td>
              <td class="surplus">${esc(budgets.sweden.netSavings)}</td>
            </tr>
            <tr>
              <td><strong>🇩🇪 Germany (EPOS + Spouse Job)</strong></td>
              <td class="num">${esc(budgets.germany.income)}</td>
              <td>${esc(budgets.germany.housing)}</td>
              <td>${esc(budgets.germany.foodLiving)}</td>
              <td>${esc(budgets.germany.insurance)}</td>
              <td class="surplus">${esc(budgets.germany.netSavings)}</td>
            </tr>
            <tr>
              <td><strong>🇨🇦 Canada (Research RA + SCM Job)</strong></td>
              <td class="num">${esc(budgets.canada.income)}</td>
              <td>${esc(budgets.canada.housing)}</td>
              <td>${esc(budgets.canada.foodLiving)}</td>
              <td>${esc(budgets.canada.insurance)}</td>
              <td class="surplus">${esc(budgets.canada.netSavings)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  $$('[data-goview]', root).forEach(b => b.onclick = () => go(b.dataset.goview));
}

function renderUserInputCard() {
  const items = (typeof USER_INPUT_NEEDED !== 'undefined' ? USER_INPUT_NEEDED : []);
  let savedStatus = {};
  try { savedStatus = JSON.parse(localStorage.getItem('sv-user-inputs') || '{}'); } catch (e) {}
  const pending = items.filter(it => !savedStatus[it.id]);
  if (!pending.length) return '';
  return `
    <div class="note warn" style="margin-top:16px;border-left:4px solid var(--amber)">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>⚠️ Action Required: Missing Personal Documents Data (${pending.length})</strong>
          <span class="dim" style="font-size:12px">Only you can provide these</span>
        </div>
        <p style="font-size:12.5px;margin:6px 0 10px;color:var(--ink-2)">These values could not be verified by automated OCR and require manual confirmation from physical papers:</p>
        <div class="rows" style="gap:6px">
          ${pending.map(it => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--card-bg, #fff);border-radius:4px;border:1px solid var(--rule)">
              <div>
                <span class="tag acc" style="margin-right:6px">${esc(it.person)}</span>
                <strong>${esc(it.label)}</strong>: <span class="dim">${esc(it.desc)}</span>
              </div>
              <button class="btn btn-sm" type="button" data-userinput="${esc(it.id)}">Mark Provided</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function wireUserInputCard(root) {
  $$('[data-userinput]', root).forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.userinput;
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem('sv-user-inputs') || '{}'); } catch (e) {}
      saved[id] = true;
      try { localStorage.setItem('sv-user-inputs', JSON.stringify(saved)); } catch (e) {}
      toast('Item marked as provided', id);
      render();
    };
  });
}

function renderDashboard(root) {
  if (app.profileMode === 'couple') {
    renderCoupleDashboard(root);
    return;
  }
  if (app.profileMode === 'zarin') {
    renderZarinDashboard(root);
    return;
  }

  const st = app.state;
  const M = app.missions.missions;
  const done = st.missions.filter(m => m.status === 'done').length;
  const total = M.length;
  const evs = horizonEvents();
  const tw = app.missions.thisWeek.map(w => ({ ...w, m: missionMeta(w.id) }));

  /* category progress */
  const cat = {};
  M.forEach(m => { const c = m.category || 'Other'; cat[c] = cat[c] || { t: 0, d: 0 }; cat[c].t++; if (isDone(m.id)) cat[c].d++; });
  const cats = Object.entries(cat).sort((a, b) => b[1].t - a[1].t);

  /* activity from real completion timestamps */
  const byDay = {};
  st.missions.forEach(m => { if (m.status === 'done' && m.completedAt) { const k = isoLocal(new Date(m.completedAt)); byDay[k] = (byDay[k] || 0) + 1; } });
  const cells = [];
  const startHeat = new Date(TODAY); startHeat.setDate(startHeat.getDate() - 7 * 12 + 1 - ((TODAY.getDay() + 6) % 7 === 6 ? 0 : 0));
  for (let i = 7 * 12 - 1; i >= 0; i--) {
    const dt = new Date(TODAY); dt.setDate(dt.getDate() - i);
    const k = isoLocal(dt), n = byDay[k] || 0;
    cells.push({ k, n, l: n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : 4, label: fmtShort(k) });
  }
  const activeDays = cells.filter(c => c.n).length;

  const upcoming = evs.filter(e => e.d >= 0 && e.kind !== 'session').slice(0, 7);
  const openT = app.content.targets.filter(t => t.status === 'open').length;
  const docsMissing = app.content.documents.filter(d => ['missing', 'not_started'].includes(d.status)).length;

  root.innerHTML = `
    ${pageHead(`<button class="btn" type="button" id="dPal">Search everything <kbd>Ctrl K</kbd></button>`)}
    ${runwayHTML(evs)}

    <div class="pin">
      <div class="pin-ic">${icon('shield')}</div>
      <div>
        <h3>Göttingen EPOS: language and prerequisites cleared</h3>
        <p>Göttingen confirmed in writing that the BUP medium-of-instruction certificate meets the English requirement. Your transcript holds 27 credits of maths, statistics and econometrics against 12 required.</p>
      </div>
      <div class="pin-act" style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-sm" type="button" id="dZoom">Info session · 26 Oct</button>
        <button class="btn btn-sm" type="button" id="dEpos">EPOS playbook</button>
      </div>
    </div>

    ${renderUserInputCard()}

    <div style="margin-top:22px">${stats([
      ['Missions done', `${done}<span class="dim" style="font-size:18px">/${total}</span>`, `${Math.round(done / total * 100)}% of the plan`, 'acc', 'missions'],
      ['Experience', st.xp, `${st.achievements.length} achievements`, 'acc', 'profile'],
      ['Open schemes', openT, `of ${app.content.targets.length} verified targets`, 'ok', 'targets', 'target', 'open'],
      ['Documents missing', docsMissing, 'need chasing', docsMissing ? 'bad' : 'ok', 'documents', 'doc', 'missing'],
      ['Streak', st.streak || 0, `best ${st.longestStreak || 0} days`, '', 'calendar']
    ])}</div>

    <div class="grid split">
      <div class="panel">
        <div class="panel-head"><h2>This week</h2><span class="aside">The standing answer to “what now?”</span></div>
        <div class="rows" style="margin-top:8px">
          ${tw.map(w => {
            const d = w.m ? daysUntil(w.m.deadline) : null;
            return `<div class="task ${w.m && isDone(w.id) ? 'is-done' : ''}">
              <button class="check" type="button" data-toggle="${esc(w.id)}" aria-label="Mark ${esc(w.label)} done">${icon('tick')}</button>
              <div style="cursor:pointer" data-mission="${esc(w.id)}"><div class="task-t">${esc(w.m ? w.m.title : w.label)}</div><div class="task-n">${esc(w.note || '')}</div></div>
              <div class="task-side">${w.m ? `<div class="xp">+${w.m.xp} XP</div>` : ''}${d !== null ? `<div class="due ${dueCls(d)}">${dueText(d)}</div>` : ''}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Coming up</h2><button class="btn btn-sm" type="button" data-go="calendar">Calendar</button></div>
        <div class="rows" style="margin-top:8px">
          ${upcoming.map((e, i) => `<button class="ladder-row ${dueCls(e.d)}" type="button" data-up="${i}">
            <span class="ladder-name">${esc(e.name)}</span><span class="ladder-d num">${e.d}<small>d</small></span>
            <span class="ladder-date">${fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </button>`).join('')}
        </div>
      </div>
    </div>

    <div class="grid g3" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>Progress by track</h2></div>
        <div class="panel-body">
          ${cats.map(([n, c]) => `<div class="cat-row" data-track="${esc(n)}" style="cursor:pointer" title="View ${esc(n)} missions"><span>${esc(n)}</span><div class="bar"><i style="width:${Math.round(c.d / c.t * 100)}%"></i></div><span class="num">${c.d}/${c.t}</span></div>`).join('')}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Activity</h2><span class="aside">${plural(activeDays, 'active day')}, 12 weeks</span></div>
        <div class="panel-body">
          <div class="heat">${cells.map(c => `<div class="heat-cell" data-l="${c.l}" title="${c.label}: ${plural(c.n, 'completion')}"></div>`).join('')}</div>
          <div class="heat-legend">Less <span class="heat-cell"></span><span class="heat-cell" data-l="1"></span><span class="heat-cell" data-l="2"></span><span class="heat-cell" data-l="3"></span><span class="heat-cell" data-l="4"></span> More</div>
          <p class="dim" style="font-size:12.5px;margin:12px 0 0">Built only from the moments you marked missions done.</p>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Weekly rhythm</h2></div>
        <div class="panel-body rows">
          ${app.missions.routine.map(r => `<div class="cadence"><b>${esc(r.day)}</b><span class="muted">${esc(r.task)}</span></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="section-title"><h2>Ruled out</h2><span class="aside">Checked and closed, so you don't spend time on them again</span></div>
    <div class="panel"><div class="panel-body grid g2" style="gap:0 32px">
      ${app.content.deadEnds.slice(0, 8).map((d, i) => `<div class="dead" data-dead="${i}" style="cursor:pointer" title="Click to view reason"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.reason || d.why || '')}</div></div></div>`).join('')}
    </div></div>
    ${app.content.deadEnds.length > 8 ? `<p style="margin-top:10px"><button class="btn btn-sm" type="button" data-go="targets">See all ${app.content.deadEnds.length} on Targets</button></p>` : ''}
  `;

  const ticksVis = (() => {
    const start = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    return evs.filter(e => parse(e.date) >= start);
  })();
  layoutRunway(root);
  $$('[data-tk]', root).forEach(b => b.onclick = () => ticksVis[+b.dataset.tk]?.open?.());
  $$('[data-up]', root).forEach(b => b.onclick = () => upcoming[+b.dataset.up]?.open?.());
  $$('[data-toggle]', root).forEach(b => b.onclick = () => toggleMission(b.dataset.toggle));
  $$('[data-mission]', root).forEach(b => b.onclick = () => openMission(b.dataset.mission));
  $$('[data-track]', root).forEach(el => el.onclick = () => { app.f.mission = el.dataset.track; go('missions'); });
  $$('[data-dead]', root).forEach(el => el.onclick = () => { const d = app.content.deadEnds[+el.dataset.dead]; if (d) openDeadModal(d); });
  const upcomingEvs = evs.filter(e => e.d >= 0);
  const nextEv = upcomingEvs.find(e => e.kind !== 'session') || upcomingEvs[0];
  const rb = $('.runway-big', root);
  if (rb && nextEv) rb.onclick = () => nextEv.open?.();
  $$('[data-go]', root).forEach(b => b.onclick = () => go(b.dataset.go));
  $('#dPal').onclick = openPalette;
  $('#dZoom').onclick = openZoom;
  $('#dEpos').onclick = () => { app.openPlay = 'epos'; go('playbook'); };
  wireUserInputCard(root);
}

function openCritical(c) {
  const d = daysUntil(c.date);
  const t = app.content.targets.find(x => (x.short || x.name).toLowerCase().includes(c.name.split(' ')[0].toLowerCase()));
  openModal(`<h2>${esc(c.name)} deadline</h2>
    <div class="tags"><span class="tag bad">Hard deadline</span><span class="tag plain">${fmt(c.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span><span class="tag ${d <= 30 ? 'warn' : 'plain'}">${dueText(d)}</span></div>
    <div class="field"><div class="field-v">Everything for ${esc(c.name)} must be final before this date: language evidence, references, transcripts and the portal entry. Plan to submit at least a week early.</div></div>
    ${t ? `<div style="margin-top:20px"><button class="btn btn-primary" type="button" id="cT">Open ${esc(t.short || t.name)}</button></div>` : ''}`);
  if (t) $('#cT').onclick = () => openTarget(t.id);
}

function openZoom() {
  openModal(`<h2>Göttingen EPOS info session</h2>
    <div class="dialog-sub">Hosted by the EPOS coordination team for the MSc Development Economics</div>
    <div class="tags"><span class="tag acc">Monday 26 October 2026</span><span class="tag plain">2:30 pm CEST · 6:30 pm Dhaka</span><span class="tag plain">Zoom</span></div>
    <div class="field"><div class="field-k">Join</div><div class="field-v"><a href="https://uni-goettingen.zoom-x.de/j/66267560614" target="_blank" rel="noopener">uni-goettingen.zoom-x.de/j/66267560614</a> · meeting ID <span class="num">662 6756 0614</span></div></div>
    <div class="field"><div class="field-k">Questions to ask</div><ul class="list">
      <li>Confirm the 126-credit BSS with 27 credits in maths and statistics and 87 in economics satisfies the quantitative requirement.</li>
      <li>Confirm the medium-of-instruction certificate already in the portal covers every language requirement.</li>
    </ul></div>`);
}

function openDeadModal(d) {
  openModal(`<h2>🚫 ${esc(d.name)}</h2>
    <div class="dialog-sub">Disqualified Scheme / Dead End</div>
    <div class="tags" style="margin-top:10px"><span class="tag bad">Ruled Out</span><span class="tag plain">Do Not Re-tread</span></div>
    <div class="field" style="margin-top:16px"><div class="field-k">Why this is disqualified</div><div class="field-v" style="color:var(--ink-2);line-height:1.6">${esc(d.reason || d.why || '')}</div></div>
    <div style="margin-top:20px;display:flex;justify-content:flex-end">
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>`);
}

/* ============================================================================
   CALENDAR
   ============================================================================ */
function calendarEvents() {
  const evs = [];
  app.content.targets.forEach(t => {
    const dl = fv(t.deadline);
    if (dl) evs.push({ id: 't-' + t.id, date: dl, title: `${t.flag || ''} ${t.short || t.name}`, kind: 'target', cls: t.priority === 'P0' ? 'critical' : 'target', open: () => openTarget(t.id) });
    const gdl = fv(t.gateDeadline);
    if (gdl) evs.push({ id: 'g-' + t.id, date: gdl, title: `${t.short || t.name} university application`, kind: 'target', cls: 'target', open: () => openTarget(t.id) });
  });
  app.missions.missions.forEach(m => {
    const mdl = fv(m.deadline);
    if (mdl) evs.push({ id: 'm-' + m.id, date: mdl, title: m.title, kind: 'mission', cls: isDone(m.id) ? 'done' : m.urgency === 'critical' ? 'critical' : m.urgency === 'high' ? 'high' : '', open: () => openMission(m.id) });
  });
  CRITICAL_DATES.forEach(c => evs.push({ id: 'c-' + c.name, date: fv(c.date), title: `${c.name} deadline`, kind: 'critical', cls: 'critical', open: () => openCritical(c) }));
  evs.push({ id: 'zoom', date: fv(ZOOM.date), title: 'Göttingen info session', kind: 'session', cls: 'high', open: openZoom });
  return evs;
}

function renderCalendar(root) {
  const cur = app.calDate || new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const y = cur.getFullYear(), m = cur.getMonth();
  const all = calendarEvents();
  let evs = all;
  if (app.f.cal === 'target') evs = evs.filter(e => e.kind === 'target');
  if (app.f.cal === 'mission') evs = evs.filter(e => e.kind === 'mission');
  if (app.f.cal === 'critical') evs = evs.filter(e => e.cls === 'critical');
  const first = (new Date(y, m, 1).getDay() + 6) % 7; /* Monday-first */
  const cells = [];
  for (let i = 0; i < 42; i++) { const d = new Date(y, m, 1 - first + i); cells.push({ d, iso: isoLocal(d), cur: d.getMonth() === m }); }
  const monthEvs = evs.filter(e => e.date.startsWith(`${y}-${String(m + 1).padStart(2, '0')}`)).sort((a, b) => a.date.localeCompare(b.date));

  root.innerHTML = `${pageHead()}
    <div class="cal-head">
      <div class="cal-nav">
        <button class="btn btn-sm" type="button" id="cPrev" aria-label="Previous month">‹</button>
        <div class="cal-month">${cur.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
        <button class="btn btn-sm" type="button" id="cNext" aria-label="Next month">›</button>
        <button class="btn btn-sm" type="button" id="cToday">Today</button>
      </div>
      ${chips('calF', [['all', 'Everything'], ['target', 'Scheme deadlines'], ['mission', 'Missions'], ['critical', 'Critical only']], app.f.cal)}
    </div>
    <div class="cal-grid">
      ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => `<div class="cal-wd">${w}</div>`).join('')}
      ${cells.map(c => `<div class="cal-cell ${c.cur ? '' : 'other'} ${c.iso === TODAY_ISO ? 'today' : ''}">
        <span class="cal-n">${c.d.getDate()}</span>
        ${evs.filter(e => e.date === c.iso).map(e => `<button class="ev ${e.cls}" type="button" data-ev="${esc(e.id)}" title="${esc(e.title)}">${esc(e.title)}</button>`).join('')}
      </div>`).join('')}
    </div>
    <div class="panel" style="margin-top:18px">
      <div class="panel-head"><h2>This month</h2><span class="aside">${plural(monthEvs.length, 'item')}</span></div>
      <div class="rows" style="margin-top:8px">
        ${monthEvs.map(e => `<button class="agenda-row" type="button" data-ev="${esc(e.id)}">
          <span class="agenda-date">${fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          <span>${esc(e.title)}</span>
          <span class="tag ${e.cls === 'critical' ? 'bad' : e.cls === 'done' ? 'ok' : e.cls === 'high' ? 'warn' : 'plain'}">${e.cls === 'done' ? 'Done' : e.kind === 'mission' ? 'Mission' : e.kind === 'session' ? 'Session' : 'Deadline'}</span>
        </button>`).join('') || '<div class="empty">Nothing scheduled this month.</div>'}
      </div>
    </div>`;
  const setM = (d) => { app.calDate = d; renderCalendar(root); };
  $('#cPrev').onclick = () => setM(new Date(y, m - 1, 1));
  $('#cNext').onclick = () => setM(new Date(y, m + 1, 1));
  $('#cToday').onclick = () => setM(null);
  wireChips(root, 'calF', k => { app.f.cal = k; renderCalendar(root); });
  $$('[data-ev]', root).forEach(b => b.onclick = () => all.find(e => e.id === b.dataset.ev)?.open());
}

/* ============================================================================
   TIMELINE
   ============================================================================ */
function renderTimeline(root) {
  const rows = [
    ...app.content.targets.filter(t => fv(t.deadline)).map(t => ({ date: fv(t.deadline), name: `${t.flag || ''} ${t.name}`, kind: 'Scheme', open: () => openTarget(t.id) })),
    ...app.content.targets.filter(t => fv(t.gateDeadline)).map(t => ({ date: fv(t.gateDeadline), name: `${t.short || t.name}: ${t.gateLabel || 'university application'}`, kind: 'University', open: () => openTarget(t.id) })),
    ...app.content.documents.filter(d => fv(d.deadline)).map(d => ({ date: fv(d.deadline), name: d.name, kind: 'Document' })),
    ...app.missions.missions.filter(m => fv(m.deadline)).map(m => ({ date: fv(m.deadline), name: m.title, kind: isDone(m.id) ? 'Done' : 'Mission', open: () => openMission(m.id) }))
  ].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const groups = {};
  rows.forEach(r => (groups[r.date.slice(0, 7)] = groups[r.date.slice(0, 7)] || []).push(r));
  const flat = [];
  root.innerHTML = `${pageHead()}<div class="panel"><div class="panel-body" style="padding:6px 24px">
    ${Object.entries(groups).map(([mo, items]) => `<div class="tl-month">
      <div class="tl-mname">${parse(mo + '-01').toLocaleDateString('en-GB', { month: 'long' })}<span>${mo.slice(0, 4)} · ${plural(items.length, 'item')}</span></div>
      <div>${items.map(r => { const d = daysUntil(r.date); flat.push(r); return `<div class="tl-item ${d < 0 ? 'past' : d <= 30 ? 'hot' : ''}">
        <span class="tl-day">${fmt(r.date, { day: 'numeric', month: 'short' })}<br><span class="dim">${d < 0 ? 'passed' : d + 'd'}</span></span>
        <span class="tl-name">${r.open ? `<a href="#" data-tl="${flat.length - 1}">${esc(r.name)}</a>` : esc(r.name)}</span>
        <span class="tag ${r.kind === 'Done' ? 'ok' : r.kind === 'Scheme' ? 'acc' : 'plain'}">${esc(r.kind)}</span>
      </div>`; }).join('')}</div>
    </div>`).join('')}
  </div></div>`;
  $$('[data-tl]', root).forEach(a => a.onclick = (e) => { e.preventDefault(); flat[+a.dataset.tl].open(); });
}

/* ============================================================================
   MISSIONS
   ============================================================================ */
function renderMissions(root) {
  const M = getActiveMissions();
  const done = M.filter(m => isDone(m.id)).length;
  const xpAll = M.reduce((a, m) => a + m.xp, 0);
  const cats = ['all', ...(app.profileMode === 'hasibul' ? ['thisweek'] : []), ...new Set(M.map(m => m.category))];
  let list = M.slice();
  if (app.f.mission === 'thisweek' && app.profileMode === 'hasibul') { const ids = app.missions.thisWeek.map(w => w.id); list = list.filter(m => ids.includes(m.id)); }
  else if (app.f.mission === 'open') list = list.filter(m => !isDone(m.id));
  else if (app.f.mission !== 'all') list = list.filter(m => m.category === app.f.mission);
  const urg = { critical: 0, high: 1, medium: 2, low: 3 };
  list.sort((a, b) => (isDone(a.id) - isDone(b.id)) || (urg[a.urgency] ?? 9) - (urg[b.urgency] ?? 9) || String(a.deadline || '9').localeCompare(String(b.deadline || '9')));

  const xpEarned = app.profileMode === 'zarin' ? (getProfileState('zarin').xp || 0) : app.state.xp;

  root.innerHTML = `${pageHead()}
    ${stats([['Done', done, `of ${M.length} missions`, 'ok'], ['Still open', M.length - done, 'sorted by urgency'], ['Your XP', xpEarned, `of ${xpAll} available`, 'acc'],
      ['Critical open', M.filter(m => m.urgency === 'critical' && !isDone(m.id)).length, 'do these first', 'bad']])}
    <div class="toolbar">${chips('mF', cats.map(c => [c, c === 'all' ? 'All' : c === 'thisweek' ? 'This week' : c]), app.f.mission)}</div>
    <div class="panel rows">
      ${list.map(m => { const d = daysUntil(m.deadline); return `<div class="mission ${isDone(m.id) ? 'is-done' : ''}">
        <button class="check" type="button" data-toggle="${esc(m.id)}" aria-label="Toggle ${esc(m.title)}">${icon('tick')}</button>
        <div>
          <div class="mission-title">${esc(m.title)}</div>
          ${m.detail ? `<div class="mission-detail">${esc(m.detail)}</div>` : ''}
          <div class="tags">
            ${m.urgency === 'critical' ? '<span class="tag bad">Critical</span>' : m.urgency === 'high' ? '<span class="tag warn">High</span>' : ''}
            <span class="tag plain">${esc(m.category)}</span>
            ${m.owner ? `<span class="tag plain">${esc(m.owner)}</span>` : ''}
          </div>
          ${m.why || m.checklist?.length ? `<details class="disclose"><summary>Why and checklist</summary><div class="disclose-body">
            ${m.why ? `<p style="margin:0 0 8px">${esc(m.why)}</p>` : ''}
            ${m.checklist?.length ? `<ul class="list">${m.checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
            ${m.actionUrl ? `<p style="margin:8px 0 0"><a href="${esc(m.actionUrl)}" target="_blank" rel="noopener">${esc(m.actionUrl.replace(/^https?:\/\//, ''))}</a></p>` : ''}
          </div></details>` : ''}
        </div>
        <div class="task-side"><div class="xp">+${m.xp} XP</div>${d !== null ? `<div class="due ${isDone(m.id) ? '' : dueCls(d)}">${fmtShort(m.deadline)}<br>${isDone(m.id) ? 'done' : dueText(d)}</div>` : ''}</div>
      </div>`; }).join('') || '<div class="empty">No missions in this filter.</div>'}
    </div>`;
  wireChips(root, 'mF', k => { app.f.mission = k; renderMissions(root); });
  $$('[data-toggle]', root).forEach(b => b.onclick = () => toggleMission(b.dataset.toggle));
}

/* ============================================================================
   DOCUMENTS
   ============================================================================ */
const DOC_STATUS = {
  have: ['ok', 'Ready'], partial: ['warn', 'Partial'], verify: ['warn', 'Verify'], unconfirmed: ['warn', 'Unconfirmed'],
  missing: ['bad', 'Missing'], not_started: ['bad', 'Not started']
};
function renderDocuments(root) {
  const D = getActiveDocuments();
  const cnt = (ss) => D.filter(d => ss.includes(d.status)).length;
  const docsAttached = Object.keys(app.state.docFiles || {}).filter(k => D.some(d => d.id === k)).length;
  const types = ['all', ...new Set(D.map(d => d.type))];
  const order = { missing: 0, not_started: 1, partial: 2, unconfirmed: 3, verify: 4, have: 5 };
  let list = app.f.doc === 'all' ? D.slice() : D.filter(d => d.type === app.f.doc);
  list.sort((a, b) => (b.blocker ? 1 : 0) - (a.blocker ? 1 : 0) || (order[a.status] ?? 9) - (order[b.status] ?? 9));
  const tName = (id) => { const t = getActiveTargets().find(x => x.id === id); return t ? (t.short || t.name) : id; };

  root.innerHTML = `${pageHead()}
    ${stats([
      ['Required', D.length, 'across all applications'],
      ['Ready', cnt(['have']), 'in hand', 'ok'],
      ['Files in Vault', docsAttached, 'download anytime', 'acc'],
      ['Missing', cnt(['missing', 'not_started']), 'not started yet', 'bad'],
      ['Blockers', D.filter(d => d.blocker).length, 'stop an application']
    ])}
    <div class="toolbar">${chips('dF', types.map(t => [t, t === 'all' ? 'All types' : t]), app.f.doc)}</div>
    <div class="panel rows">
      ${list.map(d => {
        const [c, l] = DOC_STATUS[d.status] || ['plain', d.status];
        const attached = app.state.docFiles && app.state.docFiles[d.id];
        return `<div class="doc-row" style="cursor:pointer" data-doc="${esc(d.id)}">
          <span class="doc-dot ${c}" aria-hidden="true"></span>
          <div>
            <div class="doc-name">${esc(d.name)}</div>
            ${d.spec ? `<div class="doc-spec">${esc(d.spec)}</div>` : ''}
            ${attached ? `
              <div style="margin-top:6px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                <span class="doc-attach-pill">📎 ${esc(attached.name)} (${fmtBytes(attached.size)})</span>
                <button class="doc-attach-btn" type="button" data-viewdoc="${esc(d.id)}" title="Preview file in new tab">👁️ View</button>
                <button class="doc-attach-btn" type="button" data-downdoc="${esc(d.id)}" title="Download file to computer/phone">📥 Download</button>
              </div>
            ` : ''}
          </div>
          <div class="doc-for">
            ${(d.req || []).length ? `For ${esc(d.req.map(tName).join(', '))}` : ''}
            ${d.owner ? `<br><span class="dim">From: ${esc(d.owner)}</span>` : ''}
          </div>
          <div class="tags" style="justify-content:flex-end">
            ${attached ? '<span class="tag acc">Attached in Vault</span>' : `
              <label class="doc-attach-btn" style="cursor:pointer" title="Attach file to ${esc(d.name)}" onclick="event.stopPropagation()">
                📎 Attach File
                <input type="file" data-attachinput="${esc(d.id)}" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png" hidden>
              </label>
            `}
            <span class="tag ${c}">${esc(l)}</span>
            ${d.blocker ? '<span class="tag bad plain">Blocker</span>' : ''}
            <span class="tag plain">${esc(d.type)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  wireChips(root, 'dF', k => { app.f.doc = k; renderDocuments(root); });

  $$('[data-doc]', root).forEach(el => {
    el.onclick = () => {
      const d = D.find(x => x.id === el.dataset.doc);
      if (d) openDocModal(d);
    };
  });

  $$('[data-viewdoc]', root).forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      DocStore.view(b.dataset.viewdoc);
    };
  });

  $$('[data-downdoc]', root).forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const doc = D.find(x => x.id === b.dataset.downdoc);
      DocStore.download(b.dataset.downdoc, doc ? doc.name : '');
    };
  });

  $$('[data-attachinput]', root).forEach(inp => {
    inp.onclick = (e) => e.stopPropagation();
    inp.onchange = (e) => {
      e.stopPropagation();
      if (e.target.files && e.target.files[0]) {
        attachFileToDoc(inp.dataset.attachinput, e.target.files[0]);
      }
    };
  });
}

function openDocModal(d) {
  const [c, l] = DOC_STATUS[d.status] || ['plain', d.status];
  const attached = app.state.docFiles && app.state.docFiles[d.id];

  openModal(`
    <h2>${esc(d.name)}</h2>
    <div class="dialog-sub">${esc(d.type || 'Official Document')} · Owner: <strong>${esc(d.owner || 'You')}</strong></div>
    <div class="tags" style="margin-top:10px">
      <span class="tag ${c}">${esc(l)}</span>
      ${attached ? '<span class="tag acc">Attached in Vault</span>' : '<span class="tag plain">No File Attached</span>'}
      ${d.blocker ? '<span class="tag bad plain">Hard Blocker</span>' : '<span class="tag plain">Standard Requirement</span>'}
      ${d.deadline ? `<span class="tag plain">Deadline: ${fmt(d.deadline)}</span>` : ''}
    </div>

    <!-- DOCUMENT VAULT & ATTACHMENT CARD -->
    <div class="vault-card">
      <div class="vault-header">
        <h4>📎 Document Vault &amp; Direct Export</h4>
        <span class="dim" style="font-size:12px">${attached ? 'Stored in Vault' : 'Attach file to store permanently'}</span>
      </div>
      ${attached ? `
        <div class="file-meta-box">
          <div>
            <div style="font-weight:600;font-size:13.5px;color:var(--teal)">📎 ${esc(attached.name)}</div>
            <div class="dim" style="font-size:12px;margin-top:2px">${fmtBytes(attached.size)} · Saved in vault on ${fmt(attached.date)}</div>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-sm btn-primary" type="button" id="vaultViewBtn">👁️ View in New Tab</button>
            <button class="btn btn-sm btn-primary" type="button" id="vaultDownBtn">📥 Download File</button>
            <label class="btn btn-sm" style="cursor:pointer">🔄 Replace<input type="file" id="vaultReplaceInput" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png" hidden></label>
            <button class="btn btn-sm" type="button" id="vaultDeleteBtn" style="color:var(--red)">🗑️ Remove</button>
          </div>
        </div>
      ` : `
        <label class="drop-zone" style="display:block">
          <div style="font-size:22px;margin-bottom:2px">📎</div>
          <div style="font-weight:600;font-size:13.5px">Attach official ${esc(d.name)}</div>
          <div class="dim" style="font-size:12px;margin-top:2px">Select PDF, Word, or Scanned Image from your computer or phone (up to 50MB) to access, preview, and download anytime</div>
          <input type="file" id="vaultUploadInput" accept=".pdf,.docx,.doc,.jpg,.jpeg,.png" hidden>
        </label>
      `}
    </div>

    <div class="field" style="margin-top:16px">
      <div class="field-k">Specification &amp; Required Format</div>
      <div class="field-v">${esc(d.spec || 'Official documentation required for university admission and study permit issuance.')}</div>
    </div>
    ${d.note ? `<div class="note warn" style="margin-top:14px"><div><strong>Action Guidance:</strong> ${esc(d.note)}</div></div>` : ''}
    <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
      <button class="btn" id="docToggleBtn" type="button">
        ${d.status === 'have' ? 'Mark as Missing' : 'Mark as Ready / Acquired'}
      </button>
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);

  if (attached) {
    const vBtn = $('#vaultViewBtn');
    if (vBtn) vBtn.onclick = () => DocStore.view(d.id);
    const dBtn = $('#vaultDownBtn');
    if (dBtn) dBtn.onclick = () => DocStore.download(d.id, d.name);
    const repInp = $('#vaultReplaceInput');
    if (repInp) repInp.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        attachFileToDoc(d.id, e.target.files[0]).then(() => openDocModal(d));
      }
    };
    const delBtn = $('#vaultDeleteBtn');
    if (delBtn) delBtn.onclick = () => {
      removeFileFromDoc(d.id).then(() => openDocModal(d));
    };
  } else {
    const upInp = $('#vaultUploadInput');
    if (upInp) upInp.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        attachFileToDoc(d.id, e.target.files[0]).then(() => openDocModal(d));
      }
    };
  }

  const btn = $('#docToggleBtn');
  if (btn) {
    btn.onclick = () => {
      d.status = d.status === 'have' ? 'missing' : 'have';
      toast(d.status === 'have' ? 'Document marked ready' : 'Document marked missing', d.name);
      closeModal();
      render();
    };
  }
}

/* ============================================================================
   WORKBOOK
   ============================================================================ */
function renderExcel(root) {
  const db = (app.excel && app.excel.database) || (typeof EXCEL_DATABASE !== 'undefined' ? EXCEL_DATABASE : {});
  const allNames = Object.keys(db);
  if (!allNames.length) { root.innerHTML = pageHead() + '<div class="empty">The workbook data is not in this file.</div>'; return; }

  // Filter sheets by active profile
  let names = allNames;
  if (app.profileMode === 'zarin') {
    names = allNames.filter(n => n.includes('Zarin') || n.includes('Couple') || n.includes('Census'));
  } else if (app.profileMode === 'couple') {
    names = allNames.filter(n => n.includes('Couple') || n.includes('Timeline') || n.includes('Audit') || n.includes('Applications'));
  } else {
    names = allNames.filter(n => !n.includes('Zarin'));
  }
  if (!names.length) names = allNames;

  const sheet = names.includes(app.f.sheet) ? app.f.sheet : names[0];
  const rows = db[sheet] || [];
  /* first row is a title; find the real header row = first row with 3+ non-empty cells after any title rows */
  let hi = rows.findIndex((r, i) => i > 0 && r.filter(c => String(c ?? '').trim()).length >= Math.min(4, r.length));
  if (hi < 0) hi = 0;
  const preface = rows.slice(0, hi).map(r => r.filter(Boolean).join(' ')).filter(Boolean);
  const header = rows[hi] || [];
  const q = app.f.sheetQuery.toLowerCase().trim();
  let data = rows.slice(hi + 1).filter(r => r.some(c => String(c ?? '').trim()));
  if (q) data = data.filter(r => r.some(c => String(c ?? '').toLowerCase().includes(q)));

  app.excelSort = app.excelSort || { col: null, asc: true };
  if (app.excelSort.col !== null && app.excelSort.col < header.length) {
    const sc = app.excelSort.col;
    data.sort((a, b) => {
      const va = (a[sc] != null ? String(a[sc]) : '').trim();
      const vb = (b[sc] != null ? String(b[sc]) : '').trim();
      const na = parseFloat(va);
      const nb = parseFloat(vb);
      let res = 0;
      if (!isNaN(na) && !isNaN(nb) && !/[a-zA-Z]/.test(va) && !/[a-zA-Z]/.test(vb)) {
        res = na - nb;
      } else {
        res = va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' });
      }
      return app.excelSort.asc ? res : -res;
    });
  }

  const cellCls = (v) => /^(PASS|YES)\b|✅/.test(v) ? 'c-ok' : /^(FAIL|NO)\b|🔴/.test(v) ? 'c-bad' : /^P0\b/.test(v) ? 'c-acc' : '';

  root.innerHTML = `${pageHead(`<a class="btn btn-primary" href="ScholarVerse_Master_Database.xlsx" download>Download .xlsx</a>`)}
    <div class="toolbar">
      ${chips('xS', names.map(n => [n, n]), sheet)}
      <input class="input" id="xQ" type="search" placeholder="Filter rows in this sheet" value="${esc(app.f.sheetQuery)}">
    </div>
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2>${esc(preface[0] || sheet)}</h2>
          ${preface[1] ? `<div class="muted" style="font-size:13.5px;margin-top:4px">${esc(preface[1])}</div>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="dim" style="font-size:12px">Click column to sort · Click row to inspect</span>
          <span class="aside num">${plural(data.length, 'row')}</span>
        </div>
      </div>
      <div class="table-wrap" style="margin-top:14px;border-top:1px solid var(--rule)">
        <table class="tbl dense"><thead><tr>${header.map((h, i) => {
          const isSorted = app.excelSort.col === i;
          const arrow = isSorted ? (app.excelSort.asc ? ' ▲' : ' ▼') : '';
          return `<th class="excel-th" data-col="${i}" style="cursor:pointer;user-select:none" title="Click to sort">${esc(h)}<span style="color:var(--teal);font-weight:bold">${arrow}</span></th>`;
        }).join('')}</tr></thead>
        <tbody>${data.map((r, rIdx) => `<tr data-row="${rIdx}" style="cursor:pointer">${header.map((_, i) => { const v = String(r[i] ?? ''); return `<td class="${cellCls(v)}">${esc(v)}</td>`; }).join('')}</tr>`).join('')}</tbody></table>
        ${data.length ? '' : '<div class="empty">No rows match.</div>'}
      </div>
    </div>`;
  wireChips(root, 'xS', k => { app.f.sheet = k; app.f.sheetQuery = ''; app.excelSort = { col: null, asc: true }; renderExcel(root); });
  const inp = $('#xQ');
  inp.oninput = () => { app.f.sheetQuery = inp.value; const pos = inp.selectionStart; renderExcel(root); const n = $('#xQ'); n.focus(); n.setSelectionRange(pos, pos); };

  $$('.excel-th', root).forEach(th => {
    th.onclick = () => {
      const col = parseInt(th.dataset.col, 10);
      if (app.excelSort.col === col) app.excelSort.asc = !app.excelSort.asc;
      else { app.excelSort.col = col; app.excelSort.asc = true; }
      renderExcel(root);
    };
  });

  $$('tbody tr[data-row]', root).forEach(tr => {
    tr.onclick = () => {
      const row = data[+tr.dataset.row];
      if (row) openRowModal(sheet, header, row);
    };
  });
}

function openRowModal(sheet, header, row) {
  openModal(`
    <h2>${esc(row[1] || row[0] || 'Record Details')}</h2>
    <div class="dialog-sub">Workbook sheet: <strong>${esc(sheet)}</strong></div>
    <div style="margin-top:16px;max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:12px">
      ${header.map((h, i) => `
        <div class="field" style="margin:0">
          <div class="field-k">${esc(h)}</div>
          <div class="field-v" style="background:var(--sheet-2);padding:8px 12px;border-radius:var(--r-ctl);border:1px solid var(--rule);white-space:pre-wrap">${esc(row[i] || '—')}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:20px;display:flex;justify-content:flex-end">
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);
}

/* ============================================================================
   TARGETS
   ============================================================================ */
const T_STATUS = { open: ['ok', 'Open now'], opening_soon: ['warn', 'Opening soon'], closed: ['bad', 'Closed'] };

function openTarget(id) {
  const t = app.content.targets.find(x => x.id === id); if (!t) return;
  const d = daysUntil(t.deadline);
  const [sc, sl] = T_STATUS[t.status] || ['plain', t.status];
  const list = (a) => a && a.length ? `<ul class="list">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<div class="dim">None recorded.</div>';
  openModal(`
    <h2>${t.flag || ''} ${esc(t.name)}</h2>
    <div class="dialog-sub">${esc(t.country)} · tier ${t.tier} · priority ${esc(t.priority || '—')}</div>
    <div class="tags"><span class="tag ${sc}">${sl}</span>${d !== null ? `<span class="tag ${d <= 30 ? 'warn' : 'plain'}">${dueText(d)}</span>` : ''}<span class="tag plain">${esc(t.deadlineLabel || fmt(t.deadline))}</span></div>
    ${t.nextAction ? `<div class="next-step"><b>Next action</b>${esc(t.nextAction)}</div>` : ''}
    ${t.scoring ? `
      <div class="field" style="margin-top:16px"><div class="field-k">Decision Analytics &amp; Scoring (WS-D1)</div>
        <div class="tags" style="margin-top:4px">
          <span class="tag ok">Admit Odds: ${t.scoring.admitOdds}/5</span>
          <span class="tag ${t.scoring.fullCostCovered === 'yes' ? 'ok' : t.scoring.fullCostCovered === 'no' ? 'bad' : 'warn'}">Full Cost: ${esc(t.scoring.fullCostCovered)}</span>
          <span class="tag acc">Subject Fit: ${t.scoring.subjectFit}/5</span>
          <span class="tag plain">Career / PR: ${t.scoring.careerPR}/5</span>
        </div>
        <p class="dim" style="font-size:12px;margin:6px 0 0">Rationale: ${esc(t.scoring.admitRationale || '')} ${esc(t.scoring.fullCostRationale || '')}</p>
      </div>
    ` : ''}
    <div class="field"><div class="field-k">Funding</div><div class="field-v">${esc(fv(t.funding))}${factBadge(t.funding)}${t.fundingDetail ? `\n<span class="muted">${esc(fv(t.fundingDetail))}</span>${factBadge(t.fundingDetail)}` : ''}</div></div>
    ${t.subjectFit ? `<div class="field"><div class="field-k">Subject fit</div><div class="field-v">${esc(t.subjectFit)}</div></div>` : ''}
    <div class="field"><div class="field-k">How to apply</div><div class="field-v">${esc(t.route)}${t.gateLabel ? `\n<span class="muted">${esc(t.gateLabel)}</span>` : ''}</div></div>
    <div class="field"><div class="field-k">Why it matters</div><div class="field-v">${esc(t.why)}</div></div>
    <div class="field"><div class="field-k">Eligible programmes</div>${list(t.eligibleProgrammes)}</div>
    ${t.requiredDocs?.length ? `
      <div class="field" style="margin-top:18px">
        <div class="field-k" style="color:var(--teal)">🏛️ Pre-Flight Document Bundle Audit (${t.requiredDocs.length} Mandatory Section C Items)</div>
        <div class="rows" style="gap:6px;margin-top:8px">
          ${t.requiredDocs.map(rd => {
            const doc = (app.content.documents || []).find(d => d.id === rd.docId) || {};
            const isHeld = doc.status === 'have';
            const fileMeta = app.state.docFiles && app.state.docFiles[rd.docId];
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--sheet-2);border-radius:var(--r-ctl);border:1px solid var(--rule);font-size:12.5px">
                <div style="flex:1;padding-right:10px">
                  <strong>${esc(rd.label)}</strong>
                  <div class="dim" style="font-size:11.5px;margin-top:2px">${esc(rd.rule)}</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                  <span class="tag ${isHeld ? 'ok' : 'warn'}">${isHeld ? '✅ Held' : '⏳ Missing'}</span>
                  ${fileMeta ? `<button class="btn btn-sm" type="button" data-viewvaultdoc="${esc(rd.docId)}">View (${esc(fmtBytes(fileMeta.size))})</button>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}
    <div class="cols2">
      <div class="field"><div class="field-k">Gates</div>${list(t.gates)}</div>
      <div>
        <div class="field"><div class="field-k" style="color:var(--green)">Already met</div>${list(t.gatesMet)}</div>
        <div class="field"><div class="field-k" style="color:var(--amber)">At risk</div>${list(t.gatesRisk)}</div>
      </div>
    </div>
    ${t.advantages?.length ? `<div class="field"><div class="field-k">Advantages</div>${list(t.advantages)}</div>` : ''}
    ${t.corrections?.length ? `<div class="field"><div class="field-k">Corrections on file</div>${list(t.corrections)}</div>` : ''}
    ${t.source ? `<div class="field"><div class="field-k">Source</div><div class="field-v dim">${esc(t.source)}</div></div>` : ''}`);
  $$('#modalInner [data-viewvaultdoc]').forEach(b => {
    b.onclick = () => DocStore.view(b.dataset.viewvaultdoc);
  });
}

function renderTargets(root) {
  const T = getActiveTargets(), G = getActiveGates();
  let list = app.f.target === 'all' ? T.slice() : T.filter(t => String(t.tier) === app.f.target);
  list.sort((a, b) => a.tier - b.tier || String(a.deadline || '9').localeCompare(String(b.deadline || '9')));

  const deadEnds = getActiveDeadEnds();

  root.innerHTML = `${pageHead()}
    ${stats([['Verified targets', T.length, 'every deadline checked'], ['Open now', T.filter(t => t.status === 'open').length, 'you can act today', 'ok'],
      ['Opening soon', T.filter(t => t.status === 'opening_soon').length, 'prepare now', 'warn'], ['Ruled out', deadEnds.length, 'confirmed dead ends', 'bad']])}
    <div class="toolbar">${chips('tF', [['all', 'All tiers'], ['1', 'Tier 1'], ['2', 'Tier 2'], ['3', 'Tier 3']], app.f.target)}</div>
    <div class="grid auto">
      ${list.map(t => { const d = daysUntil(t.deadline); const [sc, sl] = T_STATUS[t.status] || ['plain', t.status]; return `<button class="panel target" type="button" data-t="${esc(t.id)}">
        <div class="target-top">
          <div><div class="tier-label">Tier ${t.tier} · ${esc(t.priority || '')}</div><div class="target-name" style="margin-top:6px">${t.flag || ''} ${esc(t.name)}</div><div class="target-c">${esc(t.country)}</div></div>
          ${d !== null ? `<div class="target-days"><span class="num" style="color:${d <= 30 ? 'var(--amber)' : 'var(--ink)'}">${d}</span><small>days</small></div>` : ''}
        </div>
        <div class="target-fund">${esc(t.funding)}</div>
        <div class="tags"><span class="tag ${sc}">${sl}</span>${t.subjectFit ? `<span class="tag plain">${esc(t.subjectFit.split(/[—-]/)[0].trim().slice(0, 30))} fit</span>` : ''}</div>
      </button>`; }).join('')}
    </div>
    ${G.length ? `<div class="section-title"><h2>Eligibility gates</h2><span class="aside">The checks that decide whether an application can succeed</span></div>
    <div class="panel rows">${G.map(g => `<details class="gate-row" style="display:block"><summary style="list-style:none;cursor:pointer;display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:14px">
      <span class="gate-n">${g.n}</span><div><div class="gate-name">${esc(g.name)}</div><div class="gate-sum">${esc(g.summary)}</div></div>
      <span class="tag ${/PASS|CLEAR|MET/i.test(g.status) ? 'ok' : /RISK|FAIL|UNRES/i.test(g.status) ? 'bad' : 'warn'}">${esc(String(g.status).split(/[—-]/)[0].trim())}</span></summary>
      <div style="padding:10px 0 4px 48px;font-size:14px" class="muted">
        ${g.detail ? `<p style="margin:0 0 8px;white-space:pre-line">${esc(g.detail)}</p>` : ''}
        ${g.action ? `<p style="margin:0 0 8px"><b style="color:var(--ink)">Action:</b> ${esc(g.action)}</p>` : ''}
        ${g.impact ? `<p style="margin:0"><b style="color:var(--ink)">Impact:</b> ${esc(g.impact)}</p>` : ''}
      </div></details>`).join('')}</div>` : ''}
    ${deadEnds.length ? `<div class="section-title"><h2>Ruled out</h2><span class="aside">${plural(deadEnds.length, 'scheme')}</span></div>
    <div class="panel"><div class="panel-body grid g2" style="gap:0 32px">
      ${deadEnds.map(d => `<div class="dead"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.reason || d.why || '')}</div></div></div>`).join('')}
    </div></div>` : ''}`;
  wireChips(root, 'tF', k => { app.f.target = k; renderTargets(root); });
  $$('[data-t]', root).forEach(b => b.onclick = () => openTarget(b.dataset.t));
}

/* ============================================================================
   UNIVERSITIES
   ============================================================================ */
function facultyAt(name) {
  const n = (name || '').toLowerCase();
  const hasibulProfs = (app.profs && app.profs.professors ? app.profs.professors : []).filter(p => {
    const u = (p.university || '').toLowerCase();
    return u && (u.includes(n) || n.includes(u));
  }).map(p => ({ ...p, track: 'hasibul' }));

  const zarinProfs = (typeof ZARIN_PROFESSORS !== 'undefined' ? ZARIN_PROFESSORS : []).filter(p => {
    const u = (p.university || '').toLowerCase();
    return u && (u.includes(n) || n.includes(u));
  }).map(p => ({ ...p, track: 'zarin' }));

  const seen = new Set();
  const merged = [];
  [...hasibulProfs, ...zarinProfs].forEach(p => {
    if (!seen.has(p.name)) {
      seen.add(p.name);
      merged.push(p);
    }
  });
  return merged;
}

const peopleHTML = (ps) => {
  if (!ps || !ps.length) return '';
  return `<div class="people" style="margin-top:12px;border-top:1px solid var(--rule);padding-top:10px">
    <div style="font-size:11.5px;font-weight:700;color:var(--ink-2);margin-bottom:6px">Matched Faculty (${ps.length}):</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${ps.map(p => {
        const isZ = p.track === 'zarin';
        const isV = (typeof PROF_VERIFIED !== 'undefined' && PROF_VERIFIED.professors && PROF_VERIFIED.professors[p.name]);
        return `<button class="person-link ${isZ ? 'zarin-prof' : ''}" type="button" data-prof="${esc(p.name)}" data-track="${isZ ? 'zarin' : 'hasibul'}" style="display:inline-flex;align-items:center;gap:4px;font-size:12px;padding:3px 8px;border-radius:99px;border:1px solid ${isZ ? 'rgba(184, 98, 0, 0.3)' : 'var(--rule)'};background:${isZ ? 'var(--amber-soft)' : 'var(--sheet-2)'}">
          <span>${isZ ? '👩‍💼' : '👨‍💼'}</span>
          <span>${esc(p.name)}</span>
          ${isV ? '<span style="color:var(--green);font-weight:bold">✓</span>' : ''}
          ${p.deep ? '<span style="color:var(--teal)">★</span>' : ''}
        </button>`;
      }).join('')}
    </div>
  </div>`;
};

const wireProfLinks = (root) => $$('[data-prof]', root).forEach(b => b.onclick = (e) => {
  e.stopPropagation();
  const name = b.dataset.prof;
  const isZ = b.dataset.track === 'zarin';
  let p = null;
  if (isZ && typeof ZARIN_PROFESSORS !== 'undefined') p = ZARIN_PROFESSORS.find(x => x.name === name);
  if (!p && app.profs && app.profs.professors) p = app.profs.professors.find(x => x.name === name);
  if (!p && typeof ZARIN_PROFESSORS !== 'undefined') p = ZARIN_PROFESSORS.find(x => x.name === name);
  if (p) openProf(p);
});

function renderUniversities(root) {
  const census = app.res.uniCensus || [], ranked = app.res.uniRanked || [];
  const u15 = (typeof CANADA_U15_RANKED !== 'undefined' ? CANADA_U15_RANKED : (app.res && app.res.CANADA_U15_RANKED) || []);
  const g = (x) => String(x || 'UNVERIFIED').toUpperCase();
  const c = (k) => census.filter(u => g(u[3]) === k).length;
  const CAT = { U15: 'U15', MD: 'Medical/doctoral', COMP: 'Comprehensive', PU: 'Primarily undergraduate', SPEC: 'Specialised', FR: 'Francophone' };

  let body = '';
  if (app.f.uniMode === 'directory105') {
    const allProgs = ((typeof CANADA_MASTER_PROGRAMS_105 !== 'undefined' ? CANADA_MASTER_PROGRAMS_105 : (app.res && app.res.CANADA_MASTER_PROGRAMS_105)) || []);
    let pList = allProgs.slice();

    // Discipline clustering
    if (app.f.dirDiscipline && app.f.dirDiscipline !== 'all') {
      const disc = app.f.dirDiscipline;
      if (disc === 'econ') pList = pList.filter(p => /economics & econometrics|pure & quantitative/i.test(p['Sub-Discipline Category'] || ''));
      else if (disc === 'quant') pList = pList.filter(p => /quant|actuarial|math/i.test(p['Sub-Discipline Category'] || ''));
      else if (disc === 'fe') pList = pList.filter(p => /financial economics/i.test(p['Sub-Discipline Category'] || ''));
      else if (disc === 'fin') pList = pList.filter(p => /^finance|investment|corporate/i.test(p['Sub-Discipline Category'] || ''));
      else if (disc === 'dev') pList = pList.filter(p => /agricultural|resource|agribusiness|development|policy/i.test(p['Sub-Discipline Category'] || ''));
    }

    // Gate filter
    if (app.f.dirGate && app.f.dirGate !== 'all') {
      pList = pList.filter(p => p.gateStatus === app.f.dirGate);
    }

    // Province filter
    if (app.f.dirProvince && app.f.dirProvince !== 'all') {
      pList = pList.filter(p => p.Province === app.f.dirProvince);
    }

    // Search query
    if (app.f.dirQuery) {
      const q = app.f.dirQuery.toLowerCase().trim();
      pList = pList.filter(p => (
        (p['University'] || '') + ' ' + (p['Program Name'] || '') + ' ' + (p['Degree'] || '') + ' ' +
        (p['Faculty / School'] || '') + ' ' + (p['Sub-Discipline Category'] || '') + ' ' +
        (p['Duration & Format'] || '') + ' ' + (p['Funding & Financial Aid Model'] || '') + ' ' +
        (p['Key Admission & Test Notes'] || '')
      ).toLowerCase().includes(q));
    }

    const passCount = allProgs.filter(p => p.gateStatus === 'PASS').length;
    const failCount = allProgs.filter(p => p.gateStatus === 'FAIL').length;
    const partCount = allProgs.filter(p => p.gateStatus === 'PARTIAL').length;
    const exclCount = allProgs.filter(p => p.gateStatus === 'EXCLUDED').length;

    body = `
      <div class="note acc" style="margin-bottom:16px">
        <div>
          <strong>🍁 Canada Complete Master's in Economics &amp; Finance Ranked Directory (105 Programs across 41 Universities):</strong>
          Every program is cross-referenced with official QS 2026 and Maclean's rankings, verified funding packages, duration, and the 16-month IRCC C42 spousal open work permit gate. Click any row or card to inspect complete admission requirements and matched research supervisors.
        </div>
      </div>

      <div class="toolbar" style="margin-bottom:8px">
        ${chips('dD', [
          ['all', 'All Disciplines (' + allProgs.length + ')'],
          ['econ', 'Econ & Econometrics'],
          ['quant', 'Quant & Math Finance'],
          ['fe', 'Financial Economics'],
          ['fin', 'Finance & Investments'],
          ['dev', 'Ag, Dev & Resource Econ']
        ], app.f.dirDiscipline || 'all')}
        <input class="input" id="dQ" type="search" placeholder="Search across 105 programs, universities, tests..." value="${esc(app.f.dirQuery || '')}" style="max-width:340px">
      </div>

      <div class="toolbar" style="margin-bottom:14px">
        ${chips('dG', [
          ['all', 'All Gate Statuses (' + allProgs.length + ')'],
          ['PASS', 'Clears 16-mo Gate (' + passCount + ')'],
          ['FAIL', 'Fails Gate <16mo (' + failCount + ')'],
          ['PARTIAL', 'Extendable / Ambiguous (' + partCount + ')'],
          ['EXCLUDED', 'Diploma / Unfunded (' + exclCount + ')']
        ], app.f.dirGate || 'all')}
        ${chips('dP', [
          ['all', 'All Provinces'],
          ['ON', 'Ontario (ON)'],
          ['QC', 'Quebec (QC)'],
          ['BC', 'British Columbia (BC)'],
          ['AB', 'Alberta (AB)'],
          ['SK', 'Saskatchewan (SK)'],
          ['NS', 'Nova Scotia (NS)'],
          ['MB', 'Manitoba (MB)'],
          ['NL', 'Newfoundland (NL)'],
          ['NB', 'New Brunswick (NB)']
        ], app.f.dirProvince || 'all')}
      </div>

      <div class="panel">
        <div class="table-wrap" style="max-height:none">
          <table class="tbl dense">
            <thead>
              <tr>
                <th>Rank</th>
                <th>University</th>
                <th>Program Name &amp; School</th>
                <th>Degree</th>
                <th>Sub-Discipline</th>
                <th>Duration &amp; Format</th>
                <th>Spousal Gate (16-mo)</th>
                <th>Funding Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${pList.map(p => {
                const isPass = p.gateStatus === 'PASS';
                const isFail = p.gateStatus === 'FAIL';
                const isExcl = p.gateStatus === 'EXCLUDED';
                const bg = isPass ? 'var(--card-bg, #fff)' : isFail ? 'rgba(239, 68, 68, 0.04)' : 'rgba(242, 179, 61, 0.04)';
                return `
                  <tr style="background:${bg}">
                    <td class="num"><strong>${esc(p['Canada Rank (Econ/Fin Composite)'] || '—')}</strong></td>
                    <td>
                      <strong>${esc(p['University'])}</strong>
                      <div class="dim" style="font-size:11.5px">${esc(p['Province'])} · ${esc(p["Maclean's 2026 Category & Rank"] || '')}</div>
                    </td>
                    <td>
                      <strong>${esc(p['Program Name'])}</strong>
                      <div class="dim" style="font-size:11.5px;color:var(--ink-2)">${esc(p['Faculty / School'])}</div>
                    </td>
                    <td><span class="tag acc" style="font-size:11px">${esc(p['Degree'])}</span></td>
                    <td style="font-size:12px">${esc(p['Sub-Discipline Category'])}</td>
                    <td class="num" style="font-size:12px">${esc(p['Duration & Format'])}</td>
                    <td><span class="tag ${isPass ? 'ok' : isFail ? 'bad' : isExcl ? 'bad' : 'warn'}" style="font-size:11px">${esc(p.gateLabel || p.gateStatus)}</span></td>
                    <td style="font-size:11.5px;max-width:180px">
                      <span class="tag plain" style="font-size:10.5px">${esc(p.fundingType || 'Funding')}</span>
                      <div class="dim" style="font-size:11px;margin-top:2px">${esc(p['Funding & Financial Aid Model'] || '')}</div>
                    </td>
                    <td><button class="btn btn-sm" type="button" data-progrank="${esc(p['Program Name'])}" data-proguniv="${esc(p['University'])}">Inspect →</button></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          ${pList.length ? '' : '<div class="empty">No programs match your search or filter criteria.</div>'}
        </div>
      </div>
    `;
  } else if (app.f.uniMode === 'u15') {
    body = `
      <div class="note acc" style="margin-bottom:16px">
        <div><strong>🏛️ Official U15 &amp; Comprehensive Canadian National Rankings:</strong> Comprehensive cross-discipline mapping comparing Hasibul's Finance/Econ/Quant routes with Zarin's SCM/Logistics routes, spousal work permit feasibility, and verified faculty leads.</div>
      </div>
      <div class="grid auto">
        ${u15.map(u => {
          const fac = facultyAt(u.name);
          return `
            <div class="panel uni pass" style="padding:20px;border-top:3px solid var(--teal)">
              <div style="display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;align-items:start">
                <span class="rank" style="width:44px;height:44px;font-size:16px;border-radius:50%;display:grid;place-items:center;background:var(--sheet-2);border:1px solid var(--rule);font-weight:700">#${u.rank}</span>
                <div>
                  <div class="uni-name" style="font-size:17px;font-weight:700">${esc(u.name)}</div>
                  <div class="uni-loc" style="font-size:13px;color:var(--ink-2);margin-top:2px">${esc(u.city)}, ${esc(u.province)} · <span class="dim">${esc(u.tier)}</span></div>
                </div>
              </div>
              <div class="tags" style="margin-top:12px">
                <span class="tag ${u.gateStatus || 'plain'}">${esc(u.gateLabel || u.gate)}</span>
                <span class="tag plain" style="font-size:11.5px">💰 ${esc(u.funding)}</span>
              </div>
              
              <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;font-size:13px">
                <div style="padding:6px 10px;background:var(--sheet-2);border-radius:6px;border-left:3px solid var(--teal)">
                  <strong style="color:var(--teal)">👨‍💼 Hasibul Route:</strong> ${esc(u.hasibulProgram)}
                </div>
                <div style="padding:6px 10px;background:var(--sheet-2);border-radius:6px;border-left:3px solid var(--amber)">
                  <strong style="color:var(--amber)">👩‍💼 Zarin Route:</strong> ${esc(u.zarinProgram)}
                </div>
              </div>

              <div class="uni-note" style="font-size:13px;color:var(--ink-2);margin-top:12px;line-height:1.5">
                ${esc(u.why)}
              </div>

              ${peopleHTML(fac)}
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (app.f.uniMode === 'fetcher') {
    body = `
      <div class="panel" style="padding:24px;border-left:4px solid var(--teal);margin-bottom:20px">
        <h2 style="font-size:20px;margin:0 0 10px">🔍 Primary-Source Intelligence Fetcher Playbook</h2>
        <p style="font-size:14px;color:var(--ink-2);line-height:1.6;margin:0 0 16px">
          This system enforces zero hallucination. Use these primary institutional channels and official tools to extract real, unassailable data on Canadian universities and professors:
        </p>
        <div class="grid g2" style="gap:16px">
          <div style="background:var(--sheet-2);padding:14px 16px;border-radius:8px;border:1px solid var(--rule)">
            <h4 style="margin:0 0 6px;color:var(--teal)">1. Government of Canada Grants Disclosure</h4>
            <p style="font-size:12.5px;color:var(--ink-2);margin:0 0 8px">Search proactive disclosures for NSERC Discovery &amp; SSHRC Insight grants to confirm active funding amounts and expiration dates.</p>
            <a href="https://search.open.canada.ca/grants/" target="_blank" rel="noopener" class="btn btn-sm">Open search.open.canada.ca ↗</a>
          </div>
          <div style="background:var(--sheet-2);padding:14px 16px;border-radius:8px;border:1px solid var(--rule)">
            <h4 style="margin:0 0 6px;color:var(--teal)">2. Institutional Theses &amp; Student Repositories</h4>
            <p style="font-size:12.5px;color:var(--ink-2);margin:0 0 8px">Search advisor fields to see real supervised MSc/PhD students and topics: UWSpace (Waterloo), Spectrum (Concordia), HARVEST (USask), cIRcle (UBC), Biblos (HEC).</p>
            <div class="tags" style="margin-top:6px">
              <span class="tag plain">UWSpace</span><span class="tag plain">HARVEST</span><span class="tag plain">Spectrum</span><span class="tag plain">cIRcle</span>
            </div>
          </div>
          <div style="background:var(--sheet-2);padding:14px 16px;border-radius:8px;border:1px solid var(--rule)">
            <h4 style="margin:0 0 6px;color:var(--teal)">3. Crossref Digital Object Identifier (DOI) Verification</h4>
            <p style="font-size:12.5px;color:var(--ink-2);margin:0 0 8px">Verify that cited papers are published in top peer-reviewed journals (JFE, RFS, JPE, OMEGA, IJPR) and check author sequence before outreach.</p>
            <span class="tag ok">Crossref Verified</span>
          </div>
          <div style="background:var(--sheet-2);padding:14px 16px;border-radius:8px;border:1px solid var(--rule)">
            <h4 style="margin:0 0 6px;color:var(--teal)">4. Mathematics Genealogy Project (MGP)</h4>
            <p style="font-size:12.5px;color:var(--ink-2);margin:0 0 8px">Check doctoral lineages, academic descendants, and research rigor for quantitative mathematics and actuarial supervisors.</p>
            <a href="https://www.mathgenealogy.org" target="_blank" rel="noopener" class="btn btn-sm">Open mathgenealogy.org ↗</a>
          </div>
        </div>
      </div>
    `;
  } else if (app.f.uniMode === 'mastersportal') {
    const econAll = ((typeof MASTERSPORTAL_CANADA_AUDIT !== 'undefined' ? MASTERSPORTAL_CANADA_AUDIT : (app.res && app.res.MASTERSPORTAL_CANADA_AUDIT)) || []).map(x => ({ ...x, field: 'Economics' }));
    const finAll = ((typeof MASTERSPORTAL_FINANCE_CANADA_AUDIT !== 'undefined' ? MASTERSPORTAL_FINANCE_CANADA_AUDIT : (app.res && app.res.MASTERSPORTAL_FINANCE_CANADA_AUDIT)) || []).map(x => ({ ...x, field: 'Finance' }));

    let mpAll = [];
    if (app.f.mpDiscipline === 'economics') mpAll = econAll;
    else if (app.f.mpDiscipline === 'finance') mpAll = finAll;
    else mpAll = [...econAll, ...finAll];

    let mpList = mpAll.slice();
    if (app.f.mpGate && app.f.mpGate !== 'all') {
      mpList = mpList.filter(x => x.gateStatus === app.f.mpGate);
    }
    if (app.f.mpQuery) {
      const q = app.f.mpQuery.toLowerCase().trim();
      mpList = mpList.filter(x => (x.university + ' ' + x.program + ' ' + x.degree + ' ' + x.verdict + ' ' + x.gateReason + ' ' + x.field).toLowerCase().includes(q));
    }
    const passCount = mpAll.filter(x => x.gateStatus === 'PASS').length;
    const failCount = mpAll.filter(x => x.gateStatus === 'FAIL').length;
    const exclCount = mpAll.filter(x => x.gateStatus === 'EXCLUDED').length;

    body = `
      <div class="note acc" style="margin-bottom:16px">
        <div><strong>🇨🇦 MastersPortal Canadian Master's Audit (64 Economics + 49 Finance Degrees Exhausted):</strong>
        Every single master's and graduate program in Canada listed on MastersPortal under Economics and Finance was audited against the 16-month spousal work-permit gate, degree qualifications, and departmental funding.
        <strong>Critical Finding:</strong> Over 60% are either 12-month coursework traps (ineligible for spousal OWP) or college post-grad diplomas. 25 genuine research/thesis targets identified across both disciplines.</div>
      </div>

      <div class="toolbar" style="margin-bottom:10px">
        ${chips('mpD', [['all', 'All Disciplines (' + (econAll.length + finAll.length) + ')'], ['economics', 'Economics (64 search hits)'], ['finance', 'Finance (49 search hits)']], app.f.mpDiscipline || 'all')}
        <input class="input" id="mpQ" type="search" placeholder="Search by university, program or keyword..." value="${esc(app.f.mpQuery || '')}" style="max-width:320px">
      </div>

      <div class="toolbar" style="margin-bottom:14px">
        ${chips('mpG', [['all', 'All Gate Statuses (' + mpAll.length + ')'], ['PASS', 'Clears Gate (' + passCount + ')'], ['FAIL', 'Fails Gate (' + failCount + ')'], ['EXCLUDED', 'Diploma / Unfunded (' + exclCount + ')']], app.f.mpGate || 'all')}
      </div>

      <div class="panel">
        <div class="table-wrap" style="max-height:none">
          <table class="tbl dense">
            <thead>
              <tr>
                <th>Discipline</th>
                <th>University</th>
                <th>Program &amp; Degree</th>
                <th>Duration</th>
                <th>Tuition / Year</th>
                <th>Spousal Gate (16-mo)</th>
                <th>Funding Status</th>
                <th>Strategic Verdict</th>
              </tr>
            </thead>
            <tbody>
              ${mpList.map(item => `
                <tr style="background:${item.gateStatus === 'PASS' ? 'var(--card-bg, #fff)' : 'rgba(239, 68, 68, 0.04)'}">
                  <td><span class="tag ${item.field === 'Finance' ? 'acc' : 'plain'}" style="font-size:11px">${esc(item.field)}</span></td>
                  <td><strong>${esc(item.university)}</strong></td>
                  <td>
                    <strong>${esc(item.program)}</strong> <span class="tag plain" style="font-size:11px">${esc(item.degree)}</span>
                    <div class="dim" style="font-size:11.5px;margin-top:2px">${esc(item.gateReason)}</div>
                  </td>
                  <td class="num">${esc(item.duration)}</td>
                  <td class="num">${esc(item.tuition)}</td>
                  <td><span class="tag ${item.gateStatus === 'PASS' ? 'ok' : item.gateStatus === 'PARTIAL' ? 'warn' : 'bad'}">${esc(item.gateStatus)}</span></td>
                  <td style="font-size:12px">${esc(item.fundingStatus)}</td>
                  <td><span class="tag ${item.gateStatus === 'PASS' ? 'ok' : 'plain'}" style="font-size:11.5px">${esc(item.verdict)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${mpList.length ? '' : '<div class="empty">No programs match your search.</div>'}
        </div>
      </div>
    `;
  } else if (app.f.uniMode === 'ranked') {
    body = `<div class="note acc" style="margin-bottom:16px"><div>This is not a reputation ranking. McGill, Toronto and UBC sit low or off the list because they fail the 16-month spousal work-permit gate, the funding requirement, or both. Order reflects what is usable to you.</div></div>
    <div class="grid auto">${ranked.map(r => `<div class="panel uni pass">
      <div style="display:grid;grid-template-columns:40px minmax(0,1fr);gap:12px">
        <span class="rank">${r.rank}</span>
        <div><div class="uni-name">${esc(r.name)}</div><div class="uni-loc">${esc(r.prog)}</div></div>
      </div>
      <div class="tags" style="margin-top:12px"><span class="tag ok">${esc(r.gate)}</span></div>
      <div class="uni-note" style="font-size:14px;color:var(--ink)">${esc(r.why)}</div>
      ${peopleHTML(facultyAt(r.name))}
    </div>`).join('')}</div>`;
  } else {
    let list = census.slice();
    if (app.f.uniGate !== 'all') list = list.filter(u => g(u[3]) === app.f.uniGate);
    const q = app.f.uniQuery.toLowerCase();
    if (q) list = list.filter(u => (u[0] + ' ' + u[1] + ' ' + (u[4] || '')).toLowerCase().includes(q));
    const rk = { PASS: 0, PARTIAL: 1, UNVERIFIED: 2, FAIL: 3 };
    list.sort((a, b) => (rk[g(a[3])] ?? 9) - (rk[g(b[3])] ?? 9) || a[0].localeCompare(b[0]));
    const GL = { PASS: ['ok', '16+ months'], FAIL: ['bad', 'Fails the gate'], PARTIAL: ['warn', 'Partial'], UNVERIFIED: ['plain', 'Unverified'] };
    body = `<div class="toolbar">
      ${chips('uG', [['all', 'All'], ['PASS', 'Passes'], ['PARTIAL', 'Partial'], ['UNVERIFIED', 'Unverified'], ['FAIL', 'Fails']], app.f.uniGate)}
      <input class="input" id="uQ" type="search" placeholder="Search by name, province or programme" value="${esc(app.f.uniQuery)}">
    </div>
    <div class="grid auto">${list.map(u => { const [cls, lab] = GL[g(u[3])] || GL.UNVERIFIED; return `<div class="panel uni ${g(u[3]).toLowerCase()}">
      <div class="uni-name">${esc(u[0])}</div><div class="uni-loc">${esc(u[1])} · ${esc(CAT[u[2]] || u[2])}</div>
      <div class="tags" style="margin-top:10px"><span class="tag ${cls}">${lab}</span></div>
      ${u[4] ? `<div class="uni-prog">${esc(u[4])}</div>` : ''}${u[5] ? `<div class="uni-note">${esc(u[5])}</div>` : ''}
      ${peopleHTML(facultyAt(u[0]))}
    </div>`; }).join('') || '<div class="empty">No universities match.</div>'}</div>`;
  }

  root.innerHTML = `${pageHead(`<div class="seg" id="uM">
    <button type="button" data-m="directory105" aria-pressed="${app.f.uniMode === 'directory105'}">🍁 Canada 105 Directory</button>
    <button type="button" data-m="u15" aria-pressed="${app.f.uniMode === 'u15'}">🏛️ National U15</button>
    <button type="button" data-m="mastersportal" aria-pressed="${app.f.uniMode === 'mastersportal'}">🇨🇦 MastersPortal (113)</button>
    <button type="button" data-m="ranked" aria-pressed="${app.f.uniMode === 'ranked'}">⭐ Custom Fit</button>
    <button type="button" data-m="census" aria-pressed="${app.f.uniMode === 'census'}">📋 Full Census</button>
    <button type="button" data-m="fetcher" aria-pressed="${app.f.uniMode === 'fetcher'}">🔍 Intel Fetcher</button>
  </div>`)}
    ${stats([['Institutions audited', census.length, 'degree-granting public'], ['Clear the gate', c('PASS'), '16+ months, thesis, funded', 'ok'],
      ['Partial', c('PARTIAL'), 'one route qualifies', 'warn'], ['Fail the gate', c('FAIL'), 'excluded', 'bad'], ['Unverified', c('UNVERIFIED'), 'not yet confirmed']])}
    ${body}`;
  $$('#uM button', root).forEach(b => b.onclick = () => { app.f.uniMode = b.dataset.m; renderUniversities(root); });
  wireChips(root, 'uG', k => { app.f.uniGate = k; renderUniversities(root); });
  wireChips(root, 'mpD', k => { app.f.mpDiscipline = k; renderUniversities(root); });
  wireChips(root, 'mpG', k => { app.f.mpGate = k; renderUniversities(root); });
  wireChips(root, 'dD', k => { app.f.dirDiscipline = k; renderUniversities(root); });
  wireChips(root, 'dG', k => { app.f.dirGate = k; renderUniversities(root); });
  wireChips(root, 'dP', k => { app.f.dirProvince = k; renderUniversities(root); });
  const inp = $('#uQ');
  if (inp) inp.oninput = () => { app.f.uniQuery = inp.value; const p = inp.selectionStart; renderUniversities(root); const n = $('#uQ'); n.focus(); n.setSelectionRange(p, p); };
  const mpInp = $('#mpQ');
  if (mpInp) mpInp.oninput = () => { app.f.mpQuery = mpInp.value; const p = mpInp.selectionStart; renderUniversities(root); const n = $('#mpQ'); n.focus(); n.setSelectionRange(p, p); };
  const dInp = $('#dQ');
  if (dInp) dInp.oninput = () => { app.f.dirQuery = dInp.value; const p = dInp.selectionStart; renderUniversities(root); const n = $('#dQ'); n.focus(); n.setSelectionRange(p, p); };
  wireProfLinks(root);

  $$('[data-progrank]', root).forEach(btn => {
    btn.onclick = () => {
      const progName = btn.dataset.progrank;
      const univName = btn.dataset.proguniv;
      const allProgs = ((typeof CANADA_MASTER_PROGRAMS_105 !== 'undefined' ? CANADA_MASTER_PROGRAMS_105 : (app.res && app.res.CANADA_MASTER_PROGRAMS_105)) || []);
      const p = allProgs.find(x => x['Program Name'] === progName && x['University'] === univName) || allProgs.find(x => x['Program Name'] === progName);
      if (p) openCanadaProgramModal(p);
    };
  });

  $$('.panel.uni', root).forEach(panel => {
    panel.style.cursor = 'pointer';
    panel.onclick = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      const uName = (panel.querySelector('.uni-name')?.textContent || '').trim();
      const uObj = census.find(x => x[0].toLowerCase().includes(uName.toLowerCase()) || uName.toLowerCase().includes(x[0].toLowerCase())) || [uName, 'Canada', 'U15', 'PASS', '', ''];
      openUniModal(uObj);
    };
  });
}

function openCanadaProgramModal(p) {
  const fac = facultyAt(p['University']);
  const isPass = p.gateStatus === 'PASS';
  const isFail = p.gateStatus === 'FAIL';
  const url = p['Official Program URL'];

  openModal(`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px">
      <div>
        <div class="tier-label">${esc(p['Canada Rank (Econ/Fin Composite)'] || '')} · ${esc(p['Province'] || '')} · ${esc(p["Maclean's 2026 Category & Rank"] || '')}</div>
        <h2 style="font-size:22px;margin:6px 0 2px">${esc(p['Program Name'])}</h2>
        <div class="dialog-sub" style="font-size:15px;font-weight:600;color:var(--teal)">${esc(p['University'])} · <span class="muted">${esc(p['Faculty / School'] || '')}</span></div>
      </div>
      <span class="tag acc" style="font-size:14px;padding:6px 12px">${esc(p['Degree'])}</span>
    </div>

    <div class="tags" style="margin-top:14px">
      <span class="tag ${isPass ? 'ok' : isFail ? 'bad' : 'warn'}">${esc(p.gateLabel || p.gateStatus)}</span>
      <span class="tag plain">Duration: ${esc(p['Duration & Format'])}</span>
      <span class="tag plain">Co-op: ${esc(p['Co-op / Internship'] || 'No')}</span>
      <span class="tag plain">${esc(p['Sub-Discipline Category'])}</span>
    </div>

    <div class="field" style="margin-top:18px">
      <div class="field-k" style="color:var(--teal)">💰 Funding &amp; Financial Aid Model</div>
      <div class="field-v" style="font-weight:600;background:var(--sheet-2);padding:10px 14px;border-radius:6px;border:1px solid var(--rule)">
        ${esc(p['Funding & Financial Aid Model'] || 'None recorded')}
      </div>
    </div>

    <div class="field" style="margin-top:14px">
      <div class="field-k">🎯 Key Admission &amp; Test Notes</div>
      <div class="field-v" style="background:var(--sheet-2);padding:10px 14px;border-radius:6px;border:1px solid var(--rule)">
        ${esc(p['Key Admission & Test Notes'] || 'Standard graduate admissions requirements apply.')}
      </div>
    </div>

    <div class="cols2" style="margin-top:14px">
      <div class="field">
        <div class="field-k">QS Subject Rankings (2026)</div>
        <div class="field-v" style="font-size:13px">
          • Economics: <strong>${esc(p['QS Econ Rank 2026 (Canada / Global)'] || 'Unranked')}</strong><br>
          • Finance/Accounting: <strong>${esc(p['QS Finance Rank 2026 (Canada / Global)'] || 'Unranked')}</strong>
        </div>
      </div>
      <div class="field">
        <div class="field-k">Official Program Link</div>
        <div class="field-v">
          ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Open University Portal ↗</a>` : '<span class="dim">URL not available</span>'}
        </div>
      </div>
    </div>

    ${fac.length ? `
      <div class="field" style="margin-top:16px">
        <div class="field-k">Faculty Matched at ${esc(p['University'])} (${fac.length})</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
          ${fac.map(f => `
            <button class="btn btn-sm" type="button" data-modalprof="${esc(f.name)}" data-modtrack="${f.track === 'zarin' ? 'zarin' : 'hasibul'}">
              <span>${f.track === 'zarin' ? '👩‍💼' : '👨‍💼'}</span>
              <span>${esc(f.name)}</span>
              ${f.deep ? '★' : ''} → Dossier
            </button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div style="margin-top:20px;padding:12px 14px;background:var(--sheet-2);border-radius:var(--r-ctl);border:1px solid var(--rule);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div style="font-size:12.5px;color:var(--ink-2)">
        <strong>Target Synchronization:</strong> Check live deadlines and required documents for this program.
      </div>
      <button class="btn btn-sm" type="button" onclick="closeModal(); go('targets');">View Targets →</button>
    </div>

    <div style="margin-top:24px;display:flex;justify-content:flex-end">
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);

  $$('#modalInner [data-modalprof]').forEach(b => {
    b.onclick = () => {
      const name = b.dataset.modalprof;
      const isZ = b.dataset.modtrack === 'zarin';
      let profObj = null;
      if (isZ && typeof ZARIN_PROFESSORS !== 'undefined') profObj = ZARIN_PROFESSORS.find(x => x.name === name);
      if (!profObj && app.profs && app.profs.professors) profObj = app.profs.professors.find(x => x.name === name);
      if (!profObj && typeof ZARIN_PROFESSORS !== 'undefined') profObj = ZARIN_PROFESSORS.find(x => x.name === name);
      if (profObj) openProf(profObj);
    };
  });
}

/* ============================================================================
   PORTFOLIO — DECISION ENGINE & ANALYTICS (WS-D1, D2, D3)
   ============================================================================ */
function renderPortfolio(root) {
  const T = getActiveTargets();
  let weights = { subject: 25, funding: 25, admit: 20, career: 15, couple: 10, effort: 5 };
  try {
    const saved = JSON.parse(localStorage.getItem('sv-portfolio-weights'));
    if (saved) weights = { ...weights, ...saved };
  } catch (e) {}

  const calcScore = (t) => {
    const s = t.scoring;
    if (!s) return 0;
    const norm = (val) => typeof val === 'number' ? (val / 5) * 100 : (val === 'yes' ? 100 : (val === 'no' ? 0 : 40));
    const score = (
      norm(s.subjectFit) * (weights.subject / 100) +
      norm(s.fundingOdds) * (weights.funding / 100) +
      norm(s.admitOdds) * (weights.admit / 100) +
      norm(s.careerPR) * (weights.career / 100) +
      norm(s.coupleFit) * (weights.couple / 100) +
      norm(s.effort) * (weights.effort / 100)
    );
    return Math.round(score);
  };

  const list = T.map(t => ({ ...t, totalScore: calcScore(t) })).sort((a, b) => b.totalScore - a.totalScore);

  // Portfolio Coverage Check (WS-D3)
  const countries = new Set(list.map(t => t.country));
  const reaches = list.filter(t => t.scoring && t.scoring.admitOdds <= 2).length;
  const guaranteed = list.filter(t => t.scoring && t.scoring.fullCostCovered === 'yes').length;
  const coverageWarnings = [];
  if (countries.size <= 1) coverageWarnings.push("All applications concentrated in one country — high geopolitical / visa risk.");
  if (reaches === list.length) coverageWarnings.push("All targets are reach-level (odds ≤ 2) — add at least 1 safety option.");
  if (guaranteed === 0) coverageWarnings.push("Zero targets provide 100% guaranteed full-cost funding — portfolio violates the zero-self-funding rule.");

  root.innerHTML = `
    ${pageHead()}
    ${stats([
      ['Active Targets', list.length, 'portfolio candidates', 'ok'],
      ['Guaranteed Full-Cost', guaranteed, 'covers tuition + living', guaranteed > 0 ? 'ok' : 'bad'],
      ['Countries', countries.size, 'geographic spread', countries.size > 1 ? 'acc' : 'warn'],
      ['Top Recommendation', list[0] ? (list[0].short || list[0].name) : '—', list[0] ? `Score ${list[0].totalScore}/100` : '', 'acc']
    ])}

    ${coverageWarnings.length ? `
      <div class="note warn" style="margin-top:16px;border-left:4px solid var(--amber)">
        <div>
          <strong>⚠️ Portfolio Balance Advisory</strong>
          <ul class="list" style="margin-top:6px">
            ${coverageWarnings.map(w => `<li>${esc(w)}</li>`).join('')}
          </ul>
        </div>
      </div>
    ` : `
      <div class="note ok" style="margin-top:16px">
        <div><strong>✅ Portfolio Diversification:</strong> Healthy geographic and risk distribution across European full-rides and Canadian thesis programs.</div>
      </div>
    `}

    <div class="panel" style="margin-top:20px;padding:16px">
      <div class="panel-head"><h2>Decision Weights (Customizable)</h2><span class="aside">Weights adjust rankings instantly</span></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:12px;margin-top:12px">
        ${Object.entries(weights).map(([k, v]) => `
          <div>
            <label style="font-size:12px;text-transform:capitalize;font-weight:600">${esc(k)} (${v}%)</label>
            <input type="range" class="input" min="0" max="50" step="5" value="${v}" data-weight="${esc(k)}" style="padding:0;height:24px">
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-title" style="margin-top:24px"><h2>Ranked Application Portfolio</h2><span class="aside">Ranked by weighted score</span></div>
    <div class="panel">
      <div class="table-wrap" style="max-height:none">
        <table class="tbl dense">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Target Scheme / Program</th>
              <th>Country</th>
              <th>Deadline</th>
              <th>Full Cost Covered?</th>
              <th>Admit Odds</th>
              <th>Subject Fit</th>
              <th>Career / PR</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((t, idx) => {
              const sc = t.scoring || {};
              const isDisqualified = sc.fullCostCovered === 'no';
              return `
                <tr style="opacity:${isDisqualified ? '0.7' : '1'};background:${isDisqualified ? 'rgba(239, 68, 68, 0.04)' : 'var(--card-bg, #fff)'}">
                  <td class="num"><strong>#${idx + 1}</strong></td>
                  <td>
                    <strong>${esc(t.short || t.name)}</strong>
                    ${isDisqualified ? '<div style="font-size:11px;color:var(--red);font-weight:600">⚠️ Partial funding — violates zero-self-funding rule</div>' : ''}
                  </td>
                  <td>${t.flag || ''} ${esc(t.country)}</td>
                  <td class="num">${esc(fv(t.deadline))}</td>
                  <td><span class="tag ${sc.fullCostCovered === 'yes' ? 'ok' : sc.fullCostCovered === 'no' ? 'bad' : 'warn'}">${esc(sc.fullCostCovered || 'unknown')}</span></td>
                  <td class="num">${sc.admitOdds ? sc.admitOdds + '/5' : '—'}</td>
                  <td class="num">${sc.subjectFit ? sc.subjectFit + '/5' : '—'}</td>
                  <td class="num">${sc.careerPR ? sc.careerPR + '/5' : '—'}</td>
                  <td class="num" style="font-weight:700;font-size:15px;color:${isDisqualified ? 'var(--ink-2)' : 'var(--green)'}">${t.totalScore}</td>
                  <td><button class="btn btn-sm" type="button" data-opentarget="${esc(t.id)}">Dossier →</button></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  $$('[data-weight]', root).forEach(slider => {
    slider.oninput = () => {
      weights[slider.dataset.weight] = parseInt(slider.value, 10);
      try { localStorage.setItem('sv-portfolio-weights', JSON.stringify(weights)); } catch (e) {}
      renderPortfolio(root);
    };
  });
  $$('[data-opentarget]', root).forEach(btn => {
    btn.onclick = () => openTarget(btn.dataset.opentarget);
  });
}

function openUniModal(u) {
  const [name, prov, cat, gate, prog, note] = u;
  const CAT = { U15: 'U15 Research Intensive', MD: 'Medical/Doctoral', COMP: 'Comprehensive', PU: 'Primarily Undergraduate', SPEC: 'Specialised', FR: 'Francophone' };
  const fac = facultyAt(name);
  const GL = { PASS: ['ok', '16+ months (Clears Gate)'], FAIL: ['bad', 'Fails the gate (<16 mo / Unfunded)'], PARTIAL: ['warn', 'Partial Gate'], UNVERIFIED: ['plain', 'Unverified'] };
  const [cls, lab] = GL[String(gate || 'UNVERIFIED').toUpperCase()] || GL.UNVERIFIED;

  openModal(`
    <h2>${esc(name)}</h2>
    <div class="dialog-sub">${esc(prov)} · ${esc(CAT[cat] || cat)}</div>
    <div class="tags" style="margin-top:10px">
      <span class="tag ${cls}">${lab}</span>
      <span class="tag plain">${esc(cat)}</span>
      ${fac.length ? `<span class="tag acc">${fac.length} faculty tracked</span>` : ''}
    </div>
    ${prog ? `<div class="field" style="margin-top:16px"><div class="field-k">Programmes Audited</div><div class="field-v" style="font-weight:600">${esc(prog)}</div></div>` : ''}
    ${note ? `<div class="field" style="margin-top:12px"><div class="field-k">Funding &amp; Gate Verification</div><div class="field-v" style="color:var(--ink-2)">${esc(note)}</div></div>` : ''}
    ${fac.length ? `
      <div class="field" style="margin-top:16px">
        <div class="field-k">Tracked Faculty (${fac.length}) — Finance, Quant &amp; Supply Chain</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
          ${fac.map(p => {
            const isZ = p.track === 'zarin';
            const isV = (typeof PROF_VERIFIED !== 'undefined' && PROF_VERIFIED.professors && PROF_VERIFIED.professors[p.name]);
            return `<button class="btn btn-sm btn-primary" type="button" data-modalprof="${esc(p.name)}" data-modtrack="${isZ ? 'zarin' : 'hasibul'}">
              <span>${isZ ? '👩‍💼' : '👨‍💼'}</span>
              <span>${esc(p.name)}</span>
              ${isV ? '✓' : ''}
              ${p.deep ? '★' : ''} → Dossier
            </button>`;
          }).join('')}
        </div>
      </div>
    ` : ''}
    <div style="margin-top:20px;display:flex;justify-content:flex-end">
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);

  $$('#modalInner [data-modalprof]').forEach(b => {
    b.onclick = () => {
      const name = b.dataset.modalprof;
      const isZ = b.dataset.modtrack === 'zarin';
      let p = null;
      if (isZ && typeof ZARIN_PROFESSORS !== 'undefined') p = ZARIN_PROFESSORS.find(x => x.name === name);
      if (!p && app.profs && app.profs.professors) p = app.profs.professors.find(x => x.name === name);
      if (!p && typeof ZARIN_PROFESSORS !== 'undefined') p = ZARIN_PROFESSORS.find(x => x.name === name);
      if (p) openProf(p);
    };
  });
}

/* ============================================================================
   SUBJECT FIT
   ============================================================================ */
function renderSubjects(root) {
  const R = app.res;
  const V = { 'STRONG FIT': 'ok', 'POSSIBLE': 'warn', 'AVOID': 'bad' };
  const fb = Array.isArray(R.subjectFallback) ? R.subjectFallback : [R.subjectFallback].filter(Boolean);
  root.innerHTML = `${pageHead()}
    <div class="thesis">
      <h2>Choose a funding model, not a subject.</h2>
      <p>MSc Finance and MSc Management (Finance) at business schools are <strong>almost never funded</strong>: they are revenue programmes at CAD 50,000–90,000. A thesis master's in <strong>mathematics, statistics or financial engineering</strong> is paid for by the department, because thesis students are research labour.</p>
      <p>The degree that sounds least like finance is the one most likely to be funded, and it also clears the 16-month gate the spousal work permit depends on.</p>
    </div>
    <div class="section-title"><h2>Target these, in this order</h2></div>
    <div class="grid g3">${(R.subjectRanked || []).map(r => `<div class="panel" data-subtarget="${esc(r.target)}" style="padding:18px 20px;cursor:pointer" title="Find universities for ${esc(r.target)}">
      <div style="display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px"><span class="rank">${r.rank}</span><div><div class="uni-name">${esc(r.target)}</div><div class="uni-loc">${esc(r.gate)}</div></div></div>
      <p style="font-size:14px;margin:12px 0 0">${esc(r.why)}</p>
      <div style="margin-top:12px"><span class="tag acc">Explore Universities →</span></div>
    </div>`).join('')}</div>
    <div class="section-title"><h2>Every option, assessed</h2></div>
    <div class="grid g2">${(R.subjectOptions || []).map(o => `<div class="panel subject" style="padding:20px 22px">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><h3>${esc(o.subject)}</h3><span class="tag ${V[o.verdict] || 'plain'}">${esc(o.verdict.charAt(0) + o.verdict.slice(1).toLowerCase())}</span></div>
      ${o.trap ? `<div class="note warn" style="margin-top:12px"><div>${esc(o.trap)}</div></div>` : ''}
      <div class="field"><div class="field-k">What it actually is</div><div class="field-v">${esc(o.whatItIs)}</div></div>
      <div class="field"><div class="field-k">Funding reality</div><div class="field-v">${esc(o.funding)}</div></div>
      <div class="field"><div class="field-k">Admissions</div><div class="field-v">${esc(o.admissions)}</div></div>
      <div class="field"><div class="field-k">Length and the 16-month gate</div><div class="field-v">${esc(o.lengthGate)}</div></div>
      <div class="field"><div class="field-k">Career outcome</div><div class="field-v">${esc(o.career)}</div></div>
      <div class="verdict-line"><b>Verdict.</b> ${esc(o.note)}</div>
    </div>`).join('')}</div>
    ${fb.length ? `<div class="section-title"><h2>Fallbacks</h2></div><div class="panel"><div class="panel-body"><ul class="list">${fb.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div></div>` : ''}`;

  $$('[data-subtarget]', root).forEach(el => {
    el.onclick = () => {
      const target = el.dataset.subtarget;
      if (target.includes('Waterloo')) app.f.uniQuery = 'Waterloo';
      else if (target.includes('HEC')) app.f.uniQuery = 'HEC';
      else if (target.includes('SFU') || target.includes('Simon Fraser')) app.f.uniQuery = 'Simon Fraser';
      else app.f.uniQuery = '';
      app.f.uniMode = 'ranked';
      go('universities');
    };
  });
}

/* ============================================================================
   FUNDING
   ============================================================================ */
function renderFunding(root) {
  let S = (app.res.fundingSchemes || []).slice(), DE = app.res.fundingDeadEnds || [];
  
  if (app.f.fundKind === 'guaranteed') S = S.filter(s => /guaranteed/i.test(s.kind));
  else if (app.f.fundKind === 'canada') S = S.filter(s => /ontario|waterloo|queen|ubc|alberta|saskatchewan|sfu|calgary|hec|canada/i.test(s.name + ' ' + (s.note || '')));
  else if (app.f.fundKind === 'competitive') S = S.filter(s => /competitive/i.test(s.kind));
  
  if (app.f.fundQuery) {
    const fq = app.f.fundQuery.toLowerCase().trim();
    S = S.filter(s => (s.name + ' ' + s.who + ' ' + s.amount + ' ' + s.covers + ' ' + (s.note || '')).toLowerCase().includes(fq));
  }

  const ver = (app.res.fundingSchemes || []).filter(s => s.verified).length;
  root.innerHTML = `${pageHead()}
    ${stats([['Schemes tracked', (app.res.fundingSchemes || []).length, 'funding routes'], ['Guaranteed', (app.res.fundingSchemes || []).filter(s => /guaranteed/i.test(s.kind)).length, 'attach to admission', 'ok'],
      ['Open now', (app.res.fundingSchemes || []).filter(s => s.status === 'OPEN').length, `of ${(app.res.fundingSchemes || []).length}`], ['Verified amounts', ver, 'the rest are unconfirmed', 'warn'], ['Dead ends', DE.length, 'exclude you', 'bad']])}
    <div class="note warn" style="margin-bottom:16px"><div><strong>Only ${ver} of ${(app.res.fundingSchemes || []).length} amounts are independently confirmed.</strong> Treat every unverified figure as a lead and check it on the official page before it shapes a decision.</div></div>
    
    <div class="section-title"><h2>Financial Gap Calculator (WS-D4)</h2><span class="aside">Tuition + Official Living Costs vs. Guaranteed Funding</span></div>
    <div class="panel" style="margin-bottom:24px"><div class="table-wrap" style="max-height:none">
      <table class="tbl dense">
        <thead>
          <tr>
            <th>Target Program</th>
            <th>Country</th>
            <th>Tuition / Year</th>
            <th>Official Living Cost</th>
            <th>Guaranteed Funding</th>
            <th>Net Gap (Single)</th>
            <th>Status / Verdict</th>
          </tr>
        </thead>
        <tbody>
          ${(typeof FUNDING_COSTS !== 'undefined' ? FUNDING_COSTS : []).map(fc => `
            <tr style="background:${fc.gapSingle <= 0 ? 'var(--card-bg, #fff)' : 'rgba(239, 68, 68, 0.05)'}">
              <td><strong>${esc(fc.name)}</strong></td>
              <td>${esc(fc.country)}</td>
              <td class="num">${fc.tuitionYear === 0 ? 'Zero / Waived' : '$' + fc.tuitionYear.toLocaleString()}</td>
              <td class="num">${fc.officialLivingCost ? '$' + fc.officialLivingCost.toLocaleString() : '—'}</td>
              <td class="num" style="color:var(--green)">${fc.guaranteedFunding ? '$' + fc.guaranteedFunding.toLocaleString() : 'None'}</td>
              <td class="num" style="font-weight:700;color:${fc.gapSingle <= 0 ? 'var(--green)' : 'var(--red)'}">
                ${fc.gapSingle <= 0 ? (fc.gapSingle === 0 ? '$0 (Break-even)' : '+$' + Math.abs(fc.gapSingle).toLocaleString() + ' Surplus') : '-$' + fc.gapSingle.toLocaleString() + ' DEFICIT'}
              </td>
              <td><span class="tag ${fc.gapSingle <= 0 ? 'ok' : 'bad'}">${esc(fc.verdict)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div></div>
    <div class="toolbar" style="margin-top:20px;margin-bottom:14px">
      ${chips('fK', [['all', 'All Schemes (' + (app.res.fundingSchemes || []).length + ')'], ['canada', 'Canadian Awards'], ['guaranteed', 'Guaranteed Base'], ['competitive', 'Competitive / Merit']], app.f.fundKind || 'all')}
      <input class="input" id="fQ" type="search" placeholder="Search scholarship by university or keyword..." value="${esc(app.f.fundQuery || '')}" style="max-width:320px">
    </div>
    <div class="panel"><div class="table-wrap" style="max-height:none">
      <table class="tbl"><thead><tr><th>Scheme</th><th>Who applies</th><th>Amount</th><th>Covers</th><th>Type</th><th>Deadline</th><th>Fall 2027</th><th>Verified</th></tr></thead>
      <tbody>${S.map(s => `<tr>
        <td style="min-width:220px"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>${s.note ? `<div class="dim" style="font-size:12.5px;margin-top:3px">${esc(s.note)}</div>` : ''}</td>
        <td>${esc(s.who)}</td><td class="num" style="white-space:nowrap">${esc(s.amount)}</td><td>${esc(s.covers)}</td>
        <td><span class="tag ${/guaranteed/i.test(s.kind) ? 'ok' : 'warn'}">${esc(s.kind)}</span></td>
        <td class="num" style="white-space:nowrap">${esc(s.deadline)}</td>
        <td><span class="tag ${s.status === 'OPEN' ? 'ok' : s.status === 'CLOSED' ? 'bad' : 'plain'}">${esc(s.status.charAt(0) + s.status.slice(1).toLowerCase())}</span></td>
        <td>${s.verified ? '<span class="tag ok">Yes</span>' : '<span class="tag warn">No</span>'}</td>
      </tr>`).join('')}</tbody></table>
      ${S.length ? '' : '<div class="empty">No funding schemes match your search.</div>'}
    </div></div>
    <div class="section-title"><h2>Dead ends</h2><span class="aside">Look open, but exclude you</span></div>
    <div class="panel"><div class="panel-body grid g2" style="gap:0 32px">${DE.map((d, i) => `<div class="dead" data-dead="${i}" style="cursor:pointer" title="Click to view reason"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.why || d.reason || '')}</div></div></div>`).join('')}</div></div>`;

  wireChips(root, 'fK', k => { app.f.fundKind = k; renderFunding(root); });
  const fInp = $('#fQ', root);
  if (fInp) {
    fInp.oninput = () => {
      app.f.fundQuery = fInp.value;
      const pos = fInp.selectionStart;
      renderFunding(root);
      const n = $('#fQ', root);
      if (n) { n.focus(); n.setSelectionRange(pos, pos); }
    };
  }

  $$('[data-dead]', root).forEach(el => {
    el.onclick = () => {
      const d = DE[+el.dataset.dead];
      if (d) openDeadModal(d);
    };
  });
}

/* ============================================================================
   PROFESSORS
   ============================================================================ */
const sendable = (p) => /SEND|READY/.test(p.draft || '') && !/DO NOT SEND/.test(p.draft || '');
const blocked = (p) => /BLOCKED|DO NOT SEND/.test(p.draft || '');
const emailOk = (p) => /VERIFIED/.test(p.email_status || '') && !/UNVERIFIED/.test(p.email_status || '');

function renderProfessors(root) {
  let P = [];
  if (app.f.profTrack === 'hasibul') {
    P = app.profs.professors.map(x => ({ ...x, track: 'hasibul' }));
  } else if (app.f.profTrack === 'zarin') {
    P = (typeof ZARIN_PROFESSORS !== 'undefined' ? ZARIN_PROFESSORS : []).map(x => ({ ...x, track: 'zarin' }));
  } else {
    // Both / All
    if (app.profileMode === 'zarin') {
      P = (typeof ZARIN_PROFESSORS !== 'undefined' ? ZARIN_PROFESSORS : []).map(x => ({ ...x, track: 'zarin' }));
    } else if (app.profileMode === 'couple') {
      const hP = (app.profs && app.profs.professors ? app.profs.professors : []).map(x => ({ ...x, track: 'hasibul' }));
      const zP = (typeof ZARIN_PROFESSORS !== 'undefined' ? ZARIN_PROFESSORS : []).map(x => ({ ...x, track: 'zarin' }));
      P = [...hP, ...zP];
    } else {
      P = (app.profs && app.profs.professors ? app.profs.professors : []).map(x => ({ ...x, track: 'hasibul' }));
    }
  }

  let list = P.slice();
  if (app.f.profTier !== 'all') list = list.filter(p => p.tier === app.f.profTier);
  if (app.f.profStatus === 'send') list = list.filter(sendable);
  if (app.f.profStatus === 'blocked') list = list.filter(blocked);
  if (app.f.profStatus === 'hold') list = list.filter(p => /HOLD|DEPRIORITISE/.test(p.draft || ''));
  if (app.f.profStatus === 'deep') list = list.filter(p => p.deep);
  if (app.f.profQuery) {
    const pq = app.f.profQuery.toLowerCase().trim();
    list = list.filter(p => (
      p.name + ' ' + (p.university || '') + ' ' + (p.department || '') + ' ' + (p.research || '') + ' ' + (p.why || '')
    ).toLowerCase().includes(pq));
  }
  const tr = { A: 0, B: 1, C: 2, UNSCORED: 3 };
  list.sort((a, b) => (tr[a.tier] ?? 9) - (tr[b.tier] ?? 9) || (b.score || 0) - (a.score || 0));
  const tiers = ['all', ...new Set(P.map(p => p.tier).filter(Boolean))];

  root.innerHTML = `${pageHead()}
    ${stats([
      ['Tracked Faculty', P.length, `${P.filter(p => p.tier === 'A').length} in tier A`],
      ['Ready to email', P.filter(sendable).length, 'verified drafts ready', 'ok'],
      ['Sweden & Canada', P.filter(p => p.country === 'Sweden' || p.country === 'Canada' || /Canada/.test(p.country)).length, 'priority corridors', 'acc'],
      ['Emails verified', P.filter(emailOk).length, 'official university directories', 'ok'],
      ['Research areas', 10, 'finance, quant & SCM', 'plain']
    ])}
    <div class="toolbar" style="margin-bottom:8px">
      ${chips('pTr', [['all', 'Active Mode Faculty (' + P.length + ')'], ['hasibul', '👨‍💼 Hasibul (Finance / Quant)'], ['zarin', '👩‍💼 Zarin (SCM / Logistics)']], app.f.profTrack || 'all')}
      <input class="input" id="pQ" type="search" placeholder="Search by professor, university or research..." value="${esc(app.f.profQuery || '')}" style="max-width:320px">
    </div>
    <div class="toolbar">
      ${chips('pT', tiers.map(t => [t, t === 'all' ? 'All tiers' : t === 'UNSCORED' ? 'Unscored' : `Tier ${t}`]), app.f.profTier)}
      ${chips('pS', [['all', 'Any status'], ['send', 'Ready to email'], ['deep', 'Has dossier'], ['blocked', 'Blocked'], ['hold', 'On hold']], app.f.profStatus)}
    </div>
    <div class="grid auto">${list.map(p => {
      const isZ = p.track === 'zarin';
      return `<button class="panel prof" type="button" data-p="${esc(p.name)}" data-ptrack="${isZ ? 'zarin' : 'hasibul'}">
      <div class="prof-top"><span class="score ${p.tier === 'A' ? 'a' : p.tier === 'B' ? 'b' : ''}">${p.score ?? '—'}</span>
        <div>
          <div class="uni-name">${isZ ? '👩‍💼 ' : '👨‍💼 '}${esc(p.name)}</div>
          <div class="uni-loc">${esc(p.university)}${p.department ? ` · ${esc(p.department)}` : ''}</div>
        </div>
      </div>
      <div class="prof-why">${esc(p.why || p.research || '')}</div>
      <div class="tags">
        <span class="tag ${isZ ? 'warn' : 'acc'}" style="font-size:11px">${isZ ? 'Zarin Track' : 'Hasibul Track'}</span>
        ${sendable(p) ? '<span class="tag ok">Ready to email</span>' : blocked(p) ? '<span class="tag bad">Blocked</span>' : p.draft ? '<span class="tag warn">Hold</span>' : ''}
        ${p.recruiting ? '<span class="tag acc">Recruiting</span>' : ''}
        ${p.deep ? '<span class="tag plain">Dossier</span>' : ''}
        ${(typeof PROF_VERIFIED !== 'undefined' && PROF_VERIFIED.professors && PROF_VERIFIED.professors[p.name]) ? `<span class="tag ok">Phase 1: ${esc(PROF_VERIFIED.professors[p.name].verdict || 'checked')}</span>` : '<span class="tag warn plain">Not yet verified</span>'}
        <span class="tag ${emailOk(p) ? 'ok' : 'warn'} plain">${emailOk(p) ? 'Email verified' : 'Email unconfirmed'}</span>
      </div>
      <div class="prof-mail">${esc(p.email || '')}</div>
    </button>`;
    }).join('') || '<div class="empty">No professors match your search.</div>'}</div>`;
  wireChips(root, 'pTr', k => { app.f.profTrack = k; renderProfessors(root); });
  wireChips(root, 'pT', k => { app.f.profTier = k; renderProfessors(root); });
  wireChips(root, 'pS', k => { app.f.profStatus = k; renderProfessors(root); });
  const pInp = $('#pQ', root);
  if (pInp) {
    pInp.oninput = () => {
      app.f.profQuery = pInp.value;
      const pos = pInp.selectionStart;
      renderProfessors(root);
      const n = $('#pQ', root);
      if (n) { n.focus(); n.setSelectionRange(pos, pos); }
    };
  }
  $$('[data-p]', root).forEach(b => b.onclick = () => {
    const isZ = b.dataset.ptrack === 'zarin';
    let profObj = null;
    if (isZ && typeof ZARIN_PROFESSORS !== 'undefined') profObj = ZARIN_PROFESSORS.find(x => x.name === b.dataset.p);
    if (!profObj && app.profs && app.profs.professors) profObj = app.profs.professors.find(x => x.name === b.dataset.p);
    if (!profObj && typeof ZARIN_PROFESSORS !== 'undefined') profObj = ZARIN_PROFESSORS.find(x => x.name === b.dataset.p);
    if (profObj) openProf(profObj);
  });
}

function copyBtn(id) { return `<button class="btn btn-sm" type="button" data-copy="${id}">Copy</button>`; }

function openProf(p) {
  const deep = p.deep || {}, dos = deep.dossier || {}, papers = deep.papers || [];
  const tabs = [];
  if (papers.length) tabs.push(['papers', `Papers (${papers.length})`]);
  if (deep.dossier) tabs.push(['dossier', 'Fit dossier']);
  const ver = (typeof PROF_VERIFIED !== 'undefined' && PROF_VERIFIED.professors) ? PROF_VERIFIED.professors[p.name] : null;
  if (ver) tabs.unshift(['verified', 'Verified (Phase 1)']);
  tabs.push(['overview', 'Contact & outreach'], ['network', 'Supervision']);
  const pane = {};
  if (ver) {
    const link = (u, t) => u && /^https?:/.test(u) ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t || 'source')}</a>` : `<span class="dim">${esc(u || 'no source')}</span>`;
    const fld = (k, v) => v ? `<div class="field"><div class="field-k">${k}</div><div class="field-v">${v}</div></div>` : '';
    const pr = ver.programme || {};
    pane.verified = `<div class="note ${/keep/i.test(ver.verdict || '') ? 'ok' : 'warn'}" style="margin-top:12px"><div><strong>Verdict: ${esc(ver.verdict || 'UNVERIFIED')}.</strong> ${esc(ver.verdict_reason || '')}</div></div>
      <p class="dim" style="font-size:12.5px;margin:10px 0 0">Checked ${esc(PROF_VERIFIED.checked || '')} against primary sources. Every line below links to the page it came from. Anything not listed was not verified.</p>
      ${fld('Profile', `${esc(ver.title || '')}${ver.department ? ' · ' + esc(ver.department) : ''} — ${link(ver.profile_url, 'official page')}`)}
      ${fld('Email (as printed on official page)', ver.email && !/UNVERIFIED|NOT FOUND/i.test(ver.email) ? `<span class="num" style="color:var(--green)">${esc(ver.email)}</span> — ${link(ver.email_source)}` : '<span style="color:var(--red)">UNVERIFIED</span>')}
      ${fld('Taking students?', ver.accepting_students_quote ? `“${esc(ver.accepting_students_quote)}” — ${link(ver.accepting_source)}` : '<span class="dim">No statement found</span>')}
      ${fld('Grants', (ver.grants || []).length ? '<ul class="list">' + ver.grants.map(g => `<li>${esc([g.program, g.title, g.amount, g.years].filter(Boolean).join(' · '))} — ${link(g.source)}</li>`).join('') + '</ul>' : '<span class="dim">None found in the databases searched</span>')}
      ${fld('Programme', `<strong>${esc(pr.name || '')}</strong>${pr.type ? ' · ' + esc(pr.type) : ''}<br>${pr.supervisor_required ? 'Supervisor before applying: ' + esc(pr.supervisor_required) + '<br>' : ''}${pr.funding_package ? 'Funding: ' + esc(pr.funding_package) + ' — ' + link(pr.funding_source) + '<br>' : ''}${pr.deadline ? 'Deadline: ' + esc(pr.deadline) + ' — ' + link(pr.deadline_source) + '<br>' : ''}${pr.admission_fit ? 'Admission fit: ' + esc(pr.admission_fit) + '<br>' : ''}${pr.notes ? '<span class="dim">' + esc(pr.notes) + '</span>' : ''}`)}
      ${fld('Students and theses (source-linked)', (ver.students || []).length ? '<ul class="list">' + ver.students.map(s => `<li><strong>${esc(s.name)}</strong>${s.degree ? ' (' + esc(s.degree) + (s.year ? ', ' + esc(s.year) : '') + ')' : (s.year ? ' (' + esc(s.year) + ')' : '')} — ${esc(s.thesis_title || '')} ${link(s.url)}</li>`).join('') + '</ul><p class="dim" style="font-size:12.5px">No student emails are listed. Reach students through LinkedIn or their university profile, not guessed addresses.</p>' : '<span class="dim">No verifiable students found</span>')}
      ${fld('Recent papers (checked)', (ver.papers || []).length ? '<ul class="list">' + ver.papers.map(x => `<li>${esc(x.citation)} ${link(x.doi_or_url, 'link')}</li>`).join('') + '</ul>' : '')}
      ${(ver.unverified || []).length ? `<div class="note warn" style="margin-top:14px"><div><strong>Still unverified:</strong> ${esc(ver.unverified.join('; '))}</div></div>` : ''}`;
  }
  pane.papers = `<p class="dim" style="font-size:13px;margin:12px 0 4px">Each paper read for question, data, method, findings, caveats and a Bangladesh extension.</p>
    ${papers.map((pp, i) => `<details class="paper" ${i === 0 ? 'open' : ''}><summary><span class="num">${String(pp.num || i + 1).padStart(2, '0')}</span><span>${esc(pp.title)}</span></summary>
      <div class="paper-body">
        ${[['Research question', pp.research_question], ['Data', pp.data], ['Method and identification', pp.method], ['Core finding', pp.core_finding], ['Limitations', pp.limitations], ['Bangladesh / emerging-market extension', pp.extension], ['Public data sources', pp.public_data], ['Desk observation', pp.desk_observation]]
          .filter(([, v]) => v).map(([k, v]) => `<div class="field"><div class="field-k">${k}</div><div class="field-v">${esc(v)}</div></div>`).join('')}
      </div></details>`).join('')}
    ${deep.synthesis ? `<div class="field" style="margin-top:20px"><div class="field-k">Synthesis</div><div class="md">${esc(deep.synthesis)}</div></div>` : ''}`;
  pane.dossier = [['Why they fit you', dos.why_fit || p.why], ['How you would contribute', dos.how_contribute || p.contribution], ['Why they would take you', dos.why_take_you], ['Objections and answers', dos.objections_answers]]
    .filter(([, v]) => v).map(([k, v]) => `<div class="field"><div class="field-k">${k}</div><div class="md">${esc(v.replace(/\*\*/g, '').replace(/\*/g, '•'))}</div></div>`).join('')
    + (dos.hook_line ? `<div class="field"><div class="field-k">Opening line</div><div class="copy-box" id="cp-hook">${esc(dos.hook_line)}${copyBtn('cp-hook')}</div></div>` : '');
  pane.overview = `<div class="cols2">
      <div class="field"><div class="field-k">Email</div><div class="field-v num" style="color:${emailOk(p) ? 'var(--green)' : 'var(--red)'}">${esc(p.email)}</div><div class="dim" style="font-size:12.5px">${esc(clean(p.email_status))}</div></div>
      <div class="field"><div class="field-k">Links</div><div class="tags">${p.profile_url && p.profile_url !== 'UNVERIFIED' ? `<a class="btn btn-sm" href="${esc(p.profile_url)}" target="_blank" rel="noopener">Faculty page</a>` : '<span class="dim">Profile unverified</span>'}${p.scholar_url && p.scholar_url !== 'UNVERIFIED' ? `<a class="btn btn-sm" href="${esc(p.scholar_url)}" target="_blank" rel="noopener">Google Scholar</a>` : ''}</div></div>
    </div>
    ${p.recruiting ? `<div class="note ok" style="margin-top:16px"><div><strong>Recruiting.</strong> ${esc(p.recruiting)}</div></div>` : ''}
    ${p.funding_mechanism ? `<div class="field"><div class="field-k">How the place is funded</div><div class="field-v">${esc(p.funding_mechanism)}</div></div>` : ''}
    <div class="field"><div class="field-k">Research</div><div class="field-v">${esc(p.research || '')}</div></div>
    ${p.teaches ? `<div class="field"><div class="field-k">Teaches</div><div class="field-v">${esc(p.teaches)}</div></div>` : ''}
    <div class="field"><div class="field-k">Key paper</div><div class="field-v">${esc(p.paper || '')}</div><div class="dim" style="font-size:12.5px;margin-top:3px">${esc(clean(p.paper_status))}${p.also_verified ? ` · ${esc(p.also_verified)}` : ''}</div></div>
    ${p.openers ? `<div class="field"><div class="field-k">Suggested opener</div><div class="copy-box" id="cp-open">${esc(p.openers)}${copyBtn('cp-open')}</div></div>` : ''}
    ${p.caveat ? `<div class="note warn" style="margin-top:16px"><div>${esc(p.caveat)}</div></div>` : ''}`;
  pane.network = `${p.supervision ? `<div class="field"><div class="field-k">Who works under them</div><div class="md">${esc(p.supervision)}</div></div>` : '<p class="dim" style="margin-top:14px">No supervision record yet.</p>'}
    ${p.contribution ? `<div class="field"><div class="field-k">Where you could contribute</div><div class="field-v">${esc(p.contribution)}</div></div>` : ''}`;

  openModal(`
    <div style="display:grid;grid-template-columns:56px minmax(0,1fr);gap:16px;align-items:center">
      <span class="score ${p.tier === 'A' ? 'a' : p.tier === 'B' ? 'b' : ''}" style="width:56px;height:56px;font-size:19px">${p.score ?? '—'}</span>
      <div><h2>${esc(p.name)}</h2><div class="dialog-sub">${esc(p.title || '')}</div></div>
    </div>
    <div class="dialog-sub" style="margin-top:10px">${esc(p.department || '')} · <strong>${esc(p.university)}</strong> ${esc(p.country || '')}</div>
    <div class="tags">
      <span class="tag ${p.tier === 'A' ? 'acc' : 'warn'}">Tier ${esc(p.tier)}</span>
      ${sendable(p) ? '<span class="tag ok">Ready to email</span>' : blocked(p) ? '<span class="tag bad">Blocked</span>' : ''}
      ${p.draft ? `<span class="tag plain">${esc(clean(p.draft).replace(/^[✅🔴⏸⚠️\s]+/u, ''))}</span>` : ''}
    </div>
    <div class="tabs" role="tablist">${tabs.map(([k, l], i) => `<button class="tab" role="tab" type="button" data-tab="${k}" aria-selected="${i === 0}">${l}</button>`).join('')}</div>
    ${tabs.map(([k], i) => `<div class="tab-pane ${i === 0 ? 'is-active' : ''}" data-pane="${k}">${pane[k]}</div>`).join('')}`);
  $$('#modalInner .tab').forEach(t => t.onclick = () => {
    $$('#modalInner .tab').forEach(x => x.setAttribute('aria-selected', x === t));
    $$('#modalInner .tab-pane').forEach(x => x.classList.toggle('is-active', x.dataset.pane === t.dataset.tab));
  });
}

function copyText(txt) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(txt);
  }
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) resolve(); else reject(new Error('execCommand returned false'));
    } catch (err) {
      reject(err);
    }
  });
}

document.addEventListener('click', (e) => {
  const g = e.target.closest('[data-goview]');
  if (g) {
    const v = g.dataset.goview;
    if (g.dataset.fkey && g.dataset.fval) app.f[g.dataset.fkey] = g.dataset.fval;
    go(v);
    return;
  }
  const b = e.target.closest('[data-copy]'); if (!b) return;
  const box = document.getElementById(b.dataset.copy); if (!box) return;
  const txt = box.textContent.replace(/Copy$/, '').trim();
  copyText(txt).then(() => toast('Copied to clipboard')).catch(() => toast('Copy failed', 'Select the text and copy it manually'));
});

/* ============================================================================
   CITATIONS
   ============================================================================ */
const CIT = {
  VERIFIED: ['ok', 'Verified'], VERIFIED_PARTIAL: ['warn', 'Detail imprecise'], YEAR_UNCERTAIN: ['warn', 'Year uncertain'],
  NOT_PUBLISHED: ['warn', 'Not yet published'], FOUND_BY_ME: ['acc', 'Found in verification'], WRONG_AUTHOR: ['bad', 'Wrong author'], PAPER_MISSING: ['bad', 'No paper found']
};
function renderCitations(root) {
  const C = app.cits.citations;
  const rank = { WRONG_AUTHOR: 0, PAPER_MISSING: 1, NOT_PUBLISHED: 2, YEAR_UNCERTAIN: 3, VERIFIED_PARTIAL: 4, FOUND_BY_ME: 5, VERIFIED: 6 };
  let list = app.f.citStatus === 'all' ? C.slice() : C.filter(c => c.status === app.f.citStatus);
  list.sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));
  const present = Object.keys(CIT).filter(k => C.some(c => c.status === k));
  root.innerHTML = `${pageHead()}
    ${stats([['Papers checked', C.length, 'cited in outreach'], ['Exist', C.filter(c => c.verified).length, 'traced to a primary record', 'ok'],
      ['Need an edit', C.filter(c => ['VERIFIED_PARTIAL', 'YEAR_UNCERTAIN', 'NOT_PUBLISHED'].includes(c.status)).length, 'imprecise or unpublished', 'warn'],
      ['Must fix', C.filter(c => ['WRONG_AUTHOR', 'PAPER_MISSING'].includes(c.status)).length, 'wrong or missing', 'bad'], ['Fabricated', 0, 'none invented', 'ok']])}
    <div class="toolbar">${chips('cF', [['all', 'All'], ...present.map(k => [k, CIT[k][1]])], app.f.citStatus)}</div>
    <div class="grid g2">${list.map(c => { const [cls, lab] = CIT[c.status] || ['plain', c.status]; return `<div class="panel" style="padding:18px 20px">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline"><div class="uni-name" data-prof="${esc(c.professor)}" style="cursor:pointer" title="View ${esc(c.professor)} dossier">${esc(c.professor)} <span style="font-size:12px;color:var(--teal)">→</span></div><span class="tag ${cls}">${lab}</span></div>
      <div class="cite">${esc(c.citation)}${c.doi ? `<small>doi:${esc(c.doi)}</small>` : ''}</div>
      ${c.abstractNote && c.abstractNote !== '—' ? `<div class="field"><div class="field-k">What the paper says</div><div class="field-v">${esc(c.abstractNote)}</div></div>` : ''}
      ${(c.findings || []).length ? `<div class="field"><div class="field-k">Checks</div><ul class="list">${c.findings.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
      <div class="note ${cls === 'acc' ? 'acc' : cls}" style="margin-top:14px"><div><strong>${esc(c.verdict)}</strong></div></div>
    </div>`; }).join('')}</div>`;
  wireChips(root, 'cF', k => { app.f.citStatus = k; renderCitations(root); });
  wireProfLinks(root);
}

/* ============================================================================
   AGENTS
   ============================================================================ */
function renderAgents(root) {
  const log = app.state.agentLog || [];
  root.innerHTML = `${pageHead()}
    <div class="grid auto">${app.content.agents.map(a => `<div class="panel agent">
      <div class="agent-top"><div class="agent-ic" aria-hidden="true">${esc(a.icon || '•')}</div><div><div class="agent-name">${esc(a.name)}</div><div class="agent-role">${esc(a.role || '')}</div></div></div>
      <div style="font-size:14px" class="muted">${esc(a.detail || a.desc || '')}</div>
      ${(a.skills || []).length ? `<div class="tags">${a.skills.map(s => `<span class="tag plain">${esc(s)}</span>`).join('')}</div>` : ''}
      <button class="btn btn-primary" type="button" data-run="${esc(a.id)}" style="margin-top:4px">Run ${esc(a.name)}</button>
      <div class="agent-out" id="out-${esc(a.id)}" hidden></div>
    </div>`).join('')}</div>
    <div class="section-title"><h2>Report history</h2><span class="aside">${plural(log.length, 'saved report')}</span></div>
    <div class="panel rows" id="agentLog">${log.length ? log.map(l => `<details class="log-row"><summary><span><b>${esc(l.agent)}</b></span><span class="dim num">${new Date(l.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></summary><div class="agent-out" style="margin-top:10px">${esc(l.report)}</div></details>`).join('') : '<div class="empty">Run an agent and its report is saved here.</div>'}</div>`;
  $$('[data-run]', root).forEach(b => b.onclick = async () => {
    const id = b.dataset.run, out = $('#out-' + id);
    b.disabled = true; b.textContent = 'Running…';
    try {
      const r = await post('/api/agent/run', { agentId: id });
      app.state = await api('/api/state');
      out.hidden = false; out.textContent = r.report;
      toast(`${r.agent?.name || 'Agent'} finished`, 'Report saved to history');
      const logBox = $('#agentLog', root);
      if (logBox) {
        const log = app.state.agentLog || [];
        logBox.innerHTML = log.length ? log.map(l => `<details class="log-row" open><summary><span><b>${esc(l.agent)}</b></span><span class="dim num">${new Date(l.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></summary><div class="agent-out" style="margin-top:10px">${esc(l.report)}</div></details>`).join('') : '<div class="empty">Run an agent and its report is saved here.</div>';
      }
    } catch (e) { toast('Agent failed', e.message); }
    b.disabled = false; b.textContent = 'Run again';
  });
}

/* ============================================================================
   PLAYBOOK
   ============================================================================ */
function renderPlaybook(root) {
  const P = getActivePlaybook();
  const want = app.openPlay; app.openPlay = null;
  root.innerHTML = `${pageHead('<button class="btn btn-sm" type="button" id="pbAll">Expand all</button>')}
    <div class="panel">${P.map(p => `<details class="pb" id="pb-${esc(p.id)}" ${want === p.id ? 'open' : ''}>
      <summary><span class="pb-ic" aria-hidden="true">${esc(p.icon || '')}</span><div><div class="pb-title">${esc(p.title)}</div><div class="pb-lead">${esc(p.summary || p.sections?.[0]?.heading || '')}</div></div><span class="pb-arrow" aria-hidden="true">+</span></summary>
      <div class="pb-body">${(p.sections || []).map(s => `<div class="pb-sec"><h4>${esc(s.heading || '')}</h4><p>${esc(s.body || '')}</p></div>`).join('')}</div>
    </details>`).join('')}</div>`;
  let allOpen = false;
  $('#pbAll').onclick = () => { allOpen = !allOpen; $$('.pb', root).forEach(d => d.open = allOpen); $('#pbAll').textContent = allOpen ? 'Collapse all' : 'Expand all'; };
  if (want) setTimeout(() => $('#pb-' + want)?.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' }), 50);
}

/* ============================================================================
   PROFILE
   ============================================================================ */
function renderZarinProfile(root) {
  const p = (typeof ZARIN_PROFILE !== 'undefined') ? ZARIN_PROFILE : ((app.content && app.content.zarin && app.content.zarin.profile) || {});
  const e = p.education || {}, t = p.tests || {}, sk = p.skills || {}, ref = p.referee || {};
  const kv = (rows) => `<dl class="kv">${rows.filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;

  root.innerHTML = `${pageHead()}
    <div class="panel id-card" style="border-left:4px solid var(--amber)">
      <div class="monogram" style="background:var(--amber)" aria-hidden="true">ZT</div>
      <div>
        <h2 class="id-name">${esc(p.name)}</h2>
        <div class="id-sub">${esc(p.title)} · Assistant Manager, Akij Logistics (ex-MGH Group)</div>
        <div class="tags" style="margin-top:12px">
          <span class="tag acc">IELTS 7.0 (C1 Proficient)</span>
          <span class="tag plain">BBA CGPA 3.42 (German 1.87 gut)</span>
          <span class="tag plain">${esc(p.location)}</span>
          <span class="tag plain">Target: ${esc(p.targetIntake)}</span>
        </div>
      </div>
    </div>

    <div class="grid g2" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>Contact &amp; Identification</h2></div>
        <div class="panel-body">
          ${kv([
            ['Email', p.email],
            ['Phone', p.phone],
            ['Permanent Address', p.permanentAddress],
            ['Passport', p.passport],
            ['Citizenship', p.citizenship],
            ['Marital Status', p.maritalStatus],
            ['Field of Study', p.field],
            ['Target Degree', p.targetDegree]
          ])}
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h2>Standardized English Test (VERIFIED)</h2></div>
        <div class="panel-body">
          <div class="note acc" style="margin-bottom:12px">
            <div><strong>Active &amp; Pre-Approved:</strong> Valid until <strong>28 December 2026</strong>. British Council TRF <strong>24BD047817TASZ001A</strong>. Satisfies all European and Canadian requirements with zero additional tests.</div>
          </div>
          ${kv([
            ['Overall Band Score', `${t.ielts.overall} (${t.ielts.cefr} Level)`],
            ['Listening', t.ielts.listening],
            ['Reading', t.ielts.reading],
            ['Writing', t.ielts.writing],
            ['Speaking', t.ielts.speaking],
            ['Test Date', t.ielts.date],
            ['Centre', t.ielts.centreNumber],
            ['Medium of Instruction', t.moi]
          ])}
        </div>
      </div>
    </div>

    <div class="grid g2" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>Undergraduate Degree (BUP)</h2></div>
        <div class="panel-body">
          ${kv([
            ['Degree', e.degree],
            ['Institution', e.institution],
            ['Session', e.session],
            ['Credits Completed', `${e.credits} / 126.0 (100%)`],
            ['CGPA', `${e.cgpa} / ${e.cgpaScale}`],
            ['German Conversion', `${e.germanGrade} (Top 'gut' tier)`],
            ['Higher Secondary (HSC)', e.hsc],
            ['Secondary (SSC)', e.ssc]
          ])}
          <p class="dim" style="font-size:13px;margin:10px 0 0">${esc(e.gradeNote)}</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h2>Audited Quantitative &amp; Analytical Courses</h2></div>
        <div class="panel-body">
          <ul class="list" style="margin:0">
            ${(e.keyCourses || []).map(c => `<li><strong>${esc(c.code)} ${esc(c.name)}</strong> (${c.credits} cr) — Grade <strong>${esc(c.grade)}</strong></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="section-title"><h2>Professional Freight Forwarding &amp; Supply Chain Experience</h2><span class="aside">3.5+ years continuous</span></div>
    <div class="panel rows">
      ${(p.work || []).map(w => `<div style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div><div class="uni-name">${esc(w.role)}</div><div class="uni-loc">${esc(w.employer)}</div></div>
          <span class="num dim" style="font-size:13px">${esc(w.start)} – ${esc(w.end || 'present')} · ${w.hoursPerWeek}h/wk</span>
        </div>
        ${w.note ? `<p class="muted" style="font-size:13.5px;margin:8px 0 0">${esc(w.note)}</p>` : ''}
        ${(w.bullets || []).length ? `<ul class="list" style="margin-top:8px">${w.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
    </div>

    <div class="grid g2" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>Supply Chain ERP &amp; Technical Skills</h2></div>
        <div class="panel-body">
          ${kv([
            ['Freight Systems', sk.logistics],
            ['Commercial Operations', sk.commercial],
            ['Language Proficiencies', sk.languages]
          ])}
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h2>Verified Academic Referee</h2></div>
        <div class="panel-body">
          <h3 style="margin:0">${esc(ref.name)}</h3>
          <div class="uni-loc" style="font-size:13px;margin-top:2px">${esc(ref.role)} · <strong>${esc(ref.institution)}</strong></div>
          <div class="dim" style="font-size:12.5px;margin-top:4px">Email: ${esc(ref.email)} · Phone: ${esc(ref.phone)}</div>
          <div class="note acc" style="margin-top:10px">
            <div><em>"${esc(ref.quote)}"</em></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProfile(root) {
  if (app.profileMode === 'zarin') {
    renderZarinProfile(root);
    return;
  }
  if (app.profileMode === 'couple') {
    renderCoupleDashboard(root);
    return;
  }

  const p = app.content.profile, e = p.education || {}, cfa = p.cfa || {}, r = p.research || {}, t = p.tests || {}, sk = p.skills || {};
  const initials = (p.name || 'HH').replace(/,.*/, '').split(/\s+/).map(w => w[0]).slice(0, 2).join('');
  const kv = (rows) => `<dl class="kv">${rows.filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
  root.innerHTML = `${pageHead()}
    <div class="panel id-card">
      <div class="monogram" aria-hidden="true">${esc(initials)}</div>
      <div><h2 class="id-name">${esc(p.name)}</h2>
        <div class="id-sub">${esc(p.work?.[0]?.role || '')}${p.work?.[0] ? ` at ${esc(p.work[0].employer)}` : ''}</div>
        <div class="tags" style="margin-top:12px"><span class="tag acc">${esc(cfa.status || 'CFA')}</span><span class="tag plain">${esc(p.location)}</span><span class="tag plain">Target intake: ${esc(p.targetIntake)}</span></div>
      </div>
    </div>
    <div class="grid g2" style="margin-top:16px">
      <div class="panel"><div class="panel-head"><h2>Contact</h2></div><div class="panel-body">${kv([['Email', p.email], ['Phone', p.phone], ['LinkedIn', p.linkedin], ['Citizenship', p.citizenship], ['Field', p.field], ['Target degree', p.targetDegree]])}</div></div>
      <div class="panel"><div class="panel-head"><h2>Education</h2></div><div class="panel-body">${kv([['Degree', e.degree], ['Institution', e.institution], ['Years', e.years], ['CGPA', e.cgpa != null ? `${e.cgpa} / ${e.cgpaScale}` : ''], ['German grade', e.germanGrade], ['Credits', e.credits], ['HSC', e.hsc]])}
        ${e.gradeNote ? `<p class="dim" style="font-size:13px;margin:10px 0 0">${esc(e.gradeNote)}</p>` : ''}</div></div>
      <div class="panel"><div class="panel-head"><h2>CFA charter</h2></div><div class="panel-body"><p style="margin:0 0 10px">${esc(cfa.detail || '')}</p><div class="note acc"><div>${esc(cfa.leverage || '')}</div></div></div></div>
      <div class="panel"><div class="panel-head"><h2>Tests and language</h2></div><div class="panel-body">${kv([['IELTS', t.ielts ?? 'Not taken'], ['TOEFL', t.toefl ?? 'Not taken'], ['Medium of instruction', t.moi], ['GMAT Focus', t.gmatFocus ? `${t.gmatFocus}${t.gmatNote ? ` · ${t.gmatNote}` : ''}` : ''], ['German', t.german]])}</div></div>
    </div>
    <div class="section-title"><h2>Work</h2></div>
    <div class="panel rows">${(p.work || []).map(w => `<div style="padding:16px 20px">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><div class="uni-name">${esc(w.role)}</div><div class="uni-loc">${esc(w.employer)}</div></div><span class="num dim" style="font-size:13px">${esc(w.start)} – ${esc(w.end || 'present')}${w.hoursPerWeek ? ` · ${w.hoursPerWeek}h/wk` : ''}</span></div>
      ${w.note ? `<p class="muted" style="font-size:13.5px;margin:8px 0 0">${esc(w.note)}</p>` : ''}
      ${(w.bullets || []).length ? `<ul class="list" style="margin-top:8px">${w.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>`).join('')}</div>
    ${p.workNote ? `<div class="note warn" style="margin-top:12px"><div>${esc(p.workNote)}</div></div>` : ''}
    <div class="grid g2" style="margin-top:16px">
      <div class="panel"><div class="panel-head"><h2>Research</h2></div><div class="panel-body">${kv([['Paper', r.paper], ['Method', r.method], ['Finding', r.finding], ['Interest', r.interest], ['What sets it apart', r.distinctive]])}</div></div>
      <div class="panel"><div class="panel-head"><h2>Skills and background</h2></div><div class="panel-body">${kv([['Treasury', sk.treasury], ['Analytics', sk.analytics], ['Languages', sk.languages]])}<p class="muted" style="font-size:14px;margin:12px 0 0">${esc(p.background || '')}</p></div></div>
    </div>
    <div class="grid g2" style="margin-top:16px">
      <div class="panel"><div class="panel-head"><h2>Achievements</h2></div><div class="panel-body">${kv((p.achievements || []).map(a => [a.year, a.text]))}</div></div>
      <div class="panel"><div class="panel-head"><h2>Already applied</h2></div><div class="panel-body">${kv((p.alreadyApplied || []).map(a => [a.status, `${a.programme}${a.note ? ` — ${a.note}` : ''}`]))}</div></div>
    </div>
    ${(p.referees || []).length ? `
      <div class="section-title"><h2>Referees &amp; Endorsements</h2><span class="aside">${p.referees.length} verified referees</span></div>
      <div class="grid g2">
        ${p.referees.map(ref => `
          <div class="panel" style="padding:18px 20px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
              <div>
                <h3 style="margin:0">${esc(ref.name)}</h3>
                <div class="uni-loc" style="font-size:13px;margin-top:2px">${esc(ref.role)} · <strong>${esc(ref.employer || ref.institution)}</strong></div>
              </div>
              <span class="tag acc">${esc(ref.type)}</span>
            </div>
            ${ref.academicRole ? `<div class="dim" style="font-size:12.5px;margin-top:6px">${esc(ref.academicRole)}</div>` : ''}
            ${ref.education ? `<div class="field" style="margin-top:10px"><div class="field-k">Education &amp; Award</div><div class="field-v" style="font-size:13px">${esc(ref.education)}</div></div>` : ''}
            ${ref.awardProof || ref.linkedin ? `
              <div class="tags" style="margin-top:10px">
                ${ref.awardProof ? `<a class="btn btn-sm" href="${esc(ref.awardProof)}" target="_blank" rel="noopener">Official DAAD Award Letter ↗</a>` : ''}
                ${ref.linkedin ? `<a class="btn btn-sm" href="${esc(ref.linkedin)}" target="_blank" rel="noopener">LinkedIn Profile ↗</a>` : ''}
              </div>
            ` : ''}
            <div class="note acc" style="margin-top:12px;font-size:12.5px"><div>${esc(ref.strategicValue)}</div></div>
          </div>
        `).join('')}
      </div>
    ` : ''}
    <div class="section-title"><h2>Campaign achievements</h2><span class="aside">${app.state.achievements.length} of ${app.missions.achievements.length} unlocked</span></div>
    <div class="badge-grid">${app.missions.achievements.map(a => { const has = app.state.achievements.includes(a.id); return `<div class="panel ach ${has ? '' : 'locked'}"><span class="ach-ic" aria-hidden="true">${esc(a.icon)}</span><div><div class="ach-n">${esc(a.name)}</div><div class="ach-d">${esc(a.desc)} · +${a.xp} XP</div></div></div>`; }).join('')}</div>
    <div class="section-title"><h2>Data</h2></div>
    <div class="panel"><div class="panel-body" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <span class="muted" style="font-size:14px;flex:1;min-width:240px">Progress is saved in this browser only. Export it to move to another device.</span>
      <button class="btn btn-sm" type="button" id="exp">Export progress</button>
      <label class="btn btn-sm" style="cursor:pointer">Import progress<input type="file" id="imp" accept="application/json" hidden></label>
      <button class="btn btn-sm" type="button" id="rst" style="color:var(--red)">Reset progress</button>
    </div></div>`;
  $('#exp').onclick = () => {
    const blob = new Blob([JSON.stringify(app.state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `scholarverse-progress-${TODAY_ISO}.json`; a.click(); URL.revokeObjectURL(a.href);
  };
  $('#imp').onchange = async (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    try { const s = JSON.parse(await f.text()); if (!Array.isArray(s.missions)) throw new Error('Not a ScholarVerse progress file'); await post('/api/import', s); app.state = await api('/api/state'); toast('Progress imported'); render(); }
    catch (err) { toast('Import failed', err.message); }
  };
  /* two-step confirm without window.confirm, which sandboxed previews block */
  let armed = false;
  $('#rst').onclick = async () => {
    if (!armed) { armed = true; $('#rst').textContent = 'Click again to erase everything'; setTimeout(() => { armed = false; const b = $('#rst'); if (b) b.textContent = 'Reset progress'; }, 4000); return; }
    app.state = await post('/api/reset', {}); toast('Progress reset'); render();
  };
}

/* ============================================================================
   PALETTE & MODAL
   ============================================================================ */
let PAL = [];
function paletteIndex() {
  const items = [];
  Object.entries(VIEWS).forEach(([k, v]) => items.push({ kind: 'Page', label: v.t, sub: v.s, run: () => go(k) }));
  app.content.targets.forEach(t => items.push({ kind: 'Target', label: `${t.flag || ''} ${t.name}`, sub: t.country, run: () => openTarget(t.id) }));
  app.missions.missions.forEach(m => items.push({ kind: 'Mission', label: m.title, sub: `${m.category} · ${m.xp} XP`, run: () => openMission(m.id) }));
  app.profs.professors.forEach(p => items.push({ kind: 'Professor', label: p.name, sub: p.university, run: () => openProf(p) }));
  (app.res.uniCensus || []).forEach(u => items.push({ kind: 'University', label: u[0], sub: `${u[1]} · ${u[3]}`, run: () => { app.f.uniMode = 'census'; app.f.uniQuery = u[0]; go('universities'); } }));
  app.content.documents.forEach(d => items.push({ kind: 'Document', label: d.name, sub: d.type, run: () => { app.f.doc = d.type; go('documents'); } }));
  (app.res.fundingSchemes || []).forEach(f => items.push({ kind: 'Funding', label: f.name, sub: f.kind, run: () => go('funding') }));
  app.content.playbook.forEach(p => items.push({ kind: 'Playbook', label: p.title, sub: '', run: () => { app.openPlay = p.id; go('playbook'); } }));
  return items;
}
function openPalette() { PAL = paletteIndex(); $('#palette').classList.add('is-open'); const i = $('#paletteInput'); i.value = ''; renderPalette(); setTimeout(() => i.focus(), 20); }
function closePalette() { $('#palette').classList.remove('is-open'); }
function renderPalette() {
  const q = $('#paletteInput').value.trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const hits = (terms.length ? PAL.filter(i => { const h = (i.label + ' ' + i.sub + ' ' + i.kind).toLowerCase(); return terms.every(t => h.includes(t)); }) : PAL.slice(0, 15)).slice(0, 50);
  $('#paletteList').innerHTML = hits.length ? hits.map((h, i) => `<div class="pal-item" data-sel="${i === 0}" data-i="${PAL.indexOf(h)}"><span class="pal-kind">${esc(h.kind)}</span><span class="pal-label">${esc(h.label)}<span class="pal-sub">${esc(h.sub || '')}</span></span></div>`).join('') : '<div class="empty">No matches. Try a university, professor or scheme name.</div>';
  $$('#paletteList .pal-item').forEach(el => {
    el.onclick = () => { const it = PAL[+el.dataset.i]; closePalette(); it.run(); };
    el.onmouseenter = () => { $$('#paletteList .pal-item').forEach(x => x.dataset.sel = 'false'); el.dataset.sel = 'true'; };
  });
}

let lastFocus = null;
function openModal(html) {
  lastFocus = document.activeElement;
  $('#modalInner').innerHTML = `<button class="close-btn" id="mX" type="button" aria-label="Close">${icon('x')}</button>${html}`;
  $('#modal').classList.add('is-open'); $('#modal').scrollTop = 0;
  document.body.style.overflow = 'hidden';
  $('#mX').onclick = closeModal; $('#mX').focus();
}
function closeModal() {
  if (!$('#modal').classList.contains('is-open')) return;
  $('#modal').classList.remove('is-open'); document.body.style.overflow = '';
  lastFocus?.focus?.();
}

document.addEventListener('DOMContentLoaded', boot);
