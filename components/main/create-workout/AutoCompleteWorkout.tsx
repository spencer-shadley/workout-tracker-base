import { Autocomplete, TextField } from '@mui/material';
import ActivityOption from '../workout/activity/ActivityOption';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import { sampleExercises } from '@/api/data/MockExerciseInfo';

export default function AutoCompleteWorkout() {
  const { addExercise } = useWorkoutContext();

  return (
    <Autocomplete
      fullWidth
      noOptionsText="No exercises found"
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      onChange={(event, value) => {
        if (value) {
          const exercise = sampleExercises.find(
            (exercise) => exercise.name === value
          );
          if (exercise) {
            addExercise(exercise);
          }
        }
      }}
      renderOption={(props, exercise) => (
        <ActivityOption
          exercise={exercise}
          handleClick={(exercise) => {
            addExercise(exercise);
          }}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label="Find an exercise..."
          type="search"
        />
      )}
      options={sampleExercises}
    />
  );
}
