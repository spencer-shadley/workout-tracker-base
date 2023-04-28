import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Link from 'next/link';
import { stepInfos } from './stepInfo';
import WorkoutStepper from './WorkoutStepper';

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
        style={{ flexGrow: 1 }}
        containerStyle={{ height: '100%' }}
      >
        {stepInfos.map((step, index) => (
          <div
            key={step.title}
            style={{
              height: '100%',
              alignItems: 'center',
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexGrow: 1,
                }}
              >
                <Link href="/StartWorkoutPage">
                  <Button>
                    <Typography variant="h1">{step.title}</Typography>
                  </Button>
                </Link>
                <div
                  style={{
                    display: 'flex',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'black',
                    color: 'white',
                  }}
                ></div>
                <Typography color="white" variant="subtitle2">
                  {step.quote}
                </Typography>
              </div>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <WorkoutStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </Box>
  );
}
