import React, { useEffect, useState } from 'react';

function todayKey() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export default function AdminAvailability() {
  const [date, setDate] = useState(todayKey());
  const [slotsText, setSlotsText] = useState('8:30 AM, 10:30 AM, 1:00 PM');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/availability');
        const data = await res.json();
        if (data && data[date]) setSlotsText(data[date].join(', '));
      } catch (err) {
        // ignore
      }
    }
    load();
  }, [date]);

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const slots = slotsText.split(',').map(s => s.trim()).filter(Boolean);
    try {
      const adminSecret = window.__ADMIN_SECRET__ || ''; // optional client-side injection
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret },
        body: JSON.stringify({ date, slots }),
      });
      // Some environments (misconfigured proxy / 204) may yield an empty body; guard parsing
      let json = {};
      try {
        const text = await res.text();
        if (text.trim()) {
          json = JSON.parse(text);
        }
      } catch (parseErr) {
        // Keep json as empty; surface clearer error below if needed
      }
      if (!res.ok) {
        // Include status for clarity; prefer server provided error field
        const code = json && (json.error || json.code);
        throw new Error(code ? `${code} (${res.status})` : `save_failed (${res.status})`);
      }
      if (!json.ok) {
        setMessage('Saved (no confirmation payload)');
      } else {
        setMessage('Availability saved');
      }
    } catch (err) {
      setMessage('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <section className="about-intro">
        <h1>Admin: Edit availability</h1>
        <p>Post the slots you have for a given date. Use comma-separated times like "8:30 AM, 10:30 AM".</p>
        <form onSubmit={save} className="form-card">
          <label>
            Date
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </label>

          <label>
            Slots (comma-separated)
            <input value={slotsText} onChange={e => setSlotsText(e.target.value)} placeholder="8:30 AM, 10:30 AM" />
          </label>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn btn--primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <span>{message}</span>
          </div>
        </form>
      </section>
    </div>
  );
}
