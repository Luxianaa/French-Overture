import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Bourrée II — Content Data ──────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Bourrée II',
  introduction: `Providing a gentler, more intimate interlude between the outer statements of
    Bourrée I, this second dance trades percussive thrust for canonic counterpoint and
    refined harmonic suspensions.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'bourree-2-a',
      title: 'Bourrée II — A',
      question: 'How does the softer contrapuntal texture alter the characteristic bourrée bounce?',
      experiments: generatePlaceholderExperiments('Bourrée II', 'bourree-2-a', 'Bourrée II — A'),
    },
    {
      id: 'bourree-2-b',
      title: 'Bourrée II — B',
      question: 'What tonal shading enhances the poignant transition back to the da capo repeat?',
      experiments: generatePlaceholderExperiments('Bourrée II', 'bourree-2-b', 'Bourrée II — B'),
    },
  ],
};
