#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 80;

// Create WebP versions with multiple sizes for responsive images
async function optimizeImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(IMAGES_DIR, file);
      const name = path.parse(file).name;
      
      console.log(`Optimizing ${file}...`);
      
      // Create WebP version
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(path.join(IMAGES_DIR, `${name}.webp`));
      
      // Create responsive sizes
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Small size for thumbnails
      await image
        .resize(300, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(IMAGES_DIR, `${name}-small.webp`));
      
      // Medium size
      await sharp(inputPath)
        .resize(768, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(IMAGES_DIR, `${name}-medium.webp`));
      
      // Large size
      await sharp(inputPath)
        .resize(1200, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(IMAGES_DIR, `${name}-large.webp`));
      
      // Remove original if WebP exists and is smaller
      const webpPath = path.join(IMAGES_DIR, `${name}.webp`);
      const webpStats = fs.statSync(webpPath);
      const originalStats = fs.statSync(inputPath);
      
      if (webpStats.size < originalStats.size) {
        fs.unlinkSync(inputPath);
        console.log(`Removed ${file} (WebP is ${(originalStats.size - webpStats.size) / 1024}KB smaller)`);
      }
    }
  }
  
  console.log('Image optimization complete!');
}

if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };
