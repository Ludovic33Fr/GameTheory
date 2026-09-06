import type { NormalFormGame } from '../games/types';
import { prisonersDilemma } from '../games/prisoners';
import { battleOfTheSexes, chicken } from '../games/examples';
import {
  publicGood,
  pureCoordination,
  rockPaperScissors,
  stagHunt,
  volunteersDilemma,
} from '../games/catalog';
import type { ConceptId } from './concepts';

export type Timing = 'simultane' | 'sequentiel';
export type Repetition = 'unique' | 'repete' | 'indifferent';
export type PlayerCount = '2' | 'N';

export interface GameMatrix {
  game: NormalFormGame;
  /** Libellés français des actions, indexés [joueur][action]. */
  labels: [string[], string[]];
  players: [string, string];
}

export interface GameSheet {
  id: string;
  title: string;
  aliases?: string[];
  /** Le jeu en une phrase. */
  tagline: string;
  players: PlayerCount;
  timing: Timing;
  repeated: Repetition;
  /** La situation type, racontée. */
  story: string;
  matrix?: GameMatrix;
  /** Ce que la théorie prédit. */
  whatHappens: string;
  /** Ce que le jeu enseigne, en pratique. */
  lesson: string;
  /** Les portes à prendre pour comprendre. La première est la principale. */
  concepts: ConceptId[];
  /** Ce jeu a sa propre page de concept sur le site, avec sa démonstration. */
  onSite?: ConceptId;
}

export const TIMING_LABEL: Record<Timing, string> = {
  simultane: 'En même temps',
  sequentiel: "L'un après l'autre",
};
export const REPETITION_LABEL: Record<Repetition, string> = {
  unique: 'Une seule fois',
  repete: 'Répété',
  indifferent: 'Une fois ou répété',
};
export const PLAYERS_LABEL: Record<PlayerCount, string> = {
  '2': 'Deux joueurs',
  N: 'Un groupe',
};

