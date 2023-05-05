import { ActivityType } from '@/components/main/workout/context/TimeContextProvider';
import { useOptions } from './useLocalStorage';

export default function useActivityDurationInSeconds(
  activityType: ActivityType
) {
  const [workoutOptions] = useOptions();
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
