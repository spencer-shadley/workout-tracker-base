import { List } from '@mui/material';
import { useState } from 'react';
import ActivityListItem from './ActivityListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { useTimeContext } from '../context/TimeContextProvider';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';

interface ExerciseProps {
  shouldIncludeRests?: boolean;
}

export default function ActivitiesList({ shouldIncludeRests }: ExerciseProps) {
  const { currentRound } = useTimeContext();
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
              <ActivityListItem
                key={exercise.name}
                activityType="exercise"
                exercise={exercise}
              />
              {shouldIncludeRests && index !== exercises.length - 1 && (
                <ActivityListItem
                  key={exercise.name + '-rest'}
                  activityType="rest-exercise"
                  exercise={exercise}
                />
              )}
            </>
          ))}
          <ActivityListItem
            key={'round-rest-' + currentRound}
            activityType="rest-round"
          />
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
