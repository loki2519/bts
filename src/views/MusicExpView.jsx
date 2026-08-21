import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Disc } from 'lucide-react';
import { FULL_PLAYLIST } from '../data/playlistData';

const MusicExpView = () => {
  const { currentTrack, currentIndex, isPlaying, togglePlay, nextTrack, prevTrack, queue } = useMusic();
  const activeTrack = currentTrack || FULL_PLAYLIST[0];
  const activeQueue = queue && queue.length > 0 ? queue : FULL_PLAYLIST;
  const activeIdx = currentIndex || 0;

  return (
    <div className="space-y-8 py-6 max-w-3xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          DEDICATED AUDIO WORLD
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          Music Experience
        </h1>
        <p className="text-purple-300/80 text-sm">
          Immersive full-screen visualizer player connected to the global audio engine.
        </p>
      </div>

      {/* Main Visualizer Player Panel */}
      <div className="rounded-3xl bg-gradient-to-b from-purple-950/90 via-purple-900/40 to-black border border-purple-500/40 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden">
        {/* Animated Vinyl Visualizer */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto">
          <div className={`w-full h-full rounded-full border-4 border-purple-500/40 bg-purple-950 flex items-center justify-center shadow-2xl shadow-purple-600/50 ${isPlaying ? 'animate-spin-slow ring-4 ring-purple-400 ring-offset-4 ring-offset-purple-950' : ''}`}>
            <Disc className="w-24 h-24 text-purple-300 opacity-90" />
          </div>
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border border-pink-400/50 animate-ping opacity-30"></div>
          )}
        </div>

        {/* Current Track Details */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold tracking-widest text-pink-400">
            NOW PLAYING ({activeIdx + 1} OF {activeQueue.length})
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-purple-100">
            {activeTrack.title}
          </h2>
          <div className="text-sm text-purple-300 font-semibold">
            {activeTrack.album || "BTS Release"} {activeTrack.year ? `(${activeTrack.year})` : ''}
          </div>
        </div>

        {/* Big Audio Controls */}
        <div className="flex items-center justify-center space-x-6 pt-4">
          <button
            onClick={prevTrack}
            className="p-3 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous Track"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            className="p-5 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 text-white shadow-xl shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all"
            aria-label={isPlaying ? "Pause Track" : "Play Track"}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button
            onClick={nextTrack}
            className="p-3 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:scale-110 active:scale-95 transition-all"
            aria-label="Next Track"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicExpView;
