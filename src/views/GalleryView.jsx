import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/btsData';
import BtsImage from '../components/BtsImage';
import Lightbox from '../components/Lightbox';

const GalleryView = () => {
  const [filter, setFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const availableFilters = ['ALL', 'GROUP', 'MEMBERS', 'MOMENTS'];

  const filteredImages = GALLERY_IMAGES.filter((item) => {
    if (filter === 'ALL') return item.category !== 'ALBUMS';
    return item.category === filter;
  });

  return (
    <div className="space-y-8 py-6">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          VISUAL ARCHIVE
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
          BTS Photo Gallery
        </h1>
        <p className="text-purple-300/80 text-sm max-w-lg mx-auto">
          Explore iconic moments, group performances, and individual member visuals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {availableFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filter === cat
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                : 'bg-purple-950/60 border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid - 3/4 Aspect Ratio matching MembersView */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredImages.map((imgItem, idx) => (
          <div
            key={imgItem.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/60 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1.5 bg-purple-950/60"
          >
            <BtsImage
              src={imgItem.url}
              alt={imgItem.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              fallbackTitle={imgItem.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{imgItem.category}</span>
              <h4 className="font-display text-sm font-bold text-white mt-0.5">{imgItem.title}</h4>
              <p className="text-[11px] text-purple-200/90 leading-snug mt-1">{imgItem.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredImages.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
        />
      )}
    </div>
  );
};

export default GalleryView;
