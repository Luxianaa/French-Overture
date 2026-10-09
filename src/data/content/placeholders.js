import { videos } from '../videos.js';
import { references } from '../references.js';

// ─── Helper: Generate Experiments from videos.js ──────────────────────────────
// Generates an experiment for every video in the subsection array (videos[sectionId]).
// Images are sourced from references[sectionId] + any optional experimentOverrides.
// Supports optional per-version overrides: experimentOverrides = { [version]: { title, description, images, type, badge } }

export function generatePlaceholderExperiments(
  movementTitle,
  sectionId,
  sectionTitle,
  experimentOverrides = {}
) {
  const sectionVideos = videos[sectionId] || [];
  const sectionRefs = references[sectionId] || {};

  return sectionVideos.map((v, index) => {
    const numStr = String(index + 1).padStart(2, '0');
    const rawInst = v.instrument || 'piano';
    const instCap = rawInst.charAt(0).toUpperCase() + rawInst.slice(1);

    const override = experimentOverrides[v.version] || {};

    // 1. Tipo y Badge
    let defaultType = null;
    let defaultBadge = `${numStr} — ${instCap} / Version ${v.version}`;

    if (rawInst === 'piano') {
      if (v.version === 1) {
        defaultType = 'structural';
        defaultBadge = `${numStr} — Piano / Structural`;
      } else if (v.version === 2) {
        defaultType = 'rhetorical';
        defaultBadge = `${numStr} — Piano / Rhetorical`;
      } else if (v.version === 3) {
        defaultType = 'extreme';
        defaultBadge = `${numStr} — Piano / Extreme`;
      } else {
        defaultType = null;
        defaultBadge = `${numStr} — Piano / Version ${v.version}`;
      }
    } else if (rawInst === 'harpsichord') {
      defaultType = 'harpsichord';
      defaultBadge = `${numStr} — Harpsichord / Version ${v.version}`;
    }

    const type = override.type !== undefined ? override.type : defaultType;
    const badge = override.badge || defaultBadge;

    // 2. Título y descripción
    const defaultTitle = `${sectionTitle} — ${instCap} / Version ${v.version}`;
    const defaultDescription = `Interpretive experiment ${v.version} exploring touch, tempo and character in ${movementTitle} (${sectionTitle}).`;

    // 3. Imágenes de referencia
    let refImg = null;
    if (rawInst === 'harpsichord') {
      refImg = sectionRefs.harpsichord?.[1] || null;
    } else {
      refImg = sectionRefs.piano?.[v.version] || null;
    }

    const extraImages = Array.isArray(override.images) ? override.images : [];
    const images = refImg ? [refImg, ...extraImages] : [...extraImages];

    return {
      youtubeId: v.youtubeId,
      version: v.version,
      instrument: rawInst,
      type,
      badge,
      title: override.title || defaultTitle,
      description: override.description !== undefined ? override.description : defaultDescription,
      images,
    };
  });
}

// Alias for semantic clarity
export const generateExperiments = generatePlaceholderExperiments;
