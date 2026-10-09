import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gavotte II — Content Data ──────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gavotte II',
  introduction: ``,
  heroImage: '/references/gavotte-2-a/piano-1.jpg',

  subsections: [
    {
      id: 'gavotte-2-a',
      title: 'Gavotte II — A',
      question: '',
      experiments: generatePlaceholderExperiments('Gavotte II', 'gavotte-2-a', 'Gavotte II — A'),
    },
    {
      id: 'gavotte-2-b',
      title: 'Gavotte II — B',
      question: '',
      experiments: generatePlaceholderExperiments('Gavotte II', 'gavotte-2-b', 'Gavotte II — B'),
    },
  ],
};
