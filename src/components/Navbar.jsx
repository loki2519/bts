import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown, Gamepad2, Compass, Music, BookOpen, ChevronRight, Camera, Sparkles } from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'HOME / BTS WORLD' },
  { id: 'bts', label: 'BTS OVERVIEW' },
  { id: 'members', label: 'MEMBERS' },
  { id: 'photoframe', label: 'BTS PHOTO FRAME' },
  { id: 'music', label: 'MUSIC' },
  { id: 'albums', label: 'ALBUMS' },
  { id: 'moments', label: 'BTS MOMENTS' },
  { id: 'games', label: 'GAMES' },
  { id: 'quiz', label: 'QUIZ' },
  { id: 'puzzles', label: 'PUZZLES' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'funfacts', label: 'FUN FACTS' },
  { id: 'btsuniverse', label: 'BOOK ON BTS' },
  { id: 'poem', label: 'POEM ON BTS' },
  { id: 'musicexperience', label: 'MUSIC EXPERIENCE' },
  { id: 'closing', label: 'CLOSING' }
];

const CATEGORIES = [
  { name: 'Core World', icon: Compass, items: ['home', 'bts', 'members', 'achievements', 'closing'] },
  { name: 'Photo Frame', icon: Camera, items: ['photoframe'] },
  { name: 'Music & Media', icon: Music, items: ['music', 'albums', 'gallery', 'musicexperience'] },
  { name: 'Timeline & Lore', icon: BookOpen, items: ['moments', 'timeline', 'funfacts', 'btsuniverse', 'poem'] },
  { name: 'Games & Puzzles', icon: Gamepad2, items: ['games', 'quiz', 'puzzles'] }
];

/* ─────────────────────────────────────────────
   MOBILE DRAWER — rendered via portal at body
   level so it is guaranteed above EVERYTHING
───────────────────────────────────────────── */
const MobileDrawer = ({ activeSection, onNavigate, onClose }) => {
  const [expandedCat, setExpandedCat] = useState(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 flex"
      style={{ zIndex: 99999 }}
    >
      {/* Semi-transparent RIGHT-SIDE BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* LEFT HALF-SCREEN DRAWER PANEL */}
      <div
        className="relative flex flex-col w-[72vw] max-w-[300px] h-full"
        style={{
          background: 'linear-gradient(160deg,#120524 0%,#1a0636 100%)',
          borderRight: '1.5px solid rgba(168,85,247,0.35)',
          boxShadow: '8px 0 40px rgba(88,28,135,0.6)'
        }}
      >
        {/* Drawer header row */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-500/30"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
        >
          <div className="flex items-center gap-2">
            <img src="/images/bts/logo.svg" alt="BTS" className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
            <span className="font-black text-sm tracking-widest text-purple-100 uppercase">BTS WORLD</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-900/70 border border-purple-400/30 text-purple-200 hover:text-white active:scale-90 transition-all"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable section list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {CATEGORIES.map((cat, catIdx) => {
            const Icon = cat.icon;
            const isCatActive = cat.items.includes(activeSection);
            const isExpanded = expandedCat === catIdx || (cat.items.length === 1 && isCatActive);

            return (
              <div key={cat.name}>
                {/* Direct link if single item category */}
                {cat.items.length === 1 ? (
                  <button
                    onClick={() => onNavigate(cat.items[0])}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wide transition-all border ${
                      activeSection === cat.items[0]
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-md font-black'
                        : 'bg-purple-950/60 text-purple-300 border-purple-600/20 hover:bg-purple-900/50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                      {cat.name}
                    </span>
                    {activeSection === cat.items[0] && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setExpandedCat(isExpanded ? null : catIdx)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-wide transition-all border ${
                        isCatActive
                          ? 'bg-purple-700/60 text-pink-300 border-purple-400/50'
                          : 'bg-purple-950/60 text-purple-300 border-purple-600/20 hover:bg-purple-900/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                        {cat.name}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-pink-400' : 'text-purple-500'}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-1 ml-2 space-y-1">
                        {cat.items.map((secId) => {
                          const sec = SECTIONS.find(s => s.id === secId);
                          if (!sec) return null;
                          const isActive = activeSection === sec.id;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => onNavigate(sec.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold tracking-wide transition-all flex items-center justify-between border ${
                                isActive
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-500/60 shadow-md shadow-purple-900/50 font-black'
                                  : 'bg-purple-900/30 text-purple-200 border-purple-500/10 hover:bg-purple-800/50 hover:text-white'
                              }`}
                            >
                              {sec.label}
                              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer footer */}
        <div className="px-4 py-3 border-t border-purple-500/20 text-center"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}>
          <span className="text-[10px] text-purple-400/70 font-medium tracking-wide">BTS World • Borahae 💜</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────── */
const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f051c]/98 border-b border-purple-500/30 shadow-xl shadow-purple-950/80 py-2 backdrop-blur-md'
            : 'bg-[#0f051c]/95 py-2.5 border-b border-purple-900/40 backdrop-blur-sm'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.35rem)' }}
      >
        <div className="w-full px-3 sm:px-4 lg:px-6">
          {/* TOP ROW: Logo + desktop nav */}
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Category Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isCatActive = cat.items.includes(activeSection);
                const isOpen = activeDropdown === idx;

                if (cat.items.length === 1) {
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleNavClick(cat.items[0])}
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                        activeSection === cat.items[0]
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-400 shadow-md'
                          : 'text-purple-200/90 border-transparent hover:text-white hover:bg-purple-900/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-pink-400" />
                      <span>{cat.name}</span>
                    </button>
                  );
                }

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
                      <div className="absolute top-full left-0 pt-1 w-64 z-50">
                        <div className="rounded-2xl shadow-2xl p-2 border bg-[#140524] border-purple-500/50 text-white shadow-purple-950/90">
                          <div className="space-y-1">
                            {cat.items.map((secId) => {
                              const sec = SECTIONS.find(s => s.id === secId);
                              if (!sec) return null;
                              const isActive = activeSection === sec.id;
                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => handleNavClick(sec.id)}
                                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-between border ${
                                    isActive
                                      ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-purple-400 font-extrabold'
                                      : 'bg-purple-900/40 text-purple-200 border-purple-500/20 hover:bg-purple-700 hover:text-white'
                                  }`}
                                >
                                  <span>{sec.label}</span>
                                  {isActive && <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />}
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

            {/* Desktop GAMES shortcut */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavClick('games')}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>GAMES</span>
              </button>
            </div>
          </div>

          {/* MOBILE SUB-ROW: MENU button sits directly below the logo/header */}
          <div className="flex lg:hidden items-center justify-between mt-2 pt-1.5 border-t border-purple-500/20">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/90 to-purple-950/90 border border-purple-400/40 text-purple-100 text-xs font-extrabold shadow-md active:scale-95 transition-all"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 text-pink-400" />
              <span>MENU</span>
            </button>

            {/* Active section breadcrumb */}
            <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider truncate max-w-[55vw] text-right">
              {SECTIONS.find(s => s.id === activeSection)?.label || 'HOME'}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer rendered via portal */}
      {mobileMenuOpen && (
        <MobileDrawer
          activeSection={activeSection}
          onNavigate={handleNavClick}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
