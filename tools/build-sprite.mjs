// tools/build-sprite.mjs
import { promises as fs } from 'node:fs';
import { importDirectory, cleanupSVG, parseColors, isEmptyColor, runSVGO } from '@iconify/tools';
import { parseSVGContent } from '@iconify/utils';

const sets = [
  { dir: './icons/custom', prefix: '' }, // put your SVGs here (no prefix)
  // { dir: './icons/lucide', prefix: 'lucide' },
  // { dir: './icons/tabler', prefix: 'tabler' },
];

const outFile = './dist/icons.svg';

async function build() {
  const symbols = [];

  for (const { dir, prefix } of sets) {
    const iconSet = await importDirectory(dir, { prefix: prefix || '' });

    iconSet.forEach((name, type) => {
      if (type !== 'icon') return;
      const svg = iconSet.toSVG(name);
      if (!svg) { iconSet.remove(name); return; }

      // Normalize & theme-ify
      cleanupSVG(svg);
      parseColors(svg, { defaultColor: 'currentColor' }, (attr, colorStr, color) =>
        !color || isEmptyColor(color) ? colorStr : 'currentColor'
      );
      runSVGO(svg);
    });

    await iconSet.forEach(async (name) => {
      const id = prefix ? `${prefix}-${name}` : name;
      const svgString = iconSet.toString(name);
      if (!svgString) return;

      const parsed = parseSVGContent(svgString);
      const viewBox = parsed?.attributes?.viewBox || '0 0 24 24';
      const body = parsed?.body || '';

      symbols.push(`<symbol id="${id}" viewBox="${viewBox}">${body}</symbol>`);
    });
  }

  const sprite =
    `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
${symbols.join('\n')}
</svg>`;

  await fs.mkdir('./dist', { recursive: true });
  await fs.writeFile(outFile, sprite, 'utf8');
  console.log(`✅ Wrote ${outFile} with ${symbols.length} symbols`);
}

build().catch((e) => { console.error('Sprite build failed:', e); process.exit(1); });
