
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { useTimeContext } from '../../workout/context/TimeContextProvider';
import { TimerControl } from './TimerControl';

export default function TimerControls() {
  const {
    isRunning,
    toggleIsRunning,
    reset,
    skipCurrentActivity,
    currentBucket,
  } = useTimeContext();
  const activityName = currentBucket.containerExercise;

  return (
    <div className="w-full flex justify-evenly my-5">
      <TimerControl
        tooltip="Reset the timer"
        onClick={() => {
          reset();
        }}
      >
        <RestartAltIcon />
      </TimerControl>
      <TimerControl
        tooltip={isRunning ? `Pause the timer` : `Start the timer`}
        onClick={() => {
          toggleIsRunning();
        }}
      >
        {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
      </TimerControl>
      <TimerControl
        tooltip={`Skip ${activityName}`}
        onClick={() => {
          skipCurrentActivity();
        }}
      >
        <SkipNextIcon />
      </TimerControl>
    </div>
  );
}

