import { useLocalStorage } from 'usehooks-ts';

import { WorkoutOptions } from '@/components/settings/workout-options/WorkoutOptions';
import { particles } from '@/components/shared/backgrounds/backgroundsTypes';
import { logError } from '@/utils/logger';

const aiStyleKey = `ai-style`;
const optionsKey = `options`;
const backgroundKey = `background`;
const tutorialKey = `tutorial`;

export function useAiStyle() {
  return useLocalStorage(aiStyleKey, `Personal Trainer`);
}

export function getAiStyle(): string {
  return getItem<string>(aiStyleKey, `Personal Trainer`);
}

export function useBackgroundPreference() {
  return useLocalStorage<string>(backgroundKey, particles);
}

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
  return getItem<WorkoutOptions>(optionsKey, initialOptions);
}

export function tryParse<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    logError(e);
    return defaultValue;
  }
}

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === `undefined`) {
    return defaultValue;
  }

  const rawData = localStorage.getItem(key) ?? ``;
  return tryParse<T>(rawData, defaultValue);
}

// TODO: add tutorial throughout
export function useTutorial(key: string) {
  const [isFirstTime, setIsFirstTime] = useLocalStorage<boolean>(
    `${tutorialKey}-${key}`,
    true
  );
  return { isFirstTime, setIsFirstTime };
}
