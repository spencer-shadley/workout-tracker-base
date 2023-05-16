import { ChangeEvent } from 'react';

import { FormControl, InputAdornment, Paper, TextField } from '@mui/material';

import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { ExerciseCartButton } from './ExerciseCartButton';
import { GenerateWithAiButton } from './GenerateWithAiButton';

export function ExerciseSearch() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, setSearchText, currentHint } = searchInput;
  return (
    <Paper elevation={6} className="mb-3">
      <FormControl fullWidth>
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
          fullWidth
          multiline
          id="outlined-adornment-search"
          variant="outlined"
          value={searchText}
          label={currentHint}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
          aria-describedby="create-workout-hint-text"
          inputProps={{
            'aria-label': 'hint',
          }}
        />
      </FormControl>
    </Paper>
  );
}
