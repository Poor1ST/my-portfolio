'use client';

import { Shader, LinearGradient, Aurora, ChromaFlow } from 'shaders/react';

export default function Hero3D() {
  return (
    <Shader className="absolute inset-0 z-0 pointer-events-none">
      <LinearGradient colorA="#020617" colorB="#0f172a" />
      <Aurora
        colorA="#6366f1"
        colorB="#a855f7"
        colorC="#818cf8"
        intensity={70}
        speed={8}
        curtainCount={4}
        waviness={60}
        rayDensity={20}
        height={120}
        balance={50}
      />
      <ChromaFlow
        baseColor="#020617"
        upColor="#818cf8"
        downColor="#6366f1"
        leftColor="#a855f7"
        rightColor="#6366f1"
        intensity={0.6}
        radius={2}
        momentum={25}
      />
    </Shader>
  );
}