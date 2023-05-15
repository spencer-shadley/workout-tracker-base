/* eslint-disable indent */
import { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { TimeContextType, TimeSlot } from '@/components/main/workout/context/TimeContextProvider';
import {
    calculateRoundTimeInSeconds, calculateWorkoutTimeInSeconds, createTimeBuckets
} from '@/utils/time/time';

import { release, updateScreenLock } from '../../utils/screenLock';
import { useOptions } from '../storage/useLocalStorage';
import { useSelectedExercises } from '../storage/useSessionStorage';

export default function useTimeInformation(): TimeContextType {

  // CONTEXT
  
  const [exercises] = useSelectedExercises();
  const [workoutOptions] = useOptions();

  // STATE

  const [currentRound, setCurrentRound] = useState<number>(0);
  const [elapsedTimeInSeconds, setTimeElapsedInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBucket, setCurrentBucket] = useState<TimeSlot | undefined>(
    undefined
  );
  const [workoutCompletionTime, setWorkoutCompletionTime] = useState<
    number | null
  >(null);

  // CALCULATIONS

  const remainingWorkoutTimeInSeconds =
    calculateWorkoutTimeInSeconds(workoutOptions, exercises.length) -
    elapsedTimeInSeconds;

  const roundTimeInSeconds = calculateRoundTimeInSeconds(
    workoutOptions,
    exercises.length
  );

  const timeSpentInRoundRestInSeconds =
    currentRound === null
      ? 0
      : currentRound * workoutOptions.restBetweenRoundsInSeconds;

  const remainingRoundTimeInSeconds =
    (elapsedTimeInSeconds - timeSpentInRoundRestInSeconds) % roundTimeInSeconds;

  // EFFECTS AND CALLBACKS
  
  const getCurrentRound = useCallback(
    (hasTimeLeftInWorkout: boolean,
    currentBucket: TimeSlot | undefined
  ): number => {
    if (!hasTimeLeftInWorkout) {
      return workoutOptions.numberOfRounds;
    }

    return  currentBucket?.containerRound ?? 0;
  }, [workoutOptions.numberOfRounds]);

  const createBuckets = useCallback(() => {
    return createTimeBuckets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutOptions]);

  const buckets = useMemo(() => {
    return createBuckets();
  }, [createBuckets]);

  const handleBucketChange = useCallback(() => {
    const hasTimeLeftInWorkout = remainingWorkoutTimeInSeconds > 0;

    setWorkoutCompletionTime(hasTimeLeftInWorkout ? null : Date.now());
    setCurrentRound(getCurrentRound(hasTimeLeftInWorkout, currentBucket));
    setIsRunning(isRunning && hasTimeLeftInWorkout);

    for (const bucket of buckets) {
      const isBucketActive =
        elapsedTimeInSeconds < bucket.endTimeInSeconds &&
        elapsedTimeInSeconds >= bucket.startTimeInSeconds;

      const activityDuration =
        bucket.endTimeInSeconds - bucket.startTimeInSeconds;
      bucket.progressPercent = isBucketActive
        ? (bucket.remainingTimeInSeconds / activityDuration) * 100
        : 0;
      if (isBucketActive) {
        bucket.remainingTimeInSeconds =
        bucket.endTimeInSeconds - elapsedTimeInSeconds;

        setCurrentBucket(bucket);
      }
    }
  }, [buckets, currentBucket, elapsedTimeInSeconds, getCurrentRound, isRunning, remainingWorkoutTimeInSeconds])

  useEffect(() => {
    handleBucketChange();
  }, [buckets, currentBucket, elapsedTimeInSeconds, handleBucketChange, isRunning, remainingWorkoutTimeInSeconds, workoutOptions]);

  const reset = useCallback(() => {
    setTimeElapsedInSeconds(0);
    setCurrentRound(0);
    setCurrentBucket(undefined);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    setIsRunning(false);
    reset();
  }, [reset, workoutOptions]);

  useEffect(() => {
    if (isRunning) {
      updateScreenLock();
    } else {
      release();
    }
  }, [isRunning]);

  useInterval(
    () => {
      setTimeElapsedInSeconds(elapsedTimeInSeconds + 1);
    },
    isRunning ? 1000 : null
  );

  // RETURN

  const toggleIsRunning = () => {
    setIsRunning(!isRunning);
  };

  const skipCurrentActivity = () => {
    setTimeElapsedInSeconds(currentBucket?.endTimeInSeconds ?? 0);
  };

  const jumpToBucket = (bucket: TimeSlot) => {
    setTimeElapsedInSeconds(bucket.startTimeInSeconds);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const timeInfo = {
    currentRound,
    remainingRoundTimeInSeconds,
    remainingWorkoutTimeInSeconds,
    isRunning,
    buckets,
    elapsedTimeInSeconds,
    currentBucket: currentBucket ?? buckets[0],
    setCurrentBucket,
    setCurrentRound,
    toggleIsRunning,
    pause,
    reset,
    skipCurrentActivity,
    jumpToBucket,
    workoutCompletionTime,
  };

  useDebugValue(timeInfo);

  return timeInfo;
}
