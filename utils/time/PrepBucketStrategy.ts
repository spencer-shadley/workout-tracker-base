import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';

import { BucketStrategy, StrategyProps } from './StrategyProps';

export class PrepBucketStrategy implements BucketStrategy {
  getBucket({ buckets, activityType }: StrategyProps): TimeSlot | null {
    if (activityType !== 'prep') {
      return null;
    }

    const bucket = buckets.find((bucket) => bucket.activityType === 'prep');
    if (!bucket) {
      return null;
    }

    return bucket;
  }
}
