import { IconButton } from '@mui/material';
import { useWorkoutContext } from '../../context/WorkoutContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';

export function ActivityCardCloseButton() {
  const { exerciseName, isDismissible } = useActivityCardContext();
  const { removeExercise } = useWorkoutContext();

  return isDismissible && exerciseName ? (
    <IconButton
      onClick={() => {
        removeExercise(exerciseName);
      }}
    >
      <CloseIcon style={{ alignSelf: 'center', justifySelf: 'flex-end' }} />
    </IconButton>
  ) : null;
}
