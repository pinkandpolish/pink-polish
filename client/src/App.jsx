import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles.css';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  return (
    <div className="app-shell">
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
