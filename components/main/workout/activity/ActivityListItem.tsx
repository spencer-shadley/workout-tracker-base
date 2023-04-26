import { ListItem } from '@mui/material';
import { ActivityCard, ActivityCardProps } from './ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ActivityListItemProps extends ActivityCardProps {
  activityType: ActivityType;
  exercise?: ExerciseInfo;
}

export default function ActivityListItem({
  activityType,
  exercise,
  ...activityCardProps
}: ActivityListItemProps) {
  const { buckets } = useTimeContext();
  return (
    <ActivityCardProvider
      activityCardContext={{
        exercise,
        isDismissible: false,
        timeBucket: buckets.find(
          (bucket) =>
            bucket.containerExercise?.name === exercise?.name &&
            bucket.exerciseType === activityType
        ),
      }}
    >
      <ListItem key={`${exercise?.name}-${activityType}`}>
        <ActivityCard {...activityCardProps} />
      </ListItem>
    </ActivityCardProvider>
  );
}
