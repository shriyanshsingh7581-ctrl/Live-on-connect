import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top of page"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 w-11 h-11 rounded-xl bg-slate-900/90 backdrop-blur-xs text-white border border-slate-700 shadow-lg hover:bg-sky-600 active:scale-95 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
