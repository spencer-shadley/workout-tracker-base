import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from '@mui/material';

function makeMinuteMarks() {
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
  return (
    <Dialog open={isOpen} fullWidth onClose={close}>
      <DialogTitle>Set your workout options</DialogTitle>
      <DialogContent>
        <Typography>Number of rounds</Typography>
        <Slider
          step={1}
          defaultValue={3}
          min={1}
          max={5}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            return `${value} rounds`;
          }}
        />

        <Typography>Break between sets</Typography>
        <Slider
          step={5}
          defaultValue={15}
          min={0}
          max={300}
          valueLabelDisplay="auto"
          marks={makeMinuteMarks()}
          valueLabelFormat={(value) => {
            return `${value}s`;
          }}
        />

        <Typography>Break between exercises</Typography>
        <Slider
          step={5}
          defaultValue={15}
          min={0}
          max={300}
          valueLabelDisplay="auto"
          marks={makeMinuteMarks()}
          valueLabelFormat={(value) => {
            return `${value}s`;
          }}
        />
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
            window.location.href = 'ActiveWorkout';
          }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
