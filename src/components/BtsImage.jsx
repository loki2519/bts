import React, { useState } from 'react';

const BtsImage = ({ src, alt, className = '', objectPosition = 'center', fallbackTitle = '' }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-purple-950/40 border border-purple-500/20 ${className}`}>
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105`}
          style={{ objectPosition }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-950 via-slate-950 to-purple-900 text-center text-purple-200">
          <div className="w-12 h-12 mb-2 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="font-display font-bold text-purple-300 text-lg">BTS</span>
          </div>
          <span className="font-display text-sm font-semibold tracking-wider text-purple-100">
            {fallbackTitle || alt || "BTS WORLD"}
          </span>
          <span className="text-[10px] text-purple-400 mt-1 uppercase tracking-widest">BTS Experience</span>
        </div>
      )}
    </div>
  );
};

export default BtsImage;
