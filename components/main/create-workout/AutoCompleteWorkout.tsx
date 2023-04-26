import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import { Autocomplete, TextField } from '@mui/material';
import ActivityOption from '../workout/activity/ActivityOption';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
// const filter = createFilterOptions<ExerciseInfo>();

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
          // TODO: add DB
          const exercise = sampleExercises.find(
            (exercise) => exercise.name === value
          );
          if (exercise) {
            addExercise(exercise);
          }
        }
      }}
      // TODO
      //   filterOptions={(options, params) => {
      // const filtered = filter(options, params);
      // const { inputValue } = params;
      // // Suggest the creation of a new value
      // const isExisting = options.some((option) => inputValue === option.name);
      // const createExercise: ExerciseInfo = {
      //   name: inputValue,
      // };
      // if (inputValue !== '' && !isExisting) {
      //   filtered.push(createExercise);
      //   //   addExercise(createExercise);
      // }
      // return exercises;
      //   }}
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
