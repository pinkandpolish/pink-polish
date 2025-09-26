import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer custom-footer" aria-label="Site footer">
      <div className="footer-main">
        <div className="footer-branding">
          <span className="footer-logo">Pink &amp; Polish</span>
          <span className="footer-tagline">Delicate care. Dazzling spaces.</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <NavLink to="/"> 
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" fill="currentColor"/></svg>
            Home
          </NavLink>
          <NavLink to="/about">
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" fill="currentColor"/></svg>
            About
          </NavLink>
          <NavLink to="/services">
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M20.7 4.3a1 1 0 0 0-1.4 0l-2.6 2.6 1.4 1.4 2.6-2.6a1 1 0 0 0 0-1.4zM3 18v3h3l9.29-9.29-3-3L3 18z" fill="currentColor"/></svg>
            Services
          </NavLink>
          <NavLink to="/booking">
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M7 10h5v5H7z" fill="currentColor"/><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 20V9h14v11H5z" fill="currentColor"/></svg>
            Booking
          </NavLink>
          <NavLink to="/privacy">
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zM9 7a3 3 0 0 1 6 0v3H9V7z" fill="currentColor"/></svg>
            Privacy
          </NavLink>
          <NavLink to="/terms">
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M6 2h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM13 3.5V9h5.5L13 3.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" fill="currentColor"/></svg>
            Terms
          </NavLink>
        </nav>
        <div className="footer-contact">
            <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <rect x="2" y="4" width="16" height="12" rx="3" fill="#f06292"/>
                <path d="M3 5l7 6 7-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              abbey@pinkandpolish.com
            </span>
            <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                <path d="M4.5 3.5A2 2 0 0 1 7 3c.2.2.4.5.5.8l1.2 2.7a2 2 0 0 1-.4 2.2l-.7.7a12.5 12.5 0 0 0 5.2 5.2l.7-.7a2 2 0 0 1 2.2-.4l2.7 1.2c.3.1.6.3.8.5a2 2 0 0 1-.5 2.5l-1.2 1.2c-.7.7-1.7 1-2.7.7C7.7 18.2 2 12.3 2.2 6.2c-.2-1 .1-2 1-2.7l1.3-1.2z" fill="#f06292" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <a href="tel:+17794039117" style={{ color: 'inherit', textDecoration: 'none' }}>(779)-403-9117</a>
            </span>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span>© {year} Pink &amp; Polish. All rights reserved.</span>
      </div>
    </footer>
  );
}
