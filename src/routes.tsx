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
