import { Fab, SxProps, Theme, Tooltip } from '@mui/material';
import { useTimeContext } from '../workout/context/TimeContextProvider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { PropsWithChildren, cloneElement, isValidElement } from 'react';

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
        tooltip={isRunning ? 'Pause the timer' : 'Start the timer'}
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

interface TimerControlProps extends PropsWithChildren {
  onClick: () => void;
  tooltip: string;
  sx?: SxProps<Theme>;
}

function TimerControl({ children, onClick, sx, tooltip }: TimerControlProps) {
  const fullSx: SxProps<Theme> = {
    ...sx,
  };
  let childrenWithColor = children;

  if (isValidElement(childrenWithColor)) {
    childrenWithColor = cloneElement(childrenWithColor, {
      color: 'action',
    } as unknown as HTMLDivElement);
  }

  return (
    <Tooltip title={tooltip} arrow>
      <Fab onClick={onClick} sx={fullSx} className="bg-gray-300">
        {childrenWithColor}
      </Fab>
    </Tooltip>
  );
}
