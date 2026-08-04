import { useMutation } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

export function useSyncRepository() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (repositoryId: string) => RepositoryService.syncRepository(repositoryId),
  });

  return { syncRepositoryFn: mutateAsync, isSyncRepositoryPending: isPending };
}
