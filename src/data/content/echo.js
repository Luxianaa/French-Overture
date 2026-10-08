import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Echo — Content Data ────────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Echo',
  introduction: `The dramatic climax and conclusion of BWV 831. Exploiting the two manuals of the
    French harpsichord (forte on the lower manual, piano on the upper), Bach constructs a
    theatrical dialogue of spatial distance, repetition, and acoustic illusion.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'echo-a',
      title: 'Echo A',
      question: 'How do rapid dynamic shifts between manuals create the illusion of physical distance in section A?',
      experiments: generatePlaceholderExperiments('Echo', 'echo-a', 'Echo A'),
    },
    {
      id: 'echo-b',
      title: 'Echo B',
      question: 'Does the second reprise deepen the acoustic perspective or dissolve the illusion into pure virtuosity?',
      experiments: generatePlaceholderExperiments('Echo', 'echo-b', 'Echo B'),
    },
  ],
};
