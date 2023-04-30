import {
  Badge,
  Card,
  FormControl,
  Grow,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
export function ExerciseSearch() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, setSearchText, currentHint } = searchInput;
  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ExerciseCartButton />
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
  );
}

function ExerciseCartButton() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <Tooltip
      title={<ExerciseCart />}
      TransitionComponent={Grow}
      leaveDelay={1_000}
    >
      <Badge badgeContent={addedExerciseNames.length}>
        <IconButton>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Badge>
    </Tooltip>
  );
}

function ExerciseCart() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <Card>
      <Typography variant="subtitle1">Start Your Workout!</Typography>
      <List>
        {addedExerciseNames.map((exerciseName) => (
          <ListItem key={exerciseName}>
            <ListItemText>{exerciseName}</ListItemText>
            <ListItemButton>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
