import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { ActiveExerciseTimer } from './ActiveExerciseTimer';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import { VideoButtons } from './VideoButtons';
import { MuscleGroupsChips } from './muscle-group-chips/MuscleGroupsChips';
import { useEffect, useRef } from 'react';
import { useTimeContext } from '../../context/TimeContextProvider';

const progressColor = '#1976d2';

export function ActivityCard(cardProps: CardProps) {
  const { isRunning } = useTimeContext();
  const { exerciseName, activityType, isActive, timeBucket } =
    useActivityCardContext();

  const progressPercent = timeBucket?.progressPercent;

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRunning) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Card
      ref={cardRef}
      sx={{
        width: '100%',
        border: isActive ? `5px solid ${progressColor}` : undefined,
        borderBottom: 0,
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
        {isActive && <ActiveExerciseTimer />}
      </span>
      <VideoButtons />
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
