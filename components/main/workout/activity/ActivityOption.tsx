import { Typography } from '@mui/material';

import { ActivityCardProvider } from '../context/ActivityCardContextProvider';
import { ActivityCard } from './card/ActivityCard';

interface ActivityOptionProps {
  exerciseName: string;
  handleClick: (exerciseName: string) => void;
}

export default function ActivityOption({
  exerciseName,
  handleClick,
}: ActivityOptionProps) {
  return exerciseName ? (
    <ActivityCardProvider
      activityCardContext={{
        exerciseName,
        isDismissible: false,
        activityType: 'exercise',
      }}
    >
      <ActivityCard
        sx={{ margin: '10px' }}
        onClick={() => handleClick(exerciseName)}
      />
    </ActivityCardProvider>
  ) : (
    <Typography>could not be found</Typography>
  );
}
