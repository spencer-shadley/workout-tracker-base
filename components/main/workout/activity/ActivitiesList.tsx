import { List } from '@mui/material';
import { useState } from 'react';
import ActivityListItem from './ActivityListItem';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { useTimeContext } from '../context/TimeContextProvider';
import DuplicateExerciseWarning from './exercise/DuplicateExerciseWarning';
import { useCreateWorkoutContext } from '@/components/create-workout/context/CreateWorkoutContextProvider';

interface ActivitiesListProps {
  shouldIncludeRests?: boolean;
}

export default function ActivitiesList({
  shouldIncludeRests,
}: ActivitiesListProps) {
  const { currentRound } = useTimeContext();
  const { exercises } = useWorkoutContext();
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;

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
          {/* {exercises.map((exercise, index) => ( */}
          {addedExerciseNames.map((exerciseName, index) => (
            <>
              {/* New based on just name */}
              <ActivityListItem
                key={exerciseName}
                activityType="exercise"
                exercise={{ name: exerciseName }}
              />
              {shouldIncludeRests && index !== exercises.length - 1 && (
                <ActivityListItem
                  key={exerciseName + '-rest'}
                  activityType="rest-exercise"
                  exercise={{ name: exerciseName }}
                />
              )}
              {/* Original based on ExerciseInfo */}
              {/* <ActivityListItem
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
              )} */}
            </>
          ))}
          {shouldIncludeRests && (
            <ActivityListItem
              key={'round-rest-' + currentRound}
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
