import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollToHash = (hash) => {
  const id = hash.replace('#', '');
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth' });
  return true;
};

export const useRouteScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/' && hash) {
      if (scrollToHash(hash)) return undefined;
      const timers = [50, 150, 350, 700].map((ms) =>
        setTimeout(() => scrollToHash(hash), ms)
      );
      return () => timers.forEach(clearTimeout);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
};
