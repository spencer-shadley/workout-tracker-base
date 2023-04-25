import {
  TimeContextType,
  TimeSlot,
} from '@/components/main/workout/context/TimeContextProvider';
import { useWorkoutContext } from '@/components/main/workout/context/WorkoutContextProvider';
import { useWorkoutOptionsContext } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import {
  calculateBuckets,
  calculateRoundTimeInMilliseconds,
  calculateWorkoutTimeInMilliseconds,
} from '@/utils/time';
import { useState, useCallback, useMemo, useEffect } from 'react';

export default function useTimeInformation(): TimeContextType {
  const { exercises } = useWorkoutContext();
  const { workoutOptions } = useWorkoutOptionsContext();
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [elapsedTimeInMilliseconds, setTimeElapsedInMilliseconds] =
    useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBucket, setCurrentBucket] = useState<TimeSlot | undefined>(
    undefined
  );

  const remainingWorkoutTimeInMilliseconds =
    calculateWorkoutTimeInMilliseconds(workoutOptions, exercises.length) -
    elapsedTimeInMilliseconds;

  const roundTimeInMilliseconds = calculateRoundTimeInMilliseconds(
    workoutOptions,
    exercises.length
  );
  const timeSpentInRoundRestInMilliseconds =
    currentRound * workoutOptions.restBetweenRoundsInSeconds * 1000;

  const remainingRoundTimeInMilliseconds =
    (elapsedTimeInMilliseconds - timeSpentInRoundRestInMilliseconds) %
    roundTimeInMilliseconds;

  const calculatedBuckets = useCallback(() => {
    return calculateBuckets(workoutOptions, exercises);
  }, [exercises, workoutOptions]);

  const buckets = useMemo(() => {
    return calculatedBuckets();
  }, [calculatedBuckets]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeElapsedInMilliseconds(elapsedTimeInMilliseconds + 1000);
      }, 1000);
      if (remainingWorkoutTimeInMilliseconds <= 0) {
        setIsRunning(false);
        setCurrentRound(Number.MAX_SAFE_INTEGER);
      } else {
        setCurrentRound(currentBucket?.containerRound ?? 0);
      }
      return () => clearInterval(interval);
    }
  }, [
    currentBucket?.containerRound,
    elapsedTimeInMilliseconds,
    isRunning,
    remainingWorkoutTimeInMilliseconds,
    setCurrentRound,
    setTimeElapsedInMilliseconds,
  ]);

  useEffect(() => {
    for (const bucket of buckets) {
      if (
        elapsedTimeInMilliseconds < bucket.endTimeInMilliseconds &&
        elapsedTimeInMilliseconds >= bucket.startTimeInMilliseconds
      ) {
        bucket.remainingTimeInMilliseconds =
          bucket.endTimeInMilliseconds - elapsedTimeInMilliseconds;
        setCurrentBucket(bucket);
      }
    }
  }, [buckets, elapsedTimeInMilliseconds]);

  const reset = () => {
    setTimeElapsedInMilliseconds(0);
    setCurrentRound(0);
    setCurrentBucket(undefined);
    setIsRunning(false);
  };

  const toggleIsRunning = () => {
    setIsRunning(!isRunning);
  };

  const skipCurrentActivity = () => {
    setTimeElapsedInMilliseconds(currentBucket?.endTimeInMilliseconds ?? 0);
  };

  return {
    currentRound,
    remainingRoundTimeInMilliseconds,
    remainingWorkoutTimeInMilliseconds,
    isRunning,
    buckets,
    elapsedTimeInMilliseconds,
    currentBucket: currentBucket ?? buckets[0],
    setCurrentBucket,
    setCurrentRound,
    toggleIsRunning,
    reset,
    skipCurrentActivity,
  };
}
