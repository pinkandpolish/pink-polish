import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();

  // Prevent the browser from restoring scroll position automatically
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  // Scroll behavior on route change
  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Try immediately, then again on next frame in case content renders after navigation
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        requestAnimationFrame(() => {
          tryScroll();
        });
      }
    } else {
      // Default: jump to top on pathname/search change
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
}
