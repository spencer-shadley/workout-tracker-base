import {
  Card,
  CardContent,
  LinearProgress,
  CardProps,
  Chip,
  Skeleton,
} from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import useActivityDurationInSeconds from '@/hooks/activity/useActivityDuration';
import { VideoButtons } from './VideoButtons';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useEffect, useState } from 'react';
import { random } from 'lodash';

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
          <Chips />
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

function Chips() {
  const { exerciseName, activityType } = useActivityCardContext();
  const [muscles, setMuscles] = useState<string[]>([]);

  const { data: muscleGroupsRaw, isFetching: isLoading } = useOpenAi({
    prompt: `Provide a comma separated list of muscle groups that are relevant to the exercise ${exerciseName}. The return should be each muscle group followed by a comma, do not use "and" to separate muscle groups. Do not return more than the top 5 muscle groups. Return the muscle groups in order of relevance to the exercise. It is okay to return less than 5 muscle groups if there are fewer than 5 relevant muscle groups.`,
  });

  useEffect(() => {
    if (muscleGroupsRaw) {
      const muscleGroups = muscleGroupsRaw
        .split(',')
        .map((muscleGroup) => muscleGroup.trim());
      setMuscles(muscleGroups);
    }
  }, [muscleGroupsRaw]);

  if (activityType !== 'exercise') {
    return null;
  }

  return (
    <div className="flex gap-1">
      {isLoading ? (
        <ChipsSkeleton />
      ) : (
        muscles.map((muscle) => <Chip key={muscle} label={muscle} />)
      )}
    </div>
  );
}

function ChipsSkeleton() {
  const skeletons = [];
  const randomNumberOfChips = random(1, 5);
  for (let i = 0; i < randomNumberOfChips; i++) {
    skeletons.push(
      <Skeleton variant="rounded" sx={{ borderRadius: 100 }}>
        <Chip label={'a'.repeat(random(3, 8))} />
      </Skeleton>
    );
  }

  return <div className="flex gap-1">{skeletons}</div>;
}
