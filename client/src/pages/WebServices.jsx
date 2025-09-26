import React from 'react';
import ExploreMore from '../components/ExploreMore';

export default function WebServices() {
  const items = [
    'Custom Webflow sites or lightweight hand‑coded builds',
    'Clear information architecture and responsive layouts',
    'Performance, accessibility, and SEO fundamentals baked‑in',
    'Launch support: domains, SSL, analytics, email routing',
    'Ongoing management and content updates if you want them',
  ];

  const steps = [
    { title: '1) Plan', desc: 'We map goals, content, and the simplest path to launch.' },
    { title: '2) Build', desc: 'Clean, modern design and implementation with real content early.' },
    { title: '3) Launch + Handoff', desc: 'Go live with docs and ownership—you keep the keys.' },
  ];

  return (
    <main className="services-page" aria-labelledby="webservices-title">
      <section className="contact-hero">
        <div className="inner">
          <div className="kicker"><span className="kdot">•</span> WEB SERVICES</div>
          <h1 id="webservices-title" className="contact-title">Clean, fast <span className="halo">websites</span> that work hard for you.</h1>
          <p className="contact-lead">We design and build sharp, performant sites with the right fundamentals—no bloat, no mystery, just results.</p>
        </div>
      </section>

      <section className="section services">
        <div className="services-inner">
          <h2 className="services-title">What’s included</h2>
          <ul className="svc-list">
            {items.map(item => (
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
        </div>
      </section>

      <section className="section">
        <div className="services-inner">
          <h2 className="services-title">Process</h2>
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

  <ExploreMore current="web" />
    </main>
  );
}
