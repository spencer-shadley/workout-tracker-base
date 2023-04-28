import {
  Box,
  Typography,
  Stepper,
  Step,
  StepIconProps,
  StepLabel,
  styled,
} from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

interface StepInfo {
  title: string;
  quote: string;
}

const stepInfos: StepInfo[] = [
  {
    title: 'Start workout',
    quote: 'Start your workout by clicking the button below',
  },
  {
    title: 'Learn more',
    quote:
      'Research shows that exercise can help prevent cognitive decline and memory loss.',
  },
  {
    title: 'Settings',
    quote: 'Update your settings to get the most out of your workout.',
  },
];

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: 'transparent',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'gray',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ flexGrow: 1 }}
      >
        {stepInfos.map((step, index) => (
          <div key={step.title}>
            {Math.abs(activeStep - index) <= 2 ? (
              <>
                <Typography color="white">{step.title}</Typography>
                <Typography color="white">{step.quote}</Typography>
              </>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ flexShrink: 0 }}
        className="stepper"
      >
        {stepInfos.map((stepInfo) => (
          <Step key={stepInfo.title}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {stepInfo.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
