import { Typography } from '@mui/material';
import { ActivityCard } from './card/ActivityCard';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';

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
        timeBucket: undefined,
        activityType: 'exercise',
        isExerciseActive: false,
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
