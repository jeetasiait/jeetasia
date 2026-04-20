import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputDir = join(__dirname, '../public');

// Ensure public directory exists
if (!existsSync(outputDir)) {
  await mkdir(outputDir, { recursive: true });
}

// Favicon sizes to generate
const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

// Generate favicon
async function generateFavicon() {
  try {
    // Create a base canvas with the largest size
    const size = Math.max(...sizes);
    const canvas = createCanvas(size, size);
    const context = canvas.getContext('2d');

    // Draw background
    context.fillStyle = '#1e40af'; // jeet-blue
    context.fillRect(0, 0, size, size);

    // Draw 'J' in the center
    context.fillStyle = '#ffffff';
    context.font = `bold ${size * 0.6}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('J', size / 2, size / 2);

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');

    // Generate different sizes using sharp
    for (const s of sizes) {
      // Save the image
      await writeFile(join(outputDir, `favicon-${s}x${s}.png`), buffer);
      console.log(`Generated favicon ${s}x${s}`);

      // Also generate ICO format for browser compatibility
      if (s === 32) {
        await sharp(buffer)
          .resize(32, 32)
          .toFile(join(outputDir, 'favicon.ico'));
        console.log('Generated favicon.ico');
      }
    }

    // Generate apple-touch-icon
    await sharp(buffer)
      .resize(180, 180)
      .toFile(join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    // Generate icon.svg
    const svgContent = `
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#1e40af"/>
        <text x="50%" y="50%" font-family="Arial" font-size="300" font-weight="bold" 
              fill="#ffffff" text-anchor="middle" dominant-baseline="middle">J</text>
      </svg>
    `;
    await writeFile(join(outputDir, 'icon.svg'), svgContent.trim());
    console.log('Generated icon.svg');

    // Generate site.webmanifest
    const manifest = {
      name: 'JEET Asia',
      short_name: 'JEET Asia',
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
      ],
      theme_color: '#1e40af',
      background_color: '#1e40af',
      display: 'standalone'
    };
    await writeFile(
      join(outputDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('Generated site.webmanifest');

    // Generate browserconfig.xml
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#1e40af</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    await writeFile(join(outputDir, 'browserconfig.xml'), browserConfig);
    console.log('Generated browserconfig.xml');

    console.log('\nFavicon generation complete!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon().catch(console.error);
