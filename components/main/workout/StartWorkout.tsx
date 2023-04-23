import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import ExerciseColumn from './exercise/ExerciseColumn';
import AutocompleteExercise from '@/components/shared/AutocompleteExercise';
import { Button, Paper } from '@mui/material';
import { createWorkoutContext } from './context/WorkoutContextProvider';

export default function StartWorkout() {
  const [exercises] = useState<ExerciseInfo[]>([]);

  const WorkoutContext = createWorkoutContext();

  return (
    <Paper sx={{ margin: 2, padding: 2 }} elevation={5}>
      <WorkoutContext.Provider value={{ exercises, title: 'Workout' }}>
        <AutocompleteExercise />
        {exercises.length === 0 ? (
          <>Add exercises to get started</>
        ) : (
          <>
            <ExerciseColumn title={'Exercises'} />
            <Button>Start workout</Button>
          </>
        )}
      </WorkoutContext.Provider>
    </Paper>
  );
}
