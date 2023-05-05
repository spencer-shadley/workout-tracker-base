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
        sx={{ padding: 0 }}
        onClick={() => {
          setShouldShow(true);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
