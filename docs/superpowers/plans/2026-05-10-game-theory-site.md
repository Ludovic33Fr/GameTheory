# GameTheory Demo Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static website demonstrating six game theory concepts (Prisoner's Dilemma, Nash Equilibrium, Mixed Strategies, Iterated PD/Axelrod tournament, Sequential games, Tragedy of the commons) with interactive demos, in React + Vite + TypeScript with a tech-dark visual identity and a hub-cartography homepage.

**Architecture:** SPA with React Router. Pure TypeScript game logic in `src/games/` (testable, no React). Per-concept pages share a common anatomy (header, hero, interactive demo, explanatory text with inline glossary, "voir plus" with KaTeX, related concepts, prev/next nav). Home page is an animated SVG showing the 6 concepts and their relationships. Content separated into `src/content/`. Styling via CSS Modules + CSS variables tokens.

**Tech Stack:** React 18, Vite 5, TypeScript 5, react-router-dom 6, Framer Motion 11, KaTeX, react-markdown + remark-math + rehype-katex, Vitest + Testing Library + jsdom.

**Reference spec:** `docs/superpowers/specs/2026-05-10-game-theory-site-design.md`

---

## Phase 1 — Foundation

### Task 1: Bootstrap Vite + React + TypeScript

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: Run Vite scaffold inside the existing directory**

Run: `npm create vite@latest . -- --template react-ts`

When prompted "Current directory is not empty… Ignore files and continue?", answer "Yes". Vite preserves existing files (like `docs/`, `.git/`, `.gitignore`).

- [ ] **Step 2: Install base dependencies**

Run: `npm install`

Expected: Vite scaffold deps installed (`node_modules/` populated).

- [ ] **Step 3: Replace default `App.tsx` with a minimal placeholder**

Replace `src/App.tsx` with:

```tsx
export default function App() {
  return <div>GameTheory site — bootstrap OK</div>;
}
```

Delete the auto-generated `src/App.css` and `src/index.css` (we will introduce our own styles later).

- [ ] **Step 4: Update `src/main.tsx`** to drop the deleted CSS import

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Verify dev server runs**

Run: `npm run dev`
Expected: Vite starts at `http://localhost:5173` and the page shows "GameTheory site — bootstrap OK".

Stop the server with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Vite + React + TypeScript"
```

---

### Task 2: Install runtime and dev dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

Run:
```bash
npm install react-router-dom@^6 framer-motion@^11 katex@^0.16 react-markdown@^9 remark-math@^6 rehype-katex@^7
```

- [ ] **Step 2: Install dev deps**

Run:
```bash
npm install -D vitest@^2 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14 jsdom@^25 @types/katex@^0.16
```

- [ ] **Step 3: Verify install succeeded**

Run: `npm ls react-router-dom framer-motion vitest`
Expected: each printed with a version, no UNMET DEPENDENCY warnings.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install runtime and dev dependencies"
```

---

### Task 3: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`
- Modify: `package.json` (test scripts), `tsconfig.json` (include tests)

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
  },
});
```

- [ ] **Step 2: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Add scripts to `package.json`**

In `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Update `tsconfig.json`** to include the tests folder

In `"include"` add `"tests"` (alongside `"src"`). Also add `"types": ["vitest/globals", "@testing-library/jest-dom"]` to `compilerOptions`.

- [ ] **Step 5: Add a smoke test**

Create `tests/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('arithmetic still works', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run it**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure Vitest with jsdom + Testing Library"
```

---

### Task 4: Define design tokens

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/reset.css`, `src/styles/globals.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  /* Surfaces */
  --bg-base: #0a0a0f;
  --bg-elevated: #0f0f15;
  --bg-subtle: #08080c;
  --border-subtle: #1f1f24;
  --border-default: #27272a;

  /* Text */
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;

  /* Accents */
  --accent-primary: #22d3ee;
  --accent-primary-soft: #22d3ee22;
  --accent-secondary: #c084fc;
  --accent-success: #86efac;
  --accent-danger: #fca5a5;
  --accent-warning: #fde68a;

  /* Spacing scale (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* Type scale */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 38px;

  /* Fonts */
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
}
```

- [ ] **Step 2: Create `src/styles/reset.css`** (minimal modern reset)

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html, body { height: 100%; }
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-sans);
  background: var(--bg-base);
  color: var(--text-primary);
}
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
button { cursor: pointer; background: none; border: 0; color: inherit; }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Create `src/styles/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

body {
  font-size: var(--text-base);
}

.label-mono {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-primary);
}
```

- [ ] **Step 4: Import them in `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Verify visually**

Run: `npm run dev`
Expected: page background is dark (`#0a0a0f`), text is near-white. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add design tokens and global styles"
```

---

### Task 5: Build the Layout shell

**Files:**
- Create: `src/components/Layout/Layout.tsx`, `src/components/Layout/Layout.module.css`, `src/components/Layout/Header.tsx`, `src/components/Layout/Header.module.css`, `src/components/Layout/Footer.tsx`, `src/components/Layout/Footer.module.css`, `src/components/Layout/index.ts`

- [ ] **Step 1: Create `src/components/Layout/Layout.module.css`**

```css
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-base);
}
.main {
  flex: 1;
  width: 100%;
}
```

- [ ] **Step 2: Create `src/components/Layout/Header.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-subtle);
  padding: var(--space-3) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-sm);
}
.brand {
  color: var(--accent-primary);
  font-weight: 700;
  letter-spacing: 0.05em;
}
.brand::before { content: '◉ '; }
.crumbs { display: flex; gap: var(--space-3); align-items: center; color: var(--text-secondary); }
.crumbSep { color: var(--text-muted); }
.crumbCurrent { color: var(--text-primary); }
.nav { display: flex; gap: var(--space-4); color: var(--text-secondary); }
.nav a:hover { color: var(--text-primary); }
@media (max-width: 640px) {
  .header { flex-direction: column; gap: var(--space-2); padding: var(--space-3); }
}
```

- [ ] **Step 3: Create `src/components/Layout/Header.tsx`**

```tsx
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface Crumb { label: string; to?: string; }

interface HeaderProps {
  crumbs?: Crumb[];
}

export function Header({ crumbs = [] }: HeaderProps) {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.crumbs}>
        <Link to="/" className={styles.brand}>GameTheory</Link>
        {crumbs.map((c, i) => (
          <span key={i} className={styles.crumbs}>
            <span className={styles.crumbSep}>/</span>
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span className={styles.crumbCurrent}>{c.label}</span>}
          </span>
        ))}
      </div>
      <nav className={styles.nav} aria-label="Navigation principale">
        <Link to="/glossaire" aria-current={location.pathname === '/glossaire' ? 'page' : undefined}>Glossaire</Link>
        <Link to="/aller-plus-loin" aria-current={location.pathname === '/aller-plus-loin' ? 'page' : undefined}>Aller plus loin</Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/components/Layout/Footer.module.css`**

```css
.footer {
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-6);
  text-align: center;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
```

- [ ] **Step 5: Create `src/components/Layout/Footer.tsx`**

```tsx
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Démonstrations de théorie des jeux · {new Date().getFullYear()}</p>
    </footer>
  );
}
```

- [ ] **Step 6: Create `src/components/Layout/Layout.tsx`**

```tsx
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

interface Crumb { label: string; to?: string; }

interface LayoutProps {
  children: ReactNode;
  crumbs?: Crumb[];
}

export function Layout({ children, crumbs }: LayoutProps) {
  return (
    <div className={styles.shell}>
      <Header crumbs={crumbs} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 7: Create `src/components/Layout/index.ts`**

```ts
export { Layout } from './Layout';
export { Header } from './Header';
export { Footer } from './Footer';
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Layout shell with sticky header and footer"
```

---

### Task 6: Wire React Router with placeholder pages

**Files:**
- Create: `src/routes.tsx`, `src/pages/HomePage.tsx`, `src/pages/GlossaryPage.tsx`, `src/pages/FurtherReadingPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/pages/concepts/{PrisonersDilemma,NashEquilibrium,MixedStrategies,IteratedPD,SequentialGames,CommonsTragedy}.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create placeholder concept pages**

For EACH of the 6 concept files (`src/pages/concepts/PrisonersDilemma.tsx`, `NashEquilibrium.tsx`, `MixedStrategies.tsx`, `IteratedPD.tsx`, `SequentialGames.tsx`, `CommonsTragedy.tsx`), use this template (replace `<NAME>`):

```tsx
import { Layout } from '../../components/Layout';

export default function <NAME>Page() {
  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: '<NAME>' }]}>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Placeholder — &lt;NAME&gt;</h1>
      </div>
    </Layout>
  );
}
```

Use the human-readable French name in the crumb (e.g. "Dilemme du prisonnier").

- [ ] **Step 2: Create `src/pages/HomePage.tsx`**

```tsx
import { Layout } from '../components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Théorie des jeux — démonstrations</h1>
        <p>Hub à venir.</p>
      </div>
    </Layout>
  );
}
```

- [ ] **Step 3: Create `src/pages/GlossaryPage.tsx` and `FurtherReadingPage.tsx`** with similar placeholder bodies (titles "Glossaire" and "Aller plus loin").

- [ ] **Step 4: Create `src/pages/NotFoundPage.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div style={{ padding: 'var(--space-12) var(--space-16)', textAlign: 'center' }}>
        <h1>404</h1>
        <p>Cette page n'existe pas.</p>
        <Link to="/" style={{ color: 'var(--accent-primary)' }}>Retour à l'accueil</Link>
      </div>
    </Layout>
  );
}
```

- [ ] **Step 5: Create `src/routes.tsx`**

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GlossaryPage from './pages/GlossaryPage';
import FurtherReadingPage from './pages/FurtherReadingPage';
import NotFoundPage from './pages/NotFoundPage';
import PrisonersDilemmaPage from './pages/concepts/PrisonersDilemma';
import NashEquilibriumPage from './pages/concepts/NashEquilibrium';
import MixedStrategiesPage from './pages/concepts/MixedStrategies';
import IteratedPDPage from './pages/concepts/IteratedPD';
import SequentialGamesPage from './pages/concepts/SequentialGames';
import CommonsTragedyPage from './pages/concepts/CommonsTragedy';

export const CONCEPT_ROUTES = [
  { id: 'prisoners',   path: '/dilemme-prisonnier',     title: 'Dilemme du prisonnier' },
  { id: 'nash',        path: '/equilibre-nash',         title: 'Équilibre de Nash' },
  { id: 'mixed',       path: '/strategies-mixtes',      title: 'Stratégies mixtes' },
  { id: 'iterated',    path: '/dilemme-itere',          title: 'Dilemme du prisonnier itéré' },
  { id: 'sequential',  path: '/jeux-sequentiels',       title: 'Jeux séquentiels' },
  { id: 'commons',     path: '/biens-communs',          title: 'Tragédie des biens communs' },
] as const;

export type ConceptId = typeof CONCEPT_ROUTES[number]['id'];

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/glossaire', element: <GlossaryPage /> },
  { path: '/aller-plus-loin', element: <FurtherReadingPage /> },
  { path: '/dilemme-prisonnier', element: <PrisonersDilemmaPage /> },
  { path: '/equilibre-nash', element: <NashEquilibriumPage /> },
  { path: '/strategies-mixtes', element: <MixedStrategiesPage /> },
  { path: '/dilemme-itere', element: <IteratedPDPage /> },
  { path: '/jeux-sequentiels', element: <SequentialGamesPage /> },
  { path: '/biens-communs', element: <CommonsTragedyPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 6: Replace `src/App.tsx`**

```tsx
import { AppRouter } from './routes';

export default function App() {
  return <AppRouter />;
}
```

- [ ] **Step 7: Run dev server, click through all routes**

Run: `npm run dev`
Expected: every URL loads its placeholder page; navigation links in the header work; `/foo-inexistant` shows the 404 page. Stop server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: wire React Router with placeholder pages for all concepts"
```

---

## Phase 2 — Shared primitives

### Task 7: Define core game-theory types

**Files:**
- Create: `src/games/types.ts`, `src/games/types.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/games/types.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import type { NormalFormGame, PayoffFunction } from './types';

describe('NormalFormGame', () => {
  it('payoff function returns one number per player', () => {
    const payoff: PayoffFunction = ([a, b]) =>
      a === 'C' && b === 'C' ? [3, 3] : [0, 0];
    const game: NormalFormGame = {
      id: 'demo',
      name: 'Demo',
      players: 2,
      actions: [['C', 'D'], ['C', 'D']],
      payoff,
    };
    expect(game.payoff(['C', 'C'])).toEqual([3, 3]);
    expect(game.payoff(['D', 'C'])).toEqual([0, 0]);
    expect(game.payoff(['C', 'C']).length).toBe(game.players);
  });
});
```

