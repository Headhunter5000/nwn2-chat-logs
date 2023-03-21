import { createHashRouter, Outlet } from 'react-router-dom';

import Page from '../components/layout/Page';
import CharacterPage from '../pages/CharacterPage';
import ErrorPage from '../pages/ErrorPage';
import LandingPage from '../pages/LandingPage';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Page><Outlet /></Page>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: 'characters/:char/:date?/:index?',
          element: <CharacterPage />,
        },
      ],
    },
  ],
);

export default router;
