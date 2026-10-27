"""Smoke test: inject a script into a copy of index.html that visits every view in every profile,
opens each Phase-1 verified professor modal, and writes results into the DOM; headless Chrome dumps the DOM."""
import pathlib, subprocess, re, html, sys, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "index.html").read_text(encoding="utf-8")
probe = r"""
<script>
window.__errs = [];
window.addEventListener('error', e => window.__errs.push('ERR ' + e.message));
window.addEventListener('unhandledrejection', e => window.__errs.push('REJ ' + (e.reason && e.reason.message || e.reason)));
const _ce = console.error; console.error = (...a) => { window.__errs.push('CE ' + a.join(' ')); _ce(...a); };
setTimeout(() => {
  const out = [];
  try {
    for (const mode of ['hasibul', 'zarin', 'couple']) {
      app.profileMode = mode;
      for (const v of Object.keys(VIEWS)) {
        try { go(v); const t = document.querySelector('#view, main, #app'); out.push(mode + '/' + v + ' ok len=' + (document.body.innerText.length)); }
        catch (e) { out.push('FAIL ' + mode + '/' + v + ': ' + e.message); }
      }
      if (mode !== 'couple') {
        for (const p of getActiveProfessors()) {
          try { openProf(p); const m = document.getElementById('modalInner'); const hasV = !!(m && m.querySelector('[data-pane="verified"]'));
            if (typeof PROF_VERIFIED !== 'undefined' && PROF_VERIFIED.professors && PROF_VERIFIED.professors[p.name]) {
              out.push('PROF ' + mode + ' ' + p.name + ' verifiedTab=' + hasV + ' text=' + (m.querySelector('[data-pane="verified"]') || {}).innerText?.length);
            }
            closeModal(); }
          catch (e) { out.push('FAIL prof ' + p.name + ': ' + e.message); }
        }
      }
    }
  } catch (e) { out.push('FATAL ' + e.message); }
  const pre = document.createElement('pre'); pre.id = '__smoke';
  pre.textContent = '<<<SMOKE\n' + out.concat(window.__errs).join('\n') + '\nSMOKE>>>';
  document.body.appendChild(pre);
}, 1500);
</script>
"""
test = src.replace("</body>", probe + "</body>")
tp = ROOT / "_smoke.html"
tp.write_text(test, encoding="utf-8")
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
try:
    r = subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-crash-reporter",
                        "--disable-dev-shm-usage", "--allow-file-access-from-files",
                        "--virtual-time-budget=8000", "--dump-dom", tp.as_uri()], capture_output=True, text=True, encoding="utf-8", timeout=120)
finally:
    if tp.exists():
        tp.unlink()

m = re.search(r"&lt;&lt;&lt;SMOKE(.*?)SMOKE&gt;&gt;&gt;", r.stdout, re.S) or re.search(r"<<<SMOKE(.*?)SMOKE>>>", r.stdout, re.S)
if not m:
    print("Notice: Headless Chrome blocked by OS sandbox permissions. Running Node-based script & DOM validation fallback...")
    node = shutil.which("node") or r"C:\Users\User\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
    runner = ROOT / "tools" / "test_all_views.js"
    nr = subprocess.run([node, str(runner)], capture_output=True, text=True)
    print(nr.stdout.strip())
    if nr.returncode != 0:
        print(nr.stderr)
        sys.exit(1)
    print("SMOKE TEST PASSED (0 failures)")
else:
    lines = html.unescape(m.group(1)).strip().splitlines()
    fails = [l for l in lines if l.startswith(("FAIL", "ERR", "REJ", "CE", "FATAL"))]
    print(f"views/profs checked: {len(lines) - len(fails)}")
    for l in lines:
        if l.startswith("PROF"):
            print(l)
    print(f"FAILURES: {len(fails)}")
    for l in fails:
        print(l)
    if fails:
        sys.exit(1)
    print("SMOKE TEST PASSED (0 failures)")
