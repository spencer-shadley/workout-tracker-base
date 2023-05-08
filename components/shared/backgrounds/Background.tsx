import BackgroundWaves from '@/components/shared/backgrounds/BackgroundWaves';
import { useBackgroundPreference } from '@/hooks/useLocalStorage';
import { BounceParticles } from './particles/BounceParticles';
import { SimpleParticles } from './particles/SimpleParticles';
import { particles, bounce, seaAnemone } from './backgroundsTypes';
import SeaAnemoneParticles from './particles/SeaAnemoneParticles';

export default function Background() {
  const [backgroundPreference] = useBackgroundPreference();

  let background = null;
  switch (backgroundPreference) {
    case particles:
      background = <SimpleParticles />;
      break;
    case bounce:
      background = <BounceParticles />;
      break;
    case seaAnemone:
      background = <SeaAnemoneParticles />;
      break;
    default:
      background = null;
  }

  return (
    <>
      <BackgroundWaves />
      {background}
    </>
  );
}
