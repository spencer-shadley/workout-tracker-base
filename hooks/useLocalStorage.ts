import { WorkoutOptions } from '@/components/main/workout/WorkoutOptions';
import { logError } from '@/utils/logger';
import { useLocalStorage } from 'usehooks-ts';

const aiStyleKey = 'ai-style';
const cachedResponsesKey = 'cached-responses';

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

export function getCachedResponse(prompt: string): string | null {
  const cachedResponses = getCachedResponses();
  const cachedResponse = cachedResponses.find(
    (cachedResponse) => cachedResponse.prompt === prompt
  );
  const response = cachedResponse?.response ?? null;
  return response;
}

function getCachedResponses(): ResponseCacheItem[] {
  return getItem<ResponseCacheItem[]>(cachedResponsesKey, []);
}

export function addCachedResponse(prompt: string, response: string) {
  const cachedResponses = getCachedResponses();
  cachedResponses.push({ prompt, response });
  localStorage.setItem(cachedResponsesKey, JSON.stringify(cachedResponses));
}

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const rawData = localStorage.getItem(key) ?? '';
  return tryParse<T>(rawData, defaultValue);
}

interface ResponseCacheItem {
  prompt: string;
  response: string;
}
