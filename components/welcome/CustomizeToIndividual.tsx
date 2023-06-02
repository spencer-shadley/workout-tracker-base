import { useEffect, useState } from 'react';

/* eslint-disable indent */
import {
    AboutPersonKey, aboutPersonPromptMap, useAboutPersonStorage
} from '@/hooks/storage/useLocalStorage';
/* eslint-enable indent */
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Button, Card, MobileStepper, TextField, Typography, useTheme } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';

export interface AboutPersonPrompt {
    prompt: string;
    answer?: string;
    localStorageKey: AboutPersonKey;
}

function SimpleSetting({ prompt, localStorageKey }: AboutPersonPrompt) {
  const [about, setAbout] = useAboutPersonStorage(localStorageKey)

  return <TextField label={prompt} fullWidth value={about ?? ``} sx={{
    margin: `20px`,
  }}
  onChange={(e) => {
    setAbout(e.target.value ?? ``);
  }} />
}

// interface AboutPersonProps {
//     step: number;
// }

// function AboutPerson({ step }: AboutPersonProps) {
//   const [aboutPrompt, setAboutPrompt] = useState<AboutPersonPrompt>(aboutPersonPrompts[step]);
//   const [prompt, setPrompt] = useState<string>(aboutPrompt.prompt);
//   const [localStorageKey, setLocalStorageKey] = useState<string>(aboutPrompt.localStorageKey);
//   const [currentValue, setValue] = useLocalStorage<string | undefined>(localStorageKey, undefined);

//   useEffect(() => {
//     setAboutPrompt(aboutPersonPrompts[step]);
//     setPrompt(aboutPersonPrompts[step].prompt);
//     setLocalStorageKey(aboutPersonPrompts[step].localStorageKey);
//   }, [step]);

//   useEffect(() => {
//     setValue(undefined); // Reset the value when localStorageKey changes
//   }, [localStorageKey, setValue]);

//   return <TextField label={prompt} fullWidth value={currentValue} sx={{
//     margin: `20px`,
//   }} onChange={(e) => {
//     setValue(e.target.value);
//   }}/>
// }

export default function CustomizeToIndividual() {
  const theme = useTheme();
  const { setStage } = useTutorialContext();
  const [activeStep, setActiveStep] = useState(0);
  const [promptKey, setPromptKey] = useState<string>(``);
  const [prompt, setPrompt] = useState<string>(``);

  useEffect(() => {
    const entries = [...aboutPersonPromptMap.entries()];
    const currentEntry = entries[activeStep];

    setPromptKey(currentEntry[0]);
    setPrompt(currentEntry[1]);

  }, [activeStep])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return <div className='flex flex-col justify-between h-full'>
    <Card sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      <Typography color='text.primary'>
        {`Tell me about yourself! I'll keep this info in mind for your workouts.`}
      </Typography>
      <Button onClick={() => setStage(`complete`)}>
        Skip
      </Button>
    </Card>
    <Card sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      {/* <AboutPerson step={activeStep} /> */}
      <SimpleSetting {...{ prompt, localStorageKey: promptKey as AboutPersonKey }} />
      <MobileStepper
        variant="dots"
        steps={aboutPersonPromptMap.size}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Card>
  </div>;
}
