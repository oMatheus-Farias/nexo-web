import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/services/AuthService';

export function useRefreshToken() {
  const { mutateAsync } = useMutation({
    mutationFn: AuthService.refreshToken,
  });

  return { refreshTokenFn: mutateAsync };
}
