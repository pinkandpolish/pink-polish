import React from 'react';

export default function Privacy(){
  const updated = new Date().toLocaleDateString();
  return (
    <>
      <section className="about-page-hero" aria-labelledby="privacy-title">
        <div className="inner">
          <p className="kicker">Legal</p>
          <h1 id="privacy-title" className="about-page-title">
            <span className="halo">Privacy</span> Policy
          </h1>
          <p className="about-page-lead">How we collect, use, and protect your information across our website and services.</p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
          {/* last updated moved to bottom */}
        </div>
      </section>

      <section className="about-page-values" aria-label="Key Privacy Highlights">
        <div className="grid">
          <article className="value-block">
            <h3 className="block-title">What we collect</h3>
            <p className="block-text">Contact details you provide and basic analytics (device, IP, pages). No unnecessary data.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" width="24" height="24" style={{minWidth:'20px',minHeight:'20px',maxWidth:'24px',maxHeight:'24px'}} aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Forms: name, email, message</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Usage: pages, referrer, device</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Cookies: essential + analytics</span>
                </label>
              </li>
            </ul>
          </article>
          <article className="value-block">
            <h3 className="block-title">How we use it</h3>
            <p className="block-text">Operate our site, respond to requests, improve performance, and communicate updates.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Support and proposals</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Service improvements</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Security and compliance</span>
                </label>
              </li>
            </ul>
          </article>
          <article className="value-block">
            <h3 className="block-title">Your choices</h3>
            <p className="block-text">Control cookies in your browser and contact us for access, correction, or deletion requests.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Cookie controls</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Access & deletion</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Contact anytime</span>
                </label>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-label="Privacy Details" className="contact-faq" style={{paddingTop:0}}>
        <div className="faq-head">
          <h2 className="faq-title">Details</h2>
        </div>
        <div className="faq-list">
          <div className="faq-item"><details><summary>Information we collect</summary><p>We collect information you provide (such as name, email, company, and message content) and information collected automatically (such as IP address, device/browser details, and usage analytics via cookies or similar technologies).</p></details></div>
          <div className="faq-item"><details><summary>How we use information</summary><p>We use your information to operate and improve our services, respond to your requests, send administrative communications, personalize content where appropriate, and meet legal obligations.</p></details></div>
          <div className="faq-item"><details><summary>Cookies and tracking</summary><p>We use essential cookies for core functionality and analytics cookies to understand usage. You can control cookies through your browser settings; some features may not function properly if disabled.</p></details></div>
          <div className="faq-item"><details><summary>Data retention</summary><p>We retain personal data only as long as necessary for the purposes described here, to comply with legal obligations, resolve disputes, and enforce our agreements.</p></details></div>
          <div className="faq-item"><details><summary>Your rights</summary><p>Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal information. To exercise these rights, contact us using the details below.</p></details></div>
          <div className="faq-item"><details><summary>Security and international transfers</summary><p>We implement reasonable safeguards to protect your information. If data is transferred across borders, it may be processed in countries with different data protection laws.</p></details></div>
          <div className="faq-item"><details><summary>Changes to this policy</summary><p>We may update this policy. The effective date above indicates the latest revision. Continued use of the site after changes take effect constitutes acceptance.</p></details></div>
        </div>
      </section>

      <section className="about-page-cta" aria-label="Privacy Contact">
        <div className="cta-inner">
          <div className="contact-panel">
            <h3>Questions or requests</h3>
            <p>Reach us at <a className="mailto" href="mailto:abbey@pinkandpolish.com">abbey@pinkandpolish.com</a> and we’ll respond promptly.</p>
          </div>
        </div>
      </section>

  <p className="legal-updated">Last updated: {updated} 🗓️</p>
  <p>Thank you for trusting <span style={{ fontFamily: 'Dancing Script, cursive', color: '#f06292' }}>Pink & Polish</span> with your space and your privacy. 🧼💖</p>
    </>
  );
}
