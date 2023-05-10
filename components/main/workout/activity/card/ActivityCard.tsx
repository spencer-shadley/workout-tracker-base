import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import useActivityDurationInSeconds from '@/hooks/activity/useActivityDuration';
import { VideoButtons } from './VideoButtons';
import { MuscleGroupsChips } from './muscle-group-chips/MuscleGroupsChips';
import { useEffect, useRef } from 'react';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, activityType, isExerciseActive } =
    useActivityCardContext();
  const { currentBucket } = useTimeContext();
  const { remainingTimeInSeconds } = currentBucket;

  const activityDuration = useActivityDurationInSeconds(activityType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fieldRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isExerciseActive]);

  return (
    <Card
      ref={fieldRef}
      sx={{
        width: '100%',
      }}
      {...cardProps}
    >
      <span style={{ display: 'flex' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <ExerciseTitle />
          <ActivityCardCloseButton />
          {activityType === 'exercise' && (
            <MuscleGroupsChips exerciseName={exerciseName ?? ''} />
          )}
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
