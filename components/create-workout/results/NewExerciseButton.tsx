import { ListItemButton } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { useAddExerciseName } from '@/hooks/useSessionStorage';

export function NewExerciseButton() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;
  const addExerciseName = useAddExerciseName(searchText);
  return (
    <ListItemButton
      onClick={() => addExerciseName()}
    >{`Add "${searchText}"`}</ListItemButton>
  );
}
