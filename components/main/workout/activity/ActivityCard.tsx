import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useTimeContext } from '../context/TimeContextProvider';
import { useActivityCardContext } from '../context/ActivityCardContextProvider';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, activityType } = useActivityCardContext();
  const { currentBucket } = useTimeContext();
  const {
    containerExercise,
    exerciseType: currentExerciseType,
    remainingTimeInMilliseconds,
  } = currentBucket;
  const isExerciseActive =
    containerExercise === exerciseName && currentExerciseType === activityType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const activityDuration = useActivityDurationInSeconds(activityType);
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
          <ExerciseTitle />
          <ActivityCardCloseButton />
        </CardContent>
        {isExerciseActive && (
          <ActiveExercise remainingTimeInSeconds={remainingTimeInSeconds} />
        )}
      </span>
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
