import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gavotte I — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gavotte I',
  introduction: ``,
  heroImage: '/references/gavotte-1-a/piano-1.jpg',

  subsections: [
    {
      id: 'gavotte-1-a',
      title: 'Gavotte I — A',
      question: '',
      experiments: generatePlaceholderExperiments('Gavotte I', 'gavotte-1-a', 'Gavotte I — A'),
    },
    {
      id: 'gavotte-1-b',
      title: 'Gavotte I — B',
      question: '',
      experiments: generatePlaceholderExperiments('Gavotte I', 'gavotte-1-b', 'Gavotte I — B'),
    },
  ],
};
