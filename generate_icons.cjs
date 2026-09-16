const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size, isMaskable) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#2563eb'; // blue-600
  ctx.fillRect(0, 0, size, size);

  // Book icon styling
  ctx.fillStyle = '#ffffff';
  
  // padding / safe zone
  const padding = isMaskable ? size * 0.2 : size * 0.15; 
  const innerSize = size - padding * 2;
  const centerX = size / 2;
  const centerY = size / 2;

  // Draw a simple open book or "VTU" text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${innerSize * 0.4}px Arial`;
  ctx.fillText('VTU', centerX, centerY - innerSize * 0.1);
  
  ctx.font = `bold ${innerSize * 0.25}px Arial`;
  ctx.fillText('NOTES', centerX, centerY + innerSize * 0.25);

  const buffer = canvas.toBuffer('image/png');
  const filename = isMaskable ? `public/pwa-maskable-${size}x${size}.png` : `public/pwa-${size}x${size}.png`;
  fs.writeFileSync(filename, buffer);
  console.log('Generated', filename);
}

drawIcon(192, false);
drawIcon(512, false);
drawIcon(512, true);

