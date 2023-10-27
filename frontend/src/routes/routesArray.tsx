import { RouteObject } from 'react-router-dom';

import BaseLayout from '../layouts/BaseLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    element: [<BaseLayout />],
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        index: true,
        element: <NotFound />,
      },
    ],
  },
];
