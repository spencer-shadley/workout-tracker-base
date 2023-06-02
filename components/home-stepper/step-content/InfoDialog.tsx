import { Typography } from '@mui/material';

import { TitleButton } from './TitleButton';

interface InfoDialogProps {
  content: string;
  buttonText: string;
  tutorial?: string;
}
export function InfoDialog({ content, buttonText }: InfoDialogProps) {

  return (
    <>
      <TitleButton
        disabled
        buttonText={buttonText}
      />
      <Typography>
        {content}
      </Typography>
    </>
  );
}
