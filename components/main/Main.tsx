import 'animate.css';
import TransparentText from '../shared/TransparentText';
import MainButton from '../shared/GiantButton';

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

        <MainButton>Start a workout</MainButton>
        <MainButton>Generate a workout with AI</MainButton>
        <MainButton>See stats</MainButton>
      </div>
    </main>
  );
}
