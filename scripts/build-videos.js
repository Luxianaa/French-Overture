import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosTxtPath = path.join(__dirname, '../videos.txt');
const outputPath = path.join(__dirname, '../src/data/videos.js');

// ── 1. Mapeo de códigos de movimiento a IDs de subsección ─────
const CODE_MAP = {
  'OUV-A': 'ouverture-a',
  'OUV-FUG': 'fugue',
  'OUV-AR': 'ouverture-b',
  'COU-A': 'courante-a',
  'COU-B': 'courante-b',
  'GAV1-A': 'gavotte-1-a',
  'GAV1-B': 'gavotte-1-b',
  'GAV2-A': 'gavotte-2-a',
  'GAV2-B': 'gavotte-2-b',
  'PAS1-A': 'passepied-1-a',
  'PAS1-B': 'passepied-1-b',
  'PAS2-A': 'passepied-2-a',
  'PAS2-B': 'passepied-2-b',
  'SAR-A': 'sarabande-a',
  'SAR-B': 'sarabande-b',
  'BOU1-A': 'bourree-1-a',
  'BOU1-B': 'bourree-1-b',
  'BOU2-A': 'bourree-2-a',
  'BOU2-B': 'bourree-2-b',
  'GIG-A': 'gigue-a',
  'GIG-B': 'gigue-b',
  'ECH-A': 'echo-a',
  'ECH-B': 'echo-b',
};

// Orden cronológico estricto de las 23 subsecciones
const ORDERED_SUBSECTIONS = [
  'ouverture-a',
  'fugue',
  'ouverture-b',
  'courante-a',
  'courante-b',
  'gavotte-1-a',
  'gavotte-1-b',
  'gavotte-2-a',
  'gavotte-2-b',
  'passepied-1-a',
  'passepied-1-b',
  'passepied-2-a',
  'passepied-2-b',
  'sarabande-a',
  'sarabande-b',
  'bourree-1-a',
  'bourree-1-b',
  'bourree-2-a',
  'bourree-2-b',
  'gigue-a',
  'gigue-b',
  'echo-a',
  'echo-b',
];

// Conteos esperados según las reglas del usuario (total 85)
const EXPECTED_COUNTS = {
  'ouverture-a': 3,
  'fugue': 3,
  'ouverture-b': 4,
  'courante-a': 3,
  'courante-b': 3,
  'gavotte-1-a': 4,
  'gavotte-1-b': 4,
  'gavotte-2-a': 3,
  'gavotte-2-b': 3,
  'passepied-1-a': 3,
  'passepied-1-b': 4,
  'passepied-2-a': 4,
  'passepied-2-b': 7,
  'sarabande-a': 3,
  'sarabande-b': 3,
  'bourree-1-a': 4,
  'bourree-1-b': 5,
  'bourree-2-a': 4,
  'bourree-2-b': 5,
  'gigue-a': 4,
  'gigue-b': 3,
  'echo-a': 3,
  'echo-b': 3,
};

// ── 2. Leer archivo videos.txt ─────────────────────────────────
if (!fs.existsSync(videosTxtPath)) {
  console.error(`[ERROR] No se encontró el archivo: ${videosTxtPath}`);
  process.exit(1);
}

let rawBuffer = fs.readFileSync(videosTxtPath);
let content;
if (rawBuffer[0] === 0xff && rawBuffer[1] === 0xfe) {
  content = rawBuffer.toString('utf16le');
} else {
  content = rawBuffer.toString('utf8');
}

const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const parsedBySection = {};
ORDERED_SUBSECTIONS.forEach((subId) => {
  parsedBySection[subId] = [];
});

const unassignedLines = [];
const nonHpsDetected = [];
const seenIds = new Set();
const duplicateIds = [];

