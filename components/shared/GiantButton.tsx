import { Button } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function MainButton({ children }: PropsWithChildren) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: '500px',
        height: '150px',
        borderColor: 'white',
        color: 'white',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      {children}
    </Button>
  );
}
