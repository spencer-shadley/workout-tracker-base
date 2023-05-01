import { Dialog, DialogTitle } from '@mui/material';
import { SummaryDialogActions } from './SummaryDialogActions';
import { SummaryDialogContent } from './SummaryDialogContent';
import {
  SummaryDialogProvider,
  SummaryDialogType,
} from './context/SummaryDialogContextProvider';

export function SummaryDialog(props: SummaryDialogType) {
  const { isOpen, close: handleClose } = props;
  return (
    <SummaryDialogProvider summaryDialogContext={props}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Workout Summary</DialogTitle>
        <SummaryDialogContent />
        <SummaryDialogActions />
      </Dialog>
    </SummaryDialogProvider>
  );
}
