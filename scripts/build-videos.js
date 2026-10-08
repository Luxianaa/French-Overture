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

  // Buscar coincidencia de código de subsección
  let matchedSubId = null;
  for (const [code, subId] of Object.entries(CODE_MAP)) {
    // Permite que el código tenga guión o espacio: ej 'OUV-A' o 'OUV A'
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

  // Detectar instrumento (PNO / PIANO -> piano; otros en minúsculas)
  let instrument = 'unknown';
  if (norm.includes('PNO') || norm.includes('PIANO')) {
    instrument = 'piano';
  } else {
    const instMatch = norm.match(/\b([A-Z]{3,4})\b/);
    if (instMatch) {
      instrument = instMatch[1].toLowerCase();
    }
  }

  // Detectar versión
  let version = null;
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

// ── 4. Ordenar cada subsección por versión y verificar duplicados de versión ─
const versionDuplicates = [];
const finalVideos = {};

ORDERED_SUBSECTIONS.forEach((subId) => {
  const list = parsedBySection[subId];
  list.sort((a, b) => a.version - b.version);

  // Verificar si hay versiones duplicadas dentro de la misma subsección
  const seenVersions = new Set();
  list.forEach((item) => {
    if (seenVersions.has(item.version)) {
      versionDuplicates.push({ subId, version: item.version, youtubeId: item.youtubeId, title: item._rawTitle });
    }
    seenVersions.add(item.version);
  });

  // Limpiar campos auxiliares para el JSON final
  finalVideos[subId] = list.map((item) => ({
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
Object.values(finalVideos).forEach((arr) => (totalAssigned += arr.length));
console.log(`✓ Total vídeos asignados en videos.js: ${totalAssigned}`);
console.log(`✓ Archivo generado en: ${outputPath}\n`);

// 6A. Duplicados
console.log('── DUPLICADOS:');
if (duplicateIds.length === 0 && versionDuplicates.length === 0) {
  console.log('✓ Ningún YouTube ID ni versión duplicada.');
} else {
  if (duplicateIds.length > 0) {
    console.log(`⚠️ YouTube IDs duplicados (${duplicateIds.length}):`);
    duplicateIds.forEach((d) => console.log(`   • Línea ${d.lineIndex}: [${d.youtubeId}] ${d.title}`));
  }
  if (versionDuplicates.length > 0) {
    console.log(`⚠️ Versiones duplicadas en la misma subsección (${versionDuplicates.length}):`);
    versionDuplicates.forEach((vd) => console.log(`   • ${vd.subId} versión ${vd.version} (${vd.youtubeId}): ${vd.title}`));
  }
}

// 6B. Líneas sin asignar
console.log('\n── LÍNEAS SIN ASIGNAR:');
if (unassignedLines.length === 0) {
  console.log('✓ 0 líneas sin asignar (100% de los títulos cuadraron con el patrón).');
} else {
  console.log(`⚠️ Líneas sin asignar (${unassignedLines.length}):`);
  unassignedLines.forEach((u) => console.log(`   • Línea ${u.lineIndex} [${u.reason}]: "${u.line}"`));
}

// 6C. Comparación con conteos esperados
console.log('\n── COMPARACIÓN CON CONTEOS ESPERADOS (TOTAL ESPERADO 85):');
let hasMismatch = false;

ORDERED_SUBSECTIONS.forEach((subId) => {
  const expected = EXPECTED_COUNTS[subId];
  const actualList = finalVideos[subId];
  const actual = actualList.length;
  const versionsPresent = actualList.map((v) => v.version);

  // Calcular versiones faltantes
  const missingVersions = [];
  for (let v = 1; v <= expected; v++) {
    if (!versionsPresent.includes(v)) missingVersions.push(v);
  }

  // Calcular versiones sobrantes o fuera de rango
  const unexpectedVersions = versionsPresent.filter((v) => v > expected || versionsPresent.filter((x) => x === v).length > 1);

  if (actual === expected && missingVersions.length === 0) {
    console.log(`✓ ${subId.padEnd(15)} Esperados: ${expected} | Obtenidos: ${actual} | Versiones: [ ${versionsPresent.join(', ')} ]`);
  } else {
    hasMismatch = true;
    const diff = actual - expected;
    const sign = diff > 0 ? `+${diff}` : `${diff}`;
    console.log(`⚠️ ${subId.padEnd(15)} Esperados: ${expected} | Obtenidos: ${actual} (${sign}) | Versiones: [ ${versionsPresent.join(', ')} ]`);
    if (missingVersions.length > 0) {
      console.log(`   └─> Faltan versiones: [ ${missingVersions.join(', ')} ]`);
    }
    if (unexpectedVersions.length > 0) {
      console.log(`   └─> Versiones extras o inesperadas: [ ${unexpectedVersions.join(', ')} ]`);
    }
  }
});

console.log('\n════════════════════════════════════════════════════════════════════');
if (!hasMismatch && unassignedLines.length === 0 && duplicateIds.length === 0) {
  console.log('✓ ÉXITO TOTAL: Todas las subsecciones cumplen exactamente los 85 esperados.');
} else {
  console.log('⚠️ Se completó con observaciones señaladas arriba.');
}
console.log('════════════════════════════════════════════════════════════════════\n');
