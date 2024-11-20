import { useRoutes } from 'react-router-dom';
import { Layout } from '@components/layout';
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
        { path: '*', element: <Main /> }, // Перенаправление на главную
      ],
    },
    { path: ROUTES.game, element: <GamePage /> },
  ]);
