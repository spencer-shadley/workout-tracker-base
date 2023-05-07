import BackgroundWaves from '@/components/shared/backgrounds/BackgroundWaves';
import { useBackgroundPreference } from '@/hooks/useLocalStorage';
import { BounceParticles } from './BounceParticles';
import { SimpleParticles } from './SimpleParticles';
import { particles, bounce } from './backgroundsTypes';

export default function Background() {
  const [backgroundPreference] = useBackgroundPreference();
  return (
    <>
      <BackgroundWaves />
      {backgroundPreference === particles && <SimpleParticles />}
      {backgroundPreference === bounce && <BounceParticles />}
    </>
  );
}
