import type { PictogramId } from '../components/Sign';

/**
 * Le réseau des six concepts. C'est le contenu principal du site : une page
 * isolée est un échec, la correspondance est ce qu'on vient chercher.
 * Les numéros sont des numéros de porte — ils identifient une destination,
 * et l'ordre est celui dans lequel les concepts s'appuient les uns sur les autres.
 */
export const CONCEPT_ROUTES = [
  { id: 'prisoners', gate: '01', path: '/dilemme-prisonnier', title: 'Dilemme du prisonnier', icon: 'prisoners', lines: ['Dilemme du', 'prisonnier'] },
  { id: 'nash', gate: '02', path: '/equilibre-nash', title: 'Équilibre de Nash', icon: 'nash', lines: ['Équilibre', 'de Nash'] },
  { id: 'mixed', gate: '03', path: '/strategies-mixtes', title: 'Stratégies mixtes', icon: 'mixed', lines: ['Stratégies', 'mixtes'] },
  { id: 'iterated', gate: '04', path: '/dilemme-itere', title: 'Dilemme du prisonnier itéré', icon: 'iterated', lines: ['Dilemme du prisonnier', 'itéré'] },
  { id: 'sequential', gate: '05', path: '/jeux-sequentiels', title: 'Jeux séquentiels', icon: 'sequential', lines: ['Jeux', 'séquentiels'] },
  { id: 'commons', gate: '06', path: '/biens-communs', title: 'Tragédie des biens communs', icon: 'commons', lines: ['Tragédie des', 'biens communs'] },
] as const satisfies readonly {
  id: string;
  gate: string;
  path: string;
  title: string;
  icon: PictogramId;
  /** Le titre coupé pour tenir sur une plaque du plan. */
  lines: readonly [string, string];
}[];

export type ConceptId = (typeof CONCEPT_ROUTES)[number]['id'];
export type ConceptRoute = (typeof CONCEPT_ROUTES)[number];

/**
 * Le type de la correspondance, pas seulement son existence. Un panneau qui
 * dessine six traits identiques ne dit rien ; celui-ci dit de quelle nature
 * est le lien qu'on s'apprête à prendre.
 */
export type EdgeKind = 'exemple' | 'extension' | 'repetition' | 'echelle';

export const EDGE_KIND_LABEL: Record<EdgeKind, string> = {
  exemple: 'Exemple canonique',
  extension: 'Extension',
  repetition: 'Répétition',
  echelle: 'Passage à N joueurs',
};

export interface ConceptEdge {
  from: ConceptId;
  to: ConceptId;
  kind: EdgeKind;
}

export const CONCEPT_EDGES: ConceptEdge[] = [
  { from: 'prisoners', to: 'nash', kind: 'exemple' },
  { from: 'mixed', to: 'nash', kind: 'extension' },
  { from: 'sequential', to: 'nash', kind: 'extension' },
  { from: 'prisoners', to: 'iterated', kind: 'repetition' },
  { from: 'prisoners', to: 'commons', kind: 'echelle' },
  { from: 'iterated', to: 'commons', kind: 'echelle' },
];

export function conceptById(id: ConceptId): ConceptRoute {
  return CONCEPT_ROUTES.find((c) => c.id === id)!;
}

/** Les concepts atteignables depuis celui-ci, dans l'ordre des portes. */
export function connectionsOf(id: ConceptId): { route: ConceptRoute; kind: EdgeKind }[] {
  return CONCEPT_EDGES.filter((e) => e.from === id || e.to === id)
    .map((e) => ({ route: conceptById(e.from === id ? e.to : e.from), kind: e.kind }))
    .sort((a, b) => a.route.gate.localeCompare(b.route.gate));
}
