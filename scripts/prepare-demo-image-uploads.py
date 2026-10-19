"""Find existing brand assets; prepare upload copies without editing source files."""
import csv
import hashlib
import json
import os
import shutil
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
references = json.loads((ROOT / 'docs/ultima/demo-image-references-20261019.json').read_text())
needed = {name for names in references.values() for name in names if name != 'furniture_banner.webp'}
found = {name: [] for name in needed}
for folder, dirs, files in os.walk(ROOT.parent):
    dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', 'sources', '.cache', '.codex', '.agents', 'theme-backups-2026-10-15'}]
    for name in needed.intersection(files):
        found[name].append(Path(folder) / name)
report = []
for preset, names in references.items():
    rows = list(csv.DictReader((ROOT / '.cache/demo-catalogs' / (preset.lower() + '-original.csv')).open(encoding='utf-8-sig', newline='')))
    imported = {unquote(Path(urlparse(row['Image Src']).path).name) for row in rows if row['Image Src']}
    target = ROOT / '.cache/demo-image-uploads' / preset.lower()
    target.mkdir(parents=True, exist_ok=True)
    records = []
    for name in names:
        if name == 'furniture_banner.webp':
            records.append({'name': name, 'action': 'skip unrelated inherited placeholder'})
            continue
        if name in imported:
            records.append({'name': name, 'action': 'already included in matching product CSV; verify Files name'})
            continue
        candidates = found.get(name, [])
        if not candidates:
            records.append({'name': name, 'action': 'missing local source'})
            continue
        candidates.sort(key=lambda p: (preset.lower() not in str(p).lower(), 'delivery' not in str(p).lower(), len(str(p))))
        source = candidates[0]
        destination = target / name
        shutil.copy2(source, destination)
        records.append({'name': name, 'action': 'prepared for Files upload', 'source': str(source), 'upload': str(destination), 'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(), 'candidate_count': len(candidates)})
    report.append({'preset': preset, 'files': records})
    print(preset, {action: sum(r['action'] == action for r in records) for action in sorted({r['action'] for r in records})})
(ROOT / 'docs/ultima/demo-image-upload-manifest-20261019.json').write_text(json.dumps(report, indent=2) + '\n')