// ── 3. Procesar cada línea ─────────────────────────────────────
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split('|');
  if (parts.length < 2) {
    unassignedLines.push({ lineIndex: i + 1, line, reason: 'Separador | no encontrado' });
    continue;
  }

  const youtubeId = parts[0].trim();
  const rawTitle = parts.slice(1).join('|').trim();

  // Detectar duplicados de YouTube ID
  if (seenIds.has(youtubeId)) {
    duplicateIds.push({ lineIndex: i + 1, youtubeId, title: rawTitle });
  } else {
    seenIds.add(youtubeId);
  }

  // Normalizar título: mayúsculas, guiones bajos a espacios, colapsar espacios
  const norm = rawTitle
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

  // Ignorar silenciosamente líneas de obra completa que no son experimentos
  if (
    norm === 'FRENCH OVERTURE 1' ||
    norm === 'FRENCH OVERTURE 2' ||
    norm === 'BACH FRENCH OVERTURE HARPSICHORD'
  ) {
    continue;
  }

  // Buscar coincidencia de código de subsección
  let matchedSubId = null;
  for (const [code, subId] of Object.entries(CODE_MAP)) {
    const regex = new RegExp('(?:^|\\s)' + code.replace('-', '[- ]') + '(?:\\s|$)');
    if (regex.test(norm)) {
      matchedSubId = subId;
      break;
    }
  }

  if (!matchedSubId) {
    unassignedLines.push({ lineIndex: i + 1, line, reason: 'Código de subsección no reconocido' });
    continue;
  }

  // Detectar instrumento (PNO / PIANO -> piano; HPS / HSP / CLAVECIN / HARPSICHORD -> harpsichord)
  let instrument = 'unknown';
  if (norm.includes('PNO') || norm.includes('PIANO')) {
    instrument = 'piano';
  } else if (
    norm.includes('HPS') ||
    norm.includes('HSP') ||
    norm.includes('CLAVECIN') ||
    norm.includes('HARPSICHORD')
  ) {
    instrument = 'harpsichord';
    if (norm.includes('HSP') && !norm.includes('HPS')) {
      nonHpsDetected.push({ lineIndex: i + 1, code: 'HSP', title: rawTitle });
    }
  } else {
    const instMatch = norm.match(/\b([A-Z]{3,4})\b/);
    if (instMatch) {
      instrument = instMatch[1].toLowerCase();
    }
  }

  // Detectar versión
  let version = null;
  if (instrument === 'harpsichord') {
    // Para clavecín: buscar HPS 01, HSP 01, CLAVECIN 01, o VERSION 01
    const hpsVerMatch = norm.match(/(?:HPS|HSP|CLAVECIN|HARPSICHORD)\s*0?(\d+)/) || norm.match(/VERSION\s*0?(\d+)/);
    if (hpsVerMatch) {
      version = parseInt(hpsVerMatch[1], 10);
    } else {
      version = 1; // Default a versión 1 de clavecín
    }
  } else {
    // EXCEPCIÓN: "13 PAS2-B PNO-03 PIANO VERSION 3 TAKE-02" es la versión 4 de passepied-2-b
    if (
      matchedSubId === 'passepied-2-b' &&
      (/VERSION[- ]?3.*TAKE[- ]?0?2/i.test(norm) || /TAKE[- ]?0?2.*VERSION[- ]?3/i.test(norm))
    ) {
      version = 4;
    } else {
      const verMatch = norm.match(/VERSION\s*(\d+)/);
      if (verMatch) {
        version = parseInt(verMatch[1], 10);
      }
    }
  }

  if (version === null) {
    unassignedLines.push({ lineIndex: i + 1, line, reason: 'Número de versión no encontrado' });
    continue;
  }

  parsedBySection[matchedSubId].push({
    version,
    instrument,
    youtubeId,
    _rawTitle: rawTitle,
    _lineIndex: i + 1,
  });
}

// ── 4. Ordenar cada subsección (piano primero, clavecín después) y verificar duplicados ─
const versionDuplicates = [];
const finalVideos = {};

ORDERED_SUBSECTIONS.forEach((subId) => {
  const list = parsedBySection[subId];
  const pianoList = list.filter((item) => item.instrument === 'piano').sort((a, b) => a.version - b.version);
  const harpsichordList = list.filter((item) => item.instrument === 'harpsichord').sort((a, b) => a.version - b.version);
  const combined = [...pianoList, ...harpsichordList];

  const seenKeys = new Set();
  combined.forEach((item) => {
    const key = `${item.instrument}-${item.version}`;
    if (seenKeys.has(key)) {
      versionDuplicates.push({ subId, instrument: item.instrument, version: item.version, youtubeId: item.youtubeId, title: item._rawTitle });
    }
    seenKeys.add(key);
  });

  finalVideos[subId] = combined.map((item) => ({
    version: item.version,
    instrument: item.instrument,
    youtubeId: item.youtubeId,
  }));
});

