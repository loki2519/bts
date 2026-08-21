import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targetDir = 'c:/Users/maddi/Desktop/bts/public/images/bts';

const uploads = [
  { file: 'media_1787330584407.png', target: 'member_rm.jpg', name: 'RM' },
  { file: 'media_1787330667535.png', target: 'member_jin.jpg', name: 'Jin' },
  { file: 'media_1787330753480.png', target: 'member_suga.jpg', name: 'SUGA' },
  { file: 'media_1787330795395.png', target: 'member_jhope.jpg', name: 'j-hope' },
  { file: 'media_1787330852033.png', target: 'member_jimin.jpg', name: 'Jimin' }
];

const userMediaDir = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11/.user_uploaded';

async function updateMemberPhotos() {
  console.log("Updating BTS member photos from user uploads...");

  for (const item of uploads) {
    const srcPath = path.join(userMediaDir, item.file);
    const destPath = path.join(targetDir, item.target);

    if (fs.existsSync(srcPath)) {
      await sharp(srcPath)
        .jpeg({ quality: 95 })
        .toFile(destPath);
      console.log(`Updated ${item.name} -> ${item.target}`);
    } else {
      console.warn(`Source missing: ${srcPath}`);
    }
  }

  console.log("Member photo update completed!");
}

updateMemberPhotos().catch(console.error);
