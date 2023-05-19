import { TimeSlot } from '@/components/main/workout/context/TimeContextProvider';
import { WorkoutOptions } from '@/components/settings/workout-options/WorkoutOptions';
import { getOptions } from '@/hooks/storage/useLocalStorage';
import { getExerciseNames } from '@/hooks/storage/useSessionStorage';

export function secondsToHumanReadable(seconds: number): string {
  const hoursRemaining = Math.floor(seconds / 60 / 60);
  seconds -= hoursRemaining * 60 * 60;

  const minutesRemaining = Math.floor(seconds / 60);
  seconds -= minutesRemaining * 60;

  const secondsRemaining = Math.floor(seconds);
  seconds -= secondsRemaining;

  return `${hoursRemaining} hours, ${minutesRemaining} minutes, ${secondsRemaining} seconds`;
}

const prepTimeInSeconds = 5;
export function createTimeBuckets() {
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
    const prepTimeSlot: TimeSlot = {
      containerExercise: undefined,
      activityType: `prep`,
      endTimeInSeconds: passedTimeInSeconds + prepTimeInSeconds,
      containerRound: round,
      startTimeInSeconds: passedTimeInSeconds,
      remainingTimeInSeconds: prepTimeInSeconds,
      isActive: false,
      progressPercent: 0,
    };
    passedTimeInSeconds += prepTimeInSeconds;
    buckets.push(prepTimeSlot);

    for (const observedExercise of exercises) {
      const exerciseTimeSlot: TimeSlot = {
        containerExercise: observedExercise,
        activityType: `exercise`,
        endTimeInSeconds: passedTimeInSeconds + exerciseDurationInSeconds,
        startTimeInSeconds: passedTimeInSeconds,
        remainingTimeInSeconds: exerciseDurationInSeconds,
        isActive: false,
        containerRound: round,
        progressPercent: 0,
      };
      passedTimeInSeconds += exerciseDurationInSeconds;
      buckets.push(exerciseTimeSlot);

      const exerciseRestTimeSlot: TimeSlot = {
        containerExercise: observedExercise,
        activityType: `rest-exercise`,
        endTimeInSeconds: passedTimeInSeconds + restBetweenExercisesInSeconds,
        startTimeInSeconds: passedTimeInSeconds,
        remainingTimeInSeconds: restBetweenExercisesInSeconds,
        isActive: false,
        containerRound: round,
        progressPercent: 0,
      };
      buckets.push(exerciseRestTimeSlot);
      passedTimeInSeconds += restBetweenExercisesInSeconds;
    }

    const roundRestTimeSlot: TimeSlot = {
      containerExercise: undefined,
      activityType: `rest-round`,
      endTimeInSeconds: passedTimeInSeconds + restBetweenRoundsInSeconds,
      startTimeInSeconds: passedTimeInSeconds,
      remainingTimeInSeconds: restBetweenRoundsInSeconds,
      isActive: false,
      containerRound: round,
      progressPercent: 0,
    };
    buckets.push(roundRestTimeSlot);
    passedTimeInSeconds += restBetweenRoundsInSeconds;
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
