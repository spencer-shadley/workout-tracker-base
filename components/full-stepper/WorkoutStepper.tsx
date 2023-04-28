import styled from '@emotion/styled';
import {
  StepConnector,
  stepConnectorClasses,
  Stepper,
  Tooltip,
  Step,
  StepLabel,
} from '@mui/material';
import { stepInfos } from './stepInfo';
import StepIcon from './StepIcon';

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

interface WorkoutStepperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export default function WorkoutStepper({
  activeStep,
  setActiveStep,
}: WorkoutStepperProps) {
  return (
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
  );
}
