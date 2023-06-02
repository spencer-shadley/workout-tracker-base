import Image from 'next/image';

import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { Card, CircularProgress, Typography, useTheme } from '@mui/material';

export function WelcomeImage() {
  const theme = useTheme();
  const prompt = `someone working out to improve their fitness in the style of impressionist art`;
  const { data: imageUrl, isFetching } = useOpenAi({
    prompt,
    isPicture: true,
    queryOptionOverrides: {
      enabled: false
    }
  });

  return <Card className='w-full flex justify-center' sx={{
    backgroundColor: theme.palette.background.default,
  }}>
    {isFetching || !imageUrl ? <>
      <CircularProgress />
      <Typography>
        Generating a unique custom image just for you
      </Typography>
    </> : <div className='w-1/2 h-1/2 pt-5 pb-0'>
      <Image style={{ position: undefined }} src={`https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?cs=srgb&dl=pexels-zakaria-boumliha-2827392.jpg&fm=jpg`} fill alt="ai generated welcome picture" />
      <Typography textAlign='center' variant='caption' color='secondary'>
        AI Generated Image 🤖🖼️🔀
        <br />
        {`"${prompt}"`}
      </Typography>
    </div>}
  </Card>;
}
