import { references } from '../references.js';
import { scores } from '../scores.js';

// Mapping of subsection IDs to titles as defined in src/data/content/
const sectionTitles = {
  'ouverture-a': 'Ouverture A',
  'fugue': 'Fugue',
  'ouverture-b': 'Ouverture B',
  'courante-a': 'Courante A',
  'courante-b': 'Courante B',
  'gavotte-1-a': 'Gavotte I — A',
  'gavotte-1-b': 'Gavotte I — B',
  'gavotte-2-a': 'Gavotte II — A',
  'gavotte-2-b': 'Gavotte II — B',
  'passepied-1-a': 'Passepied I — A',
  'passepied-1-b': 'Passepied I — B',
  'passepied-2-a': 'Passepied II — A',
  'passepied-2-b': 'Passepied II — B',
  'sarabande-a': 'Sarabande A',
  'sarabande-b': 'Sarabande B',
  'bourree-1-a': 'Bourrée I — A',
  'bourree-1-b': 'Bourrée I — B',
  'bourree-2-a': 'Bourrée II — A',
  'bourree-2-b': 'Bourrée II — B',
  'gigue-a': 'Gigue A',
  'gigue-b': 'Gigue B',
  'echo-a': 'Echo A',
  'echo-b': 'Echo B',
};

// Selection specifications for each video
const video1PianoSpecs = [
  ['ouverture-a', 2],
  ['fugue', 3],
  ['ouverture-b', 1],
  ['courante-a', 1],
  ['courante-b', 1],
  ['gavotte-1-a', 3],
  ['gavotte-1-b', 3],
  ['gavotte-2-a', 1],
  ['gavotte-2-b', 1],
  ['passepied-1-a', 1],
  ['passepied-1-b', 1],
  ['passepied-2-a', 1],
  ['passepied-2-b', 1],
  ['sarabande-a', 3],
  ['sarabande-b', 3],
  ['bourree-1-a', 2],
  ['bourree-1-b', 2],
  ['bourree-2-a', 2],
  ['bourree-2-b', 2],
  ['gigue-a', 3],
  ['gigue-b', 3],
  ['echo-a', 2],
  ['echo-b', 2],
];

const video2PianoSpecs = [
  ['ouverture-a', 3],
  ['fugue', 2],
  ['ouverture-b', 2],
  ['courante-a', 3],
  ['courante-b', 3],
  ['gavotte-1-a', 2],
  ['gavotte-1-b', 2],
  ['gavotte-2-a', 2],
  ['gavotte-2-b', 2],
  ['passepied-1-a', 3],
  ['passepied-1-b', 4],
  ['passepied-2-a', 3],
  ['passepied-2-b', 4],
  ['sarabande-a', 1],
  ['sarabande-b', 1],
  ['bourree-1-a', 4],
  ['bourree-1-b', 5],
  ['bourree-2-a', 3],
  ['bourree-2-b', 3],
  ['gigue-a', 1],
  ['gigue-b', 1],
  ['echo-a', 1],
  ['echo-b', 1],
];

const video3HarpsichordSpecs = [
  'ouverture-a',
  'fugue',
  'ouverture-b',
  'courante-a',
  'courante-b',
  'gavotte-1-a',
  'gavotte-1-b',
  'gavotte-2-a',
  'gavotte-2-b',
  'passepied-1-a',
  'passepied-1-b',
  'passepied-2-a',
  'passepied-2-b',
  'sarabande-a',
  'sarabande-b',
  'bourree-1-a',
  'bourree-1-b',
  'bourree-2-a',
  'bourree-2-b',
  'gigue-a',
  'gigue-b',
  'echo-a',
  'echo-b',
];

function buildPaintings(specs, isHarpsichord = false) {
  const result = [];
  for (const item of specs) {
    const secId = Array.isArray(item) ? item[0] : item;
    const ver = Array.isArray(item) ? item[1] : 1;
    const inst = isHarpsichord ? 'harpsichord' : 'piano';
    const ref = references[secId]?.[inst]?.[ver];
    if (ref) {
      result.push({
        src: ref.src,
        thumb: ref.thumb || ref.src,
        width: ref.width,
        height: ref.height,
        alt: ref.alt || '',
        caption: ref.caption || '',
        explanation: ref.explanation || '',
        credit: ref.credit || '',
        license: ref.license || '',
        licenseUrl: ref.licenseUrl || '',
        section: sectionTitles[secId] || secId,
      });
    }
  }
  return result;
}

export const versions = [
  {
    id: 'french-overture-1',
    title: 'French Ouverture 1',
    label: '01 — French Ouverture 1',
    youtubeId: 'ql_PJ3mqo5o',
    instrument: 'piano',
    // description:
    //   'A structural and architectural reading of the French Ouverture on modern piano. This interpretation explores the balance between noble poise and rhetorical clarity across all 23 subsections, articulating the suite with classical elegance and restraint.',
    paintings: buildPaintings(video1PianoSpecs, false),
    scores,
  },
  {
    id: 'french-overture-2',
    title: 'French Ouverture 2',
    label: '02 — French Ouverture 2',
    youtubeId: 'tyJxnT5udWk',
    instrument: 'piano',
    // description:
    //   'An alternate piano interpretation emphasizing kinetic energy, dramatic contrast, and rhetorical risk. Pushing the boundaries of tempo and character, this version questions the conventions of courtly dance in favor of emotional urgency.',
    paintings: buildPaintings(video2PianoSpecs, false),
    scores,
  },
  {
    id: 'bach-french-overture-harpsichord',
    title: 'Bach French Ouverture Harpsichord',
    youtubeId: 'FI861Vyyqkc',
    instrument: 'harpsichord',
    // description:
    //   'A complete reading on historical two-manual harpsichord engaging with 18th-century registration, tactile plectrum articulation, and French ornamentation. This performance brings forth the specific acoustic colors envisioned by Bach in Clavier-Übung II.',
    paintings: buildPaintings(video3HarpsichordSpecs, true),
    scores,
  },
];
