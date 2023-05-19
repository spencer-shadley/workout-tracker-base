import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';

interface ResultIconProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

export function ResultIcon({ icon, tooltip, onClick }: ResultIconProps) {
  return (
    <Tooltip title={tooltip} key={tooltip}>
      <ListItemButton
        sx={{ padding: `5px 5px`, borderRadius: `100px` }}
        onClick={onClick}
      >
        <ListItemIcon sx={{ minWidth: `0px` }}>
          {icon}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
