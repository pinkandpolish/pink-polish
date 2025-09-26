import React from 'react';

export default function Quote() {
  return (
    <main className="section" style={{padding: '120px 24px'}}>
      <div style={{maxWidth: 880, margin: '0 auto'}}>
        <h1 style={{fontSize: 'clamp(32px,7vw,66px)', margin: 0, textAlign: 'center'}}>Get a Quote</h1>
        <p className="sub" style={{maxWidth: 760, margin: '18px auto 34px', textAlign: 'center'}}>
          This is a temporary placeholder for the Quote page. Add your request form and workflow here.
        </p>

        <form aria-label="Request a quote" onSubmit={(e)=>e.preventDefault()} style={{display:'grid', gap: 16}}>
          <div style={{display:'grid', gap:8}}>
            <label htmlFor="q-name">Name</label>
            <input id="q-name" name="name" type="text" placeholder="Jane Doe" 
                   style={{padding:'12px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.18)', background:'#000', color:'var(--text)'}}/>
          </div>
          <div style={{display:'grid', gap:8}}>
            <label htmlFor="q-email">Email</label>
            <input id="q-email" name="email" type="email" placeholder="jane@example.com"
                   style={{padding:'12px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.18)', background:'#000', color:'var(--text)'}}/>
          </div>
          <div style={{display:'grid', gap:8}}>
            <label htmlFor="q-type">Project type</label>
            <select id="q-type" name="type" defaultValue="web" 
                    style={{padding:'12px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.18)', background:'#000', color:'var(--text)'}}>
              <option value="web">Website</option>
              <option value="it">IT Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={{display:'grid', gap:8}}>
            <label htmlFor="q-budget">Budget</label>
            <select id="q-budget" name="budget" defaultValue="undisclosed" 
                    style={{padding:'12px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.18)', background:'#000', color:'var(--text)'}}>
              <option value="undisclosed">Prefer not to say</option>
              <option value="5-10">$5k – $10k</option>
              <option value="10-25">$10k – $25k</option>
              <option value="25+">$25k+</option>
            </select>
          </div>
          <div style={{display:'grid', gap:8}}>
            <label htmlFor="q-notes">Notes</label>
            <textarea id="q-notes" name="notes" rows={5} placeholder="Tell us about your project..."
                      style={{padding:'12px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,.18)', background:'#000', color:'var(--text)', resize:'vertical'}}/>
          </div>

          <div style={{marginTop: 8}}>
            <button type="submit" className="cta">Submit Request</button>
          </div>
        </form>
      </div>
    </main>
  );
}
