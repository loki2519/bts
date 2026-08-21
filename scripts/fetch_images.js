import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  { name: 'group_login.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/BTS_for_White_House_Press_Briefing_31_May_2022.jpg' },
  { name: 'group_hero.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/BTS_at_the_2019_American_Music_Awards.jpg' },
  { name: 'member_rm.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/RM_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_jin.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Jin_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_suga.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Suga_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_jhope.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/J-Hope_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_jimin.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Jimin_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_v.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/V_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'member_jungkook.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Jungkook_at_the_White_House%2C_31_May_2022.jpg' },
  { name: 'moment_whitehouse.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/BTS_White_House_May_2022.jpg' }
];

const targetDir = path.resolve('public/images/bts');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BTSFanApp/1.0 (https://btsworld.app; admin@btsworld.app)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('error', err => reject(err));
  });
}

async function run() {
  for (const img of images) {
    const destPath = path.join(targetDir, img.name);
    try {
      await download(img.url, destPath);
      console.log(`Successfully downloaded: ${img.name}`);
    } catch (e) {
      console.log(`Fallback for ${img.name}: ${e.message}`);
    }
  }
}

run();
