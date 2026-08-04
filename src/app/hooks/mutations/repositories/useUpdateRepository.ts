import { useMutation } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

export function useUpdateRepository() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      repositoryId,
      payload,
    }: {
      repositoryId: string;
      payload: RepositoryService.UpdateRepositoryPayload;
    }) => RepositoryService.updateRepository(repositoryId, payload),
  });

  return { updateRepositoryFn: mutateAsync, isUpdateRepositoryPending: isPending };
}
