import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userMediaDir = 'C:/Users/maddi/.gemini/antigravity/brain/3368ef3f-c12f-48a9-8006-f66b25209e11/.user_uploaded';
const targetDir = 'c:/Users/maddi/Desktop/bts/public/images/bts';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function prepareImages() {
  console.log("Processing uploaded BTS member images...");

  // Copy primary uploaded images
  const fallonSrc = path.join(userMediaDir, 'media_1787327426918.png');
  const vSrc = path.join(userMediaDir, 'media_1787327437389.png');
  const stageSrc = path.join(userMediaDir, 'media_1787327446560.png');
  const jinSrc = path.join(userMediaDir, 'media_1787327456147.png');
  const portraitSrc = path.join(userMediaDir, 'media_1787327522075.png');

  if (fs.existsSync(fallonSrc)) {
    await sharp(fallonSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'group_hero.jpg'));
    console.log("Saved group_hero.jpg");
  }

  if (fs.existsSync(stageSrc)) {
    await sharp(stageSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'group_stage.jpg'));
    console.log("Saved group_stage.jpg");
  }

  if (fs.existsSync(vSrc)) {
    await sharp(vSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'member_v.jpg'));
    console.log("Saved member_v.jpg");
  }

  if (fs.existsSync(jinSrc)) {
    await sharp(jinSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'member_jin.jpg'));
    console.log("Saved member_jin.jpg");
  }

  if (fs.existsSync(portraitSrc)) {
    await sharp(portraitSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'group_portrait.jpg'));
    await sharp(portraitSrc).jpeg({ quality: 90 }).toFile(path.join(targetDir, 'group_login.jpg'));
    console.log("Saved group_portrait.jpg and group_login.jpg");

    // Get image dimensions to perform precise member crops
    const metadata = await sharp(portraitSrc).metadata();
    const { width, height } = metadata;
    console.log(`Group Portrait dimensions: ${width}x${height}`);

    // Crop member portraits:
    // 1. Jung Kook (Top center)
    await sharp(portraitSrc)
      .extract({ left: Math.floor(width * 0.35), top: Math.floor(height * 0.08), width: Math.floor(width * 0.32), height: Math.floor(height * 0.28) })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, 'member_jungkook.jpg'));

    // 2. j-hope (Middle left)
    await sharp(portraitSrc)
      .extract({ left: Math.floor(width * 0.12), top: Math.floor(height * 0.25), width: Math.floor(width * 0.28), height: Math.floor(height * 0.32) })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, 'member_jhope.jpg'));

    // 3. RM (Middle right)
    await sharp(portraitSrc)
      .extract({ left: Math.floor(width * 0.58), top: Math.floor(height * 0.25), width: Math.floor(width * 0.28), height: Math.floor(height * 0.32) })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, 'member_rm.jpg'));

    // 4. Jimin (Bottom left)
    await sharp(portraitSrc)
      .extract({ left: 0, top: Math.floor(height * 0.45), width: Math.floor(width * 0.4), height: Math.floor(height * 0.45) })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, 'member_jimin.jpg'));

    // 5. SUGA (Bottom right)
    await sharp(portraitSrc)
      .extract({ left: Math.floor(width * 0.6), top: Math.floor(height * 0.45), width: Math.floor(width * 0.4), height: Math.floor(height * 0.45) })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, 'member_suga.jpg'));

    console.log("All member image crops extracted successfully!");
  }
}

prepareImages().catch(console.error);
