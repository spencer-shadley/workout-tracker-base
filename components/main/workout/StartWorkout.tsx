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
import WorkoutOptionsDialog from './WorkoutOptionsDialog';

export default function StartWorkout() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  const [isWorkoutOptionsDialogOpen, setIsWorkoutOptionsDialogOpen] =
    useState<boolean>(false);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Paper
        sx={{
          margin: 2,
          padding: 2,
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={5}
      >
        <Typography variant="h4" sx={{ alignSelf: 'center' }}>
          Create a workout
        </Typography>
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
              <Button onClick={() => setIsWorkoutOptionsDialogOpen(true)}>
                Start workout
              </Button>
            </>
          )}
        </WorkoutProvider>
      </Paper>
      <WorkoutOptionsDialog
        isOpen={isWorkoutOptionsDialogOpen}
        close={() => setIsWorkoutOptionsDialogOpen(false)}
      />
    </div>
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
