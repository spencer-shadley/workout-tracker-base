/* eslint-disable indent */
import {
    ExerciseDurationOption
} from '@/components/settings/workout-options/ExerciseDurationOption';
import {
    RestBetweenExercisesOption
} from '@/components/settings/workout-options/RestBetweenExercisesOption';
/* eslint-enable indent */
import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { GenericDialogProps } from '@/components/shared/PromptDialog';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export function EditExerciseDialog({ close, isOpen }: GenericDialogProps) {
  const { exerciseName } = useExerciseContext();
  return <Dialog open={isOpen} onClose={close}>
    <DialogTitle>
      {`Edit ${exerciseName}`}
    </DialogTitle>
    <DialogContent>
      <ExerciseDurationOption />
      <RestBetweenExercisesOption />
    </DialogContent>
  </Dialog>;
}
