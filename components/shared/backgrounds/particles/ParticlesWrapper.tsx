import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { ISourceOptions, Engine } from 'tsparticles-engine';

interface ParticlesWrapperProps {
  options: ISourceOptions;
}

export default function ParticlesWrapper({ options }: ParticlesWrapperProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="absolute top-0"
      id="tsparticles"
      init={particlesInit}
      options={options}
    />
  );
}
