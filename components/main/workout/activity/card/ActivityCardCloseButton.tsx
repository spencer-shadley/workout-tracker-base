import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import { useWorkoutContext } from '../../context/WorkoutContextProvider';

export function ActivityCardCloseButton() {
  const { exerciseName } = useExerciseContext();
  const { isDismissible } = useActivityCardContext();
  const { removeExercise } = useWorkoutContext();

  return isDismissible && exerciseName ?
    <IconButton
      onClick={() => {
        removeExercise(exerciseName);
      }}
    >
      <CloseIcon style={{ alignSelf: 'center', justifySelf: 'flex-end' }} />
    </IconButton>
    : null;
}
