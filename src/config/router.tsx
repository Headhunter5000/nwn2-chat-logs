import { Suspense } from 'react';
import { createHashRouter, Outlet } from 'react-router';

import PageLoader from '../components/common/PageLoader';
import Page from '../components/layout/Page';
import ErrorPage from '../pages/ErrorPage';

import { CharacterPage, LandingPage } from '../pages';

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Page>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Page>
    ),
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
]);
 
export default router;