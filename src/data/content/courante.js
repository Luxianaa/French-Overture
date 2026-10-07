import heroImg from '../../assets/hero-home.jpg';
import portraitImg from '../../assets/portrait.jpg';

// ─── Courante — minimal content data ─────────────────────────────────────────
// Validates that the movement template is reusable across different dances

export const content = {
  title: 'Courante',
  introduction: `The French Courante is a dance of rhythmic ambiguity and suspended gravity.
    Notated in 3/2 with frequent hemiolas slipping into 6/4, its pulse is never settled
    and its elegance lives precisely in this hesitation.`,
  heroImage: heroImg.src,

  subsections: [
    {
      id: 'courante-a',
      title: 'Courante A',
      question: 'Where is the metric pulse when the 3/2 and 6/4 meters perpetually contradict each other?',
      experiments: [
        {
          type: 'structural',
          title: 'Hemiola as crisis',
          youtubeId: 'dQw4w9WgXcQ', // TODO: replace with actual video
          description: `Testing the friction between ternary and binary accentuation across the first section.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Courante manuscript opening',
              caption: 'First section of the Courante in manuscript',
              explanation: 'Metric shifting in French courante tradition.',
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord keyboard',
              caption: 'Keyboard touch and metric inflection',
              explanation: 'Subtle weight on unexpected beats creates the courante sway.',
            },
          ],
        },
      ],
    },
    {
      id: 'courante-b',
      title: 'Courante B',
      question: 'Does the second section resolve the metric tension or accelerate its dissolution?',
      experiments: [
        {
          type: 'rhetorical',
          title: 'Cadential suspensions',
          youtubeId: 'dQw4w9WgXcQ', // TODO: replace with actual video
          description: `Exploring how cadences in Section B renegotiate the dance tempo.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Harpsichord detail',
              caption: 'Cadential arrival on the harpsichord',
              explanation: 'Decay of sound at the final cadence.',
            },
            {
              src: heroImg.src,
              alt: 'Score closing bars',
              caption: 'Final measures of the Courante',
              explanation: 'The resolution before the Gavottes.',
            },
          ],
        },
      ],
    },
  ],
};
