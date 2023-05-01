import { CreateCompletionRequest } from 'openai';
import { askQuestion } from './askQuestion';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useOpenAi(
  initialProps: Partial<CreateCompletionRequest>,
  queryOptionOverrides?: UseQueryOptions<string>
) {
  const defaultQueryOptions: UseQueryOptions<string> = {
    queryKey: [initialProps.prompt],
    queryFn: () => askQuestion(initialProps),
    cacheTime: 1000 * 60 * 60 * 24, // 1 day,
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
    suspense: true,
  };

  return useQuery<string>({
    ...defaultQueryOptions,
    ...queryOptionOverrides,
  });
}
