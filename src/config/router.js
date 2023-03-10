import { createHashRouter, Outlet } from 'react-router-dom';

import PageLayout from '../components/PageLayout';

import CharacterPage from '../pages/CharacterPage';
import ErrorPage from '../pages/ErrorPage';
import LandingPage from '../pages/LandingPage';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <PageLayout><Outlet /></PageLayout>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: 'characters/:char',
          element: <CharacterPage />,
        },
      ],
    },
  ],
);

export default router;
