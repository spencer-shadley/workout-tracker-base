import { List, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { ExerciseTimeProvider } from '../context/ExerciseTimeContextProvider';

export default function Exercises() {
  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);

  const { exercises } = useWorkoutContext();
  const [remainingExerciseTimeInMilliseconds, setRemainingExerciseTimeInMilliseconds] = useState<number>(0);
    const currentExercise = 

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
            <ExerciseTimeProvider
              key={exercise.name}
              exerciseTimeContext={{
                elapsedExerciseTimeInMilliseconds: remainingExerciseTimeInMilliseconds,
              }}
            >
              <ExerciseListItem
                shouldShowCloseButton={false}
                key={exercise.name}
                exercise={exercise}
                isOver={false}
              />
            </ExerciseTimeProvider>
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
