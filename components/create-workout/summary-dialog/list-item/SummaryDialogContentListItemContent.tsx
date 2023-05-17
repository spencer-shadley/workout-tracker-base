import { useCallback } from 'react';

/*eslint-disable indent*/
import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
/* eslint-enable indent */
import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, Typography } from '@mui/material';

import { DescriptionText } from './description/DescriptionText';

export function SummaryDialogContentListItemContent() {
  const { exerciseName } = useExerciseContext();
  const [exercises, setExercises] = useSelectedExercises();

  const removeExercise = useCallback(() => {
    const filteredExercises = exercises.filter((name) => name !== exerciseName);
    setExercises(filteredExercises);
  }, [exerciseName, exercises, setExercises]);

  return (
    <article className="w-full">
      <span className="flex items-center">
        <div className="flex-1 ">
          <Typography variant="overline" fontSize={20}>
            {exerciseName}
          </Typography>
          <MuscleGroupsChips />
        </div>
        <Tooltip title={`Remove ${exerciseName}`} arrow>
          <IconButton
            onClick={() => {
              removeExercise();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </span>
      <DescriptionText />
    </article>
  );
}
