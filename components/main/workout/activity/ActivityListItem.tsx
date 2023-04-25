import { ListItem } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { ExerciseCardProvider } from '../context/ExerciseCardContextProvider';
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
    <ExerciseCardProvider
      exerciseCardContext={{
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
    </ExerciseCardProvider>
  );
}
