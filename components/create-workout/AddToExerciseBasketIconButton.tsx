import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import {
  useAddExerciseName,
  useGetExerciseNames,
} from '@/hooks/useSessionStorage';

interface AddToExerciseBasketIconButtonProps {
  exerciseName: string;
}

export function AddToExerciseBasketIconButton({
  exerciseName,
}: AddToExerciseBasketIconButtonProps) {
  const addExerciseName = useAddExerciseName(exerciseName);
  const exerciseNames = useGetExerciseNames();
  const isExerciseAdded = exerciseNames.includes(exerciseName);

  return (
    <Tooltip
      title={`Add ${
        isExerciseAdded ? 'another' : ''
      } ${exerciseName} to workout`}
    >
      <ListItemButton
        sx={{ padding: 0 }}
        onClick={() => {
          addExerciseName();
        }}
      >
        <ListItemIcon>
          {isExerciseAdded ? <CheckIcon /> : <AddIcon />}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
