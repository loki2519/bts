import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targetDir = 'c:/Users/maddi/Desktop/bts/public/images/bts';
const userMediaDir = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11/.user_uploaded';

async function updateVAndJungkook() {
  console.log("Updating V and Jung Kook photos...");

  const vSrc = path.join(userMediaDir, 'media_1787331895496.png');
  const jkSrc = path.join(userMediaDir, 'media_1787331948059.png');

  if (fs.existsSync(vSrc)) {
    await sharp(vSrc).jpeg({ quality: 95 }).toFile(path.join(targetDir, 'member_v.jpg'));
    console.log("Updated V -> member_v.jpg");
  }

  if (fs.existsSync(jkSrc)) {
    await sharp(jkSrc).jpeg({ quality: 95 }).toFile(path.join(targetDir, 'member_jungkook.jpg'));
    console.log("Updated Jung Kook -> member_jungkook.jpg");
  }

  console.log("V and Jung Kook photo update complete!");
}

updateVAndJungkook().catch(console.error);
