import { List, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { ExerciseCardProvider } from '../context/ExerciseCardContextProvider';
import { useTimeContext } from '../context/TimeContextProvider';

interface ExerciseProps {
  shouldIncludeRests?: boolean;
}

export default function Exercises({ shouldIncludeRests }: ExerciseProps) {
  const { buckets } = useTimeContext();
  const { exercises } = useWorkoutContext();

  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);

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
          {exercises.map((exercise, index) => (
            <>
              <ExerciseCardProvider
                exerciseCardContext={{
                  exercise,
                  isDismissible: false,
                  timeBucket: buckets.find(
                    (bucket) =>
                      bucket.containerExercise?.name === exercise.name &&
                      bucket.exerciseType === 'exercise'
                  ),
                }}
              >
                <ExerciseListItem key={exercise.name} />
              </ExerciseCardProvider>
              {shouldIncludeRests && index !== exercises.length - 1 && (
                <ExerciseCardProvider
                  exerciseCardContext={{
                    exercise,
                    isDismissible: false,
                    timeBucket: buckets.find(
                      (bucket) =>
                        bucket.containerExercise?.name === exercise.name &&
                        bucket.exerciseType === 'rest'
                    ),
                  }}
                >
                  <ExerciseListItem key={exercise.name + '-rest'} />
                </ExerciseCardProvider>
              )}
            </>
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
