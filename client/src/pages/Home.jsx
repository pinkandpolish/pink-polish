import React from 'react';
import { NavLink } from 'react-router-dom';

const metrics = [
  {
    value: '98%',
    label: 'customer satisfaction rating this year',
  },
  {
    value: <><span style={{letterSpacing: 0}}>48&nbsp;hr</span></>,
    label: 'touch-up promise for any missed detail',
  },
  {
    value: '100%',
    label: 'pet-safe and eco-friendly product lineup',
  },
];

const features = [
  {
    icon: '🧽',
    title: 'High-touch detailing',
    description:
      'From chandeliers to conference tables, we polish every surface you point to—no rush jobs, ever.',
  },
  {
    icon: '🕰️',
    title: 'Schedules that flex',
    description:
      'Choose weekly, bi-weekly, or one-time support with real-time calendar availability for stress-free planning.',
  },
  {
    icon: '🌼',
    title: 'Soft, girly aesthetic',
    description:
      'We finish each visit with tidy styling touches so your space feels as lovely as it looks clean.',
  },
  {
    icon: '💛',
    title: 'Sunshine support',
    description:
      'We arrive on-time, with a happy smile, ready to brighten your day with warm customer care.',
  },
];

const serviceSnippets = [
  {
    title: 'Residential Refresh',
    badge: 'Apartments & homes',
    bullets: [
      'Gentle room-by-room cleans tailored to your routine',
      'Laundry and linen resets available as add-ons',
      'Perfect for studio, loft, and family homes alike',
    ],
  note: 'Starting at $125 per Residential Refresh',
  },
  {
    title: 'Commercial Care',
    badge: 'Studios & offices',
    bullets: [
      'Evening or early-bird availability for minimal disruption',
      'Breakroom, reception, and high-touch surfaces sanitized',
      'Detailed reporting to keep stakeholders updated',
    ],
    note: 'Custom quotes for square footage & frequency',
  },
  {
    title: 'Signature Add-ons',
    badge: 'A little extra sparkle',
    bullets: [
      'Inside appliance detailing and reset styling',
      'Post-party reset with dish care and trash removal',
      'Deep scrub of grout, baseboards, and touchpoints',
    ],
    note: 'Bundle for booking credits and seasonal perks',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-tagline">Soft Touch. Sparkling Results. Proudly serving McHenry IL, and surrounding areas.</span>
          <h1 className="hero-title">
            Indoor cleaning made <span className="dreamy-yellow">dreamy</span> for <span>homes</span> & <span>businesses</span>
          </h1>
          <p className="hero-subtitle">
            Pink & Polish delivers gentle, detail-obsessed cleanings with a playful, feminine touch. We bring the
            supplies, the smiles, and a clear booking calendar so you can always find the perfect slot.
          </p>
          <div className="hero-actions">
              <NavLink to="/booking" className="nav-cta btn btn--pinky-uiverse">
                Book Now
              </NavLink>
            <NavLink to="/services" className="btn btn--outline">
              Explore Services
            </NavLink>
          </div>
          <div className="hero-metrics">
            {metrics.map((metric) => (
              <div className="metric-card" key={metric.value}>
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-wrapper">
        <section className="section-heading">
          <div className="eyebrow">Why clients fall in love</div>
          <h2>
            Inspired by <span className="highlight-yellow">girly aesthetics</span>, powered by <span className="highlight-pink">detail-driven pros</span>
          </h2>
          <p>
            Every clean is styled to feel fresh, comfortable, and uplifting. From fresh florals to folded throws, we leave spaces that
            feel like sunshine and smell like a favorite spa day.
          </p>
        </section>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>

        <section className="services-preview">
          <div className="section-heading">
            <div className="eyebrow">Signature line-up</div>
              <h2><span className="highlight-pink">Playful polish</span> for <span className="highlight-yellow">any</span> indoor space</h2>
            <p>
              Mix-and-match services for residential or commercial settings. We build each quote around your priorities, then keep
              you synced with the booking calendar.
            </p>
          </div>

          <div className="preview-grid">
            {serviceSnippets.map((service) => (
              <article className="service-card" key={service.title}>
                <header>
                  <h3>{service.title}</h3>
                  <span className="badge">{service.badge}</span>
                </header>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <footer className="service-footer">
                  <NavLink to="/booking" className="btn btn--outline">
                    Reserve
                  </NavLink>
                  <span>{service.note}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="callout">
          <h3>Planning a move-out, brand event, or seasonal reset?</h3>
          <p>
            Share the vibe, a time that works, and we will shape a custom cleaning checklist that fits your mood boards. Rush
            support available for launch weeks and open houses.
          </p>
          <div>
            <NavLink to="/booking" className="btn btn--primary">
              Hold Your Spot
            </NavLink>
          </div>
          <span className="notice">Bookings close once the calendar hits capacity—reserve early for best selection.</span>
        </section>
      </div>
    </>
  );
}
