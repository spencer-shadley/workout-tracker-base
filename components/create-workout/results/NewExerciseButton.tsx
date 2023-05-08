import { ListItemButton } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { useAddExerciseName } from '@/hooks/storage/useSessionStorage';

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
