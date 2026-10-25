import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface HeaderProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Live Stream', to: '/live-stream' },
  { label: 'Stream Gallery', to: '/stream-gallery' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export function Header({ onOpenQuoteModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Information Bar (Desktop only to keep mobile sticky footprint compact) */}
      <div className="hidden lg:block bg-slate-950 text-slate-300 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE_CONFIG.brand.primaryEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>{SITE_CONFIG.brand.primaryEmail}</span>
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a
              href={`tel:${SITE_CONFIG.brand.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 font-mono-tech"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>{SITE_CONFIG.brand.phone}</span>
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 whitespace-nowrap shrink-0">
              <MapPin className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>{SITE_CONFIG.brand.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-slate-400 whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>{SITE_CONFIG.brand.workingHours}</span>
            </span>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <div className="flex items-center gap-3">
              {SITE_CONFIG.brand.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (single text lockup with original SVG broadcast mark) */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 rounded"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="7" fill="#0F172A" />
            <path
              d="M9 11.5C9 10.6716 9.67157 10 10.5 10H18.5C19.3284 10 20 10.6716 20 11.5V20.5C20 21.3284 19.3284 22 18.5 22H10.5C9.67157 22 9 21.3284 9 20.5V11.5Z"
              fill="#0284C7"
            />
            <path d="M20 13.5L24.5 11V21L20 18.5V13.5Z" fill="#38BDF8" />
            <circle cx="14.5" cy="16" r="2.2" fill="#FFFFFF" />
          </svg>
          <span>{SITE_CONFIG.brand.name}</span>
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                  isActive
                    ? 'text-sky-600 border-sky-600 font-semibold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Get a Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
            >
              Get a Quote
            </button>

            <div className="text-xs text-slate-500 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                <a href={`mailto:${SITE_CONFIG.brand.primaryEmail}`} className="hover:underline">
                  {SITE_CONFIG.brand.primaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 font-mono-tech">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                <a href={`tel:${SITE_CONFIG.brand.phone}`} className="hover:underline">
                  {SITE_CONFIG.brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.brand.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
