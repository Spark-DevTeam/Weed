import { Layout } from '@components/layout';
import { useRoutes } from 'react-router-dom';

import { Friends, GamePage, Leaderboard, Main, Tasks } from '@/pages';
import { ROUTES } from '@/utils/';

export const PageRouter = () =>
  useRoutes([
    {
      path: ROUTES.home,
      element: <Layout />,
      children: [
        { index: true, element: <Main /> },
        { path: ROUTES.leaderboard, element: <Leaderboard /> },
        { path: ROUTES.tasks, element: <Tasks /> },
        { path: ROUTES.friends, element: <Friends /> },
      ],
    },
    { path: ROUTES.game, element: <GamePage /> },
  ]);