- [ ] **Step 2: Run the test (will fail to compile — module missing)**

Run: `npm test`
Expected: failure mentioning `Cannot find module './types'`.

- [ ] **Step 3: Create `src/games/types.ts`**

```ts
export type Action = string;

export type PureStrategy = Action;

export type MixedStrategy = Record<Action, number>;

export type ActionProfile = Action[];

export type PayoffFunction = (profile: ActionProfile) => number[];

export interface NormalFormGame {
  id: string;
  name: string;
  players: number;
  /** Available actions per player, indexed by player number (0..players-1) */
  actions: Action[][];
  payoff: PayoffFunction;
}

export interface IteratedStrategy {
  id: string;
  name: string;
  description: string;
  /**
   * Decide an action given the full history (one ActionProfile per round) and
   * the player's index in the profile.
   */
  decide: (history: ActionProfile[], me: number) => Action;
}

export interface SimulationRound {
  profile: ActionProfile;
  payoffs: number[];
}
```

- [ ] **Step 4: Run the test**

Run: `npm test`
Expected: `types.test.ts` passes.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(games): define core game-theory types"
```

---

### Task 8: Glossary store and inline term component

**Files:**
- Create: `src/content/glossary.ts`, `src/components/GlossaryTerm/GlossaryTerm.tsx`, `src/components/GlossaryTerm/GlossaryTerm.module.css`, `src/components/GlossaryTerm/GlossaryTerm.test.tsx`, `src/components/GlossaryTerm/index.ts`

- [ ] **Step 1: Create `src/content/glossary.ts`** (initial seed of terms — more added later)

```ts
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
```

- [ ] **Step 2: Create `src/components/GlossaryTerm/GlossaryTerm.module.css`**

```css
.term {
  border-bottom: 1px dotted var(--accent-primary);
  cursor: help;
  color: var(--text-primary);
  position: relative;
}
.tooltip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  width: max-content;
  max-width: 280px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 10;
  pointer-events: none;
}
.tooltip strong { color: var(--text-primary); display: block; margin-bottom: 4px; }
```

- [ ] **Step 3: Write the failing test**

Create `src/components/GlossaryTerm/GlossaryTerm.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlossaryTerm } from './GlossaryTerm';

describe('GlossaryTerm', () => {
  it('renders the inline label', () => {
    render(<GlossaryTerm id="strategie">stratégie</GlossaryTerm>);
    expect(screen.getByText('stratégie')).toBeInTheDocument();
  });

  it('shows the definition on hover', async () => {
    const user = userEvent.setup();
    render(<GlossaryTerm id="strategie-dominante">dominante</GlossaryTerm>);
    expect(screen.queryByRole('tooltip')).toBeNull();
    await user.hover(screen.getByText('dominante'));
    expect(screen.getByRole('tooltip')).toHaveTextContent(/au moins autant/);
  });

  it('renders even when id is unknown', () => {
    render(<GlossaryTerm id="unknown-id">x</GlossaryTerm>);
    expect(screen.getByText('x')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the test**

Run: `npm test -- GlossaryTerm`
Expected: failures (component does not exist).

- [ ] **Step 5: Implement the component**

Create `src/components/GlossaryTerm/GlossaryTerm.tsx`:
```tsx
import { ReactNode, useState, useId } from 'react';
import { findGlossaryEntry } from '../../content/glossary';
import styles from './GlossaryTerm.module.css';

interface GlossaryTermProps {
  id: string;
  children: ReactNode;
}

export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const entry = findGlossaryEntry(id);

  return (
    <span
      className={styles.term}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={open && entry ? tipId : undefined}
    >
      {children}
      {open && entry && (
        <span role="tooltip" id={tipId} className={styles.tooltip}>
          <strong>{entry.term}</strong>
          {entry.definition}
        </span>
      )}
    </span>
  );
}
```

- [ ] **Step 6: Create `src/components/GlossaryTerm/index.ts`**

```ts
export { GlossaryTerm } from './GlossaryTerm';
```

- [ ] **Step 7: Run the test**

Run: `npm test -- GlossaryTerm`
Expected: 3 passed.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(glossary): seed glossary store and add inline GlossaryTerm component"
```

---

### Task 9: KaTeX block component

**Files:**
- Create: `src/components/KaTeXBlock/KaTeXBlock.tsx`, `src/components/KaTeXBlock/KaTeXBlock.module.css`, `src/components/KaTeXBlock/KaTeXBlock.test.tsx`, `src/components/KaTeXBlock/index.ts`
- Modify: `src/main.tsx` (import KaTeX CSS)

- [ ] **Step 1: Add KaTeX CSS import in `src/main.tsx`** (just after the other style imports)

```tsx
import 'katex/dist/katex.min.css';
```

- [ ] **Step 2: Create `src/components/KaTeXBlock/KaTeXBlock.module.css`**

```css
.block { display: block; padding: var(--space-3) 0; overflow-x: auto; }
.inline { display: inline-block; }
```

- [ ] **Step 3: Write the failing test**

Create `src/components/KaTeXBlock/KaTeXBlock.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KaTeXBlock } from './KaTeXBlock';

describe('KaTeXBlock', () => {
  it('renders TeX into a katex span', () => {
    const { container } = render(<KaTeXBlock tex="a^2 + b^2 = c^2" />);
    expect(container.querySelector('.katex')).not.toBeNull();
  });

  it('renders inline mode without a display wrapper', () => {
    const { container } = render(<KaTeXBlock tex="x_i" inline />);
    expect(container.querySelector('.katex-display')).toBeNull();
  });
});
```

- [ ] **Step 4: Run the test (fails — component missing)**

Run: `npm test -- KaTeXBlock`

- [ ] **Step 5: Create the component**

Create `src/components/KaTeXBlock/KaTeXBlock.tsx`:
```tsx
import { useEffect, useRef } from 'react';
import katex from 'katex';
import styles from './KaTeXBlock.module.css';

interface KaTeXBlockProps {
  tex: string;
  inline?: boolean;
}

export function KaTeXBlock({ tex, inline = false }: KaTeXBlockProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: !inline,
        throwOnError: false,
        output: 'html',
      });
    }
  }, [tex, inline]);

  return <span ref={ref} className={inline ? styles.inline : styles.block} aria-label={tex} />;
}
```

- [ ] **Step 6: Create `index.ts`**

```ts
export { KaTeXBlock } from './KaTeXBlock';
```

- [ ] **Step 7: Run the test**

Run: `npm test -- KaTeXBlock`
Expected: 2 passed.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(ui): add KaTeXBlock component for math rendering"
```

---

### Task 10: PayoffMatrix component

**Files:**
- Create: `src/components/PayoffMatrix/PayoffMatrix.tsx`, `src/components/PayoffMatrix/PayoffMatrix.module.css`, `src/components/PayoffMatrix/PayoffMatrix.test.tsx`, `src/components/PayoffMatrix/index.ts`

- [ ] **Step 1: Create `src/components/PayoffMatrix/PayoffMatrix.module.css`**

```css
.wrap {
  display: inline-block;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
.grid {
  display: grid;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
}
.label {
  color: var(--text-muted);
  text-align: center;
  padding: var(--space-2);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.rowLabel { align-self: center; padding: var(--space-2); }
.cell {
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
  text-align: center;
  color: var(--text-secondary);
  cursor: default;
  transition: border-color var(--duration-fast) var(--ease-out-expo);
}
.cell.clickable { cursor: pointer; }
.cell.clickable:hover { border-color: var(--accent-primary); color: var(--text-primary); }
.cell.highlightCoop { background: rgba(34, 197, 94, 0.10); border-color: rgba(34, 197, 94, 0.3); color: var(--accent-success); }
.cell.highlightDefect { background: rgba(239, 68, 68, 0.10); border-color: rgba(239, 68, 68, 0.3); color: var(--accent-danger); }
.cell.equilibrium {
  background: var(--accent-primary-soft);
  border: 2px solid var(--accent-primary);
  color: var(--accent-primary);
  font-weight: 700;
}
.legend { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-3); }
```

- [ ] **Step 2: Write failing tests**

Create `src/components/PayoffMatrix/PayoffMatrix.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PayoffMatrix } from './PayoffMatrix';
import { prisonersDilemma } from '../../games/prisoners';

describe('PayoffMatrix', () => {
  it('renders a payoff cell for each combination of actions', () => {
    render(<PayoffMatrix game={prisonersDilemma} />);
    // 2 actions per player → 4 cells with payoff text
    expect(screen.getAllByText(/-?\d+, -?\d+/).length).toBe(4);
  });

  it('highlights cells passed via equilibria', () => {
    const { container } = render(
      <PayoffMatrix game={prisonersDilemma} equilibria={[['D', 'D']]} />
    );
    expect(container.querySelectorAll('[data-equilibrium="true"]').length).toBe(1);
  });

  it('calls onCellClick when interactive', async () => {
    const onCellClick = vi.fn();
    const user = userEvent.setup();
    render(<PayoffMatrix game={prisonersDilemma} onCellClick={onCellClick} />);
    await user.click(screen.getAllByText(/-?\d+, -?\d+/)[0]);
    expect(onCellClick).toHaveBeenCalledWith(['C', 'C']);
  });
});
```

These tests reference `prisonersDilemma` which we will create in Task 12. To unblock TDD now, create a minimal stub:

Create `src/games/prisoners.ts` (will be expanded in Task 12):
```ts
import type { NormalFormGame } from './types';

export const prisonersDilemma: NormalFormGame = {
  id: 'prisoners',
  name: 'Dilemme du prisonnier',
  players: 2,
  actions: [['C', 'D'], ['C', 'D']],
  payoff: ([a, b]) => {
    if (a === 'C' && b === 'C') return [-1, -1];
    if (a === 'C' && b === 'D') return [-3, 0];
    if (a === 'D' && b === 'C') return [0, -3];
    return [-2, -2];
  },
};
```

- [ ] **Step 3: Run test (fails — PayoffMatrix not implemented)**

Run: `npm test -- PayoffMatrix`

- [ ] **Step 4: Implement the component**

Create `src/components/PayoffMatrix/PayoffMatrix.tsx`:
```tsx
import { CSSProperties } from 'react';
import type { NormalFormGame, ActionProfile, Action } from '../../games/types';
import styles from './PayoffMatrix.module.css';

interface PayoffMatrixProps {
  game: NormalFormGame;
  /** Action profiles to mark as equilibria (visual highlight). */
  equilibria?: ActionProfile[];
  /** When provided, cells become clickable. Receives the profile of the clicked cell. */
  onCellClick?: (profile: ActionProfile) => void;
  /** Optional human labels for actions, indexed [player][actionIndex]. */
  actionLabels?: string[][];
}

function isEquilibrium(profile: ActionProfile, equilibria?: ActionProfile[]): boolean {
  if (!equilibria) return false;
  return equilibria.some((eq) => eq.length === profile.length && eq.every((a, i) => a === profile[i]));
}

export function PayoffMatrix({ game, equilibria, onCellClick, actionLabels }: PayoffMatrixProps) {
  if (game.players !== 2) {
    return <div>Matrices &gt; 2 joueurs non supportées dans ce composant.</div>;
  }
  const [rowActions, colActions] = game.actions;
  const rowLabels = actionLabels?.[0] ?? rowActions;
  const colLabels = actionLabels?.[1] ?? colActions;

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `auto repeat(${colActions.length}, minmax(80px, 1fr))`,
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} style={gridStyle}>
        <div />
        {colActions.map((_, j) => (
          <div key={`h-${j}`} className={styles.label}>{colLabels[j]}</div>
        ))}
        {rowActions.map((rowAction, i) => (
          <>
            <div key={`r-${i}`} className={styles.rowLabel}>{rowLabels[i]}</div>
            {colActions.map((colAction, j) => {
              const profile: ActionProfile = [rowAction, colAction];
              const payoffs = game.payoff(profile);
              const eq = isEquilibrium(profile, equilibria);
              const className = [
                styles.cell,
                onCellClick ? styles.clickable : '',
                eq ? styles.equilibrium : '',
              ].filter(Boolean).join(' ');
              return (
                <div
                  key={`c-${i}-${j}`}
                  className={className}
                  data-equilibrium={eq ? 'true' : undefined}
                  onClick={onCellClick ? () => onCellClick(profile) : undefined}
                  role={onCellClick ? 'button' : undefined}
                  tabIndex={onCellClick ? 0 : undefined}
                  aria-label={`Profil ${rowLabels[i]}, ${colLabels[j]} : ${payoffs.join(', ')}`}
                >
                  {payoffs.join(', ')}
                </div>
              );
            })}
          </>
        ))}
      </div>
      {equilibria && equilibria.length > 0 && (
        <div className={styles.legend}>★ Équilibre de Nash en stratégies pures</div>
      )}
    </div>
  );
}
```

