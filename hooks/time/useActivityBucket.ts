import { useTimeContext } from '@/components/main/workout/context/TimeContextProvider';
import { useExerciseContext } from '@/components/shared/ExerciseProvider';

import { BucketFactory } from '../../utils/time/BucketFactory';

export function useActivityBucket(
) {
  const { buckets, elapsedTimeInSeconds, currentRound } = useTimeContext();
  const { exerciseName, activityType } = useExerciseContext();

  const activityBucket = BucketFactory.getMatchingBucket({
    buckets,
    exerciseName,
    activityType,
    currentRound,
  });

  const activityEndTime: number = activityBucket
    ? activityBucket.endTimeInSeconds
    : Number.MAX_SAFE_INTEGER;
  const isComplete = activityEndTime > elapsedTimeInSeconds;

  return { activityBucket, isComplete };
}

