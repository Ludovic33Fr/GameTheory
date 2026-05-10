export interface Reference {
  id: string;
  author: string;
  title: string;
  year: number;
  url?: string;
  blurb: string;
}

export const references: Reference[] = [
  {
    id: 'von-neumann',
    author: 'John von Neumann & Oskar Morgenstern',
    title: 'Theory of Games and Economic Behavior',
    year: 1944,
    blurb: "L'ouvrage fondateur. Pose le cadre mathématique des jeux à somme nulle et introduit le théorème du minimax.",
  },
  {
    id: 'nash',
    author: 'John F. Nash',
    title: 'Non-Cooperative Games (PhD dissertation)',
    year: 1950,
    blurb: "Définition et démonstration de l'existence de l'équilibre qui porte son nom, pour les jeux finis non coopératifs.",
  },
  {
    id: 'hardin',
    author: 'Garrett Hardin',
    title: 'The Tragedy of the Commons',
    year: 1968,
    url: 'https://www.science.org/doi/10.1126/science.162.3859.1243',
    blurb: 'Article séminal sur la surexploitation des ressources communes. Article court et accessible.',
  },
  {
    id: 'axelrod',
    author: 'Robert Axelrod',
    title: 'The Evolution of Cooperation',
    year: 1984,
    blurb: 'Compte rendu des tournois de dilemme du prisonnier itéré et du succès de tit-for-tat. Lecture grand public.',
  },
  {
    id: 'maynard-smith',
    author: 'John Maynard Smith',
    title: 'Evolution and the Theory of Games',
    year: 1982,
    blurb: 'Application de la théorie des jeux à la biologie : stratégies évolutionnairement stables, faucons et colombes.',
  },
  {
    id: 'osborne',
    author: 'Martin J. Osborne',
    title: 'An Introduction to Game Theory',
    year: 2004,
    blurb: 'Manuel universitaire moderne, équilibré entre rigueur et exemples. Bonne porte d\'entrée pour aller plus loin.',
  },
];
