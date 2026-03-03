import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/services/AuthService';

export function useStartLoginWithGoogle() {
  const { mutateAsync } = useMutation({
    mutationFn: AuthService.startLoginInWithGoogle,
  });

  return { startLoginWithGoogleFn: mutateAsync };
}
