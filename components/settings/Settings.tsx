import { useState } from 'react';

/* eslint-disable indent */
import {
    ResponseStyleOption
} from '@/components/create-workout/response-style/ResponseStyleOptions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Accordion, AccordionDetails, AccordionSummary, Dialog, DialogContent, DialogTitle, Fab,
    Typography
} from '@mui/material';

/* eslint-enable indent */
import { BackgroundOptions } from '../shared/BackgroundOptions';
import CustomizeToIndividual from '../welcome/CustomizeToIndividual';
import { WorkoutOptionsContent } from './workout-options/WorkoutOptionsContent';

interface SettingProps {
  title: string;
  component: JSX.Element;
}

const settings: SettingProps[] = [
  {
    title: `🤖 AI Preferences`,
    component: <ResponseStyleOption />
  },
  {
    title: `🕛 Workout Preferences`,
    component: <WorkoutOptionsContent />
  },
  {
    title: `🎨 Background`,
    component: <BackgroundOptions />
  },
  {
    title: `📝 Profile`,
    component: <CustomizeToIndividual shouldShowNext={false} />
  }
];

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
          position: `absolute`,
          bottom: `50px`,
          right: `50px`,
        }}
        onClick={() => setIsSettingsOpen(true)}
      >
        <SettingsIcon color={`action`} />
      </Fab>
      <Dialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        fullWidth>
        <DialogTitle>
          Settings
        </DialogTitle>
        <DialogContent>
          {settings.map((setting) => {
            return (
              <Accordion key={setting.title}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  key={setting.title}>
                  <Typography>
                    {setting.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {setting.component}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}
