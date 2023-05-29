import { useState } from 'react';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Button, Card, MobileStepper, Typography, useTheme } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';

export default function CustomizeToIndividual() {
  const theme = useTheme();
  const { setStage } = useTutorialContext();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return <div className='flex flex-col justify-between h-full'>
    <Card sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      <Typography color='text.primary'>
        {`Tell me about yourself! I'll keep this info in mind for your workouts.`}
      </Typography>
      <Button onClick={() => setStage(`complete`)}>
        Continue
      </Button>
    </Card>
    <Card>
      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Card>
  </div>;
}
