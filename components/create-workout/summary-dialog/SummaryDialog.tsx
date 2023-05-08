import { Dialog, DialogTitle } from '@mui/material';
import { SummaryDialogActions } from './SummaryDialogActions';
import { SummaryContent } from './SummaryDialogContent';
import {
  SummaryDialogProvider,
  SummaryDialogType,
} from './context/SummaryDialogContextProvider';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';

export function SummaryDialog(props: SummaryDialogType) {
  const [exerciseNames] = useSelectedExercises();

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
