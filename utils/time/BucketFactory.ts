import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';

import { ExerciseBucketStrategy } from './ExerciseBucketStrategy';
import { PrepBucketStrategy } from './PrepBucketStrategy';
import { RestExerciseBucketStrategy } from './RestExerciseBucketStrategy';
import { RestRoundBucketStrategy } from './RestRoundBucketStrategy';
import { BucketStrategy, StrategyProps } from './StrategyProps';

export class BucketFactory {
  static bucketStrategies: BucketStrategy[] = [new ExerciseBucketStrategy(), new RestRoundBucketStrategy(), new PrepBucketStrategy(), new RestExerciseBucketStrategy()];

  static getMatchingBucket(strategyProps: StrategyProps): TimeSlot {
    // same round, same activity type
    const filteredBuckets = strategyProps.buckets.filter((bucket) => bucket.containerRound === strategyProps.currentRound && bucket.activityType === strategyProps.activityType);
    if (filteredBuckets.length === 0) {
      throw new Error(`Could not find any buckets for round ${strategyProps.currentRound} and activity type ${strategyProps.activityType}`);
    }

    return this.tryAllStrategies({ ...strategyProps, buckets: filteredBuckets });
  }

  static tryAllStrategies(strategyProps: StrategyProps): TimeSlot {
    for (const strategy of BucketFactory.bucketStrategies) {
      const currentStrategyBucket = strategy.getBucket(strategyProps);
      if (currentStrategyBucket) {
        return currentStrategyBucket;
      }
    }

    throw new Error(`Could not find any bucket for activity ${strategyProps.activityType} round ${strategyProps.currentRound} exercise ${strategyProps.exerciseName}`);
  }
}
