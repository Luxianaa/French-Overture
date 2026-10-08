import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gavotte I — Content Data ───────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gavotte I',
  introduction: `Built on a half-measure upbeat in duple meter, the Gavotte embodies aristocratic
    buoyancy. Its clear binary symmetry hides complex phrase groupings that challenge the
    performer to balance pastoral lightness with contrapuntal rigor.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'gavotte-1-a',
      title: 'Gavotte I — A',
      question: 'Does the characteristic half-bar upbeat initiate motion or establish rhetorical weight?',
      experiments: generatePlaceholderExperiments('Gavotte I', 'gavotte-1-a', 'Gavotte I — A'),
    },
    {
      id: 'gavotte-1-b',
      title: 'Gavotte I — B',
      question: 'How do the expanding phrase structures in section B alter the perception of the opening pulse?',
      experiments: generatePlaceholderExperiments('Gavotte I', 'gavotte-1-b', 'Gavotte I — B'),
    },
  ],
};
