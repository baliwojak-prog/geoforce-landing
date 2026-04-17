"use client";

import dynamic from "next/dynamic";

const VolcanoScene = dynamic(() => import("@/components/VolcanoScene"), {
  ssr: false,
});

const EmberParticles = dynamic(() => import("@/components/EmberParticles"), {
  ssr: false,
});

export function VolcanoHero() {
  return <VolcanoScene />;
}

export function Embers() {
  return <EmberParticles />;
}

const ExperimentalSection = dynamic(
  () => import("@/components/ExperimentalSection"),
  { ssr: false }
);

export function Experimental() {
  return <ExperimentalSection />;
}
