import React, { useState, useEffect } from 'react';
import { Heart, Star, Disc, User, Music, Gamepad2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const FavoritesView = ({ setActiveSection }) => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    let active = true;

    const loadFavorites = async () => {
      const saved = localStorage.getItem('bts_fan_favorites');
      if (saved && active) {
        try { setFavorites(JSON.parse(saved)); } catch (e) {}
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !active) return;

      const { data: profile } = await supabase
        .from('fan_profiles')
        .select('display_name, favorite_member, favorite_song, favorite_album, favorite_era, bio')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile && active) {
        const syncedFavorites = {
          favMember: profile.favorite_member,
          favSong: profile.favorite_song,
          favAlbum: profile.favorite_album,
          favEra: profile.favorite_era,
          displayName: profile.display_name,
          bio: profile.bio
        };
        localStorage.setItem('bts_fan_favorites', JSON.stringify(syncedFavorites));
        setFavorites(syncedFavorites);
      }
    };

    loadFavorites().catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <div className="space-y-8 py-6 max-w-3xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          SECTION 15 • PERSONAL FAVORITES MANAGER
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          Saved ARMY Favorites
        </h1>
        <p className="text-purple-300/80 text-sm">
          Your Fan Zone choices, synced from Supabase when you are signed in.
        </p>
      </div>

      <div className="rounded-3xl bg-purple-950/70 border border-purple-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6">
        {favorites && (favorites.favMember || favorites.favSong || favorites.favAlbum || favorites.favEra) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-purple-900/40 border border-purple-500/20 space-y-1">
              <div className="text-xs uppercase font-bold text-pink-400 flex items-center gap-1.5">
                <User className="w-4 h-4" /> FAVORITE MEMBER
              </div>
              <div className="font-display font-bold text-lg text-purple-100">{favorites.favMember || "Not selected yet"}</div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-900/40 border border-purple-500/20 space-y-1">
              <div className="text-xs uppercase font-bold text-pink-400 flex items-center gap-1.5">
                <Music className="w-4 h-4" /> FAVORITE SONG
              </div>
              <div className="font-display font-bold text-lg text-purple-100">{favorites.favSong || "Not selected yet"}</div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-900/40 border border-purple-500/20 space-y-1">
              <div className="text-xs uppercase font-bold text-pink-400 flex items-center gap-1.5">
                <Disc className="w-4 h-4" /> FAVORITE ALBUM
              </div>
              <div className="font-display font-bold text-lg text-purple-100">{favorites.favAlbum || "Not selected yet"}</div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-900/40 border border-purple-500/20 space-y-1">
              <div className="text-xs uppercase font-bold text-pink-400 flex items-center gap-1.5">
                <Star className="w-4 h-4" /> FAVORITE ERA
              </div>
              <div className="font-display font-bold text-lg text-purple-100">{favorites.favEra || "Not selected yet"}</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <Heart className="w-12 h-12 mx-auto text-purple-400 opacity-60" />
            <p className="text-sm text-purple-300">You haven't customized your favorites yet!</p>
          </div>
        )}

        <button
          onClick={() => setActiveSection('fanzone')}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
        >
          {favorites ? "UPDATE FAVORITES IN FAN ZONE" : "CHOOSE FAVORITES NOW"}
        </button>
      </div>
    </div>
  );
};

export default FavoritesView;
