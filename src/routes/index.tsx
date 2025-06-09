import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { Layout } from '@/components/layout';

const EmployeesPage = lazy(() => import('@/routes/Employees'));
const EmployeePage = lazy(() => import('@/routes/Employee'));

export const router = createBrowserRouter([
  {
    path: ROUTES.EMPLOYEES,
    element: <Layout />,
    children: [
      {
        path: ROUTES.EMPLOYEES,
        element: <EmployeesPage />,
      },
      {
        path: ROUTES.EMPLOYEE,
        element: <EmployeePage />,
      },
    ],
  },
  // {
  //   path: ROUTES.LOGIN,
  //   lazy: () => import('@/features/auth/login.page'),
  // },
  // {
  //   path: ROUTES.REGISTER,
  //   lazy: () => import('@/features/auth/register.page'),
  // },
  {
    path: ROUTES.HOME,
    loader: () => redirect(ROUTES.EMPLOYEES),
  },
  //   {
  //     path: '*',
  //     element: <NotFoundPage />,
  //   },
]);
