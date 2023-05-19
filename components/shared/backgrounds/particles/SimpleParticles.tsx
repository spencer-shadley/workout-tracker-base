import ParticlesWrapper from './ParticlesWrapper';

export function SimpleParticles() {
  return (
    <ParticlesWrapper
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: `push`,
            },
            onHover: {
              enable: true,
              mode: `repulse`,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: `#ffffff`,
          },
          links: {
            color: `#ffffff`,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: `none`,
            enable: true,
            outModes: {
              default: `bounce`,
            },
            random: false,
            speed: 0.4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: `circle`,
          },
          size: {
            value: { min: 1, max: 8 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
