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
  const { buckets } = useTimeContext();
  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
        timeBucket: buckets.find(
          (bucket) =>
            bucket.containerExercise === exerciseName &&
            bucket.exerciseType === activityType
        ),
      }}
    >
      <ListItem key={`${exerciseName}-${activityType}`}>
        <ActivityCard {...activityCardProps} />
      </ListItem>
    </ActivityCardProvider>
  );
}
