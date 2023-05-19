import { DialogTitle } from '@mui/material';

import { SummaryContent } from './content/SummaryDialogContent';
import { SummaryDialogActions } from './SummaryDialogActions';

export default function Summary() {
  return (
    <>
      <DialogTitle>
        Workout Summary
      </DialogTitle>
      <SummaryContent />
      <SummaryDialogActions />
    </>
  );
}
