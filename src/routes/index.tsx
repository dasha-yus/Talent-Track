import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { Layout } from '@/components/layout';

const LoginPage = lazy(() => import('@/routes/Auth/Login'));
const RegisterPage = lazy(() => import('@/routes/Auth/Register'));
const EmployeesPage = lazy(() => import('@/routes/Employees'));
const EmployeePage = lazy(() => import('@/routes/Employee'));
const HiringPage = lazy(() => import('@/routes/Hiring'));
const NotFoundPage = lazy(() => import('@/routes/NotFound'));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.EMPLOYEES} replace />,
      },
      {
        path: ROUTES.EMPLOYEES,
        element: <EmployeesPage />,
      },
      {
        path: ROUTES.EMPLOYEE,
        element: <EmployeePage />,
      },
      {
        path: ROUTES.HIRING,
        element: <HiringPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
