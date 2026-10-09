import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const jsonPath = path.join(rootDir, 'referencias', 'ASIGNACIONES_PARA_LA_PAGINA.json');
const outputJsPath = path.join(rootDir, 'src', 'data', 'references.js');
const outputImagesDir = path.join(rootDir, 'public', 'references');

// Mapeo de códigos de sección a IDs de subsección
const SECTION_MAP = {
  'OUV-A': 'ouverture-a',
  'OUV-FUG': 'fugue',
  'OUV-AR': 'ouverture-b',
  'COU-A': 'courante-a',
  'COU-B': 'courante-b',
  'GAV1-A': 'gavotte-1-a',
  'GAV1-B': 'gavotte-1-b',
  'GAV2-A': 'gavotte-2-a',
  'GAV2-B': 'gavotte-2-b',
  'PAS1-A': 'passepied-1-a',
  'PAS1-B': 'passepied-1-b',
  'PAS2-A': 'passepied-2-a',
  'PAS2-B': 'passepied-2-b',
  'SAR-A': 'sarabande-a',
  'SAR-B': 'sarabande-b',
  'BOU1-A': 'bourree-1-a',
  'BOU1-B': 'bourree-1-b',
  'BOU2-A': 'bourree-2-a',
  'BOU2-B': 'bourree-2-b',
  'GIG-A': 'gigue-a',
  'GIG-B': 'gigue-b',
  'ECH-A': 'echo-a',
  'ECH-B': 'echo-b',
};

const PROBLEMATIC_KEYWORDS = [
  'http',
  'wga',
  'qs:p',
  'transfered',
  'google cultural institute',
  'yorck',
];

// ── British English Translation Tables (formal academic/musicological tone) ──

const THEMES_EN = {
  'Majestad, pompa, ceremonia y presencia aristocrática':
    'Majesty, ceremony, and aristocratic poise',
  'Conjuntos de figuras, acciones simultáneas y relaciones entre varias voces':
    'Ensembles of figures, simultaneous actions, and multi-voiced interplay',
  'Regreso de la pompa inicial: autoridad, comitiva y culminación ceremonial':
    'Return of initial pomp: authority, cortege, and ceremonial culmination',
  'Circulación del gesto, grupos que danzan o hacen música y continuidad del movimiento':
    'Flow of gesture, dancing or music-making ensembles, and continuous momentum',
  'Danza social, música compartida y articulación de pasos y gestos':
    'Social dance, communal music-making, and the articulation of step and gesture',
  'Aire libre, paisaje y movimiento ligero entre naturaleza y música':
    'Open air, pastoral landscape, and light movement poised between nature and music',
  'Pasos pequeños y rápidos, repetición y baile en grupo':
    'Brisk, intricate footwork, rhythmic repetition, and ensemble dance',
  'Aire libre, ligereza, encuentros y movimiento en el paisaje':
    'Open air, buoyancy, amorous encounters, and movement across the landscape',
  'Lentitud, oscuridad, recogimiento, súplica y melancolía':
    'Solemn stillness, shadow, devotional interiority, supplication, and melancholy',
  'Impulso, acentos vivos, grupos y energía de danza':
    'Vigorous impulse, lively accents, buoyant figures, and dance energy',
  'Carácter juguetón y móvil; alternancia de gestos y respuesta del grupo':
    'Playful and mobile character: alternating gestures and responsive ensemble interplay',
  'Movimiento vivo, rebote, suspensión y energía continua':
    'Lively motion, spring, suspension, and sustained kinetic energy',
  'Amplitud, distancia entre figuras o planos y un entorno que deja respirar la respuesta':
    'Spaciousness, measured distance between planes, and an acoustic depth that lets the response resonate',
};

const PRIORITIES_EN = {
  'Se prioriza la organización del conjunto y la claridad del gesto':
    'Priority is given to structural organisation and clarity of gesture',
  'Se prioriza el gesto expresivo y la dirección de la escena':
    'Priority is given to rhetorical gesture and expressive direction',
  'Se prioriza el contraste, la tensión o la energía corporal':
    'Priority is given to dramatic contrast, tension, and kinetic intensity',
  'Se prioriza la relación con instrumentos, corte, trama y ornamentación':
    'Focus is placed on period sonority, courtly decorum, textural fabric, and ornamentation',
};

