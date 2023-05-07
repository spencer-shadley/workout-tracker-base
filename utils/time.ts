import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';
import { WorkoutOptions } from '@/components/settings/WorkoutOptions';
import { getOptions } from '@/hooks/useLocalStorage';
import { getExerciseNames } from '@/hooks/useSessionStorage';

export function millisecondsToHumanReadable(milliseconds: number): string {
  const hoursRemaining = Math.floor(milliseconds / 1000 / 60 / 60);
  milliseconds -= hoursRemaining * 1000 * 60 * 60;

  const minutesRemaining = Math.floor(milliseconds / 1000 / 60);
  milliseconds -= minutesRemaining * 1000 * 60;

  const secondsRemaining = Math.floor(milliseconds / 1000);
  milliseconds -= secondsRemaining * 1000;

  return `${hoursRemaining} hours, ${minutesRemaining} minutes, ${secondsRemaining} seconds`;
}

export function calculateBuckets() {
  const options = getOptions();
  const {
    numberOfRounds,
    restBetweenExercisesInSeconds,
    exerciseDurationInSeconds,
    restBetweenRoundsInSeconds,
  } = options;

  const exercises = getExerciseNames();

  const restBetweenExercisesInMilliseconds =
    restBetweenExercisesInSeconds * 1000;
  const restBetweenRoundsInMilliseconds = restBetweenRoundsInSeconds * 1000;
  const exerciseDurationInMilliseconds = exerciseDurationInSeconds * 1000;

  const buckets: TimeSlot[] = [];
  let passedTimeInMilliseconds = 0;
  for (let round = 0; round < numberOfRounds; round++) {
    for (const observedExercise of exercises) {
      buckets.push({
        containerExercise: observedExercise,
        exerciseType: 'exercise',
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
        exerciseType: 'rest-exercise',
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
      exerciseType: 'rest-round',
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

export function calculateWorkoutTimeInMilliseconds(
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

export function calculateRoundTimeInMilliseconds(
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
