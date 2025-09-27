import React from 'react';

export default function Privacy() {
  const updated = new Date().toLocaleDateString();
  return (
    <div className="page-wrapper legal-page">
      {/* Title card */}
      <section className="about-intro" aria-labelledby="privacy-title">
        <span className="badge">Legal</span>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>How we collect, use, and protect your information across our website and services.</p>
        <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
      </section>

      {/* Highlights grid */}
      <section className="about-grid" aria-label="Key Privacy Highlights">
        <article className="about-card">
          <h3>What we collect</h3>
          <p>Contact details you provide and basic analytics (device, IP, pages). No unnecessary data.</p>
          <ul className="legal-list">
            <li>Forms: name, email, message</li>
            <li>Usage: pages, referrer, device</li>
            <li>Cookies: essential + analytics</li>
          </ul>
        </article>
        <article className="about-card">
          <h3>How we use it</h3>
          <p>Operate our site, respond to requests, improve performance, and communicate updates.</p>
          <ul className="legal-list">
            <li>Support and proposals</li>
            <li>Service improvements</li>
            <li>Security and compliance</li>
          </ul>
        </article>
        <article className="about-card">
          <h3>Your choices</h3>
          <p>Control cookies in your browser and contact us for access, correction, or deletion requests.</p>
          <ul className="legal-list">
            <li>Cookie controls</li>
            <li>Access & deletion</li>
            <li>Contact anytime</li>
          </ul>
        </article>
      </section>

      {/* Details card */}
      <section className="service-tier legal-details" aria-label="Privacy Details">
        <header>
          <span className="badge">Details</span>
          <h2>Data handling at a glance</h2>
          <p>Practical notes on collection, usage, retention and your rights.</p>
        </header>
        <div className="legal-sections">
          <div>
            <h3>Information we collect</h3>
            <p>We collect information you provide (such as name, email, and message content) and information collected automatically (such as IP address, device/browser details, and usage analytics via cookies or similar technologies).</p>
          </div>
          <div>
            <h3>How we use information</h3>
            <p>We use your information to operate and improve our services, respond to your requests, send administrative communications, personalize content where appropriate, and meet legal obligations.</p>
          </div>
          <div>
            <h3>Cookies and tracking</h3>
            <p>We use essential cookies for core functionality and analytics cookies to understand usage. You can control cookies through your browser settings; some features may not function properly if disabled.</p>
          </div>
          <div>
            <h3>Data retention</h3>
            <p>We retain personal data only as long as necessary for the purposes described here, to comply with legal obligations, resolve disputes, and enforce our agreements.</p>
          </div>
          <div>
            <h3>Your rights</h3>
            <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal information. To exercise these rights, contact us using the details below.</p>
          </div>
          <div>
            <h3>Security and international transfers</h3>
            <p>We implement reasonable safeguards to protect your information. If data is transferred across borders, it may be processed in countries with different data protection laws.</p>
          </div>
          <div>
            <h3>Changes to this policy</h3>
            <p>We may update this policy. The effective date below indicates the latest revision. Continued use of the site after changes take effect constitutes acceptance.</p>
          </div>
        </div>
      </section>

      {/* Contact card */}
      <section className="about-intro" aria-label="Privacy Contact" style={{marginTop: '24px'}}>
        <h3>Questions or requests</h3>
        <p>Reach us at <a className="mailto" href="mailto:abbey@pinkandpolish.com">abbey@pinkandpolish.com</a> and we’ll respond promptly.</p>
      </section>

      <p className="legal-updated">Last updated: {updated}</p>
    </div>
  );
}
