import heroImg from '../../assets/hero-home.jpg';
import portraitImg from '../../assets/portrait.jpg';
import { videos } from '../videos.js';

// ─── Helper: Generate Experiments from videos.js ──────────────────────────────
// Generates an experiment for every video in the subsection array (videos[sectionId]).
// Supports optional per-version overrides: experimentOverrides = { [version]: { title, description, images, type } }
// If type is not defined, it is null (neutral color dot on card).

export function generatePlaceholderExperiments(
  movementTitle,
  sectionId,
  sectionTitle,
  experimentOverrides = {}
) {
  const sectionVideos = videos[sectionId] || [];

  return sectionVideos.map((v, index) => {
    const numStr = String(index + 1).padStart(2, '0');
    const rawInst = v.instrument || 'piano';
    const instCap = rawInst.charAt(0).toUpperCase() + rawInst.slice(1);
    const defaultBadge = `${numStr} — ${instCap} / Version ${v.version}`;

    const override = experimentOverrides[v.version] || {};

    const defaultTitle = `${sectionTitle} — ${instCap} / Version ${v.version}`;
    const defaultDescription = `Interpretive experiment ${v.version} exploring touch, tempo and character in ${movementTitle} (${sectionTitle}).`;

    const defaultImages = [
      {
        src: heroImg.src,
        alt: `Score excerpt for ${movementTitle} (${sectionTitle}, Version ${v.version})`,
        caption: `${movementTitle} (${sectionTitle}) — Structural notation (Version ${v.version})`,
        explanation: `Manuscript detail indicating the formal architecture and phrase layout for ${sectionTitle} (Version ${v.version}).`,
      },
      {
        src: portraitImg.src,
        alt: `Performance analysis of ${sectionTitle} (Version ${v.version})`,
        caption: `${sectionTitle} — Articulation & touch balance`,
        explanation: `Key release timing and acoustical resonance balance in ${movementTitle} (Version ${v.version}).`,
      },
    ];

    return {
      youtubeId: v.youtubeId,
      version: v.version,
      instrument: rawInst,
      type: override.type || null,
      badge: override.badge || defaultBadge,
      title: override.title || defaultTitle,
      description: override.description !== undefined ? override.description : defaultDescription,
      images: override.images && override.images.length > 0 ? override.images : defaultImages,
    };
  });
}

// Alias for semantic clarity
export const generateExperiments = generatePlaceholderExperiments;
