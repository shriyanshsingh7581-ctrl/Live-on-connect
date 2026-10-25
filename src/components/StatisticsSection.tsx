import { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export function StatisticsSection() {
  const { showCounters, isVerified, disclaimerText, counters } = SITE_CONFIG.statisticsConfig;
  const [countersVisible, setCountersVisible] = useState(showCounters);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setHasAnimated(true);
      setProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          let start: number | null = null;
          const duration = 700;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const nextProgress = Math.min(1, elapsed / duration);
            setProgress(nextProgress);
            if (nextProgress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      aria-label="Company Statistics"
      className="py-14 sm:py-16 bg-slate-950 text-white border-y border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <p className="text-xs font-semibold text-sky-400 tracking-wide">
              Production Capacity &amp; Milestones
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Configurable Company Statistics Band
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCountersVisible((prev) => !prev)}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              {countersVisible ? 'Hide Placeholder Counters' : 'Show Placeholder Counters'}
            </button>
          </div>
        </div>

        {!isVerified && (
          <p className="text-xs text-slate-400 leading-relaxed">
            Note: {disclaimerText}
          </p>
        )}

        {countersVisible ? (
          /* 2-Column Mobile Metric Summary Grid expanding to 4 columns on desktop */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {counters.map((counter) => {
              const displayValue = Math.round(counter.targetValue * progress);
              return (
                <div
                  key={counter.id}
                  className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 sm:space-y-2"
                >
                  <div className="text-2xl sm:text-4xl font-extrabold text-sky-400 font-mono-tech">
                    {displayValue}
                    {counter.suffix}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {counter.label}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    {counter.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
            Statistics counters are currently hidden. Update{' '}
            <code className="font-mono-tech text-sky-400">SITE_CONFIG.statisticsConfig</code> with
            verified business metrics when ready to publish.
          </div>
        )}
      </div>
    </section>
  );
}
