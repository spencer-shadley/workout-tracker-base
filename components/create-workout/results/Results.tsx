import { Card, List } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import Result from './Result';

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults } = searchInput;
  return (
    <Card sx={{ padding: '5px 10px' }} className="bg-slate-500" elevation={10}>
      <List className="w-full">
        {searchedExerciseNameResults.map((exerciseName) => (
          <Card key={exerciseName} sx={{ marginBottom: '10px' }}>
            <Result exerciseName={exerciseName} />
          </Card>
        ))}
      </List>
    </Card>
  );
}
