import { CreateCompletionRequest } from 'openai';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { askQuestion } from '@/api/askQuestion';

export function useOpenAi(
  initialProps: Partial<CreateCompletionRequest>,
  queryOptionOverrides?: UseQueryOptions<string>
) {
  if (!initialProps.prompt) throw new Error('Prompt is required');

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
