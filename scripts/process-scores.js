import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'referencias', 'patitura my versions');
const destDir = path.join(rootDir, 'public', 'scores');
const thumbsDir = path.join(rootDir, 'public', 'scores', 'thumbs');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

const files = fs.readdirSync(srcDir)
  .filter(f => f.endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log('Files to process:', files);

const results = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const pageNum = i + 1;
  const numStr = String(pageNum).padStart(2, '0');
  const srcPath = path.join(srcDir, file);
  
  const destName = `score-page-${numStr}.jpg`;
  const destPath = path.join(destDir, destName);
  const thumbPath = path.join(thumbsDir, destName);

  console.log(`Processing page ${pageNum}: ${file}...`);

  // Max dimension 2400 for high quality zoom in lightbox
  await sharp(srcPath)
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(destPath);

  // Thumbnail max width 800 for carousel slide
  await sharp(srcPath)
    .resize({ width: 800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toFile(thumbPath);

  const meta = await sharp(destPath).metadata();
  console.log(`Page ${pageNum} saved: ${meta.width}x${meta.height}, size: ${(fs.statSync(destPath).size / 1024).toFixed(1)} KB`);

  results.push({
    src: `/scores/${destName}`,
    thumb: `/scores/thumbs/${destName}`,
    width: meta.width,
    height: meta.height,
    alt: `Score — Page ${pageNum}`,
    caption: `Score — Page ${pageNum}`,
    page: pageNum,
  });
}

console.log('Finished processing all score pages!');
const summaryPath = path.join(rootDir, 'src', 'data', 'scores.js');
const exportContent = `// Generated automatically from referencias/patitura my versions\nexport const scores = ${JSON.stringify(results, null, 2)};\n`;
fs.writeFileSync(summaryPath, exportContent, 'utf8');
console.log('Wrote src/data/scores.js');
