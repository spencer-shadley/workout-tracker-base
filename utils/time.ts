import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';
import { WorkoutOptions } from '@/components/settings/WorkoutOptions';
import { getOptions } from '@/hooks/useLocalStorage';
import { getExerciseNames } from '@/hooks/useSessionStorage';

export function secondsToHumanReadable(seconds: number): string {
  const hoursRemaining = Math.floor(seconds / 60 / 60);
  seconds -= hoursRemaining * 60 * 60;

  const minutesRemaining = Math.floor(seconds / 60);
  seconds -= minutesRemaining * 60;

  const secondsRemaining = Math.floor(seconds);
  seconds -= secondsRemaining;

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

  const buckets: TimeSlot[] = [];
  let passedTimeInSeconds = 0;
  for (let round = 0; round < numberOfRounds; round++) {
    for (const observedExercise of exercises) {
      buckets.push({
        containerExercise: observedExercise,
        exerciseType: 'exercise',
        endTimeInSeconds: passedTimeInSeconds + exerciseDurationInSeconds,
        startTimeInSeconds: passedTimeInSeconds,
        remainingTimeInSeconds: exerciseDurationInSeconds,
        isActive: false,
        containerRound: round,
      });
      passedTimeInSeconds += exerciseDurationInSeconds;
      buckets.push({
        containerExercise: observedExercise,
        exerciseType: 'rest-exercise',
        endTimeInSeconds: passedTimeInSeconds + restBetweenExercisesInSeconds,
        startTimeInSeconds: passedTimeInSeconds,
        remainingTimeInSeconds: restBetweenExercisesInSeconds,
        isActive: false,
        containerRound: round,
      });
      passedTimeInSeconds += restBetweenExercisesInSeconds;
    }
    buckets.push({
      containerExercise: undefined,
      exerciseType: 'rest-round',
      endTimeInSeconds: passedTimeInSeconds + restBetweenRoundsInSeconds,
      startTimeInSeconds: passedTimeInSeconds,
      remainingTimeInSeconds: restBetweenRoundsInSeconds,
      isActive: false,
      containerRound: round,
    });
  }
  return buckets;
}

export function calculateWorkoutTimeInSeconds(
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
    secondsPerRound * workoutOptions.numberOfRounds -
    workoutOptions.restBetweenRoundsInSeconds
  );
}

export function calculateRoundTimeInSeconds(
  workoutOptions: WorkoutOptions,
  numberOfExercises: number
): number {
  return (
    numberOfExercises *
      (workoutOptions.exerciseDurationInSeconds +
        workoutOptions.restBetweenExercisesInSeconds) +
    workoutOptions.restBetweenRoundsInSeconds
  );
}
