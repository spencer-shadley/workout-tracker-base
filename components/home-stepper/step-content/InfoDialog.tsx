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
      <span className='max-h-fit overflow-auto'>
        <Typography className='max-h-40 overflow-y-auto'>
          {content}
        </Typography>
      </span>
    </>
  );
}
