import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import ExerciseColumn from './exercise/ExerciseColumn';
import AutocompleteExercise from '@/components/shared/AutocompleteExercise';
import { Button, Paper } from '@mui/material';

export default function StartWorkout() {
  const [exercises] = useState<ExerciseInfo[]>([]);

  return (
    <Paper sx={{ margin: 2, padding: 2 }} elevation={5}>
      <AutocompleteExercise />
      {exercises.length === 0 ? (
        <>Add exercises to get started</>
      ) : (
        <>
          <ExerciseColumn title={'Exercises'} />
          <Button>Start workout</Button>
        </>
      )}
    </Paper>
  );
}
