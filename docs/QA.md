# QA and build status

Review date: 16 October 2026.

## Status

This is an updated source project, not a published deployment or a certified production build. The original repository, live site, domain configuration and production contact endpoint were not changed.

## Checks completed

- **44 dependency-free content and structure checks passed.** Run `npm run check:content` to repeat them. They check the requested page structure, six-company portfolio, ten venture partners, homepage animations, absence of em dashes, navigation, bundled assets and disabled-by-default form.
- **19 source modules parsed and transpiled without syntax diagnostics** using the locally available TypeScript 5.8.3 compiler. This was a syntax check, not the full project's dependency-aware type check.
- **35 local browser-harness assertions passed.** They cover responsive layout, single H1, no heading-label pattern, menu behavior, content counts, city video and Fish pause/play, Neofund selection, reduced-motion defaults, and mocked form success/error handling.
- Homepage widths checked: 360, 390, 600, 768, 900, 1024, 1200 and 1440 pixels. Additional header checks at 1280 and 1366 pixels found no horizontal overflow.
- The manager page was checked at 390 and 1440 pixels. Contact and Privacy were checked at 390 pixels; Terms at 1440 pixels.
- The mobile menu opens, closes with Escape, restores scrolling, makes the background inert and follows the manager link. This is not a complete screen-reader audit.
- The manager inquiry is correctly preselected from its query parameter. Mocked submissions produce the intended payload. A success clears the form; an error leaves the details in place. No real inquiry was sent.
- The four original bundled media assets are byte-for-byte unchanged: mark, city poster, city video and Fish frame sprite. The Neofund figure component is also unchanged.
- All 73 non-root lockfile dependency entries match the supplied project. Only project metadata and scripts were updated.

## How the browser preview was run

The environment could not install packages from the npm registry. It also did not permit browser navigation to the local HTTP preview server. A separate local harness therefore rendered the authored React components and CSS in Chromium using inline assets.

That harness used an already available React 18.2 runtime, a small test-only router adapter and a no-op adapter for the external Motes package. The supplied project's production dependency versions remain unchanged. The harness and its adapters are **not** included in the delivered website.

The city MP4, Fish canvas animation and Neofund SVG/motion code executed from the actual bundled source and assets. The external Motes vehicle artwork on the manager page was not rendered or verified by this harness. Google Fonts could not be fetched, so screenshots use the CSS fallback fonts. These limitations matter when reviewing the real deployment.

## Build limitation

An online `npm ci` could not complete because outbound downloads were unavailable. An explicit offline attempt returned `ENOTCACHED` for the locked Vite 8.3.2 package. There was no usable cached dependency set.

Consequently, **the full `npm run typecheck` and `npm run build` with the project's locked dependencies have not been verified**. No successful Vite production build is claimed. The GitHub Actions workflow is included to run the actual install, content check and build in a networked environment before deployment.

## Still to verify before launch

Use the checklist in `DEPLOYMENT.md`. In particular, verify the locked production stack, networked fonts and Motes art, actual React Router navigation and route refreshes, host redirect behavior, real contact delivery, Safari/iOS and keyboard/screen-reader accessibility. An exhaustive accessibility, security, legal or performance audit was not performed.

Reconfirm the public directory and business copy with Iron Key. The editable legal pages need review against the actual launch configuration and data practices.
