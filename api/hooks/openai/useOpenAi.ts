import axios from 'axios';
import { useDebugValue } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const openaiRoute = `/openai`;

export function useOpenAi(prompt: string) {
  const queryOptions: UseQueryOptions<string> = {
    queryKey: [`openai`, prompt],
    queryFn: async () => {
      return axios.get(openaiRoute, {
        params: {
          prompt
        }
      });
    },
    cacheTime: ONE_DAY_IN_MS,
    staleTime: ONE_DAY_IN_MS,
  };

  useDebugValue(queryOptions);

  return useQuery<string>(queryOptions);
}

