import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE_PATHS } from '@/app/constants/routePaths';
import { useAuth } from '@/app/contexts/auth/useAuth';

export function useGoogleCallbackContainer() {
  const { loginWithGoogleCallback } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = searchParams.get('refreshToken');

    if (refreshToken) {
      loginWithGoogleCallback({ refreshToken });
      navigate(ROUTE_PATHS.userHome);
    } else {
      navigate(ROUTE_PATHS.login);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate]);
}
