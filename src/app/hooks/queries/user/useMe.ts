import { useQuery } from '@tanstack/react-query';

import { UserService } from '@/app/services/UserService';

interface IUseMeParams {
  enabled?: boolean;
}

export function useMe(params?: IUseMeParams) {
  const { data, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: () => UserService.getMeDetails(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });
  return { me: data, loadMe: refetch };
}
