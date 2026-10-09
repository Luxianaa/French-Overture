import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Passepied I — Content Data ─────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Passepied I',
  introduction: ``,
  heroImage: '/references/passepied-1-a/piano-1.jpg',

  subsections: [
    {
      id: 'passepied-1-a',
      title: 'Passepied I — A',
      question: '',
      experiments: generatePlaceholderExperiments('Passepied I', 'passepied-1-a', 'Passepied I — A'),
    },
    {
      id: 'passepied-1-b',
      title: 'Passepied I — B',
      question: '',
      experiments: generatePlaceholderExperiments('Passepied I', 'passepied-1-b', 'Passepied I — B'),
    },
  ],
};
