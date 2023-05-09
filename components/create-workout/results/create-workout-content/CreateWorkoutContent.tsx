import { Paper } from '@mui/material';
import { Results } from '../Results';
import { ExerciseSearch } from '../../ExerciseSearch';
import { InitialSearchHint } from '../../InitialSearchHint';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';

export default function CreateWorkoutContent() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;

  return (
    <Paper className="h-[100dvh] opacity-90 p-4 flex flex-col">
      <ExerciseSearch />
      {searchText ? <Results /> : <InitialSearchHint />}
    </Paper>
  );
}
