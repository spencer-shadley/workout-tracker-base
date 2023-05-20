import { useDebugValue } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export enum Routes {
    fitnessImportant = `/openai/quote/why-is-fitness-important`,
}

export function useOpenAi(route: Routes) {
  const queryOptions: UseQueryOptions<string> = {
    queryKey: route.split(`/`),
    queryFn: async () => {
      return (await fetch(route)).text();
    },
    cacheTime: ONE_DAY_IN_MS,
    staleTime: ONE_DAY_IN_MS,
  };

  useDebugValue(queryOptions);

  return useQuery<string>(queryOptions);
}
