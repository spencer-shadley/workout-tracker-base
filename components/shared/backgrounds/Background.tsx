import BackgroundWaves from '@/components/shared/backgrounds/BackgroundWaves';
import { useBackgroundPreference } from '@/hooks/storage/useLocalStorage';
import { BounceParticles } from './particles/BounceParticles';
import { SimpleParticles } from './particles/SimpleParticles';
import { particles, bounce, seaAnemone, light } from './backgroundsTypes';
import SeaAnemoneParticles from './particles/SeaAnemoneParticles';
import LightParticles from './particles/LightParticles';

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
    case light:
      background = <LightParticles />;
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
