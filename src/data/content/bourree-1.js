import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Bourrée I — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Bourrée I',
  introduction: `A brisk, energetic duple dance characterized by a quarter-note upbeat and decisive
    dactylic pulses. Bourrée I pulses with rhythmic propulsion and athletic clarity across
    both manuals of the instrument.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'bourree-1-a',
      title: 'Bourrée I — A',
      question: 'How does the single quarter-note anacrusis define the kinetic drive of the main motif?',
      experiments: generatePlaceholderExperiments('Bourrée I', 'bourree-1-a', 'Bourrée I — A'),
    },
    {
      id: 'bourree-1-b',
      title: 'Bourrée I — B',
      question: 'Where do syncopations and wide interval leaps test the stability of the duple pulse?',
      experiments: generatePlaceholderExperiments('Bourrée I', 'bourree-1-b', 'Bourrée I — B'),
    },
  ],
};
