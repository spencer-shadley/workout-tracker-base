import { Avatar, ListItem, ListItemAvatar } from '@mui/material';
import { SummaryDialogContentListItemContent } from './SummaryDialogContentListItemContent';

interface SummaryDialogContentListItemProps {
  exerciseNumber: number;
  exerciseName: string;
}
export function SummaryDialogContentListItem({
  exerciseNumber,
  exerciseName,
}: SummaryDialogContentListItemProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{exerciseNumber}</Avatar>
      </ListItemAvatar>
      <SummaryDialogContentListItemContent exerciseName={exerciseName} />
    </ListItem>
  );
}
