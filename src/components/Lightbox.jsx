import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import BtsImage from './BtsImage';

const Lightbox = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  if (currentIndex === null || !items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fade-in">
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-white border-b border-purple-500/20 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
            {currentItem?.category || "BTS Gallery"} ({currentIndex + 1}/{items.length})
          </span>
          <h3 className="font-display text-lg font-bold text-purple-100">{currentItem?.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-purple-900/40 hover:bg-purple-800 text-purple-200 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-4xl h-[65vh] my-auto flex items-center justify-center">
        <button
          onClick={onPrev}
          className="absolute left-2 sm:-left-12 z-10 p-3 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="w-full h-full flex items-center justify-center p-2">
          <BtsImage
            src={currentItem?.image}
            alt={currentItem?.title}
            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-purple-500/30"
            fallbackTitle={currentItem?.title}
          />
        </div>

        <button
          onClick={onNext}
          className="absolute right-2 sm:-right-12 z-10 p-3 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption Footer */}
      <div className="w-full max-w-2xl text-center text-xs text-purple-300/80 bg-purple-950/60 border border-purple-500/20 p-3 rounded-xl">
        {currentItem?.caption || "A memorable visual moment from the BTS Universe."}
      </div>
    </div>
  );
};

export default Lightbox;
