import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gigue — Content Data ───────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gigue',
  introduction: ``,
  heroImage: '/references/gigue-a/piano-1.jpg',

  subsections: [
    {
      id: 'gigue-a',
      title: 'Gigue A',
      question: '',
      experiments: generatePlaceholderExperiments('Gigue', 'gigue-a', 'Gigue A'),
    },
    {
      id: 'gigue-b',
      title: 'Gigue B',
      question: '',
      experiments: generatePlaceholderExperiments('Gigue', 'gigue-b', 'Gigue B'),
    },
  ],
};
