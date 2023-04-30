import {
  Badge,
  Card,
  FormControl,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export function ExerciseSearch() {
  const { exercisesCart, searchInput } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  const { searchText, setSearchText, currentHint } = searchInput;
  return (
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
  );
}
