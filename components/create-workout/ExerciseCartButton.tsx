import { Badge, Grow, IconButton, Tooltip } from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ExerciseCart } from './ExerciseCart';

export function ExerciseCartButton() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <Tooltip
      title={<ExerciseCart />}
      TransitionComponent={Grow}
      leaveDelay={1000}
      arrow
    >
      <Badge
        badgeContent={addedExerciseNames.length}
        overlap="circular"
        color="info"
      >
        <IconButton>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Badge>
    </Tooltip>
  );
}
