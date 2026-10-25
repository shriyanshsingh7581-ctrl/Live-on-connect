import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Sliders, ArrowRight, Film } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEOHead } from '../components/SEOHead';
import { VideoPlayer } from '../components/VideoPlayer';
import { ResilientImage } from '../components/ResilientImage';

interface LiveStreamPageProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function LiveStreamPage({ onOpenQuoteModal }: LiveStreamPageProps) {
  const { liveStreamConfig, streamGalleryItems } = SITE_CONFIG;
  const [activeStreamUrl, setActiveStreamUrl] = useState(liveStreamConfig.defaultStreamUrl);
  const [customUrlInput, setCustomUrlInput] = useState(liveStreamConfig.defaultStreamUrl);

  const handleApplyStreamUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStreamUrl(customUrlInput.trim());
  };

  const relatedStreams = streamGalleryItems.slice(0, 3);

  return (
    <div className="bg-white">
      <SEOHead
        title="Live Stream Portal & Broadcast Player"
        description="Watch scheduled live event broadcasts or test HLS (.m3u8) stream playback with our responsive broadcast player."
        canonicalPath="/live-stream"
      />

      {/* Page Header */}
      <section className="bg-slate-950 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-sky-400">Live Stream</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Live Broadcast Transmission Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              {liveStreamConfig.eventDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuoteModal('Simulcast Live Streaming')}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Book Live Stream Production
            </button>
          </div>
        </div>
      </section>

      {/* Main Player & Stream Configuration Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <VideoPlayer
            streamUrl={activeStreamUrl}
            title={liveStreamConfig.eventTitle}
            subtitle={liveStreamConfig.eventSubtitle}
            sampleStreamUrl={liveStreamConfig.sampleTestStreamUrl}
            onSelectStreamUrl={(url) => {
              setActiveStreamUrl(url);
              setCustomUrlInput(url);
            }}
          />

          {/* Stream Endpoint Tester & Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Event Details & Schedule (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Calendar className="w-4 h-4 text-sky-600" aria-hidden="true" />
                  <h2>Broadcast Transmission Schedule (Template)</h2>
                </div>
                <span className="text-xs font-mono-tech text-slate-500">IST (UTC+5:30)</span>
              </div>

              <div className="divide-y divide-slate-100">
                {liveStreamConfig.schedule.map((slot) => (
                  <div
                    key={slot.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900">{slot.title}</p>
                      <p className="text-xs text-slate-500">
                        {slot.stage} · {slot.status}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-sky-700 shrink-0">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stream Source Configuration Control (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Sliders className="w-4 h-4 text-sky-600" aria-hidden="true" />
                <h2>HLS / MP4 Stream Source Configuration</h2>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                For production deployments, set{' '}
                <code className="font-mono-tech text-slate-900">VITE_LIVE_STREAM_URL</code> in your
                environment configuration. You can also test any public HLS (
                <code className="font-mono-tech">.m3u8</code>) or MP4 stream URL below. Never enter
                private RTMP ingest keys in client-side fields.
              </p>

              <form onSubmit={handleApplyStreamUrl} className="space-y-3">
                <div>
                  <label
                    htmlFor="custom-stream-url-input"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Public HLS (.m3u8) or MP4 Stream URL
                  </label>
                  <input
                    id="custom-stream-url-input"
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/live/stream.m3u8"
                    className="w-full px-3.5 py-2 text-xs font-mono-tech rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Connect Stream URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomUrlInput(liveStreamConfig.sampleTestStreamUrl);
                      setActiveStreamUrl(liveStreamConfig.sampleTestStreamUrl);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
                  >
                    Load Sample HLS Stream
                  </button>
                  {activeStreamUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomUrlInput('');
                        setActiveStreamUrl('');
                      }}
                      className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Streams / Previous Recordings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-sky-600 tracking-wide">
                Recorded Broadcast Demos
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Previous Recordings &amp; Sample Workflows
              </h2>
            </div>

            <Link
              to="/stream-gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              <span>Open Full Stream Gallery</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStreams.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video bg-slate-900 border-b border-slate-200">
                    <ResilientImage
                      src={item.thumbnail}
                      alt={item.thumbnailAlt}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs font-mono-tech text-slate-500">
                      {item.category} · {item.duration} · Sample
                    </p>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/stream-gallery"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700"
                  >
                    <Film className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspect in Stream Gallery</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
