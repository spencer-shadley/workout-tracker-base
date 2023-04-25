import { List } from '@mui/material';
import { useState } from 'react';
import ActivityListItem from './ActivityListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { ExerciseCardProvider } from '../context/ExerciseCardContextProvider';
import { useTimeContext } from '../context/TimeContextProvider';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';

interface ExerciseProps {
  shouldIncludeRests?: boolean;
}

export default function ActivitiesList({ shouldIncludeRests }: ExerciseProps) {
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
                <ActivityListItem key={exercise.name} />
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
                  <ActivityListItem key={exercise.name + '-rest'} />
                </ExerciseCardProvider>
              )}
            </>
          ))}
        </List>
      </div>
      {/* TODO: remove? */}
      <DuplicateExerciseWarning
        showDuplicateExerciseWarning={showDuplicateExerciseWarning}
        setShowDuplicateExerciseWarning={setShowDuplicateExerciseWarning}
      />
    </div>
  );
}
