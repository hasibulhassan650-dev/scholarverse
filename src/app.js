/* ============================================================================
   SCHOLARVERSE — CLIENT v3 ("Runway")
   Renders every view from the in-page data brain via the offline API shim.
   Hash routing (#missions), command palette (Ctrl/⌘K), light & dark themes.
   ============================================================================ */

const app = {
  state: null, content: null, missions: null, unis: null, profs: null, cits: null, res: null, excel: null,
  view: 'dashboard',
  f: { mission: 'all', doc: 'all', target: 'all', uniGate: 'all', uniMode: 'ranked', uniQuery: '',
       profTier: 'all', profStatus: 'all', citStatus: 'all', cal: 'all', sheet: null, sheetQuery: '' },
  calDate: null
};

/* ---------------- helpers ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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
  { name: 'Swedish universities', date: '2027-01-15' }
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
  document.title = `${VIEWS[app.view].t} · ScholarVerse`;
  const st = app.state, L = app.missions.levels;
  const lv = [...L].reverse().find(l => st.xp >= l.xp) || L[0];
  const next = L.find(l => l.xp > st.xp);
  $('#lvlTitle').textContent = `${lv.title} · level ${lv.level}`;
  $('#xpText').textContent = next ? `${st.xp} / ${next.xp} XP` : `${st.xp} XP`;
  const pct = next ? Math.round(((st.xp - lv.xp) / (next.xp - lv.xp)) * 100) : 100;
  $('#xpFill').style.width = Math.max(2, pct) + '%';
  $('#streakText').textContent = st.streak ? `${plural(st.streak, 'day')} streak` : 'No streak yet';

  const setCount = (k, n, hot) => { const el = $('#nc-' + k); if (!el) return; el.hidden = !n; el.textContent = n; el.classList.toggle('hot', !!hot); };
  const open = st.missions.filter(m => m.status !== 'done').length;
  setCount('missions', open);
  const missing = app.content.documents.filter(d => ['missing', 'not_started'].includes(d.status)).length;
  setCount('documents', missing, missing > 0);
  setCount('professors', app.profs.professors.length);
  setCount('universities', (app.res.uniCensus || []).length);
  const flagged = app.cits.citations.filter(c => ['WRONG_AUTHOR', 'PAPER_MISSING'].includes(c.status)).length;
  setCount('citations', flagged, flagged > 0);
}

function pageHead(extra = '') {
  const v = VIEWS[app.view];
  return `<header class="page-head"><div><h1 class="page-title">${esc(v.t)}</h1><p class="page-sub">${esc(v.s)}</p></div>${extra ? `<div class="page-tools">${extra}</div>` : ''}</header>`;
}

function renderView() {
  const fn = {
    dashboard: renderDashboard, calendar: renderCalendar, timeline: renderTimeline, missions: renderMissions,
    documents: renderDocuments, excel: renderExcel, targets: renderTargets, universities: renderUniversities,
    subjects: renderSubjects, funding: renderFunding, professors: renderProfessors, citations: renderCitations,
    agents: renderAgents, playbook: renderPlaybook, profile: renderProfile
  }[app.view];
  const page = $('#page');
  page.innerHTML = `<section class="view is-active" id="view-${app.view}"></section>`;
  fn($('#view-' + app.view));
}

const stats = (items) => `<div class="stats">${items.map(([k, v, s, cls]) =>
  `<div class="stat"><div class="stat-k">${esc(k)}</div><div class="stat-v ${cls || ''}">${v}</div>${s ? `<div class="stat-s">${esc(s)}</div>` : ''}</div>`).join('')}</div>`;
const chips = (id, opts, cur) => `<div class="chips" id="${id}">${opts.map(([k, l]) =>
  `<button class="chip" type="button" data-k="${esc(k)}" aria-pressed="${cur === k}">${esc(l)}</button>`).join('')}</div>`;
const wireChips = (root, id, fn) => $$(`#${id} .chip`, root).forEach(b => b.onclick = () => fn(b.dataset.k));

/* ============================================================================
   MISSIONS — shared toggle
   ============================================================================ */
const missionMeta = (id) => app.missions.missions.find(m => m.id === id);
const isDone = (id) => (app.state.missions.find(m => m.id === id) || {}).status === 'done';

