import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import {
  Card,
  CardContent,
  CardProps,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import itemTypes from '@/utils/itemType';
import CloseIcon from '@mui/icons-material/Close';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import { useTimeContext } from '../context/TimeContextProvider';
import { useWorkoutOptionsContext } from '../context/WorkoutOptionsContextProvider';
import ExerciseStatLabels from './ExerciseStatLabels';

interface ExerciseCardProps extends CardProps {
  exercise: ExerciseInfo | 'rest';
  isOver: boolean;
  shouldShowCloseButton: boolean;
}

export default function ExerciseCard({
  exercise,
  isOver,
  shouldShowCloseButton,
  ...otherProps
}: ExerciseCardProps) {
  const { removeExercise } = useWorkoutContext();
  const { currentBucket } = useTimeContext();
  const { remainingTimeInMilliseconds } = currentBucket;
  const { workoutOptions } = useWorkoutOptionsContext();
  const { exerciseDurationInSeconds } = workoutOptions;
  const isExerciseActive =
    exercise !== 'rest' &&
    currentBucket.containerExercise?.name === exercise.name;

  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.EXERCISE_CARD,
    item: exercise,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : undefined }}
      sx={{
        backgroundColor: isDragging && isOver ? 'lightblue' : undefined,
        width: '100%',
      }}
      {...otherProps}
    >
      <span style={{ display: 'flex' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <span style={{ display: 'flex', width: '100%' }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {exercise === 'rest' ? 'rest' : exercise.name}
            </Typography>
            {shouldShowCloseButton && exercise !== 'rest' && (
              <IconButton
                onClick={() => {
                  removeExercise(exercise.name);
                }}
              >
                <CloseIcon
                  style={{ alignSelf: 'center', justifySelf: 'flex-end' }}
                />
              </IconButton>
            )}
          </span>

          {exercise !== 'rest' && <ExerciseStatLabels exercise={exercise} />}
        </CardContent>
        {isExerciseActive && (
          <Typography
            variant="h1"
            justifySelf="center"
            alignSelf="center"
            marginRight={2}
          >
            {remainingTimeInMilliseconds / 1000}
          </Typography>
        )}
      </span>
      {isExerciseActive && (
        <LinearProgress
          variant="determinate"
          value={
            (remainingTimeInMilliseconds / 1000 / exerciseDurationInSeconds) *
            100
          }
        />
      )}
    </Card>
  );
}
