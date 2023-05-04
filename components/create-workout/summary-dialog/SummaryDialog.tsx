import { Dialog, DialogTitle } from '@mui/material';
import { SummaryDialogActions } from './SummaryDialogActions';
import { SummaryContent } from './SummaryDialogContent';
import {
  SummaryDialogProvider,
  SummaryDialogType,
} from './context/SummaryDialogContextProvider';
import { useGetExerciseNames } from '@/hooks/useSessionStorage';

export function SummaryDialog(props: SummaryDialogType) {
  const exerciseNames = useGetExerciseNames();

  const { isOpen, close: handleClose } = props;
  return (
    <SummaryDialogProvider summaryDialogContext={props}>
      <Dialog open={isOpen && exerciseNames.length > 0} onClose={handleClose}>
        <DialogTitle>Workout Summary</DialogTitle>
        <SummaryContent />
        <SummaryDialogActions />
      </Dialog>
    </SummaryDialogProvider>
  );
}
