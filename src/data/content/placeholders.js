import heroImg from '../../assets/hero-home.jpg';
import portraitImg from '../../assets/portrait.jpg';
import { videos } from '../videos.js';

// ─── Helper: Generate Placeholder Experiments ────────────────────────────────
// Dynamically assigns youtubeId from src/data/videos.js matching sectionId and type.
// If an experiment type has no video assigned in videos.js, youtubeId is null.
// When adding real research/editorial content, replace this call with explicit data objects.

export function generatePlaceholderExperiments(movementTitle, sectionId, sectionTitle) {
  const sectionVideos = videos[sectionId] || {};

  return [
    {
      type: 'structural',
      title: `${sectionTitle} — Metric & formal architecture`,
      youtubeId: sectionVideos.structural || null,
      description: `Exploring how formal proportions and phrase lengths govern the rhythmic momentum of ${movementTitle} (${sectionTitle}).`,
      images: [
        {
          src: heroImg.src,
          alt: `Score manuscript showing structure of ${movementTitle}`,
          caption: `${movementTitle} (${sectionTitle}) — Structural notation`,
          explanation: `Manuscript detail indicating the formal architecture and cadence layout for ${sectionTitle}.`,
        },
        {
          src: portraitImg.src,
          alt: `Harpsichord manual setting for ${movementTitle}`,
          caption: `Acoustic space and articulation balance`,
          explanation: `How manual registration highlights the dialogue between inner voices in ${sectionTitle}.`,
        },
      ],
    },
    {
      type: 'rhetorical',
      title: `${sectionTitle} — Rhetorical figures and affect`,
      youtubeId: sectionVideos.rhetorical || null,
      description: `Examining the expressive pauses, interrogative leaps, and declamatory phrasing in ${movementTitle}.`,
      images: [
        {
          src: portraitImg.src,
          alt: `Close-up of keyboard keys during ${sectionTitle}`,
          caption: `Declamatory touch in ${sectionTitle}`,
          explanation: `Touch speed and key-release timing shape the rhetorical silence between musical thoughts.`,
        },
        {
          src: heroImg.src,
          alt: `Harmonic dissonance notation in ${movementTitle}`,
          caption: `Harmonic tension and resolution`,
          explanation: `Treatise analysis of the harmonic accents that punctuate the rhetorical syntax of ${sectionTitle}.`,
        },
      ],
    },
    {
      type: 'extreme',
      title: `${sectionTitle} — Tempo elasticity & pulse limits`,
      youtubeId: sectionVideos.extreme || null,
      description: `Pushing tempo boundaries to observe where dance character disintegrates into pure abstraction.`,
      images: [
        {
          src: heroImg.src,
          alt: `Annotated score with metric markings for ${sectionTitle}`,
          caption: `Extreme tempo boundaries in ${sectionTitle}`,
          explanation: `Testing the outer limits of pulse stability and choreographic legibility in ${movementTitle}.`,
        },
        {
          src: portraitImg.src,
          alt: `Plectrum mechanism under fast repetition`,
          caption: `Plectrum response under extreme speed`,
          explanation: `Mechanical constraints of the quill attack when tempo extremes test physical limits.`,
        },
      ],
    },
    {
      type: 'harpsichord',
      title: `${sectionTitle} — Timbral registration & manual balance`,
      youtubeId: sectionVideos.harpsichord || null,
      description: `Investigating 8-foot stop combinations versus coupled manuals to reshape the sonic body of ${movementTitle}.`,
      images: [
        {
          src: portraitImg.src,
          alt: `Harpsichord stop levers and couplers`,
          caption: `Registration choices for ${sectionTitle}`,
          explanation: `Coupling manuals changes not only volume but harmonic overtone decay across the register.`,
        },
        {
          src: heroImg.src,
          alt: `Final bars of ${sectionTitle} with registration markings`,
          caption: `Cadential registration in ${sectionTitle}`,
          explanation: `Historical documentation on registration contrasts for the final phrase of ${movementTitle}.`,
        },
      ],
    },
  ];
}
