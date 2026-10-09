import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Bourrée I — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Bourrée I',
  introduction: ``,
  heroImage: '/references/bourree-1-a/piano-1.jpg',

  subsections: [
    {
      id: 'bourree-1-a',
      title: 'Bourrée I — A',
      question: '',
      experiments: generatePlaceholderExperiments('Bourrée I', 'bourree-1-a', 'Bourrée I — A'),
    },
    {
      id: 'bourree-1-b',
      title: 'Bourrée I — B',
      question: '',
      experiments: generatePlaceholderExperiments('Bourrée I', 'bourree-1-b', 'Bourrée I — B'),
    },
  ],
};
