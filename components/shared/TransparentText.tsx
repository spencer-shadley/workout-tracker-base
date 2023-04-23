import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

interface TransparentTextProps extends PropsWithChildren {
  shouldAnimate?: boolean;
}

export default function TransparentText({
  children,
  shouldAnimate,
}: TransparentTextProps) {
  return (
    <Typography
      display="inline-block"
      className={
        shouldAnimate
          ? 'animate__animated animate__bounce animate__fadeIn'
          : undefined
      }
      variant="overline"
      fontSize="5em"
      lineHeight="1.5em"
      sx={{
        color: 'transparent',
        fill: 'none',
        strokeWidth: '1px',
        stroke: '#fff',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: '#fff',
      }}
    >
      {children}
    </Typography>
  );
}
