import { Badge, Grow, IconButton, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ExerciseCart } from './ExerciseCart';
import { useMemo, useState } from 'react';
import { SummaryDialog } from './summary-dialog/SummaryDialog';
import { SummaryDialogType } from './summary-dialog/context/SummaryDialogContextProvider';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';

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

  return selectedExercises.length > 0 ? (
    <>
      <Tooltip
        title={<ExerciseCart />}
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
      <SummaryDialog {...summaryDialogProps} />
    </>
  ) : null;
}
