
import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { CardProps, ListItem } from '@mui/material';

import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { ActivityType } from '../context/TimeContextProvider';
import { ActivityCard } from './card/ActivityCard';

interface ActivityListItemProps extends CardProps {
  activityType: ActivityType;
  exerciseName: string | null;
}

export default function ActivityListItem({
  activityType,
  exerciseName,
  ...activityCardProps
}: ActivityListItemProps) {
  const { isComplete } = useActivityBucket();

  return (
    <ExerciseProvider activityType={activityType} exerciseName={exerciseName}>
      <ActivityCardProvider
        activityCardContext={{
          isDismissible: false,
        }}
      >
        <ListItem
          key={`${exerciseName}-${activityType}`}
          className={isComplete ? '' : 'opacity-25'}
        >
          <ActivityCard {...activityCardProps} />
        </ListItem>
      </ActivityCardProvider>
    </ExerciseProvider>
  );
}
