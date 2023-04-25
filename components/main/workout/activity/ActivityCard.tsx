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

function getCardTitle(
  exerciseType: ExerciseType,
  exerciseName?: string
): string {
  switch (exerciseType) {
    case 'exercise':
      if (!exerciseName) {
        break;
      }
      return exerciseName;
    case 'rest-exercise':
      return 'Rest';
    case 'rest-round':
      return 'Round Rest';
  }
  console.error('No exercise title found');
  return 'No title found';
}

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
              {getCardTitle(exerciseType, exercise?.name)}
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
