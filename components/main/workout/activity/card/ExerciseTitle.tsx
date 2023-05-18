import { useState } from 'react';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { GenericDialogProps } from '@/components/shared/PromptDialog';
import useActivityName from '@/hooks/activity/useActivityName';
import { useActivityBucket } from '@/hooks/time/useActivityBucket';
import EditIcon from '@mui/icons-material/Edit';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {
    Dialog, DialogContent, DialogTitle, IconButton, Tooltip, Typography, Zoom
} from '@mui/material';

import { useTimeContext } from '../../context/TimeContextProvider';

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

function JumpToExerciseIconButton() {
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
  </Tooltip>
}

function EditExerciseIconButton() {
  const { exerciseName } = useExerciseContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return <>
    <Tooltip title={`Edit ${exerciseName}`}>
      <IconButton onClick={() => {
        setIsDialogOpen(true);
      }}>
        <EditIcon/>
      </IconButton>
    </Tooltip>
    <EditExerciseDialog isOpen={isDialogOpen} close={() => {setIsDialogOpen(false)}}/>
  </>
}

function EditExerciseDialog({ close, isOpen }: GenericDialogProps) {
  const { exerciseName } = useExerciseContext();
  return <Dialog open={isOpen} onClose={close}>
    <DialogTitle>
      {`Edit ${exerciseName}`}
    </DialogTitle>
    <DialogContent>

    </DialogContent>
  </Dialog>
}
