
import { ListItemText, Typography } from '@mui/material';

import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { TextSkeleton } from '../../../shared/TextSkeleton';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';

export function ResultListItemText() {
  const { exerciseName } = useExerciseContext();
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  return (
    isSearching ?
      <TextSkeleton />
      :
      <ListItemText
        sx={{
        }}
        className="flex-grow w-full"
        primary={<Typography variant='overline'>
          {isSearching ? `` : exerciseName}
        </Typography>}
      />

  );
}
