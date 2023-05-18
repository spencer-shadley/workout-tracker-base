import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import { DialogContent, List } from '@mui/material';

import { useSummaryDialogContext } from '../context/SummaryDialogContextProvider';
import { SummaryDialogContentListItem } from '../list-item/SummaryDialogContentListItem';
import { SummaryContentSkeleton } from './SummaryContentSkeleton';

export function SummaryContent() {
  const [exerciseNames] = useSelectedExercises();
  const { isLoading } = useSummaryDialogContext();

  return (
    <DialogContent>
      <List>
        {isLoading ?
          <SummaryContentSkeleton />
          :
          exerciseNames.map((exerciseName, index) =>
            <SummaryDialogContentListItem
              key={exerciseName}
              exerciseName={exerciseName}
              exerciseNumber={index + 1}
            />
          )
        }
      </List>
    </DialogContent>
  );
}

