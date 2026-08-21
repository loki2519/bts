import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { FULL_PLAYLIST } from '../data/playlistData';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [queue, setQueue] = useState(FULL_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(80);
  const [loopMode, setLoopMode] = useState('off'); // 'off' | 'track' | 'album'
  const [ytReady, setYtReady] = useState(false);
  const [audioError, setAudioError] = useState(null);

  const ytPlayerRef = useRef(null);
  const intervalRef = useRef(null);

  const currentTrack = queue[currentIndex] || FULL_PLAYLIST[0];
  const currentAlbumName = currentTrack?.album || "BTS Discography";
  const currentAlbumCover = currentTrack?.cover || currentTrack?.albumCover || "/images/bts/album_proof.svg";

  // Load YouTube IFrame API Script dynamically
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initYouTubePlayer();
      };
    } else {
      initYouTubePlayer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const initYouTubePlayer = () => {
    if (ytPlayerRef.current) return;
    try {
      ytPlayerRef.current = new window.YT.Player('bts-global-yt-player', {
        height: '0',
        width: '0',
        videoId: FULL_PLAYLIST[0]?.youtubeId || 'hmE9f-TEutc',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: (event) => {
            setYtReady(true);
            event.target.setVolume(80);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setAudioError(null);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              handleTrackEnded();
            }
          },
          onError: (err) => {
            setIsPlaying(false);
            setAudioError("Unable to play track via YouTube API.");
            console.warn("YouTube playback error:", err);
          }
        }
      });
    } catch (e) {
      console.warn("YouTube player init error:", e);
    }
  };

  // Synchronize current time and total duration every 250ms
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const yt = ytPlayerRef.current;
      if (yt && ytReady && typeof yt.getCurrentTime === 'function') {
        try {
          const curr = yt.getCurrentTime() || 0;
          const dur = yt.getDuration() || 240;
          setCurrentTime(Math.floor(curr));
          if (dur > 0) setDuration(Math.floor(dur));
        } catch (e) {}
      }
    }, 250);

    return () => clearInterval(intervalRef.current);
  }, [ytReady]);

  const stopMusicImmediately = () => {
    const yt = ytPlayerRef.current;
    if (yt && typeof yt.stopVideo === 'function') {
      try { yt.stopVideo(); } catch (e) {}
    }
    setIsPlaying(false);
  };

  const handleTrackEnded = () => {
    setLoopMode((currentLoop) => {
      if (currentLoop === 'track') {
        loadAndPlayTrack(queue[currentIndex]);
      } else if (currentLoop === 'album') {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % queue.length;
          loadAndPlayTrack(queue[next]);
          return next;
        });
      } else {
        setCurrentIndex((prev) => {
          if (prev + 1 < queue.length) {
            const next = prev + 1;
            loadAndPlayTrack(queue[next]);
            return next;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }
      return currentLoop;
    });
  };

  const loadAndPlayTrack = (track) => {
    const yt = ytPlayerRef.current;
    if (!track || !yt || typeof yt.loadVideoById !== 'function') return;

    setAudioError(null);
    const targetVideoId = track.youtubeId || FULL_PLAYLIST[0].youtubeId;

    try {
      yt.loadVideoById(targetVideoId);
      yt.playVideo();
      setIsPlaying(true);
    } catch (err) {
      setIsPlaying(false);
      setAudioError("Click Play to start audio.");
    }
  };

  const playTrackFromAlbum = (albumData, trackIndex) => {
    if (!albumData || !albumData.tracks || albumData.tracks.length === 0) return;

    const albumQueue = albumData.tracks.map((tName, i) => {
      const matchInFull = FULL_PLAYLIST.find(p => p.title.toLowerCase() === tName.toLowerCase());
      return {
        id: `${albumData.id}-${i}`,
        title: tName,
        album: albumData.title,
        cover: albumData.cover,
        youtubeId: matchInFull?.youtubeId || FULL_PLAYLIST[i % FULL_PLAYLIST.length].youtubeId,
        year: albumData.year
      };
    });

    setQueue(albumQueue);
    setCurrentIndex(trackIndex);
    loadAndPlayTrack(albumQueue[trackIndex]);
  };

  const playSong = (index) => {
    if (index < 0 || index >= queue.length) return;
    setCurrentIndex(index);
    loadAndPlayTrack(queue[index]);
  };

  const togglePlay = () => {
    const yt = ytPlayerRef.current;
    if (!yt || !ytReady) return;

    setAudioError(null);

    if (isPlaying) {
      yt.pauseVideo();
      setIsPlaying(false);
    } else {
      yt.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (queue.length === 0) return;
    const next = (currentIndex + 1) % queue.length;
    setCurrentIndex(next);
    loadAndPlayTrack(queue[next]);
  };

  const handlePrevTrack = () => {
    const yt = ytPlayerRef.current;
    if (queue.length === 0) return;

    if (yt && typeof yt.getCurrentTime === 'function' && yt.getCurrentTime() > 3) {
      yt.seekTo(0);
      setCurrentTime(0);
      return;
    }

    const prev = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentIndex(prev);
    loadAndPlayTrack(queue[prev]);
  };

  const seekTo = (seconds) => {
    const yt = ytPlayerRef.current;
    if (yt && typeof yt.seekTo === 'function') {
      yt.seekTo(seconds, true);
      setCurrentTime(seconds);
    }
  };

  const setVolumeLevel = (val) => {
    const clamped = Math.max(0, Math.min(100, val));
    setVolume(clamped);
    const yt = ytPlayerRef.current;
    if (yt && typeof yt.setVolume === 'function') {
      yt.setVolume(clamped);
    }
  };

  const toggleLoopMode = () => {
    if (loopMode === 'off') setLoopMode('track');
    else if (loopMode === 'track') setLoopMode('album');
    else setLoopMode('off');
  };

  return (
    <MusicContext.Provider value={{
      queue,
      currentIndex,
      currentTrack,
      currentAlbumName,
      currentAlbumCover,
      isPlaying,
      currentTime,
      duration,
      volume,
      loopMode,
      audioError,
      stopMusicImmediately,
      playTrackFromAlbum,
      playSong,
      togglePlay,
      nextTrack: handleNextTrack,
      prevTrack: handlePrevTrack,
      seekTo,
      setVolumeLevel,
      toggleLoopMode
    }}>
      {children}
      {/* Hidden YouTube Audio/Video Stream Engine Container */}
      <div className="hidden pointer-events-none opacity-0 invisible" aria-hidden="true">
        <div id="bts-global-yt-player"></div>
      </div>
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
