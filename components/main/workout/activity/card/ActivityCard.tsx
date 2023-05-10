import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import useActivityDurationInSeconds from '@/hooks/activity/useActivityDuration';
import { VideoButtons } from './VideoButtons';
import { MuscleGroupChips } from './MuscleGroupChips';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, activityType } = useActivityCardContext();
  const { currentBucket } = useTimeContext();
  const {
    containerExercise,
    exerciseType: currentExerciseType,
    remainingTimeInSeconds,
  } = currentBucket;
  const isExerciseActive =
    containerExercise === exerciseName && currentExerciseType === activityType;

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
          <MuscleGroupChips />
        </CardContent>
        {isExerciseActive && <ActiveExercise />}
      </span>
      <VideoButtons />
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
