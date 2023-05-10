import { Chip } from '@mui/material';
import useMuscleGroups from './hooks/useMuscleGroups';
import { ChipsSkeleton } from '../../../../shared/ChipsSkeleton';

export function MuscleGroupsChips({ exerciseName }: { exerciseName: string }) {
  const { muscleGroups, isFetching: isLoading } = useMuscleGroups(exerciseName);

  return (
    <div className="flex gap-1 max-w-xs flex-wrap">
      {isLoading ? (
        <ChipsSkeleton />
      ) : (
        muscleGroups.map((muscleGroup) => (
          <Chip key={muscleGroup} label={muscleGroup} />
        ))
      )}
    </div>
  );
}
