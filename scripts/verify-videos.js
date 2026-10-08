import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── 1. Directorios locales a escanear ─────────────────────────
const LOCAL_DIRS = [
  'C:\\Users\\lucia\\Downloads\\00_POR_CLASIFICAR-20261007T214535Z-1-004\\00_POR_CLASIFICAR',
  'C:\\Users\\lucia\\Downloads\\00_POR_CLASIFICAR-20261007T214535Z-1-002\\00_POR_CLASIFICAR',
  'C:\\Users\\lucia\\Downloads\\00_POR_CLASIFICAR-20261007T214535Z-1-001\\00_POR_CLASIFICAR',
  'C:\\Users\\lucia\\Downloads\\00_POR_CLASIFICAR-20261007T214535Z-1-003\\00_POR_CLASIFICAR',
];

const VIDEOS_TXT = path.join(__dirname, '../videos.txt');

// ── 2. Mapeo de tracks a nombres legibles ─────────────────────
const TRACK_NAMES = {
  '01': '01 — Ouverture A (OUV-A)',
  '02': '02 — Fugue (OUV-FUG)',
  '03': '03 — Ouverture B / Lentement (OUV-AR)',
  '04': '04 — Courante A (COU-A)',
  '05': '05 — Courante B (COU-B)',
  '06': '06 — Gavotte I - A (GAV1-A)',
  '07': '07 — Gavotte I - B (GAV1-B)',
  '08': '08 — Gavotte II - A (GAV2-A)',
  '09': '09 — Gavotte II - B (GAV2-B)',
  '10': '10 — Passepied I - A (PAS1-A)',
  '11': '11 — Passepied I - B (PAS1-B)',
  '12': '12 — Passepied II - A (PAS2-A)',
  '13': '13 — Passepied II - B (PAS2-B)',
  '14': '14 — Sarabande A (SAR-A)',
  '15': '15 — Sarabande B (SAR-B)',
  '16': '16 — Bourrée I - A (BOU1-A)',
  '17': '17 — Bourrée I - B (BOU1-B)',
  '18': '18 — Bourrée II - A (BOU2-A)',
  '19': '19 — Bourrée II - B (BOU2-B)',
  '20': '20 — Gigue A (GIG-A)',
  '21': '21 — Gigue B (GIG-B)',
  '22': '22 — Echo A (ECH-A)',
  '23': '23 — Echo B (ECH-B)',
};

// Normalizar strings para comparación flexible
function normalize(str) {
  return str
    .replace(/\.[a-zA-Z0-9]+$/, '') // quitar extensión
    .replace(/[^a-zA-Z0-9]/g, ' ')  // signos/guiones a espacios
    .replace(/\s+/g, ' ')           // colapsar espacios
    .trim()
    .toUpperCase();
}

// Extraer número de track (primeros 2 dígitos)
function extractTrack(normStr) {
  const match = normStr.match(/^(\d{2})/);
  return match ? match[1] : 'OTHER';
}

// ── 3. Leer archivos locales ───────────────────────────────────
console.log('════════════════════════════════════════════════════════════════');
console.log('       AUDITORÍA DE VÍDEOS: LOCAL vs YOUTUBE (videos.txt)       ');
console.log('════════════════════════════════════════════════════════════════\n');

const localFiles = [];
LOCAL_DIRS.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    console.warn(`[AVISO] No existe la carpeta: ${dir}`);
    return;
  }
  const entries = fs.readdirSync(dir);
  entries.forEach((file) => {
    const fullPath = path.join(dir, file);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isFile() && /\.(mov|mp4|m4v|avi|mkv)$/i.test(file)) {
        const norm = normalize(file);
        const track = extractTrack(norm);
        localFiles.push({
          file,
          fullPath,
          sizeMb: (stat.size / (1024 * 1024)).toFixed(1),
          norm,
          track,
        });
      }
    } catch {
      // Ignorar archivos no accesibles
    }
  });
});

console.log(`✓ Archivos de vídeo locales encontrados: ${localFiles.length}`);

// ── 4. Leer videos.txt (YouTube) ──────────────────────────────
if (!fs.existsSync(VIDEOS_TXT)) {
  console.error(`[ERROR] No se encontró el archivo ${VIDEOS_TXT}`);
  process.exit(1);
}

let rawBuffer = fs.readFileSync(VIDEOS_TXT);
let content;
if (rawBuffer[0] === 0xff && rawBuffer[1] === 0xfe) {
  content = rawBuffer.toString('utf16le');
} else {
  content = rawBuffer.toString('utf8');
}

const ytLines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const ytEntries = [];
ytLines.forEach((line, lineIndex) => {
  const [idPart, ...rest] = line.split('|');
  const youtubeId = idPart ? idPart.trim() : '';
  const title = rest.join('|').trim();
  const norm = normalize(title);
  const track = extractTrack(norm);
  ytEntries.push({
    lineIndex: lineIndex + 1,
    rawLine: line,
    youtubeId,
    title,
    norm,
    track,
  });
});

