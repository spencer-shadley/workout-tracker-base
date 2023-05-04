import { Badge, Grow, IconButton, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ExerciseCart } from './ExerciseCart';
import { useMemo, useState } from 'react';
import { SummaryDialog } from './summary-dialog/SummaryDialog';
import { SummaryDialogType } from './summary-dialog/context/SummaryDialogContextProvider';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

export function ExerciseCartButton() {
  const [exerciseNames] = useSelectedExercises();

  const [showDialog, setShowDialog] = useState(false);

  const summaryDialogProps = useMemo((): SummaryDialogType => {
    return { isOpen: showDialog, close: () => setShowDialog(false) };
  }, [showDialog]);

  return (
    <>
      <Tooltip
        title={<ExerciseCart />}
        TransitionComponent={Grow}
        leaveDelay={1000}
        arrow
      >
        <Badge
          badgeContent={exerciseNames.length}
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
      <SummaryDialog {...summaryDialogProps} />
    </>
  );
}
