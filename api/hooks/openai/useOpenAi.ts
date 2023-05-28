import axios from 'axios';
import { useDebugValue } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const textRoute = `/openai/text`;
const generateImageRoute = `/openai/generateImage`;

export interface useOpenAiOptions {
prompt: string;
temperature?: number;
queryOptionOverrides?: UseQueryOptions<string>;
isPicture?: boolean;
}

export function useOpenAi({ prompt, temperature, queryOptionOverrides, isPicture }: useOpenAiOptions) {
  let queryOptions: UseQueryOptions<string> = {
    queryKey: [`openai`, prompt],
    queryFn: async () => {
      return axios.get(isPicture ? generateImageRoute : textRoute, {
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

