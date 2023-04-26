import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { Typography } from '@mui/material';
import { ActivityCard } from './ActivityCard';
import { ActivityCardProvider } from '../context/ActivityCardContextProvider';

interface ActivityOptionProps {
  exercise: ExerciseInfo;
  handleClick: (exercise: ExerciseInfo) => void;
}

export default function ActivityOption({
  exercise,
  handleClick,
}: ActivityOptionProps) {
  return exercise ? (
    <ActivityCardProvider
      activityCardContext={{
        exercise,
        isDismissible: false,
        timeBucket: undefined,
        activityType: 'exercise',
      }}
    >
      <ActivityCard
        sx={{ margin: '10px' }}
        onClick={() => handleClick(exercise)}
      />
    </ActivityCardProvider>
  ) : (
    <Typography>could not be found</Typography>
  );
}
