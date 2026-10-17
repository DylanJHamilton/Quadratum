import json,subprocess,sys,tempfile
from pathlib import Path
script=Path(__file__).resolve().parents[2]/'scripts/validate-settings.py'
with tempfile.TemporaryDirectory(dir=script.parent.parent/'tests/ultima') as tmp:
 root=Path(tmp)
 for name in ['sections','blocks','templates','config','listings']: (root/name).mkdir()
 (root/'sections/example.liquid').write_text('{% schema %}'+json.dumps({'settings':[{'id':'gap','type':'range','min':0,'max':1,'step':0.1}]})+'{% endschema %}')
 (root/'config/settings_schema.json').write_text('[]');(root/'config/settings_data.json').write_text('{"current":{}}')
 for value,expected in [(0.3,0),(0.35,1),(2,1),('bad',1)]:
  (root/'templates/index.json').write_text(json.dumps({'sections':{'main':{'type':'example','settings':{'gap':value}}}}))
  result=subprocess.run([sys.executable,str(script),'--root',str(root)],capture_output=True)
  assert result.returncode==expected,(value,result.stdout,result.stderr)
print('PASS range validator accepts decimal step and rejects wrong step, bounds and type')
