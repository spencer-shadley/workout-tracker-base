
import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { ListItem } from '@mui/material';

import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { ActivityCard } from './card/ActivityCard';

export default function ActivityListItem() {
  const { exerciseName, activityType } = useExerciseContext();
  const { isComplete } = useActivityBucket();

  return (
    <ActivityCardProvider
      activityCardContext={{
        isDismissible: false,
      }}
    >
      <ListItem
        key={`${exerciseName}-${activityType}`}
        className={isComplete ? '' : 'opacity-25'}
      >
        <ActivityCard />
      </ListItem>
    </ActivityCardProvider>
  );
}
