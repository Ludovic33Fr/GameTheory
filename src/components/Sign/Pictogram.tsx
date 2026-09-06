import type { ReactElement } from 'react';

/**
 * Jeu de pictogrammes du panneau : formes pleines blanches, filets à 2.8,
 * grille de 32. Ils sont dessinés ici et nulle part ailleurs — aucun glyphe
 * Unicode ne tient lieu d'icône dans ce système.
 */
export type PictogramId =
  | 'prisoners'
  | 'nash'
  | 'mixed'
  | 'iterated'
  | 'sequential'
  | 'commons'
  | 'arrowRight'
  | 'arrowLeft'
  | 'arrowUp'
  | 'arrowDown'
  | 'chevron'
  | 'info'
  | 'glossary'
  | 'book'
  | 'map'
  | 'terminal'
  | 'link'
  | 'warn'
  | 'rock'
  | 'paper'
  | 'scissors';

const SHAPES: Record<PictogramId, ReactElement> = {
  /* Deux cellules, un mur au milieu : chacun décide seul. */
  prisoners: (
    <>
      <circle cx="8" cy="9.5" r="3.1" />
      <path d="M3.6 26c0-5.6 1.7-8.6 4.4-8.6s4.4 3 4.4 8.6Z" />
      <circle cx="24" cy="9.5" r="3.1" />
      <path d="M19.6 26c0-5.6 1.7-8.6 4.4-8.6s4.4 3 4.4 8.6Z" />
      <rect x="15" y="3" width="2" height="26" />
    </>
  ),
  /* Deux poussées qui s'arrêtent net contre la même ligne : personne ne bouge. */
  nash: (
    <>
      <rect x="15" y="4" width="2" height="24" />
      <rect x="1.5" y="14.6" width="8.5" height="2.8" />
      <path d="M14 16 9.4 11.2v9.6Z" />
      <rect x="22" y="14.6" width="8.5" height="2.8" />
      <path d="M18 16l4.6 4.8v-9.6Z" />
    </>
  ),
  /* Une distribution : la stratégie n'est plus un choix mais des poids. */
  mixed: (
    <>
      <rect x="4" y="11" width="6" height="14" />
      <rect x="13" y="4.5" width="6" height="20.5" />
      <rect x="22" y="17" width="6" height="8" />
      <rect x="2" y="26" width="28" height="2.6" />
    </>
  ),
  /* On rejoue. */
  iterated: (
    <>
      <path
        d="M27 16A11 11 0 1 1 16 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M22.6 5 13.4 0.6v8.8Z" />
    </>
  ),
  /* L'un joue, puis l'autre : un arbre, pas une matrice. */
  sequential: (
    <>
      <path
        d="M16 8v3.4l-8 5.2M16 11.4l8 5.2M8 22.4v1.2l-4 3M8 23.6l4 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <circle cx="16" cy="5" r="3.4" />
      <circle cx="8" cy="19.6" r="3.2" />
      <circle cx="24" cy="19.6" r="3.2" />
      <rect x="1.6" y="26.4" width="5" height="5" />
      <rect x="9.6" y="26.4" width="5" height="5" />
    </>
  ),
  /* Tout le monde puise dans la même case. */
  commons: (
    <>
      <rect x="13" y="13" width="6" height="6" />
      <rect x="15" y="1.5" width="2" height="4.5" />
      <path d="M16 11.6 12.2 6.4h7.6Z" />
      <rect x="15" y="26" width="2" height="4.5" />
      <path d="M16 20.4 12.2 25.6h7.6Z" />
      <rect x="1.5" y="15" width="4.5" height="2" />
      <path d="M11.6 16 6.4 12.2v7.6Z" />
      <rect x="26" y="15" width="4.5" height="2" />
      <path d="M20.4 16 25.6 12.2v7.6Z" />
    </>
  ),

  arrowRight: (
    <>
      <rect x="2" y="14.2" width="18" height="3.6" />
      <path d="M30 16 17 7.2v17.6Z" />
    </>
  ),
  arrowLeft: (
    <>
      <rect x="12" y="14.2" width="18" height="3.6" />
      <path d="M2 16 15 7.2v17.6Z" />
    </>
  ),
  arrowUp: (
    <>
      <rect x="14.2" y="12" width="3.6" height="18" />
      <path d="M16 2 7.2 15h17.6Z" />
    </>
  ),
  arrowDown: (
    <>
      <rect x="14.2" y="2" width="3.6" height="18" />
      <path d="M16 30 7.2 17h17.6Z" />
    </>
  ),
  chevron: <path d="M10.8 2.2 25 16 10.8 29.8 6.6 25.6 16.6 16 6.6 6.4Z" />,
  info: (
    <>
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <circle cx="16" cy="8.9" r="1.9" />
      <rect x="14.4" y="13.2" width="3.2" height="10.4" />
    </>
  ),
  glossary: (
    <>
      <rect x="2.5" y="5.5" width="5" height="5" />
      <rect x="11" y="6.6" width="18.5" height="2.8" />
      <rect x="2.5" y="13.5" width="5" height="5" />
      <rect x="11" y="14.6" width="18.5" height="2.8" />
      <rect x="2.5" y="21.5" width="5" height="5" />
      <rect x="11" y="22.6" width="18.5" height="2.8" />
    </>
  ),
  book: (
    <>
      <path d="M2.5 4.5h11a1.5 1.5 0 0 1 1.5 1.5v21a3.4 3.4 0 0 0-3-2H2.5Z" />
      <path d="M29.5 4.5h-11A1.5 1.5 0 0 0 17 6v21a3.4 3.4 0 0 1 3-2h9.5Z" />
    </>
  ),
  map: (
    <path
      fillRule="evenodd"
      d="M16 2.2c-5.7 0-10.3 4.6-10.3 10.3C5.7 20.3 16 30.2 16 30.2s10.3-9.9 10.3-17.7c0-5.7-4.6-10.3-10.3-10.3Zm0 14.1a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Z"
    />
  ),
  /* Le terminal : un panneau suspendu à sa potence. */
  terminal: (
    <>
      <rect x="15" y="1.5" width="2" height="4.5" />
      <rect x="2" y="6" width="28" height="15" />
      <rect x="6" y="24" width="4" height="6" />
      <rect x="14" y="24" width="4" height="6" />
      <rect x="22" y="24" width="4" height="6" />
    </>
  ),
  link: (
    <>
      <path d="M14 2.5h15.5V18h-4V9.3L12.3 22.5 9.5 19.7 22.7 6.5H14Z" />
      <path d="M2.5 8.5H12v4H6.5v13h13V20h4v9.5h-21Z" />
    </>
  ),
  warn: (
    <>
      <path
        fillRule="evenodd"
        d="M16 2 31 29H1Zm0 7.6-9.1 16.4h18.2Z"
      />
      <rect x="14.4" y="13.4" width="3.2" height="8" />
      <circle cx="16" cy="24.4" r="1.9" />
    </>
  ),

  /* Pierre, papier, ciseaux — dessinés, jamais des émojis. */
  rock: <path d="M6 20.5 9.5 10 17.5 4.5 26 11.5 27 21.5 19 28.5 10 27.5Z" />,
  paper: (
    <>
      <path
        d="M7 3.3h12.6L26 9.7v19H7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path d="M19.6 3.3 26 9.7h-6.4Z" />
    </>
  ),
  scissors: (
    <g fill="none" stroke="currentColor" strokeWidth="2.6">
      <circle cx="8" cy="25" r="4" />
      <circle cx="24" cy="25" r="4" />
      <path d="M10.6 21.9 24 3.5M21.4 21.9 8 3.5" />
    </g>
  ),
};

interface PictogramProps {
  id: PictogramId;
  /** Côté du pictogramme en pixels. */
  size?: number;
  className?: string;
}

export function Pictogram({ id, size = 20, className }: PictogramProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES[id]}
    </svg>
  );
}
