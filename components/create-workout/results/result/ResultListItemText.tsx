
import { ListItemText, Typography } from '@mui/material';

import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { TextSkeleton } from '../../../shared/TextSkeleton';

export function ResultListItemText() {
  const { exerciseName } = useExerciseContext();

  return (
    exerciseName ?
      <ListItemText
        className="flex-grow w-full"
        primary={
          <Typography color='' variant='overline'>
            {exerciseName}
          </Typography>}
      />
      :
      <TextSkeleton />
  );
}
