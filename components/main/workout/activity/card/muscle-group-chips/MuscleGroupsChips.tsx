/* eslint-disable indent */
import {
    useCreateWorkoutContext
} from '@/components/create-workout/context/CreateWorkoutContextProvider';
import { useExerciseContext } from '@/components/shared/ExerciseProvider';

import { ChipsSkeleton } from '../../../../../shared/ChipsSkeleton';
import { MuscleGroupChip } from './MuscleGroupChip';

export function MuscleGroupsChips() {
  const { exerciseName } = useExerciseContext();
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching, searchedExerciseResults } = searchInput;
  // const { muscleGroups, isFetching: isLoading, refetch } = useMuscleGroups({ prompt: exerciseName ?? ``, queryOptionOverrides: { enabled: false } });

  const muscleGroups = searchedExerciseResults.find(exercise => exercise.exerciseName === exerciseName)?.muscleGroups ?? [];

  return (
    <div className="flex gap-1 max-w-s flex-wrap">
      {isSearching ?
        <ChipsSkeleton />
       :
        muscleGroups.map((muscleGroup) =>
          <MuscleGroupChip key={muscleGroup} muscleGroup={muscleGroup} />
        )
      }
    </div>
  );
}
