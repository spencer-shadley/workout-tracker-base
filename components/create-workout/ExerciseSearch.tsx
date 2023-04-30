import { FormControl, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { ExerciseCartButton } from './ExerciseCartButton';
import { GenerateWithAiButton } from './GenerateWithAiButton';

export function ExerciseSearch() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText, setSearchText, currentHint } = searchInput;
  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyItems: 'center',
                  alignContent: 'center',
                  height: '100%',
                  padding: '0',
                }}
              >
                <GenerateWithAiButton />
                <ExerciseCartButton />
              </div>
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
