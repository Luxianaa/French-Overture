import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Sarabande — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Sarabande',
  introduction: `The expressive core of the French Overture suite. A slow triple meter with marked
    emphasis on the second beat, the Sarabande demands profound rhetorical gravity, luxurious
    ornamentation, and a sustained balance between contemplation and forward motion.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'sarabande-a',
      title: 'Sarabande A',
      question: 'How heavily should the second beat lean before the contemplative breath becomes static?',
      experiments: generatePlaceholderExperiments('Sarabande', 'Sarabande A'),
    },
    {
      id: 'sarabande-b',
      title: 'Sarabande B',
      question: 'Do increasingly dense agréments and chromatic descents heighten solemnity or obscure line?',
      experiments: generatePlaceholderExperiments('Sarabande', 'Sarabande B'),
    },
  ],
};
