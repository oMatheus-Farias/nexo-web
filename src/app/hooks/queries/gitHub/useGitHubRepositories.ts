import { useQuery } from '@tanstack/react-query';

import { GitHubService } from '@/app/services/GitHubService';

interface IUseGitHubRepositoriesParams {
  enabled?: boolean;
}

export function useGitHubRepositories(params?: IUseGitHubRepositoriesParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['github-installation-repositories'],
    queryFn: () => GitHubService.getGitHubRepositories(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });

  return {
    githubRepositories: data?.repositories ?? [],
    isFetchingGitHubRepositories: isFetching,
    refetchGitHubRepositories: refetch,
  };
}
