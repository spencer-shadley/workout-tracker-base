import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';
import { Button, Card, Typography } from '@mui/material';
import { WorkoutOptions } from '@/pages/ActiveWorkoutPage';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TimeProvider, TimeSlot } from '../workout/context/TimeContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import RoundsStepper from './RoundsStepper';

function calculateWorkoutTimeInMilliseconds(
  workoutOptions: WorkoutOptions,
  numberOfExercises: number
) {
  const secondsPerRound =
    numberOfExercises *
      (workoutOptions.exerciseDurationInSeconds +
        workoutOptions.restBetweenExercisesInSeconds) +
    workoutOptions.restBetweenRoundsInSeconds -
    workoutOptions.restBetweenExercisesInSeconds;
  return (
    (secondsPerRound * workoutOptions.numberOfRounds -
      workoutOptions.restBetweenRoundsInSeconds) *
    1000
  );
}

function calculateRoundTimeInMilliseconds(
  workoutOptions: WorkoutOptions,
  numberOfExercises: number
): number {
  return (
    (numberOfExercises *
      (workoutOptions.exerciseDurationInSeconds +
        workoutOptions.restBetweenExercisesInSeconds) +
      workoutOptions.restBetweenRoundsInSeconds) *
    1000
  );
}

function calculateBuckets(
  workoutOptions: WorkoutOptions,
  exercises: ExerciseInfo[]
) {
  const {
    numberOfRounds,
    restBetweenExercisesInSeconds,
    exerciseDurationInSeconds,
    restBetweenRoundsInSeconds,
  } = workoutOptions;
  const restBetweenExercisesInMilliseconds =
    restBetweenExercisesInSeconds * 1000;
  const restBetweenRoundsInMilliseconds = restBetweenRoundsInSeconds * 1000;
  const exerciseDurationInMilliseconds = exerciseDurationInSeconds * 1000;

  const buckets: TimeSlot[] = [];
  let passedTimeInMilliseconds = 0;
  for (let round = 0; round < numberOfRounds; round++) {
    for (let exercise = 0; exercise < exercises.length; exercise++) {
      const observedExercise = exercises[exercise];
      buckets.push({
        containerExercise: observedExercise,
        isRest: false,
        endTimeInMilliseconds:
          passedTimeInMilliseconds + exerciseDurationInMilliseconds,
        startTimeInMilliseconds: passedTimeInMilliseconds,
        remainingTimeInMilliseconds: exerciseDurationInMilliseconds,
        isActive: false,
        containerRound: round,
      });
      passedTimeInMilliseconds += exerciseDurationInMilliseconds;
      buckets.push({
        containerExercise: observedExercise,
        isRest: true,
        endTimeInMilliseconds:
          passedTimeInMilliseconds + restBetweenExercisesInMilliseconds,
        startTimeInMilliseconds: passedTimeInMilliseconds,
        remainingTimeInMilliseconds: restBetweenExercisesInMilliseconds,
        isActive: false,
        containerRound: round,
      });
      passedTimeInMilliseconds += restBetweenExercisesInMilliseconds;
    }
    buckets.push({
      containerExercise: undefined,
      isRest: true,
      endTimeInMilliseconds:
        passedTimeInMilliseconds + restBetweenRoundsInMilliseconds,
      startTimeInMilliseconds: passedTimeInMilliseconds,
      remainingTimeInMilliseconds: restBetweenRoundsInMilliseconds,
      isActive: false,
      containerRound: round,
    });
  }
  return buckets;
}

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

  const millisecondsLeftInWorkout =
    calculateWorkoutTimeInMilliseconds(workoutOptions, exercises.length) -
    timeElapsedInMilliseconds;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsedInMilliseconds(timeElapsedInMilliseconds + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeElapsedInMilliseconds]);

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
          <Button>start/pause</Button>
          <Button>reset</Button>
        </div>
      </Card>
      <Exercises />
    </TimeProvider>
  );
}

function millisecondsToHumanReadable(milliseconds: number): string {
  const hoursRemaining = Math.floor(milliseconds / 1000 / 60 / 60);
  milliseconds -= hoursRemaining * 1000 * 60 * 60;

  const minutesRemaining = Math.floor(milliseconds / 1000 / 60);
  milliseconds -= minutesRemaining * 1000 * 60;

  const secondsRemaining = Math.floor(milliseconds / 1000);
  milliseconds -= secondsRemaining * 1000;

  return `${hoursRemaining} hours, ${minutesRemaining} minutes, ${secondsRemaining} seconds`;
}
