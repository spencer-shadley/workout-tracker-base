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
  // const exercise = sampleExercises.find(
  //   (exercise) => exercise.name === activityName
  // );

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
    // TODO
    // <ExerciseCard
    //   exercise={exercise}
    //   isOver={false}
    //   shouldShowCloseButton={false}
    //   sx={{ margin: '10px' }}
    //   onClick={() => handleClick(exercise)}
    // />
    <Typography>could not be found</Typography>
  );
}
