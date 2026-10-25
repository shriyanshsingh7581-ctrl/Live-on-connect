import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function TestimonialSection() {
  const { defaultMode, sampleDisclaimer, sampleTestimonials, projectHighlights } =
    SITE_CONFIG.testimonialsConfig;
  const [viewMode, setViewMode] = useState<'highlights' | 'sample_testimonials'>(defaultMode);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? sampleTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === sampleTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-sky-600 tracking-wide">
              Client Feedback &amp; Production Highlights
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{sampleDisclaimer}</p>
          </div>

          {/* Interactive Mode Switcher (Segmented Control) */}
          <div
            role="group"
            aria-label="Feedback display mode"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start"
          >
            <button
              type="button"
              onClick={() => setViewMode('highlights')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'highlights'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Project Highlights
            </button>
            <button
              type="button"
              onClick={() => setViewMode('sample_testimonials')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'sample_testimonials'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sample Testimonials Layout
            </button>
          </div>
        </div>

        {viewMode === 'highlights' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectHighlights.map((highlight, idx) => (
              <article
                key={highlight.id}
                className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 font-mono-tech">
                    <span>0{idx + 1}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{highlight.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{highlight.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {highlight.workflowSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs font-mono-tech text-sky-700">
                  {highlight.technicalSetup}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {sampleTestimonials.map((item, idx) => {
                const isFocused = idx === activeIndex;
                return (
                  <article
                    key={item.id}
                    className={`p-6 rounded-xl bg-white border transition-colors flex flex-col justify-between space-y-5 ${
                      isFocused ? 'border-sky-600 shadow-sm' : 'border-slate-200 opacity-85'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-amber-700 font-medium">
                        <span>Sample Placeholder Template · {item.eventContext}</span>
                        <Quote className="w-4 h-4 text-slate-300" aria-hidden="true" />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{item.clientName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.roleOrCompany}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-mono-tech">
                Showing sample card {activeIndex + 1} of {sampleTestimonials.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous sample testimonial"
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next sample testimonial"
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
