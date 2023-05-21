import { useMemo, useState } from 'react';

import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Badge, Card, Grow, IconButton, Tooltip } from '@mui/material';

import { SummaryDialogType } from '../summary-dialog/context/SummaryDialogContextProvider';
import Summary from '../summary-dialog/Summary';
import { SummaryDialogWrapper } from '../summary-dialog/SummaryDialogWrapper';

export function ExerciseCartButton() {
  const [selectedExercises] = useSelectedExercises();

  const [showDialog, setShowDialog] = useState(false);

  const summaryDialogProps = useMemo((): SummaryDialogType => {
    return {
      isOpen: showDialog,
      close: () => setShowDialog(false),
      isLoading: false,
    };
  }, [showDialog]);

  return selectedExercises.length > 0 ?
    <>
      <Tooltip
        title={
          <Card>
            <Summary />
          </Card>
        }
        TransitionComponent={Grow}
        leaveDelay={1000}
        arrow
      >
        <Badge
          badgeContent={selectedExercises.length}
          overlap="circular"
          color="info"
        >
          <IconButton
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <SummaryDialogWrapper {...summaryDialogProps} />
    </>
    : null;
}
