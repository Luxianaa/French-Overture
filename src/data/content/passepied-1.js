import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Passepied I — Content Data ─────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Passepied I',
  introduction: `A rapid, agile dance in 3/8 meter originating in Brittany, the Passepied possesses
    the vitality of a fast minuet but with a swifter syncopated current. Precision of touch
    must convey speed without mechanical haste.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'passepied-1-a',
      title: 'Passepied I — A',
      question: 'Can the swift 3/8 meter maintain rhythmic articulation without sacrificing lyrical continuity?',
      experiments: generatePlaceholderExperiments('Passepied I', 'Passepied I — A'),
    },
    {
      id: 'passepied-1-b',
      title: 'Passepied I — B',
      question: 'How do rapid cross-rhythms and running sequences challenge the pulse in the second reprise?',
      experiments: generatePlaceholderExperiments('Passepied I', 'Passepied I — B'),
    },
  ],
};
