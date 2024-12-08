import { Metadata } from "next";
import SpinTheBottleClient from "~/components/games/SpinTheBottleClient";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/frames/games/spinbottle/opengraph-image`,
  button: {
    title: "Play Spin The Bottle",
    action: {
      type: "launch_frame",
      name: "Spin The Bottle",
      url: `${appUrl}/frames/games/spinbottle/`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const metadata: Metadata = {
  title: "Spin The Bottle",
  description: "Test your luck with the spinning bottle!",
  openGraph: {
    title: "Spin The Bottle",
    description: "Test your luck with the spinning bottle!",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function SpinTheBottleFrame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <SpinTheBottleClient />
    </div>
  );
} 