import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '../layout/AppLayout';
import { appRoutes } from './appRoutes';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/search' replace />,
      },
      ...appRoutes,
    ],
  },
]);
