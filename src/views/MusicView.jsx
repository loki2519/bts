import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, Disc, Music, Sparkles } from 'lucide-react';
import { FULL_PLAYLIST } from '../data/playlistData';

const MusicView = () => {
  const { queue, currentIndex, isPlaying, playSong, togglePlay } = useMusic();
  const playlistToDisplay = queue && queue.length > 0 ? queue : FULL_PLAYLIST;

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          BTS DISCOGRAPHY & PLAYLIST
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Music World
        </h1>
        <p className="text-purple-300/80 text-sm max-w-2xl mx-auto">
          Explore iconic BTS tracks in the BTS World audio player.
        </p>
      </div>

      {/* Tracklist Table */}
      <div className="rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md overflow-hidden shadow-2xl p-4 sm:p-6">
        <div className="space-y-2">
          {playlistToDisplay.map((song, idx) => {
            const isCurrent = currentIndex === idx;

            return (
              <div
                key={song.id || idx}
                onClick={() => playSong(idx)}
                className={`flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-800/80 to-indigo-900/80 border-purple-400 text-white shadow-lg'
                    : 'bg-purple-900/20 hover:bg-purple-800/40 border-purple-500/10 text-purple-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 text-center text-xs font-bold text-purple-400">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrent) togglePlay();
                      else playSong(idx);
                    }}
                    className={`p-2.5 rounded-full transition-transform hover:scale-105 active:scale-95 ${
                      isCurrent
                        ? 'bg-pink-500 text-white shadow-md shadow-pink-500/50'
                        : 'bg-purple-900/60 text-purple-300 hover:text-white'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div>
                    <div className="font-display font-bold text-sm sm:text-base text-purple-100 flex items-center gap-2">
                      <span>{song.title}</span>
                    </div>
                    <div className="text-xs text-purple-300/80">
                      {song.album || "BTS Official Release"} {song.year ? `• ${song.year}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicView;