const MIDDLES_EN = {
  'La postura erguida, el manto y los atributos reales dan una entrada solemne y ordenada':
    'The upright posture, royal mantle, and coronation regalia establish a solemn and ordered entry',
  'La coronación alegórica convierte el gesto en proclamación y énfasis retórico':
    'The allegorical coronation elevates gesture into proclamation and rhetorical emphasis',
  'La frontalidad y la acumulación de insignias intensifican la pompa hasta una presencia casi inmóvil':
    'The severe frontality and accumulation of regalia intensify ceremonial pomp to the point of near-statuesque stillness',
  'El manto y los atributos reales hacen visible una entrada de aparato':
    'The ceremonial mantle and royal regalia render visible a grand, theatrical entry',
  'Los grupos se cruzan y las diagonales generan simultaneidad e impulso dramático, una analogía con el entramado de la fuga':
    'Intersecting figures and bold diagonals generate simultaneity and dramatic drive, mirroring the contrapuntal web of the fugue',
  'La gran densidad de acciones y escalas intensifica la sensación de muchas voces y movimiento simultáneo':
    'The dense interplay of actions and varying scales intensifies the impression of multiple voices in concurrent motion',
  'La multitud de figuras escultóricas crea acciones simultáneas y relaciones entre planos':
    'A multitude of sculptural figures creates simultaneous actions and spatial dialogues across different planes',
  'Tres cuerpos semejantes forman un grupo sombrío: la repetición sugiere voces relacionadas y la postura, peso y gravedad':
    'Three closely matched figures form a sombre grouping: repetition suggests related polyphonic voices, while their posture conveys weight and gravity',
  'El rey y los atributos de las artes hacen del retorno una reafirmación de autoridad musical':
    'The sovereign and the attributes of the arts turn the reprise into a reassertion of musical authority',
  'La comitiva ecuestre ordenada sugiere ceremonia, dirección y pompa real':
    'The disciplined equestrian procession evokes ceremony, purposeful direction, and royal magnificence',
  'La ceremonia y los gestos públicos sugieren la culminación monumental de la obertura':
    'The ceremony and public gestures evoke the monumental culmination of the overture',
  'Armadura, bastón y paño al viento presentan autoridad y pompa':
    'Armour, baton of command, and windblown drapery project martial authority and courtly splendour',
  'El laúd y el intercambio entre varias personas presentan una sociabilidad musical de gestos y respuestas':
    'The lute and the animated exchange amongst companions evoke a musical sociability of gestures and subtle responses',
  'Los músicos coordinan acciones distintas; el teclado y el conjunto acercan la escena a la escucha de voces':
    'Musicians coordinate distinct actions; the keyboard and ensemble draw the scene into a close dialogue of listening voices',
  'La pareja que baila, el público y los músicos conectan gesto corporal y sociabilidad':
    'The dancing couple, onlookers, and musicians weave bodily gesture together with refined social intercourse',
  'Los instrumentos, la partitura y las figuras musicales ofrecen diversidad coordinada; la trama tejida añade repetición y ornamento':
    'Instruments, score, and musical figures offer coordinated diversity, while the woven tapestry lends decorative repetition and ornament',
  'El teclado y los objetos musicales relacionan el retrato con la práctica cortesana y la ornamentación del clavecín':
    'The keyboard and musical accoutrements link the portrait to courtly practice and harpsichord embellishment',
  'La mano y el instrumento permiten seguir un gesto musical concreto':
    'Hand and instrument allow one to follow a specific, focused musical gesture',
  'Amorcillos con instrumentos y gestos de danza: conjunto musical y ornamento cortesano':
    'Putti with instruments and dancing gestures embody musical ensemble playing and courtly ornament',
  'La reunión musical y los gestos entre varias personas crean intercambio, continuidad y respuesta del conjunto':
    'The musical gathering and shared glances foster lively exchange, continuity, and ensemble responsiveness',
  'Los bailarines, músicos y espectadores permiten leer un pulso compartido y gestos de danza':
    'Dancers, musicians, and spectators articulate a shared pulse and buoyant dance gestures',
  'Personas conversando y observando cuadros: circulación de gestos y sociabilidad; no baile representado':
    'Figures in conversation and contemplation of pictures: an easy flow of gesture and sociability rather than depicted dance',
  'El diseño para una ópera-ballet relaciona cuerpos, música, ornamento y agrupación teatral':
    'The design for an opéra-ballet unites physical poise, music, decorative ornament, and theatrical grouping',
  'Los personajes de la commedia dell’arte combinan gesto teatral y diálogo corporal':
    'Commedia dell’arte figures combine theatrical gesture with bodily dialogue',
  'Las bailarinas se organizan en un grupo de pasos y posturas contrastados':
    'Dancers assemble in an ensemble of contrasting steps and poses',
  'La pareja en escena presenta intercambio, música y respuesta entre dos gestos':
    'The couple on stage demonstrates musical exchange and mutual response between paired gestures',
  'La sucesión de cuerpos y posturas da una organización rítmica visible al grupo':
    'The succession of bodies and poses lends a clear rhythmic structure to the ensemble',
  'El grupo hace música en un claro; árboles, agua y figuras distantes abren un espacio pastoral y respirable':
    'Musicians gather in a clearing; trees, water, and distant figures open up an airy pastoral expanse',
  'El paisaje pastoral y las figuras abren un ambiente exterior':
    'The pastoral landscape and figures establish a tranquil outdoor atmosphere',
  'El balanceo del columpio entre árboles une aire libre, impulso y ligereza':
    'The arc of the swing amidst trees unites open air, momentum, and buoyant grace',
  'El balancín hace visible una alternancia de peso, subida y bajada':
    'The seesaw visually embodies alternating weight, ascent, and descent',
  'Música, figuras y entorno de jardín reúnen aire libre y conversación pastoral':
    'Music, figures, and garden surroundings bring together open air and pastoral dialogue',
  'Las figuras juegan en la orilla, con gestos activos en un espacio exterior':
    'Figures play along the riverbank, their lively movements unfolding in an open landscape',
  'Las figuras y los árboles introducen un paisaje de actividad rural y sociabilidad':
    'Figures and trees introduce a landscape of rural industry and relaxed sociability',
  'El encuentro en un claro del bosque crea un ambiente pastoral abierto':
    'The rendezvous in a woodland clearing creates an inviting pastoral setting',
  'La ronda y el músico se acompañan de un esquema geométrico añadido en la captura, apropiado para la lectura estructural':
    'The round dance and musician are paired with geometric lines, well suited to a structural reading',
  'Las tres posiciones corporales se equilibran y responden entre sí; asociación con organización de pasos, no baile rápido representado':
    'Three figures balance and answer one another in poised equilibrium, evoking choreographed steps rather than rapid dancing',
  'La pierna levantada y las siluetas del público hacen explícitos el baile y el acento corporal':
    'The raised leg and contrasting audience silhouettes make dance and physical accent emphatic',
  'Los pequeños cuerpos y sus gestos alternados sugieren rapidez y conversación juguetona':
    'Nimble figures and alternating gestures suggest briskness and playful dialogue',
  'Brazos y piernas se articulan en direcciones distintas dentro de un grupo danzante':
    'Arms and legs articulate in counter-directions within a dancing group',
  'El cuerpo ligero suspendido y sus adornos evocan pasos pequeños y móviles':
    'The buoyant suspended figure and fluttering ribbons evoke nimble, intricate footwork',
  'Los gestos menudos y la ornamentación del jardín ofrecen una lectura ligera del movimiento; asociación indirecta, no escena de baile':
    'Delicate gestures and garden ornaments suggest lightness of motion through indirect association rather than literal dance',
  'La danza campesina se sitúa bajo árboles en un espacio abierto':
    'Rustic dance unfolds beneath sheltering trees in an open expanse',
  'La sucesión de parejas recorre un paisaje abierto; los gestos conducen de una figura a la siguiente':
    'A succession of couples winds through an open landscape, gestures leading fluidly from one figure to the next',
  'El encuentro en el jardín utiliza diagonales, aproximación y un gesto vivo en un espacio exterior':
    'The garden rendezvous uses diagonals, mutual approach, and lively gesture in an outdoor setting',
  'El juego de la gallina ciega en un jardín propone pasos ligeros, aproximación y respuesta':
    'A game of blind man’s buff in a garden invites nimble footwork, sudden approach, and playful evasion',
  'El acercamiento entre figuras y las diagonales del bosque crean un ambiente de encuentro al aire libre':
    'Converging figures and woodland diagonals shape an atmospheric outdoor encounter',
  'La ronda integrada en un bosque enlaza el grupo con el ritmo del paisaje':
    'The circular dance nestled in woodland links the dancers to the organic rhythm of the landscape',
  'Las pequeñas figuras repartidas por el parque permiten una circulación ligera entre planos':
    'Small figures distributed throughout the grounds allow an easy, light circulation between spatial planes',
  'La danza junto al río reúne movimiento colectivo y paisaje':
    'Dance by the river brings collective motion into harmony with the natural scenery',
  'La figura y los amorcillos se sitúan junto al agua y al cielo abierto; el gesto corporal ligero enlaza con el ambiente exterior del Passepied II, sin presentar la escena como un baile':
    'The central figure and putti rest beside water and open skies; their light posture connects with the airy ambience of Passepied II without depicting literal dance',
  'Las manos unidas, los acompañantes, los libros y la luz oscura sostienen el recogimiento ante la muerte':
    'Clasped hands, silent companions, open books, and deep chiaroscuro evoke solemn contemplation before mortality',
  'La quietud del cuerpo y la gran zona oscura generan un tiempo detenido y una melancolía explícita':
    'The stillness of the body against deep shadows creates suspended time and poignant melancholy',
  'El cuerpo arrodillado y los brazos elevados expresan súplica y tensión emocional sostenida':
    'The kneeling posture and upraised arms convey fervent supplication and sustained emotional tension',
  'La cabeza inclinada y la mano alzada expresan desesperación y resignación':
    'The bowed head and raised hand convey despair and sorrowful resignation',
  'Una figura quieta, la llama y la penumbra sostienen una contemplación lenta y melancólica':
    'A solitary, still figure, candlelight, and shadow sustain slow, meditative sorrow',
  'El gesto protector, la mirada baja y el interior en sombra proponen intimidad y un tiempo lento y recogido':
    'A protective gesture, downcast gaze, and shadowy interior evoke quiet intimacy and slow, gathered time',
  'Manos juntas, penumbra y arrepentimiento sostienen una expresión lenta y recogida':
    'Clasped hands, dusky light, and penitent sorrow maintain a slow, inward expression',
  'Los gestos familiares de aflicción, culpa y duelo crean un ambiente emotivo y detenido':
    'Familiar gestures of grief, guilt, and mourning create an emotionally charged, arrested atmosphere',
  'Don Quijote baila ante músicos y público: pasos visibles, comicidad y desplazamiento del gesto':
    'Don Quixote dances before musicians and onlookers: visible steps, comic flair, and eccentric displacement of gesture',
  'El sátiro que danza y las figuras que responden aportan impulso y gestos saltadores':
    'The leaping satyr and responding figures inject vigorous momentum and springy gestures',
  'Los bailarines actúan ante un grupo en un jardín: ritmo escénico y intercambio social':
    'Dancers perform before a gathering in a garden: theatrical rhythm and social intercourse',
  'Los bailarines y el movimiento entre bastidores presentan entradas, circulación de cuerpos y energía teatral':
    'Dancers and wing movements reveal entrances, swirling choreography, and theatrical vigour',
  'La repetición de piernas, perfiles y diagonales convierte el baile en un patrón rítmico muy marcado':
    'Repetition of limbs, silhouettes, and diagonals transforms the dance into an emphatic rhythmic pattern',
  'Las parejas, los músicos y el público distribuyen pasos y respuestas corporales en una reunión festiva':
    'Couples, musicians, and spectators distribute steps and bodily responses across a festive gathering',
  'Las figuras de ballet sugieren impulso, articulación de brazos y pasos encadenados':
    'Ballet dancers evoke athletic impulse, poised carriage of the arms, and linked footwork',
  'La cantante en acción y la escena del café-concert producen énfasis, acento y respuesta del grupo':
    'The performer in mid-song and the lively café-concert setting produce bold accents, rhythmic punch, and audience rapport',
  'El columpio introduce oscilación, elevación, caída y ligereza en un jardín':
    'The swing introduces oscillation, ascent, descent, and airy lightness within a lush garden',
  'Los cuerpos se elevan y se sostienen: alternancia de peso y gesto corporal juguetón':
    'Bodies leap and sustain their flight: an alternation of weight and playful physical abandon',
  'Los niños que juegan a la pelota presentan giros, carreras y respuestas rápidas':
    'Children at ball play demonstrate quick turns, darting sprints, and nimble reflexes',
  'La pista circense reúne cuerpos en acción, impulso y espectáculo':
    'The circus ring brings together bodies in flight, driving momentum, and colourful spectacle',
  'Los caballos en suspensión y la dirección de la carrera hacen visible el impulso continuo de la Gigue':
    'Horses caught mid-stride and the rush of the racecourse visualise the driving kinetic momentum of the Gigue',
  'El cuerpo suspendido en el circo aporta altura, tensión y sensación de elevación':
    'The acrobat poised aloft in the circus arena brings height, aerial tension, and a thrilling sense of lift',
  'Los cuerpos forman una ronda: repetición, impulso y continuidad en un espacio abierto y simplificado':
    'Figures join in a circular dance: repetition, primal impulse, and continuous motion in an austere, open space',
  'La bailarina y el gesto de sus piernas aportan elevación, impulso y energía corporal':
    'The dancer and her dynamic leg extension contribute elevation, impetus, and vivid physical energy',
  'Los paños giratorios de Loïe Fuller hacen visible un movimiento continuo y expansivo':
    'The swirling draperies of Loïe Fuller render continuous, expansive motion strikingly visible',
  'El paso alto de Jane Avril presenta rebote, torsión y dirección clara':
    'Jane Avril’s high kick showcases elastic rebound, torque, and sharp directional attack',
  'Las figuras de ballet en acción sugieren salto, suspensión y continuidad del impulso':
    'Ballet figures in mid-motion evoke soaring leaps, weightless suspension, and sustained kinetic drive',
  'El cielo pintado y las figuras en distintos planos sugieren amplitud y distancia para la respuesta del Echo':
    'The painted sky and figures arranged across deep planes suggest breadth and spatial distance for the Echo to answer',
  'Agua, reflejos y cielo dejan distancia entre los planos y espacio para una respuesta':
    'Water, reflections, and wide skies separate the spatial planes, allowing ample acoustic space for an answering echo',
  'El claro luminoso y el borde del bosque crean profundidad y un ambiente amplio':
    'The sunlit clearing and woodland edge create spatial depth and a resonant, airy expanse',
  'Las figuras pequeñas en un gran paisaje expresan amplitud y distancia':
    'Diminutive figures set within a vast landscape convey breadth and acoustic distance',
  'La extensión del valle, el cielo y los árboles abren varios planos de resonancia visual':
    'The sweeping valley, open sky, and trees unfold multiple planes of visual resonance',
  'Los grupos pastorales se separan en el espacio y permiten imaginar pregunta y respuesta':
    'Pastoral groups dispersed across the landscape invite the imagination of antiphonal call and response',
  'La escala de los árboles y la profundidad del paisaje producen una sensación de amplitud':
    'Towering trees and receding landscape depth create a generous sense of scale and resonance',
};

