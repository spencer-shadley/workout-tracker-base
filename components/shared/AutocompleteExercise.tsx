import { Autocomplete, TextField } from '@mui/material';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';

export default function AutocompleteExercise() {
  return (
    <Autocomplete
      fullWidth
      freeSolo
      color="primary"
      onChange={(event, value) => {
        console.log('value', value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label="Find an exercise..."
          type="search"
        />
      )}
      options={sampleExercises.map((exercise) => exercise.name)}
    />
  );
}
