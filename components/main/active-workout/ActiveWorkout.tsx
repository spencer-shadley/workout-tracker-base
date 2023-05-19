import Background from '@/components/shared/backgrounds/Background';
import { Fireworks } from '@/components/shared/backgrounds/particles/Fireworks';
import useTimeInformation from '@/hooks/time/useTimeInformation';
import { secondsToHumanReadable } from '@/utils/time/time';
import { Typography } from '@mui/material';

import ActivitiesList from '../workout/activity/ActivitiesList';
import { TimeProvider } from '../workout/context/TimeContextProvider';
import RoundsStepper from './RoundsStepper';
import TimerControls from './TimerControls';

export default function ActiveWorkout() {
  const timeContext = useTimeInformation();
  const { remainingWorkoutTimeInSeconds, currentBucket, isRunning } =
    timeContext;
  const { activityType: exerciseType } = currentBucket;

  return (
    <>
      {exerciseType === `exercise` || !isRunning ?
        <Background />
        :
        <Fireworks />
      }
      <TimeProvider timeContext={timeContext}>
        <div className="flex flex-col h-[100dvh] overflow-hidden">
          <Typography className="text-gray-100">
            Time left in workout
            {` `}
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
