import React from 'react';
import { NavLink } from 'react-router-dom';

const serviceTiers = [
	{
		name: 'Residential Glow',
		tagline: 'Tailored cleans for apartments, condos, and family homes',
		frequency: 'Weekly · Bi-weekly · Monthly · One-time',
		items: [
			'Detailed kitchen sanitising, dish refresh, and counter styling',
			'Bedroom sparkle with linen change, wardrobe tidy, and vanity reset',
			'Living space refresh including dusting, glass shining, and décor placement',
			'Bathroom spa treatment with grout scrub, mirror polish, and plush towel display',
		],
		note: 'Pricing starts at $125 and is confirmed after an in-home walkthrough or virtual tour.',
	},
	{
		name: 'Commercial Charm',
		tagline: 'Perfect for boutique offices, salons, studios, and retail suites',
		frequency: 'After-hours · Early-bird · Weekend rotation',
		items: [
			'Lobby and guest areas styled with seasonal décor resets',
			'Desk zones, meeting rooms, and shared tech sanitised without disturbing setups',
			'Breakroom and kitchenette cleaning with appliance wipe-downs',
			'Waste removal, recycling sorting, and supply restocking checklists',
		],
		note: 'Let us know your floor plan and we will build a custom plan with clear deliverables by zone.',
	},
];

const addons = [
	'Move-in / move-out sparkle sessions',
	'Post-event reset and dish duty',
	'Inside fridge, freezer, and oven detailing',
	'Deep grout, baseboard, and trim refresh',
	'Laundry folding and closet restyling',
	'Window and mirror glow-up (interior only)',
	'Plant care and watering on rotation',
	'Supply shopping and restock service',
];

export default function Services() {
	return (
		<div className="page-wrapper services-page">
			<section className="services-intro">
				<div className="services-intro-grid">
					<div className="intro-card intro-card--main">
						<span className="badge">Our care menu</span>
						<h1>
							Every clean is{' '}
							<span className="highlight-pink">personalised</span> to your{' '}
							<span className="highlight-yellow">vibe</span>
						</h1>
						<p className="intro-lead">
							Choose between residential and commercial plans or combine both for mixed-use spaces.
							We stay flexible with add-ons and seasonal refreshes so your environment always feels polished,
							inviting, and on brand.
						</p>
					</div>
					<div className="intro-card intro-card--support intro-hint">
						<p className="intro-hint-text">
							Need to coordinate with building management or front desk teams? Add details in the booking form
							and we'll handle the rest.
						</p>
					</div>
				</div>
			</section>

			<section className="services-list">
				{serviceTiers.map((tier) => (
					<article className="service-tier" key={tier.name}>
						<header>
							<span className="badge">{tier.frequency}</span>
							<h2>{tier.name}</h2>
							<p>{tier.tagline}</p>
						</header>
						<ul>
							{tier.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<span className="form-hint">{tier.note}</span>
						<NavLink to="/booking" className="btn btn--primary">
							Book {tier.name}
						</NavLink>
					</article>
				))}
			</section>

			<section className="addons">
				<h2>Add-on delights</h2>
				<p>
					Mix and match extras to elevate your clean. Bundles earn surprise
					perks—think treat boxes, fresh florals, or playlist drops on arrival.
				</p>
				<div className="addons-list">
					{addons.map((addon) => (
						<span key={addon}>{addon}</span>
					))}
				</div>
			</section>

			<section className="callout">
				<h3><span className="text-black">Not seeing a service? Let&apos;s</span> dream it up.</h3>
				<p>
					Share mood boards, Pinterest pins, or brand guidelines in the booking
					form. We&apos;ll curate a bespoke cleaning and styling plan that matches
					your aesthetic.
				</p>
				<NavLink to="/booking" className="btn btn--primary">
					Tell us what you need
				</NavLink>
			</section>
		</div>
	);
}
