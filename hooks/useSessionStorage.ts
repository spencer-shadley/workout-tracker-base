/**
 * Information about the session -
 * essentially anything that is relevant across pages.
 *
 * Things only relevant to a particular page should
 * be stored in a relevant React Context instead
 */

import { WorkoutOptions } from '@/components/main/workout/WorkoutOptions';
import { useSessionStorage } from 'usehooks-ts';

const selectedExercisesKey = 'selected-exercises';
const optionsKey = 'options';

const initialOptions: WorkoutOptions = {
  numberOfRounds: 3,
  restBetweenRoundsInSeconds: 90,
  restBetweenExercisesInSeconds: 15,
  exerciseDurationInSeconds: 45,
};

export function useSelectedExercises() {
  return useSessionStorage<string[]>(selectedExercisesKey, []);
}

export function useOptions() {
  return useSessionStorage<WorkoutOptions>(optionsKey, initialOptions);
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
