import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const ip = '10.207.229.108';
const port = 3000;
const expoUrl = `exp://${ip}:8081`;
const webUrl = `http://${ip}:${port}`;
const localhostUrl = `http://localhost:${port}`;

const artifactDir = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11';
const publicDir = 'c:/Users/maddi/Desktop/bts/public/images';

async function generateQRCodes() {
  console.log("==================================================");
  console.log("   BTS WORLD — LOCALHOST & MOBILE QR CODE        ");
  console.log("==================================================");
  console.log(`Localhost URL:  ${localhostUrl}`);
  console.log(`Network URL:    ${webUrl}`);
  console.log(`Expo Go URL:    ${expoUrl}`);
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

  console.log("==================================================");
  console.log("QR Code regenerated for port 3000!");
}

generateQRCodes();
