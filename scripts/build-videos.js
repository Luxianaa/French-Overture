import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosTxtPath = path.join(__dirname, '../videos.txt');
const outputPath = path.join(__dirname, '../src/data/videos.js');

// Track number to subsection ID mapping
const TRACK_MAP = {
  '01': 'ouverture-a',
  '02': 'fugue',
  '03': 'ouverture-b',
  '04': 'courante-a',
  '05': 'courante-b',
  '06': 'gavotte-1-a',
  '07': 'gavotte-1-b',
  '08': 'gavotte-2-a',
  '09': 'gavotte-2-b',
  '10': 'passepied-1-a',
  '11': 'passepied-1-b',
  '12': 'passepied-2-a',
  '13': 'passepied-2-b',
  '14': 'sarabande-a',
  '15': 'sarabande-b',
  '16': 'bourree-1-a',
  '17': 'bourree-1-b',
  '18': 'bourree-2-a',
  '19': 'bourree-2-b',
  '20': 'gigue-a',
  '21': 'gigue-b',
  '22': 'echo-a',
  '23': 'echo-b',
};

const VERSION_MAP = {
  1: 'structural',
  2: 'rhetorical',
  3: 'extreme',
};

// Read file (supports UTF-16LE with BOM or UTF-8)
let rawBuffer = fs.readFileSync(videosTxtPath);
let content;
if (rawBuffer[0] === 0xff && rawBuffer[1] === 0xfe) {
  content = rawBuffer.toString('utf16le');
} else {
  content = rawBuffer.toString('utf8');
}

const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const videos = {};
// Initialize all subsections as empty objects
Object.values(TRACK_MAP).forEach((subId) => {
  videos[subId] = {};
});

const assigned = [];
const extras = [];
const unassigned = [];

for (const line of lines) {
  const parts = line.split('|');
  if (parts.length < 2) {
    unassigned.push({ line, reason: 'Invalid separator' });
    continue;
  }

  const id = parts[0].trim();
  const title = parts[1].trim();

  // Pattern: "01 OUV A  PNO 01 PIANO VERSION 1 [EXTRA]"
  const match = title.match(/^(\d+)\s+([A-Z0-9]+)\s+([A-Z0-9]+)\s+([A-Z]+)\s+(\d+)(.*)$/);
  if (!match) {
    unassigned.push({ line, reason: 'Pattern mismatch' });
    continue;
  }

  const trackNum = match[1];
  const verNum = parseInt(match[5], 10);
  const extraText = match[6].trim();

  const subId = TRACK_MAP[trackNum];
  if (!subId) {
    unassigned.push({ line, reason: `Unknown track number ${trackNum}` });
    continue;
  }

  const expType = VERSION_MAP[verNum];
  if (expType) {
    // If already assigned and this is a TAKE 02, prefer TAKE 02
    if (videos[subId][expType]) {
      if (extraText.includes('TAKE 02')) {
        extras.push({ subId, expType, id: videos[subId][expType], reason: 'Replaced by TAKE 02' });
        videos[subId][expType] = id;
        assigned.push({ subId, expType, id, title });
      } else {
        extras.push({ subId, expType, id, reason: 'Duplicate version' });
      }
    } else {
      videos[subId][expType] = id;
      assigned.push({ subId, expType, id, title });
    }
  } else {
    extras.push({ subId, verNum, id, title, reason: `Version ${verNum} exceeds standard 1-3` });
  }
}

// Generate src/data/videos.js
const fileHeader = `// Generated automatically by scripts/build-videos.js from videos.txt
// Do not edit manually; update videos.txt and run: node scripts/build-videos.js

export const videos = ${JSON.stringify(videos, null, 2)};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileHeader, 'utf8');

console.log('════════════════════════════════════════════════════════════');
console.log('                 INFORME BUILD VIDEOS                       ');
console.log('════════════════════════════════════════════════════════════');
console.log(`✓ Total líneas procesadas: ${lines.length}`);
console.log(`✓ Vídeos asignados con éxito: ${assigned.length}`);
console.log(`✓ Archivo generado en: ${outputPath}\n`);

console.log('── Experimentos SIN vídeo asignado:');
let missingCount = 0;
for (const subId of Object.values(TRACK_MAP)) {
  const missing = [];
  ['structural', 'rhetorical', 'extreme', 'harpsichord'].forEach((type) => {
    if (!videos[subId][type]) {
      missing.push(type);
      missingCount++;
    }
  });
  if (missing.length > 0) {
    console.log(`  • ${subId.padEnd(16)} falta: [ ${missing.join(', ')} ]`);
  }
}
console.log(`\nTotal experimentos sin vídeo: ${missingCount} (incluye harpsichord en todas)\n`);

if (extras.length > 0) {
  console.log(`── Versiones extra / alternativas (${extras.length}):`);
  extras.forEach((e) => {
    console.log(`  • ${e.subId}: ${e.title || e.id} (${e.reason})`);
  });
  console.log();
}

if (unassigned.length > 0) {
  console.log(`⚠ Líneas no asignadas (${unassigned.length}):`);
  unassigned.forEach((u) => console.log(`  • ${u.line} -> ${u.reason}`));
} else {
  console.log('✓ 0 líneas sin asignar o con errores de sintaxis.');
}
console.log('════════════════════════════════════════════════════════════');
