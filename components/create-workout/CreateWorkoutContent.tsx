import { Button, Paper, Typography } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { Results } from './Results';
import { ExerciseSearch } from './ExerciseSearch';

export default function CreateWorkoutContent() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, searchedExerciseNameResults, isSearching } = searchInput;
  return (
    <Paper className="h-screen opacity-80 p-4">
      {searchText === '' && <h1>Create an AI powered workout!</h1>}
      <ExerciseSearch />
      {searchText && <GenerateWithAiButton />}
      {isSearching ? <Typography>Searching...</Typography> : <Results />}
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
