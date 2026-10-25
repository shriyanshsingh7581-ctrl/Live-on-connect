import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';

export function AboutSection() {
  const highlights = [
    {
      title: 'Professional Production Workflows',
      detail: 'Structured pre-event planning, camera shading, and hardware vision switching.',
    },
    {
      title: 'Multi-Camera Coverage',
      detail: 'Synchronized fixed and roaming wireless SDI cameras for complete stage angles.',
    },
    {
      title: 'Reliable Streaming & Audience Engagement',
      detail: 'Clean audio capture, custom lower thirds, scorecards, and multi-platform delivery.',
    },
    {
      title: 'End-to-End Media Solutions',
      detail: 'From on-site live acquisition to post-event editing, color grading, and VOD masters.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Image Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 min-h-[340px]">
              <ResilientImage
                src={SITE_CONFIG.assets.aboutMulticamStage}
                alt="Broadcast cinema camera rig with wireless video transmitter covering a live stage event"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-6 text-white">
                <p className="text-xs font-mono-tech text-sky-400">
                  FIELD &amp; STUDIO PRODUCTION CREW
                </p>
                <p className="text-sm font-medium text-slate-200 mt-1">
                  Equipped for corporate conventions, academic convocations, sports tournaments,
                  and cultural stages.
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-sky-600 tracking-wide">About Us</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight balance-text">
                We Bring Your Events to Life Through Technology
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              {SITE_CONFIG.brand.name} partners with organizations, businesses, event organizers,
              educators, and content creators to broadcast live events with broadcast-grade clarity.
              Whether you are hosting an executive town hall, a regional sports championship, or a
              multi-day academic symposium, our engineering team handles every link in the signal
              chain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-sky-600" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
