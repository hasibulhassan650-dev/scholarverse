# AGENTS.md — instructions for coding agents working on ScholarVerse

ScholarVerse is a single-page, offline-first dashboard for one person's funded-master's
applications. GitHub Pages serves `index.html`. That file is **generated**: edit the sources
in `src/`, then rebuild.

## The one rule

**Never edit `index.html` or `ScholarVerse-STANDALONE.html` directly.** Edit files in `src/`,
then run:

```bash
python3 build.py --check   # validate only
python3 build.py           # validate, then write both HTML files
```

Commit the changed `src/` files **and** the rebuilt `index.html` and
`ScholarVerse-STANDALONE.html` in the same commit. If the build prints `ERROR`, fix it before
committing; do not commit a failed build.

## Where things live

| To change…                                   | Edit                              |
|----------------------------------------------|-----------------------------------|
| Profile, targets, dead ends, gates, documents, agents, playbook | `src/data/content.js` |
| Missions, this week's five, XP levels, achievements, weekly routine | `src/data/missions.js` |
| Canadian university list (50, with programmes) | `src/data/universities.js` |
| Professors (core list)                       | `src/data/professors.js`          |
| Professors (email campaign list)             | `src/data/professors-campaign.js` |
| Professor 10-paper analyses and fit dossiers | `src/data/professors-deep.js`     |
| Workbook tab (mirror of the .xlsx)           | `src/data/excel-data.js`          |
| Citation verification records                | `src/data/citations.js`           |
| Subject fit, funding schemes, university census, ranked universities | `src/data/research.js` |
| Look and feel                                | `src/styles.css`                  |
| Page layout, rendering, behaviour            | `src/app.js`                      |
| Progress saving, XP maths, agent reports     | `src/offline-api.js`              |
| `<head>`, fonts, page skeleton               | `src/shell.html`                  |

Most updates are data updates. Prefer editing `src/data/*` over touching `app.js`.

## Rules for data files

- All data files run in **one shared script scope**. Never declare a `const`/`let` name that
  already exists in another data file, and never rename an existing top-level constant.
- Each file starts with `var module = { exports: {} };` and ends with a `module.exports`
  block. Keep both.
- Dates are `"YYYY-MM-DD"` strings (`deadline`, `gateDeadline`). Human-readable dates go in
  label fields (`deadlineLabel`, `gateLabel`). The build rejects any other date format.
- `id` values must stay unique and **must not be renamed**: the user's saved progress is keyed
  by mission `id`. To retire a mission, delete it; to replace one, add a new `id`.
- Every `THIS_WEEK` entry must point at an existing mission `id`.
- `xp` is a number.
- Plain UTF-8 text. Write `Göttingen`, `Montréal`, `—`, `✅` as real characters, never `?`.
- Only state what is verified. When unsure, say UNVERIFIED in the text rather than inventing.

## Data shapes (copy an existing entry when adding one)

**TARGETS** (`content.js`) — `id, name, short, country, flag, tier (1–3), priority ("P0"–"P2"),
subjectFit, funding, fundingDetail, deadline, deadlineLabel, gateDeadline?, gateLabel?,
status ("open" | "opening_soon" | "closed"), route, why, eligibleProgrammes[], gates[],
gatesMet[], gatesRisk[], advantages[]?, corrections[]?, source, nextAction`

**DOCUMENTS** (`content.js`) — `id, name, type, status, req[] (target ids or "All"), spec, owner,
blocker (bool), deadline?`. `status` is one of `have, partial, verify, unconfirmed, missing,
not_started`.

**DEAD_ENDS** (`content.js`) — `name, reason, status`

**GATES** (`content.js`) — `n, name, status, summary, detail, action, impact`

**PLAYBOOK** (`content.js`) — `id, title, icon, summary?, sections[{heading, body}]`

**AGENTS** (`content.js`) — `id, name, icon, role, detail, skills[]`. The report each agent
produces is written in `agentRun()` in `src/offline-api.js`.

**MISSIONS** (`missions.js`) — `id, title, detail, why, xp, targets[] (target ids), owner,
deadline, urgency ("critical" | "high" | "medium" | "low"), category, actionUrl?, checklist[]`

**THIS_WEEK** (`missions.js`) — `id (mission id), label, note`

**FUNDING_SCHEMES** (`research.js`) — `name, who, amount, covers, kind, deadline,
status ("OPEN" | "CLOSED" | …), url, verified (bool), note?`

**UNI_CENSUS** (`research.js`) — arrays, not objects:
`[name, province, category, gate ("PASS"|"FAIL"|"PARTIAL"|"UNVERIFIED"), programmes, note]`

**UNI_RANKED** (`research.js`) — `rank, name, prog, gate, why`

**Professors** (`professors.js`, `professors-campaign.js`) — `name, university, department,
country, title, tier ("A"|"B"|"C"|"UNSCORED"), score, email, email_status, profile_url,
profiles_verified, recruiting?, research, paper, paper_status, draft, why, contribution,
openers, caveat`. A professor in both lists is merged by name; the campaign entry wins.

**CITATIONS** (`citations.js`) — `professor, status, verified, citation, doi, findings[],
abstractNote, verdict`. `status` is one of `VERIFIED, VERIFIED_PARTIAL, YEAR_UNCERTAIN,
NOT_PUBLISHED, FOUND_BY_ME, WRONG_AUTHOR, PAPER_MISSING`.

## Fixed dates in app code

A few one-off dates are hard-coded near the top of `src/app.js` in `CRITICAL_DATES` and `ZOOM`
(the Göttingen info session), and the Göttingen status banner is in `renderDashboard()`.
Update them there when they change. Everything else is computed from the data and today's date.

## Testing a change

1. `python3 build.py` must print `OK` and `built`.
2. Open `index.html` in a browser. Click through every page in the sidebar; each must render.
3. Open the browser console: there must be no red errors.

## Design rules (when changing `styles.css` or `app.js`)

- Colours come from the CSS variables in `:root` and `:root[data-theme="dark"]`. Do not
  hard-code new colours; both themes must keep working.
- Teal (`--teal`) means action or progress. Amber means due within 30 days. Red means
  overdue, missing or ruled out. Green means done or verified.
- Numbers use the `.num` class (IBM Plex Mono, tabular figures).
- Navigation must not depend on `history` or `localStorage` succeeding: both are blocked in
  some previews. Wrap them in `try { } catch { }`.
- Keep it one self-contained page: no build tools beyond `build.py`, no frameworks, no
  external scripts. Google Fonts is the only external request, and the page must still work
  without it.
