import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import GlobalSuspense from '@/view/components/GlobalSuspense';

import { ROUTE_PATHS } from './constants/routePaths';

// Not Found
const NotFoundPage = lazy(() => import('@/view/pages/NotFound'));

// Layouts
const AuthLayout = lazy(() => import('@/view/pages/_Layouts/AuthLayout'));
const UserLayout = lazy(() => import('@/view/pages/_Layouts/UserLayout'));

// Auth
const LoginPage = lazy(() => import('@/view/pages/Auth/Login'));
const GoogleCallbackPage = lazy(() => import('@/view/pages/Auth/GoogleCallback'));
const GitHubCallbackPage = lazy(() => import('@/view/pages/Auth/GitHubCallback'));

// User
const HomePage = lazy(() => import('@/view/pages/User/Home'));
const RepositoriesPage = lazy(() => import('@/view/pages/User/Repositories'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<GlobalSuspense />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.googleCallback} element={<GoogleCallbackPage />} />
          <Route path={ROUTE_PATHS.githubCallback} element={<GitHubCallbackPage />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path={ROUTE_PATHS.userHome} element={<HomePage />} />
          <Route path={ROUTE_PATHS.userRepositories} element={<RepositoriesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
