import { CreateCompletionRequest } from 'openai';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { askQuestion } from '@/api/askQuestion';

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
  if (!initialProps.prompt) throw new Error('Prompt is required');

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

  return useQuery<string>({
    ...defaultQueryOptions,
    ...queryOptionOverrides,
  });
}
