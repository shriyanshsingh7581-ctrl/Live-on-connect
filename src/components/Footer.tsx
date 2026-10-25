import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { NewsletterForm } from './NewsletterForm';

interface FooterProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function Footer({ onOpenQuoteModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Summary & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white whitespace-nowrap"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="32" height="32" rx="7" fill="#1E293B" />
                <path
                  d="M9 11.5C9 10.6716 9.67157 10 10.5 10H18.5C19.3284 10 20 10.6716 20 11.5V20.5C20 21.3284 19.3284 22 18.5 22H10.5C9.67157 22 9 21.3284 9 20.5V11.5Z"
                  fill="#0284C7"
                />
                <path d="M20 13.5L24.5 11V21L20 18.5V13.5Z" fill="#38BDF8" />
                <circle cx="14.5" cy="16" r="2.2" fill="#FFFFFF" />
              </svg>
              <span>{SITE_CONFIG.brand.name}</span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.brand.tagline}. End-to-end multi-camera live event coverage, simulcast
              streaming, live scorecards, and broadcast post-production workflows.
            </p>

            <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.brand.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_CONFIG.brand.primaryEmail}`}
                  className="hover:text-sky-400 transition-colors"
                >
                  {SITE_CONFIG.brand.primaryEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono-tech">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${SITE_CONFIG.brand.phone}`}
                  className="hover:text-sky-400 transition-colors"
                >
                  {SITE_CONFIG.brand.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.brand.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-white tracking-wide">Quick Links</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/live-stream" className="hover:text-white transition-colors">
                  Live Stream
                </Link>
              </li>
              <li>
                <Link to="/stream-gallery" className="hover:text-white transition-colors">
                  Stream Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal()}
                  className="text-sky-400 hover:text-sky-300 font-medium transition-colors text-left"
                >
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-white tracking-wide">Our Services</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              {SITE_CONFIG.featuredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Compact Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-white tracking-wide">Broadcast Updates</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive technical workflow guides and scheduled public broadcast notices.
            </p>
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Bottom Legal & Social Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {SITE_CONFIG.brand.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Sitemap
            </a>
            <span className="text-slate-700" aria-hidden="true">|</span>
            {SITE_CONFIG.brand.socialLinks.map((social, idx) => (
              <span key={social.label} className="inline-flex items-center gap-4">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {social.label}
                </a>
                {idx < SITE_CONFIG.brand.socialLinks.length - 1 && (
                  <span className="text-slate-700" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
