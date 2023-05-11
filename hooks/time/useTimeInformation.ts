import {
  TimeContextType,
  TimeSlot,
} from '@/components/main/workout/context/TimeContextProvider';
import {
  createTimeBuckets,
  calculateRoundTimeInSeconds,
  calculateWorkoutTimeInSeconds,
} from '@/utils/time';
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useDebugValue,
} from 'react';
import { useSelectedExercises } from '../storage/useSessionStorage';
import { useOptions } from '../storage/useLocalStorage';
import { useInterval } from 'usehooks-ts';

export default function useTimeInformation(): TimeContextType {
  const [exercises] = useSelectedExercises();
  const [workoutOptions] = useOptions();

  const [currentRound, setCurrentRound] = useState<number | null>(null);
  const [elapsedTimeInSeconds, setTimeElapsedInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBucket, setCurrentBucket] = useState<TimeSlot | undefined>(
    undefined
  );
  const [workoutCompletionTime, setWorkoutCompletionTime] = useState<
    number | null
  >(null);

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

  const calculatedBuckets = useCallback(() => {
    return createTimeBuckets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutOptions]);

  const buckets = useMemo(() => {
    return calculatedBuckets();
  }, [calculatedBuckets]);

  useEffect(() => {
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
      } else {
      }
    }
  }, [
    buckets,
    currentBucket,
    elapsedTimeInSeconds,
    isRunning,
    remainingWorkoutTimeInSeconds,
    workoutOptions,
  ]);

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

  useInterval(
    () => {
      setTimeElapsedInSeconds(elapsedTimeInSeconds + 1);
    },
    isRunning ? 1000 : null
  );

  function getCurrentRound(
    hasTimeLeftInWorkout: boolean,
    currentBucket: TimeSlot | undefined
  ): number | null {
    return hasTimeLeftInWorkout ? currentBucket?.containerRound ?? 0 : null;
  }

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
