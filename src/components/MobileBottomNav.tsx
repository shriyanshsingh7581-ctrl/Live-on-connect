import { NavLink } from 'react-router-dom';
import { Home, Layers, Tv, Film, MessageSquarePlus } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

const MOBILE_TABS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Services', to: '/services', icon: Layers },
  { label: 'Live', to: '/live-stream', icon: Tv },
  { label: 'Gallery', to: '/stream-gallery', icon: Film },
];

export function MobileBottomNav({ onOpenQuoteModal }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center px-1 pb-safe shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
    >
      {MOBILE_TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `min-h-[44px] flex flex-col items-center justify-center rounded-xl transition-colors active:scale-95 ${
                isActive
                  ? 'text-sky-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              {tab.label}
            </span>
          </NavLink>
        );
      })}

      {/* 5th Thumb-Zone Slot: Primary Quote Bottom-Sheet Trigger */}
      <button
        type="button"
        onClick={() => onOpenQuoteModal()}
        aria-label="Get a Quote"
        className="min-h-[44px] mx-1 flex flex-col items-center justify-center rounded-xl bg-sky-600 text-white font-semibold active:scale-95 transition-transform shadow-xs"
      >
        <MessageSquarePlus className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">Quote</span>
      </button>
    </nav>
  );
}
