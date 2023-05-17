
/* eslint-disable indent */
import { ListItemText, Typography } from '@mui/material';

import { TextSkeleton } from '../../../shared/TextSkeleton';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';
import { useResultContext } from './context/ResultProvider';

export function ResultListItemText() {
  const { exerciseName } = useResultContext();
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  return (
      isSearching ? (
        <TextSkeleton />
      ) : (
        <ListItemText
        sx={{
        }}
          className="flex-grow w-full"
          primary={<Typography variant='overline'>{isSearching ? '' : exerciseName}</Typography>}
        />
      )
  );
}
