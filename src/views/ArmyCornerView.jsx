import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle, Quote, Shield } from 'lucide-react';

const ArmyCornerView = () => {
  const [dailyCompleted, setDailyCompleted] = useState(false);

  return (
    <div className="space-y-10 py-6">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          COMMUNITY HAVEN
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          ARMY Corner
        </h1>
        <p className="text-purple-300/80 text-sm max-w-lg mx-auto">
          An independent fan community space celebrating daily ARMY challenges and inspiring quotes.
        </p>
      </div>

      {/* Daily ARMY Challenge Box */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900/80 to-slate-950 border border-purple-500/30 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-4 max-w-2xl mx-auto text-center">
        <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-xs font-bold text-pink-300 uppercase">
          DAILY ARMY CHALLENGE
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-purple-100">
          "Listen to Spring Day & Send Positive Energy to Someone Today!"
        </h2>
        <p className="text-xs text-purple-300/80">
          Complete today's challenge to keep the ARMY spirit shining globally.
        </p>

        <button
          onClick={() => setDailyCompleted(true)}
          className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
            dailyCompleted
              ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105'
          }`}
        >
          {dailyCompleted ? "DAILY CHALLENGE COMPLETED! ✓" : "MARK CHALLENGE COMPLETED"}
        </button>
      </div>

      {/* Inspiring ARMY & BTS Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { quote: "Loving myself is more difficult than loving someone else, but I'm learning every day.", author: "RM (Love Myself)" },
          { quote: "Even if you're not perfect, you're a limited edition.", author: "BTS (Do You)" },
          { quote: "The dawn right before the sun rises is the darkest.", author: "BTS (Tomorrow)" },
          { quote: "You are the cause of my euphoria.", author: "Jung Kook (Euphoria)" }
        ].map((q, i) => (
          <div key={i} className="p-6 rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-3 shadow-xl">
            <Quote className="w-6 h-6 text-pink-400 opacity-80" />
            <p className="font-display italic text-sm text-purple-100 leading-relaxed">"{q.quote}"</p>
            <div className="text-xs text-purple-400 font-bold text-right">— {q.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmyCornerView;
