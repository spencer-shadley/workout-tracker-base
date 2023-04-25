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

interface TimeInfo {
  timeContext: TimeContextType;
  setCurrentBucket: (bucket: TimeSlot) => void;
  currentRound: number;
  setCurrentRound: (round: number) => void;
  elapsedTimeInMilliseconds: number;
  isRunning: boolean;
  reset: () => void;
  toggleIsRunning: () => void;
}

export default function useTimeInformation(): TimeInfo {
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
    const x = calculatedBuckets();
    console.log(x);
    return x;
  }, [calculatedBuckets]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeElapsedInMilliseconds(elapsedTimeInMilliseconds + 1000);
      }, 1000);
      setCurrentRound(currentBucket?.containerRound ?? 0);
      return () => clearInterval(interval);
    }
  }, [
    currentBucket?.containerRound,
    elapsedTimeInMilliseconds,
    isRunning,
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

  const timeContext: TimeContextType = {
    currentRound,
    remainingRoundTimeInMilliseconds,
    remainingWorkoutTimeInMilliseconds,
    isRunning,
    buckets,
    elapsedTimeInMilliseconds,
    currentBucket: currentBucket ?? buckets[0],
  };

  const reset = () => {
    setTimeElapsedInMilliseconds(0);
    setCurrentRound(0);
    setCurrentBucket(undefined);
    setIsRunning(false);
  };

  const toggleIsRunning = () => {
    setIsRunning(!isRunning);
  };

  return {
    timeContext,
    setCurrentBucket,
    currentRound,
    setCurrentRound,
    elapsedTimeInMilliseconds,
    isRunning,
    toggleIsRunning,
    reset,
  };
}
