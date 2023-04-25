import { ActivityType } from '@/components/main/workout/context/TimeContextProvider';
import { useWorkoutOptionsContext } from '@/components/main/workout/context/WorkoutOptionsContextProvider';

export default function useActivityDurationInSeconds(
  activityType: ActivityType
) {
  const { workoutOptions } = useWorkoutOptionsContext();
  const {
    exerciseDurationInSeconds,
    restBetweenExercisesInSeconds,
    restBetweenRoundsInSeconds,
  } = workoutOptions;
  switch (activityType) {
    case 'exercise':
      return exerciseDurationInSeconds;
    case 'rest-exercise':
      return restBetweenExercisesInSeconds;
    case 'rest-round':
      return restBetweenRoundsInSeconds;
    default:
      console.error('Invalid activity type');
      return 0;
  }
}
