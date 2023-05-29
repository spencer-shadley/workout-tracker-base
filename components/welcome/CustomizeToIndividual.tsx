import { Button } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';

export default function CustomizeToIndividual() {
  const { setStage } = useTutorialContext();
  return <Button onClick={() => setStage(`complete`)}>
    Continue
  </Button>;
}
