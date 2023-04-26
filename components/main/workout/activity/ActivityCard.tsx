import {
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  CardProps,
  Tooltip,
  Zoom,
} from '@mui/material';
import { ActivityType, useTimeContext } from '../context/TimeContextProvider';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useExerciseCardContext } from '../context/ActivityCardContextProvider';
import ExerciseStatLabels from './exercise/ExerciseStatLabels';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import useActivityName from '@/hooks/useActivityName';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface ActivityCardProps extends CardProps {
  activityType?: ActivityType;
}

export function ActivityCard({
  activityType,
  ...cardProps
}: ActivityCardProps) {
  const { exercise, isDismissible, timeBucket } = useExerciseCardContext();
  activityType = activityType ?? timeBucket?.exerciseType ?? 'rest-exercise';
  const { removeExercise } = useWorkoutContext();
  const { currentBucket, jumpToBucket } = useTimeContext();
  const { containerExercise, exerciseType: currentExerciseType } =
    currentBucket;
  const { remainingTimeInMilliseconds } = currentBucket;
  const isExerciseActive =
    containerExercise?.name === exercise?.name &&
    currentExerciseType === activityType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const activityDuration = useActivityDurationInSeconds(activityType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  const activityName = useActivityName(activityType, exercise?.name);

  return (
    <Card
      sx={{
        width: '100%',
      }}
      {...cardProps}
    >
      <span style={{ display: 'flex' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, justifySelf: 'center', alignSelf: 'stretch' }}
          >
            {activityName}
            {timeBucket && (
              <Tooltip
                title={`jump to ${activityName}`}
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  onClick={() => {
                    jumpToBucket(timeBucket);
                  }}
                >
                  <SkipNextIcon />
                </IconButton>
              </Tooltip>
            )}
            {activityType === 'exercise' && (
              <ExerciseStatLabels exercise={exercise} />
            )}
          </Typography>
          {isDismissible && exercise && (
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
        </CardContent>
        {isExerciseActive && (
          <Typography
            variant="h1"
            justifySelf="center"
            alignSelf="center"
            marginRight={2}
          >
            {remainingTimeInSeconds}
          </Typography>
        )}
      </span>
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
    </Card>
  );
}
