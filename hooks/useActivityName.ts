import { ActivityType } from '@/components/main/workout/context/TimeContextProvider';
import { logError } from '@/utils/error';

export default function useActivityName(
  activityType: ActivityType,
  exerciseName?: string
): string {
  switch (activityType) {
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
