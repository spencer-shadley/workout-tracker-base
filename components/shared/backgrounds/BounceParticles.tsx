import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

export function BounceParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fps_limit: 60,
        interactivity: {
          detect_on: 'canvas',
          events: {
            onDiv: [
              {
                enable: true,
                selectors: '.bounce.rectangle',
                mode: 'bounce',
                type: 'rectangle',
              },
              {
                enable: true,
                selectors: '.bounce.circle',
                mode: 'bounce',
                type: 'circle',
              },
            ],
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 6,
              color: '#000000',
            },
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          line_linked: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
            gravity: {
              enable: true,
            },
            bounce: false,
            direction: 'left',
            enable: true,
            outModes: {
              default: 'bounce',
              top: 'none',
              bottom: 'destroy',
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 0,
          },
          opacity: {
            anim: {
              enable: false,
              opacity_min: 0.1,
              speed: 1,
              sync: false,
            },
            random: false,
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            anim: {
              enable: false,
              size_min: 0.1,
              speed: 40,
              sync: false,
            },
            random: { enable: true, minimumValue: 5 },
            value: 10,
          },
        },
        polygon: {
          draw: {
            enable: false,
            lineColor: '#ffffff',
            lineWidth: 0.5,
          },
          move: {
            radius: 10,
          },
          scale: 1,
          type: 'none',
          url: '',
        },
        retina_detect: true,
        emitters: [
          {
            direction: 'left',
            position: {
              x: 50,
              y: 0,
            },
            size: {
              width: 100,
              height: 0,
            },
            rate: {
              quantity: 1,
              delay: 0.1,
            },
          },
        ],
      }}
    />
  );
}