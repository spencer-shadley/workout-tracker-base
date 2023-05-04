import { DialogContent, List } from '@mui/material';
import { SummaryDialogContentListItem } from './SummaryDialogContentListItem';
import { useGetExerciseNames } from '@/hooks/useSessionStorage';

export function SummaryContent() {
  const exerciseNames = useGetExerciseNames();

  return (
    <DialogContent>
      <List>
        {exerciseNames.map((exerciseName, index) => (
          <SummaryDialogContentListItem
            key={exerciseName}
            exerciseName={exerciseName}
            exerciseNumber={index + 1}
          />
        ))}
      </List>
    </DialogContent>
  );
}
