import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { setIsFirstTime } from '@/hooks/storage/useLocalStorage';
import { Button, Typography } from '@mui/material';

export default function Welcome() {
  return <>
    <Typography>
      welcome!
    </Typography>
    <Button onClick={() => {
      setIsFirstTime(false);
    }}>
      Continue
    </Button>
    <WelcomeImage />
  </>
}

function WelcomeImage() {
  const { data } = useOpenAi({
    prompt: `someone working out to improve their fitness in the style of impressionist art`,
    isPicture: true,
  })

  return <img src={data} alt="welcome" />;
}
