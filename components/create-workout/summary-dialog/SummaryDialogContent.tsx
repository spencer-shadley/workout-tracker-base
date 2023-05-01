import { DialogContent, List } from '@mui/material';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { SummaryDialogContentListItem } from './SummaryDialogContentListItem';

export function SummaryContent() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <DialogContent>
      <List>
        {addedExerciseNames.map((exerciseName, index) => (
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
