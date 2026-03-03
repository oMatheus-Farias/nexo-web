import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/services/AuthService';

export function useSignOut() {
  const { mutateAsync } = useMutation({
    mutationFn: AuthService.signOut,
  });

  return { signOutFn: mutateAsync };
}
