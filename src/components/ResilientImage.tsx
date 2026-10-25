import { useState } from 'react';
import { Tv } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-slate-900',
  loading = 'lazy',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 bg-slate-900 text-slate-300 border border-slate-800"
        >
          <Tv className="w-10 h-10 text-sky-400 mb-3" aria-hidden="true" />
          <span className="text-sm font-medium text-center text-slate-200">
            {fallbackLabel || alt}
          </span>
        </div>
      )}
    </div>
  );
}
