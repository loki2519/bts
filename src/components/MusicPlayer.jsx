import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Repeat, Repeat1, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import BtsImage from './BtsImage';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const MusicPlayer = () => {
  const {
    currentTrack,
    currentAlbumName,
    currentAlbumCover,
    isPlaying,
    currentTime,
    duration,
    volume,
    loopMode,
    audioError,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolumeLevel,
    toggleLoopMode
  } = useMusic();

  if (!currentTrack) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#120524]/98 border-t border-purple-500/40 backdrop-blur-2xl px-3 sm:px-6 py-2.5 shadow-2xl shadow-purple-950/90 text-white animate-fade-in"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="BTS Global Music Player"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        
        {/* LEFT SECTION: Rotating Circular Album Artwork & Song Info */}
        <div className="flex items-center space-x-3 w-full md:w-1/4 justify-between md:justify-start">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Circular Rotating Album Cover */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
              <div className={`w-full h-full rounded-full overflow-hidden border-2 border-purple-400/80 shadow-lg ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <BtsImage
                  src={currentAlbumCover}
                  alt={currentAlbumName}
                  className="w-full h-full object-cover"
                  fallbackTitle={currentAlbumName}
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
            </div>

            {/* Song, Artist & Album Information */}
            <div className="min-w-0 flex-1">
              <h4 className="font-display font-bold text-xs sm:text-sm text-purple-100 truncate">
                {currentTrack.title}
              </h4>
              <div className="text-[10px] sm:text-xs text-purple-300/80 truncate flex items-center gap-1 font-medium">
                <span className="text-pink-400 font-extrabold">BTS</span>
                <span>•</span>
                <span className="truncate">{currentAlbumName}</span>
              </div>
            </div>
          </div>

          {/* Mobile Fast Play/Pause Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md active:scale-95"
              aria-label={isPlaying ? "Pause Track" : "Play Track"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* CENTER SECTION: Controls & Interactive Progress Bar */}
        <div className="flex flex-col items-center w-full md:w-2/4 space-y-1">
          {audioError && (
            <div className="text-[10px] text-rose-300 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              <span>{audioError}</span>
            </div>
          )}

          {/* Playback Control Buttons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Loop Mode Toggle */}
            <button
              onClick={toggleLoopMode}
              className={`p-1.5 rounded-lg transition-all relative ${
                loopMode !== 'off'
                  ? 'text-pink-400 font-bold bg-purple-900/60 border border-purple-400/40'
                  : 'text-purple-400 hover:text-white'
              }`}
              title={`Loop Mode: ${loopMode.toUpperCase()}`}
              aria-label={`Loop Mode: ${loopMode.toUpperCase()}`}
            >
              {loopMode === 'track' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              {loopMode !== 'off' && (
                <span className="absolute -bottom-1 -right-1 text-[8px] bg-pink-500 text-white rounded-full px-1 font-extrabold leading-none">
                  {loopMode === 'track' ? '1' : 'A'}
                </span>
              )}
            </button>

            {/* Previous Track Button */}
            <button
              onClick={prevTrack}
              className="p-1.5 text-purple-300 hover:text-white hover:bg-purple-900/40 rounded-full transition-colors active:scale-95"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Desktop Play / Pause Main Button */}
            <button
              onClick={togglePlay}
              className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white items-center justify-center shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {/* Next Track Button */}
            <button
              onClick={nextTrack}
              className="p-1.5 text-purple-300 hover:text-white hover:bg-purple-900/40 rounded-full transition-colors active:scale-95"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Interactive Progress Bar & Timers */}
          <div className="w-full flex items-center space-x-2 text-[10px] sm:text-xs font-mono font-bold text-purple-300">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 180}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none bg-purple-950 cursor-pointer accent-pink-500 hover:accent-pink-400"
              aria-label="Seek Progress Bar"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT SECTION: Volume Controls */}
        <div className="hidden md:flex items-center justify-end space-x-2 w-1/4">
          <button
            onClick={() => setVolumeLevel(volume === 0 ? 80 : 0)}
            className="p-1.5 text-purple-300 hover:text-white"
            aria-label="Mute/Unmute"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-purple-300" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolumeLevel(Number(e.target.value))}
            className="w-24 h-1.5 rounded-lg appearance-none bg-purple-950 cursor-pointer accent-purple-500"
            aria-label="Volume Level"
          />
        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;
