import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, Heart, Gamepad2, Compass, Music, BookOpen, Scroll, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'HOME / BTS WORLD', category: 'Main' },
  { id: 'bts', label: 'BTS OVERVIEW', category: 'Main' },
  { id: 'members', label: 'MEMBERS', category: 'Main' },
  { id: 'music', label: 'MUSIC', category: 'Media' },
  { id: 'albums', label: 'ALBUMS', category: 'Media' },
  { id: 'moments', label: 'BTS MOMENTS', category: 'Lore' },
  { id: 'games', label: 'GAMES', category: 'Interactive' },
  { id: 'quiz', label: 'QUIZ', category: 'Interactive' },
  { id: 'puzzles', label: 'PUZZLES', category: 'Interactive' },
  { id: 'fanzone', label: 'FAN ZONE', category: 'Community' },
  { id: 'timeline', label: 'TIMELINE', category: 'Lore' },
  { id: 'gallery', label: 'GALLERY', category: 'Media' },
  { id: 'achievements', label: 'ACHIEVEMENTS', category: 'Main' },
  { id: 'messagewall', label: 'MESSAGE WALL', category: 'Community' },
  { id: 'favorites', label: 'FAVORITES', category: 'Community' },
  { id: 'funfacts', label: 'FUN FACTS', category: 'Lore' },
  { id: 'btsuniverse', label: 'BOOK ON BTS', category: 'Lore' },
  { id: 'poem', label: 'POEM ON BTS', category: 'Lore' },
  { id: 'armycorner', label: 'ARMY CORNER', category: 'Community' },
  { id: 'musicexperience', label: 'MUSIC EXPERIENCE', category: 'Media' },
  { id: 'closing', label: 'CLOSING', category: 'Main' }
];

const CATEGORIES = [
  { name: 'Core World', icon: Compass, items: ['home', 'bts', 'members', 'achievements', 'closing'] },
  { name: 'Music & Media', icon: Music, items: ['music', 'albums', 'gallery', 'musicexperience'] },
  { name: 'Timeline & Lore', icon: BookOpen, items: ['moments', 'timeline', 'funfacts', 'btsuniverse', 'poem'] },
  { name: 'Games & Puzzles', icon: Gamepad2, items: ['games', 'quiz', 'puzzles'] },
  { name: 'ARMY Community', icon: Heart, items: ['fanzone', 'messagewall', 'favorites', 'armycorner'] }
];

