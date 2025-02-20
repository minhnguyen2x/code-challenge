import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const RQ_CONFIG: DefaultOptions = {
  queries: {
    enabled: true,
    retry: 0,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: true,
  },
  mutations: {},
};

export const queryClient = new QueryClient({ defaultOptions: RQ_CONFIG });
