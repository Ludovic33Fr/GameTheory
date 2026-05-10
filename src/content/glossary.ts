export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
}

export const glossary: GlossaryEntry[] = [
  { id: 'joueur', term: 'Joueur', definition: 'Une entité qui prend des décisions stratégiques dans un jeu.' },
  { id: 'strategie', term: 'Stratégie', definition: "Plan complet d'action pour un joueur, indiquant son choix dans toutes les situations possibles." },
  { id: 'strategie-dominante', term: 'Stratégie dominante', definition: "Stratégie qui rapporte au moins autant que toute autre, quoi que fasse l'adversaire." },
  { id: 'strategie-pure', term: 'Stratégie pure', definition: "Stratégie qui choisit une action déterministe, sans aléa." },
  { id: 'strategie-mixte', term: 'Stratégie mixte', definition: "Stratégie qui choisit chaque action avec une certaine probabilité." },
  { id: 'payoff', term: 'Paiement', definition: "Gain (ou perte) attribué à un joueur en fonction du profil d'actions choisi par tous." },
  { id: 'equilibre-nash', term: 'Équilibre de Nash', definition: "Profil de stratégies tel qu'aucun joueur n'a intérêt à dévier unilatéralement." },
  { id: 'forme-normale', term: 'Forme normale', definition: 'Représentation tabulaire (matrice) d\'un jeu : une dimension par joueur, des paiements dans chaque cellule.' },
  { id: 'forme-extensive', term: 'Forme extensive', definition: 'Représentation arborescente d\'un jeu : nœuds = décisions, branches = actions, feuilles = paiements.' },
  { id: 'induction-rebours', term: 'Induction à rebours', definition: 'Méthode de résolution des jeux séquentiels : on part des feuilles de l\'arbre et on remonte en choisissant l\'action optimale à chaque nœud.' },
  { id: 'tit-for-tat', term: 'Tit-for-tat', definition: 'Stratégie qui coopère au premier tour puis copie l\'action précédente de l\'adversaire.' },
  { id: 'cooperation', term: 'Coopération', definition: "Action qui privilégie l'intérêt collectif au détriment d'un gain individuel à court terme." },
  { id: 'trahison', term: 'Trahison', definition: "Action qui privilégie l'intérêt individuel à court terme au détriment du bien commun." },
  { id: 'somme-nulle', term: 'Jeu à somme nulle', definition: 'Jeu où la somme des gains de tous les joueurs vaut zéro à chaque issue : ce que l\'un gagne, l\'autre le perd.' },
  { id: 'externalite', term: 'Externalité', definition: "Effet d'une décision sur des tiers qui n'est pas reflété dans le paiement du décideur." },
];

export function findGlossaryEntry(id: string): GlossaryEntry | undefined {
  return glossary.find((e) => e.id === id);
}
