import { Card, FormControl, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { ExerciseCartButton } from './ExerciseCartButton';
import { GenerateWithAiButton } from './GenerateWithAiButton';

export function ExerciseSearch() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, setSearchText, currentHint } = searchInput;
  return (
    <Card className="p-4 my-4" elevation={5}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <GenerateWithAiButton />
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
          sx={{
            marginBottom: '30px',
          }}
          aria-describedby="create-workout-hint-text"
          inputProps={{
            'aria-label': 'hint',
          }}
        />
      </FormControl>
    </Card>
  );
}
