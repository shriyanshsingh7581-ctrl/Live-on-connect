import { Link } from 'react-router-dom';
import { CheckCircle2, Cpu, Briefcase } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEOHead } from '../components/SEOHead';
import { ServiceCard } from '../components/ServiceCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { ResilientImage } from '../components/ResilientImage';

interface ServicesPageProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function ServicesPage({ onOpenQuoteModal }: ServicesPageProps) {
  return (
    <div className="bg-white">
      <SEOHead
        title="Live Broadcasting, Multicam, Simulcast & Post-Production Services"
        description="Explore our six core live broadcasting and video production services: Wireless Multicam Live, Simulcast Streaming, Film Production, 360 Degree Live, Live Scorecards, and Post Production."
        canonicalPath="/services"
      />

      {/* Services Hero */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-sky-400">Services</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight balance-text">
            Broadcast &amp; Media Production Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Comprehensive multi-camera acquisition, real-time graphics, multi-destination
            streaming, and post-production solutions engineered for reliability.
          </p>
        </div>
      </section>

      {/* Six Featured Services Overview Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-sky-600 tracking-wide">Service Directory</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Six Core Broadcast Solutions
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-mono-tech">
              Select any card to jump to full technical specifications below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE_CONFIG.featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onRequestQuote={(title) => onOpenQuoteModal(title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Specification Sections */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {SITE_CONFIG.featuredServices.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={service.id}
                id={service.slug}
                className="scroll-mt-24 pt-4 border-t first:border-t-0 first:pt-0 border-slate-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3]">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Detailed Content Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="space-y-2">
                      <span className="text-xs font-mono-tech text-sky-600 font-semibold">
                        SERVICE SPECIFICATION {service.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {service.title}
                      </h2>
                      <p className="text-base text-slate-600 leading-relaxed">
                        {service.fullDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Benefits */}
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                          <CheckCircle2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
                          <span>Key Production Benefits</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2">
                              <span className="text-sky-600 font-bold" aria-hidden="true">
                                ·
                              </span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                          <Briefcase className="w-4 h-4 text-sky-600" aria-hidden="true" />
                          <span>Primary Use Cases</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                          {service.useCases.map((useCase) => (
                            <li key={useCase} className="flex items-start gap-2">
                              <span className="text-sky-600 font-bold" aria-hidden="true">
                                ·
                              </span>
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technical Capabilities */}
                    <div className="p-5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono-tech text-sky-400">
                        <Cpu className="w-4 h-4" aria-hidden="true" />
                        <span>TECHNICAL CAPABILITIES &amp; SIGNAL WORKFLOW</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                        {service.technicalSpecs.map((spec) => (
                          <li
                            key={spec}
                            className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800"
                          >
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => onOpenQuoteModal(service.title)}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        Request a Quote for {service.title}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold text-sky-600 tracking-wide">
              Frequently Asked Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Technical &amp; Booking Questions
            </h2>
            <p className="text-sm text-slate-600">
              Answers to common questions about venue internet requirements, camera setups, and
              deliverables.
            </p>
          </div>

          <FAQAccordion items={SITE_CONFIG.faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Need a Custom Multi-Service Broadcast Package?</h2>
            <p className="text-sm text-slate-400">
              Combine Wireless Multicam, Live Scorecards, and Simulcast Streaming into a unified
              production plan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal('Full Multi-Camera & Simulcast Package')}
            className="px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Request a Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
}
