import { List, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';

export default function ExerciseColumn() {
  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);

  const { exercises, title } = useWorkoutContext();

  return (
    <div
      style={{
        flexGrow: 1,
        height: '100%',
        maxHeight: '70dvh',
        overflow: 'auto',
      }}
    >
      <div style={{ height: '100%', overflow: 'auto' }}>
        <List sx={{ overflow: 'auto' }}>
          {exercises.map((exercise) => (
            <ExerciseListItem
              shouldShowCloseButton={title === 'Workout'}
              key={exercise.name}
              exercise={exercise}
              isOver={false}
            />
          ))}
        </List>
      </div>

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
    </div>
  );
}
