import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Echo — Content Data ────────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Echo',
  introduction: ``,
  heroImage: '/references/echo-a/piano-1.jpg',

  subsections: [
    {
      id: 'echo-a',
      title: 'Echo A',
      question: '',
      experiments: generatePlaceholderExperiments('Echo', 'echo-a', 'Echo A'),
    },
    {
      id: 'echo-b',
      title: 'Echo B',
      question: '',
      experiments: generatePlaceholderExperiments('Echo', 'echo-b', 'Echo B'),
    },
  ],
};
