import subprocess,time,json
from pathlib import Path
root=Path.cwd()
files=[p.as_posix() for folder in ['assets','blocks','config','layout','locales','sections','snippets','templates'] for p in Path(folder).glob('*') if p.is_file() and p.name!='.gitkeep' and p.as_posix()!='assets/icons.svg']
# Upload dependencies before JSON templates; never delete remote files during a batch.
files.sort(key=lambda p: (p.startswith('templates/'), p.startswith('config/'),p))
cli=Path(r'C:/Users/dhamc/AppData/Roaming/npm/node_modules/@shopify/cli/bin/run.js')
print('CLI exists:',cli.exists(),'files:',len(files),flush=True)
results=[]
for start in range(0,len(files),40):
    batch=files[start:start+40]
    args=['node',str(cli),'theme','push','--theme','146655674452','--store','quadratum-theme.myshopify.com','--nodelete','--json','--no-input']
    for name in batch: args+=['--only',name]
    for attempt in range(3):
        r=subprocess.run(args,capture_output=True,text=True,encoding='utf-8',errors='replace')
        if r.returncode==0: break
        if 'Throttled' not in r.stdout+r.stderr:
            print((r.stdout+r.stderr)[-5000:],flush=True);raise SystemExit(r.returncode)
        time.sleep(8*(attempt+1))
    results.append({'start':start,'files':batch,'exit_code':r.returncode,'output':r.stdout})
    Path('docs/ultima/qa-upload-batches.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
    print(f'{min(start+40,len(files))}/{len(files)} files; exit {r.returncode}',flush=True)
    if r.returncode: print((r.stdout+r.stderr)[-3000:],flush=True);raise SystemExit(r.returncode)
    time.sleep(2)
