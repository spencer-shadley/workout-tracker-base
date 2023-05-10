import { Chip } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import useMuscleGroups from './hooks/useMuscleGroups';
import { ChipsSkeleton } from '../../../../shared/ChipsSkeleton';

export function MuscleGroupChips() {
  const { exerciseName, activityType } = useActivityCardContext();

  const { muscleGroups, isFetching: isLoading } = useMuscleGroups(
    exerciseName,
    activityType
  );

  if (activityType !== 'exercise') {
    return null;
  }

  return (
    <div className="flex gap-1">
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
