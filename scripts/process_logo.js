import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedLogoPath = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11/.user_uploaded/media_1787329722177.png';
const targetPngPath = 'c:/Users/maddi/Desktop/bts/public/images/bts/logo.png';
const targetSvgPath = 'c:/Users/maddi/Desktop/bts/public/images/bts/logo.svg';

async function processLogo() {
  if (fs.existsSync(uploadedLogoPath)) {
    console.log("Processing uploaded BTS white logo...");
    // Load image, convert black pixels to transparent
    const image = sharp(uploadedLogoPath);
    const { width, height } = await image.metadata();

    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    // Iterate through pixels: convert near-black to transparent alpha 0, keep white pixels
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // If pixel is black/dark background (brightness < 40)
      if (r < 40 && g < 40 && b < 40) {
        if (info.channels === 4) {
          data[i + 3] = 0; // Transparent
        }
      } else {
        // Keep white logo crisp
        if (info.channels === 4) {
          data[i + 3] = 255;
        }
      }
    }

    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels }
    })
    .png()
    .toFile(targetPngPath);

    console.log("Saved transparent white logo to public/images/bts/logo.png");
  }

  // Also write SVG version of the official white BTS doors + BTS text for vector crispness
  const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <!-- Left Trapezoid Door -->
  <polygon points="160,50 240,110 240,380 160,420" fill="#FFFFFF" />
  <!-- Right Trapezoid Door -->
  <polygon points="260,110 340,50 340,420 260,380" fill="#FFFFFF" />
  <!-- BTS Text -->
  <text x="250" y="475" font-family="'Cinzel', 'Inter', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="12">BTS</text>
</svg>`;

  fs.writeFileSync(targetSvgPath, cleanSvg, 'utf8');
  console.log("Saved clean vector white logo to public/images/bts/logo.svg");
}

processLogo().catch(console.error);
