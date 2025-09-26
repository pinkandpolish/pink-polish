import React, { useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const rawType = (params.get('type') || '').toLowerCase();
  const cta = params.get('cta') || '';
  // Map incoming type aliases to our select values
  const preselect = useMemo(() => {
    switch (rawType) {
      case 'web':
      case 'website':
      case 'design':
      case 'build':
        return 'website';
      case 'update':
      case 'content':
        return 'update';
      case 'consult':
      case 'advice':
        return 'consult';
      case 'support':
      case 'it':
      default:
        return 'support';
    }
  }, [rawType]);
  const [phase, setPhase] = useState('idle'); // idle | sending | sent
  const [label, setLabel] = useState('Send Request');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (phase !== 'idle') return;
    setPhase('sending');
    setLabel('Sending...');
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    // Prefer Formspree when VITE_FORMSPREE_ENDPOINT is set (vite env var).
    // Keep `/api/contact` as a fallback for users who keep the backend.
    const formspree = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const endpoint = formspree || '/api/contact';
    const headers = formspree
      ? { Accept: 'application/json', 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      // Treat any 2xx as success for both Formspree and our backend
      if (res.ok) {
        setPhase('sent');
        setLabel('Sent!');
        form.reset();
      } else {
        // Some providers return JSON with error details; we don't expose them here
        setPhase('idle');
        setLabel('Send Failed');
      }
    } catch (err) {
      setPhase('idle');
      setLabel('Send Failed');
    }

    setTimeout(() => {
      setPhase('idle');
      setLabel('Send Request');
    }, 1800);
  }, [phase]);

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="inner">
          <div className="kicker"><span className="kdot">•</span> GET IN TOUCH</div>
          <h1 className="contact-title">Let’s Fix Issues <span className="halo">Before</span> They Slow You Down.</h1>
          <p className="contact-lead">Send a request—whether it’s a broken site, missing email records, slow Wi‑Fi, or you need a new build. We respond quickly and give you a clear next step.</p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="field">
              <label htmlFor="company">Business / Org (optional)</label>
              <input id="company" name="company" type="text" placeholder="Company Name" />
            </div>
            <div className="field">
              <label htmlFor="type">What do you need?</label>
              <select id="type" name="type" defaultValue={preselect}>
                <option value="support">IT Support / Fix Something</option>
                <option value="website">New Website / Redesign</option>
                <option value="update">Content / Feature Update</option>
                <option value="consult">General Consultation</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Details</label>
              <textarea id="message" name="message" rows={5} required placeholder={cta ? `From: ${cta} — Tell us what’s going on or what you’d like to build.` : "Tell us what’s going on or what you’d like to build."} />
            </div>
            <div className="field-inline">
              <label className="checkbox-wrapper">
                <input type="checkbox" defaultChecked readOnly />
                <span className="checkmark">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="label">I’d like a quick audit recommendation</span>
              </label>
            </div>
            <button
              type="submit"
              className={`btn-cyber submit ${phase} ${phase !== 'idle' ? 'is-busy' : ''}`}
              disabled={phase === 'sending'}
              aria-live="polite"
              aria-label={label}
            >
              <span className="inner">
                <span className="plane" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M3.2 11.2L20.6 3.4c.9-.4 1.8.5 1.4 1.4l-7.8 17.4c-.5 1.1-2.1.9-2.3-.3l-1.2-6.2 6.6-6.6-8 5.2-5.6-.9c-1.2-.2-1.4-1.8-.3-2.3z" fill="currentColor" />
                  </svg>
                </span>
                <span className="btn-label">{label}</span>
                <span className="sent-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className="glow" />
              <span className="under" />
            </button>
          </form>

          {/* Benefits */}
          <aside className="contact-benefits">
            <h2 className="benefits-title">Why Teams Work With <span className="halo">Halo</span>:</h2>
            <ul className="check-list">
              {[
                'Fast, real responses (not ticket limbo)',
                'Transparent guidance—no upsell fluff',
                'Security + performance baked in',
                'Zero handoff anxiety after launch',
                'We document everything for you'
              ].map(item => (
                <li key={item} className="has-checkbox">
                  <label className="checkbox-wrapper mini">
                    <input type="checkbox" checked readOnly aria-hidden="true" tabIndex={-1} />
                    <span className="checkmark">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="label">{item}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="contact-panel">
              <h3>Direct Email</h3>
              <p><a href="mailto:abbey@pinkandpolish.com" className="mailto">abbey@pinkandpolish.com</a></p>
              <h3>Service Hours</h3>
              <p>
                Mon–Fri: 5–9 pm CT<br/>
                Sat–Sun: 1–9 pm CT<br/>
                Emergency support: during posted hours
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="faq-head">
          <div className="kicker"><span className="kdot">•</span> FAQ</div>
          <h2 className="faq-title">Common <span className="halo">Questions</span></h2>
        </div>
        <ul className="faq-list">
          {[
            {q:'What platforms & stacks do you support?', a:'We support all sorts of web stacks, DNS/domain/email infrastructure and small custom inegrations.'},
            {q:'Can you fix something without rebuilding?', a:'Yes—audits point out what to repair vs. replace so you only spend where it matters.'},
            {q:'Do you lock me into hosting?', a:'No. You retain ownership of domains, DNS, and hosting. We help configure and document.'},
            {q:'How fast can you start?', a:'Small fixes are same week, depending how small. Bigger changes require inquiries.'},
            {q:'Is support ongoing?', a:'Yes—structured improvements, updates, and fast help beats expensive “monthly retainers” with no value.'}
          ].map(item => (
            <li key={item.q} className="faq-item">
              <details>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
