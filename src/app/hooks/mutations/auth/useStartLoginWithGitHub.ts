import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/app/services/AuthService';

export function useStartLoginWithGitHub() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.startLoginInWithGitHub,
  });

  return { startLoginWithGitHubFn: mutateAsync, isStartLoginWithGitHubPending: isPending };
}
