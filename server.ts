import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import apiApp from './api/index';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  // Dynamic robots.txt with configured APP_URL
  app.get('/robots.txt', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  // Dynamic sitemap.xml with configured APP_URL
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    const routes = [
      { path: '/', freq: 'weekly', priority: '1.0' },
      { path: '/about', freq: 'monthly', priority: '0.8' },
      { path: '/services', freq: 'weekly', priority: '0.9' },
      { path: '/live-stream', freq: 'daily', priority: '0.9' },
      { path: '/stream-gallery', freq: 'weekly', priority: '0.8' },
      { path: '/contact', freq: 'monthly', priority: '0.8' },
      { path: '/privacy-policy', freq: 'yearly', priority: '0.4' },
      { path: '/terms', freq: 'yearly', priority: '0.4' },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
      .map(
        (r) =>
          `  <url>\n    <loc>${baseUrl}${r.path}</loc>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>`;
    res.type('application/xml').send(xml);
  });

  // Mount shared API routes (/api/status, /api/newsletter, /api/contact, /api/quote)
  app.use(apiApp);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
