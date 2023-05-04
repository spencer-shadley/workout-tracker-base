function getLocalStorageItem(key: string) {
  return localStorage.getItem(key);
}

function setLocalStorageItem(key: string, item: unknown) {
  const itemString = typeof item === 'string' ? item : JSON.stringify(item);
  localStorage.setItem(key, itemString);
}

function makeLocalStorageKey(key: string) {
  return `ai-workout-${key}`;
}

const aiStyleKey = makeLocalStorageKey('ai-style');

export function getLocalStorageAiStyle(): string | null {
  return getLocalStorageItem(aiStyleKey);
}

export function setLocalStorageAiStyle(style: string) {
  setLocalStorageItem(aiStyleKey, style);
}
