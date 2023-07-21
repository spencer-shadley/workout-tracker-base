import { useEffect, useState } from 'react';

import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CircularProgress, IconButton, Typography } from '@mui/material';

export function WelcomeImage() {
  const [previousPrompts, setPreviousPrompts] = useState<string[]>([]);
  const [promptPrompt, setPromptPrompt] = useState<string | undefined>(undefined);

  const { data: prompt, refetch } = useOpenAi<string>({
    skipCache: true,
    prompt: `Generate a prompt to give to DALLE. 
    The prompt should generate a picture that would be relevant to fitness. 
    The following is an array of prompts already used, don't reuse them ${JSON.stringify(previousPrompts)}`
  });

  // const prompt = `someone working out to improve their fitness in the style of impressionist art`;
  const { data: imageUrl, isFetching } = useOpenAi<string>({
    prompt: prompt ?? ``,
    isPicture: true,
    queryOptionOverrides: {
      enabled: !!prompt
    }
  });

  // TODO: repeats
  // useEffect(() => {
  //   if (prompt) {
  //     const updatedPrompts = [...previousPrompts, prompt];
  //     setPreviousPrompts(updatedPrompts);
  //   }

  //   console.log(`prompt`, previousPrompts);
  // }, [prompt]);

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
        AI Generated Image and Prompt 🤖🖼️
      </Typography>
      <Typography className='text-center' color='secondary' variant='subtitle2'>
        {`"${prompt}"`}
      </Typography>
      <IconButton onClick={() => {
        setPromptPrompt(undefined);
      }}>
        <RefreshIcon/>
      </IconButton>
    </div>}
  </div>;
}
