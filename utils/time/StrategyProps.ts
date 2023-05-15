import { ActivityType, TimeSlot } from '@/components/main/workout/context/TimeContextProvider';

export interface StrategyProps {
  activityType: ActivityType;
  currentRound: number;
  exerciseName: string | null;
  buckets: TimeSlot[];
}

export interface BucketStrategy {
  getBucket: (strategyProps: StrategyProps) => TimeSlot | null;
}
