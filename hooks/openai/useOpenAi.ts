import { CreateCompletionRequest } from 'openai';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { askQuestion } from '@/api/askQuestion';
import { useDebugValue, useState } from 'react';

interface useOpenAiProps {
  initialProps: Partial<CreateCompletionRequest>;
  queryOptionOverrides?: UseQueryOptions<string>;
}

export function useOpenAi({
  initialProps,
  queryOptionOverrides,
}: useOpenAiProps) {
  if (!initialProps.prompt) throw new Error('Prompt is required');

  const defaultQueryOptions: UseQueryOptions<string> = {
    queryKey: [initialProps.prompt],
    queryFn: () => {
      return askQuestion(initialProps);
    },
    cacheTime: 1000 * 60 * 60 * 24, // 1 day,
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
  };

  return useQuery<string>({
    ...defaultQueryOptions,
    ...queryOptionOverrides,
  });
}

interface useOpenAiProps {
  initialProps: Partial<CreateCompletionRequest>;
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
