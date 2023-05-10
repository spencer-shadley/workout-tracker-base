import { CardProps, ListItem } from '@mui/material';
import { ActivityCard } from './card/ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import useActivityDurationInSeconds from '@/hooks/activity/useActivityDuration';

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
  const {
    containerExercise,
    exerciseType: currentExerciseType,
    remainingTimeInSeconds,
  } = currentBucket;

  const isExerciseActive =
    containerExercise === exerciseName && currentExerciseType === activityType;

  const activityDuration = useActivityDurationInSeconds(activityType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
        timeBucket: activityBucket,
        isExerciseActive,
        progressPercent,
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
