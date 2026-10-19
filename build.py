#!/usr/bin/env python3
"""
Build ScholarVerse into one self-contained HTML file.

    python3 build.py           build index.html and ScholarVerse-STANDALONE.html
    python3 build.py --check   validate the sources only, write nothing

Sources live in src/. Never edit index.html by hand: it is overwritten on every build.
Needs Python 3.8+. If Node.js is installed, the build also syntax-checks every
script and confirms the data loads; without Node it skips those checks and says so.
"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

# Order matters: later files may read globals declared by earlier ones.
DATA_FILES = [
    "content.js",            # PROFILE, TARGETS, DEAD_ENDS, GATES, DOCUMENTS, AGENTS, PLAYBOOK
    "missions.js",           # LEVELS, ACHIEVEMENTS, MISSIONS, ROUTINE, THIS_WEEK
    "universities.js",       # UNIVERSITIES, SUBJECT_ORDER
    "professors.js",         # PROFESSORS, PROFESSOR_TIERS
    "professors-campaign.js",# CAMPAIGN_PROFESSORS
    "professors-deep.js",    # PROFESSORS_DEEP
    "excel-data.js",         # EXCEL_DATABASE
    "citations.js",          # CITATIONS
    "research.js",           # SUBJECT_*, FUNDING_*, UNI_CENSUS, UNI_RANKED, mergedProfessors()
    "zarin-data.js",         # ZARIN_DATA, ZARIN_PROFILE, ZARIN_TARGETS, ZARIN_DOCUMENTS, ZARIN_MISSIONS
    "zarin-professors-deep.js", # ZARIN_PROFESSORS_DEEP
    "couple-data.js",        # COUPLE_DATA, COUPLE_COUNTRIES, COUPLE_BUDGETS
    "prof-verified.js",      # PROF_VERIFIED (Phase 1 primary-source verification records)
]

# Every global the app reads. The check fails if any is missing or the wrong type.
REQUIRED = {
    "PROFILE": "object", "TARGETS": "array", "DEAD_ENDS": "array", "GATES": "array",
    "DOCUMENTS": "array", "AGENTS": "array", "PLAYBOOK": "array",
    "LEVELS": "array", "ACHIEVEMENTS": "array", "MISSIONS": "array", "ROUTINE": "array", "THIS_WEEK": "array",
    "UNIVERSITIES": "array", "PROFESSORS": "array", "PROFESSOR_TIERS": "array",
    "CAMPAIGN_PROFESSORS": "array", "PROFESSORS_DEEP": "object", "EXCEL_DATABASE": "object",
    "CITATIONS": "array", "SUBJECT_OPTIONS": "array", "SUBJECT_RANKED": "array",
    "FUNDING_SCHEMES": "array", "FUNDING_DEAD_ENDS": "array", "UNI_CENSUS": "array", "UNI_RANKED": "array",
    "ZARIN_DATA": "object", "ZARIN_PROFESSORS_DEEP": "object", "COUPLE_DATA": "object",
    "PROF_VERIFIED": "object"
}

CHECK_JS = r"""
const fs = require('fs'), vm = require('vm');
const ctx = { console }; vm.createContext(ctx);
const req = JSON.parse(process.argv[3]);
let code = fs.readFileSync(process.argv[2], 'utf8');
code += '\n;globalThis.__out = {' + Object.keys(req).map(k => `${k}: typeof ${k} === 'undefined' ? undefined : ${k}`).join(',') + '};';
try { vm.runInContext(code, ctx); } catch (e) { console.log('ERROR: the data failed to run: ' + e.message); process.exit(1); }
const out = ctx.__out, errs = [];
for (const [k, t] of Object.entries(req)) {
  const v = out[k];
  if (v === undefined) { errs.push(`${k} is missing`); continue; }
  if (t === 'array' && !Array.isArray(v)) errs.push(`${k} must be an array`);
  if (t === 'object' && (typeof v !== 'object' || Array.isArray(v))) errs.push(`${k} must be an object`);
}
const ids = (arr, f) => { const s = new Set(), d = []; arr.forEach(x => { if (s.has(x[f])) d.push(x[f]); s.add(x[f]); }); return d; };
const dm = ids(out.MISSIONS || [], 'id'); if (dm.length) errs.push('duplicate mission ids: ' + dm.join(', '));
const dt = ids(out.TARGETS || [], 'id'); if (dt.length) errs.push('duplicate target ids: ' + dt.join(', '));
const missionIds = new Set((out.MISSIONS || []).map(m => m.id));
(out.THIS_WEEK || []).forEach(w => { if (!missionIds.has(w.id)) errs.push(`THIS_WEEK points at unknown mission "${w.id}"`); });
const iso = /^\d{4}-\d{2}-\d{2}$/;
(out.MISSIONS || []).forEach(m => { if (m.deadline && !iso.test(m.deadline)) errs.push(`mission "${m.id}" deadline must be YYYY-MM-DD, got "${m.deadline}"`); if (typeof m.xp !== 'number') errs.push(`mission "${m.id}" xp must be a number`); });
(out.TARGETS || []).forEach(t => ['deadline', 'gateDeadline'].forEach(f => { if (t[f] && !iso.test(t[f])) errs.push(`target "${t.id}" ${f} must be YYYY-MM-DD, got "${t[f]}"`); }));
if (errs.length) { console.log('ERROR:\n  ' + errs.join('\n  ')); process.exit(1); }
console.log(`OK: ${out.TARGETS.length} targets, ${out.MISSIONS.length} missions, ${out.DOCUMENTS.length} documents, ${out.UNI_CENSUS.length} universities, ${out.PROFESSORS.length + out.CAMPAIGN_PROFESSORS.length} professor records`);
"""


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def bundle_data() -> str:
    parts = []
    for name in DATA_FILES:
        p = SRC / "data" / name
        if not p.exists():
            sys.exit(f"ERROR: src/data/{name} is missing")
        parts.append(f"/* ============ {name} ============ */\n{read(p).rstrip()}\n")
    return "\n".join(parts)


def node_checks(data: str) -> None:
    node = shutil.which("node")
    if not node:
        print("note: Node.js not found, skipped syntax and data checks")
        return
    files = [f"src/data/{n}" for n in DATA_FILES] + ["src/offline-api.js", "src/app.js"]
    for f in files:
        target = ROOT / f
        r = subprocess.run([node, "--check", str(target)], capture_output=True, text=True)
        if r.returncode:
            sys.exit(f"ERROR: syntax error in {f}:\n{r.stderr.strip()}")
    data_tmp = ROOT / "_data_check.tmp.js"
    run_tmp = ROOT / "_run_check.tmp.js"
    try:
        data_tmp.write_text(data, encoding="utf-8")
        run_tmp.write_text(CHECK_JS, encoding="utf-8")
        r = subprocess.run([node, str(run_tmp), str(data_tmp), json.dumps(REQUIRED)], capture_output=True, text=True)
        print(r.stdout.strip() or r.stderr.strip())
        if r.returncode:
            sys.exit(1)
    finally:
        if data_tmp.exists():
            data_tmp.unlink()
        if run_tmp.exists():
            run_tmp.unlink()


def main() -> None:
    check_only = "--check" in sys.argv
    data = bundle_data()
    node_checks(data)
    if check_only:
        return
    shell = read(SRC / "shell.html")
    for key in ("/*{{STYLES}}*/", "/*{{DATA}}*/", "/*{{OFFLINE_API}}*/", "/*{{APP}}*/"):
        if key not in shell:
            sys.exit(f"ERROR: src/shell.html lost its {key} placeholder")
    html = (shell
            .replace("/*{{STYLES}}*/", read(SRC / "styles.css"))
            .replace("/*{{DATA}}*/", data)
            .replace("/*{{OFFLINE_API}}*/", read(SRC / "offline-api.js"))
            .replace("/*{{APP}}*/", read(SRC / "app.js")))
    for out in ("index.html", "ScholarVerse-STANDALONE.html"):
        (ROOT / out).write_text(html, encoding="utf-8")
    print(f"built index.html and ScholarVerse-STANDALONE.html ({len(html.encode()) // 1024} KB)")


if __name__ == "__main__":
    main()
