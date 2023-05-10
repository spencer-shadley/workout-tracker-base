import { CardProps, ListItem } from '@mui/material';
import { ActivityCard } from './card/ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { useEffect, useState } from 'react';

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
  const { containerExercise, exerciseType: currentExerciseType } =
    currentBucket;

  const [isExerciseActive, setIsExerciseActive] = useState(false);

  useEffect(() => {
    setIsExerciseActive(
      containerExercise === exerciseName && currentExerciseType === activityType
    );
  }, [activityType, containerExercise, currentExerciseType, exerciseName]);

  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
        timeBucket: activityBucket,
        isExerciseActive,
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
