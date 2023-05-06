import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { WorkoutOptionsContent } from './WorkoutOptionsContent';

export function makeMinuteMarks() {
  const maxMinutes = 4;
  const marks = [];
  for (let i = 1; i <= maxMinutes; i++) {
    marks.push({ value: i * 60, label: `${i}m` });
  }
  return marks;
}

interface WorkoutOptionsDialogProps {
  isOpen: boolean;
  close: () => void;
}

export default function WorkoutOptionsDialog({
  isOpen,
  close,
}: WorkoutOptionsDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={isOpen} fullWidth onClose={close}>
      <DialogTitle>Set your workout options</DialogTitle>
      <DialogContent>
        <WorkoutOptionsContent />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            close();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            router.push({
              pathname: '/ActiveWorkoutPage',
            });
          }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
