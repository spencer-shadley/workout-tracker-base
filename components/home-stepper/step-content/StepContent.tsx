import Link from 'next/link';
import { StepInfo } from '../stepInfo';
import { Quote } from '../Quote';
import RectangleBouncer from '../../shared/RectangleBouncer';
import { TitleButton } from './TitleButton';
import { InfoDialog } from './InfoDialog';

interface StepContentProps {
  activeStep: number;
  step: StepInfo;
  index: number;
}

export default function StepContent({ step }: StepContentProps) {
  const { title, aiPrompt, url, dialogContent, tutorial } = step;

  return (
    <div
      key={title}
      style={{
        height: '100%',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexGrow: 1,
          padding: '50px',
        }}
      >
        <RectangleBouncer>
          {url && (
            <Link href={url}>
              <TitleButton title={title} />
            </Link>
          )}
          {dialogContent && (
            <InfoDialog
              content={dialogContent}
              title={title}
              tutorial={tutorial}
            />
          )}
        </RectangleBouncer>
        <Quote prompt={aiPrompt} />
      </div>
    </div>
  );
}