const SPECIFIC_FALLBACKS = {
  'GAV1-A_PNO-03':
    'Dancers and onlookers within the pavilion combine graceful steps with lively social interplay',
  'ECH-A_PNO-02':
    'Figures positioned along the riverbank establish distinct planes and an expansive atmosphere where musical dialogue can breathe',
};

function translateRelacionMusical(id, rawRelacion) {
  if (!rawRelacion) return '';
  const parts = rawRelacion.split('.').map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) return rawRelacion;

  const themeEs = parts[0];
  const priorityEs = parts[parts.length - 1];
  const middleEs = parts.slice(1, parts.length - 1).join('. ');

  const themeEn = THEMES_EN[themeEs] || themeEs;
  const priorityEn = PRIORITIES_EN[priorityEs] || priorityEs;

  let middleEn = '';
  if (middleEs && MIDDLES_EN[middleEs]) {
    middleEn = MIDDLES_EN[middleEs];
  } else if (SPECIFIC_FALLBACKS[id]) {
    middleEn = SPECIFIC_FALLBACKS[id];
  } else if (middleEs) {
    middleEn = middleEs;
  }

  const sentences = [themeEn, middleEn, priorityEn].filter(Boolean);
  return sentences.map((s) => s.replace(/\.+$/, '')).join('. ') + '.';
}

