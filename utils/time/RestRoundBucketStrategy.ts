import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';

import { BucketStrategy, StrategyProps } from './StrategyProps';

export class RestRoundBucketStrategy implements BucketStrategy {
  getBucket({ buckets, currentRound, activityType }: StrategyProps): TimeSlot | null {
    if (activityType !== 'rest-round') {
      return null;
    }

    const bucket = buckets.find((bucket) => bucket.containerRound === currentRound);
    if (!bucket) {
      return null;
    }

    return bucket;
  }
}
