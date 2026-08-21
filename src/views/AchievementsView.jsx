import React from 'react';
import { ACHIEVEMENTS_DATA } from '../data/btsData';
import { Award, Trophy, Star, Globe, ShieldCheck } from 'lucide-react';

const AchievementsView = () => {
  return (
    <div className="space-y-10 py-6">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          VERIFIED RECORDS & AWARDS
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Global Achievements
        </h1>
        <p className="text-purple-300/80 text-sm max-w-xl mx-auto">
          Factual record-breaking statistics documenting BTS's global success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_DATA.map((ach, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md p-6 sm:p-8 space-y-4 shadow-xl hover:border-purple-400/40 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-pink-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300">
                {ach.metric}
              </div>
              <h3 className="font-display font-bold text-lg text-purple-100 mt-1">{ach.label}</h3>
            </div>
            <p className="text-xs text-purple-300/80 leading-relaxed border-t border-purple-500/10 pt-3">
              {ach.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsView;
