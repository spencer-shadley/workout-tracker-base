import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';
import { Button, Card, Typography } from '@mui/material';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TimeProvider, TimeSlot } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import {
  calculateBuckets,
  calculateRoundTimeInMilliseconds,
  calculateWorkoutTimeInMilliseconds,
  millisecondsToHumanReadable,
} from '@/components/shared/utils/time';

// linear progress per exercise
// stepper for rounds
// linear progress for everything

export default function ActiveWorkout() {
  const { workoutOptions } = useWorkoutOptionsContext();
  const { numberOfRounds } = workoutOptions;
  const { exercises } = useWorkoutContext();
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [timeElapsedInMilliseconds, setTimeElapsedInMilliseconds] =
    useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBucket, setCurrentBucket] = useState<TimeSlot | undefined>(
    undefined
  );

  const millisecondsLeftInWorkout =
    calculateWorkoutTimeInMilliseconds(workoutOptions, exercises.length) -
    timeElapsedInMilliseconds;

  const roundTimeInMilliseconds = calculateRoundTimeInMilliseconds(
    workoutOptions,
    exercises.length
  );
  const timeSpentInRoundRestInMilliseconds =
    currentRound * workoutOptions.restBetweenRoundsInSeconds * 1000;

  const remainingRoundTimeInMilliseconds =
    (timeElapsedInMilliseconds - timeSpentInRoundRestInMilliseconds) %
    roundTimeInMilliseconds;

  const buckets = useCallback(() => {
    return calculateBuckets(workoutOptions, exercises);
  }, [exercises, workoutOptions]);

  const bucketValues = useMemo(() => {
    const x = buckets();
    console.log(x);
    return x;
  }, [buckets]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeElapsedInMilliseconds(timeElapsedInMilliseconds + 1000);
      }, 1000);
      setCurrentRound(currentBucket?.containerRound ?? 0);
      return () => clearInterval(interval);
    }
  }, [currentBucket?.containerRound, timeElapsedInMilliseconds, isRunning]);

  useEffect(() => {
    for (const bucket of bucketValues) {
      if (
        timeElapsedInMilliseconds < bucket.endTimeInMilliseconds &&
        timeElapsedInMilliseconds >= bucket.startTimeInMilliseconds
      ) {
        bucket.remainingTimeInMilliseconds =
          bucket.endTimeInMilliseconds - timeElapsedInMilliseconds;
        setCurrentBucket(bucket);
      }
    }
  }, [bucketValues, timeElapsedInMilliseconds]);

  return (
    <TimeProvider
      timeContext={{
        currentRound,
        remainingRoundTimeInMilliseconds,
        currentExercise: '',
        remainingExerciseTimeInMilliseconds: 0,
        remainingWorkoutTimeInMilliseconds: millisecondsLeftInWorkout,
        isRunning,
        buckets: bucketValues,
        elapsedTimeInMilliseconds: timeElapsedInMilliseconds,
        currentBucket: currentBucket ?? bucketValues[0],
      }}
    >
      <Card>
        <Typography>
          Time left in workout{' '}
          {millisecondsToHumanReadable(millisecondsLeftInWorkout)}
        </Typography>
        <RoundsStepper
          currentRound={currentRound}
          numberOfRounds={numberOfRounds}
          setCurrentRound={setCurrentRound}
        />
        <div>
          <Button
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            {isRunning ? 'pause' : 'start'}
          </Button>
          <Button
            onClick={() => {
              setTimeElapsedInMilliseconds(0);
            }}
          >
            reset
          </Button>
        </div>
      </Card>
      <Exercises />
    </TimeProvider>
  );
}
