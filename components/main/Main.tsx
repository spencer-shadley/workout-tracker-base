import 'animate.css';
import TransparentText from '../shared/TransparentText';
import GiantButton from '../shared/GiantButton';

export default function Main() {
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
          <TransparentText>Welcome back</TransparentText>
          <TransparentText shouldAnimate>Spencer</TransparentText>
        </span>

        <GiantButton
          onClick={() => {
            window.location.href = '/StartWorkoutPage';
          }}
        >
          Start a workout
        </GiantButton>
        <GiantButton>Generate a workout with AI</GiantButton>
        <GiantButton>See stats</GiantButton>
      </div>
    </main>
  );
}
