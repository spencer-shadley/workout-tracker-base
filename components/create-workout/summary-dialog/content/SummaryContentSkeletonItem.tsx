import { Skeleton, Stack } from '@mui/material';

export function SummaryContentSkeletonItem() {
  return (
    <Stack direction="row" className="flex gap-3 ">
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        sx={{
          alignSelf: `center`,
        }} />
      <Skeleton variant="text" sx={{ fontSize: `5rem` }} className="grow" />
    </Stack>
  );
}
