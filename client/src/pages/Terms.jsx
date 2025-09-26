import React from 'react';

export default function Terms(){
  const updated = new Date().toLocaleDateString();
  return (
    <>
      <section className="about-page-hero" aria-labelledby="terms-title">
        <div className="inner">
          <p className="kicker">Legal</p>
          <h1 id="terms-title" className="about-page-title"><span className="halo">Terms</span> of Service</h1>
          <p className="about-page-lead">The plain‑English version of how we work together, what we deliver, and what to expect.</p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
          {/* last updated moved to bottom */}
        </div>
      </section>

      <section className="about-page-values" aria-label="What to expect">
        <div className="grid">
          <article className="value-block">
            <h3 className="block-title">Scope & pricing</h3>
            <p className="block-text">Quotes reflect current scope and may adjust with changes. You’ll always approve first.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" width="24" height="24" style={{minWidth:'20px',minHeight:'20px',maxWidth:'24px',maxHeight:'24px'}} aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Clear proposals</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Tracked changes</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">No surprises</span>
                </label>
              </li>
            </ul>
          </article>
          <article className="value-block">
            <h3 className="block-title">Ownership</h3>
            <p className="block-text">After full payment, you get rights to deliverables per your agreement. We keep our pre‑existing tools.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Client IP respected</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Licenses documented</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Source provided</span>
                </label>
              </li>
            </ul>
          </article>
          <article className="value-block">
            <h3 className="block-title">Collaboration</h3>
            <p className="block-text">Fast feedback loops keep timelines on track. We’ll share milestones and review windows.</p>
            <ul className="check-list tight">
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Weekly updates</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Review windows</span>
                </label>
              </li>
              <li>
                <label className="checkbox-wrapper mini">
                  <input type="checkbox" checked readOnly disabled aria-hidden="true" tabIndex={-1} />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="label">Shared timelines</span>
                </label>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-label="Terms Details" className="contact-faq" style={{paddingTop:0}}>
        <div className="faq-head">
          <h2 className="faq-title">Details</h2>
        </div>
        <div className="faq-list">
          <div className="faq-item"><details><summary>Use of services</summary><p>You agree to lawful use and to follow these Terms and applicable laws. You’re responsible for content you submit and your interactions with our services.</p></details></div>
          <div className="faq-item"><details><summary>Quotes, proposals, and payment</summary><p>Estimates reflect the scope at the time of quoting. Changes in scope may impact timeline and price; we’ll document and confirm any adjustments in writing.</p></details></div>
          <div className="faq-item"><details><summary>Intellectual property</summary><p>We retain our pre‑existing IP, frameworks, and internal tools. Upon full payment, you receive rights to the deliverables as specified in your agreement or SOW.</p></details></div>
          <div className="faq-item"><details><summary>Client responsibilities</summary><p>Provide timely content, feedback, and approvals. Delays on inputs may shift delivery dates.</p></details></div>
          <div className="faq-item"><details><summary>Warranties and disclaimers</summary><p>Except as expressly stated in writing, services are provided “as is” without warranties. We disclaim implied warranties to the fullest extent allowed by law.</p></details></div>
          <div className="faq-item"><details><summary>Limitation of liability</summary><p>To the maximum extent permitted, we’re not liable for indirect or consequential damages or lost profits. Direct damages are limited as specified in your agreement.</p></details></div>
          <div className="faq-item"><details><summary>Termination</summary><p>Either party may terminate as outlined in the governing agreement. You’ll pay for work performed and expenses incurred up to the termination date.</p></details></div>
          <div className="faq-item"><details><summary>Governing law</summary><p>These Terms follow the laws of the specified jurisdiction in your agreement, without regard to conflict of law rules.</p></details></div>
          <div className="faq-item"><details><summary>Changes to these terms</summary><p>We may update these Terms. The effective date above will indicate the latest revision.</p></details></div>
          <div className="faq-item"><details><summary>Contact</summary><p>Questions about these Terms? Email <a className="mailto" href="mailto:abbey@pinkandpolish.com">abbey@pinkandpolish.com</a>.</p></details></div>
        </div>
      </section>

  {/* CTA removed on Terms page per request */}

  <p className="legal-updated">Last updated: {updated}</p>
    </>
  );
}
