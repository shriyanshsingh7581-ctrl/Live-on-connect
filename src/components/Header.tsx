import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface HeaderProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', to: '/', subtitle: 'Broadcast solutions overview' },
  { label: 'About', to: '/about', subtitle: 'Company & engineering crew' },
  { label: 'Live Stream', to: '/live-stream', subtitle: 'HLS player & event schedule' },
  { label: 'Stream Gallery', to: '/stream-gallery', subtitle: 'Sample broadcast archives' },
  { label: 'Services', to: '/services', subtitle: 'Multicam, simulcast & scorecards' },
  { label: 'Contact', to: '/contact', subtitle: 'Production desk & location map' },
];

export function Header({ onOpenQuoteModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Information Bar (Desktop only so mobile sticky height stays strictly under 15%) */}
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

      {/* Main 3-Zone Navigation Bar (52px compact on mobile, 64px on desktop) */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-[52px] md:h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 rounded"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#0F172A" />
            <path
              d="M9 11.5C9 10.6716 9.67157 10 10.5 10H18.5C19.3284 10 20 10.6716 20 11.5V20.5C20 21.3284 19.3284 22 18.5 22H10.5C9.67157 22 9 21.3284 9 20.5V11.5Z"
              fill="#0284C7"
            />
            <path d="M20 13.5L24.5 11V21L20 18.5V13.5Z" fill="#38BDF8" />
            <circle cx="14.5" cy="16" r="2.2" fill="#FFFFFF" />
          </svg>
          <span className="truncate max-w-[190px] sm:max-w-none">{SITE_CONFIG.brand.name}</span>
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

        {/* Zone 3: Primary Action & Mobile App Bar Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Get a Quote
          </button>

          {/* Mobile Quick Call Action (44x44px hitbox) */}
          <a
            href={`tel:${SITE_CONFIG.brand.phone}`}
            aria-label={`Call ${SITE_CONFIG.brand.phone}`}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5 text-sky-600" aria-hidden="true" />
          </a>

          {/* Mobile Menu Drawer Button (44x44px hitbox) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Touch-First Navigation Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 shadow-xl max-h-[82vh] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="divide-y divide-slate-100">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `min-h-[56px] py-2.5 px-2 flex items-center justify-between gap-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-sky-50/80 text-sky-700 font-semibold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{item.label}</p>
                  <p className="text-xs text-slate-500 truncate">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full min-h-[48px] px-4 text-center text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:scale-[0.99] rounded-xl transition-all shadow-sm"
            >
              Get a Quote
            </button>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                <a href={`mailto:${SITE_CONFIG.brand.primaryEmail}`} className="font-medium hover:underline">
                  {SITE_CONFIG.brand.primaryEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 font-mono-tech">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                <a href={`tel:${SITE_CONFIG.brand.phone}`} className="font-medium hover:underline">
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