const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f051c]/98 border-b border-purple-500/30 shadow-xl shadow-purple-950/80 py-2 backdrop-blur-md'
          : 'bg-[#0f051c]/95 py-2.5 border-b border-purple-900/40 backdrop-blur-sm'
      }`}
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.35rem)' }}
    >
      <div className="w-full px-3 sm:px-4 lg:px-6">
        {/* TOP ROW: Logo & Title (Desktop & Mobile) */}
        <div className="flex items-center justify-between">
          {/* Extreme Left Corner Logo + BTS WORLD Text Alignment */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/images/bts/logo.svg" alt="BTS Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(192,132,252,0.9)]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-black text-xl sm:text-3xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-100 via-purple-200 to-pink-300 leading-none">
                BTS WORLD
              </span>
              <span className="text-[9px] sm:text-xs tracking-widest uppercase font-sans text-purple-300/90 font-extrabold leading-tight mt-0.5">
                ARMY FAN EXPERIENCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Category Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isCatActive = cat.items.includes(activeSection);
              const isOpen = activeDropdown === idx;

              return (
                <div
                  key={cat.name}
                  className="relative py-1"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : idx)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                      isCatActive
                        ? 'bg-purple-800/90 text-white border-purple-400 shadow-md shadow-purple-900/50'
                        : 'text-purple-200/90 border-transparent hover:text-white hover:bg-purple-900/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-pink-400" />
                    <span>{cat.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 pt-1 w-72 animate-fade-in z-50">
                      <div className="rounded-2xl shadow-2xl p-2 border bg-[#140524] border-purple-500/50 text-white shadow-purple-950/90">
                        <div className="space-y-1.5">
                          {cat.items.map((secId) => {
                            const sec = SECTIONS.find((s) => s.id === secId);
                            if (!sec) return null;
                            const isActive = activeSection === sec.id;
                            return (
                              <button
                                key={sec.id}
                                onClick={() => handleNavClick(sec.id)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-between border ${
                                  isActive
                                    ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-purple-400 shadow-lg shadow-purple-900/60 font-extrabold'
                                    : 'bg-purple-900/40 text-purple-200 border-purple-500/20 hover:bg-purple-700 hover:text-white hover:border-purple-400'
                                }`}
                              >
                                <span>{sec.label}</span>
                                {isActive && <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('games')}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>GAMES</span>
            </button>
          </div>
        </div>

        {/* MOBILE SUB-ROW: MENU ICON PLACED DIRECTLY BELOW LOGO & HEADER ON PHONE SCREENS */}
        <div className="flex lg:hidden items-center justify-between mt-2 pt-1.5 border-t border-purple-500/20">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/90 to-purple-950/90 border border-purple-400/40 text-purple-100 text-xs font-extrabold shadow-md shadow-purple-950/80 active:scale-95 transition-all"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-pink-400" />
            <span>MENU</span>
          </button>

          {/* Active section breadcrumb on phone */}
          <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider truncate max-w-[200px]">
            {SECTIONS.find(s => s.id === activeSection)?.label || 'HOME'}
          </div>
        </div>
      </div>

      {/* MOBILE LEFT-SIDE HALF-SCREEN DRAWER (WITH BEHIND PART CLEARLY VISIBLE) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex animate-fade-in">
          {/* SEMI-TRANSPARENT BACKDROP OVERLAY (RIGHT SIDE - BEHIND PAGE VISIBLE) */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] transition-opacity"
            aria-label="Close menu backdrop"
          />

          {/* HALF-SCREEN LEFT SIDE MENU DRAWER */}
          <div
            className="relative z-10 w-[60vw] max-w-[280px] h-full bg-[#120524]/95 border-r border-purple-500/50 backdrop-blur-2xl text-white shadow-2xl flex flex-col shadow-purple-950/90 animate-slide-right"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)'
            }}
          >
            {/* Drawer Header with Close Button */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-purple-500/30">
              <div className="flex items-center space-x-1.5">
                <img src="/images/bts/logo.svg" alt="BTS" className="w-5 h-5 object-contain" />
                <span className="font-display font-black text-xs tracking-wider text-purple-200">
                  BTS SECTIONS
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-purple-900/60 border border-purple-400/30 text-purple-200 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Categories List */}
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
              {CATEGORIES.map((cat, catIdx) => {
                const Icon = cat.icon;
                const isCatActive = cat.items.includes(activeSection);
                const isExpanded = expandedMobileCat === catIdx || isCatActive;

                return (
                  <div key={cat.name} className="space-y-1">
                    <button
                      onClick={() => setExpandedMobileCat(expandedMobileCat === catIdx ? null : catIdx)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wide transition-all border ${
                        isCatActive
                          ? 'bg-purple-800/80 text-pink-300 border-purple-400/60'
                          : 'bg-purple-950/50 text-purple-300 border-purple-500/20 hover:bg-purple-900/50'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 truncate">
                        <Icon className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90 text-pink-400' : 'text-purple-400'}`} />
                    </button>

                    {isExpanded && (
                      <div className="space-y-1 pl-2 pt-0.5">
                        {cat.items.map((secId) => {
                          const sec = SECTIONS.find((s) => s.id === secId);
                          if (!sec) return null;
                          const isActive = activeSection === sec.id;

                          return (
                            <button
                              key={sec.id}
                              onClick={() => handleNavClick(sec.id)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all flex items-center justify-between border ${
                                isActive
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-md font-black'
                                  : 'bg-purple-900/30 text-purple-200/90 border-purple-500/15 hover:bg-purple-800/60 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{sec.label}</span>
                              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-1"></span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer inside Left Drawer */}
            <div className="px-3 pt-2 border-t border-purple-500/20 text-[9px] text-purple-400/80 font-medium text-center">
              BTS World • Borahae 💜
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
