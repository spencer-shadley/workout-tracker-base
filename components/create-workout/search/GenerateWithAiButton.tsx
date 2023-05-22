import { useState } from 'react';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { IconButton, Tooltip } from '@mui/material';

import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { AiDialog } from '../summary-dialog/AiDialog';

export function GenerateWithAiButton() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;
  return (
    <>
      {searchText &&
        <>
          <Tooltip title="Auto generate full workout" arrow>
            <IconButton color='primary' onClick={() => setShowDialog(true)}>
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
          <AiDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        </>
      }
    </>
  );
}
