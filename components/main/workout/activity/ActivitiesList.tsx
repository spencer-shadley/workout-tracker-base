import { List } from '@mui/material';
import { useState } from 'react';
import ActivityListItem from './ActivityListItem';
import { useTimeContext } from '../context/TimeContextProvider';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

interface ActivitiesListProps {
  shouldIncludeRests?: boolean;
}

export default function ActivitiesList({
  shouldIncludeRests,
}: ActivitiesListProps) {
  const { currentRound } = useTimeContext();
  const [selectedExercises] = useSelectedExercises();

  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <List>
        {selectedExercises.map((exerciseName, index) => (
          <div key={exerciseName}>
            <ActivityListItem
              key={exerciseName}
              activityType="exercise"
              exerciseName={exerciseName}
            />
            {shouldIncludeRests && index !== selectedExercises.length - 1 && (
              <ActivityListItem
                key={`${exerciseName}-rest`}
                activityType="rest-exercise"
                exerciseName={exerciseName}
              />
            )}
          </div>
        ))}
        {shouldIncludeRests && (
          <ActivityListItem
            key={`round-rest-${currentRound}`}
            activityType="rest-round"
          />
        )}
      </List>
      <DuplicateExerciseWarning
        showDuplicateExerciseWarning={showDuplicateExerciseWarning}
        setShowDuplicateExerciseWarning={setShowDuplicateExerciseWarning}
      />
    </div>
  );
}
