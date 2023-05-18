import { useEffect, useRef } from 'react';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { Card, CardContent, CardProps, LinearProgress } from '@mui/material';

import { useTimeContext } from '../../context/TimeContextProvider';
import { ActiveExerciseTimer } from './ActiveExerciseTimer';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';
import { MuscleGroupsChips } from './muscle-group-chips/MuscleGroupsChips';
import { ExerciseTitle } from './title/ExerciseTitle';
import { VideoButtons } from './VideoButtons';

const progressColor = `#1976d2`;

export function ActivityCard(cardProps: CardProps) {
  const { isRunning } = useTimeContext();
  const { activityType } =
    useExerciseContext();
  const { activityBucket } = useActivityBucket();
  const { progressPercent, isActive } = activityBucket;

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRunning) {
      cardRef.current?.scrollIntoView({ behavior: `smooth` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Card
      ref={cardRef}
      sx={{
        width: `100%`,
        border: isActive ? `5px solid ${progressColor}` : undefined,
        borderBottom: 0,
      }}
      {...cardProps}
    >
      <span style={{ display: `flex` }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <ExerciseTitle />
          <ActivityCardCloseButton />
          {activityType === `exercise` &&
            <MuscleGroupsChips />
          }
        </CardContent>
        {isActive && <ActiveExerciseTimer />}
      </span>
      <VideoButtons />
      {progressPercent !== null &&
        <LinearProgress variant="determinate" value={progressPercent} />
      }
    </Card>
  );
}
