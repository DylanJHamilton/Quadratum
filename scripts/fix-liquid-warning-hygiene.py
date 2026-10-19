"""Resolve reported local variable warnings without touching settings or strings."""
import json
import re
from pathlib import Path, PureWindowsPath

ROOT = Path(__file__).resolve().parents[1]
findings = json.loads((ROOT / 'docs/ultima/checklist-theme-check-quadratum.json').read_text())
changes = []
for finding in findings:
    rel = Path(*PureWindowsPath(finding['path']).parts[-2:])
    path = ROOT / rel
    text = path.read_text(encoding='utf-8')
    original = text
    names = set()
    for offense in finding['offenses']:
        if offense['check'] not in {'VariableName', 'UnusedAssign'}:
            continue
        name = re.search(r"variable '([^']+)'", offense['message'])[1]
        if offense['check'] == 'VariableName':
            names.add(name)
        else:
            # Only a standalone assign is removed; captures/control flow stay intact.
            pattern = r'^[ \t]*{%[-]?\s*assign\s+' + re.escape(name) + r'\s*=.*?[-]?%}[ \t]*\n'
            updated, count = re.subn(pattern, '', text, flags=re.M)
            if count == 0:
                updated, count = re.subn(r'^[ \t]*assign\s+' + re.escape(name) + r'\s*=[^\n]*\n', '', text, flags=re.M)
            assert count == 1, (rel, name, count)
            text = updated
            changes.append({'path': rel.as_posix(), 'action': 'remove unused assignment', 'name': name})
    mapping = {}
    for name in names:
        snake = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', '_', name).lower().lstrip('_')
        if name.startswith('__'):
            snake = 'q_' + snake
        assert not re.search(r'\b' + re.escape(snake) + r'\b', original), (rel, name, snake)
        mapping[name] = snake
        changes.append({'path': rel.as_posix(), 'action': 'rename local variable', 'from': name, 'to': snake})
    if mapping:
        token = re.compile(r'''"[^"\n]*"|'[^'\n]*'|\b[A-Za-z_][A-Za-z0-9_]*\b''')
        def liquid(match):
            return token.sub(lambda item: mapping.get(item[0], item[0]), match[0])
        text = re.sub(r'{%.*?%}|{{.*?}}', liquid, text, flags=re.S)
    if text != original:
        path.write_text(text, encoding='utf-8')
(ROOT / 'docs/ultima/warning-hygiene-changes.json').write_text(json.dumps(changes, indent=2) + '\n')
print(f'{len(changes)} local hygiene changes recorded')
