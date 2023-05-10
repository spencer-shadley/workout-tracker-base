import { Skeleton, Typography } from '@mui/material';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';
import { MuscleGroupChips } from '@/components/main/workout/activity/card/MuscleGroupChips';

interface ResultListItemTextProps {
  exerciseName: string;
}
export function ResultListItemText({ exerciseName }: ResultListItemTextProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  return (
    <>
      {isSearching ? (
        <div className="w-full grow">
          <Skeleton
            width={`${Math.random() * 100}%`}
            sx={{ marginRight: '20px' }}
          />
        </div>
      ) : (
        <div className="flex-grow w-full">
          <Typography variant="overline">{exerciseName}</Typography>
          <MuscleGroupChips exerciseName={exerciseName} />
        </div>
      )}
    </>
  );
}
