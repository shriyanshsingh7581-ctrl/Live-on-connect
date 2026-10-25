import { Link } from 'react-router-dom';
import {
  Camera,
  Share2,
  Film,
  Compass,
  Activity,
  Sliders,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItem } from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';

interface ServiceCardProps {
  service: ServiceItem;
  onRequestQuote?: (serviceTitle: string) => void;
}

const ICON_MAP = {
  Camera,
  Share2,
  Film,
  Compass,
  Activity,
  Sliders,
};

export function ServiceCard({ service, onRequestQuote }: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.iconName] || Camera;

  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-500/60 transition-all duration-150 flex flex-col">
      {/* Service Visual Thumbnail */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden border-b border-slate-200">
        <ResilientImage
          src={service.image}
          alt={service.imageAlt}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          containerClassName="w-full h-full"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono-tech">
            <span>{service.number}. Broadcast Service</span>
            <IconComponent className="w-4 h-4 text-sky-600" aria-hidden="true" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">{service.shortDescription}</p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            to={`/services#${service.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          {onRequestQuote && (
            <button
              type="button"
              onClick={() => onRequestQuote(service.title)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Get a Quote
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
