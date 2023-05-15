/* eslint-disable indent */
import {
    useAddExerciseName, useRemoveExerciseName, useSelectedExercises
} from '@/hooks/storage/useSessionStorage';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup } from '@mui/material';

import { CircleListItemButton } from './CircleListItemButton';

interface AddOrRemoveFromCartButtonsProps {
  exerciseName: string;
}

export function AddOrRemoveFromCartButtons({
  exerciseName,
}: AddOrRemoveFromCartButtonsProps) {
  const removeExercise = useRemoveExerciseName(exerciseName);
  const addExerciseName = useAddExerciseName(exerciseName);
  const [exerciseNames] = useSelectedExercises();

  const numberInCart = exerciseNames.filter(
    (name) => isMatch(name, exerciseName)
  ).length;

  const isExerciseAdded = numberInCart > 0;

  const removeTooltip = `Remove ${exerciseName} from workout`;
  const removeAllTooltip = `Remove all ${exerciseName}${
    exerciseName.endsWith('s') ? '' : 's'
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
      {isExerciseAdded && (
        <CircleListItemButton
          tooltipTitle={removeExerciseTooltip}
          icon={<DeleteIcon />}
          onClick={removeExercise}
        />
      )}
    </ButtonGroup>
  );
}

function isMatch(itemInCartName: string, newItem: string) {
  if (itemInCartName === newItem) {
    return true;
  }

  const duplicateAdditionRegex = new RegExp(`${newItem} \\(\\d+\\)`);
  return duplicateAdditionRegex.test(itemInCartName);

}