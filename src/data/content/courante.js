import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Courante — Content Data ────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Courante',
  introduction: ``,
  heroImage: '/references/courante-a/piano-1.jpg',

  subsections: [
    {
      id: 'courante-a',
      title: 'Courante A',
      question: '',
      experiments: generatePlaceholderExperiments('Courante', 'courante-a', 'Courante A'),
    },
    {
      id: 'courante-b',
      title: 'Courante B',
      question: '',
      experiments: generatePlaceholderExperiments('Courante', 'courante-b', 'Courante B'),
    },
  ],
};
