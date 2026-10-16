# Preview and deployment

## Keep v2 separate

Create a new repository and a new preview project. Do not change the current site's domain or deployment connection during review. This source ZIP does not push, publish or change an external account.

Use Node.js 22, run `npm ci`, `npm run check:content`, then `npm run build`. The output folder is `dist`. The included GitHub Actions workflow performs these checks without deploying.

The GitHub workflow follows the official Node.js build guidance:
https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs

## Hosting

The app uses browser-history routes. A static host must rewrite unknown application paths to `/index.html` while serving real assets normally. `public/_redirects` provides the Netlify-compatible fallback and redirects for the old routes. `netlify.toml` sets the build command, output folder and Node version.

Other hosts need an equivalent rewrite. The project is configured for the domain root. Do not assume a GitHub Pages repository subpath works without changing the asset base and routing strategy.

The Netlify deploy-preview context uses `robots-preview.txt` as `robots.txt` to discourage indexing. For a separate preview project treated as a production context, add equivalent preview-only settings yourself. Robots directives are not access control. Use deployment-provider access protection for a private preview.

The canonical URLs and sitemap refer to `https://www.ironkeycapital.com`. Keep previews out of search, and review the canonical domain before a production launch. Route metadata is updated on the client. Server-side rendering and per-route social-image rendering have not been added.

The original Google Fonts requests remain external. Test font loading and layout on a networked preview as well as with fallback fonts.

## Contact endpoint

The environment variable is `VITE_APPLICATION_ENDPOINT`. Leave it blank until there is an approved destination. Do not point the preview at the live inbox by accident.

The browser sends a JSON POST with these fields:

- `form`: `incubator-interest` for manager inquiries; `iron-key-conversation` for all other inquiries.
- `fullName`, `email`, `role`, `linkedin`, `interest`, `acknowledgement`.
- For managers: `thesis`, `vehicle` and `timeline`.
- For other inquiries: `message`.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` when available.

`interest` values are `founder`, `investor`, `emerging-manager`, `venture-partner` and `other`. Optional form values may be empty strings. The consent checkbox uses the native submitted value `on`. The honeypot field is never sent.

The server must validate the data and consent, enforce appropriate limits, apply abuse prevention and return a non-success status if a message is rejected. A 2xx response should mean the message was accepted. Requests time out after 20 seconds. Cross-origin endpoints must allow the deployed website's origin.

All `VITE_` configuration is public in the browser bundle. Use a server-side integration for any private service credentials. This source does not include a backend, inbox integration, CRM automation, rate-limit service or production secrets.

## Before launch

- Get a successful install, TypeScript check and production Vite build with the locked dependencies.
- Review the networked browser preview, including Google Fonts, the vehicle Motes artwork, direct route refreshes and redirects.
- Reconfirm portfolio membership, partner roles, Joseph's bio, program positioning and the Fish product wording.
- Review privacy and legal copy against actual business and data practices.
- Connect an approved test endpoint and confirm messages actually arrive. Then configure the approved production endpoint.
- Test keyboard navigation, small screens, reduced motion, Safari/iOS, link destinations and error states.
- Only then plan the production domain switch and retain the old deployment for rollback.
