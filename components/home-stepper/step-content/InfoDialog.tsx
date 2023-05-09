import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { TitleButton } from './TitleButton';

interface InfoDialogProps {
  content: string;
  buttonText: string;
  tutorial?: string;
}
export function InfoDialog({ content, buttonText }: InfoDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <TitleButton
        buttonText={buttonText}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>TODO: Info Dialog</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </>
  );
}