export const GAMES: GameSheet[] = [
  {
    id: 'dilemme-du-prisonnier',
    title: 'Dilemme du prisonnier',
    tagline:
      'Chacun gagnerait à coopérer, mais chacun gagne encore plus à trahir — et tout le monde finit perdant.',
    players: '2',
    timing: 'simultane',
    repeated: 'unique',
    story:
      "Deux complices sont interrogés séparément. Si les deux se taisent, ils prennent une peine légère. Si l'un dénonce l'autre qui se tait, le dénonciateur sort libre et l'autre écope du maximum. Si les deux dénoncent, peine intermédiaire pour chacun. Aucun ne sait ce que fait l'autre.",
    matrix: {
      game: prisonersDilemma,
      labels: [
        ['Coopérer', 'Trahir'],
        ['Coopérer', 'Trahir'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Trahir est une stratégie dominante : quoi que fasse l'autre, on s'en tire mieux en trahissant. L'unique équilibre est (Trahir, Trahir), alors que (Coopérer, Coopérer) serait meilleur pour les deux.",
    lesson:
      "La rationalité individuelle peut produire un résultat collectivement mauvais. Quand tu reconnais cette structure — course aux armements, dumping, surenchère publicitaire — ce n'est pas la mauvaise volonté des acteurs qui est en cause, c'est la forme du jeu.",
    concepts: ['prisoners', 'nash', 'iterated'],
    onSite: 'prisoners',
  },
  {
    id: 'dilemme-itere',
    title: 'Dilemme du prisonnier itéré',
    tagline:
      "Le même dilemme, mais on rejouera : la réputation change tout, et la coopération devient possible.",
    players: '2',
    timing: 'simultane',
    repeated: 'repete',
    story:
      "Deux entreprises se partagent un marché et fixent leurs prix chaque mois. Baisser ses prix pendant que l'autre les maintient rapporte gros — mais le mois suivant, l'autre s'en souviendra.",
    matrix: {
      game: prisonersDilemma,
      labels: [
        ['Coopérer', 'Trahir'],
        ['Coopérer', 'Trahir'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Si la relation est appelée à durer, trahir aujourd'hui coûte demain. Des stratégies simples comme Tit-for-tat (coopérer, puis copier le dernier coup de l'autre) soutiennent une coopération stable — c'est le résultat des tournois d'Axelrod.",
    lesson:
      "L'ombre du futur discipline le présent. Pour rendre la coopération possible, allonge l'horizon de la relation, rends les coups visibles et réponds aux trahisons sans jamais frapper le premier.",
    concepts: ['iterated', 'prisoners', 'commons'],
    onSite: 'iterated',
  },
  {
    id: 'pierre-papier-ciseaux',
    title: 'Pierre-papier-ciseaux',
    aliases: ['Matching pennies', 'Jeu à somme nulle'],
    tagline:
      "Ce que l'un gagne, l'autre le perd exactement. Il n'existe aucun bon coup : il n'existe qu'une bonne façon de tirer au sort.",
    players: '2',
    timing: 'simultane',
    repeated: 'indifferent',
    story:
      "Un gardien de but et un tireur de penalty. Le tireur choisit un côté, le gardien plonge d'un côté. S'ils choisissent le même, le gardien gagne ; sinon, le tireur. Chacun veut être imprévisible.",
    matrix: {
      game: rockPaperScissors,
      labels: [
        ['Pierre', 'Papier', 'Ciseaux'],
        ['Pierre', 'Papier', 'Ciseaux'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Aucune case n'est stable : quel que soit le profil, l'un des deux regrette. Le seul équilibre est en stratégies mixtes — jouer chaque coup avec probabilité 1/3. Toute régularité est exploitable.",
    lesson:
      "Dans un conflit pur, la valeur est dans l'imprévisibilité, pas dans le coup. Si l'adversaire peut anticiper ton choix, tu as déjà perdu ; la stratégie optimale est une distribution, pas une action.",
    concepts: ['mixed', 'nash'],
    onSite: 'mixed',
  },
  {
    id: 'chasse-au-cerf',
    title: 'Chasse au cerf',
    aliases: ['Stag hunt', 'Jeu de la confiance mutuelle'],
    tagline:
      "Ensemble, on prend le cerf. Seul, on se rabat sur le lièvre. Le meilleur résultat exige de faire confiance.",
    players: '2',
    timing: 'simultane',
    repeated: 'indifferent',
    story:
      "Deux chasseurs. Le cerf nourrit tout le village mais ne se prend qu'à deux. Le lièvre se prend seul et ne nourrit qu'une famille. Si tu pars au cerf et que l'autre part au lièvre, tu rentres les mains vides.",
    matrix: {
      game: stagHunt,
      labels: [
        ['Cerf', 'Lièvre'],
        ['Cerf', 'Lièvre'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Deux équilibres : (Cerf, Cerf), le meilleur pour tous, et (Lièvre, Lièvre), le plus sûr. Contrairement au dilemme du prisonnier, personne n'a intérêt à trahir une coopération établie — le problème est de s'y engager sans garantie.",
    lesson:
      "Ce n'est pas un problème d'incitation mais de confiance. Ce qui débloque le cerf, ce sont les signaux crédibles, les engagements visibles, l'historique commun : tout ce qui rend l'autre prévisible.",
    concepts: ['nash', 'iterated'],
  },
  {
    id: 'bataille-des-sexes',
    title: 'Bataille des sexes',
    aliases: ['Jeu de coordination avec conflit'],
    tagline:
      "Vous voulez être ensemble, mais pas au même endroit. Deux issues stables, et chacun préfère la sienne.",
    players: '2',
    timing: 'simultane',
    repeated: 'indifferent',
    story:
      "Deux amis veulent passer la soirée ensemble. L'un préfère l'opéra, l'autre le match. Être ensemble n'importe où vaut mieux que d'être seul — mais chacun préférerait que ce soit à son endroit.",
    matrix: {
      game: battleOfTheSexes,
      labels: [
        ['Opéra', 'Match'],
        ['Opéra', 'Match'],
      ],
      players: ['Toi', 'Ton·ta partenaire'],
    },
    whatHappens:
      "Deux équilibres, (Opéra, Opéra) et (Match, Match), et rien dans le jeu ne dit lequel. Sans communication, la coordination échoue une fois sur deux ; avec une convention ou un premier à parler, elle réussit — au profit de celui dont l'option est retenue.",
    lesson:
      "Quand plusieurs issues sont stables, le résultat dépend de ce qui est en dehors du jeu : l'habitude, le point focal, qui parle en premier. Choisir la convention, c'est déjà choisir le gagnant.",
    concepts: ['nash', 'sequential'],
  },
  {
    id: 'coordination-pure',
    title: 'Coordination pure',
    aliases: ['Jeu de convention', 'Conduite à droite ou à gauche'],
    tagline:
      "Peu importe l'option, pourvu que tout le monde prenne la même. Le problème n'est pas de choisir, c'est de savoir ce que l'autre choisit.",
    players: '2',
    timing: 'simultane',
    repeated: 'indifferent',
    story:
      "Deux voitures se croisent sur une route sans marquage. Rouler à droite ou à gauche est indifférent — tant que les deux font pareil. La convention n'a aucune valeur en soi, et une valeur immense en commun.",
    matrix: {
      game: pureCoordination,
      labels: [
        ['Gauche', 'Droite'],
        ['Gauche', 'Droite'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Deux équilibres parfaitement symétriques. Le jeu ne les départage pas : c'est la convention, l'histoire ou un point focal (un panneau, une habitude) qui le fait.",
    lesson:
      "Les normes, standards et formats existent pour résoudre ce jeu. Leur valeur ne vient pas de leur contenu mais de leur partage — d'où la difficulté à en changer une fois établis.",
    concepts: ['nash'],
  },
  {
    id: 'poule-mouillee',
    title: 'Poule mouillée',
    aliases: ['Chicken', 'Faucon-Colombe', 'Jeu de la dissuasion'],
    tagline:
      "Chacun veut que l'autre cède. Si aucun ne cède, c'est la catastrophe pour les deux.",
    players: '2',
    timing: 'simultane',
    repeated: 'unique',
    story:
      "Deux voitures foncent l'une vers l'autre. Celui qui dévie passe pour un lâche ; celui qui tient gagne le respect. Si les deux tiennent, la collision est pire que toute humiliation.",
    matrix: {
      game: chicken,
      labels: [
        ['Esquiver', 'Foncer'],
        ['Esquiver', 'Foncer'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Deux équilibres, (Esquiver, Foncer) et (Foncer, Esquiver) : dans chacun, l'un cède et l'autre gagne. Le jeu récompense celui qui se rend crédiblement incapable de céder — l'engagement irréversible est une arme.",
    lesson:
      "Dans une confrontation où le pire est mutuel, la crédibilité de la menace compte plus que la force. Mais jouer au fou est dangereux : deux joueurs convaincus de leur fermeté finissent dans le mur.",
    concepts: ['nash', 'sequential'],
  },
  {
    id: 'ultimatum',
    title: "Jeu de l'ultimatum",
    tagline:
      "L'un propose un partage, l'autre accepte ou refuse tout. La théorie dit d'accepter un centime ; les humains refusent l'injustice.",
    players: '2',
    timing: 'sequentiel',
    repeated: 'unique',
    story:
      "On donne 100 € au premier joueur, qui propose un partage au second. Si le second accepte, le partage est appliqué. S'il refuse, personne ne touche rien. Un seul tour, pas de négociation.",
    whatHappens:
      "Par induction à rebours, le second devrait accepter n'importe quelle offre positive, donc le premier devrait offrir le minimum. En laboratoire, les offres inférieures à 20–30 % sont massivement refusées, et les proposants offrent en général 40 à 50 %.",
    lesson:
      "Les gens paient pour punir l'injustice. Une offre techniquement rationnelle mais perçue comme insultante sera rejetée : dans toute proposition à prendre ou à laisser, l'équité fait partie du calcul de l'autre.",
    concepts: ['sequential', 'nash'],
  },
  {
    id: 'jeu-de-la-confiance',
    title: 'Jeu de la confiance',
    aliases: ['Trust game', "Jeu de l'investissement"],
    tagline:
      "L'un confie, l'autre décide de rendre ou de garder. Confier crée de la valeur — à condition que l'autre la partage.",
    players: '2',
    timing: 'sequentiel',
    repeated: 'indifferent',
    story:
      "Tu peux envoyer une somme à quelqu'un ; elle est triplée en chemin. Cette personne décide alors combien te renvoyer — y compris rien. Plus tu envoies, plus il y a à partager, et plus tu es exposé.",
    whatHappens:
      "En un coup, l'autre n'a aucune raison de rendre, donc tu n'as aucune raison d'envoyer : l'équilibre est de ne rien faire, et la valeur n'est jamais créée. Répété, ou avec réputation, la confiance devient rationnelle.",
    lesson:
      "La confiance n'est pas un sentiment, c'est un pari sur la structure : la relation va-t-elle durer, l'autre sera-t-il observé, la trahison aura-t-elle un coût ? Tout ce qui rend la trahison chère rend la confiance possible.",
    concepts: ['sequential', 'iterated'],
  },
  {
    id: 'entree-sur-un-marche',
    title: "Jeu d'entrée sur un marché",
    aliases: ['Entrant contre monopole', 'Menace non crédible'],
    tagline:
      "Le monopole promet une guerre des prix à quiconque entre. Faut-il y croire ?",
    players: '2',
    timing: 'sequentiel',
    repeated: 'unique',
    story:
      "Une entreprise dominante annonce qu'elle écrasera tout nouvel entrant par des prix cassés. Un concurrent hésite : s'il entre, le monopole devra choisir entre mener la guerre, coûteuse pour lui aussi, ou s'accommoder et partager le marché.",
    whatHappens:
      "Par induction à rebours : une fois l'entrant présent, la guerre coûte au monopole plus que le partage — il s'accommodera. L'entrant, qui le prévoit, entre. La menace n'est pas crédible parce qu'il n'aura pas intérêt à l'exécuter.",
    lesson:
      "Une menace ne vaut que si celui qui la profère aura encore intérêt à la mettre à exécution le moment venu. Pour la rendre crédible, il faut se lier les mains à l'avance — c'est le paradoxe de l'engagement.",
    concepts: ['sequential', 'nash'],
    onSite: 'sequential',
  },
  {
    id: 'enchere-au-dollar',
    title: 'Enchère au dollar',
    aliases: ["Guerre d'usure", "Piège de l'escalade"],
    tagline:
      "Chacun surenchérit pour ne pas perdre ce qu'il a déjà misé — et on finit par payer bien plus que l'enjeu.",
    players: '2',
    timing: 'sequentiel',
    repeated: 'unique',
    story:
      "Un billet de 1 € est mis aux enchères avec une règle : le second enchérisseur paie aussi sa mise, sans rien recevoir. À 0,90 € contre 0,95 €, celui qui perd préfère monter à 1 € pour perdre moins. Puis 1,05 €. L'escalade n'a pas de fin naturelle.",
    whatHappens:
      "À chaque étape, continuer coûte moins que s'arrêter — localement, c'est rationnel. Globalement, c'est ruineux. Le seul équilibre raisonnable est de ne jamais commencer, ou de fixer à l'avance un plafond et de s'y tenir.",
    lesson:
      "Les coûts déjà engagés ne devraient pas peser sur la décision suivante, et pourtant ils le font. Reconnaître une guerre d'usure — procès interminable, projet qu'on n'ose pas arrêter — c'est se donner la chance d'en sortir avant la ruine.",
    concepts: ['sequential', 'iterated'],
  },
  {
    id: 'tragedie-des-biens-communs',
    title: 'Tragédie des biens communs',
    tagline:
      "Une ressource partagée, des usagers qui puisent chacun un peu plus — jusqu'à ce qu'il ne reste rien pour personne.",
    players: 'N',
    timing: 'simultane',
    repeated: 'repete',
    story:
      "Un pâturage commun. Chaque berger gagne à ajouter une bête, car il en touche tout le bénéfice tandis que le coût — l'herbe en moins — est réparti sur tous. Chacun raisonne ainsi, et le pâturage s'effondre.",
    whatHappens:
      "L'équilibre est la surexploitation : personne n'a individuellement intérêt à se retenir. C'est un dilemme du prisonnier à N joueurs, où la dilution du coût rend la tentation encore plus forte.",
    lesson:
      "Les biens communs ne se protègent pas par la bonne volonté mais par des règles : quotas, droits d'usage, surveillance mutuelle, sanctions graduées. Elinor Ostrom a montré que les communautés y parviennent — quand elles peuvent se voir et se parler.",
    concepts: ['commons', 'prisoners', 'iterated'],
    onSite: 'commons',
  },
  {
    id: 'bien-public',
    title: 'Jeu du bien public',
    aliases: ['Passager clandestin', 'Free rider'],
    tagline:
      "Tout le monde profite de ce qui est financé, que l'on ait contribué ou non. Alors pourquoi contribuer ?",
    players: 'N',
    timing: 'simultane',
    repeated: 'indifferent',
    story:
      "Un groupe finance un éclairage public, une cagnotte d'équipe, un logiciel libre. Chaque contribution est multipliée et profite à tous, y compris à ceux qui n'ont rien donné. Garder son argent et profiter de celui des autres est toujours possible.",
    matrix: {
      game: publicGood,
      labels: [
        ['Contribuer', 'Garder'],
        ['Contribuer', 'Garder'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Garder domine : quoi que fassent les autres, on touche autant de leur contribution en gardant la sienne. L'équilibre est que personne ne contribue, alors que tous y gagneraient. Plus le groupe est grand, plus la tentation est forte.",
    lesson:
      "C'est le miroir de la tragédie des biens communs : là on puise trop, ici on donne trop peu. Les réponses sont les mêmes — rendre la contribution visible, la conditionner à celle des autres, ou la rendre obligatoire.",
    concepts: ['commons', 'prisoners'],
  },
  {
    id: 'dilemme-du-volontaire',
    title: 'Dilemme du volontaire',
    aliases: ["Effet du témoin", 'Qui va appeler ?'],
    tagline:
      "Il suffit qu'une seule personne se dévoue pour que tout le monde y gagne. Chacun espère que ce sera quelqu'un d'autre.",
    players: 'N',
    timing: 'simultane',
    repeated: 'unique',
    story:
      "Une panne d'électricité dans l'immeuble. Un seul appel au fournisseur suffit. Appeler prend vingt minutes ; ne pas appeler ne coûte rien — si quelqu'un d'autre le fait. Si personne n'appelle, tout l'immeuble reste dans le noir.",
    matrix: {
      game: volunteersDilemma,
      labels: [
        ['Se dévouer', 'Attendre'],
        ['Se dévouer', 'Attendre'],
      ],
      players: ['Toi', "L'autre"],
    },
    whatHappens:
      "Les équilibres purs sont ceux où exactement un se dévoue — mais rien ne dit lequel. En stratégies mixtes, chacun se dévoue avec une certaine probabilité, et cette probabilité baisse quand le groupe grandit : plus il y a de témoins, plus il est probable que personne n'agisse.",
    lesson:
      "Face à un groupe, désigne quelqu'un. « Quelqu'un peut-il appeler ? » échoue là où « Toi, appelle » réussit. La dilution de la responsabilité est une propriété du jeu, pas un défaut des gens.",
    concepts: ['commons', 'mixed', 'nash'],
  },
  {
    id: 'concours-de-beaute',
    title: 'Concours de beauté',
    aliases: ['Devinez les deux tiers de la moyenne', 'Concours de beauté keynésien'],
    tagline:
      "Il ne s'agit pas de choisir ce que tu préfères, mais ce que tu penses que les autres pensent que les autres choisiront.",
    players: 'N',
    timing: 'simultane',
    repeated: 'unique',
    story:
      "Chacun écrit un nombre entre 0 et 100. Gagne celui qui est le plus proche des deux tiers de la moyenne. Si tout le monde joue au hasard, la moyenne est 50 et il faut jouer 33. Mais si tout le monde raisonne ainsi, il faut jouer 22. Puis 15…",
    whatHappens:
      "Le seul équilibre est 0 : c'est le point fixe de ce raisonnement poussé à l'infini. En pratique, les gens gagnent en jouant autour de 20 à 30, parce qu'ils anticipent que les autres ne raisonneront que deux ou trois niveaux.",
    lesson:
      "Sur un marché, on ne parie pas sur la valeur d'un actif mais sur ce que les autres croiront qu'il vaut. La bonne réponse dépend de la profondeur de raisonnement des autres — pas de la vérité.",
    concepts: ['nash', 'mixed'],
  },
];

export function gameById(id: string): GameSheet | undefined {
  return GAMES.find((g) => g.id === id);
}

/** Les jeux dont la porte principale est ce concept, dans l'ordre du répertoire. */
export function gamesForConcept(conceptId: ConceptId): GameSheet[] {
  return GAMES.filter((g) => g.concepts[0] === conceptId);
}
