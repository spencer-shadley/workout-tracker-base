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

  exerciseName = useUniqueName(exerciseName);

  return () => {
    setSelectedExercises([...selectedExercises, exerciseName]);
  };
}

export function useRemoveExerciseName(exerciseName: string) {
  const [selectedExercises, setSelectedExercises] = useSelectedExercises();

  return () => {
    const filteredExercises = selectedExercises.filter(
      (name) => !isMatch(name, exerciseName)
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

function isNameTaken(name: string, names: string[]) {
  return names.includes(name);
}

function makeName(name: string, index: number) {
  return index === 0 ? name : `${name} (${index})`;
}

function useUniqueName(exerciseName: string) {
  const [selectedExercises] = useSelectedExercises();
  let index = 0;
  while (isSelectedExercise(exerciseName, index, selectedExercises)) {
    ++index;
  }

  return makeName(exerciseName, index);
}

function isSelectedExercise(exerciseName: string, index: number, selectedExercises: string[]) {
  return isNameTaken(makeName(exerciseName, index), selectedExercises);
}

export function isMatch(itemInCartName: string, newItem: string) {
  if (itemInCartName === newItem) {
    return true;
  }

  const duplicateAdditionRegex = new RegExp(`${newItem} \\(\\d+\\)`);
  return duplicateAdditionRegex.test(itemInCartName);

}
