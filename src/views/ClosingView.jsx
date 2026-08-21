import React from 'react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const ClosingView = ({ onReplay }) => {
  const handleReplayClick = () => {
    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } catch (e) {}
    onReplay();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-purple-950 via-purple-900/60 to-black border border-purple-500/40 backdrop-blur-2xl p-8 sm:p-14 text-center shadow-2xl space-y-8 overflow-hidden">
        {/* Glowing BTS Logo */}
        <div className="relative w-24 h-24 mx-auto animate-pulse-glow">
          <img src="/images/bts/logo.svg" alt="BTS Logo" className="w-full h-full drop-shadow-[0_0_30px_rgba(192,132,252,0.9)]" />
        </div>

        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            SECTION 20 • FINAL FAREWELL
          </span>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-pink-300">
            THANK YOU, ARMY
          </h1>

          <p className="font-display italic text-lg sm:text-xl text-purple-200/90 max-w-xl mx-auto leading-relaxed">
            "This world may end here, but the memories, music and moments stay with us."
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-500/20 max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center space-x-1 text-pink-400">
            <Heart className="w-4 h-4 fill-pink-400" />
            <Heart className="w-4 h-4 fill-pink-400" />
            <Heart className="w-4 h-4 fill-pink-400" />
          </div>
          <p className="text-xs text-purple-300/80">
            BTS & ARMY Forever • 2013 - Forever
          </p>
        </div>

        <div>
          <button
            onClick={handleReplayClick}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-display font-bold text-sm uppercase tracking-wider shadow-xl shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>REPLAY THE EXPERIENCE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClosingView;
