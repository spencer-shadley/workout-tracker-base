import { ListItem } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { ExerciseType, useTimeContext } from '../context/TimeContextProvider';
import { ExerciseCardProvider } from '../context/ExerciseCardContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ActivityListItemProps {
  activityType: ExerciseType;
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
      <ListItem>
        <ActivityCard />
      </ListItem>
    </ExerciseCardProvider>
  );
}
