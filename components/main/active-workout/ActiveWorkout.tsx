import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import ActivitiesList from '../workout/activity/ActivitiesList';
import { Button, Card, Typography } from '@mui/material';
import { TimeProvider } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import useTimeInformation from '@/hooks/useTimeInformation';
import { millisecondsToHumanReadable } from '@/utils/time';

export default function ActiveWorkout() {
  const { workoutOptions } = useWorkoutOptionsContext();
  const { numberOfRounds } = workoutOptions;
  const timeContext = useTimeInformation();
  const {
    remainingWorkoutTimeInMilliseconds,
    currentRound,
    isRunning,
    setCurrentRound,
    toggleIsRunning,
    reset,
    skipCurrentActivity,
  } = timeContext;

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
        <div>
          <Button
            onClick={() => {
              toggleIsRunning();
            }}
          >
            {isRunning ? 'pause' : 'start'}
          </Button>
          <Button
            onClick={() => {
              reset();
            }}
          >
            reset
          </Button>
          <Button
            onClick={() => {
              skipCurrentActivity();
            }}
          >
            skip
          </Button>
        </div>
      </Card>
      <ActivitiesList shouldIncludeRests />
    </TimeProvider>
  );
}
