
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
  const { isComplete } = useActivityBucket(
    exerciseName,
    activityType
  );

  return (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType,
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
