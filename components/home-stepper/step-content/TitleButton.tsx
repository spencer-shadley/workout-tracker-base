import { Button, ButtonProps, Typography } from '@mui/material';

interface TitleButtonProps extends ButtonProps {
  buttonText: string;
}
export function TitleButton({ buttonText, ...buttonProps }: TitleButtonProps) {

  return (
    <Button variant="outlined" {...buttonProps}>
      <Typography variant="h2">
        {buttonText}
      </Typography>
    </Button>
  );
}
