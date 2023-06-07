import { useLocalStorage } from 'usehooks-ts';

import { WorkoutOptions } from '@/components/settings/workout-options/WorkoutOptions';
import { particles } from '@/components/shared/backgrounds/backgroundsTypes';
import { logError } from '@/utils/logger';

const aiStyleKey = `ai-style`;
const optionsKey = `options`;
const backgroundKey = `background`;
const firstTimeWelcomeKey = `first-time-welcome`;

export type UsageState = `initial` | `about` | `settings` | `complete`

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

export function useTutorialStage() {
  return useLocalStorage<UsageState>(firstTimeWelcomeKey, `initial`);
}

export function getTutorialStage(): UsageState {
  return getItem<UsageState>(firstTimeWelcomeKey, `initial`);
}

export function setTutorialStage(stage: UsageState) {
  localStorage.setItem(firstTimeWelcomeKey, stage);
}

export type ProfileKeyType = `age` | `weight` | `height` | `goals` | `conditions` | `equipment` | `workout experience level` | `anything else?`;

export const profilePromptMap = new Map<ProfileKeyType, string>([
  [`age`, ``],
  [`weight`, `Make sure to include the units (e.g. 150 lbs or 68kg).`],
  [`height`, `Make sure to include the units (e.g. 5'10" or 178cm).`],
  [`goals`, `What are your fitness goals?`],
  [`conditions`, `Do you have any medical conditions that may affect your ability to exercise?`],
  [`equipment`, `What equipment do you have access to?`],
  [`workout experience level`, `How much experience do you have with exercising?`],
  [`anything else?`, ``],
]);

function getProfileKey(key: ProfileKeyType) {
  return `profile-${key}`;
}

export function useProfileLocalStorage(key: ProfileKeyType) {
  const aboutPersonKey = getProfileKey(key);
  return useLocalStorage<string | undefined>(aboutPersonKey, undefined);
}

export function getProfileList() {
  let settingsText = ``;
  profilePromptMap.forEach((value, key) => {
    const answer = localStorage.getItem(getProfileKey(key));
    if (answer && answer !== `undefined`) {
      settingsText += `${key}: ${answer}, `;
    }
  });
  return settingsText.substring(0, settingsText.length - 2);
}
