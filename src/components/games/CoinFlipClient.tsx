'use client';

import dynamic from "next/dynamic";

const CoinFlip = dynamic(() => import("./CoinFlip"), {
  ssr: false,
});

export default function CoinFlipClient() {
  return <CoinFlip />;
} 