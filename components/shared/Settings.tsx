import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ResponseStyleOption } from '@/components/create-workout/response-style/ResponseStyleOptions';
import { PropsWithChildren, useState } from 'react';
import { WorkoutOptionsContent } from '../main/workout/WorkoutOptionsContent';

export default function Settings() {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <>
      <Fab
        size="small"
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
        </DialogContent>
      </Dialog>
    </>
  );
}

function SettingCategoryText({ children }: PropsWithChildren) {
  return <DialogContentText variant="overline">{children}</DialogContentText>;
}
