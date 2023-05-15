import { useState } from 'react';

import { Chip } from '@mui/material';

import { MuscleGroupDialog } from './MuscleGroupDialog';

export function MuscleGroupChip({ muscleGroup }: { muscleGroup: string }) {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  return (
    <>
      <Chip label={muscleGroup} onClick={() => setShouldShowDialog(true)} />
      <MuscleGroupDialog
        muscleGroup={muscleGroup}
        dialogProps={{
          open: shouldShowDialog,
          onClose: () => setShouldShowDialog(false),
        }}
      />
    </>
  );
}
