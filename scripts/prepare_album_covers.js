import fs from 'fs';
import path from 'path';

const targetDir = 'c:/Users/maddi/Desktop/bts/public/images/bts';

const albums = [
  {
    filename: 'album_proof.svg',
    title: 'PROOF',
    subtitle: 'BTS ANTHOLOGY',
    color1: '#111827', color2: '#1f2937', accent: '#9ca3af',
    icon: `<polygon points="120,40 190,90 190,310 120,360" fill="#e5e7eb" /><polygon points="210,90 280,40 280,360 210,310" fill="#e5e7eb" />`
  },
  {
    filename: 'album_be.svg',
    title: 'BE',
    subtitle: 'DELUXE EDITION',
    color1: '#0f172a', color2: '#1e293b', accent: '#38bdf8',
    icon: `<text x="200" y="220" font-family="serif" font-weight="bold" font-size="110" fill="#f8fafc" text-anchor="middle">BE</text>`
  },
  {
    filename: 'album_mots7.svg',
    title: 'MAP OF THE SOUL',
    subtitle: '7',
    color1: '#1e1b4b', color2: '#312e81', accent: '#818cf8',
    icon: `<text x="200" y="240" font-family="sans-serif" font-weight="900" font-size="160" fill="#a5b4fc" text-anchor="middle">7</text>`
  },
  {
    filename: 'album_persona.svg',
    title: 'MAP OF THE SOUL',
    subtitle: 'PERSONA',
    color1: '#831843', color2: '#9d174d', accent: '#f472b6',
    icon: `<path d="M200 120 C140 60, 60 120, 200 280 C340 120, 260 60, 200 120 Z" fill="none" stroke="#fbcfe8" stroke-width="12" />`
  },
  {
    filename: 'album_ly_answer.svg',
    title: 'LOVE YOURSELF',
    subtitle: 'ANSWER',
    color1: '#581c87', color2: '#6b21a8', accent: '#c084fc',
    icon: `<circle cx="200" cy="180" r="80" fill="none" stroke="#e9d5ff" stroke-width="10" stroke-dasharray="15,10" />`
  },
  {
    filename: 'album_ly_tear.svg',
    title: 'LOVE YOURSELF',
    subtitle: 'TEAR',
    color1: '#09090b', color2: '#18181b', accent: '#a1a1aa',
    icon: `<path d="M200 100 C150 100, 120 180, 200 280 C280 180, 250 100, 200 100 Z" fill="none" stroke="#e4e4e7" stroke-width="8" />`
  },
  {
    filename: 'album_wings.svg',
    title: 'WINGS',
    subtitle: 'YOU NEVER WALK ALONE',
    color1: '#18181b', color2: '#27272a', accent: '#c084fc',
    icon: `
      <circle cx="160" cy="140" r="45" fill="#3f3f46" />
      <circle cx="240" cy="140" r="45" fill="#a1a1aa" />
      <circle cx="160" cy="220" r="45" fill="#a1a1aa" />
      <circle cx="240" cy="220" r="45" fill="#3f3f46" />
    `
  },
  {
    filename: 'album_hyyh.svg',
    title: 'HYYH',
    subtitle: 'YOUNG FOREVER',
    color1: '#064e3b', color2: '#047857', accent: '#34d399',
    icon: `<circle cx="200" cy="180" r="70" fill="none" stroke="#a7f3d0" stroke-width="6" /><path d="M200 110 L200 250 M130 180 L270 180" stroke="#a7f3d0" stroke-width="6" />`
  }
];

function generateAlbumCovers() {
  console.log("Generating BTS Album Cover Artwork SVGs...");

  albums.forEach(alb => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${alb.filename.replace('.svg','')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${alb.color1}" />
      <stop offset="100%" stop-color="${alb.color2}" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg_${alb.filename.replace('.svg','')})" />
  <rect width="380" height="380" x="10" y="10" fill="none" stroke="${alb.accent}" stroke-width="2" opacity="0.3" rx="16" />
  <g transform="translate(0, 10)">
    ${alb.icon}
  </g>
  <text x="200" y="325" font-family="'Cinzel', serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">${alb.title}</text>
  <text x="200" y="352" font-family="sans-serif" font-weight="700" font-size="12" fill="${alb.accent}" text-anchor="middle" letter-spacing="6">${alb.subtitle}</text>
</svg>`;

    fs.writeFileSync(path.join(targetDir, alb.filename), svgContent, 'utf8');
    console.log(`Saved ${alb.filename}`);
  });

  console.log("All album cover artwork generated!");
}

generateAlbumCovers();
