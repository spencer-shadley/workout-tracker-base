/**
 * Information about the session -
 * essentially anything that is relevant across pages.
 *
 * Things only relevant to a particular page should
 * be stored in a relevant React Context instead
 */

import { useSessionStorage } from 'usehooks-ts';
import { tryParse } from './useLocalStorage';

const selectedExercisesKey = 'selected-exercises';

export function useSelectedExercises() {
  return useSessionStorage<string[]>(selectedExercisesKey, []);
}

export function useAddExerciseName(exerciseName: string) {
  const [selectedExercises, setSelectedExercises] = useSelectedExercises();

  return () => {
    setSelectedExercises([...selectedExercises, exerciseName]);
  };
}

export function useRemoveExerciseName(exerciseName: string) {
  const [selectedExercises, setSelectedExercises] = useSelectedExercises();

  return () => {
    const filteredExercises = selectedExercises.filter(
      (name) => name !== exerciseName
    );
    setSelectedExercises(filteredExercises);
  };
}

export function getExerciseNames(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const rawExerciseNames = sessionStorage.getItem(selectedExercisesKey) ?? '';
  return tryParse<string[]>(rawExerciseNames, []);
}
