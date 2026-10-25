import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../config/siteConfig';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-btn-${item.id}`;

        return (
          <div key={item.id} className="p-5 sm:p-6">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 rounded"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono-tech text-sky-600">{item.category}</span>
                  <p className="text-base font-bold text-slate-900">{item.question}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-sky-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
