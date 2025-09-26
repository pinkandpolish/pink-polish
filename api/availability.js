const { readAvailability, writeAvailability } = require('../server/lib/storage');

module.exports = async (req, res) => {
  // Simple CORS for local preview; on Vercel same-origin calls won't need it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-secret');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    try {
      const data = await readAvailability();
      return res.status(200).json(data);
    } catch (err) {
      console.error('[vercel] read availability error', err);
      return res.status(500).json({ error: 'could_not_read' });
    }
  }

  if (req.method === 'POST') {
    try {
      const adminSecret = process.env.ADMIN_SECRET || process.env.TEST_SEND_SECRET;
      const incoming = (req.headers['x-admin-secret'] || (req.body && req.body.secret) || '').toString();
      if (adminSecret && incoming !== adminSecret) {
        return res.status(403).json({ ok: false, error: 'forbidden' });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { date, slots } = body;
      if (!date || !Array.isArray(slots)) {
        return res.status(400).json({ ok: false, error: 'invalid_payload' });
      }
      console.log('[vercel][availability:update]', { date, slotsCount: slots.length });
      await writeAvailability(date, slots);
      return res.status(200).json({ ok: true, date, slots });
    } catch (err) {
      console.error('[vercel] write availability error', err && err.stack ? err.stack : err);
      return res.status(500).json({ ok: false, error: 'save_failed', detail: err.message || String(err) });
    }
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).json({ error: 'method_not_allowed' });
};
