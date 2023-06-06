import { GenericDialogProps } from '@/components/shared/PromptDialog';
import CustomizeToIndividual from '@/components/welcome/CustomizeToIndividual';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export function ProfileDialog({ close, isOpen }: GenericDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      scroll='paper'>
      <DialogTitle>
        Profile
      </DialogTitle>
      <DialogContent>
        <CustomizeToIndividual shouldShowNext={false} />
      </DialogContent>
    </Dialog>
  );
}
