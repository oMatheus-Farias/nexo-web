import { useQuery } from '@tanstack/react-query';

import { GitHubService } from '@/app/services/GitHubService';

interface IUseGetGitHubRepositoriesParams {
  enabled?: boolean;
}

export function useGetGitHubRepositories(
  payload: GitHubService.GetGitHubRepositoriesPayload,
  params?: IUseGetGitHubRepositoriesParams,
) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['github-repositories', payload],
    queryFn: () => GitHubService.getGitHubRepositories(payload),
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
