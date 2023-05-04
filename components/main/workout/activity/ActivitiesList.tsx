import { List } from '@mui/material';
import { useState } from 'react';
import ActivityListItem from './ActivityListItem';
import { useTimeContext } from '../context/TimeContextProvider';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';
import { getSessionInfo } from '@/utils/sessionStorage';

interface ActivitiesListProps {
  shouldIncludeRests?: boolean;
}

export default function ActivitiesList({
  shouldIncludeRests,
}: ActivitiesListProps) {
  const { currentRound } = useTimeContext();
  const { selectedExercises } = getSessionInfo();

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
          {selectedExercises.map((exerciseName, index) => (
            <>
              <ActivityListItem
                key={exerciseName}
                activityType="exercise"
                exercise={{ name: exerciseName }}
              />
              {shouldIncludeRests && index !== selectedExercises.length - 1 && (
                <ActivityListItem
                  key={`${exerciseName}-rest`}
                  activityType="rest-exercise"
                  exercise={{ name: exerciseName }}
                />
              )}
            </>
          ))}
          {shouldIncludeRests && (
            <ActivityListItem
              key={`round-rest-${currentRound}`}
              activityType="rest-round"
            />
          )}
        </List>
      </div>
      <DuplicateExerciseWarning
        showDuplicateExerciseWarning={showDuplicateExerciseWarning}
        setShowDuplicateExerciseWarning={setShowDuplicateExerciseWarning}
      />
    </div>
  );
}
