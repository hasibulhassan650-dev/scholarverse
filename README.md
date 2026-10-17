# ScholarVerse

Command centre for a fully funded master's: deadlines, missions, targets, supervisors and
funding in one offline page.

Live site: **https://hasibulhassan650-dev.github.io/scholarverse/**

Built for Hasibul Hasan Santo, CFA (BSS Economics; Treasury ALM & Money Market, City Bank PLC).

## Pages

Dashboard (deadline runway) · Calendar · Timeline · Missions with XP · Documents · Workbook ·
Targets & eligibility gates · Universities (ranked + 82-institution census) · Subject fit ·
Funding · Professors with full dossiers · Citations audit · Agents · Playbook · Profile

## Editing

The site is generated from `src/`. Edit the sources, then rebuild:

```bash
python3 build.py
```

This validates the data and writes `index.html` (what GitHub Pages serves) and
`ScholarVerse-STANDALONE.html` (an identical copy you can open from disk). Coding agents
should read [AGENTS.md](AGENTS.md) first.

```
src/
  data/            all content: targets, missions, professors, universities, funding…
  styles.css       design system, light and dark themes
  app.js           pages and interactions
  offline-api.js   progress saving, XP, agent reports
  shell.html       page skeleton
build.py           validates src/ and builds the HTML
```

Progress (ticked missions, XP, agent reports) is saved in the browser. Use **Profile → Export
progress** to move it to another device.
