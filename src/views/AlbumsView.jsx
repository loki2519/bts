import React, { useState } from 'react';
import { ALBUMS_DATA } from '../data/btsData';
import { useMusic } from '../context/MusicContext';
import BtsImage from '../components/BtsImage';
import { Play, Pause, ListMusic, Calendar, X, Volume2 } from 'lucide-react';

const AlbumsView = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { playTrackFromAlbum, currentTrack, currentAlbumName, isPlaying, togglePlay } = useMusic();

  const handleTrackClick = (album, trackIdx) => {
    playTrackFromAlbum(album, trackIdx);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          OFFICIAL DISCOGRAPHY
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Album Gallery & Music Player
        </h1>
        <p className="text-purple-300/80 text-sm max-w-2xl mx-auto">
          Explore official discography concept art and play complete album tracklists in the global player.
        </p>
      </div>

      {/* Album Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ALBUMS_DATA.map((album) => {
          const isThisAlbumPlaying = isPlaying && currentAlbumName === album.title;

          return (
            <div
              key={album.id}
              className={`group rounded-3xl bg-purple-950/40 border backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl ${
                isThisAlbumPlaying ? 'border-pink-500/80 shadow-pink-950/60' : 'border-purple-500/20 hover:border-purple-400/50'
              }`}
            >
              <div className="relative aspect-square w-full bg-purple-950/80 overflow-hidden">
                <BtsImage
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full"
                  fallbackTitle={album.title}
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-[10px] font-bold text-purple-200 uppercase">
                  {album.year}
                </div>
                {/* Fast Play Album Button Overlay */}
                <button
                  onClick={() => {
                    setSelectedAlbum(album);
                    playTrackFromAlbum(album, 0);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  aria-label={`Play ${album.title} album`}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-2xl scale-95 group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </button>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest">{album.type} • {album.tracks.length} Tracks</div>
                  <h3 className="font-display font-bold text-lg text-purple-100 group-hover:text-pink-300 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-xs text-purple-300/80 mt-2 line-clamp-2">
                    {album.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAlbum(album)}
                  className="w-full mt-3 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-400/30 text-purple-100 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-1.5 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600"
                >
                  <span>Explore & Play Tracks</span>
                  <ListMusic className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Album Detail & Interactive Tracklist Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#140524]/95 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/90 text-white max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedAlbum(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 border-b border-purple-500/20 pb-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-purple-400/40 shadow-lg">
                <BtsImage src={selectedAlbum.cover} alt={selectedAlbum.title} className="w-full h-full" fallbackTitle={selectedAlbum.title} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400">{selectedAlbum.type} • {selectedAlbum.year}</span>
                <h2 className="font-display text-2xl font-bold text-purple-100">{selectedAlbum.title}</h2>
                <div className="text-xs text-purple-300 mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Released: {selectedAlbum.releaseDate}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-bold text-purple-200 flex items-center gap-2">
                  <ListMusic className="w-4 h-4 text-pink-400" />
                  <span>Album Tracks ({selectedAlbum.tracks.length} Songs)</span>
                </h4>
                <button
                  onClick={() => playTrackFromAlbum(selectedAlbum, 0)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Play All</span>
                </button>
              </div>

              {/* Track List Items with Interactive Play Button & Equalizer */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {selectedAlbum.tracks.map((track, i) => {
                  const isCurrentPlayingTrack = isPlaying && currentTrack?.title?.toLowerCase() === track.toLowerCase();

                  return (
                    <div
                      key={i}
                      onClick={() => handleTrackClick(selectedAlbum, i)}
                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                        isCurrentPlayingTrack
                          ? 'bg-purple-800/80 border-pink-400 text-white shadow-lg'
                          : 'bg-purple-900/30 border-purple-500/20 text-purple-200 hover:bg-purple-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="text-purple-400 font-bold text-xs w-6 flex-shrink-0">
                          {isCurrentPlayingTrack ? (
                            <span className="w-3 h-3 rounded-full bg-pink-400 animate-ping inline-block"></span>
                          ) : (
                            `${i + 1}.`
                          )}
                        </span>
                        <span className="text-xs sm:text-sm font-bold truncate">{track}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCurrentPlayingTrack) togglePlay();
                          else handleTrackClick(selectedAlbum, i);
                        }}
                        className="w-8 h-8 rounded-full bg-purple-900/80 border border-purple-400/40 flex items-center justify-center text-purple-200 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all flex-shrink-0"
                        aria-label={`Play track ${track}`}
                      >
                        {isCurrentPlayingTrack ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsView;
