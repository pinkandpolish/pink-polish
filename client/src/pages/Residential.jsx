import React from 'react';
import ExploreMore from '../components/ExploreMore';

export default function Residential() {
  const items = [
    'Complete Wi‑Fi troubleshooting, mesh setup, and speed optimization',
    'PC builds and upgrades, gaming setups, and WFH configurations',
    'System cleanup: malware/virus removal, OS repair, and updates',
    'Printer, smart home, streaming devices, and peripherals setup',
    'Data backup strategies and basic network security hardening',
  ];

  const steps = [
    { title: '1) Quick Call', desc: 'Tell us what’s going on. We’ll ask a few questions and set expectations.' },
    { title: '2) On‑Site or Remote', desc: 'We fix most issues same‑day with secure remote help or a fast house call.' },
    { title: '3) Stabilize + Improve', desc: 'We don’t just patch—we set you up for fewer problems going forward.' },
  ];

  return (
    <main className="services-page" aria-labelledby="residential-title">
      {/* Hero */}
      <section className="contact-hero">
        <div className="inner">
          <div className="kicker"><span className="kdot">•</span> RESIDENTIAL SERVICES</div>
          <h1 id="residential-title" className="contact-title">Friendly, reliable in‑home <span className="halo">tech support</span>.</h1>
          <p className="contact-lead">Wi‑Fi that reaches every room. Devices that just work. We set up, fix, and optimize your home tech without the headache.</p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
        </div>
      </section>

      {/* What we help with */}
      <section className="section services">
        <div className="services-inner">
          <h2 className="services-title">What we help with</h2>
          <ul className="svc-list">
            {items.map(item => (
              <li key={item} className="has-checkbox">
                <label className="checkbox-wrapper">
                  <input type="checkbox" checked readOnly aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="label">{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="services-inner">
          <h2 className="services-title">How it works</h2>
          <ol className="process" aria-label="Our process">
            {steps.map(step => (
              <li key={step.title} className="proc-step">
                <div className="proc-title">{step.title}</div>
                <div className="proc-desc">{step.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

  {/* Explore More (redesigned) */}
  <ExploreMore current="residential" />
    </main>
  );
}
