import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import ClearIcon from '@mui/icons-material/Clear';

export function ExerciseCart() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames, removeExerciseNameFromCart } = exercisesCart;
  return (
    <Card>
      {addedExerciseNames.length > 0 ? (
        <>
          <Typography variant="subtitle1">Start Your Workout!</Typography>
          <List>
            {addedExerciseNames.map((exerciseName) => (
              <ListItem key={exerciseName}>
                <ListItemText>{exerciseName}</ListItemText>
                <ListItemButton
                  onClick={() => {
                    removeExerciseNameFromCart(exerciseName);
                  }}
                >
                  <ListItemIcon>
                    <ClearIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="subtitle1">
          First add exercises to your workout!
        </Typography>
      )}
    </Card>
  );
}
