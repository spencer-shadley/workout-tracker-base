import { Typography } from '@mui/material';
import { useTimeContext } from '../../context/TimeContextProvider';

export function ActiveExercise() {
  const { currentBucket } = useTimeContext();
  const { remainingTimeInSeconds } = currentBucket;

  return (
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
