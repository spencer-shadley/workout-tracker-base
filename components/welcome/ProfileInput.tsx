import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { getProfileList } from '@/hooks/storage/useLocalStorage';
import { Button, Card, Typography } from '@mui/material';

import { useTutorialContext } from '../main/context/TutorialContext';
import { TextSkeletons } from '../shared/TextSkeletonsProps';
import { ProfileSettings } from './ProfileSettings';

interface ProfileInputProps {
    shouldShowNext: boolean;
}

export default function ProfileInput({ shouldShowNext }: ProfileInputProps) {
  const { setStage } = useTutorialContext();

  const { data: attributeConfirmation, isFetching: isLoadingAttributeConfirmation, refetch } =
  useOpenAi<string>({
    prompt: `
      Repeat these attributes in a friendly paragraph if possible. 
      In the answer, try to phrase it in the second person. Like "You are X years old".
      The attributes are in a key value format. 
      Make sure you associate the value with the relevant key that came before it.
      Do not make anything up. Rephrasing is okay but do not add new information. 
      For example, do not claim you know the person's name if it is not given. This is true of all attributes.
      Go step by step through each attribute and build a response.
      Double check your work. Did you make sure your answer aligns with the attributes provided?
      Do not include unrelated information.
      Restrict the response to only mention the attributes provided.
      The attributes are ${getProfileList()}`,
    temperature: 0.2,
    queryOptionOverrides: { enabled: false }
  } )

  return (
    <div className='flex flex-col justify-between h-full overflow-y-auto'>
      <Card className='max-h-fit overflow-y-auto opacity-80'>
        <Typography
          className='m-5'
          color='text.primary'>
          {`Tell me about yourself! 
          I'll keep this info in mind for your workouts. 
          The more I know the better the workout! 
          🏋️‍♀️ Phrase your answers in plain English, no need to worry about structure!`}
        </Typography>
        <ProfileSettings/>
        <div className='p-4'>
          <Button
            color='secondary'
            onClick={() => {
              refetch();
            }}>
            {attributeConfirmation ? `re-check understanding` : `check understanding`}
          </Button>
          {isLoadingAttributeConfirmation ?
            <TextSkeletons numberOfLinesOfText={3}/> :
            <Typography>
              {attributeConfirmation}
            </Typography>}
          {shouldShowNext && <Button
            className='w-full'
            onClick={() => setStage(`complete`)}>
            Next
          </Button>}
        </div>
      </Card>
    </div>
  );
}

