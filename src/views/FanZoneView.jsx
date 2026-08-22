import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MEMBERS_DATA, ALBUMS_DATA } from '../data/btsData';
import { Heart, Sparkles, Save, CheckCircle, User, Activity, Trophy, Star, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const FanZoneView = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favMember, setFavMember] = useState('RM');
  const [favSong, setFavSong] = useState('Spring Day');
  const [favAlbum, setFavAlbum] = useState('Love Yourself 轉 \'Tear\'');
  const [favEra, setFavEra] = useState('WINGS Era (2016)');
  const [displayName, setDisplayName] = useState('ARMY Fan');
  const [bio, setBio] = useState('Forever purple with BTS 💜');
  const [userActivity, setUserActivity] = useState([]);
  const [userFavoritesList, setUserFavoritesList] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    loadUserFanData();

    // Attach Supabase Auth State Change Listener
    let authSubscription = null;
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(`[FAN ZONE] Auth Event: ${event}, User ID: ${session?.user?.id}`);
        if (event === 'SIGNED_IN' && session?.user) {
          loadUserFanData(session.user);
        } else if (event === 'SIGNED_OUT') {
          // Reset all memory state on logout
          setCurrentUser(null);
          setFavMember('RM');
          setFavSong('Spring Day');
          setFavAlbum('Love Yourself 轉 \'Tear\'');
          setFavEra('WINGS Era (2016)');
          setDisplayName('ARMY Fan');
          setUserActivity([]);
          setUserFavoritesList([]);
        }
      });
      authSubscription = subscription;
    }

    return () => {
      if (authSubscription) authSubscription.unsubscribe();
    };
  }, []);

  const loadUserFanData = async (activeUser = null) => {
    setLoading(true);
    setDbError(null);
    let user = activeUser;

    if (!user && supabase) {
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        if (authUser) user = authUser;
      } catch (e) {
        console.warn("[FAN ZONE] Auth check exception:", e);
      }
    }

    if (!user) {
      // Check stored user account from login gate
      const storedAccount = localStorage.getItem('bts_user_account');
      if (storedAccount) {
        try {
          const parsed = JSON.parse(storedAccount);
          user = { id: parsed.email || 'local_user', email: parsed.email };
        } catch (e) {}
      }
    }

    setCurrentUser(user);
    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.id;
    console.log('[FAN ZONE] Auth user ID:', userId);
    console.log('[FAN ZONE] Auth email:', user.email);

    // 1. Fetch fan_profiles from Supabase (SOURCE OF TRUTH)
    if (supabase && userId && userId !== 'local_user') {
      console.log('[FAN ZONE] Loading profile from Supabase for user:', userId);
      try {
        const { data: profile, error: profileErr } = await supabase
          .from('fan_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (profileErr && profileErr.code !== 'PGRST116') {
          console.error('[FAN ZONE DATABASE ERROR] Loading profile:', profileErr);
        }

        if (profile) {
          console.log('[FAN ZONE] Profile loaded from database:', profile);
          if (profile.display_name) setDisplayName(profile.display_name);
          if (profile.favorite_member) setFavMember(profile.favorite_member);
          if (profile.favorite_song) setFavSong(profile.favorite_song);
          if (profile.favorite_album) setFavAlbum(profile.favorite_album);
          if (profile.favorite_era) setFavEra(profile.favorite_era);
          if (profile.bio) setBio(profile.bio);
        }
      } catch (e) {
        console.warn("[FAN ZONE] Supabase profile load exception:", e);
      }

      // 2. Fetch fan_favorites from Supabase
      try {
        const { data: favorites, error: favErr } = await supabase
          .from('fan_favorites')
          .select('*')
          .eq('user_id', userId);

        if (favErr) console.error('[FAN ZONE DATABASE ERROR] Loading favorites:', favErr);
        if (favorites) setUserFavoritesList(favorites);
      } catch (e) {}

      // 3. Fetch fan_activity from Supabase
      try {
        const { data: activity, error: actErr } = await supabase
          .from('fan_activity')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (actErr) console.error('[FAN ZONE DATABASE ERROR] Loading activity:', actErr);
        if (activity) setUserActivity(activity);
      } catch (e) {}
    } else {
      // Local fallback for offline mode
      const localKey = `bts_fan_profile_${userId}`;
      const saved = localStorage.getItem(localKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.favMember) setFavMember(parsed.favMember);
          if (parsed.favSong) setFavSong(parsed.favSong);
          if (parsed.favAlbum) setFavAlbum(parsed.favAlbum);
          if (parsed.favEra) setFavEra(parsed.favEra);
          if (parsed.displayName) setDisplayName(parsed.displayName);
        } catch (e) {}
      }
    }

    setLoading(false);
  };

  const handleSaveFavorites = async (e) => {
    e.preventDefault();
    setDbError(null);

    if (!currentUser) {
      setDbError("Please log in to save your Fan Zone information.");
      return;
    }

    const userId = currentUser.id;
    console.log('[FAN ZONE] Saving profile for user_id:', userId);

    const profileData = {
      user_id: userId,
      display_name: displayName,
      favorite_member: favMember,
      favorite_song: favSong,
      favorite_album: favAlbum,
      favorite_era: favEra,
      bio: bio,
      updated_at: new Date().toISOString()
    };

    let saveSuccessful = false;

    // Save strictly to Supabase with user_id UPSERT
    if (supabase && userId && userId !== 'local_user') {
      try {
        const { data, error } = await supabase
          .from('fan_profiles')
          .upsert(profileData, { onConflict: 'user_id' });

        if (error) {
          console.error('[FAN ZONE DATABASE ERROR] Save error:', error);
          setDbError(`Database save error: ${error.message}`);
          return;
        }

        console.log('[FAN ZONE] Save response:', data || 'UPSERT Success');

        // Log Fan Activity
        await supabase.from('fan_activity').insert({
          user_id: userId,
          activity_type: 'profile_update',
          item_name: `Updated bias to ${favMember}`,
          metadata: { favMember, favSong, favAlbum }
        });

        // Insert / Update Favorite Member record in fan_favorites
        await supabase.from('fan_favorites').upsert({
          user_id: userId,
          item_type: 'member',
          item_id: favMember.toLowerCase().replace(/\s+/g, ''),
          item_name: favMember
        }, { onConflict: 'user_id,item_type,item_id' });

        saveSuccessful = true;
      } catch (e) {
        console.error('[FAN ZONE DATABASE ERROR] Save exception:', e);
        setDbError("Unable to save to database. Retrying...");
      }
    } else {
      saveSuccessful = true;
    }

    // Cache locally as secondary backup
    const localKey = `bts_fan_profile_${userId}`;
    localStorage.setItem(localKey, JSON.stringify(profileData));
    // Keep the Favorites screen in sync immediately, including offline use.
    localStorage.setItem('bts_fan_favorites', JSON.stringify({
      favMember,
      favSong,
      favAlbum,
      favEra,
      displayName,
      bio
    }));

    if (saveSuccessful) {
      setSavedSuccess(true);
      try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
      setTimeout(() => setSavedSuccess(false), 3500);

      // Verify save by reloading fresh from Supabase
      loadUserFanData(currentUser);
    }
  };

  const calculateFanLevel = () => {
    const actCount = userActivity.length;
    if (actCount > 15) return { name: "ARMY Legend 💜", desc: "Ultimate BTS Master Fan" };
    if (actCount > 8) return { name: "ARMY Pro ✨", desc: "Experienced BTS Enthusiast" };
    if (actCount > 2) return { name: "ARMY Dedicated 🌸", desc: "Active Fan Zone Contributor" };
    return { name: "ARMY Rookie 🌟", desc: "Beginning BTS World Journey" };
  };

  const fanLevel = calculateFanLevel();

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center w-max mx-auto">
          <User className="w-3.5 h-3.5 text-pink-400" />
          <span>USER-SPECIFIC SUPABASE FAN ZONE</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-pink-300">
          Personal ARMY Hub
        </h1>
        <p className="text-purple-200 text-sm max-w-lg mx-auto font-medium">
          Connected User: <strong className="text-pink-300">{currentUser?.email || 'Authenticated ARMY Fan'}</strong>
        </p>
      </div>

      {/* USER PERSONALIZED SUMMARY DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-xl space-y-2">
          <div className="text-xs text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400" /> MY FAVORITE BIAS
          </div>
          <div className="text-2xl font-black text-pink-300 font-display">{favMember}</div>
          <div className="text-xs text-purple-300">Favorite Song: {favSong}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-xl space-y-2">
          <div className="text-xs text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Trophy className="w-4 h-4 text-purple-300" /> MY FAN LEVEL
          </div>
          <div className="text-lg font-bold text-purple-100 font-display">{fanLevel.name}</div>
          <div className="text-xs text-purple-300">{fanLevel.desc}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-xl space-y-2">
          <div className="text-xs text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-4 h-4 text-emerald-400" /> MY FAV ALBUM
          </div>
          <div className="text-base font-bold text-purple-100 truncate font-display">{favAlbum}</div>
          <div className="text-xs text-purple-300">Era: {favEra}</div>
        </div>
      </div>

      {/* EDIT PROFILE & FAVORITES FORM */}
      <form onSubmit={handleSaveFavorites} className="rounded-3xl bg-[#140524] border border-purple-500/40 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-6">
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm font-bold flex items-center justify-center space-x-2 animate-fade-in shadow-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>YOUR ARMY FAVORITES HAVE BEEN UPDATED IN SUPABASE DATABASE!</span>
          </div>
        )}

        {dbError && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold flex items-center justify-center space-x-2 animate-fade-in shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span>{dbError}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Display Name */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-purple-200 tracking-wider">
              DISPLAY NAME / FAN ALIAS
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. ARMY_Borahae_07"
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Favorite Member Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-purple-200 tracking-wider">
              SELECT YOUR FAVORITE MEMBER (BIAS)
            </label>
            <select
              value={favMember}
              onChange={(e) => setFavMember(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-inner"
            >
              {MEMBERS_DATA.map((m) => (
                <option key={m.id} value={m.name} className="bg-[#140524] text-white font-bold py-2">
                  {m.name} ({m.koreanName}) - {m.role}
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Song Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-purple-200 tracking-wider">
              SELECT YOUR FAVORITE BTS SONG
            </label>
            <select
              value={favSong}
              onChange={(e) => setFavSong(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-inner"
            >
              {["Spring Day", "Blood Sweat & Tears", "Butterfly", "Fake Love", "Mikrokosmos", "Louder Than Bombs", "Zero O'Clock", "MIC Drop", "Pied Piper", "Not Today", "Dynamite", "Butter", "Boy With Luv", "Life Goes On", "DNA", "IDOL", "RUN", "ON", "Black Swan", "Save ME", "FIRE", "DOPE"].map((song) => (
                <option key={song} value={song} className="bg-[#140524] text-white font-bold py-2">
                  {song}
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Album Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-purple-200 tracking-wider">
              SELECT YOUR FAVORITE BTS ALBUM
            </label>
            <select
              value={favAlbum}
              onChange={(e) => setFavAlbum(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-inner"
            >
              {ALBUMS_DATA.map((a) => (
                <option key={a.id} value={a.title} className="bg-[#140524] text-white font-bold py-2">
                  {a.title} ({a.year})
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Era Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-purple-200 tracking-wider">
              SELECT YOUR FAVORITE CONCEPT ERA
            </label>
            <select
              value={favEra}
              onChange={(e) => setFavEra(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-inner"
            >
              {["School Trilogy Era (2013-2014)", "HYYH Most Beautiful Moment Era (2015-2016)", "WINGS Era (2016)", "Love Yourself Era (2017-2018)", "Map of the Soul Era (2019-2020)", "BE / Dynamite Era (2020-2021)", "Proof / Chapter 2 Era (2022-Present)"].map((era) => (
                <option key={era} value={era} className="bg-[#140524] text-white font-bold py-2">
                  {era}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-purple-600/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>SAVE MY ARMY FAVORITES TO SUPABASE</span>
        </button>
      </form>
    </div>
  );
};

export default FanZoneView;
