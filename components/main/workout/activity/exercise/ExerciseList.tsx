import { Grid } from '@mui/material';

import React, { createContext, useState } from 'react';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { makeRandomFakeExercises } from '@/api/data/MockExerciseInfo';

const mostRecentExercises: ExerciseInfo[] = makeRandomFakeExercises();
const mostUsedExercises: ExerciseInfo[] = [...mostRecentExercises];
const allExercises = [...mostRecentExercises, ...mostUsedExercises];
const uniqueExercises: Map<string, ExerciseInfo> = new Map();
for (const exercise of allExercises) {
  uniqueExercises.set(exercise.name, exercise);
}

export interface ExerciseContext {
  exercises: Map<string, ExerciseInfo>;
  removeExercise: (name: string) => void;
}

export const ExercisesContext = createContext<ExerciseContext>({
  exercises: new Map(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeExercise: () => {},
});

export default function DialogContent() {
  const [exercises, setExercises] =
    useState<Map<string, ExerciseInfo>>(uniqueExercises);

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        removeExercise: (exerciseName) => {
          exercises.delete(exerciseName);
          setExercises(exercises);
        },
      }}
    >
      <Grid container justifyContent="space-evenly" mt={2}>
        {/* TODO: delete */}
        {/* <ExerciseColumn title="Exercises" />
        <ExerciseColumn title="Workout" /> */}
      </Grid>
    </ExercisesContext.Provider>
  );
}
