import Link from 'next/link';

import { Routes, useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { Button } from '@mui/material';

import RectangleBouncer from '../../shared/RectangleBouncer';
import { Quote } from '../Quote';
import { StepInfo } from '../stepInfo';
import { InfoDialog } from './InfoDialog';
import { TitleButton } from './TitleButton';

interface StepContentProps {
  activeStep: number;
  step: StepInfo;
  index: number;
}

export default function StepContent({ step }: StepContentProps) {
  const { title, aiPrompt, url, dialogContent, tutorial } = step;

  const { data, refetch } = useOpenAi(Routes.fitnessImportant);

  return (
    <div
      key={title}
      style={{
        height: `100%`,
        alignItems: `center`,
        maxWidth: `100%`,
        overflow: `hidden`,
      }}
    >
      <div
        style={{
          height: `100%`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `space-evenly`,
          flexGrow: 1,
          padding: `50px`,
        }}
      >
        <RectangleBouncer>
          {url &&
            <>
              <Link href={url}>
                <TitleButton buttonText={title} />
              </Link>
              <Button onClick={() => {
                refetch();
                console.log(data);
              } }>
                test
              </Button>
            </>
          }
          {dialogContent &&
            <InfoDialog
              content={dialogContent}
              buttonText={title}
              tutorial={tutorial}
            />
          }
        </RectangleBouncer>
        <Quote prompt={aiPrompt} />
      </div>
    </div>
  );
}
