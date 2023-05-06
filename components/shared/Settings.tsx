import { Dialog, DialogContent, DialogTitle, Fab } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ResponseStyleOption } from '@/components/create-workout/response-style/ResponseStyleOptions';
import { useState } from 'react';
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
          <ResponseStyleOption />
          <WorkoutOptionsContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
