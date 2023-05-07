import { Typography, IconButton, Tooltip, Zoom } from '@mui/material';
import { useTimeContext } from '../context/TimeContextProvider';
import { useActivityCardContext } from '../context/ActivityCardContextProvider';
import useActivityName from '@/hooks/useActivityName';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export function ExerciseTitle() {
  const { exerciseName, timeBucket, activityType } = useActivityCardContext();
  const activityName = useActivityName(activityType, exerciseName);
  const { jumpToBucket } = useTimeContext();

  return (
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
  );
}
