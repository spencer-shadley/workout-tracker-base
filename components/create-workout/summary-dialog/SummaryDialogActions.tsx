import { Button, DialogActions } from '@mui/material';
import { useSummaryDialogContext } from './context/SummaryDialogContextProvider';

export function SummaryDialogActions() {
  const { close } = useSummaryDialogContext();
  return (
    <DialogActions>
      <Button onClick={close}>Close</Button>
      <Button>Start Workout</Button>
    </DialogActions>
  );
}
