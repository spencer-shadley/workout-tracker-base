import { Button, DialogActions } from '@mui/material';
import { useSummaryDialogContext } from './context/SummaryDialogContextProvider';
import Link from 'next/link';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

export function SummaryDialogActions() {
  const { close } = useSummaryDialogContext();
  const [, setSelectedExercises] = useSelectedExercises();

  return (
    <DialogActions>
      <Button onClick={close}>Close</Button>
      <Button
        onClick={() => {
          close();
          setSelectedExercises([]);
        }}
      >
        Clear and close
      </Button>
      <Link href="/ActiveWorkoutPage">
        <Button>Start Workout</Button>
      </Link>
    </DialogActions>
  );
}
