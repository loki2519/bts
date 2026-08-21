import React from 'react';
import { TIMELINE_EVENTS } from '../data/btsData';
import BtsImage from '../components/BtsImage';
import { Sparkles, Calendar, Award, Star } from 'lucide-react';

const MomentsView = () => {
  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          MEMORABLE MILESTONES
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Historic Moments
        </h1>
        <p className="text-purple-300/80 text-sm max-w-2xl mx-auto">
          An emotional timeline of unforgettable moments from debut to global history.
        </p>
      </div>

      {/* Interactive Timeline Grid */}
      <div className="relative space-y-6 max-w-4xl mx-auto">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div
            key={idx}
            className="group rounded-3xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-xl flex flex-col sm:flex-row gap-6 items-start"
          >
            <div className="flex-shrink-0 w-full sm:w-44 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-xs font-bold text-pink-300 uppercase">
                {event.year}
              </span>
              <div className="text-xs text-purple-300/80 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>{event.date}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <h3 className="font-display text-xl font-bold text-purple-100 group-hover:text-pink-300 transition-colors">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-purple-300/90 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentsView;
