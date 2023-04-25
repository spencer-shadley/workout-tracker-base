import {
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  CardProps,
} from '@mui/material';
import { ExerciseType, useTimeContext } from '../context/TimeContextProvider';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useExerciseCardContext } from '../context/ExerciseCardContextProvider';
import ExerciseStatLabels from './exercise/ExerciseStatLabels';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import useActivityName from '@/hooks/useActivityName';

export function ActivityCard(cardProps: CardProps) {
  const { exercise, isDismissible, timeBucket } = useExerciseCardContext();
  const exerciseType: ExerciseType =
    timeBucket?.exerciseType ?? 'rest-exercise';
  const { removeExercise } = useWorkoutContext();
  const { currentBucket } = useTimeContext();
  const { containerExercise, exerciseType: currentExerciseType } =
    currentBucket;
  const { remainingTimeInMilliseconds } = currentBucket;
  const isExerciseActive =
    containerExercise?.name === exercise?.name &&
    currentExerciseType === exerciseType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const activityDuration = useActivityDurationInSeconds(exerciseType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  const activityName = useActivityName(exerciseType, exercise?.name);

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
              {activityName}
            </Typography>
            {isDismissible && exercise && (
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

          {exerciseType === 'exercise' && exercise && (
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
