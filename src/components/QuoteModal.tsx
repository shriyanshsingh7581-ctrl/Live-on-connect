import { useEffect } from 'react';
import { X } from 'lucide-react';
import { QuoteForm } from './QuoteForm';

interface QuoteModalProps {
  isOpen: boolean;
  defaultService?: string;
  onClose: () => void;
}

export function QuoteModal({ isOpen, defaultService, onClose }: QuoteModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-heading"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl border-t sm:border border-slate-200 max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Mobile Bottom Sheet Drag Handle Affordance */}
        <div className="sm:hidden bg-slate-900 pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1.5 bg-slate-600 rounded-full" aria-hidden="true" />
        </div>

        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div>
            <p className="text-[11px] font-mono-tech text-sky-400">BROADCAST PRODUCTION ESTIMATE</p>
            <h2 id="quote-modal-heading" className="text-base sm:text-lg font-bold text-white mt-0.5">
              Request a Custom Broadcast Quote
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote request modal"
            className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto pb-8 sm:pb-6">
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </div>
  );
}