console.log(`✓ Registros de YouTube procesados en videos.txt: ${ytEntries.length}`);

// ── 5. Detectar REPETIDOS en YouTube ───────────────────────────
console.log('\n────────────────────────────────────────────────────────────────');
console.log(' 1. COMPROBACIÓN DE REPETIDOS EN YOUTUBE');
console.log('────────────────────────────────────────────────────────────────');

// 5A. YouTube IDs duplicados
const idMap = new Map();
ytEntries.forEach((entry) => {
  if (!idMap.has(entry.youtubeId)) idMap.set(entry.youtubeId, []);
  idMap.get(entry.youtubeId).push(entry);
});

const duplicateIds = Array.from(idMap.entries()).filter(([, list]) => list.length > 1);
if (duplicateIds.length === 0) {
  console.log('✓ Ningún YouTube ID está duplicado.');
} else {
  console.log(`⚠️ Se encontraron ${duplicateIds.length} YouTube IDs repetidos:`);
  duplicateIds.forEach(([id, list]) => {
    console.log(`   • ID ${id} aparece ${list.length} veces:`);
    list.forEach((e) => console.log(`     - Línea ${e.lineIndex}: ${e.title}`));
  });
}

// 5B. Títulos/Versiones con múltiples IDs en YouTube (tomas repetidas o duplicados de versión)
const titleMap = new Map();
ytEntries.forEach((entry) => {
  // Simplificar para detectar toma repetida (ej: si hay TAKE 01 y TAKE 02 de la misma versión)
  const baseVersion = entry.norm.replace(/\s+TAKE\s+\d+/, '');
  if (!titleMap.has(baseVersion)) titleMap.set(baseVersion, []);
  titleMap.get(baseVersion).push(entry);
});

const multipleTakes = Array.from(titleMap.entries()).filter(([, list]) => list.length > 1);
if (multipleTakes.length > 0) {
  console.log(`\nℹ️  Versiones con tomas múltiples o subidas más de una vez a YouTube: ${multipleTakes.length}`);
  multipleTakes.forEach(([base, list]) => {
    console.log(`   • ${base}:`);
    list.forEach((e) => console.log(`     - [${e.youtubeId}] Línea ${e.lineIndex}: "${e.title}"`));
  });
} else {
  console.log('✓ No hay versiones con títulos o tomas repetidas.');
}

// ── 6. Detectar vídeos que FALTAN SUBIR a YouTube ───────────────
console.log('\n────────────────────────────────────────────────────────────────');
console.log(' 2. VÍDEOS LOCALES QUE FALTAN POR SUBIR A YOUTUBE');
console.log('────────────────────────────────────────────────────────────────');

const ytNormSet = new Set(ytEntries.map((e) => e.norm));
const missingInYt = localFiles.filter((local) => !ytNormSet.has(local.norm));

if (missingInYt.length === 0) {
  console.log('✓ ¡Todos los vídeos locales están subidos a YouTube!');
} else {
  console.log(`⚠️  FALTAN ${missingInYt.length} VÍDEOS POR SUBIR A YOUTUBE:\n`);
  missingInYt.forEach((m, idx) => {
    const trackLabel = TRACK_NAMES[m.track] || `Track ${m.track}`;
    console.log(`  [${idx + 1}] ${trackLabel}`);
    console.log(`      Archivo: ${m.file} (${m.sizeMb} MB)`);
    console.log(`      Ruta:    ${m.fullPath}\n`);
  });
}

// ── 7. Resumen de cobertura por movimiento ────────────────────
console.log('────────────────────────────────────────────────────────────────');
console.log(' 3. RESUMEN DE COBERTURA POR MOVIMIENTO (Track 01 a 23)');
console.log('────────────────────────────────────────────────────────────────');

Object.keys(TRACK_NAMES).forEach((trk) => {
  const localTrackFiles = localFiles.filter((f) => f.track === trk);
  const ytTrackEntries = ytEntries.filter((e) => e.track === trk);
  const missingForTrack = localTrackFiles.filter((f) => !ytNormSet.has(f.norm));

  const status =
    missingForTrack.length > 0
      ? `⚠️ FALTAN ${missingForTrack.length}`
      : '✓ COMPLETO';

  console.log(
    ` ${trk} | ${TRACK_NAMES[trk].padEnd(35)} | Local: ${String(localTrackFiles.length).padStart(2)} | YouTube: ${String(ytTrackEntries.length).padStart(2)} | ${status}`
  );
  if (missingForTrack.length > 0) {
    missingForTrack.forEach((mf) => {
      console.log(`     └─> FALTA SUBIR: ${mf.file}`);
    });
  }
});

console.log('\n════════════════════════════════════════════════════════════════');
console.log(' Fin de auditoría.');
console.log('════════════════════════════════════════════════════════════════\n');
