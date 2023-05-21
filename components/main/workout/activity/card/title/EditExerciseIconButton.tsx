import { useState } from 'react';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';

import { EditExerciseDialog } from './EditExerciseDialog';

export function EditExerciseIconButton() {
  const { exerciseName } = useExerciseContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return <>
    <Tooltip title={`Edit ${exerciseName}`}>
      <IconButton
        color='secondary'
        onClick={() => {
          setIsDialogOpen(true);
        }}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <EditExerciseDialog isOpen={isDialogOpen} close={() => { setIsDialogOpen(false); }} />
  </>;
}
