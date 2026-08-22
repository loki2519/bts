import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FULL_PLAYLIST } from '../data/playlistData';

const MusicContext = createContext(null);

const localAudioUrl = (track) => track?.audioUrl || `/audio/${(track?.title || 'track')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')}.mp3`;

export const MusicProvider = ({ children }) => {
  const [queue, setQueue] = useState(FULL_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [loopMode, setLoopMode] = useState('off');
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);

  const currentTrack = queue[currentIndex] || FULL_PLAYLIST[0];
  const currentAlbumName = currentTrack?.album || 'BTS Discography';
  const currentAlbumCover = currentTrack?.cover || currentTrack?.albumCover || '/images/bts/album_proof.svg';

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const playTrack = async (track) => {
    const audio = audioRef.current;
    if (!track || !audio) return;
    audio.src = localAudioUrl(track);
    audio.load();
    try {
      await audio.play();
      setIsPlaying(true);
      setAudioError(null);
    } catch {
      setIsPlaying(false);
      setAudioError(`Audio file not available yet: ${localAudioUrl(track)}`);
    }
  };

  const selectAndPlay = (index, tracks = queue) => {
    if (index < 0 || index >= tracks.length) return;
    if (tracks !== queue) setQueue(tracks);
    setCurrentIndex(index);
    playTrack(tracks[index]);
  };

  const playTrackFromAlbum = (albumData, trackIndex) => {
    if (!albumData?.tracks?.length) return;
    const albumQueue = albumData.tracks.map((title, index) => ({
      id: `${albumData.id}-${index}`,
      title,
      album: albumData.title,
      year: albumData.year,
      cover: albumData.cover
    }));
    selectAndPlay(trackIndex, albumQueue);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      playTrack(currentTrack);
    }
  };

  const nextTrack = () => selectAndPlay((currentIndex + 1) % queue.length);
  const prevTrack = () => selectAndPlay(currentIndex === 0 ? queue.length - 1 : currentIndex - 1);
  const seekTo = (seconds) => {
    if (audioRef.current) audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };
  const setVolumeLevel = (value) => setVolume(Math.max(0, Math.min(100, value)));
  const toggleLoopMode = () => setLoopMode((mode) => mode === 'off' ? 'track' : mode === 'track' ? 'album' : 'off');
  const stopMusicImmediately = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{
      queue, currentIndex, currentTrack, currentAlbumName, currentAlbumCover,
      isPlaying, currentTime, duration, volume, loopMode, audioError,
      stopMusicImmediately, playTrackFromAlbum, playSong: selectAndPlay, togglePlay,
      nextTrack, prevTrack, seekTo, setVolumeLevel, toggleLoopMode
    }}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setAudioError(`Audio file not available yet: ${localAudioUrl(currentTrack)}`)}
        onEnded={() => {
          if (loopMode === 'track') playTrack(currentTrack);
          else if (loopMode === 'album' || currentIndex + 1 < queue.length) nextTrack();
          else setIsPlaying(false);
        }}
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
