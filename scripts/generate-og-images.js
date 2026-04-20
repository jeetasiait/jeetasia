import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputDir = join(__dirname, '../public/images/og');

// Ensure public/images/og directory exists
if (!existsSync(outputDir)) {
  await mkdir(outputDir, { recursive: true });
}

// Define pages and their titles
const pages = [
  { name: 'home', title: 'JEET Asia Private Limited', subtitle: 'Infrastructure & Construction Experts' },
  { name: 'about', title: 'About Us', subtitle: 'Building Excellence Since 2014' },
  { name: 'services', title: 'Our Services', subtitle: 'Comprehensive Construction Solutions' },
  { name: 'projects', title: 'Our Projects', subtitle: 'Showcasing Our Work' },
  { name: 'contact', title: 'Contact Us', subtitle: 'Get in Touch With Our Team' }
];

// Generate OG image for a page
async function generateOGImage({ name, title, subtitle }) {
  const width = 1200;
  const height = 630;
  
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Background gradient
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1e40af'); // jeet-blue
  gradient.addColorStop(1, '#1e3a8a'); // darker blue
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  // Add pattern overlay
  context.globalAlpha = 0.1;
  context.fillStyle = '#ffffff';
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      context.fillRect(x, y, 20, 20);
    }
  }
  context.globalAlpha = 1.0;

  // Add logo (placeholder)
  const logoSize = 120;
  context.fillStyle = '#ffffff';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.fillText('JEET', width / 2, 180);
  context.font = '30px Arial';
  context.fillText('ASIA', width / 2, 220);

  // Add title
  context.font = 'bold 48px Arial';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  
  // Split title into multiple lines if needed
  const titleLines = wrapText(context, title, width - 200, 48);
  titleLines.forEach((line, i) => {
    context.fillText(line, width / 2, 350 + (i * 60));
  });

  // Add subtitle
  if (subtitle) {
    context.font = '24px Arial';
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const subtitleY = 350 + (titleLines.length * 60) + 30;
    context.fillText(subtitle, width / 2, subtitleY);
  }

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  await writeFile(join(outputDir, `og-${name}.png`), buffer);
  console.log(`Generated OG image for ${name}`);
}

// Helper function to wrap text
function wrapText(context, text, maxWidth, fontSize) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  context.font = `bold ${fontSize}px Arial`;
  
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = context.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// Generate all OG images
async function generateAllImages() {
  for (const page of pages) {
    await generateOGImage(page);
  }
  console.log('All OG images generated successfully!');
}

generateAllImages().catch(console.error);
