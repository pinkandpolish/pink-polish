import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    key: 'residential',
    to: '/services/residential',
    label: 'Residential',
    sub: 'In‑home Wi‑Fi, device setup, repairs',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" fill="currentColor"/>
      </svg>
    )
  },
  {
    key: 'business',
    to: '/services/business',
    label: 'Business',
    sub: 'Identity, devices, security, support',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h8v4H3V7zm10 0h8v10h-8V7zM3 13h8v4H3v-4z" fill="currentColor"/>
      </svg>
    )
  },
  {
    key: 'web',
    to: '/services/web',
    label: 'Web Services',
    sub: 'Web design, builds, and management',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6H14a17 17 0 0 0-1.1-3.6 8.05 8.05 0 0 1 6 3.6zM12 4.2c.4.8 1.1 2.4 1.4 3.8H10.6c.3-1.4 1-3 1.4-3.8zM5.1 8A8.05 8.05 0 0 1 11 4.4 17 17 0 0 0 9.9 8H5.1zM4 12c0-.7.1-1.3.3-2h4.9a22 22 0 0 0 0 4H4.3c-.2-.7-.3-1.3-.3-2zm1.1 4H9.9a17 17 0 0 0 1.1 3.6 8.05 8.05 0 0 1-6-3.6zM12 19.8c-.4-.8-1.1-2.4-1.4-3.8h2.8c-.3 1.4-1 3-1.4 3.8zM18.9 16a8.05 8.05 0 0 1-6 3.6 17 17 0 0 0 1.1-3.6h4.9zm.8-4c0 .7-.1 1.3-.3 2h-4.9a22 22 0 0 0 0-4h4.9c.2.7.3 1.3.3 2z" fill="currentColor"/>
      </svg>
    )
  },
];

export default function ExploreMore({ current }) {
  return (
    <section className="explore" aria-labelledby="explore-title">
      <div className="explore-inner">
        <div className="explore-head">
          <div className="kicker"><span className="kdot">•</span> EXPLORE MORE</div>
          <h2 id="explore-title" className="explore-title">Pick what fits you best</h2>
        </div>
        <ul className="explore-grid" role="list">
          {items.map(item => (
            <li key={item.key} className={`explore-card ${current === item.key ? 'is-active' : ''}`}>
              <Link to={item.to} className="explore-link" aria-label={`View ${item.label} details`} {...(current===item.key?{'aria-current':'page'}:{})}>
                <span className="explore-icon" aria-hidden="true">{item.icon}</span>
                <span className="explore-text">
                  <span className="explore-label">{item.label}</span>
                  <span className="explore-sub">{item.sub}</span>
                </span>
                <span className="explore-chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="currentColor"/></svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
