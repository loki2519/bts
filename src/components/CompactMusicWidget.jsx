import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import BtsImage from './BtsImage';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const CompactMusicWidget = () => {
  const {
    currentTrack,
    currentAlbumName,
    currentAlbumCover,
    isPlaying,
    isWidgetActive,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolumeLevel,
    dismissWidget
  } = useMusic();

  if (!isWidgetActive || !currentTrack) return null;

  return (
    <div
      id="bts-compact-music-widget"
      className="fixed left-0 right-0 z-30 bg-[#16062c]/95 border-b border-purple-500/40 backdrop-blur-xl shadow-xl shadow-purple-950/80 text-white animate-fade-in transition-all"
      style={{
        top: 'calc(env(safe-area-inset-top) + 4.25rem)'
      }}
      role="region"
      aria-label="Active BTS Music Widget"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT: Rotating Album Cover & Track Details */}
        <div className="flex items-center space-x-2.5 min-w-0 flex-shrink">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
            <div className={`w-full h-full rounded-full overflow-hidden border-2 border-pink-400 shadow-md ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <BtsImage
                src={currentAlbumCover}
                alt={currentAlbumName}
                className="w-full h-full object-cover"
                fallbackTitle={currentAlbumName}
              />
            </div>
            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
          </div>

          <div className="min-w-0 max-w-[120px] sm:max-w-[200px] md:max-w-xs">
            <h4 className="font-display font-bold text-xs text-purple-100 truncate leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-[10px] text-purple-300/80 truncate font-semibold">
              <span className="text-pink-400">BTS</span> • {currentAlbumName}
            </p>
          </div>
        </div>

        {/* CENTER: Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center flex-1 max-w-xl px-1 sm:px-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={prevTrack}
              className="p-1 text-purple-300 hover:text-white rounded-full transition-colors active:scale-95"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-1 text-purple-300 hover:text-white rounded-full transition-colors active:scale-95"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Scrub Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono text-purple-300 mt-0.5">
            <span className="hidden xs:inline">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 240}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none bg-purple-950 cursor-pointer accent-pink-500 hover:accent-pink-400"
              aria-label="Seek track"
            />
            <span className="hidden xs:inline">{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT: Volume & Clear Close X Button */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* Desktop Volume Slider */}
          <div className="hidden md:flex items-center space-x-1.5">
            <button
              onClick={() => setVolumeLevel(volume === 0 ? 80 : 0)}
              className="p-1 text-purple-300 hover:text-white"
              aria-label="Mute/Unmute"
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-purple-300" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="w-16 h-1 rounded-lg appearance-none bg-purple-950 cursor-pointer accent-purple-500"
              aria-label="Volume"
            />
          </div>

          {/* Close/Stop X Button */}
          <button
            onClick={dismissWidget}
            className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-rose-950 border border-purple-400/30 hover:border-rose-400/50 text-purple-200 hover:text-rose-200 transition-all active:scale-90"
            title="Stop Music & Close Widget"
            aria-label="Close and stop music"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompactMusicWidget;
