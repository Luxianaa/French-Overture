import heroImg from '../../assets/hero-home.jpg';
import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Courante — Content Data ────────────────────────────────────────────────
// NOTE: Experiments are currently generated via generatePlaceholderExperiments.
// Replace the helper call with explicit experiment objects when adding real content.

export const content = {
  title: 'Courante',
  introduction: `The French Courante is a dance of rhythmic ambiguity and suspended gravity.
    Notated in 3/2 with frequent hemiolas slipping into 6/4, its pulse is never settled
    and its elegance lives precisely in this perpetual hesitation.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'courante-a',
      title: 'Courante A',
      question: 'Where is the metric pulse when the 3/2 and 6/4 meters perpetually contradict each other?',
      experiments: generatePlaceholderExperiments('Courante', 'Courante A'),
    },
    {
      id: 'courante-b',
      title: 'Courante B',
      question: 'Does the second section resolve the metric tension or accelerate its dissolution?',
      experiments: generatePlaceholderExperiments('Courante', 'Courante B'),
    },
  ],
};
