import { Icon, IconButton, Tooltip } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export function GenerateWithAiButton() {
  return (
    <Tooltip title="Auto generate full workout" arrow>
      <IconButton>
        <Icon>
          <AutoFixHighIcon />
        </Icon>
      </IconButton>
    </Tooltip>
  );
}
