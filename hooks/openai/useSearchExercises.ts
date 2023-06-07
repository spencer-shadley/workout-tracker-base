import { useOpenAi } from '@/api/hooks/openai/useOpenAi';

import { getProfileList } from '../storage/useLocalStorage';

export function responseToArray(response: string): string[] {
  return response.split(`,`).map((s) => s.trim());
}

export function useSearchExercises(search: string) {
  return useOpenAi({
    prompt: `Make me a workout with a focus on ${search}. 
    It is very important ${search}. 
    Here is some information about me to keep in mind: ${getProfileList()}. 
    Return a comma separated list of exercises. 
    Do not end with a period.`,
    queryOptionOverrides: {
      enabled: !!search,
    }
  });
}
