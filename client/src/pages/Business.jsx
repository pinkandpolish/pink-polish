import React from 'react';
import ExploreMore from '../components/ExploreMore';

export default function Business() {
  const items = [
    'Microsoft 365 / Google Workspace identity & user management',
    'Secure VPN, device policies, and role‑based access',
    'Workstation repair, remote diagnostics, and lifecycle care',
    'Backups, patching, and baseline monitoring',
    'Network setup: routers, switches, VLANs, and Wi‑Fi',
  ];

  const steps = [
    { title: '1) Discovery', desc: 'Short intake to map your current setup and prioritize quick wins.' },
    { title: '2) Stabilize', desc: 'Fix the breakage, standardize configs, and secure the basics.' },
    { title: '3) Improve', desc: 'Iterate on a simple roadmap with clear owners and timelines.' },
  ];

  return (
    <main className="services-page" aria-labelledby="business-title">
      <section className="contact-hero">
        <div className="inner">
          <div className="kicker"><span className="kdot">•</span> BUSINESS SERVICES</div>
          <h1 id="business-title" className="contact-title">Practical <span className="halo">IT</span> for teams that need to keep moving.</h1>
          <p className="contact-lead">We handle the unglamorous but critical stuff—identity, devices, security, and support—so your team can focus on work.</p>
        </div>
      </section>

      <section className="section services">
        <div className="services-inner">
          <h2 className="services-title">Where we help</h2>
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

      <section className="section">
        <div className="services-inner">
          <h2 className="services-title">How we work</h2>
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

  <ExploreMore current="business" />
    </main>
  );
}
