import { PropsWithChildren, useState } from 'react';

import {
    ResponseStyleOption
} from '@/components/create-workout/response-style/ResponseStyleOptions';
import SettingsIcon from '@mui/icons-material/Settings';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Fab } from '@mui/material';

import { BackgroundOptions } from '../shared/BackgroundOptions';
import { WorkoutOptionsContent } from './workout-options/WorkoutOptionsContent';

export default function Settings() {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <>
      <Fab
        className="bounce circle bg-gray-300"
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
        <SettingsIcon color={'action'} />
      </Fab>
      <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <DialogTitle>
          Settings
        </DialogTitle>
        <DialogContent>
          <SettingCategoryText>
            AI Preferences
          </SettingCategoryText>
          <ResponseStyleOption />
          <Divider sx={{ marginY: '15px' }} />
          <SettingCategoryText>
            Workout Preferences
          </SettingCategoryText>
          <WorkoutOptionsContent />
          <SettingCategoryText>
            Background
          </SettingCategoryText>
          <BackgroundOptions />
        </DialogContent>
      </Dialog>
    </>
  );
}

function SettingCategoryText({ children }: PropsWithChildren) {
  return <DialogContentText variant="overline">
    {children}
  </DialogContentText>;
}
