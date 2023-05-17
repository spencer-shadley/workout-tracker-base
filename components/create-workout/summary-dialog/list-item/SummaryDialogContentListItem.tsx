import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
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
    <ExerciseProvider exerciseName={exerciseName} activityType='exercise'>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{exerciseNumber}</Avatar>
        </ListItemAvatar>
        <SummaryDialogContentListItemContent />
      </ListItem>
    </ExerciseProvider>
  );
}