Note: the use of unkeyed `<>` fragments inside a parent grid is intentional — they collapse so the grid receives the inner items directly. This works in React 18.

- [ ] **Step 5: Create `index.ts`**

```ts
export { PayoffMatrix } from './PayoffMatrix';
```

- [ ] **Step 6: Run the tests**

Run: `npm test -- PayoffMatrix`
Expected: 3 passed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(ui): add PayoffMatrix component with optional equilibrium highlight"
```

---

### Task 11: ConceptPage shared layout (anatomy template)

**Files:**
- Create: `src/components/ConceptPage/ConceptPage.tsx`, `src/components/ConceptPage/ConceptPage.module.css`, `src/components/ConceptPage/ConceptPrevNext.tsx`, `src/components/ConceptPage/index.ts`

- [ ] **Step 1: Create `src/components/ConceptPage/ConceptPage.module.css`**

```css
.hero {
  padding: var(--space-12) var(--space-16) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}
.hero .label { display: block; margin-bottom: var(--space-2); }
.hero h1 {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0 0 var(--space-3);
}
.hero .summary {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 640px;
  line-height: 1.55;
}
.demo {
  padding: var(--space-8) var(--space-16);
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.section {
  padding: var(--space-8) var(--space-16);
  border-bottom: 1px solid var(--border-subtle);
  max-width: 820px;
}
.section h2 { font-size: var(--text-xl); color: var(--text-primary); margin: 0 0 var(--space-3); }
.section p { color: var(--text-secondary); line-height: 1.7; font-size: var(--text-base); }
.deepDive {
  padding: var(--space-6) var(--space-16);
  border-bottom: 1px solid var(--border-subtle);
}
.deepDive details {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
}
.deepDive summary {
  cursor: pointer;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 600;
  list-style: none;
}
.deepDive summary::before { content: '▸ '; }
.deepDive details[open] summary::before { content: '▾ '; }
.deepDive .body { margin-top: var(--space-3); color: var(--text-primary); font-size: var(--text-sm); line-height: 1.7; }
.related { padding: var(--space-6) var(--space-16); border-bottom: 1px solid var(--border-subtle); }
.related .chips { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-3); }
.related .chip {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-primary);
  transition: border-color var(--duration-fast);
}
.related .chip:hover { border-color: var(--accent-primary); }
.related .chip::before { content: '→ '; color: var(--accent-primary); }
.prevNext {
  padding: var(--space-6) var(--space-16);
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
.prevNext a { color: var(--text-secondary); }
.prevNext a:hover { color: var(--accent-primary); }
@media (max-width: 768px) {
  .hero, .demo, .section, .deepDive, .related, .prevNext { padding-left: var(--space-6); padding-right: var(--space-6); }
  .hero h1 { font-size: var(--text-2xl); }
}
```

- [ ] **Step 2: Create `src/components/ConceptPage/ConceptPrevNext.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import styles from './ConceptPage.module.css';

interface Props { current: ConceptId; }

export function ConceptPrevNext({ current }: Props) {
  const idx = CONCEPT_ROUTES.findIndex((c) => c.id === current);
  const prev = idx > 0 ? CONCEPT_ROUTES[idx - 1] : null;
  const next = idx < CONCEPT_ROUTES.length - 1 ? CONCEPT_ROUTES[idx + 1] : null;
  return (
    <div className={styles.prevNext}>
      {prev ? <Link to={prev.path}>← {prev.title}</Link> : <Link to="/">← Retour au hub</Link>}
      {next ? <Link to={next.path}>{next.title} →</Link> : <span />}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/ConceptPage/ConceptPage.tsx`**

```tsx
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../Layout';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import { ConceptPrevNext } from './ConceptPrevNext';
import styles from './ConceptPage.module.css';

interface ConceptPageProps {
  conceptId: ConceptId;
  conceptNumber: number;          // 01..06
  category: string;               // ex: "Jeu simultané"
  summary: string;
  demo: ReactNode;                // composant interactif
  body: ReactNode;                // texte explicatif
  deepDive?: ReactNode;           // contenu repliable avec maths
  relatedIds?: ConceptId[];
}

export function ConceptPage({
  conceptId,
  conceptNumber,
  category,
  summary,
  demo,
  body,
  deepDive,
  relatedIds = [],
}: ConceptPageProps) {
  const concept = CONCEPT_ROUTES.find((c) => c.id === conceptId)!;
  const related = relatedIds
    .map((id) => CONCEPT_ROUTES.find((c) => c.id === id))
    .filter((c): c is typeof CONCEPT_ROUTES[number] => Boolean(c));

  const padNum = String(conceptNumber).padStart(2, '0');

  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: concept.title }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <section className={styles.hero}>
          <span className="label-mono">Concept {padNum} · {category}</span>
          <h1>{concept.title}</h1>
          <p className={styles.summary}>{summary}</p>
        </section>

        <section className={styles.demo} aria-label="Démonstration interactive">
          <span className="label-mono">// Démo interactive</span>
          <div style={{ marginTop: 'var(--space-4)' }}>{demo}</div>
        </section>

        <section className={styles.section}>{body}</section>

        {deepDive && (
          <section className={styles.deepDive}>
            <details>
              <summary>Voir la formalisation mathématique</summary>
              <div className={styles.body}>{deepDive}</div>
            </details>
          </section>
        )}

        {related.length > 0 && (
          <section className={styles.related}>
            <span className="label-mono">// Concepts liés</span>
            <div className={styles.chips}>
              {related.map((r) => (
                <Link key={r.id} to={r.path} className={styles.chip}>{r.title}</Link>
              ))}
            </div>
          </section>
        )}

        <ConceptPrevNext current={conceptId} />
      </motion.div>
    </Layout>
  );
}
```

- [ ] **Step 4: Create `index.ts`**

```ts
export { ConceptPage } from './ConceptPage';
```

- [ ] **Step 5: Build to verify it compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(ui): add ConceptPage shared anatomy template"
```

---

## Phase 3 — First vertical slice: Prisoner's Dilemma

### Task 12: Prisoner's Dilemma logic and tests

**Files:**
- Modify: `src/games/prisoners.ts` (already stubbed in Task 10)
- Create: `src/games/prisoners.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/games/prisoners.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { prisonersDilemma } from './prisoners';

describe('prisonersDilemma', () => {
  it('has two players with two actions each', () => {
    expect(prisonersDilemma.players).toBe(2);
    expect(prisonersDilemma.actions).toEqual([['C', 'D'], ['C', 'D']]);
  });

  it('rewards mutual cooperation moderately', () => {
    expect(prisonersDilemma.payoff(['C', 'C'])).toEqual([-1, -1]);
  });

  it('punishes the cooperator when the other defects', () => {
    expect(prisonersDilemma.payoff(['C', 'D'])).toEqual([-3, 0]);
    expect(prisonersDilemma.payoff(['D', 'C'])).toEqual([0, -3]);
  });

  it('punishes mutual defection but less than being the sole cooperator', () => {
    expect(prisonersDilemma.payoff(['D', 'D'])).toEqual([-2, -2]);
  });

  it('defection strictly dominates: defector beats cooperator in every column', () => {
    expect(prisonersDilemma.payoff(['D', 'C'])[0]).toBeGreaterThan(prisonersDilemma.payoff(['C', 'C'])[0]);
    expect(prisonersDilemma.payoff(['D', 'D'])[0]).toBeGreaterThan(prisonersDilemma.payoff(['C', 'D'])[0]);
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- prisoners`
Expected: passes (the stub from Task 10 already has the right values).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(games): cover prisoner's dilemma payoff structure"
```

---

### Task 13: Prisoner's Dilemma content + page wiring

**Files:**
- Create: `src/content/prisoners.tsx`
- Modify: `src/pages/concepts/PrisonersDilemma.tsx`

- [ ] **Step 1: Create `src/content/prisoners.tsx`** (note: `.tsx` because the body uses JSX)

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const prisonersContent = {
  category: 'Jeu simultané',
  summary: 'Deux suspects, deux choix. Quand la rationalité individuelle conduit-elle à un résultat collectivement sous-optimal ?',

  body: (
    <>
      <h2>Pourquoi ce résultat ?</h2>
      <p>
        Pour chaque <GlossaryTerm id="joueur">joueur</GlossaryTerm>, <GlossaryTerm id="trahison">trahir</GlossaryTerm> est
        une <GlossaryTerm id="strategie-dominante">stratégie dominante</GlossaryTerm> : peu importe ce que fait l'autre,
        on s'en tire mieux en trahissant. C'est ce qui rend ce jeu fascinant — la rationalité individuelle produit un
        résultat sous-optimal pour tout le monde.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Le profil (Trahir, Trahir) est l'unique <GlossaryTerm id="equilibre-nash">équilibre de Nash</GlossaryTerm> en
        stratégies pures de ce jeu. Pourtant, (Coopérer, Coopérer) donnerait à chacun un meilleur résultat. Cet écart
        entre rationalité individuelle et optimum collectif est au cœur de nombreux problèmes économiques et sociaux.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>
        Soit <KaTeXBlock tex="u_i(s)" inline /> le paiement du joueur <KaTeXBlock tex="i" inline /> pour le profil
        de stratégies <KaTeXBlock tex="s" inline />. Une stratégie <KaTeXBlock tex="s_i^*" inline /> est strictement
        dominante si :
      </p>
      <KaTeXBlock tex="u_i(s_i^*, s_{-i}) > u_i(s_i, s_{-i}) \quad \forall s_i \neq s_i^*, \, \forall s_{-i}" />
      <p>
        Dans le dilemme du prisonnier, on a <KaTeXBlock tex="u_i(D, s_{-i}) > u_i(C, s_{-i})" inline /> pour
        toute action <KaTeXBlock tex="s_{-i}" inline /> de l'autre joueur. Trahir domine strictement Coopérer.
      </p>
    </>
  ),

  references: [
    { author: 'Albert W. Tucker', title: 'A Two-Person Dilemma (1950, conférence à Stanford)' },
    { author: 'Robert Axelrod', title: 'The Evolution of Cooperation', url: 'https://www.basicbooks.com/titles/robert-axelrod/the-evolution-of-cooperation/9780465005642/' },
  ],
};
```

- [ ] **Step 2: Replace `src/pages/concepts/PrisonersDilemma.tsx`**

```tsx
import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { prisonersDilemma } from '../../games/prisoners';
import { prisonersContent } from '../../content/prisoners';
import type { ActionProfile } from '../../games/types';

const LABELS = [['Coopérer', 'Trahir'], ['Coopérer', 'Trahir']];

function Demo() {
  const [played, setPlayed] = useState<ActionProfile | null>(null);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <PayoffMatrix
        game={prisonersDilemma}
        equilibria={[['D', 'D']]}
        actionLabels={LABELS}
        onCellClick={setPlayed}
      />
      <div
        style={{
          flex: 1,
          minWidth: 240,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.6,
        }}
      >
        {played === null
          ? 'Clique une cellule de la matrice pour explorer un profil. Les deux joueurs choisissent simultanément.'
          : (() => {
              const [a, b] = played;
              const [pa, pb] = prisonersDilemma.payoff(played);
              const labelA = a === 'C' ? 'Coopérer' : 'Trahir';
              const labelB = b === 'C' ? 'Coopérer' : 'Trahir';
              const isEq = a === 'D' && b === 'D';
              return (
                <>
                  <strong style={{ color: 'var(--text-primary)' }}>Profil : {labelA} / {labelB}</strong>
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    Paiements : Joueur A = {pa}, Joueur B = {pb}.
                  </div>
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    {isEq
                      ? "C'est l'équilibre de Nash : aucun joueur n'a intérêt à dévier seul."
                      : 'Au moins un joueur regretterait son choix face à celui de l\'autre.'}
                  </div>
                </>
              );
            })()}
      </div>
    </div>
  );
}

export default function PrisonersDilemmaPage() {
  return (
    <ConceptPage
      conceptId="prisoners"
      conceptNumber={1}
      category={prisonersContent.category}
      summary={prisonersContent.summary}
      demo={<Demo />}
      body={prisonersContent.body}
      deepDive={prisonersContent.deepDive}
      relatedIds={['nash', 'iterated', 'commons']}
    />
  );
}
```

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`
Open `http://localhost:5173/dilemme-prisonnier`. Verify:
- The page renders with hero, matrix, side panel, body, "voir plus", related, prev/next.
- Clicking matrix cells updates the side panel.
- "(D, D)" cell is highlighted as equilibrium.
- Hovering "trahir" / "stratégie dominante" / "joueur" shows tooltips.
- Expanding "voir la formalisation" displays the KaTeX formula.

Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(concepts): wire Prisoner's Dilemma page with interactive matrix"
```

---

## Phase 4 — Remaining concepts

### Task 14: Nash equilibrium logic

**Files:**
- Create: `src/games/nash.ts`, `src/games/nash.test.ts`
- Create: `src/games/examples.ts` (extra games used by Nash demo)

- [ ] **Step 1: Create `src/games/examples.ts`**

```ts
import type { NormalFormGame } from './types';

export const battleOfTheSexes: NormalFormGame = {
  id: 'battle-sexes',
  name: 'Bataille des sexes',
  players: 2,
  actions: [['Opera', 'Foot'], ['Opera', 'Foot']],
  payoff: ([a, b]) => {
    if (a === 'Opera' && b === 'Opera') return [3, 2];
    if (a === 'Foot' && b === 'Foot') return [2, 3];
    return [0, 0];
  },
};

export const chicken: NormalFormGame = {
  id: 'chicken',
  name: 'Chicken',
  players: 2,
  actions: [['Swerve', 'Straight'], ['Swerve', 'Straight']],
  payoff: ([a, b]) => {
    if (a === 'Swerve' && b === 'Swerve') return [0, 0];
    if (a === 'Swerve' && b === 'Straight') return [-1, 1];
    if (a === 'Straight' && b === 'Swerve') return [1, -1];
    return [-10, -10];
  },
};
```

- [ ] **Step 2: Write failing tests for Nash detection**

Create `src/games/nash.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { findPureNashEquilibria } from './nash';
import { prisonersDilemma } from './prisoners';
import { battleOfTheSexes, chicken } from './examples';

describe('findPureNashEquilibria', () => {
  it('finds the unique equilibrium of Prisoner\'s Dilemma', () => {
    const eq = findPureNashEquilibria(prisonersDilemma);
    expect(eq).toEqual([['D', 'D']]);
  });

  it('finds two pure equilibria in Battle of the Sexes', () => {
    const eq = findPureNashEquilibria(battleOfTheSexes);
    expect(eq).toContainEqual(['Opera', 'Opera']);
    expect(eq).toContainEqual(['Foot', 'Foot']);
    expect(eq.length).toBe(2);
  });

  it('finds two pure equilibria in Chicken', () => {
    const eq = findPureNashEquilibria(chicken);
    expect(eq).toContainEqual(['Swerve', 'Straight']);
    expect(eq).toContainEqual(['Straight', 'Swerve']);
    expect(eq.length).toBe(2);
  });
});
```

- [ ] **Step 3: Run the test (fails — module missing)**

Run: `npm test -- nash`

- [ ] **Step 4: Implement Nash detection**

Create `src/games/nash.ts`:
```ts
import type { NormalFormGame, ActionProfile } from './types';

/**
 * Returns all pure-strategy Nash equilibria of a 2-player normal-form game.
 * A profile (a, b) is an equilibrium iff no player can strictly improve their
 * payoff by deviating to a different action while the other holds theirs.
 */
export function findPureNashEquilibria(game: NormalFormGame): ActionProfile[] {
  if (game.players !== 2) {
    throw new Error('findPureNashEquilibria currently supports 2-player games only');
  }
  const [rowActions, colActions] = game.actions;
  const equilibria: ActionProfile[] = [];

  for (const r of rowActions) {
    for (const c of colActions) {
      const [pr, pc] = game.payoff([r, c]);
      const rowCanDeviate = rowActions.some((rPrime) => {
        if (rPrime === r) return false;
        return game.payoff([rPrime, c])[0] > pr;
      });
      if (rowCanDeviate) continue;
      const colCanDeviate = colActions.some((cPrime) => {
        if (cPrime === c) return false;
        return game.payoff([r, cPrime])[1] > pc;
      });
      if (colCanDeviate) continue;
      equilibria.push([r, c]);
    }
  }
  return equilibria;
}
```

- [ ] **Step 5: Run the tests**

Run: `npm test -- nash`
Expected: 3 passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(games): add pure Nash equilibrium detection and example games"
```

---

### Task 15: Nash equilibrium content + page

**Files:**
- Create: `src/content/nash.tsx`
- Modify: `src/pages/concepts/NashEquilibrium.tsx`

- [ ] **Step 1: Create `src/content/nash.tsx`**

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const nashContent = {
  category: 'Concept central',
  summary: "Un état où aucun joueur n'a intérêt à dévier seul. Le concept transversal de toute la théorie des jeux non coopérative.",

  body: (
    <>
      <h2>Définition intuitive</h2>
      <p>
        Un <GlossaryTerm id="equilibre-nash">équilibre de Nash</GlossaryTerm> est un profil de{' '}
        <GlossaryTerm id="strategie">stratégies</GlossaryTerm> dans lequel, en supposant les choix des autres
        joueurs fixés, aucun joueur n'a intérêt à changer de stratégie. C'est un point de stabilité : tout le
        monde fait ce qu'il a de mieux à faire compte tenu de ce que font les autres.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Un même jeu peut avoir zéro, un, ou plusieurs équilibres. Et l'équilibre n'est pas toujours optimal
        au sens collectif — le dilemme du prisonnier est l'illustration la plus connue de ce paradoxe.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Définition formelle d'un équilibre de Nash en stratégies pures :</p>
      <KaTeXBlock tex="s^* = (s_1^*, \ldots, s_n^*) \text{ est un équilibre de Nash si :}" />
      <KaTeXBlock tex="\forall i, \forall s_i \in S_i, \quad u_i(s_i^*, s_{-i}^*) \geq u_i(s_i, s_{-i}^*)" />
      <p>
        John Nash a démontré en 1950 que tout jeu fini admet au moins un équilibre, à condition d'autoriser les
        <GlossaryTerm id="strategie-mixte"> stratégies mixtes</GlossaryTerm>.
      </p>
    </>
  ),
};
```

- [ ] **Step 2: Replace `src/pages/concepts/NashEquilibrium.tsx`**

```tsx
import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { findPureNashEquilibria } from '../../games/nash';
import { prisonersDilemma } from '../../games/prisoners';
import { battleOfTheSexes, chicken } from '../../games/examples';
import { nashContent } from '../../content/nash';
import type { NormalFormGame } from '../../games/types';

const GAMES: { game: NormalFormGame; labels: string[][] }[] = [
  { game: prisonersDilemma, labels: [['Coopérer', 'Trahir'], ['Coopérer', 'Trahir']] },
  { game: battleOfTheSexes, labels: [['Opéra', 'Foot'], ['Opéra', 'Foot']] },
  { game: chicken, labels: [['Esquiver', 'Foncer'], ['Esquiver', 'Foncer']] },
];

function Demo() {
  const [idx, setIdx] = useState(0);
  const { game, labels } = GAMES[idx];
  const eq = findPureNashEquilibria(game);

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {GAMES.map((g, i) => (
          <button
            key={g.game.id}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setIdx(i)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${idx === i ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              background: idx === i ? 'var(--accent-primary-soft)' : 'var(--bg-elevated)',
              color: idx === i ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {g.game.name}
          </button>
        ))}
      </div>
      <PayoffMatrix game={game} equilibria={eq} actionLabels={labels} />
      <div style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
        {eq.length === 0 && 'Aucun équilibre de Nash en stratégies pures (il en existe un en stratégies mixtes).'}
        {eq.length === 1 && 'Un seul équilibre en stratégies pures (mis en évidence en cyan).'}
        {eq.length > 1 && `${eq.length} équilibres en stratégies pures — c'est un jeu de coordination.`}
      </div>
    </div>
  );
}

export default function NashEquilibriumPage() {
  return (
    <ConceptPage
      conceptId="nash"
      conceptNumber={2}
      category={nashContent.category}
      summary={nashContent.summary}
      demo={<Demo />}
      body={nashContent.body}
      deepDive={nashContent.deepDive}
      relatedIds={['prisoners', 'mixed']}
    />
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Visit `/equilibre-nash`. Switch tabs between the three games. Verify equilibria are highlighted appropriately and explanatory text updates. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(concepts): wire Nash equilibrium page with three example games"
```

---

### Task 16: Mixed strategies (logic + page)

**Files:**
- Create: `src/games/mixed.ts`, `src/games/mixed.test.ts`, `src/content/mixedStrategies.tsx`
- Modify: `src/pages/concepts/MixedStrategies.tsx`

- [ ] **Step 1: Write failing tests for mixed strategies**

Create `src/games/mixed.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { expectedPayoff, sampleAction, normalize } from './mixed';

describe('expectedPayoff', () => {
  it('with deterministic mixed strategies reduces to pure payoff', () => {
    const payoff = (a: string, b: string) => {
      if (a === b) return 0;
      // RPS: rock beats scissors, paper beats rock, scissors beats paper
      const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
      return beats[a] === b ? 1 : -1;
    };
    const ev = expectedPayoff({ R: 1, P: 0, S: 0 }, { R: 0, P: 1, S: 0 }, payoff);
    expect(ev).toBe(-1);
  });

  it('with uniform random play returns 0 in zero-sum RPS', () => {
    const payoff = (a: string, b: string) => {
      if (a === b) return 0;
      const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
      return beats[a] === b ? 1 : -1;
    };
    const uniform = { R: 1 / 3, P: 1 / 3, S: 1 / 3 };
    const ev = expectedPayoff(uniform, uniform, payoff);
    expect(ev).toBeCloseTo(0, 10);
  });
});

describe('normalize', () => {
  it('rescales weights to sum to 1', () => {
    const result = normalize({ R: 2, P: 1, S: 1 });
    expect(result.R).toBeCloseTo(0.5);
    expect(result.P).toBeCloseTo(0.25);
    expect(result.S).toBeCloseTo(0.25);
  });

  it('returns uniform when all weights are zero', () => {
    const result = normalize({ R: 0, P: 0, S: 0 });
    expect(result.R).toBeCloseTo(1 / 3);
  });
});

describe('sampleAction', () => {
  it('picks action with weight 1 deterministically', () => {
    expect(sampleAction({ R: 1, P: 0, S: 0 }, () => 0.99)).toBe('R');
  });

  it('respects cumulative thresholds', () => {
    // R: [0, 0.5), P: [0.5, 0.8), S: [0.8, 1)
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.1)).toBe('R');
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.6)).toBe('P');
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.9)).toBe('S');
  });
});
```

- [ ] **Step 2: Run tests (will fail — module missing)**

Run: `npm test -- mixed`

- [ ] **Step 3: Implement `src/games/mixed.ts`**

```ts
import type { MixedStrategy, Action } from './types';

