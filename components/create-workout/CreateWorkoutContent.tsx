import { Button, Paper, Typography } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { Results } from './results/Results';
import { ExerciseSearch } from './ExerciseSearch';
import { InitialSearchHint } from './InitialSearchHint';

export default function CreateWorkoutContent() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, searchedExerciseNameResults, isSearching } = searchInput;

  return (
    <Paper className="h-[100dvh] opacity-90 p-4 flex flex-col">
      <ExerciseSearch />
      <div className="overflow-auto">
        {isSearching ? (
          <Typography>Searching...</Typography>
        ) : searchText ? (
          <Results />
        ) : (
          <InitialSearchHint />
        )}
      </div>
      {searchText && searchedExerciseNameResults.length === 0 && (
        <NewExerciseButton />
      )}
    </Paper>
  );
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}
