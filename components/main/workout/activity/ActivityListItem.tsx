import { ListItem } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ActivityListItemProps {
  activityType: ActivityType;
  exercise?: ExerciseInfo;
}

export default function ActivityListItem({
  activityType,
  exercise,
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
        <ActivityCard />
      </ListItem>
    </ActivityCardProvider>
  );
}
