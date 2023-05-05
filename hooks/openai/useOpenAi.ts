import { CreateCompletionRequest } from 'openai';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { askQuestion } from '@/api/askQuestion';
import useSWR from 'swr';
import { useDebugValue, useState } from 'react';

interface useOpenAiProps {
  initialProps: Partial<CreateCompletionRequest>;
  queryOptionOverrides?: UseQueryOptions<string>;
  shouldSkipFetch?: boolean;
}

export function useOpenAi({
  initialProps,
  queryOptionOverrides,
  shouldSkipFetch,
}: useOpenAiProps) {
  console.log('useOpenAi', initialProps);
  if (!initialProps.prompt) throw new Error('Prompt is required');
  console.log('useOpenAi after error');

  const defaultQueryOptions: UseQueryOptions<string> = {
    queryKey: [initialProps.prompt],
    queryFn: () => {
      if (shouldSkipFetch) {
        return Promise.resolve('');
      }
      return askQuestion(initialProps);
    },
    cacheTime: 1000 * 60 * 60 * 24, // 1 day,
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
    suspense: true,
  };

  console.log(
    'useOpenAi after defaultQueryOptions',
    defaultQueryOptions,
    queryOptionOverrides
  );
  return useQuery<string>({
    ...defaultQueryOptions,
    ...queryOptionOverrides,
  });
}

interface useOpenAiProps {
  initialProps: Partial<CreateCompletionRequest>;
}

export function useOpenAiWithSWR(
  prompt: string | null,
  initialProps: Partial<CreateCompletionRequest> = {}
) {
  initialProps.prompt = prompt;
  return useSWR(prompt, () => askQuestion(initialProps), {
    suspense: true,
    dedupingInterval: 1000 * 60 * 60 * 24, // 1 day,
  });
}

export function useManualAskQuestion(
  prompt: string | null,
  initialProps: Partial<CreateCompletionRequest> = {}
) {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  initialProps.prompt = prompt;

  setIsLoading(true);
  askQuestion(initialProps)
    .then((response) => {
      setData(response);
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });

  const result = {
    data,
    isLoading,
    error,
  };

  useDebugValue(result);

  return result;
}
