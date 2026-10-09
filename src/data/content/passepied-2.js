import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Passepied II — Content Data ────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Passepied II',
  introduction: ``,
  heroImage: '/references/passepied-2-a/piano-1.jpg',

  subsections: [
    {
      id: 'passepied-2-a',
      title: 'Passepied II — A',
      question: '',
      experiments: generatePlaceholderExperiments('Passepied II', 'passepied-2-a', 'Passepied II — A'),
    },
    {
      id: 'passepied-2-b',
      title: 'Passepied II — B',
      question: '',
      experiments: generatePlaceholderExperiments('Passepied II', 'passepied-2-b', 'Passepied II — B'),
    },
  ],
};
