import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import useActivityName from '@/hooks/activity/useActivityName';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import { Typography } from '@mui/material';

import { EditExerciseIconButton } from './EditExerciseIconButton';
import { JumpToExerciseIconButton } from './JumpToExerciseIconButton';

export function ExerciseTitle() {
  const { activityType } = useExerciseContext();
  const { activityBucket } = useActivityBucket();
  const { isActive } = activityBucket;

  const activityName = useActivityName();

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
      {activityBucket && <JumpToExerciseIconButton/>}
      {activityType === 'exercise' && <EditExerciseIconButton/>}
    </Typography>
  );
}

