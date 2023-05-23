import axios from 'axios';

import { ONE_DAY_IN_MS } from '@/api/hooks/openai/useOpenAi';
import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useYoutube(shouldEnable: boolean) {
  const { exerciseName } = useExerciseContext();
  const queryOptions: UseQueryOptions<string> = {
    queryKey: [`youtube`, exerciseName],
    queryFn: async () => {
      const res = await axios.get(`/api/youtube`, {
        params: {
          exercise: exerciseName
        }
      });
      return res.data;
    },
    cacheTime: ONE_DAY_IN_MS,
    staleTime: ONE_DAY_IN_MS,
    enabled: shouldEnable
  };

  return useQuery<string>(queryOptions);
}