// ── 5. Escribir src/data/videos.js ──────────────────────────────
const fileHeader = `// Generated automatically by scripts/build-videos.js from videos.txt
// Do not edit manually; update videos.txt and run: node scripts/build-videos.js

export const videos = ${JSON.stringify(finalVideos, null, 2)};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileHeader, 'utf8');

// ── 6. Generar Informe Detallado ────────────────────────────────
console.log('════════════════════════════════════════════════════════════════════');
console.log('              INFORME DE AUDITORÍA Y BUILD VIDEOS                  ');
console.log('════════════════════════════════════════════════════════════════════\n');

console.log(`✓ Total líneas leídas en videos.txt: ${lines.length}`);
let totalAssigned = 0;
let totalPianoAssigned = 0;
let totalHpsAssigned = 0;

Object.values(finalVideos).forEach((arr) => {
  totalAssigned += arr.length;
  totalPianoAssigned += arr.filter((v) => v.instrument === 'piano').length;
  totalHpsAssigned += arr.filter((v) => v.instrument === 'harpsichord').length;
});

console.log(`✓ Total vídeos asignados en videos.js: ${totalAssigned} (${totalPianoAssigned} piano + ${totalHpsAssigned} clavecín)`);
console.log(`✓ Archivo generado en: ${outputPath}\n`);

// 6A. Códigos de clavecín
console.log('── CÓDIGOS DE CLAVECÍN:');
if (nonHpsDetected.length === 0) {
  console.log('✓ Todos los títulos de clavecín usan el código estándar HPS. No se encontraron variantes HSP.');
} else {
  console.log(`ℹ️ Se detectaron variantes de código de clavecín aceptadas (${nonHpsDetected.length}):`);
  nonHpsDetected.forEach((d) => console.log(`   • Línea ${d.lineIndex}: código "${d.code}" en "${d.title}"`));
}

// 6B. Duplicados
console.log('\n── DUPLICADOS:');
if (duplicateIds.length === 0 && versionDuplicates.length === 0) {
  console.log('✓ Ningún YouTube ID ni versión duplicada.');
} else {
  if (duplicateIds.length > 0) {
    console.log(`⚠️ YouTube IDs duplicados (${duplicateIds.length}):`);
    duplicateIds.forEach((d) => console.log(`   • Línea ${d.lineIndex}: [${d.youtubeId}] ${d.title}`));
  }
  if (versionDuplicates.length > 0) {
    console.log(`⚠️ Versiones duplicadas en la misma subsección (${versionDuplicates.length}):`);
    versionDuplicates.forEach((vd) => console.log(`   • ${vd.subId} [${vd.instrument}] versión ${vd.version} (${vd.youtubeId}): ${vd.title}`));
  }
}

// 6C. Líneas sin asignar
console.log('\n── LÍNEAS PENDIENTES / SIN ASIGNAR:');
if (unassignedLines.length === 0) {
  console.log('✓ 0 pendientes (100% de los vídeos asignados correctamente).');
} else {
  console.log(`⚠️ Líneas sin asignar (${unassignedLines.length}):`);
  unassignedLines.forEach((u) => console.log(`   • Línea ${u.lineIndex} [${u.reason}]: "${u.line}"`));
}

// 6E. Comparación con conteos esperados (85 piano + 23 clavecín = 108 total)
console.log('\n── COMPARACIÓN CON CONTEOS ESPERADOS (TOTAL 108: 85 PIANO + 23 CLAVECÍN):');
let hasMismatch = false;

ORDERED_SUBSECTIONS.forEach((subId) => {
  const expPiano = EXPECTED_COUNTS[subId];
  const expHps = 1;
  const list = finalVideos[subId];
  const actPiano = list.filter((v) => v.instrument === 'piano').length;
  const actHps = list.filter((v) => v.instrument === 'harpsichord').length;

  const pianoMatch = actPiano === expPiano;
  const hpsMatch = actHps === expHps;

  if (pianoMatch && hpsMatch) {
    console.log(`✓ ${subId.padEnd(15)} Piano: ${actPiano}/${expPiano} | Clavecín: ${actHps}/${expHps} | OK`);
  } else {
    hasMismatch = true;
    console.log(`⚠️ ${subId.padEnd(15)} Piano: ${actPiano}/${expPiano} | Clavecín: ${actHps}/${expHps} | DESVIACIÓN`);
  }
});

console.log('\n════════════════════════════════════════════════════════════════════');
if (!hasMismatch && unassignedLines.length === 0 && duplicateIds.length === 0) {
  console.log('✓ ÉXITO TOTAL: 108 vídeos asignados (85 piano + 23 clavecín), una toma de clavecín por subsección y 0 pendientes.');
} else {
  console.log('⚠️ Se completó con observaciones señaladas arriba.');
}
console.log('════════════════════════════════════════════════════════════════════\n');

