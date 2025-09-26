// Minimal Express server with SQL Server connection using 'mssql'
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { sql, getPool } = require('./lib/db');
const { readAvailability, writeAvailability } = require('./lib/storage');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Restrict CORS to configured origins for production safety
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://127.0.0.1:5173,http://localhost:5173').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());
// Serve static client build if present
const clientDir = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDir));

// Availability storage is abstracted (uses Vercel KV if available; falls back to local file in dev)

// Public: get availability (returns object keyed by YYYY-MM-DD -> array of slot strings)
app.get('/api/availability', async (req, res) => {
  try {
    const data = await readAvailability();
    res.json(data);
  } catch (err) {
    console.error('read availability error', err);
    res.status(500).json({ error: 'could_not_read' });
  }
});

// Protected: update availability (accepts { date: 'YYYY-MM-DD', slots: ['8:30 AM', ...] })
app.post('/api/availability', async (req, res) => {
  const secret = req.headers['x-admin-secret'] || req.query.secret || (req.body && req.body.secret);
  const adminSecret = process.env.ADMIN_SECRET || process.env.TEST_SEND_SECRET; // either is acceptable
  // Only enforce the secret if one is configured server-side. Previously this blocked all writes when unset.
  if (adminSecret && secret !== adminSecret) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }
  try {
    const { date, slots } = req.body || {};
    if (!date || !Array.isArray(slots)) {
      return res.status(400).json({ ok: false, error: 'invalid_payload' });
    }
    console.log('[availability:update]', { date, slotsCount: slots.length });
    await writeAvailability(date, slots);
    return res.json({ ok: true, date, slots });
  } catch (err) {
    console.error('write availability error', err && err.stack ? err.stack : err);
    // Provide a stable machine-readable code plus message for the client
    return res.status(500).json({ ok: false, error: 'save_failed', detail: err.message || String(err) });
  }
});

// Contact form endpoint: receives all form data and sends email
const mailer = require('./lib/mailer');
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body;
    // Build a readable message from all fields
    const fields = Object.entries(data).map(([key, value]) => `<b>${key}:</b> ${value}`).join('<br>');
    const mailOptions = {
      from: process.env.EMAIL_USER,
  to: 'hello@pinkandpolish.com',
      subject: 'New Contact Form Submission',
      html: `<h2>New Contact Form Submission</h2><div>${fields}</div>`
    };

    // Helper to add a timeout to sendMail so requests don't hang indefinitely
    const sendWithTimeout = (opts, ms = 15000) => {
      return Promise.race([
        mailer.sendMail(opts),
        new Promise((_, reject) => setTimeout(() => reject(new Error('mailer_timeout')), ms))
      ]);
    };

    // use mailer.sendMail wrapper (mailer exports { sendMail, transporter })
    const sendFn = mailer.sendMail || mailer.send;
    if (!sendFn) throw new Error('mailer_unavailable');
    await sendWithTimeout(mailOptions, 15000).catch(async (err) => {
      // If sendWithTimeout triggers, try mailer.sendMail directly so we get nodemailer errors logged
      throw err;
    });
    res.json({ success: true });
  } catch (err) {
    // Log full error for debugging
    console.error('Contact send error:', err && err.stack ? err.stack : err);
    // Return 502 for upstream (mailer) failures to differentiate from server errors
    const status = (err && err.message && err.message.includes('mailer_timeout')) ? 504 : 502;
    res.status(status).json({ success: false, error: err.message || String(err) });
  }
});

// Root route: serve app if built, else show API helper page
app.get('/', (req, res) => {
  const indexPath = path.join(clientDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(
      '<h1>Halo Redesign API</h1>' +
        '<p>Build the client to serve the site. Try <a href="/api/health">/api/health</a>, <a href="/api/time">/api/time</a>, or <a href="/api/items">/api/items</a></p>'
    );
  }
});

// Lightweight health: never fails due to DB
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', now: new Date().toISOString(), uptime: process.uptime() });
});

// Optional DB health: reports DB status but does not crash the server
app.get('/api/db-health', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT 1 AS ok');
    const connected = result.recordset[0].ok === 1;
    res.json({ status: connected ? 'ok' : 'unknown', db: connected ? 'connected' : 'unknown' });
  } catch (err) {
    res.json({ status: 'degraded', db: 'disconnected', error: err.message });
  }
});

app.get('/api/time', (req, res) => {
  res.json({ now: new Date().toISOString() });
});

// Admin/test-only endpoint to trigger a single SMTP test. Protected by TEST_SEND_SECRET.
app.post('/api/test-send', async (req, res) => {
  const secret = req.headers['x-test-secret'] || req.query.secret || req.body && req.body.secret;
  if (!process.env.TEST_SEND_SECRET || secret !== process.env.TEST_SEND_SECRET) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }
  try {
    const info = await (mailer.sendMail ? mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Production SMTP test',
      text: 'This is a production SMTP test triggered by /api/test-send.'
    }) : Promise.reject(new Error('mailer_unavailable')));
    res.json({ ok: true, info });
  } catch (err) {
    console.error('test-send error:', err && err.stack ? err.stack : err);
    res.status(502).json({ ok: false, error: err.message || String(err) });
  }
});

// Example: list items from a demo table if it exists
app.get('/api/items', async (req, res) => {
  try {
  const pool = await getPool();
  const result = await pool.request().query("IF OBJECT_ID('dbo.Items','U') IS NOT NULL SELECT TOP 50 * FROM dbo.Items ELSE SELECT 0 AS empty");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA fallback: let React Router handle non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`API server listening on http://${HOST}:${PORT}`);
});
