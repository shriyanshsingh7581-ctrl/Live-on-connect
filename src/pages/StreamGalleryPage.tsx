import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { VideoGallery } from '../components/VideoGallery';

interface StreamGalleryPageProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function StreamGalleryPage({ onOpenQuoteModal }: StreamGalleryPageProps) {
  return (
    <div className="bg-white">
      <SEOHead
        title="Stream Gallery & Broadcast Production Archive"
        description="Browse our sample live broadcast gallery featuring multi-camera conferences, live sports scorecards, cultural stage setups, and educational VOD packages."
        canonicalPath="/stream-gallery"
      />

      {/* Page Hero */}
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-sky-400">Stream Gallery</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Stream Gallery &amp; Production Showcase
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Filter by event category, search by technical workflow, and test live HLS stream
              playback across our sample production entries.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            Request a Quote for Your Event
          </button>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <VideoGallery />
        </div>
      </section>
    </div>
  );
}
