// tools/build-icons.mjs
// ESM : requires "type":"module" in package.json
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  importDirectory,
  cleanupSVG,
  parseColors,
  isEmptyColor,
  runSVGO,
} from '@iconify/tools';
import { parseSVGContent } from '@iconify/utils';

/**
 * Configure source folders here.
 * You can add/remove packs freely.
 * - Put raw SVGs under ./icons/<pack> (you can copy from node_modules)
 * - 'prefix' becomes the symbol/file name prefix (e.g., 'lucide-wallet')
 */
const SOURCES = [
  { dir: './icons/lucide', prefix: 'lucide' }, // copy from node_modules/lucide-static/icons/*
  { dir: './icons/tabler', prefix: 'tabler' }, // copy from node_modules/@tabler/icons/icons/*
  { dir: './icons/custom', prefix: '' },       // your brand/custom svgs
];

// WRITE DIRECTLY INTO THE THEME:
const THEME_ASSETS_DIR = './assets';                   // Shopify theme assets dir
const SPRITE_FILE = path.join(THEME_ASSETS_DIR, 'icons.svg');
const ICONS_DIR = path.join(THEME_ASSETS_DIR, 'icons'); // where individual svgs go

async function ensureDirs() {
  await fs.mkdir(THEME_ASSETS_DIR, { recursive: true });
  await fs.mkdir(ICONS_DIR, { recursive: true });
}

async function build() {
  await ensureDirs();

  const symbols = [];
  let count = 0;

  for (const { dir, prefix } of SOURCES) {
    // Skip missing packs silently
    try { await fs.access(dir); } catch { continue; }

    const set = await importDirectory(dir, { prefix: prefix || '' });

    // Normalize & optimize every icon
    set.forEach((name, type) => {
      if (type !== 'icon') return;
      const svg = set.toSVG(name);
      if (!svg) { set.remove(name); return; }

      cleanupSVG(svg);
      parseColors(svg, { defaultColor: 'currentColor' }, (attr, colorStr, color) =>
        !color || isEmptyColor(color) ? colorStr : 'currentColor'
      );
      runSVGO(svg);
    });

    // Write each icon as an individual file + add to sprite
    await set.forEach(async (name) => {
      const id = prefix ? `${prefix}-${name}` : name;
      const svgString = set.toString(name);
      if (!svgString) return;

      // Write individual file to /assets/icons/<id>.svg
      const filePath = path.join(ICONS_DIR, `${id}.svg`);
      await fs.writeFile(filePath, svgString, 'utf8');

      // Build <symbol> for sprite
      const parsed = parseSVGContent(svgString);
      const viewBox = parsed?.attributes?.viewBox || '0 0 24 24';
      const body = parsed?.body || '';
      symbols.push(`<symbol id="${id}" viewBox="${viewBox}">${body}</symbol>`);
      count++;
    });
  }

  // Write sprite to /assets/icons.svg
  const sprite =
    `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">\n` +
    symbols.join('\n') +
    `\n</svg>\n`;

  await fs.writeFile(SPRITE_FILE, sprite, 'utf8');

  console.log(`✅ Wrote ${SPRITE_FILE} and ${ICONS_DIR} with ${count} icons`);
  console.log(`   » Use sprite: <use href="{{ 'icons.svg' | asset_url }}#pack-name">`);
  console.log(`   » Use file  : {{ 'icons/pack-name.svg' | asset_url }}`);
}

build().catch((e) => { console.error('Icon build failed:', e); process.exit(1); });
