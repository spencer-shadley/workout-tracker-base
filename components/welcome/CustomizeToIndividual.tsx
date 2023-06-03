/* eslint-disable indent */
import {
    AboutPersonKey, aboutPersonPromptMap, useAboutPersonStorage
} from '@/hooks/storage/useLocalStorage';
/* eslint-enable indent */
import { Button, Card, TextField, Typography, useTheme } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';

export interface AboutPersonPrompt {
    prompt: string;
    answer?: string;
    localStorageKey: AboutPersonKey;
}

function SimpleSetting({ prompt, localStorageKey }: AboutPersonPrompt) {
  const [about, setAbout] = useAboutPersonStorage(localStorageKey)

  return (
    <TextField
      className='py-2'
      label={prompt}
      fullWidth value={about ?? ``}
      onChange={(e) => {
        setAbout(e.target.value ?? ``);
      }} />
  )
}

export default function CustomizeToIndividual() {
  const theme = useTheme();
  const { setStage } = useTutorialContext();

  return <div className='flex flex-col justify-between h-full'>
    <Card sx={{
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
      <SimpleSettings/>
      <Button
        className='w-full'
        onClick={() => setStage(`complete`)}>
        Next
      </Button>
    </Card>
  </div>;
}

function SimpleSettings() {
  const prompts = Array.from(aboutPersonPromptMap);
  return <div className='m-5'>
    {prompts.map(([localStorageKey, prompt]) => <SimpleSetting key={localStorageKey} localStorageKey={localStorageKey} prompt={prompt} />)}
  </div>;
}
