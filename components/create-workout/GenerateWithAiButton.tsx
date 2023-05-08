import { IconButton, Tooltip } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useState } from 'react';
import { AiDialog } from './summary-dialog/AiDialog';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';

export function GenerateWithAiButton() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;
  return (
    <>
      {searchText && (
        <>
          <Tooltip title="Auto generate full workout" arrow>
            <IconButton onClick={() => setShowDialog(true)}>
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
          <AiDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        </>
      )}
    </>
  );
}
