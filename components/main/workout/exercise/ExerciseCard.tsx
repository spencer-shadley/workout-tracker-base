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

interface ExerciseCardProps extends CardProps {
  exercise: ExerciseInfo;
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
  const { buckets, elapsedTimeInMilliseconds } = useTimeContext();
  const { workoutOptions } = useWorkoutOptionsContext();
  const { exerciseDurationInSeconds } = workoutOptions;

  let remainingTime: number | undefined = undefined;
  for (const bucket of buckets) {
    if (
      bucket.containerExercise?.name === exercise.name &&
      elapsedTimeInMilliseconds < bucket.endTimeInMilliseconds &&
      elapsedTimeInMilliseconds >= bucket.startTimeInMilliseconds
    ) {
      remainingTime = bucket.endTimeInMilliseconds - elapsedTimeInMilliseconds;
    }
  }

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
              {exercise.name}
            </Typography>
            {shouldShowCloseButton && (
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

          <ExerciseStatLabel
            data={exercise.description}
            beforeText=""
            afterText=""
          />
          <ExerciseStatLabel
            data={
              exercise.lastCompleted
                ? dayjs().to(dayjs(exercise.lastCompleted))
                : undefined
            }
            beforeText="Last completed"
            afterText=""
          />
          <ExerciseStatLabel
            data={exercise.numberOfTimesCompleted}
            beforeText="Completed"
            afterText="times"
          />
          <ExerciseStatLabel
            data={exercise.maxWeight}
            beforeText="Max weight"
            afterText="lbs"
          />
        </CardContent>
        {remainingTime && (
          <Typography variant="h1" justifySelf="center" alignSelf="center">
            {remainingTime / 1000}
          </Typography>
        )}
      </span>
      {remainingTime && (
        <LinearProgress
          variant="determinate"
          value={(remainingTime / 1000 / exerciseDurationInSeconds) * 100}
        />
      )}
    </Card>
  );
}
