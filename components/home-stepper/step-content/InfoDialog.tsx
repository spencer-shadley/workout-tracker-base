import { Dialog, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { useState } from 'react';
import { TitleButton } from './TitleButton';

interface InfoDialogProps {
  content: string;
  title: string;
  tutorial?: string;
}
export function InfoDialog({ content, title, tutorial }: InfoDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title={tutorial}>
        <TitleButton
          title={title}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </Tooltip>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>TODO: Info Dialog</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </>
  );
}
