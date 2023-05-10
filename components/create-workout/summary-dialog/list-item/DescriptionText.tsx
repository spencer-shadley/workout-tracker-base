import { DialogContentText, Skeleton } from '@mui/material';
import { logError } from '@/utils/logger';
import { UseQueryResult } from '@tanstack/react-query';

export function DescriptionText({
  isFetching: isLoading,
  error,
  data: description,
}: UseQueryResult<string, unknown>) {
  const text = (
    <DialogContentText variant="subtitle2">
      {description ? description : 'Click to load description'}
    </DialogContentText>
  );

  if (isLoading) {
    return <Skeleton>{text}</Skeleton>;
  }

  if (error) {
    logError(error);
    return <DialogContentText>Error fetching description</DialogContentText>;
  }

  return text;
}
