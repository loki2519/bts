import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { FULL_PLAYLIST, findSongByTitle } from '../data/playlistData';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [queue, setQueue] = useState(FULL_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWidgetActive, setIsWidgetActive] = useState(false); // Controls persistent compact widget visibility
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

  // Initialize YouTube IFrame API
  useEffect(() => {
    const initYT = () => {
      if (ytPlayerRef.current) return;
      try {
        ytPlayerRef.current = new window.YT.Player('bts-global-yt-player', {
          height: '0',
          width: '0',
          videoId: FULL_PLAYLIST[0]?.youtubeVideoId || FULL_PLAYLIST[0]?.youtubeId || 'kXpOEzNZ8hQ',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              setYtReady(true);
              try { event.target.setVolume(volume); } catch (e) {}
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setIsWidgetActive(true);
                setAudioError(null);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                handleTrackEnded();
              }
            },
            onError: (err) => {
              console.warn("YouTube player error event:", err);
              setIsPlaying(false);
              setAudioError("Unable to stream this track. Please check internet connection.");
            }
          }
        });
      } catch (e) {
        console.warn("YouTube player init exception:", e);
      }
    };

    if (!window.YT || !window.YT.Player) {
      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
      window.onYouTubeIframeAPIReady = () => {
        initYT();
      };
    } else {
      initYT();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Synchronize playback currentTime and duration with real YouTube player
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const yt = ytPlayerRef.current;
      if (yt && ytReady && typeof yt.getCurrentTime === 'function') {
        try {
          const curr = yt.getCurrentTime() || 0;
          const dur = yt.getDuration() || 0;
          setCurrentTime(Math.floor(curr));
          if (dur > 0) setDuration(Math.floor(dur));
        } catch (e) {}
      }
    }, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ytReady]);

  const stopMusicImmediately = () => {
    const yt = ytPlayerRef.current;
    if (yt && typeof yt.stopVideo === 'function') {
      try { yt.stopVideo(); } catch (e) {}
    }
    setIsPlaying(false);
  };

  // Close/Dismiss the widget: stops music and removes widget
  const dismissWidget = () => {
    stopMusicImmediately();
    setIsWidgetActive(false);
    setCurrentTime(0);
    setAudioError(null);
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
    if (!track) return;

    setAudioError(null);
    setIsWidgetActive(true);
    const targetVideoId = track.youtubeVideoId || track.youtubeId || findSongByTitle(track.title)?.youtubeVideoId || 'kXpOEzNZ8hQ';

    if (yt && typeof yt.loadVideoById === 'function') {
      try {
        yt.loadVideoById(targetVideoId);
        yt.playVideo();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
        setAudioError("Click Play to start audio stream.");
      }
    } else {
      setAudioError("Initializing YouTube audio engine... Click play.");
    }
  };

  const playTrackFromAlbum = (albumData, trackIndex) => {
    if (!albumData || !albumData.tracks || albumData.tracks.length === 0) return;

    const albumQueue = albumData.tracks.map((tName, i) => {
      const match = findSongByTitle(tName);
      return {
        id: `${albumData.id}-${i}`,
        title: tName,
        album: albumData.title,
        cover: albumData.cover,
        year: albumData.year,
        youtubeVideoId: match?.youtubeVideoId || match?.youtubeId || 'kXpOEzNZ8hQ',
        youtubeId: match?.youtubeVideoId || match?.youtubeId || 'kXpOEzNZ8hQ',
        youtubeUrl: match?.youtubeUrl || `https://youtu.be/${match?.youtubeVideoId || 'kXpOEzNZ8hQ'}`,
        sourceType: "youtube"
      };
    });

    setQueue(albumQueue);
    setCurrentIndex(trackIndex);
    setIsWidgetActive(true);
    loadAndPlayTrack(albumQueue[trackIndex]);
  };

  const playSong = (index) => {
    if (index < 0 || index >= queue.length) return;
    setCurrentIndex(index);
    setIsWidgetActive(true);
    loadAndPlayTrack(queue[index]);
  };

  const togglePlay = () => {
    const yt = ytPlayerRef.current;
    if (!yt) return;

    setAudioError(null);
    setIsWidgetActive(true);

    if (isPlaying) {
      if (typeof yt.pauseVideo === 'function') {
        yt.pauseVideo();
      }
      setIsPlaying(false);
    } else {
      if (typeof yt.playVideo === 'function') {
        yt.playVideo();
        setIsPlaying(true);
      } else {
        loadAndPlayTrack(currentTrack);
      }
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
      yt.seekTo(0, true);
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
      isWidgetActive,
      currentTime,
      duration,
      volume,
      loopMode,
      audioError,
      stopMusicImmediately,
      dismissWidget,
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
      {/* Hidden YouTube Audio Stream Engine Container */}
      <div className="hidden pointer-events-none opacity-0 invisible" aria-hidden="true">
        <div id="bts-global-yt-player"></div>
      </div>
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
