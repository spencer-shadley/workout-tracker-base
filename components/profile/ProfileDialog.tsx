import { GenericDialogProps } from '@/components/shared/PromptDialog';
import ProfileInput from '@/components/welcome/ProfileInput';
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
        <ProfileInput shouldShowNext={false} />
      </DialogContent>
    </Dialog>
  );
}
