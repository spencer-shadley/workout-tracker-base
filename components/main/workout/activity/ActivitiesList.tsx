import { useState } from 'react';

import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import { List } from '@mui/material';

import { useTimeContext } from '../context/TimeContextProvider';
import ActivityListItem from './ActivityListItem';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';

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
    <div className="h-full overflow-y-auto justify-middle">
      <List>
        {shouldIncludeRests &&
          <ExerciseProvider
            activityType="prep"
            exerciseName={`Prep for Round ${currentRound}`}>
            <ActivityListItem key={`prep-time-${currentRound}`} />
          </ExerciseProvider>
        }
        {selectedExercises.map((exerciseName, index) =>
          <div key={exerciseName}>
            <ExerciseProvider exerciseName={exerciseName} activityType='exercise'>
              <ActivityListItem/>
            </ExerciseProvider>
            {shouldIncludeRests && index !== selectedExercises.length - 1 &&
              <ExerciseProvider exerciseName={exerciseName} activityType='rest-exercise'>
                <ActivityListItem/>
              </ExerciseProvider>
            }
          </div>
        )}
        {shouldIncludeRests &&
          <ExerciseProvider
            key={`round-rest-${currentRound}`}
            exerciseName={`Round ${currentRound} Rest`} activityType='rest-round'>
            <ActivityListItem/>
          </ExerciseProvider>
        }
      </List>
      <DuplicateExerciseWarning
        showDuplicateExerciseWarning={showDuplicateExerciseWarning}
        setShowDuplicateExerciseWarning={setShowDuplicateExerciseWarning}
      />
    </div>
  );
}
