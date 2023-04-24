import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useWorkoutContext } from './context/WorkoutContextProvider';
import {
  ActiveWorkoutPageProps,
  WorkoutOptions,
} from '@/pages/ActiveWorkoutPage';
import { useState } from 'react';

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
  const router = useRouter();
  const { exercises } = useWorkoutContext();
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOptions>({
    numberOfRounds: 3,
    restBetweenRounds: 0,
    restBetweenExercises: 15,
    exerciseDuration: 45,
  });
  return (
    <Dialog open={isOpen} fullWidth onClose={close}>
      <DialogTitle>Set your workout options</DialogTitle>
      <DialogContent>
        <Typography>Number of rounds</Typography>
        <Slider
          step={1}
          min={1}
          max={5}
          value={workoutOptions.numberOfRounds}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            return `${value} rounds`;
          }}
          onChange={(event, numberOfRounds) => {
            setWorkoutOptions({
              ...workoutOptions,
              numberOfRounds: numberOfRounds as number,
            });
          }}
        />

        <Typography>Rest between exercises</Typography>
        <Slider
          step={5}
          value={workoutOptions.restBetweenExercises}
          min={0}
          max={300}
          valueLabelDisplay="auto"
          marks={makeMinuteMarks()}
          valueLabelFormat={(value) => {
            return `${value}s`;
          }}
          onChange={(event, restBetweenExercises) => {
            setWorkoutOptions({
              ...workoutOptions,
              restBetweenExercises: restBetweenExercises as number,
            });
          }}
        />

        <Typography>Rest between rounds</Typography>
        <Slider
          step={5}
          value={workoutOptions.restBetweenRounds}
          min={0}
          max={300}
          valueLabelDisplay="auto"
          marks={makeMinuteMarks()}
          valueLabelFormat={(value) => {
            return `${value}s`;
          }}
          onChange={(event, restBetweenRounds) => {
            setWorkoutOptions({
              ...workoutOptions,
              restBetweenRounds: restBetweenRounds as number,
            });
          }}
        />

        <Typography>Rest between exercises</Typography>
        <Slider
          step={5}
          value={workoutOptions.restBetweenExercises}
          min={0}
          max={300}
          valueLabelDisplay="auto"
          marks={makeMinuteMarks()}
          valueLabelFormat={(value) => {
            return `${value}s`;
          }}
          onChange={(event, restBetweenExercises) => {
            setWorkoutOptions({
              ...workoutOptions,
              restBetweenExercises: restBetweenExercises as number,
            });
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
            const props: ActiveWorkoutPageProps = {
              exercises,
              workoutOptions,
            };
            router.push({
              pathname: '/ActiveWorkoutPage',
              query: { props: JSON.stringify(props) },
            });
          }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
