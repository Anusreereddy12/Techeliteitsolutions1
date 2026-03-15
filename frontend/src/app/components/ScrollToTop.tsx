// ── src/components/ScrollToTop.tsx ───────────────────────────────────────
// Scrolls to top on every route change automatically.
// Drop this inside <BrowserRouter> in App.tsx — no props needed.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}