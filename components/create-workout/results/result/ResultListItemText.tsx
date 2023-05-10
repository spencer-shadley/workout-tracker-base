import { Typography } from '@mui/material';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';
import { MuscleGroupsChips } from '@/components/main/workout/activity/card/MuscleGroupsChips';
import { TextSkeleton } from '../../../shared/TextSkeleton';

interface ResultListItemTextProps {
  exerciseName: string;
}
export function ResultListItemText({ exerciseName }: ResultListItemTextProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  return (
    <div className="flex-grow w-full">
      {isSearching ? (
        <TextSkeleton />
      ) : (
        <Typography variant="overline">{exerciseName}</Typography>
      )}
      <MuscleGroupsChips exerciseName={exerciseName} />
    </div>
  );
}
