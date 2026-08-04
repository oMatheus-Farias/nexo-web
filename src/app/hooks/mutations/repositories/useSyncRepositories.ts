import { useMutation } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

export function useSyncRepositories() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: RepositoryService.syncRepositories,
  });

  return { syncRepositoriesFn: mutateAsync, isSyncRepositoriesPending: isPending };
}
