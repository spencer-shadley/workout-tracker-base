import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import useActivityName from '@/hooks/activity/useActivityName';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton, Tooltip, Typography, Zoom } from '@mui/material';

import { useTimeContext } from '../../context/TimeContextProvider';

export function ExerciseTitle() {
  const { jumpToBucket } = useTimeContext();
  const {
    exerciseName,
    activityType,
  } = useExerciseContext();

  const { activityBucket } = useActivityBucket();
  const { isActive } = activityBucket;

  const activityName = useActivityName(activityType, exerciseName);

  return (
    <Typography
      variant="h5"
      component="div"
      sx={{
        flexGrow: 1,
        justifySelf: 'center',
        alignSelf: 'stretch',
        fontSize: isActive ? '4rem' : undefined,
      }}
    >
      {activityName}
      {activityBucket && (
        <Tooltip
          title={`jump to ${activityName}`}
          arrow
          TransitionComponent={Zoom}
        >
          <IconButton
            onClick={() => {
              jumpToBucket(activityBucket);
            }}
          >
            <SkipNextIcon />
          </IconButton>
        </Tooltip>
      )}
    </Typography>
  );
}
