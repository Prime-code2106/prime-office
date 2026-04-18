# Tech Stack

## Frontend
- React 19 + TypeScript
- Vite 6 (bundler)
- Tailwind CSS 3 (utility-first styling, dark mode via `class` strategy)
- Framer Motion (animations)
- Lucide React (icons)
- Lottie React (animated illustrations)

## Backend
- Express 5 (custom server in `server.ts`, handles OTP auth + JWT)
- Supabase (`@supabase/supabase-js`) — auth, Postgres DB, Realtime subscriptions
- Google Gemini (`@google/genai`) — action item detection, chat summarization

## Auth
- Dual-mode: Supabase auth (email/social) + custom Express OTP flow (phone/+234)
- JWT via `jsonwebtoken` for Express sessions
- Rate limiting via `express-rate-limit`

## Environment Variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
JWT_SECRET=
```
`VITE_` prefix required for Supabase vars (Vite exposes them to the browser). `GEMINI_API_KEY` is mapped to `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `vite.config.ts`.

## Backend Toggle
`services/supabaseClient.ts` switches between mock and real Supabase:
- Mock: `export * from './supabaseClient.mock'`
- Real: `export * from './supabaseClient.real'` (default)

## Common Commands
```bash
npm run dev      # Start dev server (Express + Vite middleware) via tsx
npm run build    # Vite production build → dist/
npm run preview  # Preview production build
```
Dev server runs on `http://localhost:3000`.
