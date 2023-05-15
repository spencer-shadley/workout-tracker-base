import { useEffect, useState } from 'react';

import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { logError } from '@/utils/logger';
import { CardProps, ListItem } from '@mui/material';

import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCard } from './card/ActivityCard';

interface ActivityListItemProps extends CardProps {
  activityType: ActivityType;
  exerciseName?: string;
}

export default function ActivityListItem({
  activityType,
  exerciseName,
  ...activityCardProps
}: ActivityListItemProps) {
  const { activityBucket, isComplete } = useActivityBucket(
    exerciseName,
    activityType
  );
  const { currentBucket } = useTimeContext();
  const { containerExercise, activityType: currentExerciseType } =
    currentBucket;

  const [isActive, setIsExerciseActive] = useState(false);

  useEffect(() => {
    switch (activityType) {
    case 'prep':
      setIsExerciseActive(currentBucket.activityType === 'prep');
      break;
    case 'exercise':
      setIsExerciseActive(currentBucket.containerExercise === exerciseName);
      break;
    case 'rest-exercise':
      setIsExerciseActive(currentBucket.containerExercise === exerciseName);
      break;
    case 'rest-round':
      setIsExerciseActive(currentBucket.activityType === 'rest-round');
      break;
    default:
      setIsExerciseActive(false);
      logError(`activityType not found ${activityType}`);
    }
  }, [
    activityType,
    containerExercise,
    currentBucket.activityType,
    currentBucket.containerExercise,
    currentExerciseType,
    exerciseName,
  ]);

  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
        timeBucket: activityBucket,
        isActive,
      }}
    >
      <ListItem
        key={`${exerciseName}-${activityType}`}
        className={isComplete ? '' : 'opacity-25'}
      >
        <ActivityCard {...activityCardProps} />
      </ListItem>
    </ActivityCardProvider>
  );
}