async function toggleMission(id) {
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

function openMission(id) {
  const m = missionMeta(id); if (!m) return;
  const d = daysUntil(m.deadline);
  const tgts = (m.targets || []).map(t => app.content.targets.find(x => x.id === t)).filter(Boolean);
  openModal(`
    <h2>${esc(m.title)}</h2>
    <div class="dialog-sub">${esc(m.category || '')}${m.owner ? ` · owner: ${esc(m.owner)}` : ''}</div>
    <div class="tags">
      <span class="tag ${isDone(id) ? 'ok' : 'warn'}">${isDone(id) ? 'Done' : 'To do'}</span>
      <span class="tag acc">+${m.xp} XP</span>
      ${m.deadline ? `<span class="tag ${d < 0 ? 'bad' : d <= 30 ? 'warn' : 'plain'}">Due ${fmt(m.deadline)} · ${dueText(d)}</span>` : ''}
      ${m.urgency === 'critical' ? '<span class="tag bad">Critical</span>' : ''}
    </div>
    ${m.detail ? `<div class="field"><div class="field-k">What to do</div><div class="field-v">${esc(m.detail)}</div></div>` : ''}
    ${m.why ? `<div class="field"><div class="field-k">Why it matters</div><div class="field-v">${esc(m.why)}</div></div>` : ''}
    ${m.checklist?.length ? `<div class="field"><div class="field-k">Checklist</div><ul class="list">${m.checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>` : ''}
    ${tgts.length ? `<div class="field"><div class="field-k">Unlocks</div><div class="tags">${tgts.map(t => `<span class="tag plain">${t.flag || ''} ${esc(t.short || t.name)}</span>`).join('')}</div></div>` : ''}
    <div style="display:flex;gap:8px;margin-top:22px;flex-wrap:wrap">
      <button class="btn btn-primary" id="mToggle" type="button">${isDone(id) ? 'Reopen mission' : `Mark done · +${m.xp} XP`}</button>
      ${m.actionUrl ? `<a class="btn" href="${esc(m.actionUrl)}" target="_blank" rel="noopener">Open the site</a>` : ''}
    </div>`);
  $('#mToggle').onclick = async () => { closeModal(); await toggleMission(id); };
}

/* ============================================================================
   DASHBOARD
   ============================================================================ */
function horizonEvents() {
  const seen = new Set(), out = [];
  const add = (name, date, kind, open) => {
    const key = name.toLowerCase().split(' ')[0] + date;
    if (!date || seen.has(key)) return; seen.add(key);
    out.push({ name, date, kind, d: daysUntil(date), open });
  };
  app.content.targets.forEach(t => {
    add(t.short || t.name, t.deadline, 'target', () => openTarget(t.id));
  });
  CRITICAL_DATES.forEach(c => add(c.name, c.date, 'critical', () => openCritical(c)));
  add(ZOOM.name, ZOOM.date, 'session', openZoom);
  return out.sort((a, b) => a.date.localeCompare(b.date));
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
  $('.axis-line', inner).style.top = $('.axis-elapsed', inner).style.top = AXIS + 'px';
  $$('.axis-month', inner).forEach(m => m.style.top = (AXIS + 14) + 'px');
  $('.axis-today', inner).style.height = (AXIS + 6) + 'px';
  ticks.forEach(t => {
    const top = TOP + t.lane * LANE_H;
    t.el.style.top = top + 'px';
    $('.tick-label', t.el).style.transform = t.shift ? `translateX(${t.shift}px)` : '';
    $('.tick-stem', t.el).style.height = Math.max(2, AXIS - top - $('.tick-label', t.el).offsetHeight - 5) + 'px';
  });
}
window.addEventListener('resize', () => { if (app.view === 'dashboard') layoutRunway(document); });

function renderDashboard(root) {
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

    <div style="margin-top:22px">${stats([
      ['Missions done', `${done}<span class="dim" style="font-size:18px">/${total}</span>`, `${Math.round(done / total * 100)}% of the plan`],
      ['Experience', st.xp, `${st.achievements.length} achievements`, 'acc'],
      ['Open schemes', openT, `of ${app.content.targets.length} verified targets`, 'ok'],
      ['Documents missing', docsMissing, 'need chasing', docsMissing ? 'bad' : 'ok'],
      ['Streak', st.streak || 0, `best ${st.longestStreak || 0} days`]
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
          ${cats.map(([n, c]) => `<div class="cat-row"><span>${esc(n)}</span><div class="bar"><i style="width:${Math.round(c.d / c.t * 100)}%"></i></div><span class="num">${c.d}/${c.t}</span></div>`).join('')}
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
      ${app.content.deadEnds.slice(0, 8).map(d => `<div class="dead"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.reason || d.why || '')}</div></div></div>`).join('')}
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
  $$('[data-go]', root).forEach(b => b.onclick = () => go(b.dataset.go));
  $('#dPal').onclick = openPalette;
  $('#dZoom').onclick = openZoom;
  $('#dEpos').onclick = () => { app.openPlay = 'epos'; go('playbook'); };
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

/* ============================================================================
   CALENDAR
   ============================================================================ */
function calendarEvents() {
  const evs = [];
  app.content.targets.forEach(t => {
    if (t.deadline) evs.push({ id: 't-' + t.id, date: t.deadline, title: `${t.flag || ''} ${t.short || t.name}`, kind: 'target', cls: t.priority === 'P0' ? 'critical' : 'target', open: () => openTarget(t.id) });
    if (t.gateDeadline) evs.push({ id: 'g-' + t.id, date: t.gateDeadline, title: `${t.short || t.name} university application`, kind: 'target', cls: 'target', open: () => openTarget(t.id) });
  });
  app.missions.missions.forEach(m => {
    if (m.deadline) evs.push({ id: 'm-' + m.id, date: m.deadline, title: m.title, kind: 'mission', cls: isDone(m.id) ? 'done' : m.urgency === 'critical' ? 'critical' : m.urgency === 'high' ? 'high' : '', open: () => openMission(m.id) });
  });
  CRITICAL_DATES.forEach(c => evs.push({ id: 'c-' + c.name, date: c.date, title: `${c.name} deadline`, kind: 'critical', cls: 'critical', open: () => openCritical(c) }));
  evs.push({ id: 'zoom', date: ZOOM.date, title: 'Göttingen info session', kind: 'session', cls: 'high', open: openZoom });
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
    ...app.content.targets.filter(t => t.deadline).map(t => ({ date: t.deadline, name: `${t.flag || ''} ${t.name}`, kind: 'Scheme', open: () => openTarget(t.id) })),
    ...app.content.targets.filter(t => t.gateDeadline).map(t => ({ date: t.gateDeadline, name: `${t.short || t.name}: ${t.gateLabel || 'university application'}`, kind: 'University', open: () => openTarget(t.id) })),
    ...app.content.documents.filter(d => d.deadline).map(d => ({ date: d.deadline, name: d.name, kind: 'Document' })),
    ...app.missions.missions.filter(m => m.deadline).map(m => ({ date: m.deadline, name: m.title, kind: isDone(m.id) ? 'Done' : 'Mission', open: () => openMission(m.id) }))
  ].sort((a, b) => a.date.localeCompare(b.date));
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
  const M = app.missions.missions;
  const done = M.filter(m => isDone(m.id)).length;
  const xpAll = M.reduce((a, m) => a + m.xp, 0);
  const cats = ['all', 'thisweek', ...new Set(M.map(m => m.category))];
  let list = M.slice();
  if (app.f.mission === 'thisweek') { const ids = app.missions.thisWeek.map(w => w.id); list = list.filter(m => ids.includes(m.id)); }
  else if (app.f.mission === 'open') list = list.filter(m => !isDone(m.id));
  else if (app.f.mission !== 'all') list = list.filter(m => m.category === app.f.mission);
  const urg = { critical: 0, high: 1, medium: 2, low: 3 };
  list.sort((a, b) => (isDone(a.id) - isDone(b.id)) || (urg[a.urgency] ?? 9) - (urg[b.urgency] ?? 9) || String(a.deadline || '9').localeCompare(String(b.deadline || '9')));

  root.innerHTML = `${pageHead()}
    ${stats([['Done', done, `of ${M.length} missions`, 'ok'], ['Still open', M.length - done, 'sorted by urgency'], ['Your XP', app.state.xp, `of ${xpAll} available`, 'acc'],
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
  const D = app.content.documents;
  const cnt = (ss) => D.filter(d => ss.includes(d.status)).length;
  const types = ['all', ...new Set(D.map(d => d.type))];
  const order = { missing: 0, not_started: 1, partial: 2, unconfirmed: 3, verify: 4, have: 5 };
  let list = app.f.doc === 'all' ? D.slice() : D.filter(d => d.type === app.f.doc);
  list.sort((a, b) => (b.blocker ? 1 : 0) - (a.blocker ? 1 : 0) || (order[a.status] ?? 9) - (order[b.status] ?? 9));
  const tName = (id) => { const t = app.content.targets.find(x => x.id === id); return t ? (t.short || t.name) : id; };

  root.innerHTML = `${pageHead()}
    ${stats([['Required', D.length, 'across all applications'], ['Ready', cnt(['have']), 'in hand', 'ok'],
      ['Needs checking', cnt(['partial', 'verify', 'unconfirmed']), 'partial or unconfirmed', 'warn'],
      ['Missing', cnt(['missing', 'not_started']), 'not started yet', 'bad'], ['Blockers', D.filter(d => d.blocker).length, 'stop an application']])}
    <div class="toolbar">${chips('dF', types.map(t => [t, t === 'all' ? 'All types' : t]), app.f.doc)}</div>
    <div class="panel rows">
      ${list.map(d => { const [c, l] = DOC_STATUS[d.status] || ['plain', d.status]; return `<div class="doc-row" style="cursor:pointer" data-doc="${esc(d.id)}">
        <span class="doc-dot ${c}" aria-hidden="true"></span>
        <div><div class="doc-name">${esc(d.name)}</div>${d.spec ? `<div class="doc-spec">${esc(d.spec)}</div>` : ''}</div>
        <div class="doc-for">${(d.req || []).length ? `For ${esc(d.req.map(tName).join(', '))}` : ''}${d.owner ? `<br><span class="dim">From: ${esc(d.owner)}</span>` : ''}</div>
        <div class="tags" style="justify-content:flex-end"><span class="tag ${c}">${esc(l)}</span>${d.blocker ? '<span class="tag bad plain">Blocker</span>' : ''}<span class="tag plain">${esc(d.type)}</span></div>
      </div>`; }).join('')}
    </div>`;
  wireChips(root, 'dF', k => { app.f.doc = k; renderDocuments(root); });
  $$('[data-doc]', root).forEach(el => {
    el.onclick = () => {
      const d = D.find(x => x.id === el.dataset.doc);
      if (d) openDocModal(d);
    };
  });
}

function openDocModal(d) {
  const [c, l] = DOC_STATUS[d.status] || ['plain', d.status];
  openModal(`
    <h2>${esc(d.name)}</h2>
    <div class="dialog-sub">${esc(d.type || 'Official Document')} · Owner: <strong>${esc(d.owner || 'You')}</strong></div>
    <div class="tags" style="margin-top:10px">
      <span class="tag ${c}">${esc(l)}</span>
      ${d.blocker ? '<span class="tag bad plain">Hard Blocker</span>' : '<span class="tag plain">Standard Requirement</span>'}
      ${d.deadline ? `<span class="tag plain">Deadline: ${fmt(d.deadline)}</span>` : ''}
    </div>
    <div class="field" style="margin-top:16px">
      <div class="field-k">Specification &amp; Required Format</div>
      <div class="field-v">${esc(d.spec || 'Official documentation required for university admission and study permit issuance.')}</div>
    </div>
    ${d.note ? `<div class="note warn" style="margin-top:14px"><div><strong>Action Guidance:</strong> ${esc(d.note)}</div></div>` : ''}
    <div style="display:flex;gap:10px;margin-top:22px;justify-content:flex-end">
      <button class="btn btn-primary" id="docToggleBtn" type="button">
        ${d.status === 'have' ? 'Mark as Missing' : 'Mark as Ready / Acquired'}
      </button>
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);
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
  const db = (app.excel && app.excel.database) || {};
  const names = Object.keys(db);
  if (!names.length) { root.innerHTML = pageHead() + '<div class="empty">The workbook data is not in this file.</div>'; return; }
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
    <div class="field"><div class="field-k">Funding</div><div class="field-v">${esc(t.funding)}${t.fundingDetail ? `\n<span class="muted">${esc(t.fundingDetail)}</span>` : ''}</div></div>
    ${t.subjectFit ? `<div class="field"><div class="field-k">Subject fit</div><div class="field-v">${esc(t.subjectFit)}</div></div>` : ''}
    <div class="field"><div class="field-k">How to apply</div><div class="field-v">${esc(t.route)}${t.gateLabel ? `\n<span class="muted">${esc(t.gateLabel)}</span>` : ''}</div></div>
    <div class="field"><div class="field-k">Why it matters</div><div class="field-v">${esc(t.why)}</div></div>
    <div class="field"><div class="field-k">Eligible programmes</div>${list(t.eligibleProgrammes)}</div>
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
}

function renderTargets(root) {
  const T = app.content.targets, G = app.content.gates || [];
  let list = app.f.target === 'all' ? T.slice() : T.filter(t => String(t.tier) === app.f.target);
  list.sort((a, b) => a.tier - b.tier || String(a.deadline || '9').localeCompare(String(b.deadline || '9')));

  root.innerHTML = `${pageHead()}
    ${stats([['Verified targets', T.length, 'every deadline checked'], ['Open now', T.filter(t => t.status === 'open').length, 'you can act today', 'ok'],
      ['Opening soon', T.filter(t => t.status === 'opening_soon').length, 'prepare now', 'warn'], ['Ruled out', app.content.deadEnds.length, 'confirmed dead ends', 'bad']])}
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
    <div class="section-title"><h2>Ruled out</h2><span class="aside">${plural(app.content.deadEnds.length, 'scheme')}</span></div>
    <div class="panel"><div class="panel-body grid g2" style="gap:0 32px">
      ${app.content.deadEnds.map(d => `<div class="dead"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.reason || d.why || '')}</div></div></div>`).join('')}
    </div></div>`;
  wireChips(root, 'tF', k => { app.f.target = k; renderTargets(root); });
  $$('[data-t]', root).forEach(b => b.onclick = () => openTarget(b.dataset.t));
}

/* ============================================================================
   UNIVERSITIES
   ============================================================================ */
function facultyAt(name) {
  const n = name.toLowerCase();
  return app.profs.professors.filter(p => { const u = (p.university || '').toLowerCase(); return u && (u.includes(n) || n.includes(u)); });
}
const peopleHTML = (ps) => ps.length ? `<div class="people">${ps.map(p => `<button class="person-link" type="button" data-prof="${esc(p.name)}">${esc(p.name)}${p.deep ? ' ★' : ''}</button>`).join('')}</div>` : '';
const wireProfLinks = (root) => $$('[data-prof]', root).forEach(b => b.onclick = (e) => { e.stopPropagation(); const p = app.profs.professors.find(x => x.name === b.dataset.prof); if (p) openProf(p); });

function renderUniversities(root) {
  const census = app.res.uniCensus || [], ranked = app.res.uniRanked || [];
  const g = (x) => String(x || 'UNVERIFIED').toUpperCase();
  const c = (k) => census.filter(u => g(u[3]) === k).length;
  const CAT = { U15: 'U15', MD: 'Medical/doctoral', COMP: 'Comprehensive', PU: 'Primarily undergraduate', SPEC: 'Specialised', FR: 'Francophone' };

  let body = '';
  if (app.f.uniMode === 'ranked') {
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

  root.innerHTML = `${pageHead(`<div class="seg" id="uM"><button type="button" data-m="ranked" aria-pressed="${app.f.uniMode === 'ranked'}">Ranked for you</button><button type="button" data-m="census" aria-pressed="${app.f.uniMode === 'census'}">Full census</button></div>`)}
    ${stats([['Institutions audited', census.length, 'degree-granting public'], ['Clear the gate', c('PASS'), '16+ months, thesis, funded', 'ok'],
      ['Partial', c('PARTIAL'), 'one route qualifies', 'warn'], ['Fail the gate', c('FAIL'), 'excluded', 'bad'], ['Unverified', c('UNVERIFIED'), 'not yet confirmed']])}
    ${body}`;
  $$('#uM button', root).forEach(b => b.onclick = () => { app.f.uniMode = b.dataset.m; renderUniversities(root); });
  wireChips(root, 'uG', k => { app.f.uniGate = k; renderUniversities(root); });
  const inp = $('#uQ');
  if (inp) inp.oninput = () => { app.f.uniQuery = inp.value; const p = inp.selectionStart; renderUniversities(root); const n = $('#uQ'); n.focus(); n.setSelectionRange(p, p); };
  wireProfLinks(root);

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
        <div class="field-k">Tracked Faculty with Research Dossiers</div>
        <div class="tags" style="margin-top:8px">
          ${fac.map(p => `<button class="btn btn-sm btn-primary" type="button" data-modalprof="${esc(p.name)}">${esc(p.name)}${p.deep ? ' ★' : ''} → View Dossier</button>`).join('')}
        </div>
      </div>
    ` : ''}
    <div style="margin-top:20px;display:flex;justify-content:flex-end">
      <button class="btn" onclick="closeModal()" type="button">Close</button>
    </div>
  `);

  $$('#modalInner [data-modalprof]').forEach(b => {
    b.onclick = () => {
      const p = app.profs.professors.find(x => x.name === b.dataset.modalprof);
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
    <div class="grid g3">${(R.subjectRanked || []).map(r => `<div class="panel" style="padding:18px 20px">
      <div style="display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px"><span class="rank">${r.rank}</span><div><div class="uni-name">${esc(r.target)}</div><div class="uni-loc">${esc(r.gate)}</div></div></div>
      <p style="font-size:14px;margin:12px 0 0">${esc(r.why)}</p></div>`).join('')}</div>
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
}

/* ============================================================================
   FUNDING
   ============================================================================ */
function renderFunding(root) {
  const S = app.res.fundingSchemes || [], DE = app.res.fundingDeadEnds || [];
  const ver = S.filter(s => s.verified).length;
  root.innerHTML = `${pageHead()}
    ${stats([['Schemes tracked', S.length, 'funding routes'], ['Guaranteed', S.filter(s => /guaranteed/i.test(s.kind)).length, 'attach to admission', 'ok'],
      ['Open now', S.filter(s => s.status === 'OPEN').length, `of ${S.length}`], ['Verified amounts', ver, 'the rest are unconfirmed', 'warn'], ['Dead ends', DE.length, 'exclude you', 'bad']])}
    <div class="note warn" style="margin-bottom:16px"><div><strong>Only ${ver} of ${S.length} amounts are independently confirmed.</strong> Treat every unverified figure as a lead and check it on the official page before it shapes a decision.</div></div>
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
    </div></div>
    <div class="section-title"><h2>Dead ends</h2><span class="aside">Look open, but exclude you</span></div>
    <div class="panel"><div class="panel-body grid g2" style="gap:0 32px">${DE.map(d => `<div class="dead"><span class="dead-x">×</span><div><div class="dead-n">${esc(d.name)}</div><div class="dead-r">${esc(d.why || d.reason || '')}</div></div></div>`).join('')}</div></div>`;
}

/* ============================================================================
   PROFESSORS
   ============================================================================ */
const sendable = (p) => /SEND|READY/.test(p.draft || '') && !/DO NOT SEND/.test(p.draft || '');
const blocked = (p) => /BLOCKED|DO NOT SEND/.test(p.draft || '');
const emailOk = (p) => /VERIFIED/.test(p.email_status || '') && !/UNVERIFIED/.test(p.email_status || '');

function renderProfessors(root) {
  const P = app.profs.professors;
  let list = P.slice();
  if (app.f.profTier !== 'all') list = list.filter(p => p.tier === app.f.profTier);
  if (app.f.profStatus === 'send') list = list.filter(sendable);
  if (app.f.profStatus === 'blocked') list = list.filter(blocked);
  if (app.f.profStatus === 'hold') list = list.filter(p => /HOLD|DEPRIORITISE/.test(p.draft || ''));
  if (app.f.profStatus === 'deep') list = list.filter(p => p.deep);
  const tr = { A: 0, B: 1, C: 2, UNSCORED: 3 };
  list.sort((a, b) => (tr[a.tier] ?? 9) - (tr[b.tier] ?? 9) || (b.score || 0) - (a.score || 0));
  const tiers = ['all', ...new Set(P.map(p => p.tier).filter(Boolean))];

  root.innerHTML = `${pageHead()}
    ${stats([['Professors', P.length, `${P.filter(p => p.tier === 'A').length} in tier A`], ['Ready to email', P.filter(sendable).length, 'verified and drafted', 'ok'],
      ['Blocked', P.filter(blocked).length, 'do not send yet', 'bad'], ['Emails verified', P.filter(emailOk).length, 'from official directories', 'acc'], ['Full dossiers', P.filter(p => p.deep).length, '10 papers analysed each']])}
    <div class="toolbar">
      ${chips('pT', tiers.map(t => [t, t === 'all' ? 'All tiers' : t === 'UNSCORED' ? 'Unscored' : `Tier ${t}`]), app.f.profTier)}
      ${chips('pS', [['all', 'Any status'], ['send', 'Ready to email'], ['deep', 'Has dossier'], ['blocked', 'Blocked'], ['hold', 'On hold']], app.f.profStatus)}
    </div>
    <div class="grid auto">${list.map(p => `<button class="panel prof" type="button" data-p="${esc(p.name)}">
      <div class="prof-top"><span class="score ${p.tier === 'A' ? 'a' : p.tier === 'B' ? 'b' : ''}">${p.score ?? '—'}</span>
        <div><div class="uni-name">${esc(p.name)}</div><div class="uni-loc">${esc(p.university)}${p.department ? ` · ${esc(p.department)}` : ''}</div></div></div>
      <div class="prof-why">${esc(p.why || p.research || '')}</div>
      <div class="tags">
        ${sendable(p) ? '<span class="tag ok">Ready to email</span>' : blocked(p) ? '<span class="tag bad">Blocked</span>' : p.draft ? '<span class="tag warn">Hold</span>' : ''}
        ${p.recruiting ? '<span class="tag acc">Recruiting</span>' : ''}
        ${p.deep ? '<span class="tag plain">Dossier</span>' : ''}
        <span class="tag ${emailOk(p) ? 'ok' : 'warn'} plain">${emailOk(p) ? 'Email verified' : 'Email unconfirmed'}</span>
      </div>
      <div class="prof-mail">${esc(p.email || '')}</div>
    </button>`).join('') || '<div class="empty">No professors match.</div>'}</div>`;
  wireChips(root, 'pT', k => { app.f.profTier = k; renderProfessors(root); });
  wireChips(root, 'pS', k => { app.f.profStatus = k; renderProfessors(root); });
  $$('[data-p]', root).forEach(b => b.onclick = () => openProf(P.find(x => x.name === b.dataset.p)));
}

function copyBtn(id) { return `<button class="btn btn-sm" type="button" data-copy="${id}">Copy</button>`; }

function openProf(p) {
  const deep = p.deep || {}, dos = deep.dossier || {}, papers = deep.papers || [];
  const tabs = [];
  if (papers.length) tabs.push(['papers', `Papers (${papers.length})`]);
  if (deep.dossier) tabs.push(['dossier', 'Fit dossier']);
  tabs.push(['overview', 'Contact & outreach'], ['network', 'Supervision']);
  const pane = {};
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

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-copy]'); if (!b) return;
  const box = document.getElementById(b.dataset.copy); if (!box) return;
  const txt = box.textContent.replace(/Copy$/, '').trim();
  (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast('Copied to clipboard')).catch(() => toast('Copy failed', 'Select the text and copy it manually'));
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
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline"><div class="uni-name">${esc(c.professor)}</div><span class="tag ${cls}">${lab}</span></div>
      <div class="cite">${esc(c.citation)}${c.doi ? `<small>doi:${esc(c.doi)}</small>` : ''}</div>
      ${c.abstractNote && c.abstractNote !== '—' ? `<div class="field"><div class="field-k">What the paper says</div><div class="field-v">${esc(c.abstractNote)}</div></div>` : ''}
      ${(c.findings || []).length ? `<div class="field"><div class="field-k">Checks</div><ul class="list">${c.findings.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
      <div class="note ${cls === 'acc' ? 'acc' : cls}" style="margin-top:14px"><div><strong>${esc(c.verdict)}</strong></div></div>
    </div>`; }).join('')}</div>`;
  wireChips(root, 'cF', k => { app.f.citStatus = k; renderCitations(root); });
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
    } catch (e) { toast('Agent failed', e.message); }
    b.disabled = false; b.textContent = 'Run again';
  });
}

/* ============================================================================
   PLAYBOOK
   ============================================================================ */
function renderPlaybook(root) {
  const P = app.content.playbook;
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
function renderProfile(root) {
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
