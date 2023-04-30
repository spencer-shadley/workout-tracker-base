import {
  Badge,
  Button,
  Card,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
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
import InfoIcon from '@mui/icons-material/Info';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { askQuestion } from '../api/openai';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

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

function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { foundExerciseNames } = searchInput;
  return (
    <List className="w-full">
      {foundExerciseNames.map((exerciseName) => (
        <Result key={exerciseName} exerciseName={exerciseName} />
      ))}
    </List>
  );
}

interface ResultProps {
  exerciseName: string;
}

function Result({ exerciseName }: ResultProps) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addExerciseNameToCart, addedExerciseNames } = exercisesCart;
  const [exerciseDetailsText, setExerciseDetailsText] = useState<string>('');
  const isExerciseAdded = addedExerciseNames.includes(exerciseName);

  return (
    <ListItem className="w-full hover:bg-slate-200">
      <ResultIcon
        tooltip={`Learn more about ${exerciseName}`}
        prompt={`Tell me about ${exerciseName} in a few sentences`}
        setDescriptionText={setExerciseDetailsText}
        icon={<InfoIcon />}
      />
      <ListItemText
        className="flex-grow w-full"
        primary={exerciseName}
        secondary={exerciseDetailsText === '' ? undefined : exerciseDetailsText}
      />
      <ResultIcon
        icon={<QuestionMarkIcon />}
        tooltip={`Learn how to do ${exerciseName}`}
        prompt={`Tell me how to do the exercise ${exerciseName}`}
        setDescriptionText={setExerciseDetailsText}
      />
      <Tooltip
        title={`Add ${
          isExerciseAdded ? 'another' : ''
        } ${exerciseName} to workout`}
      >
        <ListItemButton
          onClick={() => {
            addExerciseNameToCart(exerciseName);
          }}
        >
          <ListItemIcon>
            {isExerciseAdded ? <CheckIcon /> : <AddIcon />}
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

interface ResultIconProps {
  icon: React.ReactNode;
  tooltip: string;
  setDescriptionText: (text: string) => void;
  prompt: string;
}

function ResultIcon({
  icon,
  setDescriptionText,
  tooltip,
  prompt,
}: ResultIconProps) {
  return (
    <Tooltip title={tooltip}>
      <ListItemButton
        onClick={() => {
          setDescriptionText('Loading...');
          askQuestion({
            prompt,
            temperature: 1,
          }).then((answer) => {
            setDescriptionText(answer);
          });
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}

function GenerateWithAiButton() {
  return <Button>Generate full workout with AI</Button>;
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}
