import {
  TimeContextType,
  TimeSlot,
} from '@/components/main/workout/context/TimeContextProvider';
import {
  calculateBuckets,
  calculateRoundTimeInMilliseconds,
  calculateWorkoutTimeInMilliseconds,
} from '@/utils/time';
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useDebugValue,
} from 'react';
import { useSelectedExercises } from './useSessionStorage';
import { useOptions } from './useLocalStorage';
import { useInterval } from 'usehooks-ts';

export default function useTimeInformation(): TimeContextType {
  const [exercises] = useSelectedExercises();
  const [workoutOptions] = useOptions();

  const [currentRound, setCurrentRound] = useState<number | null>(null);
  const [elapsedTimeInMilliseconds, setTimeElapsedInMilliseconds] =
    useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBucket, setCurrentBucket] = useState<TimeSlot | undefined>(
    undefined
  );
  const [workoutCompletionTime, setWorkoutCompletionTime] = useState<
    number | null
  >(null);
  const [mostRecentCompletedExerciseTime, setMostRecentCompletedExerciseTime] =
    useState<number | null>(null);

  const remainingWorkoutTimeInMilliseconds =
    calculateWorkoutTimeInMilliseconds(workoutOptions, exercises.length) -
    elapsedTimeInMilliseconds;

  const roundTimeInMilliseconds = calculateRoundTimeInMilliseconds(
    workoutOptions,
    exercises.length
  );

  const timeSpentInRoundRestInMilliseconds =
    currentRound === null
      ? 0
      : currentRound * workoutOptions.restBetweenRoundsInSeconds * 1000;

  const remainingRoundTimeInMilliseconds =
    (elapsedTimeInMilliseconds - timeSpentInRoundRestInMilliseconds) %
    roundTimeInMilliseconds;

  const calculatedBuckets = useCallback(() => {
    return calculateBuckets();
  }, []);

  const buckets = useMemo(() => {
    return calculatedBuckets();
  }, [calculatedBuckets]);

  useEffect(() => {
    const hasTimeLeftInWorkout = remainingWorkoutTimeInMilliseconds > 0;

    setWorkoutCompletionTime(hasTimeLeftInWorkout ? null : Date.now());
    setCurrentRound(getCurrentRound(hasTimeLeftInWorkout, currentBucket));
    setIsRunning(isRunning && hasTimeLeftInWorkout);

    for (const bucket of buckets) {
      const isBucketActive =
        elapsedTimeInMilliseconds < bucket.endTimeInMilliseconds &&
        elapsedTimeInMilliseconds >= bucket.startTimeInMilliseconds;

      if (isBucketActive) {
        bucket.remainingTimeInMilliseconds =
          bucket.endTimeInMilliseconds - elapsedTimeInMilliseconds;

        if (
          currentBucket !== bucket &&
          currentBucket?.exerciseType === 'exercise'
        ) {
          setMostRecentCompletedExerciseTime(Date.now());
        }

        setCurrentBucket(bucket);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buckets, currentBucket, elapsedTimeInMilliseconds]);

  useInterval(
    () => {
      setTimeElapsedInMilliseconds(elapsedTimeInMilliseconds + 1000);
    },
    isRunning ? 1000 : null
  );

  function getCurrentRound(
    hasTimeLeftInWorkout: boolean,
    currentBucket: TimeSlot | undefined
  ): number | null {
    return hasTimeLeftInWorkout ? currentBucket?.containerRound ?? 0 : null;
  }

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

  const jumpToBucket = (bucket: TimeSlot) => {
    setTimeElapsedInMilliseconds(bucket.startTimeInMilliseconds);
  };

  const timeInfo = {
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
    jumpToBucket,
    workoutCompletionTime,
    mostRecentCompletedExerciseTime,
  };

  useDebugValue(timeInfo);

  return timeInfo;
}
