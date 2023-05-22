import { Badge, ListItemButton, ListItemIcon, SxProps, Theme, Tooltip } from '@mui/material';

interface CircleListItemButtonProps {
  tooltipTitle: string;
  icon: JSX.Element;
  onClick?: () => void;
  badgeContent?: number;
  badgeSx?: SxProps<Theme>;
}
export function CircleListItemButton({
  badgeContent,
  badgeSx,
  icon,
  onClick,
  tooltipTitle,
}: CircleListItemButtonProps) {
  return (
    <Tooltip title={tooltipTitle}>
      <Badge badgeContent={badgeContent} sx={badgeSx} color="info">
        <ListItemButton
          sx={{ padding: `5px`, borderRadius: `50%` }}
          onClick={onClick}
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            {icon}
          </ListItemIcon>
        </ListItemButton>
      </Badge>
    </Tooltip>
  );
}
