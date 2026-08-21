import React, { useState, useEffect } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { ThemeProvider } from './context/ThemeContext';
import StarfieldCanvas from './components/StarfieldCanvas';
import WatermarkCanvas from './components/WatermarkCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { ArrowLeft } from 'lucide-react';

// All Views
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import BtsView from './views/BtsView';
import MembersView from './views/MembersView';
import MusicView from './views/MusicView';
import AlbumsView from './views/AlbumsView';
import MomentsView from './views/MomentsView';
import GamesView from './views/GamesView';
import QuizView from './views/QuizView';
import PuzzlesView from './views/PuzzlesView';
import FanZoneView from './views/FanZoneView';
import TimelineView from './views/TimelineView';
import GalleryView from './views/GalleryView';
import AchievementsView from './views/AchievementsView';
import MessageWallView from './views/MessageWallView';
import FavoritesView from './views/FavoritesView';
import FunFactsView from './views/FunFactsView';
import BtsUniverseView from './views/BtsUniverseView';
import PoemView from './views/PoemView';
import ArmyCornerView from './views/ArmyCornerView';
import MusicExpView from './views/MusicExpView';
import ClosingView from './views/ClosingView';

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { stopMusicImmediately } = useMusic();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Stop music immediately whenever leaving Music/Albums pages
    if (activeSection !== 'albums' && activeSection !== 'music' && activeSection !== 'musicexperience') {
      stopMusicImmediately();
    }
  }, [activeSection]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveSection('home');
  };

  const handleReplay = () => {
    setIsLoggedIn(false);
    setActiveSection('home');
  };

  return (
    <div className="relative min-h-screen bg-[#0b0410] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white transition-colors duration-300">
      {/* Animated Cosmic Canvas Background */}
      <StarfieldCanvas />

      {/* Floating Low-Opacity BTS Member Watermark Background */}
      <WatermarkCanvas />

      {/* Access Gate Screen */}
      {!isLoggedIn ? (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Top Navigation */}
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Main Content Area */}
          <main
            className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 pb-24"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 6.75rem)' }}
          >
            {/* Universal BACK TO HOME Button Positioned Cleanly Below Header at Extreme Left */}
            {activeSection !== 'home' && (
              <div className="mt-1 mb-6 flex items-center justify-start animate-fade-in">
                <button
                  onClick={() => setActiveSection('home')}
                  className="px-4 py-2 rounded-xl bg-purple-950/90 border border-purple-500/50 text-purple-200 hover:text-white hover:bg-purple-800 text-xs font-black tracking-wider uppercase transition-all flex items-center space-x-2 shadow-xl shadow-purple-950/90"
                >
                  <ArrowLeft className="w-4 h-4 text-pink-400" />
                  <span>BACK TO HOME</span>
                </button>
              </div>
            )}

            {activeSection === 'home' && <HomeView setActiveSection={setActiveSection} />}
            {activeSection === 'bts' && <BtsView />}
            {activeSection === 'members' && <MembersView />}
            {activeSection === 'music' && <MusicView />}
            {activeSection === 'albums' && <AlbumsView />}
            {activeSection === 'moments' && <MomentsView />}
            {activeSection === 'games' && <GamesView />}
            {activeSection === 'quiz' && <QuizView />}
            {activeSection === 'puzzles' && <PuzzlesView />}
            {activeSection === 'fanzone' && <FanZoneView />}
            {activeSection === 'timeline' && <TimelineView />}
            {activeSection === 'gallery' && <GalleryView />}
            {activeSection === 'achievements' && <AchievementsView />}
            {activeSection === 'messagewall' && <MessageWallView />}
            {activeSection === 'favorites' && <FavoritesView setActiveSection={setActiveSection} />}
            {activeSection === 'funfacts' && <FunFactsView />}
            {activeSection === 'btsuniverse' && <BtsUniverseView />}
            {activeSection === 'poem' && <PoemView />}
            {activeSection === 'armycorner' && <ArmyCornerView />}
            {activeSection === 'musicexperience' && <MusicExpView />}
            {activeSection === 'closing' && <ClosingView onReplay={handleReplay} />}
          </main>

          {/* Persistent Player Block - Rendered ONLY on Albums Page */}
          {activeSection === 'albums' && <MusicPlayer />}

          {/* Universal Footer */}
          <Footer setActiveSection={setActiveSection} />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ThemeProvider>
  );
};

export default App;
