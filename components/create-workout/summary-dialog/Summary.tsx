import { DialogTitle } from '@mui/material';
import { SummaryDialogActions } from './SummaryDialogActions';
import { SummaryContent } from './SummaryDialogContent';

export default function Summary() {
  return (
    <>
      <DialogTitle>Workout Summary</DialogTitle>
      <SummaryContent />
      <SummaryDialogActions />
    </>
  );
}
