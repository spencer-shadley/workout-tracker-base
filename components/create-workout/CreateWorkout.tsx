import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
  useCreateWorkout as useCreateWorkoutContext,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import searchExercises from '@/api/searchExercises';

const hints = [
  'Biceps',
  'Bench press',
  'Legs',
  'Core',
  'High intensity workout',
  'Easy workout',
  'Exercises that only require my body',
  'Cardio workout',
  'Exercises that only use dumbbells',
];

function getRandomHint() {
  return `Try "${hints[Math.floor(Math.random() * hints.length)]}"`;
}

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>('');
  const [foundExercises, setFoundExercises] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>(getRandomHint());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHint(getRandomHint());
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const debouncedSearch = useDebounce<string>(searchText, 2000);

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
        {searchText === '' && <h1>Create an AI powered workout!</h1>}
        <FormControl variant="outlined" fullWidth>
          <TextField
            maxRows={3}
            multiline
            id="outlined-adornment-search"
            variant="outlined"
            value={searchText}
            label={currentHint}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value);
            }}
            fullWidth
            className="w-full opacity-100"
            aria-describedby="create-workout-hint-text"
            inputProps={{
              'aria-label': 'hint',
            }}
          />
        </FormControl>
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
