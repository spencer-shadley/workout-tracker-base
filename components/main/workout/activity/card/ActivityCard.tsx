import { Card, CardContent, LinearProgress, CardProps } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { ActiveExerciseTimer } from './ActiveExerciseTimer';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import { VideoButtons } from './VideoButtons';
import { MuscleGroupsChips } from './muscle-group-chips/MuscleGroupsChips';
import { useEffect, useRef } from 'react';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, activityType, isExerciseActive, timeBucket } =
    useActivityCardContext();

  const progressPercent = timeBucket?.progressPercent;

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isExerciseActive]);

  return (
    <Card
      ref={cardRef}
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
        {isExerciseActive && <ActiveExerciseTimer />}
      </span>
      <VideoButtons />
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
