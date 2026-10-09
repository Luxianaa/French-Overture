import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Sarabande — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Sarabande',
  introduction: ``,
  heroImage: '/references/sarabande-a/piano-1.jpg',

  subsections: [
    {
      id: 'sarabande-a',
      title: 'Sarabande A',
      question: '',
      experiments: generatePlaceholderExperiments('Sarabande', 'sarabande-a', 'Sarabande A'),
    },
    {
      id: 'sarabande-b',
      title: 'Sarabande B',
      question: '',
      experiments: generatePlaceholderExperiments('Sarabande', 'sarabande-b', 'Sarabande B'),
    },
  ],
};
