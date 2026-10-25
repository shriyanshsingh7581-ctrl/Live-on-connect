import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';
import {
  Tv,
  Maximize2,
  Share2,
  AlertTriangle,
  Loader2,
  Play,
  RotateCcw,
  Check,
  Film,
} from 'lucide-react';
import { validateStreamUrl } from '../utils/validation';

interface VideoPlayerProps {
  streamUrl: string;
  title: string;
  subtitle?: string;
  sampleStreamUrl?: string;
  onSelectStreamUrl?: (url: string) => void;
}

export function VideoPlayer({
  streamUrl,
  title,
  subtitle,
  sampleStreamUrl,
  onSelectStreamUrl,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playerState, setPlayerState] = useState<
    'offline' | 'loading' | 'ready' | 'buffering' | 'error'
  >(streamUrl ? 'loading' : 'offline');
  const [errorDetail, setErrorDetail] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const urlCheck = validateStreamUrl(streamUrl);

  useEffect(() => {
    const videoEl = videoRef.current;
    setErrorDetail('');

    if (!urlCheck.isConfigured) {
      setPlayerState('offline');
      return;
    }

    if (!urlCheck.isValidFormat) {
      setPlayerState('error');
      setErrorDetail(urlCheck.errorMessage || 'Invalid stream URL format.');
      return;
    }

    if (!videoEl) return;

    setPlayerState('loading');
    let hlsInstance: Hls | null = null;

    if (urlCheck.protocol === 'hls') {
      if (Hls.isSupported()) {
        hlsInstance = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsInstance.loadSource(streamUrl);
        hlsInstance.attachMedia(videoEl);

        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          setPlayerState('ready');
        });

        hlsInstance.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setPlayerState('error');
            setErrorDetail(
              'Unable to load HLS stream manifest. Verify that the stream URL is active and CORS-enabled.'
            );
            hlsInstance?.destroy();
          }
        });
      } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        videoEl.src = streamUrl;
        setPlayerState('ready');
      } else {
        setPlayerState('error');
        setErrorDetail('This browser does not support HLS playback.');
      }
    } else {
      videoEl.src = streamUrl;
      setPlayerState('ready');
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [streamUrl, urlCheck.isConfigured, urlCheck.isValidFormat, urlCheck.protocol]);

  const handleFullscreen = () => {
    const target = containerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (target.requestFullscreen) {
      target.requestFullscreen().catch(() => {});
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      }
    } catch {
      setCopiedShare(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl text-white"
    >
      {/* Top Broadcast Status Bar (Honest state indicator—never fakes LIVE when offline) */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech font-semibold text-slate-300">
            STATUS:{' '}
            {playerState === 'ready' || playerState === 'buffering'
              ? 'STREAM SOURCE CONNECTED'
              : playerState === 'loading'
              ? 'CONNECTING TO STREAM'
              : playerState === 'error'
              ? 'STREAM PLAYBACK ERROR'
              : 'OFFLINE · NO ACTIVE BROADCAST'}
          </span>
          {subtitle && (
            <>
              <span className="text-slate-700" aria-hidden="true">
                ·
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">{subtitle}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span>Share Event</span>
              </>
            )}
          </button>

          {(playerState === 'ready' || playerState === 'buffering') && (
            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Toggle fullscreen player"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>Fullscreen</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport Area */}
      <div className="relative min-h-[340px] sm:aspect-video bg-slate-950 flex items-center justify-center">
        {urlCheck.isConfigured && urlCheck.isValidFormat ? (
          <>
            <video
              ref={videoRef}
              controls
              playsInline
              onWaiting={() => setPlayerState('buffering')}
              onPlaying={() => setPlayerState('ready')}
              onLoadedData={() => setPlayerState('ready')}
              onError={() => {
                setPlayerState('error');
                setErrorDetail(
                  'Media playback failed. Confirm the stream endpoint is online and accessible.'
                );
              }}
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support HTML5 video.
            </video>

            {(playerState === 'loading' || playerState === 'buffering') && (
              <div className="absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <Loader2 className="w-8 h-8 text-sky-400 animate-spin" aria-hidden="true" />
                <p className="text-xs font-mono-tech text-slate-300">
                  {playerState === 'loading'
                    ? 'Initializing stream manifest...'
                    : 'Buffering video stream...'}
                </p>
              </div>
            )}
          </>
        ) : null}

        {/* Offline / Unconfigured State */}
        {playerState === 'offline' && (
          <div className="p-6 sm:p-10 max-w-xl mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-sky-400">
              <Tv className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                No Live Broadcast Currently
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                There is no active live stream scheduled at this moment, or{' '}
                <code className="font-mono-tech text-slate-300">VITE_LIVE_STREAM_URL</code> has not
                been configured yet. Browse our past multi-camera productions in the Stream Gallery
                or load the sample HLS verification feed below.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/stream-gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Film className="w-4 h-4" aria-hidden="true" />
                <span>Explore Stream Gallery</span>
              </Link>

              {sampleStreamUrl && onSelectStreamUrl && (
                <button
                  type="button"
                  onClick={() => onSelectStreamUrl(sampleStreamUrl)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  <span>Load Sample HLS Test Stream</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error State */}
        {playerState === 'error' && (
          <div className="p-6 sm:p-10 max-w-xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-white">Stream Playback Unavailable</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{errorDetail}</p>
            {onSelectStreamUrl && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectStreamUrl('')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset to Offline State</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Event Title Bar */}
      <div className="px-4 sm:px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-slate-400 font-mono-tech mt-0.5">
            {urlCheck.isConfigured
              ? `Active Source: ${streamUrl}`
              : 'Configure VITE_LIVE_STREAM_URL in environment or use the stream tester'}
          </p>
        </div>

        {urlCheck.isConfigured && onSelectStreamUrl && (
          <button
            type="button"
            onClick={() => onSelectStreamUrl('')}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            Disconnect Test Stream
          </button>
        )}
      </div>
    </div>
  );
}
