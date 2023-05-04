import { Button, Paper, Typography } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { Results } from './results/Results';
import { ExerciseSearch } from './ExerciseSearch';
import ResponseStyleOptions from './response-style/ResponseStyleOptions';
import { InitialSearchHint } from './InitialSearchHint';

export default function CreateWorkoutContent() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, searchedExerciseNameResults, isSearching } = searchInput;

  return (
    <Paper className="h-screen opacity-80 p-4 flex flex-col">
      {searchText === '' && <h1>Create an AI powered workout!</h1>}
      <ResponseStyleOptions />
      <ExerciseSearch />
      {searchText && <GenerateWithAiButton />}
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

function GenerateWithAiButton() {
  return <Button>Generate full workout with AI</Button>;
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}
