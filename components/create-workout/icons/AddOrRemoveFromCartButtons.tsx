/* eslint-disable indent */
import {
    isMatch, useAddExerciseName, useRemoveExerciseName, useSelectedExercises
} from '@/hooks/storage/useSessionStorage';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup } from '@mui/material';

import { useExerciseContext } from '../../shared/ExerciseProvider';
import { CircleListItemButton } from './CircleListItemButton';

export function AddOrRemoveFromCartButtons() {
  const { exerciseName } = useExerciseContext();
  const exerciseNameOrSkeletonName = exerciseName ?? 'loading...';

  const removeExercise = useRemoveExerciseName(exerciseNameOrSkeletonName);
  const addExerciseName = useAddExerciseName(exerciseNameOrSkeletonName);
  const [exerciseNames] = useSelectedExercises();

  const numberInCart = exerciseNames.filter(
    (name) => isMatch(name, exerciseName ?? '')
  ).length;

  const isExerciseAdded = numberInCart > 0;

  const removeTooltip = `Remove ${exerciseName} from workout`;
  const removeAllTooltip = `Remove all ${exerciseName}${
    exerciseNameOrSkeletonName.endsWith('s') ? '' : 's'
  } from workout`;
  const removeExerciseTooltip =
    numberInCart > 1 ? removeAllTooltip : removeTooltip;
  const addTooltip = `Add ${
    isExerciseAdded ? 'another' : ''
  } ${exerciseName} to workout`;

  return (
    <ButtonGroup>
      <CircleListItemButton
        tooltipTitle={addTooltip}
        badgeContent={numberInCart}
        badgeSx={{ marginRight: '10px' }}
        icon={<AddIcon />}
        onClick={addExerciseName}
      />
      {isExerciseAdded &&
        <CircleListItemButton
          tooltipTitle={removeExerciseTooltip}
          icon={<DeleteIcon />}
          onClick={removeExercise}
        />
      }
    </ButtonGroup>
  );
}

