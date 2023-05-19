import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';

import { BucketStrategy, StrategyProps } from './StrategyProps';

export class RestExerciseBucketStrategy implements BucketStrategy {
  getBucket({ buckets, exerciseName, activityType }: StrategyProps): TimeSlot | null {
    if (activityType !== `rest-exercise`) {
      return null;
    }

    const bucket = buckets.find((bucket) => bucket.containerExercise === exerciseName);
    if (!bucket) {
      return null;
    }

    return bucket;
  }
}
