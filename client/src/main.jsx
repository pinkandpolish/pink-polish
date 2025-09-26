import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Booking from './pages/Booking.jsx';
const AdminAvailability = React.lazy(() => import('./pages/AdminAvailability.jsx'));
// Fonts: Jost (free, OFL)
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/600.css';

// Use BrowserRouter; dev and Express prod both have SPA fallbacks
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'about', element: <About /> },
			{ path: 'services', element: <Services /> },
			{ path: 'booking', element: <Booking /> },
			{ path: 'privacy', element: <Privacy /> },
			{ path: 'terms', element: <Terms /> },
			{ path: 'admin', element: (
				<React.Suspense fallback={<div />}> 
					<AdminAvailability />
				</React.Suspense>
			) },
		],
	},
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// Vercel Web Analytics: track SPA route changes by watching location
if (typeof window !== 'undefined') {
	const sendPageview = () => {
		if (typeof window.va === 'function') {
			// @ts-ignore
			window.va('pageview');
		}
	};
	// Initial pageview
	sendPageview();

	let lastPath = location.pathname + location.search + location.hash;
	const notifyIfChanged = () => {
		const current = location.pathname + location.search + location.hash;
		if (current !== lastPath) {
			lastPath = current;
			sendPageview();
		}
	};
	// popstate for back/forward
	window.addEventListener('popstate', notifyIfChanged);
	// use a small MutationObserver on the root to catch Router updates
	const rootEl = document.getElementById('root');
	if (rootEl) {
		const mo = new MutationObserver(() => notifyIfChanged());
		mo.observe(rootEl, { childList: true, subtree: true });
	}
}

// Add scroll-based header opacity toggle so header blends at top and becomes more opaque after scroll
function initHeaderScroll() {
	const header = document.querySelector('.site-header');
	if (!header) return;
	let ticking = false;
		const threshold = 4; // px scrolled before header toggles — trigger almost immediately
	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrolled = window.scrollY > threshold;
				header.classList.toggle('scrolled', scrolled);
				ticking = false;
			});
			ticking = true;
		}
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	// run once to set initial state
	onScroll();
}

// Initialize after first paint so DOM is ready
if (typeof window !== 'undefined') {
	window.requestAnimationFrame(initHeaderScroll);
}
