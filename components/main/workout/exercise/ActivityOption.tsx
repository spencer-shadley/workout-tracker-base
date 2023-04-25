import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { Typography } from '@mui/material';
import { ActivityCard } from './ActivityCard';

interface ActivityOptionProps {
  activityName: string;
  handleClick: (exercise: ExerciseInfo) => void;
}

export default function ActivityOption({
  activityName,
  handleClick,
}: ActivityOptionProps) {
  const exercise = sampleExercises.find(
    (exercise) => exercise.name === activityName
  );

  return exercise ? (
    <ActivityCard
      sx={{ margin: '10px' }}
      onClick={() => handleClick(exercise)}
    />
  ) : (
    // <ExerciseCard
    //   exercise={exercise}
    //   isOver={false}
    //   shouldShowCloseButton={false}
    //   sx={{ margin: '10px' }}
    //   onClick={() => handleClick(exercise)}
    // />
    <Typography>{activityName} could not be found</Typography>
  );
}