function cleanCaptionText(str) {
  if (!str) return '';
  return str
    .replace(/\bsegún\s+la\s+cartela\s+fotografiada\b/gi, '(attributed by museum label)')
    .replace(/\bsegún\b/gi, 'after')
    .replace(/\bHacia\s+/gi, 'c. ')
    .replace(/\bhacia\s+/gi, 'c. ')
    .replace(/\bFecha de esta versión por confirmar\b/gi, 'Date of this version to be confirmed')
    .replace(/\bmodelo de Rigaud de 1727–1729\b/gi, "after Rigaud's 1727–1729 model")
    .replace(/\bsiglo XVIII\b/gi, '18th century')
    .replace(/\bsiglo XVII\b/gi, '17th century')
    .replace(/\bsiglo XIX\b/gi, '19th century')
    .replace(/\bParís\b/gi, 'Paris')
    .replace(/\bLondres\b/gi, 'London');
}

function formatCaption(autor, titulo, fecha, museo) {
  const parts = [cleanCaptionText(autor), cleanCaptionText(titulo), cleanCaptionText(fecha), cleanCaptionText(museo)]
    .map((p) => (p || '').trim().replace(/\.+$/, ''))
    .filter(Boolean);
  return parts.join('. ') + '.';
}

function findSourceImage(relPath) {
  const p1 = path.join(rootDir, 'referencias', relPath);
  if (fs.existsSync(p1)) return p1;

  const p2 = path.join(rootDir, 'referencias', '01_POR_SECCION-20261009T004921Z-1-001', relPath);
  if (fs.existsSync(p2)) return p2;

  return null;
}

