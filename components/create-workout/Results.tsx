import { List } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import Result from './Result';

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults: foundExerciseNames } = searchInput;
  return (
    <List className="w-full">
      {foundExerciseNames.map((exerciseName) => (
        <Result key={exerciseName} exerciseName={exerciseName} />
      ))}
    </List>
  );
}
