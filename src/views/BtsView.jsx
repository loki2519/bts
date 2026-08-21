import React from 'react';
import { History, Sparkles, Globe, Heart, Award, Music } from 'lucide-react';

const BtsView = () => {
  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          FACTUAL OVERVIEW
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS (Bangtan Sonyeondan)
        </h1>
        <p className="text-purple-300/80 text-sm max-w-2xl mx-auto">
          The history, musical evolution, and unprecedented global impact of BTS and ARMY.
        </p>
      </div>

      {/* Grid of Core Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Debut (2013) */}
        <div className="p-8 rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <History className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-purple-100">1. Debut & Roots (2013)</h2>
          <p className="text-purple-300/90 text-sm leading-relaxed">
            Formed by Bang Si-hyuk under Big Hit Entertainment, BTS debuted on June 13, 2013 with their single album <em>2 COOL 4 SKOOL</em> and lead track "No More Dream". Unlike typical pop groups, BTS wrote their own lyrics addressing social pressures, school expectations, and youth anxiety.
          </p>
        </div>

        {/* Musical Journey */}
        <div className="p-8 rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Music className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-purple-100">2. Musical Journey & Concept Eras</h2>
          <p className="text-purple-300/90 text-sm leading-relaxed">
            BTS's discography evolves through distinct narrative eras: the <strong>School Trilogy</strong> (2013-2014), the groundbreaking <strong>HYYH (Youth Trilogy)</strong> (2015-2016), the dark temptation of <strong>WINGS</strong> (2016), the therapeutic message of <strong>Love Yourself</strong> (2017-2018), <strong>Map of the Soul</strong> (2019-2020), pandemic comforting album <strong>BE</strong> (2020), and <strong>Proof</strong> (2022).
          </p>
        </div>

        {/* Global Journey */}
        <div className="p-8 rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-purple-100">3. Global Breakthrough</h2>
          <p className="text-purple-300/90 text-sm leading-relaxed">
            Breaking language barriers, BTS became the first Korean group to win at the Billboard Music Awards (2017), top the US Billboard 200 albums chart (2018), and earn 5 consecutive Billboard Hot 100 #1 singles including "Dynamite", "Butter", and "Life Goes On".
          </p>
        </div>

        {/* ARMY Synergy */}
        <div className="p-8 rounded-3xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-purple-100">4. ARMY & Cultural Impact</h2>
          <p className="text-purple-300/90 text-sm leading-relaxed">
            The bond between BTS and ARMY is unprecedented in music history. Through UNICEF's #LOVE_MYSELF campaign, UN addresses, and cultural philanthropy, BTS and ARMY have raised millions of dollars for charitable causes worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BtsView;
