import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Bourrée II — Content Data ──────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Bourrée II',
  introduction: ``,
  heroImage: '/references/bourree-2-a/piano-1.jpg',

  subsections: [
    {
      id: 'bourree-2-a',
      title: 'Bourrée II — A',
      question: '',
      experiments: generatePlaceholderExperiments('Bourrée II', 'bourree-2-a', 'Bourrée II — A'),
    },
    {
      id: 'bourree-2-b',
      title: 'Bourrée II — B',
      question: '',
      experiments: generatePlaceholderExperiments('Bourrée II', 'bourree-2-b', 'Bourrée II — B'),
    },
  ],
};
