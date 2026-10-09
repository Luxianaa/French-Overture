import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Passepied II — Content Data ────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Passepied II',
  introduction: `Complementing the first Passepied in major-minor contrast, Passepied II features
    a darker, more flowing texture with continuous quaver movement that glides effortlessly
    before the mandatory Da Capo back to Passepied I.`,
  heroImage: '/references/passepied-2-a/piano-1.jpg',

  subsections: [
    {
      id: 'passepied-2-a',
      title: 'Passepied II — A',
      question: 'How does the shift in key signature transform the affective weight of the 3/8 dance gesture?',
      experiments: generatePlaceholderExperiments('Passepied II', 'passepied-2-a', 'Passepied II — A'),
    },
    {
      id: 'passepied-2-b',
      title: 'Passepied II — B',
      question: 'What articulatory strategies bridge the continuous running figures into the return to Passepied I?',
      experiments: generatePlaceholderExperiments('Passepied II', 'passepied-2-b', 'Passepied II — B'),
    },
  ],
};
