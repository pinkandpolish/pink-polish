import React from 'react';

export default function LogoMark({ className = '', title = 'Halo', desc = 'Halo wordmark with cyan neon glow' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 200"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">{title}</title>
      <desc id="desc">{desc}</desc>

      {/* Background for visual debugging (transparent by default) */}
      <rect width="100%" height="100%" fill="none" />

      {/* Neon glow filter */}
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
          <feColorMatrix in="blur1" type="matrix" values="0 0 0 0 0.482  0 0 0 0 0.886  0 0 0 0 0.949  0 0 0 1 0" result="cyan1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
          <feColorMatrix in="blur2" type="matrix" values="0 0 0 0 0.482  0 0 0 0 0.886  0 0 0 0 0.949  0 0 0 1 0" result="cyan2"/>
          <feMerge>
            <feMergeNode in="cyan2"/>
            <feMergeNode in="cyan1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Gradient sweep for subtle animated fill; static gradient here */}
        <linearGradient id="sweep" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#e7f6ff"/>
          <stop offset="40%" stopColor="#8bb4ff"/>
          <stop offset="50%" stopColor="#7be2f2"/>
          <stop offset="60%" stopColor="#8bb4ff"/>
          <stop offset="100%" stopColor="#e7f6ff"/>
        </linearGradient>
      </defs>

      {/* Wordmark */}
      <g filter="url(#neon-glow)">
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Jost, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
          fontSize="128"
          fontStyle="italic"
          fontWeight="800"
          fill="url(#sweep)"
          stroke="#eaffff"
          strokeWidth="1.2"
          paintOrder="stroke fill"
        >
          Halo
        </text>
      </g>
    </svg>
  );
}
