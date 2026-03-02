import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTE_PATHS } from './constants/routePaths';

// Layouts
const LoginLayout = lazy(() => import('@/view/pages/_Layouts/LoginLayout'));

// Login
const LoginPage = lazy(() => import('@/view/pages/Login'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
