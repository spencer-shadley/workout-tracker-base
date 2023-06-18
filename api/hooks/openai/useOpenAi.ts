import axios from 'axios';
import { useDebugValue } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const textRoute = `/openai/text`;
const generateImageRoute = `/openai/generateImage`;

export interface useOpenAiOptions<T> {
prompt: string;
temperature?: number;
queryOptionOverrides?: UseQueryOptions<T>;
isPicture?: boolean;
skipCache?: boolean;
}

export function useOpenAi<T>({ prompt, temperature, queryOptionOverrides, isPicture, skipCache }: useOpenAiOptions<T>) {
  let queryOptions: UseQueryOptions<T> = {
    queryKey: [`openai`, prompt],
    queryFn: async () => {
      return axios.get(isPicture ? generateImageRoute : textRoute, {
        params: {
          prompt,
          temperature,
          skipCache
        }
      }).then(res => res.data);
    },
    cacheTime: ONE_DAY_IN_MS,
    staleTime: ONE_DAY_IN_MS,
  };

  queryOptions = { ...queryOptions, ...queryOptionOverrides };

  useDebugValue(queryOptions);

  return useQuery<T>(queryOptions);
}

