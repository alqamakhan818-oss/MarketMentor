# MarketMentor — Frontend

React + Vite + Tailwind CSS v4 frontend for MarketMentor, a digital marketing
training site for small businesses.

## Tech stack

- React 19
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router
- Lucide React icons
- Radix UI primitives (accordion, select, checkbox, radio group, sheet, progress)

## Getting started

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Environment variables

Copy `.env.example` to `.env` and set `VITE_API_URL` if you want progress,
checklist, quiz and marketing-plan data to sync to the companion Express
backend. Leave it empty to use MarketMentor with browser-only local storage
(everything still works without a backend).

```bash
cp .env.example .env
```

```
VITE_API_URL=http://localhost:5000/api
```

## Building for production

```bash
npm run build
```

The production build is written to `dist/`.

## Deploying to Vercel

1. Import this `frontend/` folder as a Vercel project (Framework preset:
   Vite).
2. Set the `VITE_API_URL` environment variable in the Vercel project
   settings if you're using the backend.
3. `vercel.json` already rewrites all routes to `index.html`, so refreshing
   a page such as `/learn`, `/planner`, `/quiz` or `/progress` will not
   produce a 404.

## Pages

- `/` — Home
- `/learn` — Digital Marketing Learning Hub
- `/planner` — Marketing Planner
- `/content-ideas` — Social Media Content Ideas
- `/checklist` — Business Marketing Checklist + Budget Planner
- `/quiz` — Digital Marketing Quiz
- `/progress` — Progress Dashboard

All progress (completed lessons, checklist items, quiz results and the
marketing plan) is saved to the browser's `localStorage`, and optionally
synced to the backend when `VITE_API_URL` is configured.
