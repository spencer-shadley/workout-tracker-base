import {
  Badge,
  Button,
  Card,
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import searchExercises from '@/api/searchExercises';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Results } from './Results';

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
  const [addedExerciseNames, setAddedExerciseNames] = useState<string[]>([]);

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
    searchInput: { searchText, foundExerciseNames: foundExercises },
    exercisesCart: {
      addedExerciseNames,
      addExerciseNameToCart: (exerciseName: string) => {
        setAddedExerciseNames([...addedExerciseNames, exerciseName]);
      },
      removeExerciseNameFromCart: (exerciseName: string) => {
        setAddedExerciseNames(
          addedExerciseNames.filter((name) => name !== exerciseName)
        );
      },
    },
  };

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <Paper className="h-screen opacity-80 p-4">
        {searchText === '' && <h1>Create an AI powered workout!</h1>}
        <FormControl variant="outlined" fullWidth>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      <Card sx={{ fontSize: 14 }}>
                        {addedExerciseNames.map((exerciseName) => (
                          <h1 key={exerciseName}>{exerciseName}</h1>
                        ))}
                      </Card>
                    }
                  >
                    <Badge badgeContent={addedExerciseNames.length}>
                      <PlayCircleOutlineIcon />
                    </Badge>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
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

function GenerateWithAiButton() {
  return <Button>Generate full workout with AI</Button>;
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}