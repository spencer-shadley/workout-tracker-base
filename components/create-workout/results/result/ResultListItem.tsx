import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { Card, ListItem, useTheme } from '@mui/material';

import Result from './Result';

export function ResultListItem() {
  const theme = useTheme();
  const { exerciseName } = useExerciseContext();

  return (
    <ListItem className="flex flex-col items-start" sx={{
    }}>
      <Card className='w-full px-2 py-4' key={exerciseName}
        sx={{
          backgroundColor: theme.palette.background.default, }}>
        <Result/>
      </Card>
    </ListItem>
  );
}
