import { CreateCompletionRequest } from 'openai';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { askQuestion } from '@/api/askQuestion';
import { useDebugValue } from 'react';

interface useOpenAiProps {
  prompt: string;
  initialProps?: Partial<CreateCompletionRequest>;
  queryOptionOverrides?: UseQueryOptions<string>;
}

export function useOpenAi({
  prompt,
  initialProps,
  queryOptionOverrides,
}: useOpenAiProps) {
  const defaultQueryOptions: UseQueryOptions<string> = {
    queryKey: [prompt],
    queryFn: () => {
      initialProps = initialProps ?? {};
      initialProps.prompt = prompt;
      return askQuestion(initialProps);
    },
    cacheTime: 1000 * 60 * 60 * 24, // 1 day,
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
  };

  const queryOptions = {
    ...defaultQueryOptions,
    ...queryOptionOverrides,
  };

  useDebugValue(queryOptions);

  return useQuery<string>(queryOptions);
}
