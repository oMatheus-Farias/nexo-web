import { useQuery } from '@tanstack/react-query';

import { GitHubService } from '@/app/services/GitHubService';

interface IUseGetGitHubRepositoriesParams {
  enabled?: boolean;
}

export function useGetGitHubRepositories(params?: IUseGetGitHubRepositoriesParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['github-repositories'],
    queryFn: () => GitHubService.getGitHubRepositories(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });

  return {
    githubRepositories: data?.repositories,
    isFetchingGitHubRepositories: isFetching,
    refetch,
  };
}
