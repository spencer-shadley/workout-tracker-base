import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Grid } from '@mui/material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ExerciseColumn from './ExerciseColumn';
dayjs.extend(relativeTime);

// list of past exercises
// top 5 most recent, filtered as you type
// top 5 most used

// option to add

// TODO: create github issues
// TODO: add icons
// TODO: add badges / categories
// TODO: add filter
// TODO: add advanced search

const numberOfTopExercises = 5;

// TODO: localstorage or db
const mostRecentExercises: ExerciseInfo[] = makeRandomFakeExercises();
const mostUsedExercises: ExerciseInfo[] = [...mostRecentExercises];
const allExercises = [...mostRecentExercises, ...mostUsedExercises];
const uniqueExercises: Set<ExerciseInfo> = new Set([...allExercises]);

export default function DialogContent() {
  return (
    <Grid container justifyContent="space-evenly" mt={2}>
      <ExerciseColumn
        title="Exercises"
        initialExercises={[...uniqueExercises].slice(0, 5)}
      />
      <ExerciseColumn
        title="Workouts"
        initialExercises={[...uniqueExercises].slice(0, 3)}
      />
    </Grid>
  );
}
