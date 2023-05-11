import { Fade, Grow, Typography } from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';

export function ActiveExerciseTimer() {
  const { currentBucket, isRunning } = useTimeContext();
  const { remainingTimeInSeconds } = currentBucket;

  return isRunning ? (
    <Grow
      in={isRunning}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}
    >
      <Typography
        variant="h1"
        fontSize={'90dvw'}
        sx={{
          textShadow: '0px 0px 10px rgba(255,255,255,255.5)',
        }}
      >
        {remainingTimeInSeconds}
      </Typography>
    </Grow>
  ) : (
    <Fade in={!isRunning}>
      <Typography
        variant="h1"
        justifySelf="center"
        alignSelf="center"
        marginRight={2}
      >
        {remainingTimeInSeconds}
      </Typography>
    </Fade>
  );
}
