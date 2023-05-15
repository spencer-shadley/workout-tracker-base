/* eslint-disable indent */
import {
    ActivityType, useTimeContext
} from '@/components/main/workout/context/TimeContextProvider';

import { BucketFactory } from '../../utils/time/BucketFactory';

export function useActivityBucket(
  exerciseName: string | null,
  activityType: ActivityType
) {
  const { buckets, elapsedTimeInSeconds, currentRound } = useTimeContext();

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

