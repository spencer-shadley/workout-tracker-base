import { random } from 'lodash';

import { Chip, Skeleton } from '@mui/material';

export function ChipsSkeleton() {
  const skeletons = [];
  const randomNumberOfChips = random(1, 5);
  for (let i = 0; i < randomNumberOfChips; i++) {
    skeletons.push(
      <Skeleton key={`chip-skeleton-${i}`} variant="rounded" sx={{ borderRadius: 100 }}>
        <Chip label={'a'.repeat(random(3, 8))} />
      </Skeleton>
    );
  }

  return <div className="flex gap-1">{skeletons}</div>;
}
