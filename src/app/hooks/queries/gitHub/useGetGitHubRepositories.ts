import { useQuery } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

interface IUseGetGitHubRepositoriesParams {
  enabled?: boolean;
}

export function useGetGitHubRepositories(
  payload: RepositoryService.GetRepositoriesPayload,
  params?: IUseGetGitHubRepositoriesParams,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['github-repositories', payload],
    queryFn: () => RepositoryService.getRepositories(payload),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });

  return {
    githubRepositories: data?.repositories,
    githubRepositoriesMeta: data?.meta,
    isFetchingGitHubRepositories: isFetching,
    refetch,
  };
}
