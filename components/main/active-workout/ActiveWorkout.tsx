import ActivitiesList from '../workout/activity/ActivitiesList';
import { Typography } from '@mui/material';
import { TimeProvider } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import useTimeInformation from '@/hooks/useTimeInformation';
import { secondsToHumanReadable } from '@/utils/time';
import TimerControls from './TimerControls';
import Background from '@/components/shared/backgrounds/Background';
import { Fireworks } from '@/components/shared/backgrounds/particles/Fireworks';

export default function ActiveWorkout() {
  const timeContext = useTimeInformation();
  const { remainingWorkoutTimeInSeconds, currentBucket, isRunning } =
    timeContext;
  const { exerciseType } = currentBucket;

  return (
    <>
      {exerciseType === 'exercise' || !isRunning ? (
        <Background />
      ) : (
        <Fireworks />
      )}
      <TimeProvider timeContext={timeContext}>
        <div className="flex flex-col h-[100dvh] overflow-hidden">
          <Typography className="text-gray-100">
            Time left in workout{' '}
            {secondsToHumanReadable(remainingWorkoutTimeInSeconds)}
          </Typography>
          <RoundsStepper />
          <ActivitiesList shouldIncludeRests />
          <TimerControls />
        </div>
      </TimeProvider>
    </>
  );
}
