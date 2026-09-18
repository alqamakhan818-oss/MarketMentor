# MarketMentor Backend

Simple Express and MongoDB API for storing MarketMentor quiz results, lesson progress, checklist progress and marketing plans.

## Setup

1. Install Node.js 18 or newer and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Update `MONGODB_URI` if needed.
5. Run `npm run dev`.

The API starts at `http://localhost:5000` by default.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check API status |
| GET/POST | `/api/quiz-results` | Read or create quiz results |
| GET/PUT | `/api/learning-progress` | Read or update completed lessons |
| GET/PUT | `/api/checklist-progress` | Read or update checklist items |
| GET/POST | `/api/marketing-plans` | Read or create marketing plans |

This student project does not include authentication. Add user accounts before using it as a multi-user production service.

## Deploying to Vercel

1. Import this `backend/` folder as a Vercel project.
2. Set the `MONGODB_URI` and `CLIENT_URL` environment variables in the
   Vercel project settings (see `.env.example`).
3. `vercel.json` routes all requests to `app.js`, which never calls
   `app.listen()`, so it runs cleanly as a serverless function. Local
   development still uses `server.js`, which does call `app.listen()`.
