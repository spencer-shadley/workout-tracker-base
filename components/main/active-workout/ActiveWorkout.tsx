import ActivitiesList from '../workout/activity/ActivitiesList';
import { Typography } from '@mui/material';
import { TimeProvider } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import useTimeInformation from '@/hooks/useTimeInformation';
import { millisecondsToHumanReadable } from '@/utils/time';
import TimerControls from './TimerControls';
import { Fireworks } from '@/components/shared/backgrounds/Fireworks';
import Background from '@/components/shared/backgrounds/Background';

export default function ActiveWorkout() {
  const timeContext = useTimeInformation();
  const { remainingWorkoutTimeInMilliseconds, currentBucket, isRunning } =
    timeContext;
  const { exerciseType } = currentBucket;

  return (
    <TimeProvider timeContext={timeContext}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Typography className="text-gray-100">
          Time left in workout{' '}
          {millisecondsToHumanReadable(remainingWorkoutTimeInMilliseconds)}
        </Typography>
        <RoundsStepper />
        <ActivitiesList shouldIncludeRests />
        <TimerControls />
      </div>
      {exerciseType === 'exercise' || !isRunning ? (
        <Background />
      ) : (
        <Fireworks />
      )}
    </TimeProvider>
  );
}
