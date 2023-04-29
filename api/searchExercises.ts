import { askQuestion } from '@/components/api/openai';
import { reject } from 'lodash';

function responseToArray(response: string): string[] {
  return response.split(',').map((s) => s.trim());
}

export default function searchExercises(search: string): Promise<string[]> {
  return new Promise<string[]>((resolve) => {
    return askQuestion({
      prompt: `Make me a workout with a focus on ${search}. It is very important ${search}. Return a comma separated list of exercises.`,
    }).then((response) => {
      if (response) resolve(responseToArray(response));
      else reject('could not find any exercises');
    });
  });
}

export function searchExercisesOld(searchText: string) {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([searchText, 'exercise 1', 'exercise 2']);
    }, 500);
  });
}
