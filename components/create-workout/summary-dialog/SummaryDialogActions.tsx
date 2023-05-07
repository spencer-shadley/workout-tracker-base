import { Button, DialogActions } from '@mui/material';
import { useSummaryDialogContext } from './context/SummaryDialogContextProvider';
import Link from 'next/link';

export function SummaryDialogActions() {
  const { close } = useSummaryDialogContext();

  return (
    <DialogActions>
      <Button onClick={close}>Close</Button>
      <Link href="/ActiveWorkoutPage">
        <Button>Start Workout</Button>
      </Link>
    </DialogActions>
  );
}
