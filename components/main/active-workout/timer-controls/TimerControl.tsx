import { PropsWithChildren } from 'react';

import { Fab, SxProps, Theme, Tooltip } from '@mui/material';

interface TimerControlProps extends PropsWithChildren {
  onClick: () => void;
  tooltip: string;
  sx?: SxProps<Theme>;
}
export function TimerControl({ children, onClick, sx, tooltip }: TimerControlProps) {
  const fullSx: SxProps<Theme> = {
    ...sx,
  };

  return (
    <Tooltip title={tooltip} arrow>
      <Fab onClick={onClick} sx={fullSx} color='primary'>
        {children}
      </Fab>
    </Tooltip>
  );
}
