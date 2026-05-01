import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function VercelAnalytics() {
  const { pathname, search, hash } = useLocation();
  const path = pathname + search + hash;
  return <Analytics framework="react-router-dom" route={pathname} path={path} />;
}

export default function App() {
  return (
    <div className="app-shell">
      <VercelAnalytics />
      <ScrollToTop />

      <header className="site-header" aria-label="Primary navigation">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-name">Pink & Polish</span>
            <span className="brand-note">Delicate care. Dazzling spaces.</span>
          </NavLink>

          <nav className="nav-links" aria-label="Main">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
              Services
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
            <NavLink
              to="/booking"
              className={({ isActive }) =>
                [
                  'nav-cta',
                  'btn',
                  'btn--pinky-uiverse',
                  isActive ? 'active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              Book Now
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
