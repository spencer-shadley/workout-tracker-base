import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ResponseStyleOption } from '@/components/create-workout/response-style/ResponseStyleOptions';
import { PropsWithChildren, useState } from 'react';
import { WorkoutOptionsContent } from '../main/workout/WorkoutOptionsContent';
import { useBackgroundPreference } from '@/hooks/useLocalStorage';
import { logError } from '@/utils/logger';
import { bounce, colors, particles } from './backgrounds/backgroundsTypes';

export default function Settings() {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <>
      <Fab
        className="bounce circle"
        size="medium"
        color="secondary"
        aria-label="settings"
        sx={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
        }}
        onClick={() => setIsSettingsOpen(true)}
      >
        <SettingsIcon />
      </Fab>
      <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <SettingCategoryText>AI Preferences</SettingCategoryText>
          <ResponseStyleOption />
          <Divider sx={{ marginY: '15px' }} />
          <SettingCategoryText>Workout Preferences</SettingCategoryText>
          <WorkoutOptionsContent />
          <SettingCategoryText>Background</SettingCategoryText>
          <BackgroundOptions />
        </DialogContent>
      </Dialog>
    </>
  );
}

function SettingCategoryText({ children }: PropsWithChildren) {
  return <DialogContentText variant="overline">{children}</DialogContentText>;
}

function BackgroundOptions() {
  const [backgroundOption, setBackgroundOption] = useBackgroundPreference();

  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: '10px',
      }}
    >
      <InputLabel id="background-select">Background style</InputLabel>
      <Select
        labelId="background-select-label"
        id="background-select"
        value={backgroundOption}
        label={backgroundOption}
        onChange={(e) => {
          const value = e.target.value;
          switch (value) {
            case particles:
              setBackgroundOption(particles);
              break;
            case colors:
              setBackgroundOption(colors);
              break;
            case bounce:
              setBackgroundOption(bounce);
              break;
            default:
              logError(`Invalid background option ${value}`);
          }
        }}
      >
        <MenuItem value={particles}>{particles}</MenuItem>
        <MenuItem value={colors}>{colors}</MenuItem>
        <MenuItem value={bounce}>{bounce}</MenuItem>
      </Select>
    </FormControl>
  );
}
