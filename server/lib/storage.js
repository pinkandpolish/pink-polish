const fs = require('fs');
const path = require('path');

// File fallback paths
const dataDir = path.join(__dirname, '..', 'data');
const availabilityPath = path.join(dataDir, 'availability.json');

function ensureFileStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(availabilityPath)) fs.writeFileSync(availabilityPath, JSON.stringify({}), 'utf8');
}

function hasKV() {
  // Vercel KV / Upstash REST API envs
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvCommand(cmdArray) {
  // Vercel runtime provides global fetch; add a minimal guard for older Node local runs
  const doFetch = (typeof fetch !== 'undefined') ? fetch : require('node-fetch');
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await doFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cmdArray),
  });
  if (!res.ok) throw new Error(`kv_http_${res.status}`);
  return res.json();
}

async function readAvailability() {
  if (hasKV()) {
    try {
      const json = await kvCommand(['GET', 'availability']);
      const value = json && (json.result || json.value);
      if (!value) return {};
      try {
        return JSON.parse(value);
      } catch {
        return {};
      }
    } catch (err) {
      console.error('[kv] read error', err);
      // fall back to empty on KV hiccup
      return {};
    }
  }
  // File fallback
  ensureFileStore();
  const raw = fs.readFileSync(availabilityPath, 'utf8');
  return JSON.parse(raw || '{}');
}

async function writeAvailability(date, slots) {
  if (!date || !Array.isArray(slots)) throw new Error('invalid_payload');
  if (hasKV()) {
    const current = await readAvailability();
    current[date] = slots;
    const payload = JSON.stringify(current);
    await kvCommand(['SET', 'availability', payload]);
    return current;
  }
  // File fallback
  ensureFileStore();
  const current = await readAvailability();
  current[date] = slots;
  fs.writeFileSync(availabilityPath, JSON.stringify(current, null, 2), 'utf8');
  return current;
}

module.exports = { readAvailability, writeAvailability };
