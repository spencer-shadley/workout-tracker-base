import { UsageState, useTutorialStage } from '@/hooks/storage/useLocalStorage';
import { logError } from '@/utils/logger';
import { Typography } from '@mui/material';

import Steps from '../home-stepper/Steps';
import CustomizeToIndividual from '../welcome/CustomizeToIndividual';
import Welcome from '../welcome/Welcome';
import { TutorialProvider } from './context/TutorialContext';

export default function Main() {
  const [currentStage, setStage] = useTutorialStage();
  const component = getComponent(currentStage, () => setStage(`initial`));

  return <TutorialProvider tutorialContext={{ currentStage, setStage }}>
    {component}
  </TutorialProvider>
}

export function getComponent(tutorialStage: UsageState, resetStage: () => void) {
  switch (tutorialStage) {
  case `initial`:
    return <Welcome />;
  case `settings`:
    return <CustomizeToIndividual/>
  case `complete`:
    return <Steps />;
  default:
    const errorMessage = `invalid tutorial stage: ${tutorialStage}`;
    logError(errorMessage);
    resetStage();
    return <Typography>
      {errorMessage}
    </Typography>;
  }
}