async function main() {
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: No se encontró el archivo JSON en: ${jsonPath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(jsonPath, 'utf8');
  const items = JSON.parse(rawJson);

  console.log(`Leídos ${items.length} registros de ASIGNACIONES_PARA_LA_PAGINA.json.`);

  const references = {};
  const missingFiles = [];
  const needsReviewList = [];
  const shortenedCredits = [];
  let processedCount = 0;

  for (const item of items) {
    const idSubseccion = SECTION_MAP[item.seccion];
    if (!idSubseccion) {
      console.warn(`Sección desconocida: ${item.seccion}`);
      continue;
    }

    // Determinar instrumento y versión
    let instrumento = 'piano';
    let versionNum = 1;
    if (item.version.startsWith('PNO-')) {
      instrumento = 'piano';
      versionNum = parseInt(item.version.replace('PNO-', ''), 10);
    } else if (item.version.startsWith('HPS-')) {
      instrumento = 'harpsichord';
      versionNum = parseInt(item.version.replace('HPS-', ''), 10);
    }

    // Ruta de destino de la imagen
    const subseccionDir = path.join(outputImagesDir, idSubseccion);
    fs.mkdirSync(subseccionDir, { recursive: true });
    const destFileName = `${instrumento}-${versionNum}.jpg`;
    const destFilePath = path.join(subseccionDir, destFileName);
    const webSrc = `/references/${idSubseccion}/${destFileName}`;

    // Buscar archivo origen y redimensionar si aún no existe
    const sourceFilePath = findSourceImage(item.imagen);
    if (!sourceFilePath) {
      missingFiles.push({
        id: `${item.seccion} / ${item.version}`,
        esperado: item.imagen,
      });
    } else if (!fs.existsSync(destFilePath)) {
      try {
        await sharp(sourceFilePath)
          .rotate()
          .resize({
            width: 1800,
            height: 1800,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality: 82, progressive: true })
          .toFile(destFilePath);
        processedCount++;
      } catch (err) {
        console.error(`Error procesando ${sourceFilePath}:`, err.message);
      }
    } else {
      processedCount++;
    }

    // Metadatos y crédito
    const rawCredit = (item.credito_imagen || '').trim();
    let credit = rawCredit;
    let needsReview = false;

    if (item.procedencia === 'PROPIA') {
      credit = 'Photo: Daniel Porcel';
    } else if (item.procedencia === 'CAPTURA') {
      credit = 'Digital reproduction supplied by the author';
      needsReview = true;
    } else if (rawCredit.startsWith('The Cleveland Museum of Art')) {
      credit = 'The Cleveland Museum of Art, Open Access';
    } else {
      const isProblematic =
        rawCredit.length > 90 ||
        PROBLEMATIC_KEYWORDS.some((kw) => rawCredit.toLowerCase().includes(kw));

      if (isProblematic) {
        if ((item.fuente_imagen || '').includes('commons.wikimedia.org')) {
          credit = 'Wikimedia Commons';
        } else if (item.museo) {
          credit = cleanCaptionText(item.museo);
        } else {
          credit = 'Wikimedia Commons';
        }
      }
    }

    if (needsReview) {
      needsReviewList.push({
        id: `${idSubseccion} (${item.seccion}) / ${instrumento}-${versionNum}`,
        titulo: item.titulo,
        credito: credit,
      });
    }

    if (credit !== rawCredit) {
      shortenedCredits.push({
        id: `${idSubseccion} / ${instrumento}-${versionNum}`,
        original: rawCredit,
        resultado: credit,
        procedencia: item.procedencia,
      });
    }

    // Construir estructura references[idSubseccion][instrumento][version]
    if (!references[idSubseccion]) {
      references[idSubseccion] = {};
    }
    if (!references[idSubseccion][instrumento]) {
      references[idSubseccion][instrumento] = {};
    }

    const itemKey = `${item.seccion}_${item.version}`;
    const englishExplanation = translateRelacionMusical(itemKey, item.relacion_musical);

    // Sin información de licencias, conforme a lo requerido
    references[idSubseccion][instrumento][versionNum] = {
      src: webSrc,
      alt: `${cleanCaptionText(item.titulo)} — ${cleanCaptionText(item.autor_obra)}`,
      caption: formatCaption(item.autor_obra, item.titulo, item.fecha_obra, item.museo),
      explanation: englishExplanation,
      credit,
      needsReview,
      sourceId: item.id_imagen || item.id_obra || '',
    };
  }

  // Generar src/data/references.js
  const jsContent = `// Generated automatically by scripts/build-references.js from referencias/ASIGNACIONES_PARA_LA_PAGINA.json
// Do not edit manually; update the source JSON and run: node scripts/build-references.js

export const references = ${JSON.stringify(references, null, 2)};
`;

  fs.mkdirSync(path.dirname(outputJsPath), { recursive: true });
  fs.writeFileSync(outputJsPath, jsContent, 'utf8');

  console.log(`\n========================================`);
  console.log(`INFORME DE PROCESAMIENTO DE REFERENCIAS`);
  console.log(`========================================`);
  console.log(`- Imágenes procesadas: ${processedCount} (esperadas: 92)`);
  console.log(`- Archivos que falten: ${missingFiles.length}`);
  console.log(`- Entradas con needsReview: ${needsReviewList.length}`);
  console.log(`\nArchivo generado con éxito: ${outputJsPath}`);
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
