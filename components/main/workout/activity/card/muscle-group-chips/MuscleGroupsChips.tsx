/* eslint-disable indent */
import {
    useCreateWorkoutContext
} from '@/components/create-workout/context/CreateWorkoutContextProvider';

import { ChipsSkeleton } from '../../../../../shared/ChipsSkeleton';
import useMuscleGroups from './hooks/useMuscleGroups';
import { MuscleGroupChip } from './MuscleGroupChip';

export function MuscleGroupsChips({ exerciseName }: { exerciseName: string }) {
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;
  const { muscleGroups, isFetching: isLoading, refetch } = useMuscleGroups({ prompt: exerciseName, queryOptionOverrides: { enabled: false } });

  requestIdleCallback(() => {
    if (!muscleGroups) {
      refetch();
    }
  })

  return (
    <div className="flex gap-1 max-w-xs flex-wrap">
      {(isLoading || isSearching) ? (
        <ChipsSkeleton />
      ) : (
        muscleGroups.map((muscleGroup) => (
          <MuscleGroupChip key={muscleGroup} muscleGroup={muscleGroup} />
        ))
      )}
    </div>
  );
}
