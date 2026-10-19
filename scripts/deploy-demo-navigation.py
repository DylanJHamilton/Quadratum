"""Install only the shared demo navigation overlay; never publish a theme.

Sources live under demos/, outside all merchant-package input directories.
--prepare downloads current layouts and builds reversible overlays.
--deploy rechecks each remote layout before pushing four explicitly named files.
"""
import argparse, concurrent.futures, hashlib, html, json, os, re, shutil, subprocess
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'demos/navigation'
REPORT = ROOT / 'docs/ultima/demo-navigation-deployment.json'
CLI = Path(os.environ['APPDATA']) / 'npm/node_modules/@shopify/cli/bin/run.js'
FILES = ['layout/theme.liquid', 'snippets/quadratum-demo-bar.liquid', 'assets/quadratum-demo-bar.css', 'assets/quadratum-demo-bar.js']
MARKER = "\n{% comment %}Quadratum demo navigation: showroom overlay only.{% endcomment %}\n{% render 'quadratum-demo-bar' %}\n"
config = json.loads((SOURCE / 'config.json').read_text())

def cli(args):
    if args[0] in ['pull', 'push']:
        # Partial overlays use isolated cache folders, never the working theme.
        destination = Path(args[args.index('--path') + 1]).resolve()
        assert destination.is_relative_to((ROOT / '.cache/demo-navigation').resolve())
        args = [*args, '--force']
    result = subprocess.run(['node', str(CLI), 'theme', *args, '--store', config['store'], '--no-input'], cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if result.returncode:
        raise RuntimeError((result.stdout + result.stderr)[-2500:])
    return result.stdout

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def write_report(data):
    REPORT.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

def prepare():
    purchase = config.get('purchase_url')
    if purchase and (urlparse(purchase).scheme != 'https' or not urlparse(purchase).netloc):
        raise ValueError('Purchase URL must be a verified HTTPS listing URL.')
    themes = {str(t['id']): t for t in json.loads(cli(['list', '--json']))}
    gallery = json.loads((ROOT / 'templates/page.brands.json').read_text())['sections']['directory']['blocks']
    targets = []
    for block in gallery.values():
        settings = block['settings']
        if not settings.get('url'): continue
        parsed = urlparse(settings['url'])
        assert parsed.hostname == config['store'], parsed.hostname
        theme_id = parse_qs(parsed.query)['preview_theme_id'][0]
        assert theme_id in themes, theme_id
        targets.append({'id': theme_id, 'brand': settings['title'], 'role': themes[theme_id]['role']})
    base = ROOT / '.cache/demo-navigation' / datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    base.mkdir(parents=True)

    def stage(row):
        original = base / row['id'] / 'original'
        original.mkdir(parents=True)
        cli(['pull', '--theme', row['id'], '--path', str(original), '--only', 'layout/theme.liquid', '--nodelete'])
        layout = original / 'layout/theme.liquid'
        text = layout.read_text(encoding='utf-8-sig')
        body = re.search(r'<body\b[^>]*>', text, re.I)
        assert body, row['id']
        if "render 'quadratum-demo-bar'" not in text:
            text = text[:body.end()] + MARKER + text[body.end():]
        patched = base / row['id'] / 'patched'
        for folder in ['layout', 'snippets', 'assets']: (patched / folder).mkdir(parents=True)
        (patched / 'layout/theme.liquid').write_text(text, encoding='utf-8', newline='\n')
        label = html.escape('Buy Quadratum — ' + config['price_label'])
        if purchase:
            action = f'<a class="quadratum-demo-bar__buy" href="{html.escape(purchase, quote=True)}" target="_blank" rel="noopener" aria-label="{label} (opens in a new tab)">{label}</a>'
        else:
            action = f'<button class="quadratum-demo-bar__buy" type="button" disabled aria-describedby="QuadratumPurchaseStatus">{label}</button><small id="QuadratumPurchaseStatus">Available after launch</small>'
        snippet = (SOURCE / 'quadratum-demo-bar.liquid').read_text(encoding='utf-8').replace('__THEME_ID__', row['id']).replace('__DEMO_NAME__', html.escape(row['brand'])).replace('__PURCHASE_ACTION__', action)
        (patched / 'snippets/quadratum-demo-bar.liquid').write_text(snippet, encoding='utf-8', newline='\n')
        for suffix in ['css', 'js']: shutil.copy2(SOURCE / ('quadratum-demo-bar.' + suffix), patched / 'assets')
        result = dict(row, original=str(original), staged=str(patched), original_layout_sha256=digest(layout), files={name:digest(patched/name) for name in FILES}, deployed=False)
        print('Prepared ' + row['brand'], flush=True)
        return result

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        rows = list(pool.map(stage, targets))
    write_report({'created_utc': datetime.now(timezone.utc).isoformat(), 'store':config['store'], 'showroom_theme_id':config['showroom_theme_id'], 'purchase_url':purchase, 'purchase_enabled':bool(purchase), 'themes':rows})

def deploy(theme_id, include_live=False):
    data = json.loads(REPORT.read_text(encoding='utf-8'))
    selected = [r for r in data['themes'] if (not theme_id or r['id'] == theme_id) and not r['deployed'] and (include_live or r['role'] != 'live')]
    assert selected, 'No undeployed themes selected.'
    for row in selected:
        stage = Path(row['staged'])
        assert all(digest(stage/name) == sha for name, sha in row['files'].items()), 'Stage changed; prepare again.'
        before = stage.parent / ('preflight-' + datetime.now(timezone.utc).strftime('%H%M%S%f'))
        before.mkdir()
        cli(['pull', '--theme', row['id'], '--path', str(before), '--only', 'layout/theme.liquid', '--nodelete'])
        assert digest(before/'layout/theme.liquid') == row['original_layout_sha256'], 'Remote layout changed; prepare again.'
        args = ['push', '--theme', row['id'], '--path', str(stage), '--nodelete', '--json']
        for name in FILES: args += ['--only', name]
        if row['role'] == 'live': args += ['--allow-live']
        result = json.loads(cli(args))
        assert not result.get('theme', {}).get('errors'), result
        row['deployed'] = True
        row['upload'] = result
        write_report(data)
        verify = stage.parent / ('verify-' + datetime.now(timezone.utc).strftime('%H%M%S%f'))
        verify.mkdir()
        args = ['pull', '--theme', row['id'], '--path', str(verify), '--nodelete']
        for name in FILES: args += ['--only', name]
        cli(args)
        for name in FILES:
            assert (verify/name).read_text(encoding='utf-8-sig') == (stage/name).read_text(encoding='utf-8-sig'), name
        row['remote_files_verified'] = True
        row['verified_utc'] = datetime.now(timezone.utc).isoformat()
        write_report(data)
        print('Installed and read back: ' + row['brand'], flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    action = parser.add_mutually_exclusive_group(required=True)
    action.add_argument('--prepare', action='store_true')
    action.add_argument('--deploy', action='store_true')
    parser.add_argument('--theme')
    parser.add_argument('--include-live', action='store_true', help='Requires explicit owner approval for the published ARC//FORM storefront.')
    args = parser.parse_args()
    prepare() if args.prepare else deploy(args.theme, args.include_live)
