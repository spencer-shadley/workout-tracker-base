import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Grid } from '@mui/material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { createContext, useState } from 'react';
import ExerciseColumn from './ExerciseColumn';
import { ExerciseColumnTypes } from '@/components/shared/ExerciseColumnTypes';
dayjs.extend(relativeTime);

// option to add

// TODO: create github issues
// TODO: add icons
// TODO: add badges / categories
// TODO: add filter
// TODO: add advanced search

// TODO: localstorage or db
const mostRecentExercises: ExerciseInfo[] = makeRandomFakeExercises();
const mostUsedExercises: ExerciseInfo[] = [...mostRecentExercises];
const allExercises = [...mostRecentExercises, ...mostUsedExercises];
const uniqueExercises: Map<string, ExerciseInfo> = new Map();
for (const exercise of allExercises) {
  uniqueExercises.set(exercise.name, exercise);
}

export interface ExerciseContext {
  exercises: Map<string, ExerciseInfo>;
  moveExercise: (exercise: ExerciseInfo, toColumn: ExerciseColumnTypes) => void;
  removeExercise: (name: string) => void;
}

export const ExercisesContext = createContext<ExerciseContext>({
  exercises: new Map(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  moveExercise: () => {},
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
        moveExercise: (exercise, toColumn) => {
          exercises.set(exercise.name, {
            ...exercise,
            currentColumn: toColumn,
          });
          setExercises(exercises);
        },
        removeExercise: (exerciseName) => {
          exercises.delete(exerciseName);
          setExercises(exercises);
        },
      }}
    >
      <Grid container justifyContent="space-evenly" mt={2}>
        <ExerciseColumn title="Exercises" />
        <ExerciseColumn title="Workout" />
      </Grid>
    </ExercisesContext.Provider>
  );
}
