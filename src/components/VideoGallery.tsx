import { useState } from 'react';
import { Search, Play, FileText, X } from 'lucide-react';
import { SITE_CONFIG, type GalleryVideoItem } from '../config/siteConfig';
import { filterGalleryItems } from '../utils/validation';
import { ResilientImage } from './ResilientImage';
import { VideoPlayer } from './VideoPlayer';

const CATEGORIES = [
  'All',
  'Conferences & Summits',
  'Sports & Scorecards',
  'Corporate Events',
  'Cultural & Stage',
  'Educational Broadcasts',
];

export function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeItem, setActiveItem] = useState<GalleryVideoItem | null>(null);

  const filteredItems = filterGalleryItems(
    SITE_CONFIG.streamGalleryItems,
    selectedCategory,
    searchQuery
  );
  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Sample Data Transparency Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div>
          <span className="font-semibold text-slate-900">Sample Demonstration Catalog:</span> All
          entries below are clearly marked sample workflows. Entries with a configured stream URL
          play a real HLS verification stream; entries without a stream source display technical
          production notes without pretending to be playable videos.
        </div>
        <span className="font-mono-tech text-slate-500 whitespace-nowrap shrink-0">
          {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Found
        </span>
      </div>

      {/* Filter & Search Toolbar (Horizontal Touch Scroller on Mobile) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
        {/* Category Filter Buttons (Single-line horizontal scroller on mobile) */}
        <div
          role="group"
          aria-label="Filter stream gallery by category"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 bg-slate-100 rounded-2xl"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(4);
                }}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Input (46px touch height on mobile) */}
        <div className="relative w-full lg:w-72">
          <label htmlFor="gallery-search-input" className="sr-only">
            Search stream gallery
          </label>
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="gallery-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(4);
            }}
            placeholder="Search events, scorecards, 360°..."
            className="w-full min-h-[46px] pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600"
          />
        </div>
      </div>

      {/* Video Cards Grid */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {displayedItems.map((item) => {
            const hasPlayableVideo = Boolean(item.videoUrl);
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-sky-500/60 transition-colors"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900 border-b border-slate-200 overflow-hidden">
                    <ResilientImage
                      src={item.thumbnail}
                      alt={item.thumbnailAlt}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                    {/* Clean unboxed inline metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-mono-tech">
                      <span className="text-sky-700 font-semibold">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.resolution}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700">Sample Data</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-mono-tech truncate">
                    {hasPlayableVideo ? 'HLS Stream Ready' : 'Spec Record Only'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                      hasPlayableVideo
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {hasPlayableVideo ? (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Play Sample Stream</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>View Production Spec</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="p-10 sm:p-12 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-base font-bold text-slate-900">
            No matching broadcast entries found
          </p>
          <p className="text-sm text-slate-600">
            Try clearing your search query or selecting a different event category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setVisibleCount(4);
            }}
            className="min-h-[44px] px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More / Pagination Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
        <p className="text-xs text-slate-500 font-mono-tech">
          Showing {displayedItems.length} of {filteredItems.length} sample entries
        </p>

        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.99] border border-slate-300 rounded-xl transition-all whitespace-nowrap shrink-0"
          >
            Load More Archives ({filteredItems.length - displayedItems.length} remaining)
          </button>
        )}
      </div>

      {/* Video Detail & Playback Bottom-Sheet Modal on Mobile */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="bg-white rounded-t-3xl sm:rounded-2xl border-t sm:border border-slate-200 max-w-4xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Mobile Drag Handle */}
            <div className="sm:hidden bg-slate-900 pt-2.5 pb-1 flex justify-center">
              <div className="w-10 h-1.5 bg-slate-600 rounded-full" aria-hidden="true" />
            </div>

            <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
              <div className="min-w-0">
                <p className="text-[11px] text-sky-400 font-mono-tech truncate">
                  {activeItem.category} · {activeItem.date} · Sample Entry
                </p>
                <h2 id="gallery-modal-title" className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">
                  {activeItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close video detail modal"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto pb-8 sm:pb-6">
              {activeItem.videoUrl ? (
                <VideoPlayer
                  streamUrl={activeItem.videoUrl}
                  title={activeItem.title}
                  subtitle={`${activeItem.resolution} · ${activeItem.duration}`}
                />
              ) : (
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <p className="text-xs font-mono-tech text-amber-400">
                    NO VIDEO FILE ATTACHED TO THIS SAMPLE RECORD
                  </p>
                  <h3 className="text-lg font-bold">
                    Production Specification Overview
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeItem.productionNotes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-semibold text-slate-500">Event Description</p>
                  <p className="text-slate-700 leading-relaxed">{activeItem.shortDescription}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-semibold text-slate-500">Engineering Notes</p>
                  <p className="text-slate-700 leading-relaxed">{activeItem.productionNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
