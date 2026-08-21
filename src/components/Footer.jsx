import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

const Footer = ({ setActiveSection }) => {
  return (
    <footer className="bg-purple-950/80 border-t border-purple-500/20 py-8 px-4 sm:px-6 lg:px-8 text-center text-purple-300 text-xs">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <img src="/images/bts/logo.svg" alt="BTS" className="w-5 h-5 opacity-80" />
          <span className="font-display font-bold text-sm tracking-widest text-purple-200">BTS WORLD</span>
          <span className="text-purple-400">•</span>
          <span className="text-pink-400 flex items-center gap-1 font-medium">
            Made with <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 inline" /> for ARMY
          </span>
        </div>

        <p className="max-w-2xl mx-auto text-purple-300/80 text-[11px] leading-relaxed">
          "Independent fan-made website. Not affiliated with or endorsed by BTS or HYBE."
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-[11px] text-purple-400 pt-2 border-t border-purple-500/10">
          <button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">1. Home</button>
          <button onClick={() => setActiveSection('members')} className="hover:text-white transition-colors">3. Members</button>
          <button onClick={() => setActiveSection('music')} className="hover:text-white transition-colors">4. Music</button>
          <button onClick={() => setActiveSection('games')} className="hover:text-white transition-colors">7. Games</button>
          <button onClick={() => setActiveSection('quiz')} className="hover:text-white transition-colors">8. Quiz</button>
          <button onClick={() => setActiveSection('armycorner')} className="hover:text-white transition-colors">18. ARMY Corner</button>
          <button onClick={() => setActiveSection('closing')} className="hover:text-white transition-colors">20. Closing</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
