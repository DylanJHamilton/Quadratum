"""Reproducible Batch 9 consumer evidence; reachability is not runtime certification."""
from pathlib import Path
import collections
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
GROUPS = {
    'a': ['snippets/header-two-' + name + '.liquid' for name in ['account', 'actions', 'cart', 'logo']],
    'b': ['snippets/header-two-' + name + '.liquid' for name in ['mega-menu', 'mobile-menu', 'search']] + ['snippets/q-nav.liquid'],
    'c': ['snippets/' + name + '.liquid' for name in ['boxed-content-media', 'contrast-text', 'icon-sprite', 'q-disclosure', 'q-spacing', 'theme-tokens', 'utilities']],
    'd': ['assets/' + name for name in ['icons.svg', 'q-base.css.liquid', 'qtm-section-surfaces.css', 'quadratum-tokens.css', 'worm.svg']],
    'e': ['assets/' + name for name in ['section-slideshow.css', 'section-slideshow.js', 'styles.css', 'tailwind.css', 'theme.css']],
}

def audit(paths):
    files = {}
    for directory in ['layout', 'templates', 'sections', 'blocks', 'snippets', 'assets', 'config']:
        for file in (ROOT / directory).rglob('*'):
            if file.suffix not in ['.liquid', '.json', '.css', '.js', '.svg'] or 'icons' in file.relative_to(ROOT).parts:
                continue
            name = file.relative_to(ROOT).as_posix()
            source = file.read_text()
            files[name] = re.sub(r'{%-?\s*comment\s*-?%}.*?{%-?\s*endcomment\s*-?%}', '', source, flags=re.S)
    consumers = collections.defaultdict(set)
    dynamic = []
    for name, source in files.items():
        for target in re.findall(r"(?:render|include)\s+['\"]([^'\"]+)['\"]", source):
            consumers['snippets/' + target + '.liquid'].add(name)
        for target in re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url", source):
            target = 'assets/' + target
            if target not in files and target + '.liquid' in files:
                target += '.liquid'
            consumers[target].add(name)
        for match in re.finditer(r'(?:{%-?\s*|^\s*)(render|include)\s+([^\r\n%]+)', source, re.M):
            if not match[2].strip().startswith(('"', "'")):
                dynamic.append({'file': name, 'statement': match[0].strip()})
    roots = {name for name in files if name.split('/')[0] in ['layout', 'templates', 'sections', 'blocks']}
    build_files = ['package.json', 'tailwind.config.js', 'postcss.config.js', '.shopifyignore']
    build = {name: (ROOT / name).read_text() for name in build_files if (ROOT / name).exists()}
    result = []
    for path in paths:
        seen = set()
        pending = list(consumers[path])
        while pending:
            name = pending.pop()
            if name in seen:
                continue
            seen.add(name)
            pending.extend(consumers[name] - seen)
        file = Path(path)
        needle = file.name.removesuffix('.liquid') if file.suffix == '.liquid' else file.name
        mentions = []
        for name, source in {**files, **build}.items():
            if name == path:
                continue
            lines = [index for index, line in enumerate(source.splitlines(), 1) if needle in line]
            if lines:
                mentions.append({'file': name, 'lines_in_comment_stripped_source': lines})
        result.append({'path': path, 'sha256': hashlib.sha256((ROOT / path).read_bytes()).hexdigest(),
                       'direct_consumers': sorted(consumers[path]), 'transitive_runtime_roots': sorted(seen & roots),
                       'other_reference_candidates': mentions,
                       'tailwind_content_input': file.suffix == '.liquid' and file.parts[0] in ['layout', 'templates', 'sections', 'snippets', 'blocks']})
    return {'components': result, 'nonliteral_render_statements': dynamic,
            'method': 'Liquid comments excluded; all retained sections/blocks conservatively treated as potential runtime roots; asset .liquid aliases resolved; runtime/config/build mentions retained for manual review.',
            'limits': 'Tailwind scanning is a build consumer, not storefront execution. App-block render statements require manual type/loop review. Merchant custom Liquid outside this repository cannot be ruled out.'}

if __name__ == '__main__':
    paths = GROUPS[sys.argv[1]] if len(sys.argv) > 1 else sum(GROUPS.values(), [])
    print(json.dumps(audit(paths), indent=2))
