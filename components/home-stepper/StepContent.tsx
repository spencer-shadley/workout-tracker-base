import {
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';
import { Quote } from './Quote';
import RectangleBouncer from '../shared/RectangleBouncer';
import { useState } from 'react';

interface StepContentProps {
  activeStep: number;
  step: StepInfo;
  index: number;
}

export default function StepContent({
  step,
  index,
  activeStep,
}: StepContentProps) {
  const { title, aiPrompt, url, dialogContent } = step;

  return (
    <div
      key={title}
      style={{
        height: '100%',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {Math.abs(activeStep - index) <= 2 ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexGrow: 1,
            padding: '50px',
          }}
        >
          <RectangleBouncer>
            {url && (
              <Link href={url}>
                <TitleButton title={title} />
              </Link>
            )}
            {dialogContent && (
              <InfoDialog content={dialogContent} title={title} />
            )}
          </RectangleBouncer>
          <Quote prompt={aiPrompt} />
        </div>
      ) : null}
    </div>
  );
}

interface InfoDialogProps {
  content: string;
  title: string;
}

function InfoDialog({ content, title }: InfoDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <TitleButton
        title={title}
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

interface TitleButtonProps extends ButtonProps {
  title: string;
}

function TitleButton({ title, ...buttonProps }: TitleButtonProps) {
  return (
    <Button variant="outlined" {...buttonProps}>
      <Typography variant="h2">{title}</Typography>
    </Button>
  );
}
