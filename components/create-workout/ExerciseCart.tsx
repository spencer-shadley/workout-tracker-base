import { Card, Typography } from '@mui/material';
import { SummaryContent } from './summary-dialog/SummaryDialogContent';
import { useGetExerciseNames } from '@/hooks/useSessionStorage';

export function ExerciseCart() {
  const exerciseNames = useGetExerciseNames();

  return (
    <Card>
      {exerciseNames.length > 0 ? (
        <SummaryContent />
      ) : (
        <Typography variant="subtitle1">
          First add exercises to your workout!
        </Typography>
      )}
    </Card>
  );
}
