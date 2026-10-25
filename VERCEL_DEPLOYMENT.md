# Deploying to Vercel

This project is pre-configured for one-click deployment on **Vercel** with both static Vite assets (`dist/`) and Serverless API functions (`api/index.ts`).

## Included Vercel Configuration Files

- **`vercel.json`**:
  - Runs `npm run build` and serves the compiled Vite bundle from `dist/`.
  - Routes `/api/*` requests (`/api/contact`, `/api/quote`, `/api/newsletter`, `/api/status`) to the Vercel Serverless Function at `api/index.ts`.
  - Routes all client-side React Router paths (`/about`, `/services`, `/live-stream`, `/stream-gallery`, `/contact`, `/privacy-policy`, `/terms`) to `/index.html` so direct links and page refreshes never return a 404.
- **`api/index.ts`**:
  - Serverless Express handler compatible with Vercel's Node.js runtime.
  - Validates and processes newsletter subscriptions, contact enquiries, and broadcast quote requests.
- **`.vercelignore`**:
  - Excludes local build caches and test folders from upload.

## Steps to Deploy on Vercel

1. **Via GitHub / GitLab / Bitbucket**:
   - Push this repository to your Git provider.
   - Open [vercel.com/new](https://vercel.com/new) and import the repository.
   - Vercel will automatically detect `vercel.json` (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
   - Click **Deploy**.

2. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel
   vercel --prod
   ```

## Optional Environment Variables (Vercel Project Settings -> Environment Variables)

- `VITE_APP_URL`: Your production domain (e.g., `https://yourmediabrand.com`).
- `VITE_LIVE_STREAM_URL`: Optional public `.m3u8` HLS stream URL for the `/live-stream` player.
- `VITE_WHATSAPP_NUMBER`: Optional business WhatsApp number in international digits format (e.g., `919876543210`).
- `VITE_GOOGLE_PLAY_URL`: Optional Google Play Store URL (shows the Mobile App Download section when set).
- `WEBHOOK_URL`: Optional server-side webhook URL (e.g., Slack, Make, Zapier, or custom CRM endpoint) to receive real-time JSON payloads whenever a visitor submits the Contact, Quote, or Newsletter form.
