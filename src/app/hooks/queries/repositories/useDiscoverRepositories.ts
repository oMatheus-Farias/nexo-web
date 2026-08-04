import { useQuery } from '@tanstack/react-query';

import { RepositoryService } from '@/app/services/RepositoryService';

interface IUseDiscoverRepositoriesParams {
  enabled?: boolean;
}

export function useDiscoverRepositories(params?: IUseDiscoverRepositoriesParams) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['repositories-discover'],
    queryFn: () => RepositoryService.discoverRepositories(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });

  return {
    discoveredRepositories: data?.repositories ?? [],
    isFetchingDiscoveredRepositories: isFetching,
    refetchDiscoveredRepositories: refetch,
  };
}
