'use client';

import dynamic from "next/dynamic";

const SpinTheBottle = dynamic(() => import("./SpinTheBottle"), {
  ssr: false,
});

export default function SpinTheBottleClient() {
  return <SpinTheBottle />;
} 