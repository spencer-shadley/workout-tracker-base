import 'animate.css';
import GiantButton from '../shared/GiantButton';
import { useRouter } from 'next/router';
import FitnessQuote from './FitnessQuote';
import HealthFact from './ai/HealthFact';
import Caption from './ai/Caption';

const name = 'Spencer';

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
          <Caption
            prompt={`Give me a short unique but fun greeting for a person named ${name}`}
            loadingText={name}
          />
        </span>

        <FitnessQuote />

        <GiantButton
          onClick={() => {
            router.push('StartWorkoutPage');
          }}
        >
          <Caption prompt='What is another way to say "Start a workout"?' />
          Start a workout
        </GiantButton>
        <GiantButton>Generate a workout with AI</GiantButton>
        <GiantButton>See stats</GiantButton>

        <HealthFact />
      </div>
    </main>
  );
}
