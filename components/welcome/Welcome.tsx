
import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import useRandom from '@/hooks/useRandom';
import { Button, Card, Skeleton, Typography, useTheme } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';
import { WelcomeImage } from './WelcomeImage';

export default function Welcome() {
  const theme = useTheme();

  const { setStage } = useTutorialContext();

  const { data: greetings, isFetching: isLoadingGreeting } = useOpenAi({
    prompt: `Provide 10 simple messages like "Hello" and "Welcome" to greet a new user. Include a fun emoji at the end of each welcome message. Return the greetings as comma separated list.`
  });

  const greetingText = useRandom(greetings?.split(`,`) ?? [`Hello`]) ?? `Hello`;
  const greeting = <Typography variant='h2' color='primary' textAlign='center'>
    {greetingText}
  </Typography>;

  return <div className='flex' style={{
    height: `100dvh`,
  }}>
    <div className='flex flex-col justify-between m-10'>
      <div>
        {isLoadingGreeting ? <Skeleton variant='text'>
          {greeting}
        </Skeleton> : greeting}
        <Typography color="secondary" textAlign="center" variant="subtitle2">
          🤖 greeting generated by your friendly AI trainer 🔀
        </Typography>
      </div>
      <WelcomeImage />
      <Card sx={{
        backgroundColor: theme.palette.background.default,
        padding: `20px`,
      }}>
        <Typography color='primary'>
          This app leverages AI 🤖 to create highly specific workouts designed just for you! 🫵
        </Typography>
        <Button onClick={() => {
          setStage(`settings`)
        }}>
          🏃‍♂️ Continue
        </Button>
      </Card>
    </div>
  </div>
}

