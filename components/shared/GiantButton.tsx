import { Button, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

interface GiantButtonProps extends PropsWithChildren, ButtonProps {}

export default function GiantButton({
  children,
  ...otherProps
}: GiantButtonProps) {
  return (
    <Button
      {...otherProps}
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: `500px`,
        height: `150px`,
        borderColor: `white`,
        color: `white`,
        width: `100%`,
        maxWidth: `500px`,
      }}
    >
      {children}
    </Button>
  );
}
