# Site de démonstration — Théorie des jeux

**Date :** 2026-05-10
**Statut :** Spec validée, en attente du plan d'implémentation
**Auteur :** Ludovic Lefebvre (collab. Claude)

## 1. Contexte et objectif

Mettre en place un site web de démonstration qui illustre les concepts fondamentaux
de la théorie des jeux. Le site sert à la fois de support pédagogique et de
vitrine personnelle. Le ton est rigoureux mais accessible : un visiteur curieux
doit pouvoir comprendre l'essentiel sans bagage mathématique, tandis qu'un
visiteur avancé peut déplier des sections plus formelles avec notation
mathématique.

### Public cible

Mixte progressif :
- En surface : vulgarisation, démos cliquables, peu de prérequis
- En profondeur : sections "voir plus" avec formalisation mathématique

### Concepts couverts (V1)

1. **Dilemme du prisonnier** — point d'entrée canonique
2. **Équilibre de Nash** — concept transversal illustré par plusieurs exemples
3. **Stratégies mixtes** — Pierre-feuille-ciseaux comme exemple jouable
4. **Dilemme du prisonnier itéré + tournoi d'Axelrod** — simulation de stratégies
5. **Jeux séquentiels** — arbre de décision, induction à rebours
6. **Tragédie des biens communs** — extension à N joueurs

## 2. Stack technique

| Choix | Décision | Raison |
|---|---|---|
| Framework | **React + Vite** | SPA, riche en démos interactives |
| Langage | **TypeScript** | Typage fort des structures de jeu |
| Styling | **CSS Modules + variables CSS** | Système de tokens cohérent pour la direction "tech sombre" |
| Routing | **react-router-dom v6** | Multi-pages SPA |
| Animations | **Framer Motion** | Transitions de page et micro-interactions |
| Maths | **KaTeX** (via `remark-math` + `rehype-katex`) | Formules dans le contenu markdown |
| Markdown | **react-markdown** | Contenu des concepts en .ts exportant des chaînes md |
| Tests | **Vitest + Testing Library** | Logique pure et composants critiques |

Pas de backend, pas de base de données, pas d'authentification. Site 100% statique.

## 3. Direction visuelle

**Tech sombre** : fond très sombre (`#0a0a0f`), accent cyan (`#22d3ee`), accents
secondaires violet/vert/rouge selon la sémantique. Sensation "lab" / outil
interactif. Mono pour les labels et formules, sans-serif pour le corps.

### Tokens (extrait — détail dans le code)

- **Surfaces** : `--bg-base`, `--bg-elevated`, `--bg-subtle`
- **Texte** : `--text-primary`, `--text-secondary`, `--text-muted`
- **Accents** : cyan (primaire/équilibre), violet (lien/secondaire), vert (coopération/gain), rouge (trahison/perte)
- **Espacement** : échelle de 4px (`--space-1` à `--space-16`)
- **Typographie** : Inter (sans), JetBrains Mono (mono), Computer Modern (KaTeX)

### Conventions

- Sections marquées par un label mono uppercase en cyan : `// DÉMO INTERACTIVE`
- Bordures fines 1px plutôt qu'ombres
- Animations 200-300ms, easing `[0.16, 1, 0.3, 1]`
- `prefers-reduced-motion` respecté via `useReducedMotion`
- Contraste AA minimum, focus visible cyan 2px

## 4. Architecture

### Structure du projet

