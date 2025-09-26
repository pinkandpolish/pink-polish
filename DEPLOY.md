Fast deployment plan

Goal: get the app online quickly and safely with minimal infra work.

Recommended stack (fast):
- Client: Vercel (static, fast CDN)
- Server (API): Render (web service) OR Fly (nomad-like), using Dockerfile or direct Node deployment
- Database: Azure SQL (managed SQL Server)
- Email: Continue using Zoho SMTP or migrate to Postmark/SendGrid for higher deliverability
- DNS: Point primary domain to Vercel for the client; create API subdomain (api.yourdomain.com) pointing to Render/Fly.

Steps:
1) Client → Vercel
   - Create a Vercel account and connect the GitHub repo.
   - Set the root project to `client` and set build command `npm run build` and output dir `dist`.
   - Add environment variables for any runtime-only config (not required for static site normally).
   - Deploy and verify site at https://your-project.vercel.app.

2) Server → Render (quick)
   - Create Render account, new Web Service.
   - Connect GitHub repo and set the root directory to `server` (or use Dockerfile in `server/`).
   - If using Dockerfile: choose the Docker option and Render will build the image.
   - Set environment variables from `.env.example` in Render's dashboard (EMAIL_USER, EMAIL_PASS, DB_*, CORS_ORIGINS).
   - Use `api.yourdomain.com` as the service's custom domain.

3) Database
   - Provision Azure SQL or other managed SQL Server and create the DB `HaloRedesign`.
   - Whitelist Render/Fly IPs if necessary.
   - Update `DB_SERVER`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` on Render environment vars.

4) DNS & TLS
   - Point your root domain to Vercel (Vercel provides instructions).
   - Add CNAME or A record for `api.yourdomain.com` to Render (or Fly) per provider docs.
   - Ensure HTTPS is enabled (providers auto-issue certs).

5) Mail deliverability
   - Add SPF record authorizing Zoho (or chosen provider) to send on your behalf.
   - Add DKIM records if using transactional provider.
   - Test sending with `server/test_send.js`.

6) Final tests
   - Submit contact form on the live site and confirm email received.
   - Check `/api/health`, `/api/db-health` from production.

If you want, I can:
- Generate a GitHub Actions workflow for CI to build client and push server Docker image to DockerHub or Render.
- Create Render service setup steps and a sample `render.yaml` (infrastructure as code).
- Create the DNS records examples for Cloudflare.
CI / GHCR
- A sample GitHub Actions workflow is available at `.github/workflows/ci.yml`. It builds the client and pushes a server image to GitHub Container Registry (GHCR).
- Secrets required in your repository settings:
   - `GHCR_TOKEN` — Personal access token with `write:packages` scope.

Render / Deploy
- A sample `render.yaml` is included. You can adapt the name, region, and env vars.

DNS / SPF / DKIM
- For Zoho, add an SPF TXT record like:
   - Name: @
   - Value: `v=spf1 include:zoho.com ~all`
- For DKIM and MX follow Zoho's control panel instructions.

Next pick: CI (I will wire the Actions to build/publish), Render manifest tuning, or Cloudflare DNS snippets and I'll add the exact commands and sample records.

### Availability storage (Vercel friendly)

The API uses a simple storage abstraction for the admin availability tool:

- Local/dev: writes to `server/data/availability.json` (no DB needed).
- Vercel/Serverless: if `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set (Upstash/Vercel KV), it stores the availability blob under the key `availability`.

No traditional database is required for this feature.

Environment variables to consider on Vercel:
- `EMAIL_USER`, `EMAIL_PASS` for the contact form.
- Optional `ADMIN_SECRET` to protect the write endpoint.
- Optional `KV_REST_API_URL`, `KV_REST_API_TOKEN` to enable KV storage.

### Vercel Web Analytics

This repo is configured to use Vercel Web Analytics.

- `client/index.html` includes the script: `<script defer src="/_vercel/insights/script.js"></script>`.
- `client/src/main.jsx` sends `va('pageview')` on initial load and on SPA route changes.
- Analytics only sends events on Vercel deployments (production or preview URLs), not in local dev.

To view analytics: open the project in Vercel > Analytics. No extra env vars are required for basic tracking.

## Skip the backend: Formspree (fastest paid option)

- Use Formspree or a similar provider to receive form submissions without running the server.
- Steps:
  1. Sign up at https://formspree.io and create a new form. Formspree will give you an endpoint like `https://formspree.io/f/abcd1234`.
  2. In the `client/` folder create (or update) a `.env` and add:
   - `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xandzwgo`
   - `VITE_BOOKING_ENDPOINT=https://formspree.io/f/xandzwgo`
  3. The client is wired to prefer `VITE_FORMSPREE_ENDPOINT` when present; it will POST JSON to that endpoint and show the same success/failure UI as the backend.
  4. Test locally: run the client dev server (`npm run dev` in `client/`) and submit the contact form.

- Notes:
  - If `VITE_FORMSPREE_ENDPOINT` is not set, the app falls back to POSTing to `/api/contact` (your existing backend).
  - In production (Vercel), set `VITE_FORMSPREE_ENDPOINT` in the project's Environment Variables so Vite exposes it to the client build.
