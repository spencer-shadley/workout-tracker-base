import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { askQuestion } from '../api/openai';

interface ResultIconProps {
  icon: React.ReactNode;
  tooltip: string;
  setDescriptionText: (text: string) => void;
  prompt: string;
}

export function ResultIcon({
  icon,
  setDescriptionText,
  tooltip,
  prompt,
}: ResultIconProps) {
  return (
    <Tooltip title={tooltip}>
      <ListItemButton
        sx={{ padding: 0 }}
        onClick={() => {
          setDescriptionText('Loading...');
          askQuestion({
            prompt,
            temperature: 1,
          }).then((answer) => {
            setDescriptionText(answer);
          });
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}
