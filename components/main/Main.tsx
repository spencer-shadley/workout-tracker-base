import 'animate.css';
import TransparentText from '../shared/TransparentText';
import GiantButton from '../shared/GiantButton';
import { useRouter } from 'next/router';
import FitnessQuote from './FitnessQuote';
import HealthFact from './ai/HealthFact';
import Caption from './ai/Caption';

export default function Main() {
  const router = useRouter();
  return (
    <main style={{ height: '100dvh', paddingTop: '50px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '0 50px',
        }}
      >
        <span>
          <Caption question="Give me a short unique but fun greeting" />
          <TransparentText shouldAnimate>Spencer</TransparentText>
        </span>

        <FitnessQuote />

        <GiantButton
          onClick={() => {
            router.push('StartWorkoutPage');
          }}
        >
          <Caption question='What is another way to say "Start a workout"?' />
          Start a workout
        </GiantButton>
        <GiantButton>Generate a workout with AI</GiantButton>
        <GiantButton>See stats</GiantButton>

        <HealthFact />
      </div>
    </main>
  );
}
