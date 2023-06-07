import { Button, Card, Typography, useTheme } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';
import { ProfileSettings } from './ProfileSettings';

interface ProfileInputProps {
    shouldShowNext: boolean;
}

export default function ProfileInput({ shouldShowNext }: ProfileInputProps) {
  const theme = useTheme();
  const { setStage } = useTutorialContext();

  return (
    <div className='flex flex-col justify-between h-full'>
      <Card className='mb-4' sx={{
        backgroundColor: theme.palette.background.default,
      }}>
        <Typography
          className='m-5'
          color='text.primary'>
          {`Tell me about yourself! I'll keep this info in mind for your workouts. The more I know the better the workout! 🏋️‍♀️ FYI - you can phrase your answers in plain English, no need to have a nice structure!`}
        </Typography>
      </Card>
      <Card className='max-h-fit overflow-y-auto'
        sx={{
          backgroundColor: theme.palette.background.default,
        }}>
        <ProfileSettings/>
        {shouldShowNext && <Button
          className='w-full'
          onClick={() => setStage(`complete`)}>
          Next
        </Button>}
      </Card>
    </div>
  );
}

