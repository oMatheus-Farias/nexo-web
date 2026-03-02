import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTE_PATHS } from './constants/routePaths';

// Layouts
const LoginLayout = lazy(() => import('@/view/pages/_Layouts/LoginLayout'));
const UserLayout = lazy(() => import('@/view/pages/_Layouts/UserLayout'));

// Login
const LoginPage = lazy(() => import('@/view/pages/Login'));

// User
const HomePage = lazy(() => import('@/view/pages/User/Home'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path={ROUTE_PATHS.userHome} element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