```
GameTheory/
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes.tsx
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   └── globals.css
│   ├── components/
│   │   ├── Layout/
│   │   ├── ConceptCard/
│   │   ├── PayoffMatrix/
│   │   ├── KaTeXBlock/
│   │   ├── GlossaryTerm/
│   │   ├── HubMap/
│   │   └── ui/                     # Button, Tabs, Slider, ...
│   ├── pages/
│   │   ├── HomePage.tsx            # le hub cartographique
│   │   ├── concepts/
│   │   │   ├── PrisonersDilemma.tsx
│   │   │   ├── NashEquilibrium.tsx
│   │   │   ├── MixedStrategies.tsx
│   │   │   ├── IteratedPD.tsx
│   │   │   ├── SequentialGames.tsx
│   │   │   └── CommonsTragedy.tsx
│   │   ├── GlossaryPage.tsx
│   │   └── FurtherReadingPage.tsx
│   ├── games/                       # logique pure, sans React
│   │   ├── types.ts
│   │   ├── prisoners.ts
│   │   ├── nash.ts
│   │   ├── mixed.ts
│   │   ├── commons.ts
│   │   └── axelrod/
│   │       ├── strategies.ts
│   │       └── tournament.ts
│   ├── content/                     # textes par concept (TS)
│   │   ├── prisoners.ts
│   │   ├── nash.ts
│   │   ├── mixedStrategies.ts
│   │   ├── iteratedPD.ts
│   │   ├── sequential.ts
│   │   ├── commons.ts
│   │   ├── glossary.ts
│   │   └── references.ts
│   └── hooks/
│       ├── useReducedMotion.ts
│       └── useGameSimulation.ts
├── tests/
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### Principes structurants

- **Séparation logique / UI** : `src/games/` est du TypeScript pur, sans React,
  totalement testable. La logique des jeux ne dépend pas du DOM.
- **Contenu hors code** : `src/content/` sépare le texte des composants. On peut
  éditer le contenu sans toucher la structure.
- **Composants `ui/`** : primitives sans logique métier, garantes de la
  cohérence visuelle (Button, Tabs, Slider, etc.).
- **Une page par concept** : structure identique sur les 6 pages, seul le
  widget interactif central change.

### Flux haut niveau

1. `App.tsx` charge le thème (tokens.css), le router, et un `Layout` global.
2. La home rend `HubMap` : SVG cliquable animé Framer Motion qui montre les
   6 concepts et les liens entre eux.
3. Chaque page concept suit l'anatomie type (cf. §5).
4. Les simulateurs branchent l'UI à `src/games/` via `useGameSimulation`.

## 5. Anatomie d'une page concept

Six zones, identiques pour chaque concept :

1. **Header sticky** — breadcrumb (GameTheory / Concepts / [titre]), accès au glossaire et à "aller plus loin"
2. **Hero** — label mono `Concept N · Type`, titre, résumé en une phrase
3. **Démo interactive** au-dessus du pli — widget central qui rend le concept manipulable. Variable selon le concept :
   - **DP** : matrice de paiement 2×2 cliquable, l'utilisateur joue une fois contre un adversaire affichant sa propre stratégie
   - **Nash** : matrice de paiement avec mise en évidence visuelle des équilibres détectés ; l'utilisateur peut choisir parmi 3-4 jeux pré-définis (DP, Bataille des sexes, Chicken)
   - **Stratégies mixtes** : Pierre-feuille-ciseaux où l'utilisateur joue contre un bot dont on peut configurer la stratégie mixte via 3 sliders (probabilités) et observer le gain moyen sur N parties
   - **DP itéré** : simulateur de tournoi d'Axelrod — l'utilisateur sélectionne 2 à 6 stratégies parmi celles disponibles, fixe le nombre de tours, lance le tournoi en round-robin et voit le classement
   - **Jeux séquentiels** : arbre de décision du **jeu de l'entrant et du monopole** (entrant : entrer / ne pas entrer ; monopole : se battre / accommoder), résolution interactive par induction à rebours pas-à-pas
   - **Biens communs** : modèle simplifié de pâturage commun avec slider du nombre de bergers et de têtes de bétail par berger ; courbe de productivité collective qui s'effondre passé un seuil
4. **Texte explicatif** — paragraphes avec termes pointillés (tooltips glossaire)
5. **"Voir plus"** repliable (`<details>`) — formalisation KaTeX
6. **Concepts liés** + navigation suivant/précédent

## 6. Modèle de données

### Types de base (`src/games/types.ts`)

```typescript
export type Action = string;
export type PureStrategy = Action;
export type MixedStrategy = Record<Action, number>; // somme = 1
export type ActionProfile = Action[];
export type PayoffFunction = (profile: ActionProfile) => number[];

export interface NormalFormGame {
  id: string;
  name: string;
  players: number;
  actions: Action[][];
  payoff: PayoffFunction;
}

export interface IteratedStrategy {
  id: string;
  name: string;
  description: string;
  decide: (history: ActionProfile[], me: number) => Action;
}

