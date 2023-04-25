import { ExerciseType } from '@/components/main/workout/context/TimeContextProvider';

export default function useActivityName(
  exerciseType: ExerciseType,
  exerciseName?: string
): string {
  switch (exerciseType) {
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
