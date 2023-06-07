import { AboutPersonKey } from '@/hooks/storage/useLocalStorage';

export interface ProfilePrompt {
  prompt: string;
  answer?: string;
  localStorageKey: AboutPersonKey;
}
