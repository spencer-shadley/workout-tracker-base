import { DialogContent, List } from '@mui/material';
import { SummaryDialogContentListItem } from './SummaryDialogContentListItem';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

export function SummaryContent() {
  const [exerciseNames] = useSelectedExercises();

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
