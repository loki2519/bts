import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const ip = '10.207.229.108';
const expoUrl = `exp://${ip}:8081`;
const webUrl = `http://${ip}:5173`;

const artifactDir = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11';
const publicDir = 'c:/Users/maddi/Desktop/bts/public/images';

async function generateQRCodes() {
  console.log("==================================================");
  console.log("   BTS WORLD — EXPO & MOBILE QR CODE GENERATOR   ");
  console.log("==================================================");
  console.log(`Expo Go URL:    ${expoUrl}`);
  console.log(`Mobile Web URL: ${webUrl}`);
  console.log("--------------------------------------------------");
  console.log("Scan this QR Code with Expo Go (Android/iOS) or Camera:");
  console.log("--------------------------------------------------");

  // 1. Generate ASCII QR for terminal
  const terminalQR = await QRCode.toString(webUrl, { type: 'terminal', small: true });
  console.log(terminalQR);

  // 2. Generate PNG in artifact directory
  const artifactPngPath = path.join(artifactDir, 'expo_qr_code.png');
  await QRCode.toFile(artifactPngPath, webUrl, {
    color: {
      dark: '#140524',
      light: '#ffffff'
    },
    width: 400,
    margin: 2
  });
  console.log(`Saved PNG QR Code to: ${artifactPngPath}`);

  // 3. Generate PNG in public directory
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPngPath = path.join(publicDir, 'expo_qr.png');
  await QRCode.toFile(publicPngPath, webUrl, {
    color: {
      dark: '#140524',
      light: '#ffffff'
    },
    width: 400,
    margin: 2
  });
  console.log(`Saved public PNG QR Code to: ${publicPngPath}`);

  // 4. Generate SVG string
  const svgString = await QRCode.toString(webUrl, { type: 'svg' });
  const svgPath = path.join(publicDir, 'expo_qr.svg');
  fs.writeFileSync(svgPath, svgString, 'utf8');
  console.log(`Saved public SVG QR Code to: ${svgPath}`);

  console.log("==================================================");
  console.log("QR Code generation completed successfully!");
}

generateQRCodes();
