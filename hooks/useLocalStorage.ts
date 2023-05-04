import { useLocalStorage } from 'usehooks-ts';

function makeLocalStorageKey(key: string) {
  return `ai-workout-${key}`;
}

const aiStyleKey = makeLocalStorageKey('ai-style');

export function useAiStyle() {
  return useLocalStorage(aiStyleKey, 'Personal Trainer');
}
