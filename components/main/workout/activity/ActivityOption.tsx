import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
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
    <ExerciseProvider exerciseName={exerciseName} activityType='exercise'>
      <ActivityCardProvider
        activityCardContext={{
          isDismissible: false,
        }}
      >
        <ActivityCard
          sx={{ margin: '10px' }}
          onClick={() => handleClick(exerciseName)}
        />
      </ActivityCardProvider>
    </ExerciseProvider>
  ) : (
    <Typography>could not be found</Typography>
  );
}
