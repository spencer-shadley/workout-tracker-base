import { Dialog, DialogTitle } from '@mui/material';
import { SummaryDialogActions } from './SummaryDialogActions';
import { SummaryDialogContent } from './SummaryDialogContent';
import {
  SummaryDialogProvider,
  SummaryDialogType,
} from './context/SummaryDialogContextProvider';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';

export function SummaryDialog(props: SummaryDialogType) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;

  const { isOpen, close: handleClose } = props;
  return (
    <SummaryDialogProvider summaryDialogContext={props}>
      <Dialog
        open={isOpen && addedExerciseNames.length > 0}
        onClose={handleClose}
      >
        <DialogTitle>Workout Summary</DialogTitle>
        <SummaryDialogContent />
        <SummaryDialogActions />
      </Dialog>
    </SummaryDialogProvider>
  );
}
