import { Typography } from '@mui/material';

interface ActiveExerciseProps {
  remainingTimeInSeconds: number;
}
export function ActiveExercise({
  remainingTimeInSeconds,
}: ActiveExerciseProps) {
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
