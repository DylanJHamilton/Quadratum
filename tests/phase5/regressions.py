"""Run retained Phase 3/4 executable source/DOM regressions from the repository root."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,time
paths=sorted(Path('tests/phase3').glob('*.cjs'))+sorted(Path('tests/phase4').glob('*.cjs'))
out=Path('docs/phase5/validation/final/regressions');out.mkdir(parents=True,exist_ok=True)
def run(p):
 start=time.monotonic()
 try:
  result=subprocess.run(['node',str(p)],capture_output=True,text=True,timeout=240)
  code=result.returncode;text=result.stdout+result.stderr
 except subprocess.TimeoutExpired as error:
  code=124;text='Timed out after 240 seconds\n'+str(error)
 log=out/(p.parent.name+'-'+p.stem+'.txt');log.write_text(text)
 record=dict(test=str(p),exit_code=code,seconds=round(time.monotonic()-start,2),log=str(log))
 print(('PASS' if code==0 else 'FAIL')+' '+str(p),flush=True)
 return record
with ThreadPoolExecutor(max_workers=2) as pool: results=list(pool.map(run,paths))
(out/'results.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(dict(suites=len(results),passed=sum(r['exit_code']==0 for r in results),failed=[r for r in results if r['exit_code']!=0])))
raise SystemExit(any(r['exit_code']!=0 for r in results))
