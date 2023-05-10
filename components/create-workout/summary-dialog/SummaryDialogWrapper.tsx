import { Dialog } from '@mui/material';
import {
  SummaryDialogProvider,
  SummaryDialogType,
} from './context/SummaryDialogContextProvider';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import Summary from './Summary';

export function SummaryDialogWrapper(props: SummaryDialogType) {
  const [exerciseNames] = useSelectedExercises();

  const { isOpen, close: handleClose } = props;
  return (
    <SummaryDialogProvider summaryDialogContext={props}>
      <Dialog
        open={isOpen && exerciseNames.length > 0}
        onClose={handleClose}
        fullWidth
      >
        <Summary />
      </Dialog>
    </SummaryDialogProvider>
  );
}
