import { Tooltip, ListItemButton, ListItemIcon } from '@mui/material';

interface ResultIconProps {
  icon: React.ReactNode;
  tooltip: string;
  prompt: string;
  setShouldShow: (shouldShow: boolean) => void;
}

export function ResultIcon({ icon, tooltip, setShouldShow }: ResultIconProps) {
  return (
    <Tooltip title={tooltip} key={tooltip}>
      <ListItemButton
        sx={{ padding: '5px 5px', borderRadius: '100px' }}
        onClick={() => {
          setShouldShow(true);
        }}
      >
        <ListItemIcon sx={{ minWidth: '0px' }}>{icon}</ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
