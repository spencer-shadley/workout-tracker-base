import {
  ActivityType,
  useTimeContext,
} from '@/components/main/workout/context/TimeContextProvider';
import { logError } from '@/utils/logger';

export function useActivityBucket(
  exerciseName: string | undefined,
  activityType: ActivityType
) {
  const { buckets, elapsedTimeInSeconds, currentRound } = useTimeContext();

  const activityBucket =
    buckets.find(
      (bucket) =>
        bucket.containerExercise === exerciseName &&
        bucket.exerciseType === activityType
    ) ??
    buckets.find(
      (bucket) =>
        bucket.exerciseType === 'rest-round' &&
        bucket.containerRound === currentRound
    );

  if (!activityBucket) {
    logError(
      `Could not find activity bucket for exercise ${exerciseName} and activity type ${activityType}`
    );
  }

  const activityEndTime: number = activityBucket
    ? activityBucket.endTimeInSeconds
    : Number.MAX_SAFE_INTEGER;
  const isComplete = activityEndTime > elapsedTimeInSeconds;

  return { activityBucket, isComplete };
}
