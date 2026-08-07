// Genera imágenes placeholder reales (no archivos vacíos) para que
// astro:assets pueda leer dimensiones y optimizar durante el build.
// Se ejecuta una sola vez durante el armado del proyecto; no forma parte del
// build normal. Reemplazar los archivos generados por fotos reales cuando
// estén disponibles.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const assetsDir = path.join(root, 'src/assets');
const publicDir = path.join(root, 'public');

await mkdir(assetsDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

const inkHex = '#2F3E38';
const inkSoftHex = '#55655E';
const verdeHex = '#4A6B5D';
const terracotaDarkHex = '#9E5433';

// --- src/assets/mariela.jpg — retrato placeholder (4:5), para "Sobre mí" ---
const marielaSvg = `
<svg width="1000" height="1250" viewBox="0 0 1000 1250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E9EDEC" />
      <stop offset="1" stop-color="#F9EFEB" />
    </linearGradient>
  </defs>
  <rect width="1000" height="1250" fill="url(#bg)" />
  <circle cx="500" cy="430" r="140" fill="${verdeHex}" opacity="0.35" />
  <circle cx="500" cy="950" r="320" fill="${verdeHex}" opacity="0.35" />
  <text x="500" y="1120" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" fill="${inkHex}">Foto de Mariela Acotto</text>
  <text x="500" y="1168" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="${inkSoftHex}">Reemplazar por una foto real</text>
</svg>`;

// --- src/assets/consultorio.jpg — foto del espacio (3:2), para el Hero ---
const consultorioSvg = `
<svg width="1600" height="1067" viewBox="0 0 1600 1067" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F9EFEB" />
      <stop offset="1" stop-color="#F2E4DC" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1067" fill="url(#bg)" />
  <path d="M800 260 L590 440 L590 700 L1010 700 L1010 440 Z"
        fill="none" stroke="${terracotaDarkHex}" stroke-width="10" stroke-linejoin="round" opacity="0.55" />
  <rect x="750" y="470" width="100" height="100" rx="6" fill="none" stroke="${terracotaDarkHex}" stroke-width="8" opacity="0.55" />
  <rect x="760" y="580" width="80" height="120" rx="4" fill="none" stroke="${terracotaDarkHex}" stroke-width="8" opacity="0.55" />
  <text x="800" y="860" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="${inkHex}">Foto del consultorio</text>
  <text x="800" y="910" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="${inkSoftHex}">Reemplazar por una foto real</text>
</svg>`;

// --- public/og.jpg — tarjeta de vista previa para redes/WhatsApp (1200x630 exacto) ---
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F7F4EF" />
      <stop offset="1" stop-color="#F9EFEB" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="1040" cy="120" r="220" fill="${verdeHex}" opacity="0.12" />
  <circle cx="1120" cy="520" r="160" fill="${terracotaDarkHex}" opacity="0.12" />
  <rect x="90" y="255" width="90" height="6" fill="${verdeHex}" />
  <text x="90" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="${inkHex}">Lic. Mariela Acotto</text>
  <text x="90" y="380" font-family="Arial, sans-serif" font-size="30" fill="${inkSoftHex}">Psicóloga — Psicoanálisis y psicoterapia focalizada</text>
</svg>`;

await sharp(Buffer.from(marielaSvg)).jpeg({ quality: 82 }).toFile(path.join(assetsDir, 'mariela.jpg'));
await sharp(Buffer.from(consultorioSvg)).jpeg({ quality: 82 }).toFile(path.join(assetsDir, 'consultorio.jpg'));
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88 }).toFile(path.join(publicDir, 'og.jpg'));

console.log('Placeholders generados: src/assets/mariela.jpg, src/assets/consultorio.jpg, public/og.jpg');
