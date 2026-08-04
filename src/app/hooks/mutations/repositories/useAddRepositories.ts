import { useMutation } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

export function useAddRepositories() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: RepositoryService.addRepositories,
  });

  return { addRepositoriesFn: mutateAsync, isAddRepositoriesPending: isPending };
}
