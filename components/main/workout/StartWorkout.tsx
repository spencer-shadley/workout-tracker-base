import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import {
  Autocomplete,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Exercises from './exercise/Exercises';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import { WorkoutProvider } from './context/WorkoutContextProvider';
import ExerciseCard from './exercise/ExerciseCard';

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
          noOptionsText="No exercises found"
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          onChange={(event, value) => {
            console.log(event);
            if (value) {
              // TODO: add DB
              const exercise = sampleExercises.find(
                (exercise) => exercise.name === value
              );
              if (exercise) {
                setExercises([...exercises, exercise]);
              }
            }
          }}
          renderOption={(props, exerciseName) => (
            <ExerciseOption
              exerciseName={exerciseName}
              handleClick={(exercise) => {
                console.log('clicked', exercise.name);
                setExercises([...exercises, exercise]);
              }}
            />
          )}
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

interface ExerciseOptionProps {
  exerciseName: string;
  handleClick: (exercise: ExerciseInfo) => void;
}

function ExerciseOption({ exerciseName, handleClick }: ExerciseOptionProps) {
  const exercise = sampleExercises.find(
    (exercise) => exercise.name === exerciseName
  );

  return exercise ? (
    <ExerciseCard
      exercise={exercise}
      isOver={false}
      shouldShowCloseButton={false}
      sx={{ margin: '10px' }}
      onClick={() => handleClick(exercise)}
    />
  ) : (
    <Typography>{exerciseName} could not be found</Typography>
  );
}
