import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import ActivitiesList from '../workout/activity/ActivitiesList';
import { Card, Typography } from '@mui/material';
import { TimeProvider } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import useTimeInformation from '@/hooks/useTimeInformation';
import { millisecondsToHumanReadable } from '@/utils/time';
import ButtonControls from './ButtonControls';

export default function ActiveWorkout() {
  const { workoutOptions } = useWorkoutOptionsContext();
  const { numberOfRounds } = workoutOptions;
  const timeContext = useTimeInformation();
  const { remainingWorkoutTimeInMilliseconds, currentRound, setCurrentRound } =
    timeContext;

  return (
    <TimeProvider timeContext={timeContext}>
      <Card>
        <Typography>
          Time left in workout{' '}
          {millisecondsToHumanReadable(remainingWorkoutTimeInMilliseconds)}
        </Typography>
        <RoundsStepper
          currentRound={currentRound}
          numberOfRounds={numberOfRounds}
          setCurrentRound={setCurrentRound}
        />
        <ButtonControls />
      </Card>
      <ActivitiesList shouldIncludeRests />
    </TimeProvider>
  );
}
