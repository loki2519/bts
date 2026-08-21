import React from 'react';
import { TIMELINE_EVENTS } from '../data/btsData';
import { Calendar, Sparkles } from 'lucide-react';

const TimelineView = () => {
  return (
    <div className="space-y-10 py-6">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          INTERACTIVE CHRONOLOGY
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Interactive Timeline
        </h1>
        <p className="text-purple-300/80 text-sm max-w-xl mx-auto">
          Horizontal layout on desktop viewports and vertical on mobile devices.
        </p>
      </div>

      {/* Desktop Horizontal Scrollable Timeline */}
      <div className="hidden lg:block overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex space-x-6 min-w-max px-4">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="w-80 rounded-3xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md p-6 space-y-3 flex-shrink-0 shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-xs font-bold text-pink-300">
                  {event.year}
                </span>
                <span className="text-[11px] text-purple-400 font-semibold">{event.type}</span>
              </div>
              <h3 className="font-display font-bold text-base text-purple-100">{event.title}</h3>
              <div className="text-[11px] text-purple-300/70">{event.date}</div>
              <p className="text-xs text-purple-300/90 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Vertical Timeline */}
      <div className="block lg:hidden space-y-6 max-w-xl mx-auto">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-purple-950/40 border border-purple-500/20 p-6 backdrop-blur-md space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-xs font-bold text-pink-300">
                {event.year}
              </span>
              <span className="text-[11px] text-purple-400 font-semibold">{event.date}</span>
            </div>
            <h3 className="font-display font-bold text-lg text-purple-100">{event.title}</h3>
            <p className="text-xs text-purple-300/90 leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
