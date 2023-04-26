import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ActivitiesList from './activity/ActivitiesList';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import { WorkoutProvider } from './context/WorkoutContextProvider';
import WorkoutOptionsDialog from './WorkoutOptionsDialog';
import ActivityOption from './activity/ActivityOption';

export default function StartWorkout() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  const [isWorkoutOptionsDialogOpen, setIsWorkoutOptionsDialogOpen] =
    useState<boolean>(false);

  return (
    <WorkoutProvider
      workoutContext={{
        exercises,
        removeExercise: (exerciseName) => {
          setExercises(
            exercises.filter((exercise) => exercise.name !== exerciseName)
          );
        },
      }}
    >
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

          <Autocomplete
            fullWidth
            noOptionsText="No exercises found"
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            onChange={(event, value) => {
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
            renderOption={(props, exercise) => (
              <ActivityOption
                exercise={exercise}
                handleClick={(exercise) => {
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
            options={sampleExercises}
          />
          <Divider />
          {exercises.length === 0 ? (
            <>Add exercises to get started</>
          ) : (
            <>
              <ActivitiesList />
              <Button onClick={() => setIsWorkoutOptionsDialogOpen(true)}>
                Start workout
              </Button>
            </>
          )}
        </Paper>
        <WorkoutOptionsDialog
          isOpen={isWorkoutOptionsDialogOpen}
          close={() => setIsWorkoutOptionsDialogOpen(false)}
        />
      </div>
    </WorkoutProvider>
  );
}
