# Estates.in

Real estate marketplace for Indian homes — React 19, Vite 8, Tailwind CSS 4.

## Features

- Landing page with hero, featured homes, city guides, advisors, testimonials, owner CTA
- Residences listing with URL search, filters, sort, pagination (6 per page)
- Property detail — gallery, pricing, amenities, location, advisor contact
- Wishlist and compare (up to 3 homes), persisted in `localStorage`
- Advisor directory and profile pages
- Sign in / register (client-side accounts + session), route guard, splash on login
- List a home — owner submission adds to the collection; owners can delete their listing
- Framer Motion transitions, scroll reveals, sticky nav, responsive layouts

## Setup

```bash
cd estates-marketplace
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You’ll land on sign-in first; create an account or use one you registered earlier.

```bash
npm run build    # production build → dist/
npm run preview  # serve dist locally
npm run lint
```

## Project layout

```text
src/
  pages/          landing, listings, property, wishlist, compare, agents, auth, submit
  components/     landing, listings, property, agents, auth, layout, brand, ui
  context/        AuthProvider, MarketplaceProvider
  data/           properties, agents, content, media
  lib/            filters, utils, motion
```

## Screenshots

Add desktop, tablet, and mobile captures under `screenshots/` (home, listings, detail, auth).

## Deploy

Run `npm run build` and host the `dist/` folder (Vercel, Netlify, GitHub Pages, etc.). Set SPA fallback to `index.html` for client-side routes.
# estates-marketplace
