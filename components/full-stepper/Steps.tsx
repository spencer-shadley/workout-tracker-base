import {
  Box,
  Typography,
  Stepper,
  Step,
  StepIconProps,
  StepLabel,
  styled,
  IconButton,
  Tooltip,
  Button,
  stepConnectorClasses,
  StepConnector,
} from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Link from 'next/link';

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

const StepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: '#fff',
  opacity: 0.25,
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    opacity: 0.75,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'gray',
  }),
}));

function StepIcon({ icon, active, completed, className }: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <FitnessCenterIcon />,
    2: <LightbulbIcon />,
    3: <SettingsIcon />,
  };

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      <IconButton>{icons[String(icon)]}</IconButton>
    </StepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    opacity: 0.1,
    margin: '0 25px',
    backgroundColor: 'white',
    borderRadius: 1,
  },
}));

export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ flexGrow: 1, height: '100%' }}
      >
        {stepInfos.map((step, index) => (
          <div
            key={step.title}
            style={{ height: '100%', flexGrow: 1, alignItems: 'center' }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                  alignSelf: 'center',
                  justifySelf: 'center',
                  flexGrow: 1,
                }}
              >
                <Link href="/StartWorkoutPage">
                  <Button>{step.title}</Button>
                </Link>
                <Typography color="white">{step.quote}</Typography>
              </div>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ marginBottom: 2 }}
        connector={<ColorlibConnector />}
      >
        {stepInfos.map((stepInfo, stepIndex) => (
          <Tooltip key={stepInfo.title} title={stepInfo.title}>
            <Step
              key={stepInfo.title}
              onClick={() => {
                setActiveStep(stepIndex);
              }}
            >
              <StepLabel StepIconComponent={StepIcon}></StepLabel>
            </Step>
          </Tooltip>
        ))}
      </Stepper>
    </Box>
  );
}