export function normalize(weights: MixedStrategy): MixedStrategy {
  const keys = Object.keys(weights);
  const sum = keys.reduce((s, k) => s + Math.max(0, weights[k]), 0);
  if (sum === 0) {
    return Object.fromEntries(keys.map((k) => [k, 1 / keys.length]));
  }
  return Object.fromEntries(keys.map((k) => [k, Math.max(0, weights[k]) / sum]));
}

export function expectedPayoff(
  rowMix: MixedStrategy,
  colMix: MixedStrategy,
  payoff: (a: Action, b: Action) => number
): number {
  let ev = 0;
  for (const a of Object.keys(rowMix)) {
    for (const b of Object.keys(colMix)) {
      ev += rowMix[a] * colMix[b] * payoff(a, b);
    }
  }
  return ev;
}

export function sampleAction(mix: MixedStrategy, rng: () => number = Math.random): Action {
  const r = rng();
  let cum = 0;
  const keys = Object.keys(mix);
  for (const k of keys) {
    cum += mix[k];
    if (r < cum) return k;
  }
  return keys[keys.length - 1];
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- mixed`
Expected: all pass.

- [ ] **Step 5: Create `src/content/mixedStrategies.tsx`**

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const mixedStrategiesContent = {
  category: 'Stratégies probabilistes',
  summary: "Quand aucune stratégie pure n'est stable, randomiser devient rationnel. Pierre-feuille-ciseaux est l'exemple parfait.",

  body: (
    <>
      <h2>Pourquoi mélanger ?</h2>
      <p>
        Dans certains jeux — typiquement à <GlossaryTerm id="somme-nulle">somme nulle</GlossaryTerm> où les
        intérêts sont strictement opposés — aucune <GlossaryTerm id="strategie-pure">stratégie pure</GlossaryTerm>{' '}
        n'est stable. Si tu joues toujours « pierre », ton adversaire jouera « papier ». Tu dois donc être
        imprévisible : c'est l'idée d'une <GlossaryTerm id="strategie-mixte">stratégie mixte</GlossaryTerm>.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Dans Pierre-feuille-ciseaux, l'unique équilibre de Nash consiste à jouer chaque action avec probabilité
        1/3. Toute déviation de l'adversaire face à cet équilibre laisse son espérance de gain inchangée — c'est
        ce qui rend l'équilibre stable.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>L'espérance de gain du joueur 1 face à un profil mixte <KaTeXBlock tex="(\sigma_1, \sigma_2)" inline /> est :</p>
      <KaTeXBlock tex="u_1(\sigma_1, \sigma_2) = \sum_{a \in A_1} \sum_{b \in A_2} \sigma_1(a)\, \sigma_2(b)\, u_1(a, b)" />
      <p>
        Au théorème de Nash (1950), tout jeu fini admet au moins un équilibre en stratégies mixtes. Pour
        Pierre-feuille-ciseaux, l'équilibre est <KaTeXBlock tex="\sigma^* = (1/3, 1/3, 1/3)" inline />.
      </p>
    </>
  ),
};
```

- [ ] **Step 6: Replace `src/pages/concepts/MixedStrategies.tsx`**

```tsx
import { useState, useMemo } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { mixedStrategiesContent } from '../../content/mixedStrategies';
import { normalize, expectedPayoff, sampleAction } from '../../games/mixed';

const ACTIONS = ['R', 'P', 'S'] as const;
const LABELS: Record<string, string> = { R: 'Pierre 🪨', P: 'Papier 📄', S: 'Ciseaux ✂️' };

const rpsPayoff = (a: string, b: string): number => {
  if (a === b) return 0;
  const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
  return beats[a] === b ? 1 : -1;
};

function Demo() {
  const [weights, setWeights] = useState<{ R: number; P: number; S: number }>({ R: 1, P: 1, S: 1 });
  const [history, setHistory] = useState<{ user: string; bot: string; result: number }[]>([]);

  const botMix = useMemo(() => normalize(weights), [weights]);
  const userUniform = { R: 1 / 3, P: 1 / 3, S: 1 / 3 };
  const ev = expectedPayoff(userUniform, botMix, rpsPayoff);

  const play = (userAction: string) => {
    const botAction = sampleAction(botMix);
    const result = rpsPayoff(userAction, botAction);
    setHistory((h) => [{ user: userAction, bot: botAction, result }, ...h].slice(0, 10));
  };

  const totals = history.reduce(
    (acc, r) => ({ wins: acc.wins + (r.result > 0 ? 1 : 0), losses: acc.losses + (r.result < 0 ? 1 : 0), draws: acc.draws + (r.result === 0 ? 1 : 0) }),
    { wins: 0, losses: 0, draws: 0 }
  );

  return (
    <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Stratégie du bot</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 'var(--space-2) 0 var(--space-3)' }}>
          Règle les probabilités du bot. Tes choix à toi sont supposés uniformes pour calculer l'espérance.
        </p>
        {ACTIONS.map((a) => (
          <div key={a} style={{ marginBottom: 'var(--space-3)' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <span>{LABELS[a]}</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{(botMix[a] * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(weights[a] * 100)}
              onChange={(e) => setWeights({ ...weights, [a]: Number(e.target.value) / 100 })}
              style={{ width: '100%' }}
              aria-label={`Probabilité ${LABELS[a]}`}
            />
          </div>
        ))}
        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          Espérance de gain (face à ton uniforme) : <span style={{ color: ev > 0 ? 'var(--accent-success)' : ev < 0 ? 'var(--accent-danger)' : 'var(--accent-primary)' }}>{ev.toFixed(3)}</span>
        </div>
      </div>

      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Joue</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          {ACTIONS.map((a) => (
            <button
              key={a}
              onClick={() => play(a)}
              style={{ flex: 1, padding: 'var(--space-3)', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}
            >
              {LABELS[a]}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Score : <span style={{ color: 'var(--accent-success)' }}>{totals.wins}</span> /{' '}
          <span style={{ color: 'var(--text-muted)' }}>{totals.draws}</span> /{' '}
          <span style={{ color: 'var(--accent-danger)' }}>{totals.losses}</span> (V/N/D)
        </div>
        <ul style={{ marginTop: 'var(--space-3)', listStyle: 'none', padding: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          {history.map((r, i) => (
            <li key={i} style={{ padding: 'var(--space-1) 0', color: r.result > 0 ? 'var(--accent-success)' : r.result < 0 ? 'var(--accent-danger)' : 'var(--text-muted)' }}>
              {LABELS[r.user]} vs {LABELS[r.bot]} → {r.result > 0 ? 'Gagné' : r.result < 0 ? 'Perdu' : 'Nul'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MixedStrategiesPage() {
  return (
    <ConceptPage
      conceptId="mixed"
      conceptNumber={3}
      category={mixedStrategiesContent.category}
      summary={mixedStrategiesContent.summary}
      demo={<Demo />}
      body={mixedStrategiesContent.body}
      deepDive={mixedStrategiesContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`. Visit `/strategies-mixtes`. Verify sliders update bot probabilities, the EV updates, the play buttons record history. Stop server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(concepts): add mixed strategies page with RPS bot simulator"
```

---

### Task 17: Iterated PD strategies + tournament logic

**Files:**
- Create: `src/games/axelrod/strategies.ts`, `src/games/axelrod/strategies.test.ts`, `src/games/axelrod/tournament.ts`, `src/games/axelrod/tournament.test.ts`, `src/games/axelrod/index.ts`

- [ ] **Step 1: Write failing strategy tests**

Create `src/games/axelrod/strategies.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { titForTat, alwaysCooperate, alwaysDefect, grudger, randomStrat, pavlov } from './strategies';
import type { ActionProfile } from '../types';

describe('strategies', () => {
  it('alwaysCooperate always returns C', () => {
    expect(alwaysCooperate.decide([], 0)).toBe('C');
    expect(alwaysCooperate.decide([['C', 'D']], 0)).toBe('C');
  });

  it('alwaysDefect always returns D', () => {
    expect(alwaysDefect.decide([], 0)).toBe('D');
    expect(alwaysDefect.decide([['C', 'C']], 0)).toBe('D');
  });

  it('titForTat cooperates first then mirrors opponent', () => {
    expect(titForTat.decide([], 0)).toBe('C');
    expect(titForTat.decide([['C', 'D']], 0)).toBe('D'); // opponent (player 1) played D
    expect(titForTat.decide([['C', 'D'], ['D', 'C']], 0)).toBe('C'); // opponent's last move was C
  });

  it('grudger cooperates until the opponent ever defects', () => {
    expect(grudger.decide([], 0)).toBe('C');
    expect(grudger.decide([['C', 'C'], ['C', 'C']], 0)).toBe('C');
    expect(grudger.decide([['C', 'D']], 0)).toBe('D');
    expect(grudger.decide([['C', 'D'], ['D', 'C']], 0)).toBe('D'); // never forgives
  });

  it('pavlov: win-stay/lose-shift around mutual cooperation', () => {
    // First move: C
    expect(pavlov.decide([], 0)).toBe('C');
    // Last round CC (good outcome) → stay (C)
    expect(pavlov.decide([['C', 'C']], 0)).toBe('C');
    // Last round CD (bad — got punished) → shift
    expect(pavlov.decide([['C', 'D']], 0)).toBe('D');
    // Last round DD (bad mutual) → shift
    expect(pavlov.decide([['D', 'D']], 0)).toBe('C');
    // Last round DC (good — exploited cooperator) → stay (D)
    expect(pavlov.decide([['D', 'C']], 0)).toBe('D');
  });

  it('random uses the supplied rng if provided via id check (smoke)', () => {
    const out = randomStrat.decide([], 0);
    expect(['C', 'D']).toContain(out);
  });
});
```

- [ ] **Step 2: Implement strategies**

Create `src/games/axelrod/strategies.ts`:
```ts
import type { IteratedStrategy, ActionProfile } from '../types';

export const alwaysCooperate: IteratedStrategy = {
  id: 'always-c',
  name: 'Toujours coopérer',
  description: 'Coopère sans condition, à chaque tour.',
  decide: () => 'C',
};

export const alwaysDefect: IteratedStrategy = {
  id: 'always-d',
  name: 'Toujours trahir',
  description: 'Trahit sans condition, à chaque tour.',
  decide: () => 'D',
};

export const titForTat: IteratedStrategy = {
  id: 'tit-for-tat',
  name: 'Tit-for-tat',
  description: 'Coopère au premier tour, puis copie le dernier coup de l\'adversaire.',
  decide: (history: ActionProfile[], me: number) => {
    if (history.length === 0) return 'C';
    const opp = me === 0 ? 1 : 0;
    return history[history.length - 1][opp];
  },
};

export const grudger: IteratedStrategy = {
  id: 'grudger',
  name: 'Rancunier',
  description: "Coopère jusqu'à ce que l'adversaire trahisse une fois ; ensuite, trahit pour toujours.",
  decide: (history: ActionProfile[], me: number) => {
    const opp = me === 0 ? 1 : 0;
    return history.some((round) => round[opp] === 'D') ? 'D' : 'C';
  },
};

export const pavlov: IteratedStrategy = {
  id: 'pavlov',
  name: 'Pavlov (Win-Stay / Lose-Shift)',
  description: "Coopère au premier tour. Ensuite : conserve son action si le tour précédent était bon (CC ou DC), change sinon.",
  decide: (history: ActionProfile[], me: number) => {
    if (history.length === 0) return 'C';
    const opp = me === 0 ? 1 : 0;
    const last = history[history.length - 1];
    const myLast = last[me];
    const oppLast = last[opp];
    const goodOutcome = (myLast === 'C' && oppLast === 'C') || (myLast === 'D' && oppLast === 'C');
    if (goodOutcome) return myLast;
    return myLast === 'C' ? 'D' : 'C';
  },
};

export const randomStrat: IteratedStrategy = {
  id: 'random',
  name: 'Aléatoire',
  description: 'Coopère ou trahit avec probabilité 1/2.',
  decide: () => (Math.random() < 0.5 ? 'C' : 'D'),
};

export const ALL_STRATEGIES: IteratedStrategy[] = [
  alwaysCooperate,
  alwaysDefect,
  titForTat,
  grudger,
  pavlov,
  randomStrat,
];
```

- [ ] **Step 3: Run strategy tests**

Run: `npm test -- axelrod/strategies`
Expected: 6 passed.

- [ ] **Step 4: Write tournament tests**

Create `src/games/axelrod/tournament.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { runMatch, runTournament } from './tournament';
import { titForTat, alwaysDefect, alwaysCooperate } from './strategies';
import { prisonersDilemma } from '../prisoners';

describe('runMatch', () => {
  it('always-cooperate vs always-cooperate yields mutual coop every round', () => {
    const result = runMatch(alwaysCooperate, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(-10);
    expect(result.scoreB).toBe(-10);
    expect(result.history.every((r) => r.profile[0] === 'C' && r.profile[1] === 'C')).toBe(true);
  });

  it('always-defect beats always-cooperate', () => {
    const result = runMatch(alwaysDefect, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(0);
    expect(result.scoreB).toBe(-30);
  });

  it('titForTat ties always-cooperate', () => {
    const result = runMatch(titForTat, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(-10);
    expect(result.scoreB).toBe(-10);
  });
});

describe('runTournament', () => {
  it('round-robin produces results for all unordered pairs', () => {
    const result = runTournament([titForTat, alwaysDefect, alwaysCooperate], 5, prisonersDilemma.payoff);
    expect(result.standings.length).toBe(3);
    // Sum of scores across all matches should be deterministic for these strategies
    expect(result.standings.find((s) => s.strategy.id === 'always-d')!.totalScore).toBeGreaterThanOrEqual(
      result.standings.find((s) => s.strategy.id === 'always-c')!.totalScore
    );
  });

  it('tit-for-tat tops the field of nice strategies', () => {
    const result = runTournament([titForTat, alwaysCooperate], 50, prisonersDilemma.payoff);
    // Both pure-nice strategies; same outcome
    expect(result.standings[0].totalScore).toBe(result.standings[1].totalScore);
  });
});
```

- [ ] **Step 5: Implement tournament**

Create `src/games/axelrod/tournament.ts`:
```ts
import type { IteratedStrategy, PayoffFunction, ActionProfile, SimulationRound } from '../types';

export interface MatchResult {
  scoreA: number;
  scoreB: number;
  history: SimulationRound[];
}

export function runMatch(
  strategyA: IteratedStrategy,
  strategyB: IteratedStrategy,
  rounds: number,
  payoff: PayoffFunction
): MatchResult {
  const history: SimulationRound[] = [];
  let scoreA = 0;
  let scoreB = 0;
  for (let r = 0; r < rounds; r++) {
    const profiles = history.map((h) => h.profile);
    const a = strategyA.decide(profiles, 0);
    const b = strategyB.decide(profiles, 1);
    const profile: ActionProfile = [a, b];
    const payoffs = payoff(profile);
    scoreA += payoffs[0];
    scoreB += payoffs[1];
    history.push({ profile, payoffs });
  }
  return { scoreA, scoreB, history };
}

export interface Standing {
  strategy: IteratedStrategy;
  totalScore: number;
  matches: { opponent: IteratedStrategy; score: number; opponentScore: number }[];
}

export interface TournamentResult {
  standings: Standing[];
}

export function runTournament(
  strategies: IteratedStrategy[],
  roundsPerMatch: number,
  payoff: PayoffFunction
): TournamentResult {
  const standings: Standing[] = strategies.map((s) => ({ strategy: s, totalScore: 0, matches: [] }));

  for (let i = 0; i < strategies.length; i++) {
    for (let j = i; j < strategies.length; j++) {
      const result = runMatch(strategies[i], strategies[j], roundsPerMatch, payoff);
      standings[i].totalScore += result.scoreA;
      standings[i].matches.push({ opponent: strategies[j], score: result.scoreA, opponentScore: result.scoreB });
      if (i !== j) {
        standings[j].totalScore += result.scoreB;
        standings[j].matches.push({ opponent: strategies[i], score: result.scoreB, opponentScore: result.scoreA });
      }
    }
  }

  standings.sort((a, b) => b.totalScore - a.totalScore);
  return { standings };
}
```

- [ ] **Step 6: Create `src/games/axelrod/index.ts`**

```ts
export * from './strategies';
export * from './tournament';
```

- [ ] **Step 7: Run tournament tests**

Run: `npm test -- axelrod`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(games): add Axelrod strategies and round-robin tournament"
```

---

### Task 18: Iterated PD content + page

**Files:**
- Create: `src/content/iteratedPD.tsx`
- Modify: `src/pages/concepts/IteratedPD.tsx`

- [ ] **Step 1: Create `src/content/iteratedPD.tsx`**

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const iteratedPDContent = {
  category: 'Jeu répété',
  summary: 'Quand le dilemme du prisonnier se répète, la coopération peut émerger. Le tournoi d\'Axelrod (1980) en a donné la démonstration historique.',

  body: (
    <>
      <h2>Pourquoi la coopération peut émerger</h2>
      <p>
        Si les joueurs savent qu'ils vont se rencontrer à nouveau, la <GlossaryTerm id="cooperation">coopération</GlossaryTerm>{' '}
        peut devenir rationnelle : trahir aujourd'hui, c'est s'exposer à une <GlossaryTerm id="trahison">trahison</GlossaryTerm>{' '}
        en représailles demain. Robert Axelrod a organisé en 1980 un tournoi où des chercheurs ont soumis des
        stratégies pour le dilemme du prisonnier itéré. La gagnante, étonnamment, était la plus simple de toutes :{' '}
        <GlossaryTerm id="tit-for-tat">tit-for-tat</GlossaryTerm>.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Choisis 2 à 6 stratégies dans la démo et lance un tournoi en round-robin. Observe : les stratégies
        « gentilles » (qui ne trahissent jamais en premier) tendent à dominer dans une population mixte.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>
        Score total d'une stratégie <KaTeXBlock tex="\sigma_i" inline /> contre toutes les autres dans un tournoi de{' '}
        <KaTeXBlock tex="T" inline /> tours par match :
      </p>
      <KaTeXBlock tex="S(\sigma_i) = \sum_{j \neq i} \sum_{t=1}^{T} u_i(\sigma_i(h_t), \sigma_j(h_t))" />
      <p>
        Axelrod identifie quatre propriétés des stratégies gagnantes : être <em>gentil</em> (ne jamais trahir en
        premier), <em>réciproque</em> (répondre à la trahison), <em>indulgent</em> (ne pas garder rancune
        indéfiniment), <em>clair</em> (prévisible pour permettre la coopération).
      </p>
    </>
  ),
};
```

- [ ] **Step 2: Replace `src/pages/concepts/IteratedPD.tsx`**

```tsx
import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { iteratedPDContent } from '../../content/iteratedPD';
import { ALL_STRATEGIES, runTournament } from '../../games/axelrod';
import { prisonersDilemma } from '../../games/prisoners';
import type { TournamentResult } from '../../games/axelrod/tournament';

function Demo() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['tit-for-tat', 'always-c', 'always-d', 'grudger'])
  );
  const [rounds, setRounds] = useState(50);
  const [result, setResult] = useState<TournamentResult | null>(null);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const runIt = () => {
    const strategies = ALL_STRATEGIES.filter((s) => selected.has(s.id));
    if (strategies.length < 2) return;
    setResult(runTournament(strategies, rounds, prisonersDilemma.payoff));
  };

  return (
    <div>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Stratégies engagées</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
          {ALL_STRATEGIES.map((s) => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                border: `1px solid ${selected.has(s.id) ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                background: selected.has(s.id) ? 'var(--accent-primary-soft)' : 'var(--bg-base)',
                color: selected.has(s.id) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
              }}
              title={s.description}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Tours par match :</label>
          <input
            type="number"
            min={5}
            max={500}
            value={rounds}
            onChange={(e) => setRounds(Math.max(5, Math.min(500, Number(e.target.value) || 5)))}
            style={{ width: 80, padding: 'var(--space-2)', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={runIt}
            disabled={selected.size < 2}
            style={{
              marginLeft: 'auto',
              padding: 'var(--space-2) var(--space-4)',
              background: selected.size < 2 ? 'var(--bg-base)' : 'var(--accent-primary)',
              color: selected.size < 2 ? 'var(--text-muted)' : 'var(--bg-base)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              cursor: selected.size < 2 ? 'not-allowed' : 'pointer',
            }}
          >
            Lancer le tournoi
          </button>
        </div>
        {selected.size < 2 && (
          <div style={{ marginTop: 'var(--space-2)', color: 'var(--accent-warning)', fontSize: 'var(--text-sm)' }}>
            Sélectionne au moins 2 stratégies.
          </div>
        )}
      </div>

      {result && (
        <div style={{ marginTop: 'var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <div className="label-mono">Classement</div>
          <table style={{ width: '100%', marginTop: 'var(--space-3)', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: 'var(--space-2)' }}>#</th>
                <th style={{ padding: 'var(--space-2)' }}>Stratégie</th>
                <th style={{ padding: 'var(--space-2)', textAlign: 'right' }}>Score total</th>
              </tr>
            </thead>
            <tbody>
              {result.standings.map((s, i) => (
                <tr key={s.strategy.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--space-2)', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--text-primary)' }}>{s.strategy.name}</td>
                  <td style={{ padding: 'var(--space-2)', textAlign: 'right', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{s.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function IteratedPDPage() {
  return (
    <ConceptPage
      conceptId="iterated"
      conceptNumber={4}
      category={iteratedPDContent.category}
      summary={iteratedPDContent.summary}
      demo={<Demo />}
      body={iteratedPDContent.body}
      deepDive={iteratedPDContent.deepDive}
      relatedIds={['prisoners', 'commons']}
    />
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Visit `/dilemme-itere`. Select strategies, run a 50-round tournament, check that tit-for-tat is among the leaders. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(concepts): add iterated PD page with Axelrod tournament UI"
```

---

### Task 19: Sequential games (entrant/monopole tree)

**Files:**
- Create: `src/games/sequential.ts`, `src/games/sequential.test.ts`, `src/content/sequential.tsx`
- Modify: `src/pages/concepts/SequentialGames.tsx`

- [ ] **Step 1: Define the tree types and the entrant/monopole game with tests**

Create `src/games/sequential.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { entrantMonopoly, solveBackwardInduction } from './sequential';

describe('entrantMonopoly tree', () => {
  it('has the right shape: entrant first, then monopolist if entry occurred', () => {
    expect(entrantMonopoly.player).toBe('entrant');
    expect(entrantMonopoly.actions.map((a) => a.label)).toEqual(['Ne pas entrer', 'Entrer']);
  });
});

describe('solveBackwardInduction', () => {
  it('the SPNE is (Entrer, Accommoder)', () => {
    const solution = solveBackwardInduction(entrantMonopoly);
    // path: entrant chooses "Entrer", monopolist chooses "Accommoder"
    expect(solution.path.map((s) => s.action)).toEqual(['Entrer', 'Accommoder']);
    expect(solution.payoffs).toEqual([2, 2]);
  });
});
```

- [ ] **Step 2: Run test (fails)**

Run: `npm test -- sequential`

- [ ] **Step 3: Implement**

Create `src/games/sequential.ts`:
```ts
export type PlayerLabel = string;

export interface Leaf {
  kind: 'leaf';
  label: string;
  /** Payoffs ordered by player label appearance in the tree. */
  payoffs: number[];
}

export interface DecisionNode {
  kind: 'decision';
  player: PlayerLabel;
  /** Each action leads to a sub-tree. */
  actions: { label: string; child: GameTreeNode }[];
}

export type GameTreeNode = DecisionNode | Leaf;

/**
 * Entrant vs monopolist:
 *   Entrant chooses Enter / Stay out.
 *   If Stay out: payoffs (0, 5) — entrant 0, monopolist keeps full market 5.
 *   If Enter: monopolist chooses Fight / Accommodate.
 *     Fight: (-2, -1) — both lose.
 *     Accommodate: (2, 2) — split.
 */
export const entrantMonopoly: DecisionNode = {
  kind: 'decision',
  player: 'entrant',
  actions: [
    {
      label: 'Ne pas entrer',
      child: { kind: 'leaf', label: 'Marché conservé', payoffs: [0, 5] },
    },
    {
      label: 'Entrer',
      child: {
        kind: 'decision',
        player: 'monopole',
        actions: [
          { label: 'Combattre', child: { kind: 'leaf', label: 'Guerre des prix', payoffs: [-2, -1] } },
          { label: 'Accommoder', child: { kind: 'leaf', label: 'Partage du marché', payoffs: [2, 2] } },
        ],
      },
    },
  ],
};

const PLAYER_INDEX: Record<PlayerLabel, number> = { entrant: 0, monopole: 1 };

export interface BackwardSolution {
  path: { player: PlayerLabel; action: string }[];
  payoffs: number[];
}

export function solveBackwardInduction(root: DecisionNode): BackwardSolution {
  function solve(node: GameTreeNode): { payoffs: number[]; choice: string | null; path: { player: PlayerLabel; action: string }[] } {
    if (node.kind === 'leaf') {
      return { payoffs: node.payoffs, choice: null, path: [] };
    }
    const playerIdx = PLAYER_INDEX[node.player];
    let best: { label: string; payoffs: number[]; subPath: { player: PlayerLabel; action: string }[] } | null = null;
    for (const a of node.actions) {
      const sub = solve(a.child);
      if (best === null || sub.payoffs[playerIdx] > best.payoffs[playerIdx]) {
        best = { label: a.label, payoffs: sub.payoffs, subPath: sub.path };
      }
    }
    if (!best) throw new Error('Decision node has no actions');
    return {
      payoffs: best.payoffs,
      choice: best.label,
      path: [{ player: node.player, action: best.label }, ...best.subPath],
    };
  }

  const { path, payoffs } = solve(root);
  return { path, payoffs };
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- sequential`
Expected: all pass.

- [ ] **Step 5: Create `src/content/sequential.tsx`**

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const sequentialContent = {
  category: 'Jeu séquentiel',
  summary: 'Quand les joueurs jouent à tour de rôle et observent les choix précédents. Se résout par induction à rebours.',

  body: (
    <>
      <h2>Le jeu de l'entrant et du monopole</h2>
      <p>
        Une entreprise envisage d'entrer sur un marché tenu par un monopole. Si elle entre, le monopole peut soit
        engager une guerre des prix (Combattre), soit partager le marché (Accommoder). Pour résoudre ce jeu, on
        utilise l'<GlossaryTerm id="induction-rebours">induction à rebours</GlossaryTerm> : on part des feuilles de
        l'arbre et on remonte en supposant qu'à chaque nœud, le joueur joue ce qui est optimal pour lui à cet
        instant.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Au nœud du monopole, accommoder rapporte 2, combattre rapporte -1 ; il accommode donc. Sachant cela,
        l'entrant choisit d'entrer (gain 2) plutôt que de rester dehors (gain 0). L'équilibre parfait en
        sous-jeux est (Entrer, Accommoder).
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Un équilibre parfait en sous-jeux (SPNE) est un profil de stratégies qui forme un équilibre de Nash dans chaque sous-jeu :</p>
      <KaTeXBlock tex="\forall \text{sous-jeu } G', \quad \sigma|_{G'} \text{ est un \'equilibre de Nash de } G'" />
      <p>
        L'induction à rebours sélectionne automatiquement un SPNE pour les jeux à information parfaite et horizon
        fini. La menace « si tu entres, je combats » n'est pas crédible car combattre donnerait au monopole -1
        alors qu'accommoder donne 2.
      </p>
    </>
  ),
};
```

- [ ] **Step 6: Replace `src/pages/concepts/SequentialGames.tsx`**

```tsx
import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { sequentialContent } from '../../content/sequential';
import { entrantMonopoly, solveBackwardInduction, type GameTreeNode } from '../../games/sequential';

function NodeView({ node, depth, highlightPath }: { node: GameTreeNode; depth: number; highlightPath: string[] }) {
  if (node.kind === 'leaf') {
    return (
      <div style={{ marginLeft: depth * 24, padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', display: 'inline-block' }}>
        <div style={{ color: 'var(--text-secondary)' }}>{node.label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>({node.payoffs.join(', ')})</div>
      </div>
    );
  }
  return (
    <div style={{ marginLeft: depth * 24, marginTop: 'var(--space-3)' }}>
      <div className="label-mono" style={{ color: 'var(--accent-secondary)' }}>{node.player}</div>
      {node.actions.map((a, i) => {
        const isOnPath = highlightPath.includes(a.label);
        return (
          <div key={i} style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-3)', borderLeft: `2px solid ${isOnPath ? 'var(--accent-primary)' : 'var(--border-subtle)'}` }}>
            <div style={{ color: isOnPath ? 'var(--accent-primary)' : 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: isOnPath ? 700 : 400, padding: 'var(--space-1) 0' }}>{a.label}</div>
            <NodeView node={a.child} depth={depth + 1} highlightPath={highlightPath} />
          </div>
        );
      })}
    </div>
  );
}

function Demo() {
  const [solved, setSolved] = useState(false);
  const solution = solveBackwardInduction(entrantMonopoly);
  const path = solved ? solution.path.map((p) => p.action) : [];

  return (
    <div>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <NodeView node={entrantMonopoly} depth={0} highlightPath={path} />
      </div>
      <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button
          onClick={() => setSolved((v) => !v)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: solved ? 'var(--bg-elevated)' : 'var(--accent-primary)',
            color: solved ? 'var(--text-primary)' : 'var(--bg-base)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            border: solved ? '1px solid var(--border-default)' : 0,
          }}
        >
          {solved ? 'Réinitialiser' : 'Résoudre par induction à rebours'}
        </button>
        {solved && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            SPNE : ({solution.path.map((s) => s.action).join(', ')}) — paiements ({solution.payoffs.join(', ')}).
          </span>
        )}
      </div>
    </div>
  );
}

export default function SequentialGamesPage() {
  return (
    <ConceptPage
      conceptId="sequential"
      conceptNumber={5}
      category={sequentialContent.category}
      summary={sequentialContent.summary}
      demo={<Demo />}
      body={sequentialContent.body}
      deepDive={sequentialContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`. Visit `/jeux-sequentiels`. Click "Résoudre" — the path should highlight in cyan: Entrer → Accommoder. Stop server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(concepts): add sequential games page with backward induction demo"
```

---

### Task 20: Tragedy of the commons (logic + page)

**Files:**
- Create: `src/games/commons.ts`, `src/games/commons.test.ts`, `src/content/commons.tsx`
- Modify: `src/pages/concepts/CommonsTragedy.tsx`

- [ ] **Step 1: Write tests for the commons model**

Create `src/games/commons.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { commonsOutcome, optimalHerdSize } from './commons';

describe('commons model', () => {
  it('with a small load, productivity is positive', () => {
    const r = commonsOutcome({ herders: 2, perHerder: 5, capacity: 100 });
    expect(r.totalCattle).toBe(10);
    expect(r.collectiveProductivity).toBeGreaterThan(0);
  });

  it('with capacity exceeded, productivity collapses', () => {
    const r = commonsOutcome({ herders: 10, perHerder: 30, capacity: 100 });
    expect(r.totalCattle).toBe(300);
    expect(r.collectiveProductivity).toBeLessThan(commonsOutcome({ herders: 10, perHerder: 10, capacity: 100 }).collectiveProductivity);
  });

  it('individual return is total productivity divided by herders', () => {
    const r = commonsOutcome({ herders: 4, perHerder: 5, capacity: 100 });
    expect(r.perHerderReturn).toBeCloseTo(r.collectiveProductivity / 4);
  });
});

describe('optimalHerdSize', () => {
  it('returns the per-herder size that maximises collective productivity', () => {
    const opt = optimalHerdSize({ herders: 4, capacity: 100 });
    // For our model the optimum is at totalCattle = capacity / 2 → perHerder = capacity / (2 * herders)
    expect(opt).toBe(100 / (2 * 4));
  });
});
```

- [ ] **Step 2: Run (fails)**

Run: `npm test -- commons`

- [ ] **Step 3: Implement `src/games/commons.ts`**

```ts
export interface CommonsParams {
  herders: number;
  perHerder: number;
  capacity: number;
}

export interface CommonsOutcome {
  totalCattle: number;
  collectiveProductivity: number;
  perHerderReturn: number;
}

/**
 * Toy model of a commons:
 *   each animal yields a marginal product that decreases linearly with the
 *   total herd size N: marginal(N) = max(0, 1 - N / capacity).
 *   Total collective productivity is N * (1 - N / capacity) for N <= capacity,
 *   beyond which the pasture collapses (productivity drops to 0).
 */
export function commonsOutcome({ herders, perHerder, capacity }: CommonsParams): CommonsOutcome {
  const N = herders * perHerder;
  let totalProd: number;
  if (N <= 0) totalProd = 0;
  else if (N <= capacity) totalProd = N * (1 - N / capacity);
  else totalProd = 0; // collapse
  return {
    totalCattle: N,
    collectiveProductivity: totalProd,
    perHerderReturn: herders > 0 ? totalProd / herders : 0,
  };
}

/**
 * Returns the per-herder cattle count that maximises COLLECTIVE productivity.
 * For our model the optimum total herd is capacity / 2, so per-herder is
 * capacity / (2 * herders).
 */
export function optimalHerdSize({ herders, capacity }: { herders: number; capacity: number }): number {
  return capacity / (2 * herders);
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- commons`
Expected: all pass.

- [ ] **Step 5: Create `src/content/commons.tsx`**

```tsx
import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const commonsContent = {
  category: 'Jeu à N joueurs',
  summary: "Lorsqu'une ressource commune est exploitée par plusieurs, l'intérêt individuel peut détruire la ressource pour tous. Hardin, 1968.",

  body: (
    <>
      <h2>Le pâturage commun</h2>
      <p>
        Plusieurs bergers font paître leurs bêtes sur un pâturage commun de capacité limitée. Tant que la
        charge totale reste sous la capacité, la productivité augmente avec le nombre de bêtes. Au-delà, le
        pâturage s'épuise et la productivité collective s'effondre.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Pour chaque berger, ajouter une bête supplémentaire est rationnel : il en récupère tout le produit, alors
        que la dégradation est partagée par tous. C'est une <GlossaryTerm id="externalite">externalité</GlossaryTerm>{' '}
        négative classique. Sans coordination, la ressource est surexploitée.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Productivité totale du pâturage en fonction du nombre total de bêtes <KaTeXBlock tex="N" inline /> et de la capacité <KaTeXBlock tex="K" inline /> :</p>
      <KaTeXBlock tex="P(N) = N \cdot \max\left(0, 1 - \frac{N}{K}\right)" />
      <p>L'optimum collectif est atteint en <KaTeXBlock tex="N^* = K/2" inline />. À l'équilibre de Nash non coopératif, chaque berger augmente sa bête tant que le gain marginal individuel reste positif, ce qui produit <KaTeXBlock tex="N_{\mathrm{NE}} > N^*" inline /> et une surexploitation.</p>
    </>
  ),
};
```

- [ ] **Step 6: Replace `src/pages/concepts/CommonsTragedy.tsx`**

```tsx
import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { commonsContent } from '../../content/commons';
import { commonsOutcome, optimalHerdSize } from '../../games/commons';

function Demo() {
  const [herders, setHerders] = useState(4);
  const [perHerder, setPerHerder] = useState(20);
  const capacity = 200;
  const out = commonsOutcome({ herders, perHerder, capacity });
  const opt = optimalHerdSize({ herders, capacity });
  const overload = out.totalCattle > capacity;

  // build curve points for visualization
  const points = Array.from({ length: 50 }, (_, i) => {
    const N = (i + 1) * (capacity * 1.6 / 50);
    return { N, P: Math.max(0, N * (1 - N / capacity)) };
  });
  const maxP = Math.max(...points.map((p) => p.P));

  return (
    <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)' }}>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Paramètres</div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>Bergers</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{herders}</span>
          </label>
          <input type="range" min={1} max={20} value={herders} onChange={(e) => setHerders(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>Bêtes par berger</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{perHerder}</span>
          </label>
          <input type="range" min={1} max={50} value={perHerder} onChange={(e) => setPerHerder(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          <div>Total : <span style={{ color: 'var(--text-primary)' }}>{out.totalCattle}</span> / {capacity} ({((out.totalCattle / capacity) * 100).toFixed(0)}%)</div>
          <div>Productivité collective : <span style={{ color: overload ? 'var(--accent-danger)' : 'var(--accent-success)' }}>{out.collectiveProductivity.toFixed(2)}</span></div>
          <div>Par berger : <span style={{ color: 'var(--text-secondary)' }}>{out.perHerderReturn.toFixed(2)}</span></div>
          <div style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>Optimum collectif : {opt.toFixed(1)} bêtes/berger</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Productivité collective P(N)</div>
        <svg viewBox="0 0 300 180" style={{ width: '100%', marginTop: 'var(--space-3)' }} role="img" aria-label="Courbe de productivité">
          {/* axes */}
          <line x1="20" y1="160" x2="290" y2="160" stroke="var(--border-default)" />
          <line x1="20" y1="10" x2="20" y2="160" stroke="var(--border-default)" />
          {/* curve */}
          <polyline
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            points={points.map((p) => `${20 + (p.N / (capacity * 1.6)) * 270},${160 - (p.P / maxP) * 140}`).join(' ')}
          />
          {/* current N marker */}
          <line
            x1={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            y1="10"
            x2={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            y2="160"
            stroke={overload ? 'var(--accent-danger)' : 'var(--accent-warning)'}
            strokeDasharray="4 4"
          />
          <circle
            cx={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            cy={160 - (out.collectiveProductivity / maxP) * 140}
            r="5"
            fill={overload ? 'var(--accent-danger)' : 'var(--accent-warning)'}
          />
          {/* capacity marker */}
          <line
            x1={20 + (capacity / (capacity * 1.6)) * 270}
            y1="10"
            x2={20 + (capacity / (capacity * 1.6)) * 270}
            y2="160"
            stroke="var(--text-muted)"
            strokeDasharray="2 4"
          />
          <text x={20 + (capacity / (capacity * 1.6)) * 270 + 4} y="20" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">capacité</text>
        </svg>
      </div>
    </div>
  );
}

export default function CommonsTragedyPage() {
  return (
    <ConceptPage
      conceptId="commons"
      conceptNumber={6}
      category={commonsContent.category}
      summary={commonsContent.summary}
      demo={<Demo />}
      body={commonsContent.body}
      deepDive={commonsContent.deepDive}
      relatedIds={['prisoners', 'iterated']}
    />
  );
}
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`. Visit `/biens-communs`. Move sliders — productivity curve marker moves, color flips to red when capacity is exceeded. Stop server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(concepts): add tragedy of the commons page with productivity curve"
```

---

## Phase 5 — Hub map and meta pages

### Task 21: Hub map (animated SVG)

**Files:**
- Create: `src/components/HubMap/HubMap.tsx`, `src/components/HubMap/HubMap.module.css`, `src/components/HubMap/HubMap.test.tsx`, `src/components/HubMap/index.ts`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create `src/components/HubMap/HubMap.module.css`**

```css
.wrap { width: 100%; max-width: 920px; margin: 0 auto; aspect-ratio: 4 / 3; }
.svg { width: 100%; height: 100%; }
.node { cursor: pointer; transition: transform var(--duration-base) var(--ease-out-expo); }
.nodeCircle { fill: var(--bg-elevated); stroke: var(--border-default); stroke-width: 1.5; transition: all var(--duration-base) var(--ease-out-expo); }
.node:hover .nodeCircle, .node:focus .nodeCircle { stroke: var(--accent-primary); fill: var(--accent-primary-soft); }
.nodeLabel { fill: var(--text-primary); font-size: 13px; font-weight: 600; pointer-events: none; }
.nodeLabel.muted { fill: var(--text-secondary); }
.edge { stroke: var(--border-default); stroke-width: 1; }
.edge.highlighted { stroke: var(--accent-primary); }
.fallback { display: none; }
@media (max-width: 640px) {
  .svg { display: none; }
  .fallback { display: flex; flex-direction: column; gap: var(--space-2); }
  .fallbackItem { padding: var(--space-3) var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-primary); font-size: var(--text-base); }
}
```

- [ ] **Step 2: Write a smoke test**

Create `src/components/HubMap/HubMap.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HubMap } from './HubMap';

describe('HubMap', () => {
  it('renders all 6 concept titles as links', () => {
    render(
      <MemoryRouter>
        <HubMap />
      </MemoryRouter>
    );
    const titles = [
      'Dilemme du prisonnier', 'Équilibre de Nash', 'Stratégies mixtes',
      'Dilemme du prisonnier itéré', 'Jeux séquentiels', 'Tragédie des biens communs',
    ];
    titles.forEach((t) => expect(screen.getAllByText(new RegExp(t)).length).toBeGreaterThan(0));
  });
});
```

- [ ] **Step 3: Implement `src/components/HubMap/HubMap.tsx`**

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import styles from './HubMap.module.css';

interface NodePos { id: ConceptId; x: number; y: number; }
const NODES: NodePos[] = [
  { id: 'prisoners',  x: 200, y: 320 },
  { id: 'nash',       x: 460, y: 220 },
  { id: 'mixed',      x: 700, y: 320 },
  { id: 'iterated',   x: 200, y: 140 },
  { id: 'sequential', x: 460, y: 60  },
  { id: 'commons',    x: 700, y: 140 },
];

interface Edge { from: ConceptId; to: ConceptId; }
const EDGES: Edge[] = [
  { from: 'prisoners', to: 'nash' },
  { from: 'prisoners', to: 'iterated' },
  { from: 'prisoners', to: 'commons' },
  { from: 'mixed', to: 'nash' },
  { from: 'sequential', to: 'nash' },
  { from: 'iterated', to: 'commons' },
];

export function HubMap() {
  const [hovered, setHovered] = useState<ConceptId | null>(null);
  const navigate = useNavigate();

  const isEdgeHighlighted = (e: Edge) => hovered !== null && (e.from === hovered || e.to === hovered);

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 880 400" className={styles.svg} role="img" aria-label="Carte des concepts">
        {EDGES.map((e, i) => {
          const a = NODES.find((n) => n.id === e.from)!;
          const b = NODES.find((n) => n.id === e.to)!;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`${styles.edge} ${isEdgeHighlighted(e) ? styles.highlighted : ''}`}
            />
          );
        })}
        {NODES.map((n, i) => {
          const route = CONCEPT_ROUTES.find((c) => c.id === n.id)!;
          const isMuted = hovered !== null && hovered !== n.id && !EDGES.some((e) => (e.from === hovered && e.to === n.id) || (e.to === hovered && e.from === n.id));
          return (
            <motion.g
              key={n.id}
              className={styles.node}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              onClick={() => navigate(route.path)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(route.path); }}
              role="link"
              aria-label={route.title}
            >
              <circle cx={n.x} cy={n.y} r={56} className={styles.nodeCircle} />
              <text x={n.x} y={n.y - 4} textAnchor="middle" className={`${styles.nodeLabel} ${isMuted ? styles.muted : ''}`}>
                {route.title.split(' ').slice(0, 2).join(' ')}
              </text>
              <text x={n.x} y={n.y + 14} textAnchor="middle" className={`${styles.nodeLabel} ${isMuted ? styles.muted : ''}`}>
                {route.title.split(' ').slice(2).join(' ')}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className={styles.fallback}>
        {CONCEPT_ROUTES.map((c) => (
          <Link key={c.id} to={c.path} className={styles.fallbackItem}>{c.title} →</Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `index.ts`**

```ts
export { HubMap } from './HubMap';
```

- [ ] **Step 5: Replace `src/pages/HomePage.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { HubMap } from '../components/HubMap';

export default function HomePage() {
  return (
    <Layout>
      <motion.section
        style={{ padding: 'var(--space-12) var(--space-16)', textAlign: 'center', borderBottom: '1px solid var(--border-subtle)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="label-mono">Démonstrations interactives</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-3) 0' }}>Théorie des jeux</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          Six concepts fondamentaux, expliqués avec des démos cliquables. Survole un nœud pour voir ses connexions.
        </p>
      </motion.section>
      <section style={{ padding: 'var(--space-12) var(--space-6)' }}>
        <HubMap />
      </section>
    </Layout>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `npm test -- HubMap`
Expected: pass.

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`. Visit `/`. Hover nodes — connections highlight; click a node — navigate to the concept. Resize window below 640px — fallback list appears. Stop server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(home): add animated SVG hub map with mobile fallback list"
```

---

### Task 22: Glossary page

**Files:**
- Modify: `src/pages/GlossaryPage.tsx`

- [ ] **Step 1: Replace `src/pages/GlossaryPage.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { glossary } from '../content/glossary';

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'fr'));
  return (
    <Layout crumbs={[{ label: 'Glossaire' }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'var(--space-12) var(--space-16)', maxWidth: 820 }}
      >
        <span className="label-mono">Glossaire</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-2) 0 var(--space-3)' }}>Termes essentiels</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          Les notions qui reviennent dans plusieurs concepts. Référez-vous-y au besoin.
        </p>
        <dl style={{ marginTop: 'var(--space-8)' }}>
          {sorted.map((entry) => (
            <div key={entry.id} style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <dt style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', fontWeight: 600 }}>{entry.term}</dt>
              <dd style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </Layout>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`. Visit `/glossaire`. Verify list appears alphabetically. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(pages): build glossary page from shared store"
```

---

### Task 23: Further reading page

**Files:**
- Create: `src/content/references.ts`
- Modify: `src/pages/FurtherReadingPage.tsx`

- [ ] **Step 1: Create `src/content/references.ts`**

```ts
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
```

- [ ] **Step 2: Replace `src/pages/FurtherReadingPage.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { references } from '../content/references';

export default function FurtherReadingPage() {
  return (
    <Layout crumbs={[{ label: 'Aller plus loin' }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'var(--space-12) var(--space-16)', maxWidth: 820 }}
      >
        <span className="label-mono">Aller plus loin</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-2) 0 var(--space-3)' }}>Références</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          Une sélection courte des ouvrages et articles qui ont façonné le champ.
        </p>
        <ul style={{ marginTop: 'var(--space-8)', listStyle: 'none', padding: 0 }}>
          {references.map((r) => (
            <li key={r.id} style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{r.year}</div>
              <div style={{ marginTop: 'var(--space-1)', color: 'var(--text-primary)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>{r.title}</div>
              <div style={{ marginTop: 'var(--space-1)', color: 'var(--text-secondary)' }}>{r.author}</div>
              <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.blurb}</p>
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontSize: 'var(--text-sm)' }}>
                  Lire en ligne →
                </a>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Visit `/aller-plus-loin`. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(pages): add further reading page with curated references"
```

---

## Phase 6 — Polish

### Task 24: Page transition wrapper and reduced motion

**Files:**
- Create: `src/hooks/useReducedMotion.ts`

- [ ] **Step 1: Create `src/hooks/useReducedMotion.ts`**

```ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(a11y): add useReducedMotion hook for animation gating"
```

(The CSS reset already disables animations under `prefers-reduced-motion: reduce`. The hook is exposed for future fine-grained gates if needed.)

---

### Task 25: Mobile responsive sweep

**Files:**
- Modify: `src/components/Layout/Header.module.css` (already responsive)
- Modify: per-concept demo containers — adapt grids that have fixed two-column layouts

- [ ] **Step 1: Audit each page on a mobile viewport**

Run: `npm run dev`. Open Chrome DevTools, toggle device emulation to iPhone SE (375px wide). Visit:
- `/` — hub fallback list should appear, header wraps
- `/dilemme-prisonnier` — matrix and result panel must stack vertically
- `/equilibre-nash` — tab buttons wrap
- `/strategies-mixtes` — sliders panel and play panel stack
- `/dilemme-itere` — strategy chips wrap
- `/jeux-sequentiels` — tree fits without horizontal scroll past viewport
- `/biens-communs` — sliders panel and curve panel stack

For any that overflow, add `flexWrap: 'wrap'` or change grid columns at `@media (max-width: 768px)`.

- [ ] **Step 2: For each page that uses a two-column inline grid, replace** the fixed `gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)'` (or similar) with the responsive helper class below.

Add to `src/styles/globals.css`:
```css
.demoSplit {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
@media (max-width: 768px) {
  .demoSplit {
    grid-template-columns: 1fr;
  }
}
```

In `MixedStrategies.tsx` and `CommonsTragedy.tsx`, replace the outer demo `<div style={{ display: 'grid', gap: ..., gridTemplateColumns: ... }}>` with `<div className="demoSplit">`.

- [ ] **Step 3: Re-test on mobile viewport**

All pages should scroll vertically with no horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(responsive): collapse demo two-column grids to single column under 768px"
```

---

### Task 26: Final test pass and Lighthouse check

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: all tests pass. Note total count — should include tests from Tasks 7, 8, 9, 10, 12, 14, 16, 17, 19, 20, 21.

- [ ] **Step 2: Build production bundle**

Run: `npm run build`
Expected: build success, no warnings about chunk size that we haven't already accepted.

- [ ] **Step 3: Preview production build**

Run: `npm run preview`
Expected: site served at `http://localhost:4173`. Click through every route.

- [ ] **Step 4: Run Lighthouse manually**

In Chrome DevTools, on `http://localhost:4173/`, run a Lighthouse audit (Mobile, Performance + Accessibility + Best Practices). Aim:
- Performance ≥ 85
- Accessibility ≥ 95
- Best Practices ≥ 95

If any score is below target, fix the most impactful items reported (typically: image alt text, font preload, contrast). Stop the preview server.

- [ ] **Step 5: Final commit if any fixes were made**

```bash
git add -A
git commit -m "chore: final polish pass after Lighthouse audit"
```

- [ ] **Step 6: Push**

```bash
git push
```

---

## Self-Review Checklist (executed by the plan author)

**Spec coverage:**
- 6 concepts → Tasks 12, 14, 16, 17 (+18), 19, 20 ✅
- Hub cartographique → Task 21 ✅
- Glossary → Tasks 8, 22 ✅
- Aller plus loin → Task 23 ✅
- Tech-dark tokens → Task 4 ✅
- Anatomy 6 zones → Task 11 ✅
- KaTeX → Tasks 9, 13, 15, 16, 18, 19, 20 ✅
- Tests on `src/games/` → Tasks 7, 12, 14, 16, 17, 19, 20 ✅
- Responsive → Task 25 ✅
- Animations + reduced motion → Tasks 11, 21, 24 + reset.css ✅
- Build/deploy mention → Task 26 ✅

**Placeholder scan:** No "TBD"/"TODO"/"add appropriate" patterns; every code block is concrete.

**Type consistency:** `IteratedStrategy.decide(history, me)` signature is defined in Task 7 and used identically in Tasks 17, 18. `NormalFormGame` defined in Task 7, consumed by Tasks 10, 12, 14. `findPureNashEquilibria` defined in Task 14, used by Task 15. `runTournament` defined in Task 17, used by Task 18.

---

## Execution

Plan complete and saved to `docs/superpowers/plans/2026-05-10-game-theory-site.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints
