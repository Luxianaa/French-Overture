import { generatePlaceholderExperiments } from './placeholders.js';

// ─── Ouverture — content data ───────────────────────────────────────────────
// Dynamic experiments loaded from src/data/videos.js matching the structure of all suite movements

export const content = {
  title: 'Ouverture',
  introduction: ``,
  heroImage: '/references/ouverture-a/piano-1.jpg',

  subsections: [
    {
      id: 'ouverture-a',
      title: 'Ouverture A',
      question: '',
      experiments: generatePlaceholderExperiments('Ouverture', 'ouverture-a', 'Ouverture A'),
    },
    {
      id: 'fugue',
      title: 'Fugue',
      question: '',
      experiments: generatePlaceholderExperiments('Ouverture', 'fugue', 'Fugue'),
    },
    {
      id: 'ouverture-b',
      title: 'Ouverture B',
      question: '',
      experiments: generatePlaceholderExperiments('Ouverture', 'ouverture-b', 'Ouverture B'),
    },
  ],
};
