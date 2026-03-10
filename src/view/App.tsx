import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/app/contexts/auth/AuthContext';
import { queryClient } from '@/app/lib/queryClient';
import AppRoutes from '@/app/routes';

import { Toaster } from './components/ui/Sonner';
import { ErrorBoundary } from './pages/ErrorBoundary';
import ErrorBoundaryFallback from './pages/ErrorBoundary/components/ErrorboundaryFallback';

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
            <Toaster richColors={true} position="bottom-right" duration={6000} theme="dark" />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
