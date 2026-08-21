import React, { useState } from 'react';
import { FUN_FACTS } from '../data/btsData';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

const FunFactsView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextFact = () => {
    setCurrentIndex((prev) => (prev + 1) % FUN_FACTS.length);
  };

  const currentFact = FUN_FACTS[currentIndex];

  return (
    <div className="space-y-8 py-6 max-w-2xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          VERIFIED BTS TRIVIA
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          Did You Know?
        </h1>
        <p className="text-purple-300/80 text-sm">
          Discover fascinating verified facts about BTS members and history.
        </p>
      </div>

      <div className="rounded-3xl bg-purple-950/80 border border-purple-500/30 backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs font-bold text-purple-400 border-b border-purple-500/20 pb-3">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-pink-400" />
            <span>FACT #{currentFact.id} OF {FUN_FACTS.length}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-pink-300 uppercase">
            {currentFact.tag}
          </span>
        </div>

        <p className="font-display text-lg sm:text-xl font-bold text-purple-100 leading-relaxed py-4 animate-fade-in">
          "{currentFact.fact}"
        </p>

        <button
          onClick={handleNextFact}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>NEXT FACT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FunFactsView;
