import { Button } from '@mui/material';
import { useTimeContext } from '../workout/context/TimeContextProvider';

export default function ButtonControls() {
  const timeContext = useTimeContext();
  const { isRunning, toggleIsRunning, reset, skipCurrentActivity } =
    timeContext;
  return (
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
  );
}
