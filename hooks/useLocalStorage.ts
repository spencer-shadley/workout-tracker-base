import { WorkoutOptions } from '@/components/main/workout/WorkoutOptions';
import { logError } from '@/utils/logger';
import { useLocalStorage } from 'usehooks-ts';

const aiStyleKey = 'ai-style';

export function useAiStyle() {
  return useLocalStorage(aiStyleKey, 'Personal Trainer');
}

const optionsKey = 'options';

const initialOptions: WorkoutOptions = {
  numberOfRounds: 3,
  restBetweenRoundsInSeconds: 90,
  restBetweenExercisesInSeconds: 15,
  exerciseDurationInSeconds: 45,
};

export function useOptions() {
  return useLocalStorage<WorkoutOptions>(optionsKey, initialOptions);
}

export function getOptions(): WorkoutOptions {
  if (typeof window === 'undefined') {
    return initialOptions;
  }

  const rawOptions = localStorage.getItem(optionsKey) ?? '';
  return tryParse<WorkoutOptions>(rawOptions, initialOptions);
}

export function tryParse<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    logError(e);
    return defaultValue;
  }
}
