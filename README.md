# Iron Key website v2

A separate working copy of the supplied Iron Key React and TypeScript project. This version brings the venture studio, investing, portfolio and emerging-manager program together. It does not change the original repository or live deployment.

## What changed

The homepage keeps the original city footage, Neofund explanation and interactive stack, and the green Fish section with its ASCII animation. It introduces the venture studio, investing and the emerging-manager program, then the Neofund thesis, Fish and six portfolio companies. Joseph Argiro and the ten venture partners are on a dedicated team page. The manager program has its own page.

Navigation: **Venture Studio / Portfolio / Emerging Managers / Venture Partners**, plus **Start a conversation**. There is no Fish navigation item or standalone Fish page. Its old URL redirects to the homepage section.

The writing uses one clear heading per section, no decorative heading labels and no em dashes. The original green, cream and charcoal palette, typography and animation artwork remain.

## Use this as a separate GitHub project

1. Extract the ZIP.
2. Create a new repository, for example `iron-key-site-v2`.
3. Add the **contents** of the extracted project folder. `package.json`, `src` and `public` should be at the repository root. Include the hidden `.github`, `.gitignore`, `.nvmrc` and `.env.example` files. Do not upload the ZIP itself as the website.
4. The included GitHub Actions workflow will install the locked packages, run the content checks, and attempt a production build. It does not deploy the site.
5. Use a separate preview deployment. Do not reconnect the production domain until review is complete.

## Run locally

Use Node.js 22 and an internet connection to download the dependencies. The supplied lockfile is retained; no dependency upgrades were made as part of the redesign.

```sh
npm ci
npm run check:content
npm run dev
```

Open the local address printed by Vite. To check and build:

```sh
npm run typecheck
npm run build
npm run preview
```

`npm run build` runs TypeScript and Vite. It creates `dist`, which is not included in this source ZIP.

## Contact form: preview mode by default

**No production endpoint is included. The form is visibly disabled until one is configured.** This prevents a preview from sending test messages to the live inbox.

Copy `.env.example` to `.env.local` for local use, or add the variable in your deployment provider:

```dotenv
VITE_APPLICATION_ENDPOINT=https://your-approved-endpoint.example/contact
```

Use an endpoint owned and approved by Iron Key. Vite exposes this value to the browser, so it must not contain a secret, private API token or password. Rebuild after changing it. Keep the endpoint blank on previews unless you have an approved test inbox.

The endpoint must accept a JSON POST, validate it server-side, apply rate limits and spam protection, and allow the site's origin when using CORS. A successful HTTP response produces a success message; a failed request leaves the entered details in place.

The new form accepts founders, investors, emerging managers, potential venture partners and other inquiries. Review your backend before enabling it. See [the contact payload and release instructions](docs/DEPLOYMENT.md).

## Main files

| File | Purpose |
| --- | --- |
| `src/pages/Home.tsx` | Homepage copy and section order |
| `src/pages/EmergingManagers.tsx` | Dedicated manager program |
| `src/data/firm.ts` | Portfolio and venture-partner directory |
| `src/components/NeofundStory.tsx` | Neofund explanation and layer selection |
| `src/components/NeofundLedgerFigure.tsx` | Preserved animated stack |
| `src/components/FishSection.tsx` | The single dedicated Fish homepage feature |
| `src/components/Layout.tsx` | Navigation, mobile menu and footer |
| `src/pages/Apply.tsx` | Inquiry form and preview mode |
| `src/master.css` | v2 layouts and responsive refinements |
| `src/styles.css` | Original visual and animation styles |

## Review notes

This source was checked with a local Chromium preview harness, content checks and a TypeScript syntax-transpilation pass. The homepage was checked at widths from 360 to 1440 pixels. The preview harness is not the production dependency stack.

**The full locked-dependency installation and production build could not be completed in the editing environment because outbound package downloads were unavailable.** Run the included build workflow before deployment. The precise test coverage and limitations are in [QA.md](docs/QA.md).

Review the partner roles, program terms, company descriptions, privacy notice and terms before release. The short legal pages are working copy, not a legal review. Research, source links and writing guidance are included in `docs`.

This project targets a website served at the domain root with single-page-app routing. Netlify configuration is included. GitHub stores the source; merely uploading the repository does not publish a working site.
