import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

interface AddToExerciseBasketIconButtonProps {
  exerciseName: string;
}
export function AddToExerciseBasketIconButton({
  exerciseName,
}: AddToExerciseBasketIconButtonProps) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addExerciseNameToCart, addedExerciseNames } = exercisesCart;
  const isExerciseAdded = addedExerciseNames.includes(exerciseName);
  return (
    <Tooltip
      title={`Add ${
        isExerciseAdded ? 'another' : ''
      } ${exerciseName} to workout`}
    >
      <ListItemButton
        sx={{ padding: 0 }}
        onClick={() => {
          addExerciseNameToCart(exerciseName);
        }}
      >
        <ListItemIcon>
          {isExerciseAdded ? <CheckIcon /> : <AddIcon />}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
