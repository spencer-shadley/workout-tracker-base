import { CardProps, ListItem } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';

interface ActivityListItemProps extends CardProps {
  activityType: ActivityType;
  exerciseName?: string;
}

export default function ActivityListItem({
  activityType,
  exerciseName,
  ...activityCardProps
}: ActivityListItemProps) {
  const { buckets, elapsedTimeInSeconds } = useTimeContext();
  const activityBucket = buckets.find(
    (bucket) =>
      bucket.containerExercise === exerciseName &&
      bucket.exerciseType === activityType
  );
  const activityEndTime: number = activityBucket
    ? activityBucket.endTimeInSeconds
    : Number.MAX_SAFE_INTEGER;
  const isComplete = activityEndTime > elapsedTimeInSeconds;

  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
        timeBucket: activityBucket,
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
