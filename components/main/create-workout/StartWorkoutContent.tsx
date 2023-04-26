import { Typography, Divider, Button } from '@mui/material';
import ActivitiesList from '../workout/activity/ActivitiesList';
import AutoCompleteWorkout from './AutoCompleteWorkout';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import WorkoutOptionsDialog from '../workout/WorkoutOptionsDialog';
import { useState } from 'react';
import NoExercises from './NoExercises';

export default function StartWorkoutContent() {
  const { exercises } = useWorkoutContext();
  const [isWorkoutOptionsDialogOpen, setIsWorkoutOptionsDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <Typography variant="h4" sx={{ alignSelf: 'center' }}>
        Create a workout
      </Typography>
      <AutoCompleteWorkout />
      <Divider />
      {exercises.length === 0 ? (
        <NoExercises />
      ) : (
        <>
          <ActivitiesList />
          <Button onClick={() => setIsWorkoutOptionsDialogOpen(true)}>
            Start workout
          </Button>
        </>
      )}
      <WorkoutOptionsDialog
        isOpen={isWorkoutOptionsDialogOpen}
        close={() => setIsWorkoutOptionsDialogOpen(false)}
      />
    </>
  );
}
