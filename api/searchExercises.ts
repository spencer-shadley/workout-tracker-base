import { useOpenAi } from '@/components/api/openai';

export function responseToArray(response: string): string[] {
  return response.split(',').map((s) => s.trim());
}

export function useSearchExercises(search: string) {
  return useOpenAi({
    prompt: `Make me a workout with a focus on ${search}. It is very important ${search}. Return a comma separated list of exercises. Do not end with a period.`,
  });
}
