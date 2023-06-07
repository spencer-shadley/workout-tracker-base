import { useOpenAi } from '@/api/hooks/openai/useOpenAi';

import { getProfileList } from '../storage/useLocalStorage';

export function parseResponse(response: ExerciseResponseInfo[]): ExerciseResponseInfo[] {
  return response ?? [{
    exerciseName: `Error, please try again.`,
    muscleGroups: [],
  }];
}

export interface ExerciseResponseInfo {
  exerciseName: string;
  muscleGroups: string[];
}

const exampleResponse: ExerciseResponseInfo[] = [
  {
    exerciseName: `Pushups`,
    muscleGroups: [`Chest`, `Triceps`, `Shoulders`]
  },
  {
    exerciseName: `Pullups`,
    muscleGroups: [`Back`, `Biceps`, `Forearms`]
  },
];

export function useSearchExercises(search: string) {
  return useOpenAi<ExerciseResponseInfo[]>({
    prompt: `Give me a collection of exercises relevant to "${search}" for a workout. 
    Here is some information about me to keep in mind for the workout: ${getProfileList()}. 
    Do not include a disclaimer about the limitations of an AI language model.
    Only respond with a JSON array of objects like this: ${JSON.stringify(exampleResponse)}.`,
    queryOptionOverrides: {
      enabled: !!search,
    }
  });
}
