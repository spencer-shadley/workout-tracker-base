import useMuscleGroups from './hooks/useMuscleGroups';
import { ChipsSkeleton } from '../../../../../shared/ChipsSkeleton';
import { MuscleGroupChip } from './MuscleGroupChip';

export function MuscleGroupsChips({ exerciseName }: { exerciseName: string }) {
  const { muscleGroups, isFetching: isLoading } = useMuscleGroups(exerciseName);

  return (
    <div className="flex gap-1 max-w-xs flex-wrap">
      {isLoading ? (
        <ChipsSkeleton />
      ) : (
        muscleGroups.map((muscleGroup) => (
          <MuscleGroupChip key={muscleGroup} muscleGroup={muscleGroup} />
        ))
      )}
    </div>
  );
}
