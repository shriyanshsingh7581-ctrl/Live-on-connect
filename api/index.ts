import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json({ limit: '256kb' }));

// Use /tmp on Vercel serverless runtime (where /var/task is read-only) or .data locally
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'broadcast-data')
  : path.resolve(process.cwd(), '.data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

export interface StoredData {
  newsletter: Array<{
    id: string;
    email: string;
    consent: boolean;
    createdAt: string;
  }>;
  contacts: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    serviceRequired: string;
    eventDate: string;
    eventLocation: string;
    platforms: string[];
    estimatedAudience: string;
    message: string;
    createdAt: string;
  }>;
  quotes: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    serviceRequired: string;
    eventType: string;
    eventDate: string;
    eventLocation: string;
    platforms: string[];
    estimatedAudience: string;
    additionalRequirements: string;
    createdAt: string;
  }>;
}

function readStore(): StoredData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      const initial: StoredData = { newsletter: [], contacts: [], quotes: [] };
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(raw) as StoredData;
  } catch {
    return { newsletter: [], contacts: [], quotes: [] };
  }
}

function writeStore(data: StoredData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Fallback if filesystem is ephemeral
  }
}

async function forwardToWebhook(type: 'newsletter' | 'contact' | 'quote', payload: unknown) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload, sentAt: new Date().toISOString() }),
    });
  } catch {
    // Non-blocking webhook relay
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s\-()]{6,20}$/;

app.get('/api/status', (_req, res) => {
  res.json({
    ok: true,
    runtime: process.env.VERCEL ? 'vercel-serverless' : 'node-express',
    storageConfigured: true,
    webhookConfigured: Boolean(process.env.WEBHOOK_URL),
    liveStreamConfigured: Boolean(process.env.VITE_LIVE_STREAM_URL),
  });
});

app.post('/api/newsletter', async (req, res) => {
  const { email, consent, honeypot } = req.body || {};

  if (honeypot && String(honeypot).trim().length > 0) {
    return res.status(400).json({ ok: false, error: 'Spam check triggered.' });
  }

  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  if (!consent) {
    return res.status(400).json({
      ok: false,
      error: 'Please accept the privacy consent checkbox to subscribe.',
    });
  }

  const store = readStore();
  const existing = store.newsletter.find((item) => item.email === cleanEmail);
  if (existing) {
    return res.status(200).json({
      ok: true,
      alreadySubscribed: true,
      referenceId: existing.id,
      message: 'This email address is already subscribed to broadcast updates.',
    });
  }

  const record = {
    id: `SUB-${Date.now().toString(36).toUpperCase()}`,
    email: cleanEmail,
    consent: true,
    createdAt: new Date().toISOString(),
  };
  store.newsletter.push(record);
  writeStore(store);
  await forwardToWebhook('newsletter', record);

  return res.status(201).json({
    ok: true,
    referenceId: record.id,
    message: 'Your subscription has been saved to the server registry.',
  });
});

app.post('/api/contact', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    serviceRequired,
    eventDate,
    eventLocation,
    platforms,
    estimatedAudience,
    message,
    honeypot,
  } = req.body || {};

  if (honeypot && String(honeypot).trim().length > 0) {
    return res.status(400).json({ ok: false, error: 'Spam protection triggered.' });
  }

  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Full name is required.' });
  }
  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: 'A valid email address is required.' });
  }
  if (!phone || !PHONE_REGEX.test(String(phone).trim())) {
    return res.status(400).json({ ok: false, error: 'A valid phone number is required.' });
  }
  if (!serviceRequired || String(serviceRequired).trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Please select a required service.' });
  }
  if (!message || String(message).trim().length < 10) {
    return res.status(400).json({
      ok: false,
      error: 'Please provide event details (at least 10 characters).',
    });
  }

  const store = readStore();
  const record = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    serviceRequired: String(serviceRequired).trim(),
    eventDate: String(eventDate || '').trim(),
    eventLocation: String(eventLocation || '').trim(),
    platforms: Array.isArray(platforms) ? platforms.map(String) : [],
    estimatedAudience: String(estimatedAudience || '').trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };
  store.contacts.push(record);
  writeStore(store);
  await forwardToWebhook('contact', record);

  return res.status(201).json({
    ok: true,
    referenceId: record.id,
    createdAt: record.createdAt,
    message: 'Enquiry securely recorded by the production desk.',
  });
});

app.post('/api/quote', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    company,
    serviceRequired,
    eventType,
    eventDate,
    eventLocation,
    platforms,
    estimatedAudience,
    additionalRequirements,
    honeypot,
  } = req.body || {};

  if (honeypot && String(honeypot).trim().length > 0) {
    return res.status(400).json({ ok: false, error: 'Spam protection triggered.' });
  }

  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Full name is required.' });
  }
  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: 'A valid email address is required.' });
  }
  if (!phone || !PHONE_REGEX.test(String(phone).trim())) {
    return res.status(400).json({ ok: false, error: 'A valid phone number is required.' });
  }
  if (!serviceRequired || String(serviceRequired).trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Please select a broadcast service.' });
  }
  if (!eventLocation || String(eventLocation).trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Event city or venue location is required.' });
  }

  const store = readStore();
  const record = {
    id: `QTE-${Date.now().toString(36).toUpperCase()}`,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    company: String(company || '').trim(),
    serviceRequired: String(serviceRequired).trim(),
    eventType: String(eventType || 'Corporate Event').trim(),
    eventDate: String(eventDate || '').trim(),
    eventLocation: String(eventLocation).trim(),
    platforms: Array.isArray(platforms) ? platforms.map(String) : [],
    estimatedAudience: String(estimatedAudience || '').trim(),
    additionalRequirements: String(additionalRequirements || '').trim(),
    createdAt: new Date().toISOString(),
  };
  store.quotes.push(record);
  writeStore(store);
  await forwardToWebhook('quote', record);

  return res.status(201).json({
    ok: true,
    referenceId: record.id,
    createdAt: record.createdAt,
    message: 'Your production quote request has been registered.',
  });
});

export default app;
