import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GlossaryPage from './pages/GlossaryPage';
import FurtherReadingPage from './pages/FurtherReadingPage';
import NotFoundPage from './pages/NotFoundPage';
import WhichGamePage from './pages/WhichGamePage';
import GameSheetPage from './pages/GameSheetPage';
import PrisonersDilemmaPage from './pages/concepts/PrisonersDilemma';
import NashEquilibriumPage from './pages/concepts/NashEquilibrium';
import MixedStrategiesPage from './pages/concepts/MixedStrategies';
import IteratedPDPage from './pages/concepts/IteratedPD';
import SequentialGamesPage from './pages/concepts/SequentialGames';
import CommonsTragedyPage from './pages/concepts/CommonsTragedy';

export { CONCEPT_ROUTES } from './content/concepts';
export type { ConceptId } from './content/concepts';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/glossaire', element: <GlossaryPage /> },
  { path: '/aller-plus-loin', element: <FurtherReadingPage /> },
  { path: '/quel-jeu', element: <WhichGamePage /> },
  { path: '/quel-jeu/:gameId', element: <GameSheetPage /> },
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
