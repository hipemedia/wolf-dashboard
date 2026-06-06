# Wolf Constructions — ContentHub Dashboard

Live Instagram performance dashboard for Wolf Constructions, by Hipe Media.

## How it works
- `index.html` — the dashboard UI (dark ContentHub theme, Chart.js).
- `api/data.js` — a Vercel serverless function that proxies the existing ContentHub
  backend (`/api/instagram?client=wolf-constructions`), which holds the Publer
  session/token. This repo therefore needs **no secrets**.

Data refreshes server-side (5-minute cache) and the page auto-reloads every 5 minutes.

## Deploy
1. Push this repo to GitHub.
2. In Vercel: New Project → Import this repo → Deploy (zero-config; framework "Other").
3. Optional env vars:
   - `HUB_API` — override upstream (default `https://contenthub-dashboard.vercel.app/api/instagram`)
   - `CLIENT_ID` — default `wolf-constructions`

## Notes
If you later want this fully self-contained (its own Publer token rather than
proxying ContentHub), move the token-refresh logic into `api/data.js` and add the
Publer credentials as Vercel environment variables.
