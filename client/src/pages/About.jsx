import React from 'react';
import { NavLink } from 'react-router-dom';

const values = [
  {
    title: 'Graceful caretakers',
    description:
  'Every attendant is thoughtfully selected and trained to protect delicate décor, luxury finishes, and sentimental keepsakes.',
  },
  {
    title: 'Feminine finishing touches',
    description:
      'We restyle pillows, refresh florals, and tidy vanities so your space feels like the girly Pinterest boards you love.',
  },
  {
    title: 'Transparent communication',
    description:
      'Expect schedule reminders, arrival texts, and a detailed recap after each clean. Prefer voice notes or DMs? We adapt.',
  },
];

const process = [
  'Share your dream vibe and any non-negotiables through the booking form—think scent preferences, fragile items, or preferred playlists.',
  'We confirm availability, map your personalised checklist, and assign your favorite attendants for ongoing visits.',
  'On cleaning day, our team arrives with curated supplies, executes the plan, and styles the final reveal for that photo-ready sparkle.',
];

export default function About() {
  return (
    <div className="page-wrapper about-page">
      <section className="about-intro">
        <span className="badge">Meet the team</span>
        <h1>Where softness meets sparkle</h1>
        <p>
          Pink & Polish started when our founder realised busy professionals deserved more than a basic scrub. Today our
          all-femme crew blends meticulous cleaning with a stylist&apos;s eye, crafting bright, joyful interiors for residential and
          commercial clients alike.
        </p>
        <p>
          We service indoor spaces only—think condos, creative studios, boutique offices, and pampering suites. Every visit includes a
          curated scent profile and tidy styling moment tailored to your personality.
        </p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
      </section>

      <section className="about-grid">
        {values.map((value) => (
          <article className="about-card" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </section>

      <section className="service-tier">
        <header>
          <span className="badge">How it works</span>
          <h2>A booking flow that feels like self-care</h2>
          <p>
            It only takes a few minutes to claim a calendar slot. Once you&apos;re in, your preferred window stays reserved for future
            cleanings.
          </p>
        </header>
        <ul>
          {process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <div>
          <NavLink to="/booking" className="btn btn--primary">
            Start the booking form
          </NavLink>
        </div>
      </section>
    </div>
  );
}
