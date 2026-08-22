import React from 'react';
import { Sparkles, ArrowRight, Camera, Users } from 'lucide-react';
import BtsImage from '../components/BtsImage';

const HomeView = ({ setActiveSection }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950/80 via-slate-950 to-purple-900/60 border border-purple-500/30 p-8 sm:p-14 text-center shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-25">
          <BtsImage src="/images/bts/group_hero.jpg" alt="BTS Concert" className="w-full h-full border-none" objectPosition="center top" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>BTS DIGITAL FAN WORLD</span>
          </div>

          <h1 className="font-display text-3xl sm:text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-pink-300 leading-tight">
            WELCOME TO THE BTS WORLD
          </h1>

          <p className="text-purple-200/90 text-sm sm:text-lg font-display italic max-w-2xl mx-auto leading-relaxed">
            "Where music becomes memories, moments become stories, and ARMY becomes family."
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveSection('bts')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>EXPLORE BTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSection('photoframe')}
              className="px-8 py-3.5 rounded-xl bg-purple-950/80 border border-pink-500/50 text-pink-300 font-bold text-sm tracking-wider uppercase hover:bg-purple-900/60 hover:text-white transition-all flex items-center space-x-2 shadow-lg"
            >
              <Camera className="w-4 h-4 text-pink-400" />
              <span>PHOTO WITH BTS</span>
            </button>
            <button
              onClick={() => setActiveSection('members')}
              className="px-8 py-3.5 rounded-xl bg-purple-950/80 border border-purple-400/40 text-purple-200 font-bold text-sm tracking-wider uppercase hover:bg-purple-900/60 hover:text-white transition-all flex items-center space-x-2"
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>MEET MEMBERS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { metric: "7", label: "Members", desc: "RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook" },
          { metric: "2013", label: "Debut Year", desc: "June 13, 2013 with 2 COOL 4 SKOOL" },
          { metric: "#1", label: "Billboard Hot 100", desc: "Historic Asian Act Hot 100 & 200 Multi-No.1s" },
          { metric: "ARMY", label: "Global Family", desc: "World's largest united music fandom" }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md text-center hover:border-purple-400/40 transition-all">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              {stat.metric}
            </div>
            <div className="font-bold text-xs uppercase tracking-wider text-purple-200 mt-1">{stat.label}</div>
            <div className="text-[11px] text-purple-400/80 mt-1">{stat.desc}</div>
          </div>
        ))}
      </section>

      {/* BTS Introduction Section */}
      <section className="rounded-3xl bg-purple-950/40 border border-purple-500/20 p-8 sm:p-10 backdrop-blur-md space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400">ABOUT BANGTAN SONYEONDAN</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-purple-100">
            A Musical Journey That Redefined Global Pop Culture
          </h2>
          <p className="text-purple-300/90 text-sm leading-relaxed">
            BTS (Bangtan Sonyeondan / 방탄소년단) is a Grammy-nominated South Korean music group that has captured the hearts of millions of fans globally since their debut in June 2013. Composed of seven extraordinary artists—RM, Jin, SUGA, j-hope, Jimin, V, and Jung Kook—BTS is recognized for their self-produced music, top-tier choreography, and deep messages of self-love, mental health awareness, and youth empowerment.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {[
            { title: "BTS Photo Frame", desc: "Take a realistic photo with your favorite BTS member or OT7 group and download!", target: 'photoframe', icon: Camera },
            { title: "Music & Discography", desc: "Explore iconic albums from HYYH to Map of the Soul & Proof.", target: 'music', icon: Sparkles },
            { title: "Playable Games & Quizzes", desc: "Test your ARMY knowledge with 9-chance games and master quizzes.", target: 'games', icon: Sparkles },
            { title: "BTS Moments & Lore", desc: "Dive into UN speeches, Wembley stadium, and the BTS Universe.", target: 'moments', icon: Sparkles }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSection(item.target)}
              className="p-5 rounded-2xl bg-purple-900/30 border border-purple-500/20 hover:border-pink-400/50 cursor-pointer transition-all hover:-translate-y-1 shadow-lg"
            >
              <h3 className="font-display font-bold text-base text-purple-200 mb-2">{item.title}</h3>
              <p className="text-xs text-purple-300/80 mb-4">{item.desc}</p>
              <span className="text-xs font-bold text-pink-400 flex items-center space-x-1">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
