import { DialogContentText, Stack } from '@mui/material';

import { SummaryContentSkeletonItem } from './SummaryContentSkeletonItem';

export function SummaryContentSkeleton() {
  return (
    <Stack>
      <DialogContentText>
        Building a great workout just for you...
      </DialogContentText>
      <SummaryContentSkeletonItem />
      <SummaryContentSkeletonItem />
      <SummaryContentSkeletonItem />
    </Stack>
  );
}
