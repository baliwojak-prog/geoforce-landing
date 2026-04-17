"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#c5e531", "#a8d400", "#d4e94c", "#8fbc00"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.6 },
      animation: {
        enable: true,
        speed: 0.8,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 4 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.3, max: 1.2 },
      direction: "top",
      random: true,
      straight: false,
      outModes: {
        default: "out",
        bottom: "out",
        top: "out",
      },
    },
    life: {
      duration: {
        sync: false,
        value: { min: 3, max: 8 },
      },
      count: 0,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 80,
        speed: 0.5,
      },
    },
  },
  detectRetina: true,
};

export default function EmberParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="embers"
      className="absolute inset-0 z-[1] pointer-events-none"
      options={options}
    />
  );
}
