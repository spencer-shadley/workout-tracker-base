import { Skeleton } from '@mui/material';

export function TextSkeleton() {
  return (
    <Skeleton width={`${Math.random() * 100}%`} sx={{ marginRight: `20px` }} />
  );
}

