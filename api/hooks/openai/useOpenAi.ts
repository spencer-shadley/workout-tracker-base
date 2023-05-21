import axios from 'axios';
import { useDebugValue } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const openaiRoute = `/openai`;

export function useOpenAi(prompt: string, temperature?: number, queryOptionOverrides?: UseQueryOptions<string>) {
  let queryOptions: UseQueryOptions<string> = {
    queryKey: [`openai`, prompt],
    queryFn: async () => {
      return axios.get(openaiRoute, {
        params: {
          prompt,
          temperature
        }
      }).then(res => res.data);
    },
    cacheTime: ONE_DAY_IN_MS,
    staleTime: ONE_DAY_IN_MS,
  };

  queryOptions = { ...queryOptions, ...queryOptionOverrides };

  useDebugValue(queryOptions);

  return useQuery<string>(queryOptions);
}

