import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { addExercise } from '@/utils/sessionStorage';

interface AddToExerciseBasketIconButtonProps {
  exerciseName: string;
}

export function AddToExerciseBasketIconButton({
  exerciseName,
}: AddToExerciseBasketIconButtonProps) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;

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
          addExercise(exerciseName);
        }}
      >
        <ListItemIcon>
          {isExerciseAdded ? <CheckIcon /> : <AddIcon />}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
