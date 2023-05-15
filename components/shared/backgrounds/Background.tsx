import BackgroundWaves from '@/components/shared/backgrounds/BackgroundWaves';
import { useBackgroundPreference } from '@/hooks/storage/useLocalStorage';

import { bounce, light, particles, seaAnemone } from './backgroundsTypes';
import { BounceParticles } from './particles/BounceParticles';
import LightParticles from './particles/LightParticles';
import SeaAnemoneParticles from './particles/SeaAnemoneParticles';
import { SimpleParticles } from './particles/SimpleParticles';

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
