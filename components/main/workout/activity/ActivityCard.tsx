import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useTimeContext } from '../context/TimeContextProvider';
import { useActivityCardContext } from '../context/ActivityCardContextProvider';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';
import { useEffect, useState } from 'react';
import { Fireworks } from '@/components/shared/backgrounds/Fireworks';

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

  const [shouldShowSuccess, setShouldShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (remainingTimeInSeconds <= 1 && currentExerciseType === 'exercise') {
      setShouldShowSuccess(true);
      setTimeout(() => {
        setShouldShowSuccess(false);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTimeInMilliseconds]);

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
      {shouldShowSuccess && <Fireworks />}
    </Card>
  );
}
