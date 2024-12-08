'use client';

import dynamic from "next/dynamic";

const UnderOver = dynamic(() => import("./UnderOver"), {
  ssr: false,
});

export default function UnderOverClient() {
  return <UnderOver />;
} 