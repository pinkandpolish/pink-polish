import React, { useEffect, useState } from 'react';

const API_BASE = (import.meta?.env?.VITE_API_BASE || '').replace(/\/+$/, '');
function apiUrl(path) {
  return (API_BASE ? `${API_BASE}${path}` : path);
}

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
  const [adminSecret, setAdminSecret] = useState(() => {
    // Persist across refreshes for this tab only
    return sessionStorage.getItem('adminSecret') || '';
  });
  const isAuthed = !!adminSecret;

  // Prevent indexing of this page in production
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
  async function load() {
      try {
    const res = await fetch(apiUrl('/api/availability'));
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
      if (!adminSecret) {
        setLoading(false);
        return setMessage('Please sign in with your admin password first.');
      }
  const res = await fetch(apiUrl('/api/availability'), {
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
        if (res.status === 403) {
          // wrong or missing password — force re-auth
          sessionStorage.removeItem('adminSecret');
          setAdminSecret('');
        }
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

  function handleSignIn(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const secret = new FormData(form).get('password')?.toString().trim() || '';
    if (!secret) {
      setMessage('Please enter your admin password.');
      return;
    }
    sessionStorage.setItem('adminSecret', secret);
    setAdminSecret(secret);
    setMessage('');
  }

  function handleSignOut() {
    sessionStorage.removeItem('adminSecret');
    setAdminSecret('');
    setMessage('Signed out.');
  }

  return (
    <div className="page-wrapper">
      <section className="about-intro">
        <h1>Admin: Edit availability</h1>
        {!isAuthed ? (
          <form onSubmit={handleSignIn} className="form-card" style={{ maxWidth: 420 }}>
            <p>Please enter your admin password to continue.</p>
            <label>
              Password
              <input name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btn--primary" type="submit">Sign in</button>
              <span>{message}</span>
            </div>
            <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              Your password is kept only in this tab and sent with updates to the admin API.
            </p>
          </form>
        ) : (
          <>
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
                <button className="btn" type="button" onClick={handleSignOut} disabled={loading}>Sign out</button>
                <span>{message}</span>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
