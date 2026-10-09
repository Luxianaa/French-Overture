/**
 * Documentation catalog for French Ouverture project.
 * Contains metadata and file references for the written essay and scores.
 * 
 * TODO: Edit placeholder fields, descriptions, page numbers or publication years as needed.
 */

export const documents = [
  {
    // TODO: Edit document details if needed
    id: "essay",
    label: "ESSAY",
    title: "A Laboratory of Doubt Against Automatic Bach",
    subtitle: "Relearning the French Overture at the Piano",
    description: "The written part of the project: the arguments, references, methodology and reflection behind the experiments.",
    file: "/documents/essay.pdf",
    pages: null, // TODO: set page count, e.g. 52
    language: "English",
    year: null, // TODO: set publication year, e.g. 2024
    cover: null, // TODO: set custom cover image path if available, e.g. "/documents/covers/essay.jpg"
  },
  {
    // TODO: Edit document details if needed
    id: "score",
    label: "SCORE",
    title: "French Overture, BWV 831",
    subtitle: "Score",
    description: "The score of the French Overture, without markings.",
    file: "/documents/score.pdf",
    pages: null, // TODO: set page count, e.g. 28
    language: null, // Instrumental score has no primary prose language
    year: null, // TODO: set publication year / edition year
    cover: null, // TODO: set custom cover image path if available
  },
  {
    // TODO: Edit document details if needed
    id: "score-annotated",
    label: "ANNOTATED SCORE",
    title: "French Overture, BWV 831",
    subtitle: "Score with my annotations",
    description: "The same score with my annotations: the markings and decisions that guided each interpretation.",
    file: "/documents/score-annotated.pdf",
    pages: null, // TODO: set page count, e.g. 32
    language: null,
    year: null, // TODO: set publication year
    cover: null, // TODO: set custom cover image path if available
  },
];

export default documents;
