import { Button, Card, Typography } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';

export default function CustomizeToIndividual() {
  const { setStage } = useTutorialContext();
  return <Card>
    <Typography>
      Tell me about yourself!
    </Typography>
    <Button onClick={() => setStage(`complete`)}>
      Continue
    </Button>
  </Card>;
}
