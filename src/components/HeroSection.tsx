import { Link } from 'react-router-dom';
import { ArrowRight, Tv, Radio, Layers } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function HeroSection({ onOpenQuoteModal }: HeroSectionProps) {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Subtle architectural grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(2, 132, 199, 0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.2), transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <p className="text-xs sm:text-sm font-semibold text-sky-400 tracking-wide">
              Powerful Live Video Broadcasting
            </p>

            <h1
              className="font-display font-extrabold text-white tracking-tight balance-text leading-[1.14]"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 3rem)' }}
            >
              Professional Live Broadcasting Solutions for Every Event
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Stream your events to audiences across platforms with professional production,
              reliable delivery, and crystal-clear video quality.
            </p>

            {/* Primary & Secondary CTAs (Full-width 48px touch targets on mobile, inline on desktop) */}
            <div className="pt-1 sm:pt-2 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:scale-[0.99] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <Link
                to="/services"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] border border-slate-700 rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Quiet unboxed technical capability summary */}
            <div className="pt-3 sm:pt-4 border-t border-slate-800/90 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
              <span>Multi-Camera SDI Switching</span>
              <span aria-hidden="true">·</span>
              <span>RTMP / HLS Simulcast Delivery</span>
              <span aria-hidden="true">·</span>
              <span>Real-Time Scorecards &amp; CG Overlays</span>
            </div>
          </div>

          {/* Right Column: Broadcast Production Visual Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-2xl">
              {/* Top Monitor Frame Bar */}
              <div className="flex items-center justify-between gap-2 px-2 pb-2.5 text-xs text-slate-400 font-mono-tech">
                <span className="whitespace-nowrap truncate">PROGRAM CONTROL · MULTI-VIEW STUDIO</span>
                <span className="hidden sm:inline whitespace-nowrap shrink-0">1080p60 / 4K UHD WORKFLOW</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video">
                <ResilientImage
                  src={SITE_CONFIG.assets.heroBroadcastControl}
                  alt="Professional live video broadcasting control room with multi-camera switching monitors and audio matrix"
                  loading="eager"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full bg-slate-950"
                />
              </div>

              {/* Bottom Technical Strip */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-3 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                  <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">Wireless Multicam</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">Multi-Platform</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">Live CG Graphics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
