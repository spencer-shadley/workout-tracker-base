import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { Typography } from '@mui/material';
import { ExerciseOrRestCard } from './RestCard';

interface ExerciseOptionProps {
  exerciseName: string;
  handleClick: (exercise: ExerciseInfo) => void;
}

export default function ExerciseOption({
  exerciseName,
  handleClick,
}: ExerciseOptionProps) {
  const exercise = sampleExercises.find(
    (exercise) => exercise.name === exerciseName
  );

  return exercise ? (
    <ExerciseOrRestCard
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
    <Typography>{exerciseName} could not be found</Typography>
  );
}
