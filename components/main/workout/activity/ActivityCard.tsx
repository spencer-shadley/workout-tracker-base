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
import { useTimeContext } from '../context/TimeContextProvider';
import { useWorkoutContext } from '../context/WorkoutContextProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useActivityCardContext } from '../context/ActivityCardContextProvider';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import useActivityName from '@/hooks/useActivityName';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, isDismissible, timeBucket, activityType } =
    useActivityCardContext();
  const { removeExercise } = useWorkoutContext();
  const { currentBucket, jumpToBucket } = useTimeContext();
  const { containerExercise, exerciseType: currentExerciseType } =
    currentBucket;
  const { remainingTimeInMilliseconds } = currentBucket;
  const isExerciseActive =
    containerExercise === exerciseName && currentExerciseType === activityType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const activityDuration = useActivityDurationInSeconds(activityType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  const activityName = useActivityName(activityType, exerciseName);

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
          </Typography>
          {isDismissible && exerciseName && (
            <IconButton
              onClick={() => {
                removeExercise(exerciseName);
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
