import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import { Autocomplete, Button, Paper, TextField } from '@mui/material';
import Exercises from './exercise/Exercises';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import { WorkoutProvider } from './context/WorkoutContextProvider';

export default function StartWorkout() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);

  return (
    <Paper sx={{ margin: 2, padding: 2 }} elevation={5}>
      <WorkoutProvider
        workoutContext={{
          exercises,
          title: 'Workout',
          removeExercise: (exerciseName) => {
            setExercises(
              exercises.filter((exercise) => exercise.name !== exerciseName)
            );
          },
        }}
      >
        <Autocomplete
          fullWidth
          freeSolo
          onChange={(event, value) => {
            setExercises([...exercises, sampleExercises[0]]);
            console.log('value', value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="Find an exercise..."
              type="search"
            />
          )}
          options={sampleExercises.map((exercise) => exercise.name)}
        />
        {exercises.length === 0 ? (
          <>Add exercises to get started</>
        ) : (
          <>
            <Exercises />
            <Button>Start workout</Button>
          </>
        )}
      </WorkoutProvider>
    </Paper>
  );
}
