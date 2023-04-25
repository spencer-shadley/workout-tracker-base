import { ActivityType } from '@/components/main/workout/context/TimeContextProvider';

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
  console.error('No exercise title found');
  return 'No title found';
}
