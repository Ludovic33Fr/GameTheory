/**
 * L'arbre du guichet « Quel jeu ? » : trois à quatre questions sur la forme
 * de la situation — combien décident, quand, avec quels intérêts — et l'on
 * aboutit à une fiche. Chaque feuille est un identifiant de `GAMES`.
 */
export type Next = { node: string } | { game: string };

export interface TreeOption {
  label: string;
  /** Un exemple concret, pour se reconnaître. */
  example?: string;
  next: Next;
}

export interface TreeNode {
  id: string;
  question: string;
  /** Une phrase qui précise ce qu'on demande, quand la question seule ne suffit pas. */
  hint?: string;
  options: TreeOption[];
}

export const ROOT_ID = 'combien';

export const TREE: Record<string, TreeNode> = {
  combien: {
    id: 'combien',
    question: 'Combien de personnes prennent une décision ?',
    hint: "Compte ceux dont le choix change le résultat, pas les spectateurs.",
    options: [
      {
        label: 'Deux',
        example: 'Toi et une autre personne, deux entreprises, deux pays.',
        next: { node: 'quand' },
      },
      {
        label: 'Un groupe',
        example: 'Une équipe, un immeuble, un marché entier.',
        next: { node: 'groupe' },
      },
    ],
  },

  quand: {
    id: 'quand',
    question: 'Décidez-vous en même temps, ou l’un après l’autre ?',
    options: [
      {
        label: 'En même temps',
        example: "Chacun choisit sans savoir ce que l'autre a choisi.",
        next: { node: 'interets' },
      },
      {
        label: "L'un après l'autre",
        example: 'Le second voit le coup du premier avant de jouer.',
        next: { node: 'sequence' },
      },
    ],
  },

  interets: {
    id: 'interets',
    question: 'Vos intérêts sont…',
    options: [
      {
        label: 'Totalement opposés',
        example: "Ce que je gagne, l'autre le perd exactement.",
        next: { game: 'pierre-papier-ciseaux' },
      },
      {
        label: 'Alignés : on veut faire la même chose',
        example: "On gagne si on se coordonne, on perd si on se rate.",
        next: { node: 'coordination' },
      },
      {
        label: 'Opposés sur un point : chacun veut que l’autre cède',
        example: 'Deux voitures face à face, deux camps qui campent sur leur position.',
        next: { game: 'poule-mouillee' },
      },
      {
        label: 'Mêlés : coopérer paierait, mais tricher tente',
        example: 'On gagnerait à s’entendre, mais chacun gagne plus à faire cavalier seul.',
        next: { node: 'rejouer' },
      },
    ],
  },

  coordination: {
    id: 'coordination',
    question: 'Êtes-vous d’accord sur la meilleure option ?',
    options: [
      {
        label: 'Oui, mais elle est risquée si l’autre ne suit pas',
        example: 'Le gros projet commun ne marche que si les deux s’y engagent.',
        next: { game: 'chasse-au-cerf' },
      },
      {
        label: 'Non, chacun préfère une option différente',
        example: 'Être ensemble compte, mais chacun voudrait que ce soit chez lui.',
        next: { game: 'bataille-des-sexes' },
      },
      {
        label: 'Peu importe laquelle, pourvu qu’on prenne la même',
        example: 'Rouler à droite ou à gauche, choisir un format de fichier.',
        next: { game: 'coordination-pure' },
      },
    ],
  },

  rejouer: {
    id: 'rejouer',
    question: 'Allez-vous rejouer ensemble ?',
    hint: "La réponse change tout : ce qui est rationnel en un coup ne l'est plus quand on se reverra.",
    options: [
      {
        label: 'Non, une seule fois',
        example: 'Une transaction unique, un inconnu qu’on ne reverra pas.',
        next: { game: 'dilemme-du-prisonnier' },
      },
      {
        label: 'Oui, régulièrement',
        example: 'Un collègue, un concurrent installé, un voisin.',
        next: { game: 'dilemme-itere' },
      },
    ],
  },

  sequence: {
    id: 'sequence',
    question: 'Qui fait quoi ?',
    options: [
      {
        label: 'L’un propose un partage, l’autre accepte ou refuse tout',
        example: 'Une offre à prendre ou à laisser.',
        next: { game: 'ultimatum' },
      },
      {
        label: 'L’un confie quelque chose, l’autre choisit de rendre ou de garder',
        example: 'Avancer de l’argent, déléguer, livrer avant d’être payé.',
        next: { game: 'jeu-de-la-confiance' },
      },
      {
        label: 'L’un menace, l’autre décide d’y aller quand même',
        example: 'Un acteur dominant promet des représailles à qui entre.',
        next: { game: 'entree-sur-un-marche' },
      },
      {
        label: 'Chacun surenchérit pour ne pas perdre ce qu’il a déjà misé',
        example: 'Un procès, un projet qu’on n’ose plus arrêter.',
        next: { game: 'enchere-au-dollar' },
      },
    ],
  },

  groupe: {
    id: 'groupe',
    question: 'Que fait chacun ?',
    options: [
      {
        label: 'Puise dans une ressource partagée',
        example: 'Un pâturage, une nappe phréatique, une bande passante.',
        next: { game: 'tragedie-des-biens-communs' },
      },
      {
        label: 'Contribue — ou pas — à quelque chose dont tous profitent',
        example: 'Une cagnotte, un logiciel libre, l’éclairage d’une rue.',
        next: { game: 'bien-public' },
      },
      {
        label: 'Attend que quelqu’un d’autre se dévoue',
        example: 'Qui va appeler ? Qui va prendre la parole ?',
        next: { game: 'dilemme-du-volontaire' },
      },
      {
        label: 'Essaie de deviner ce que les autres vont faire',
        example: 'Parier sur ce que le marché croira, pas sur ce qui est vrai.',
        next: { game: 'concours-de-beaute' },
      },
    ],
  },
};

/** Le chemin parcouru : une suite d'indices d'options depuis la racine. */
export type Path = number[];

export interface Step {
  node: TreeNode;
  choice: TreeOption;
}

/**
 * Rejoue un chemin depuis la racine. Retourne les étapes traversées, le nœud
 * courant s'il reste une question, ou le jeu atteint. Un chemin invalide est
 * tronqué à sa dernière étape valide.
 */
export function walk(path: Path): { steps: Step[]; node?: TreeNode; game?: string } {
  const steps: Step[] = [];
  let node: TreeNode | undefined = TREE[ROOT_ID];
  for (const idx of path) {
    if (!node) break;
    const choice: TreeOption | undefined = node.options[idx];
    if (!choice) break;
    steps.push({ node, choice });
    if ('game' in choice.next) return { steps, game: choice.next.game };
    node = TREE[choice.next.node];
  }
  return { steps, node };
}

/** Le chemin qui mène à un jeu, pour retrouver « comment on y arrive » depuis une fiche. */
export function pathTo(gameId: string): Path | null {
  const visit = (nodeId: string, acc: Path): Path | null => {
    const node = TREE[nodeId];
    for (let i = 0; i < node.options.length; i++) {
      const next = node.options[i].next;
      if ('game' in next) {
        if (next.game === gameId) return [...acc, i];
      } else {
        const found = visit(next.node, [...acc, i]);
        if (found) return found;
      }
    }
    return null;
  };
  return visit(ROOT_ID, []);
}
