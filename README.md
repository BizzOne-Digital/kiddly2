# Kiddly — Frontend prototype

Canadian childcare discovery UI built with **Vite**, **React**, **TypeScript**, and **React Router**. This is a frontend-only demo: no backend, authentication, payments, or live provider data.

## Install & run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build (production)

```bash
npm install
npm run build
```

Output is written to **`dist/`**. Test the production bundle locally:

```bash
npm run preview
```

Then open the URL shown (typically `http://localhost:4173`).

### Deploy

This is a single-page app (React Router). The host must serve `index.html` for all routes.

| Platform | Notes |
|----------|--------|
| **Vercel** | Uses `vercel.json` rewrites in this repo. Deploy the project root; build command `npm run build`, output directory `dist`. |
| **Netlify / Cloudflare Pages** | Build command `npm run build`, publish directory `dist`. `public/_redirects` is copied into `dist` for SPA fallback. |
| **Static server** | Upload the contents of `dist/`. Configure fallback to `index.html` for unknown paths. |

No environment variables are required for the current prototype.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/for-parents` | For Parents |
| `/for-educators` | For Educators |
| `/search` | Search (list + map, filters in URL) |
| `/providers/:slug` | Provider detail |
| `/faq` | FAQ |
| `/contact` | Contact form + `mailto:` / `tel:` links |

## Demo data & forms

- Provider listings live in `src/data/providers.ts` and are **sample data only**, labelled on search and profile pages.
- Search/filter state is reflected in query parameters where practical.
- Contact and provider inquiry forms show a **demo confirmation** on submit; they do not send email. Form state is structured for easy wiring to an API later.
- Maps use **Leaflet** + OpenStreetMap tiles when available.

## Contact

- Email: [kiddly.ca@gmail.com](mailto:kiddly.ca@gmail.com)
- Phone: [825-437-3563](tel:+18254373563)
