import { Card, List } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import Result from './Result';
import { ResultCard } from './ResultCard';
import { NewExerciseButton } from './NewExerciseButton';

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults } = searchInput;
  return (
    <Card sx={{ padding: '5px 10px' }} className="bg-slate-500" elevation={10}>
      <List className="w-full">
        {searchedExerciseNameResults.map((exerciseName) => (
          <ResultCard key={exerciseName} exerciseName={exerciseName}>
            <Result exerciseName={exerciseName} />
          </ResultCard>
        ))}
        <ResultCard exerciseName="new-exercise">
          <NewExerciseButton />
        </ResultCard>
      </List>
    </Card>
  );
}
