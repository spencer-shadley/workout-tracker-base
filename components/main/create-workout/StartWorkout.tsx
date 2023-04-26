import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import { Button, Divider, Paper, Typography } from '@mui/material';
import ActivitiesList from '../workout/activity/ActivitiesList';
import { WorkoutProvider } from '../workout/context/WorkoutContextProvider';
import WorkoutOptionsDialog from '../workout/WorkoutOptionsDialog';
import AutoCompleteWorkout from './AutoCompleteWorkout';

export default function StartWorkout() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  const [isWorkoutOptionsDialogOpen, setIsWorkoutOptionsDialogOpen] =
    useState<boolean>(false);

  return (
    <WorkoutProvider
      workoutContext={{
        exercises,
        addExercise: (exercise) => {
          setExercises([...exercises, exercise]);
        },
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
          <AutoCompleteWorkout />
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
