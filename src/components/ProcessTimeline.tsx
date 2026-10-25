import { SITE_CONFIG } from '../config/siteConfig';

export function ProcessTimeline() {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold text-sky-600 tracking-wide">How We Work</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Our Working Process
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every live broadcast follows a disciplined four-stage engineering protocol to prevent
            signal dropouts and ensure smooth multi-platform delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {SITE_CONFIG.workingProcess.map((step, index) => (
            <div
              key={step.stepNumber}
              className="relative p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold font-mono-tech text-sky-600">
                    {step.stepNumber}
                  </span>
                  {index < SITE_CONFIG.workingProcess.length - 1 && (
                    <span
                      className="hidden lg:inline-block text-xs font-mono-tech text-slate-400"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {step.stepNumber}. {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              <ul className="pt-4 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                {step.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
