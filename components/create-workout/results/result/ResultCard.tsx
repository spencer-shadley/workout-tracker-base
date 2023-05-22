import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { Card, ListItem, useTheme } from '@mui/material';

import Result from './Result';

export function ResultCard() {
  const theme = useTheme();
  const { exerciseName } = useExerciseContext();

  return (
    <ListItem className="flex flex-col items-start" sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      <Card key={exerciseName} sx={{ marginBottom: `10px` }}>
        <Result/>
      </Card>
    </ListItem>
  );
}
