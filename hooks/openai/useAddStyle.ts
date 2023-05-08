import { useAiStyle } from '../storage/useLocalStorage';

export function useAddStyle(prompt: string): string {
  const [aiStyle] = useAiStyle();
  return `${prompt}. Answer in the style of ${aiStyle}`;
}
