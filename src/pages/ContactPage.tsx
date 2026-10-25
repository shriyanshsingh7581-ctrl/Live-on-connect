import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageSquare, Server } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { isValidWhatsAppNumber } from '../utils/validation';
import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { QuoteForm } from '../components/QuoteForm';

export function ContactPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'quote'>('contact');
  const hasValidWhatsApp = isValidWhatsAppNumber(SITE_CONFIG.brand.whatsappNumber);
  const whatsappDigits = SITE_CONFIG.brand.whatsappNumber.replace(/\D/g, '');
  const encodedMapAddress = encodeURIComponent(SITE_CONFIG.brand.address);

  return (
    <div className="bg-white">
      <SEOHead
        title="Contact Our Broadcast Production Desk & Request a Quote"
        description="Contact YOUR MEDIA BRAND to plan your next multi-camera live broadcast, simulcast stream, or video production project."
        canonicalPath="/contact"
      />

      {/* Page Hero */}
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-sky-400">Contact</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact &amp; Production Booking Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Share your event schedule, venue location, and streaming requirements. Our engineering
            team will prepare a tailored multi-camera and streaming proposal.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Contact Details, WhatsApp & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-5">
                <h2 className="text-lg font-bold text-slate-900">Direct Contact Information</h2>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Primary Email</p>
                      <a
                        href={`mailto:${SITE_CONFIG.brand.primaryEmail}`}
                        className="font-semibold text-slate-900 hover:text-sky-600 transition-colors"
                      >
                        {SITE_CONFIG.brand.primaryEmail}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Phone Desk</p>
                      <a
                        href={`tel:${SITE_CONFIG.brand.phone}`}
                        className="font-semibold text-slate-900 hover:text-sky-600 transition-colors font-mono-tech"
                      >
                        {SITE_CONFIG.brand.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Business Location</p>
                      <p className="font-semibold text-slate-900">{SITE_CONFIG.brand.address}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Working Hours</p>
                      <p className="font-semibold text-slate-900">
                        {SITE_CONFIG.brand.workingHours}
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Conditional WhatsApp Option */}
                <div className="pt-4 border-t border-slate-100">
                  {hasValidWhatsApp ? (
                    <a
                      href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                        `Hello ${SITE_CONFIG.brand.name}, I would like to enquire about live broadcasting services.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>Chat with Production Desk on WhatsApp</span>
                    </a>
                  ) : (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-semibold text-slate-700">WhatsApp Integration:</span>{' '}
                      Configure a verified business number in{' '}
                      <code className="font-mono-tech">VITE_WHATSAPP_NUMBER</code> (or{' '}
                      <code className="font-mono-tech">siteConfig.ts</code>) to enable direct
                      WhatsApp chat.
                    </p>
                  )}
                </div>
              </div>

              {/* Backend Delivery Notice */}
              <div className="p-5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-mono-tech text-sky-400 font-semibold">
                  <Server className="w-4 h-4" aria-hidden="true" />
                  <span>BACKEND SUBMISSION &amp; PRIVACY</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  All enquiries and quote requests are validated and recorded privately by the
                  Express server (<code className="font-mono-tech">/api/contact</code> and{' '}
                  <code className="font-mono-tech">/api/quote</code>). To forward notifications to
                  external email/CRM systems in production, configure{' '}
                  <code className="font-mono-tech">WEBHOOK_URL</code> in <code className="font-mono-tech">.env</code>.
                </p>
              </div>

              {/* Map Embed using configured address */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">Location Map</span>
                  <span>{SITE_CONFIG.brand.address}</span>
                </div>
                <iframe
                  title={`Map location for ${SITE_CONFIG.brand.address}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=72.0%2C8.0%2C85.0%2C28.0&layer=mapnik&marker=20.5937%2C78.9629&query=${encodedMapAddress}`}
                  className="w-full h-60 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Column: Contact Form & Quote Request Form Switcher (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {activeTab === 'contact'
                      ? 'Send an Event Enquiry'
                      : 'Request a Detailed Broadcast Quote'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fields marked with <span className="text-rose-600">*</span> are required.
                  </p>
                </div>

                {/* Form Mode Selector */}
                <div
                  role="group"
                  aria-label="Select enquiry form type"
                  className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'contact'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Contact Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('quote')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'quote'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Quote Request Form
                  </button>
                </div>
              </div>

              {activeTab === 'contact' ? <ContactForm /> : <QuoteForm />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
