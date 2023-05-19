import ParticlesWrapper from './ParticlesWrapper';

export default function SeaAnemoneParticles() {
  return (
    <ParticlesWrapper
      options={{
        name: `Sea Anemone`,
        particles: {
          color: {
            value: `#FF0000`,
          },
          move: {
            attract: {
              enable: true,
              rotate: {
                x: 2000,
                y: 2000,
              },
            },
            direction: `none`,
            enable: true,
            outModes: {
              default: `destroy`,
            },
            path: {
              clamp: false,
              enable: true,
              delay: {
                value: 0,
              },
              generator: `curvesPathGenerator`,
            },
            random: false,
            speed: 1,
            straight: false,
            trail: {
              fillColor: `#000`,
              length: 30,
              enable: true,
            },
          },
          number: {
            density: {
              enable: true,
            },
            value: 0,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: `circle`,
          },
          size: {
            value: 10,
            animation: {
              count: 1,
              startValue: `min`,
              enable: true,
              minimumValue: 1,
              speed: 10,
              sync: true,
            },
          },
        },
        background: {
          color: `#000`,
          opacity: 0,
        },
        emitters: {
          direction: `none`,
          rate: {
            quantity: 5,
            delay: 0.3,
          },
          size: {
            width: 0,
            height: 0,
          },
          spawnColor: {
            value: `#ff0000`,
            animation: {
              enable: true,
              speed: 10,
            },
          },
          position: {
            x: 50,
            y: 50,
          },
        },
      }}
    />
  );
}
