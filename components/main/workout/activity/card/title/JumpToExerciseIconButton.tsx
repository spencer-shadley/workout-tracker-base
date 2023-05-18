import useActivityName from '@/hooks/activity/useActivityName';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton, Tooltip, Zoom } from '@mui/material';

import { useTimeContext } from '../../../context/TimeContextProvider';

export function JumpToExerciseIconButton() {
  const { jumpToBucket } = useTimeContext();
  const { activityBucket } = useActivityBucket();
  const activityName = useActivityName();

  return <Tooltip
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
  </Tooltip>;
}
