import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const POEM_STANZAS = [
  "Seven voices rose beneath one sky,\nSeven dreams that refused to die.\nFrom little stages, from days unknown,\nThey built a world they could call their own.",
  "RM gave words to the things we hide,\nA steady voice that walked beside.\nJin brought laughter, warmth, and light,\nA reminder that joy can make things right.",
  "SUGA turned his scars into a song,\nAnd showed the broken they still belong.\nj-hope danced where the shadows fell,\nTurning every dark into a brighter tale.",
  "Jimin moved like a heartbeat in flight,\nSoft as the dawn, powerful as light.\nV carried dreams in a voice so deep,\nThe kind of memories the heart will keep.",
  "And Jung Kook, the youngest of seven,\nGrew with the music beneath the same heaven.\nFrom a young boy chasing a distant dream,\nTo a voice heard far beyond every screen.",
  "They sang of youth, of fear and pain,\nOf losing yourself and finding again.\nThey taught us that falling isn't the end,\nThat strangers can become family and friends.",
  "And then came ARMY, millions strong,\nFinding their place inside every song.\nAcross every border, across every sea,\nSeven became a world for you and me.",
  "When the road grew long, when the nights felt cold,\nTheir music became something we could hold.\nThrough every goodbye, through every day,\nTheir words reminded us: keep finding your way.",
  "Seven stars, one constellation bright,\nSeven voices turning darkness to light.\nAnd wherever tomorrow may choose to lead,\nTheir story will live in every heart that believed.",
  "Because BTS is more than a name we know\nIt's the courage to rise, the strength to grow.\nAnd when the world feels too heavy to bear,\nThere will always be a song waiting there.",
  "Seven members. One story. One bond.\nAnd millions of hearts\nwalking along."
];

const PoemView = () => {
  return (
    <div className="space-y-8 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-pink-300 text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          <span>POEM ON BTS</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-200 to-purple-300 tracking-wider">
          Seven Stars
        </h1>
        <p className="text-purple-200 text-sm font-semibold italic">
          A poetic tribute to RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook, and ARMY
        </p>
      </div>

      {/* Dedicated Poem Card Container */}
      <div className="rounded-3xl bg-gradient-to-b from-[#140524]/95 via-[#1a0830]/90 to-[#140524]/95 border border-purple-500/40 backdrop-blur-2xl p-8 sm:p-14 shadow-2xl text-center space-y-8 shadow-purple-950/90 border-t-2 border-t-pink-500/60">
        <div className="space-y-6 max-w-2xl mx-auto">
          {POEM_STANZAS.map((stanza, idx) => (
            <div key={idx} className="text-purple-100/90 text-sm sm:text-base leading-relaxed italic font-serif space-y-1">
              {stanza.split('\n').map((line, lineIdx) => (
                <p key={lineIdx}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-purple-500/20 text-xs font-black text-purple-300 uppercase tracking-widest flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Seven Members • One Story • One Bond • Millions of Hearts</span>
        </div>
      </div>
    </div>
  );
};

export default PoemView;