export interface SimulationRound {
  profile: ActionProfile;
  payoffs: number[];
}
```

### Modules par concept

- `games/prisoners.ts` — exporte `prisonersDilemma: NormalFormGame`
- `games/nash.ts` — exporte `findPureNashEquilibria(game): ActionProfile[]`
- `games/mixed.ts` — calcul d'espérance de gain en stratégies mixtes
- `games/commons.ts` — modèle d'extraction à N joueurs
- `games/axelrod/strategies.ts` — `titForTat`, `alwaysCooperate`, `alwaysDefect`,
  `grudger`, `random`, `pavlov`
- `games/axelrod/tournament.ts` — `runTournament(strategies, rounds, payoff)`

### Hook de simulation

```typescript
export function useGameSimulation(game: NormalFormGame) {
  const [history, setHistory] = useState<SimulationRound[]>([]);
  const play = (profile: ActionProfile) => { ... };
  const reset = () => setHistory([]);
  return { history, play, reset };
}
```

### Format du contenu

```typescript
export interface ConceptContent {
  id: string;
  title: string;
  oneLineSummary: string;
  introMd: string;
  deepDiveMd: string;
  glossaryRefs: string[];
  related: string[];
  references: { author: string; title: string; url?: string }[];
}
```

Markdown rendu via `react-markdown` + `rehype-katex` pour `$...$`.

## 7. Hub cartographique

Page d'accueil. Un SVG montre les 6 concepts comme des nœuds, reliés selon leurs
parentés conceptuelles :

- DP → Nash (exemple type)
- DP → DP itéré (extension temporelle)
- DP → Tragédie des biens communs (généralisation à N joueurs)
- DP itéré → (contient) Tit-for-tat / Axelrod
- Stratégies mixtes → Nash (existence garantie)
- Jeux séquentiels → induction à rebours

Au clic sur un nœud : navigation vers la page concept avec transition
Framer Motion. Au survol : surbrillance des liens et concepts connectés.

## 8. Tests

Priorité absolue : `src/games/` (logique pure).

```
tests/
├── games/
│   ├── prisoners.test.ts
│   ├── nash.test.ts
│   ├── axelrod/
│   │   ├── strategies.test.ts
│   │   └── tournament.test.ts
│   └── commons.test.ts
└── components/
    ├── PayoffMatrix.test.tsx
    └── HubMap.test.tsx
```

Pas d'E2E pour le V1. Smoke test manuel desktop + mobile (DevTools) avant
déploiement.

## 9. Déploiement

- Build : `npm run build` → `dist/` statique
- Cible recommandée : **Netlify** ou **Vercel** (drag & drop, HTTPS, build auto sur push)
- Alternative gratuite : **GitHub Pages** (ajouter `base` dans `vite.config.ts`)
- Pas de backend, pas d'API, pas de stockage utilisateur

## 10. Dépendances (résumé `package.json`)

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "framer-motion": "^11",
    "katex": "^0.16",
    "react-markdown": "^9",
    "rehype-katex": "^7",
    "remark-math": "^6"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4",
    "typescript": "^5",
    "vitest": "^2",
    "@testing-library/react": "^16",
    "@testing-library/jest-dom": "^6",
    "jsdom": "^25"
  }
}
```

## 11. Scope V1

### Inclus

- Hub cartographique animé (SVG) avec liens entre concepts
- 6 pages concept (anatomie en 6 zones, contenu rédigé en français)
- Démo interactive sur chaque page (variable selon concept)
- Glossaire de 15-20 termes avec tooltips inline
- Page "Aller plus loin" (bibliographie sélective : Axelrod, von Neumann/Morgenstern, Nash, Hardin, Smith)
- Direction visuelle "tech sombre" cohérente sur tout le site
- Responsive desktop + mobile
- Tests unitaires sur la logique des jeux

### Hors scope V1

- Mode clair / toggle dark/light
- Export de résultats de simulation (CSV/PNG)
- Internationalisation (FR uniquement)
- Système de progression utilisateur (localStorage)
- Tests E2E (Playwright/Cypress)
- Analytics

### À décider pendant l'implémentation (non bloquant)

- Convention exacte des payoffs du DP (-1/-2/-3/0 vs 3/1/0/5)
- Position visuelle précise des nœuds dans la carte du hub
- Liste finale des termes du glossaire

## 12. Risques et mitigations

| Risque | Mitigation |
|---|---|
| KaTeX gonfle le bundle | Charger en lazy import sur la première occurrence |
| HubMap SVG difficile à rendre responsive | Fallback liste verticale en mobile (< 640px) |
| Simulateur Axelrod lourd à animer | Limiter à 200 tours par défaut, exécution synchrone hors UI |
| Contenu rédigé approximatif | Citer les sources dans `references.ts` ; relecture passes multiples |

## 13. Critères de succès

- Un visiteur sans bagage peut comprendre 4 concepts sur 6 sans dérouler "voir plus"
- Toutes les démos interactives répondent en < 100ms
- Page chargée en < 2s sur 3G simulé
- Score Lighthouse Performance ≥ 85 (mobile)
- Tous les tests unitaires de `games/` au vert
- Le tournoi d'Axelrod reproduit le résultat classique : tit-for-tat domine
