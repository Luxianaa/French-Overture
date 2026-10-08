import heroImg from '../../assets/hero-home.jpg';
import portraitImg from '../../assets/portrait.jpg';
import { videos } from '../videos.js';

// ─── Ouverture — content data ───────────────────────────────────────────────
// Dynamic youtubeIds loaded from src/data/videos.js

export const content = {
  title: 'Ouverture',
  introduction: `The Ouverture that opens BWV 831 is both a formal declaration and a provocation.
    Its bipartite structure — a majestic dotted-rhythm opening, a fugal center, and a return —
    invites constant questions about weight, speed, and the nature of French grandeur.
    Is the dotted rhythm a rhetorical gesture or a metric fact?
    Does the fugue breathe or march? These experiments do not answer; they multiply the doubt.`,
  heroImage: heroImg.src,

  subsections: [
    // ── SUBSECTION 1: Ouverture A ────────────────────────────────────────────
    {
      id: 'ouverture-a',
      title: 'Ouverture A',
      question: 'How much can the dotted rhythm stretch before the grandeur collapses into rhetoric — or the rhetoric reveals itself as the only truth?',
      experiments: [
        {
          type: 'structural',
          title: 'The double-dotting question',
          youtubeId: videos['ouverture-a']?.structural || null,
          description: `French overture convention allows — some say demands — the sharpening of
            dotted figures beyond their written value. This experiment takes that convention
            to its logical extreme and asks: at what point does precision become parody?`,
          images: [
            {
              src: heroImg.src,
              alt: 'Baroque manuscript showing dotted rhythm notation',
              caption: 'Manuscript notation of the Ouverture opening',
              explanation: `The original notation uses standard dotted figures, but French performance
                practice of the period expected performers to over-dot — sometimes dramatically so.
                The gap between what is written and what is played is itself a historical question.`,
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord action detail',
              caption: 'The harpsichord action that shapes the attack',
              explanation: `Unlike the piano, the harpsichord cannot vary dynamics through key pressure.
                The shaping of dotted rhythms must come entirely from timing and touch — making
                the double-dotting choice a question of articulation, not accent.`,
            },
          ],
        },
        {
          type: 'rhetorical',
          title: 'Tempo as argument',
          youtubeId: videos['ouverture-a']?.rhetorical || null,
          description: `What happens to the Ouverture's authority when the tempo is pushed
            uncomfortably slow? Authority and glacial deliberateness share the same posture —
            this experiment tests where one ends and the other begins.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Close-up of harpsichord keys',
              caption: 'The keyboard as rhetorical instrument',
              explanation: `At extreme slow tempos, each note of the harpsichord becomes an isolated
                event — the natural decay of the instrument works against legato phrasing and forces
                the performer to reconsider what "connection" means in this music.`,
            },
            {
              src: heroImg.src,
              alt: 'Score excerpt of the Ouverture A section',
              caption: 'The opening bars of the Ouverture',
              explanation: `The harmonic rhythm of the opening is surprisingly fast for such a
                stately tempo. Slowing down reveals inner voices and secondary harmonies that
                disappear at conventional speeds — a different kind of grandeur.`,
            },
          ],
        },
        {
          type: 'extreme',
          title: 'Against the bar line',
          youtubeId: videos['ouverture-a']?.extreme || null,
          description: `The barline in French overture style is a guide, not a governor.
            This experiment redistributes weight systematically away from the notated downbeat
            to see what the music looks like when its metric skeleton is questioned.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Score with rhythmic annotations',
              caption: 'Redistributed metric weight — annotated score',
              explanation: `By treating the barline as one possible metric anchor rather than
                the only one, the overture's rhythmic surface becomes unstable in productive ways.
                The discomfort is the point.`,
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord keyboard overview',
              caption: 'Full keyboard view — the space of the overture',
              explanation: `The Ouverture A spans almost the full range of the harpsichord.
                Metric displacement affects how this range is traversed — some paths feel
                inevitable, others feel like accidents that become decisions.`,
            },
          ],
        },
        {
          type: 'harpsichord',
          title: 'Registration as interpretation',
          youtubeId: videos['ouverture-a']?.harpsichord || null,
          description: `The Ouverture A on a single 8-foot stop versus full registration with
            the 4-foot coupler. This is not about volume — it is about texture, density,
            and what "grandeur" means when its sonic body changes shape.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Harpsichord registration stops',
              caption: 'The registration stops of a French harpsichord',
              explanation: `French harpsichords of Bach's period typically had two manuals,
                each with different registrations. Moving between them mid-phrase is possible
                and historically documented — but to what end, and at what cost to continuity?`,
            },
            {
              src: heroImg.src,
              alt: 'Manuscript detail of the Ouverture final bars',
              caption: 'Final bars of Ouverture A before the double bar',
              explanation: `The approach to the double bar is where registration choice is
                most consequential. A crescendo effect can be faked through registration change —
                but is fakery the wrong word for a convention that audiences understood?`,
            },
          ],
        },
      ],
    },

    // ── SUBSECTION 2: Fugue ──────────────────────────────────────────────────
    {
      id: 'fugue',
      title: 'Fugue',
      question: 'Is the Fugue a demonstration of contrapuntal learning, a dance in disguise, or an argument between voices that never quite agree?',
      experiments: [
        {
          type: 'structural',
          title: 'Subject identity across episodes',
          youtubeId: videos['fugue']?.structural || null,
          description: `The fugue subject transforms through inversion and augmentation.
            This experiment tracks those transformations with consistent articulation choices
            to ask whether the subject's identity survives — or whether identity is precisely
            what fugue puts in question.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Score showing the fugue subject and its inversions',
              caption: 'The fugue subject in its four main guises',
              explanation: `Structural listening tends to hear these as the "same" material in
                different forms. But performance choices — especially articulation — can make
                them feel like strangers who share a family resemblance.`,
            },
            {
              src: portraitImg.src,
              alt: 'Detail of the harpsichord bass register',
              caption: 'Bass register — where the augmented subject enters',
              explanation: `The augmented subject in the bass requires a different touch than
                the same material at normal values in the upper voices. The harpsichord's
                bass is naturally more resonant, but also less agile — a constraint that becomes
                an argument about the subject's character.`,
            },
          ],
        },
        {
          type: 'rhetorical',
          title: 'The fugue as conversation',
          youtubeId: videos['fugue']?.rhetorical || null,
          description: `What if the voices of the fugue are not working together but arguing?
            This experiment differentiates articulation sharply between voices to see if
            the fugue can sustain an interpretation where polyphony means conflict.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Harpsichord two-manual keyboard',
              caption: 'Two-manual harpsichord — voice differentiation',
              explanation: `On a two-manual instrument, voices can be physically separated
                in space and sound — upper voices on one manual, bass on another. This physical
                separation enables, but does not guarantee, a conversational interpretation.`,
            },
            {
              src: heroImg.src,
              alt: 'Score excerpt of a fugal episode',
              caption: 'A fugal episode where voices diverge',
              explanation: `Episodes between subject entries are often treated as neutral
                connective tissue. This experiment treats them as the most charged moments —
                the pauses between arguments where the next statement is being prepared.`,
            },
          ],
        },
        {
          type: 'extreme',
          title: 'Tempo gradient across the fugue',
          youtubeId: videos['fugue']?.extreme || null,
          description: `Rather than a single fugue tempo, this experiment allows the tempo
            to drift — accelerating through episodes, broadening at stretto — to treat
            the fugue as a living process rather than a fixed machine.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Score with tempo annotations across the fugue',
              caption: 'Annotated score — tempo as a variable, not a constant',
              explanation: `Baroque treatises are inconsistent on whether fugues should maintain
                strict tempo. This experiment takes seriously the possibility that they should not,
                and measures the cost.`,
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord jack mechanism detail',
              caption: 'The jack mechanism — speed and articulation',
              explanation: `As harpsichord tempo increases, the mechanical constraints of the
                plectrum and damper become more audible. A fast fugue on harpsichord sounds
                different in kind, not just in degree, from a moderate one.`,
            },
          ],
        },
        {
          type: 'harpsichord',
          title: 'Single manual, all voices equal',
          youtubeId: videos['fugue']?.harpsichord || null,
          description: `With all voices on the same manual, at the same registration,
            differentiation must come entirely from timing and touch. This experiment
            forces the question of whether harpsichord polyphony is ever truly equal-voiced.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Single-manual harpsichord keyboard',
              caption: 'Single manual — all voices in the same sonic space',
              explanation: `The single manual removes the option of timbral differentiation.
                What remains is the micro-timing of attack and release — a more intimate,
                more demanding form of voice-leading than registration changes can provide.`,
            },
            {
              src: heroImg.src,
              alt: 'Score of the fugue stretto section',
              caption: 'The stretto — where equal-voice pressure is highest',
              explanation: `In the stretto, subjects overlap so closely that any attempt to
                privilege one voice immediately suppresses another. On a single manual this
                is not a problem to solve but a condition to inhabit.`,
            },
          ],
        },
      ],
    },

    // ── SUBSECTION 3: Ouverture B ────────────────────────────────────────────
    {
      id: 'ouverture-b',
      title: 'Ouverture B',
      question: 'When the dotted opening returns, is it the same music? Can a repetition mean the same thing twice?',
      experiments: [
        {
          type: 'structural',
          title: 'The return as quotation',
          youtubeId: videos['ouverture-b']?.structural || null,
          description: `After the fugue, the opening material returns — but the listener has
            heard it before. This experiment treats the return as a conscious quotation:
            slightly slower, slightly more aware of itself, as if the music knows it has
            already happened.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Score comparison of Ouverture A and B openings',
              caption: 'The opening bars in A and B — identical on paper',
              explanation: `The notation is the same. The performance context is not. Whether
                this difference is audible — and whether it should be — is the question
                this experiment puts to the material.`,
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord keys worn with use',
              caption: 'Keys worn by repetition — time made visible',
              explanation: `The worn keys of an old harpsichord are a physical record of
                repetitions — each note struck again and again, never quite the same,
                never quite different. The Ouverture B is one more.`,
            },
          ],
        },
        {
          type: 'rhetorical',
          title: 'Slower than the opening',
          youtubeId: videos['ouverture-b']?.rhetorical || null,
          description: `If the return is heavier — bearing the weight of the fugue — then
            it should move more slowly. This experiment tests that hypothesis directly:
            what is gained and what is lost when the return takes longer than the opening?`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Score of the Ouverture B with tempo markings',
              caption: 'Ouverture B — with temporal weight marked',
              explanation: `A slower return is not simply a louder one. The added time between
                notes changes the harmonic weight and allows inner voices to become audible
                that were swallowed at the opening tempo.`,
            },
            {
              src: heroImg.src,
              alt: 'Manuscript page with the return of the overture theme',
              caption: 'The manuscript return — no indication of tempo change',
              explanation: `Bach provides no tempo indication for the return. This is not
                an oversight — it is an invitation. Every performer must decide whether
                the silence of the score means "same as before" or "your choice."`,
            },
          ],
        },
        {
          type: 'extreme',
          title: 'The return as interruption',
          youtubeId: videos['ouverture-b']?.extreme || null,
          description: `What if the return erupts rather than arrives? This experiment
            places no ritardando at the fugue's end and launches the return at a tempo
            faster than the opening — the grand gesture as shock rather than closure.`,
          images: [
            {
              src: heroImg.src,
              alt: 'Score at the joint between fugue and Ouverture B',
              caption: 'The moment of return — annotated for abrupt arrival',
              explanation: `The joint between fugue and return is one of the most contested
                moments in the Ouverture. Conventional performance broadens the fugue's end
                to prepare the return. This experiment refuses that preparation.`,
            },
            {
              src: portraitImg.src,
              alt: 'Harpsichord plectrum mechanism',
              caption: 'The plectrum — the physical source of attack clarity',
              explanation: `An abrupt return depends on attack clarity — the plectrum's snap
                must be decisive. On a well-regulated harpsichord this is not difficult;
                on an instrument with worn quills, the attack becomes ambiguous.`,
            },
          ],
        },
        {
          type: 'harpsichord',
          title: 'Registration change at the return',
          youtubeId: videos['ouverture-b']?.harpsichord || null,
          description: `A change of registration at the point of return is one of the most
            conventional interpretive gestures in French overture performance. This experiment
            does it, then questions why — and whether the convention carries meaning
            or merely habit.`,
          images: [
            {
              src: portraitImg.src,
              alt: 'Harpsichord registration pulls',
              caption: 'Registration change — the visible interpretive choice',
              explanation: `Pulling a stop is a visible action. The audience — if there is one —
                sees the performer make a choice. This theatricality is part of the meaning,
                not separate from it.`,
            },
            {
              src: heroImg.src,
              alt: 'Final bars of the Ouverture section',
              caption: 'The Ouverture closing — registration as conclusion',
              explanation: `What registration ends the Ouverture? Full? Reduced?
                The choice shapes the transition to the first dance — the Courante —
                and tells the listener what kind of suite is beginning.`,
            },
          ],
        },
      ],
    },
  ],
};
