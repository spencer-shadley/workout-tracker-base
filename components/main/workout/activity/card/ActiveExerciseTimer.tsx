import { Typography } from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';

export function ActiveExerciseTimer() {
  const { currentBucket, isRunning } = useTimeContext();
  const { remainingTimeInSeconds } = currentBucket;

  return isRunning ? (
    <Typography
      variant="h1"
      fontSize={'100dvw'}
      justifySelf="center"
      alignSelf="center"
      marginRight={2}
      position="fixed"
      top="50%"
      left="50%"
      zIndex={1}
      sx={{
        transform: 'translate(-50%, -50%)',
      }}
    >
      {remainingTimeInSeconds}
    </Typography>
  ) : (
    <Typography
      variant="h1"
      justifySelf="center"
      alignSelf="center"
      marginRight={2}
    >
      {remainingTimeInSeconds}
    </Typography>
  );
}
