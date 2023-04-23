import { Typography, List, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';

export default function ExerciseColumn() {
  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);

  const { exercises, title } = useWorkoutContext();

  return (
    <>
      <Typography variant="h3" textTransform="uppercase" textAlign="center">
        {title}
      </Typography>

      <List sx={{ overflow: 'auto', maxHeight: '500px' }}>
        {exercises.map((exercise) => (
          <ExerciseListItem
            shouldShowCloseButton={title === 'Workout'}
            key={exercise.name}
            exercise={exercise}
            isOver={false}
          />
        ))}
      </List>
      <Snackbar
        open={showDuplicateExerciseWarning}
        autoHideDuration={1000}
        onClose={() => {
          setShowDuplicateExerciseWarning(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowDuplicateExerciseWarning(false);
          }}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Exercise already exists
        </Alert>
      </Snackbar>
    </>
  );
}
