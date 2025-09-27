import React from 'react';

export default function Terms() {
  const updated = new Date().toLocaleDateString();
  return (
    <div className="page-wrapper legal-page">
      {/* Title card */}
      <section className="about-intro" aria-labelledby="terms-title">
        <span className="badge">Legal</span>
        <h1 id="terms-title">Terms of Service</h1>
        <p>The plain‑English version of how we work together, what we deliver, and what to expect.</p>
        <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
      </section>

      {/* Highlights grid */}
      <section className="about-grid" aria-label="What to expect">
        <article className="about-card">
          <h3>Scope & pricing</h3>
          <p>Quotes reflect current scope and may adjust with changes. You’ll always approve first.</p>
          <ul className="legal-list">
            <li>Clear proposals</li>
            <li>Tracked changes</li>
            <li>No surprises</li>
          </ul>
        </article>
        <article className="about-card">
          <h3>Ownership</h3>
          <p>After full payment, you get rights to deliverables per your agreement. We keep our pre‑existing tools.</p>
          <ul className="legal-list">
            <li>Client IP respected</li>
            <li>Licenses documented</li>
            <li>Source provided</li>
          </ul>
        </article>
        <article className="about-card">
          <h3>Collaboration</h3>
          <p>Fast feedback loops keep timelines on track. We’ll share milestones and review windows.</p>
          <ul className="legal-list">
            <li>Weekly updates</li>
            <li>Review windows</li>
            <li>Shared timelines</li>
          </ul>
        </article>
      </section>

      {/* Details card */}
      <section className="service-tier legal-details" aria-label="Terms Details">
        <header>
          <span className="badge">Details</span>
          <h2>The fine print (kept friendly)</h2>
          <p>Key policies summarized for clarity.</p>
        </header>
        <div className="legal-sections">
          <div>
            <h3>Use of services</h3>
            <p>You agree to lawful use and to follow these Terms and applicable laws. You’re responsible for content you submit and your interactions with our services.</p>
          </div>
          <div>
            <h3>Quotes, proposals, and payment</h3>
            <p>Estimates reflect the scope at the time of quoting. Changes in scope may impact timeline and price; we’ll document and confirm any adjustments in writing.</p>
          </div>
          <div>
            <h3>Intellectual property</h3>
            <p>We retain our pre‑existing IP, frameworks, and internal tools. Upon full payment, you receive rights to the deliverables as specified in your agreement or SOW.</p>
          </div>
          <div>
            <h3>Client responsibilities</h3>
            <p>Provide timely content, feedback, and approvals. Delays on inputs may shift delivery dates.</p>
          </div>
          <div>
            <h3>Warranties and disclaimers</h3>
            <p>Except as expressly stated in writing, services are provided “as is” without warranties. We disclaim implied warranties to the fullest extent allowed by law.</p>
          </div>
          <div>
            <h3>Limitation of liability</h3>
            <p>To the maximum extent permitted, we’re not liable for indirect or consequential damages or lost profits. Direct damages are limited as specified in your agreement.</p>
          </div>
          <div>
            <h3>Termination</h3>
            <p>Either party may terminate as outlined in the governing agreement. You’ll pay for work performed and expenses incurred up to the termination date.</p>
          </div>
          <div>
            <h3>Governing law</h3>
            <p>These Terms follow the laws of the specified jurisdiction in your agreement, without regard to conflict of law rules.</p>
          </div>
          <div>
            <h3>Changes to these terms</h3>
            <p>We may update these Terms. The effective date below will indicate the latest revision.</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Questions about these Terms? Email <a className="mailto" href="mailto:abbey@pinkandpolish.com">abbey@pinkandpolish.com</a>.</p>
          </div>
        </div>
      </section>

      <p className="legal-updated">Last updated: {updated}</p>
    </div>
  );
}
