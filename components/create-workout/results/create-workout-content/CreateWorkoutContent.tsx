import { Paper } from '@mui/material';

import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';
import { InitialSearchHint } from '../../hints/InitialSearchHint';
import { ExerciseSearch } from '../../search/ExerciseSearch';
import { Results } from '../Results';

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
