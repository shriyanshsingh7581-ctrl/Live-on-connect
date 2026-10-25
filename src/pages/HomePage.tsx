import { Link } from 'react-router-dom';
import { Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEOHead } from '../components/SEOHead';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServiceCard } from '../components/ServiceCard';
import { FeatureCard } from '../components/FeatureCard';
import { StatisticsSection } from '../components/StatisticsSection';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { TestimonialSection } from '../components/TestimonialSection';
import { NewsletterForm } from '../components/NewsletterForm';

interface HomePageProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function HomePage({ onOpenQuoteModal }: HomePageProps) {
  const { appDownloadConfig } = SITE_CONFIG;
  const hasPublishedAppUrl = Boolean(
    appDownloadConfig.googlePlayUrl && appDownloadConfig.googlePlayUrl.trim().length > 0
  );

  return (
    <div>
      <SEOHead
        title="Professional Live Broadcasting Solutions for Every Event"
        description="Stream your events to audiences across platforms with professional multi-camera production, reliable delivery, live scorecards, and crystal-clear video quality."
        canonicalPath="/"
      />

      {/* Section A — Hero Banner */}
      <HeroSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* Section B — About Us */}
      <AboutSection />

      {/* Section C — Featured Services */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-sky-600 tracking-wide">
                Core Broadcast Capabilities
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Our Featured Services
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Professional broadcasting and media production solutions tailored to your needs.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 whitespace-nowrap shrink-0"
            >
              <span>View All Service Specifications</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE_CONFIG.featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onRequestQuote={(serviceTitle) => onOpenQuoteModal(serviceTitle)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section D — Our Features */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-sky-600 tracking-wide">
              Broadcast Infrastructure &amp; Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Advanced Features for Professional Streaming
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every broadcast workflow is engineered around your venue and audience. Feature
              availability depends on the selected service package, on-site equipment, venue
              network infrastructure, and configured streaming provider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SITE_CONFIG.advancedFeatures.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Section E — Company Statistics */}
      <StatisticsSection />

      {/* Section F — Call to Action */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold text-sky-400 tracking-wide">
                Book Your Production Crew
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight balance-text">
                Let's Make Your Next Event Unforgettable
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Tell us about your event and discover a broadcasting solution designed around your
                audience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3.5 sm:gap-4 shrink-0 w-full lg:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 active:scale-[0.99] rounded-xl transition-all whitespace-nowrap shrink-0"
              >
                Get Started
              </Link>
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:scale-[0.99] rounded-xl transition-all whitespace-nowrap shrink-0"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section G — How We Work */}
      <ProcessTimeline />

      {/* Section H — Client Testimonials / Project Highlights */}
      <TestimonialSection />

      {/* Section I — App Download (Rendered only when a real published Google Play URL is configured) */}
      {hasPublishedAppUrl && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-2xl bg-slate-950 text-white border border-slate-800">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-xs font-semibold text-sky-400 tracking-wide">
                  Mobile Broadcast Companion
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {appDownloadConfig.heading}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  {appDownloadConfig.description}
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  {appDownloadConfig.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <a
                    href={appDownloadConfig.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors"
                  >
                    <Smartphone className="w-4 h-4" aria-hidden="true" />
                    <span>Get it on Google Play</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-64 rounded-3xl bg-slate-900 border-4 border-slate-800 p-4 space-y-3">
                  <div className="h-32 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono-tech text-sky-400">
                    MOBILE STREAM MONITOR
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-3/4 bg-slate-800 rounded" />
                    <div className="h-2.5 w-1/2 bg-slate-800/70 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section J — Newsletter */}
      <NewsletterForm variant="section" />
    </div>
  );
}
