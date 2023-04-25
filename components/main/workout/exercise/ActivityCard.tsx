import {
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  CardProps,
} from '@mui/material';
import ExerciseStatLabels from './ExerciseStatLabels';
import { useTimeContext } from '../context/TimeContextProvider';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useExerciseCardContext } from '../context/ExerciseCardContextProvider';
import { useWorkoutOptionsContext } from '../context/WorkoutOptionsContextProvider';

export function ActivityCard(cardProps: CardProps) {
  const { exercise, isDismissible, timeBucket } = useExerciseCardContext();
  const exerciseType = timeBucket?.exerciseType ?? 'rest';
  const { removeExercise } = useWorkoutContext();
  const { workoutOptions } = useWorkoutOptionsContext();
  const { exerciseDurationInSeconds, restBetweenExercisesInSeconds } =
    workoutOptions;
  const { currentBucket } = useTimeContext();
  const { containerExercise, exerciseType: currentExerciseType } =
    currentBucket;
  const { remainingTimeInMilliseconds } = currentBucket;
  const isExerciseActive =
    containerExercise?.name === exercise.name &&
    currentExerciseType === exerciseType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const duration =
    exerciseType === 'exercise'
      ? exerciseDurationInSeconds
      : restBetweenExercisesInSeconds;
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / duration) * 100
    : null;

  return (
    <Card
      sx={{
        width: '100%',
      }}
      {...cardProps}
    >
      <span style={{ display: 'flex' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <span style={{ display: 'flex', width: '100%' }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {exerciseType === 'exercise' ? exercise.name : 'rest'}
            </Typography>
            {isDismissible && (
              <IconButton
                onClick={() => {
                  removeExercise(exercise.name);
                }}
              >
                <CloseIcon
                  style={{ alignSelf: 'center', justifySelf: 'flex-end' }}
                />
              </IconButton>
            )}
          </span>

          {exerciseType === 'exercise' && (
            <ExerciseStatLabels exercise={exercise} />
          )}
        </CardContent>
        {isExerciseActive && (
          <Typography
            variant="h1"
            justifySelf="center"
            alignSelf="center"
            marginRight={2}
          >
            {remainingTimeInSeconds}
          </Typography>
        )}
      </span>
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
