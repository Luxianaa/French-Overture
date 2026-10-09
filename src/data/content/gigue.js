import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Gigue — Content Data ───────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Gigue',
  introduction: `Written in French gigue style with dotted rhythms in 6/8 meter rather than Italian
    triplet figuration, this dance balances sparkling virtuosity with strict fugal imitation
    in the inverted subject of the second section.`,
  heroImage: '/references/gigue-a/piano-1.jpg',

  subsections: [
    {
      id: 'gigue-a',
      title: 'Gigue A',
      question: 'Is the French dotted gigue primarily a virtuosic showcase or an intricate rhythmic puzzle?',
      experiments: generatePlaceholderExperiments('Gigue', 'gigue-a', 'Gigue A'),
    },
    {
      id: 'gigue-b',
      title: 'Gigue B',
      question: 'How clearly does the inverted fugal subject project through the dense polyphonic texture?',
      experiments: generatePlaceholderExperiments('Gigue', 'gigue-b', 'Gigue B'),
    },
  ],
};
