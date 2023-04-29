import { Box } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { stepInfos } from './stepInfo';
import WorkoutStepper from './WorkoutStepper';
import StepContent from './StepContent';

export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ flexGrow: 1 }}
        containerStyle={{ height: '100%' }}
      >
        {stepInfos.map((step, index) => (
          <StepContent
            activeStep={activeStep}
            step={step}
            index={index}
            key={step.title}
          />
        ))}
      </SwipeableViews>
      <WorkoutStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </Box>
  );
}
