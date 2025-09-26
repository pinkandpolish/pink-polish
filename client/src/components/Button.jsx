import React from 'react';
import { Link } from 'react-router-dom';

export default function Button(){
  return (
  <Link to="/contact" className="btn-cyber" role="button" aria-label="Submit a Ticket or Request Today!">
      <span className="inner">
        <svg fill="currentColor" viewBox="0 0 24 24" className="icon-left" aria-hidden="true">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Submit a Ticket or Request Today!
        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-right" aria-hidden="true">
          <path d="M12 2v20m0-20L4 12m8-10l8 10" />
        </svg>
      </span>
      <span className="glow" aria-hidden="true" />
      <span className="under" aria-hidden="true" />
    </Link>
  );
}
