# Theme CSS build

Use Node.js 20 or newer with npm. Install the recorded dependency graph with `npm ci`, then run `npm run build:css`.

`assets/tailwind.css` is the authored input. `assets/theme.css` is the generated, committed stylesheet loaded by `layout/theme.liquid`. Commit both the lockfile and regenerated CSS when changing dependencies, the Tailwind configuration, or utility classes. Direct GitHub-to-Shopify theme synchronization therefore receives the actual build output without needing a build server.

`npm run watch:css` rebuilds during local work. The content scan includes sections, snippets, theme blocks, layouts, JavaScript and JSON templates. Tailwind remains on 3.4.17; this repair does not migrate frameworks.

`assets/q-base.css.liquid` is a Shopify-processed asset and is correctly requested as `q-base.css`; it is not a missing file.
