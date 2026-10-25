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
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-2xl my-8">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono-tech text-sky-400">BROADCAST PRODUCTION ESTIMATE</p>
            <h2 id="quote-modal-heading" className="text-lg font-bold text-white mt-0.5">
              Request a Custom Broadcast Quote
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote request modal"
            className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 max-h-[82vh] overflow-y-auto">
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </div>
  );
}
