import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { CircularProgress, Typography } from '@mui/material';

export function WelcomeImage() {
  const prompt = `someone working out to improve their fitness in the style of impressionist art`;
  const { data: imageUrl, isFetching } = useOpenAi<string>({
    prompt,
    isPicture: true,
  });

  return <div className='w-full flex justify-center overflow-y-auto flex-1' style={{
    backgroundImage: `url("${imageUrl}")`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
  }}>
    {isFetching || !imageUrl ? <>
      <CircularProgress />
      <Typography>
        Generating a new image just for you
      </Typography>
    </> : <div className='flex flex-col h-full justify-around'>
      <Typography textAlign='center' variant='subtitle1' color='secondary'>
        AI Generated Image 🤖🖼️
      </Typography>
      <br/>
      <Typography className='text-center' color='secondary' variant='subtitle2'>
        {`"${prompt}"`}
      </Typography>
    </div>}
  </div>;
}
