import { Card, Typography } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { SummaryContent } from './summary-dialog/SummaryDialogContent';

export function ExerciseCart() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <Card>
      {addedExerciseNames.length > 0 ? (
        <SummaryContent />
      ) : (
        <Typography variant="subtitle1">
          First add exercises to your workout!
        </Typography>
      )}
    </Card>
  );
}
