import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gavotte II — Content Data ──────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gavotte II',
  introduction: `Serving as an alternative trio to Gavotte I, Gavotte II introduces a more rustic,
    musette-like texture with persistent pedal points and cascading quavers that shift the
    character from ceremonial court to pastoral reverie.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'gavotte-2-a',
      title: 'Gavotte II — A',
      question: 'How does the drone-like pedal texture transform the delicate lightness of the gavotte rhythm?',
      experiments: generatePlaceholderExperiments('Gavotte II', 'gavotte-2-a', 'Gavotte II — A'),
    },
    {
      id: 'gavotte-2-b',
      title: 'Gavotte II — B',
      question: 'What tonal and registral contrast prepares the eventual Da Capo return to Gavotte I?',
      experiments: generatePlaceholderExperiments('Gavotte II', 'gavotte-2-b', 'Gavotte II — B'),
    },
  ],
};
