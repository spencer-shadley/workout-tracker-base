import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { logError } from '@/utils/logger';

export default function useActivityName(): string {
  const { exerciseName, activityType } = useExerciseContext();

  switch (activityType) {
  case 'prep':
    return 'Get Ready!';
  case 'exercise':
    if (!exerciseName) {
      break;
    }

    return exerciseName;
  case 'rest-exercise':
    return 'Rest';
  case 'rest-round':
    return 'Round Rest';
  }

  logError('No activity type found');
  return 'No title found';
}
