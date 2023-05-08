import { Button, ButtonProps, Typography } from '@mui/material';

interface TitleButtonProps extends ButtonProps {
  title: string;
}
export function TitleButton({ title, ...buttonProps }: TitleButtonProps) {
  return (
    <Button variant="outlined" {...buttonProps}>
      <Typography variant="h2">{title}</Typography>
    </Button>
  );
}
