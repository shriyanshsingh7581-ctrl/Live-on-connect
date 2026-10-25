import {
  Monitor,
  Navigation,
  PlaySquare,
  BookOpen,
  Globe,
  Layers,
  Radio,
  Tv,
  Cpu,
  Code2,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import type { FeatureItem } from '../config/siteConfig';

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const FEATURE_ICONS = {
  Monitor,
  Navigation,
  PlaySquare,
  BookOpen,
  Globe,
  Layers,
  Radio,
  Tv,
  Cpu,
  Code2,
  ShieldCheck,
  Headphones,
};

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = FEATURE_ICONS[feature.iconName] || Tv;
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="p-5 rounded-xl bg-white border border-slate-200 hover:border-sky-500/50 transition-colors flex flex-col justify-between space-y-3">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="text-xs font-mono-tech text-slate-400">{formattedNumber}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
      </div>

      <p className="pt-2 border-t border-slate-100 text-xs text-slate-500 leading-snug">
        {feature.availabilityNote}
      </p>
    </div>
  );
}
