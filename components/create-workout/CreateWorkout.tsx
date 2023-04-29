import { Button, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
  useCreateWorkout as useCreateWorkoutContext,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import searchExercises from '@/api/searchExercises';

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>('');
  const [foundExercises, setFoundExercises] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedSearch = useDebounce<string>(searchText, 500);

  useEffect(() => {
    async function search() {
      setIsSearching(true);
      const exercises = await searchExercises(debouncedSearch);
      setFoundExercises(exercises);
      setIsSearching(false);
    }

    if (debouncedSearch) {
      search();
    }
  }, [debouncedSearch]);

  const createWorkoutContext: CreateWorkoutType = {
    searchText,
    foundExerciseNames: foundExercises,
  };

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <Paper className="h-screen opacity-80 p-4">
        {searchText === '' && <h1>Create Workout</h1>}
        <TextField
          className="w-full opacity-100"
          value={searchText}
          label="Search..."
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
        />
        {searchText && <GenerateWithAiButton />}
        {isSearching ? <Typography>Searching...</Typography> : <Results />}
        {searchText && foundExercises.length === 0 && <NewExerciseButton />}
      </Paper>
    </CreateWorkoutProvider>
  );
}

function Results() {
  const { foundExerciseNames } = useCreateWorkoutContext();
  return (
    <>
      {foundExerciseNames.map((exerciseName) => (
        <Result key={exerciseName} exerciseName={exerciseName} />
      ))}
    </>
  );
}

interface ResultProps {
  exerciseName: string;
}

function Result({ exerciseName }: ResultProps) {
  return <h1>{exerciseName}</h1>;
}

function GenerateWithAiButton() {
  return <Button>Generate full workout with AI</Button>;
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}
