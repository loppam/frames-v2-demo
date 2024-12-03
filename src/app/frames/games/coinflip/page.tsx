import { Metadata } from "next";
import CoinFlipClient from "~/components/games/CoinFlipClient";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/frames/games/coinflip/opengraph-image`,
  button: {
    title: "Play Coin Flip",
    action: {
      type: "launch_frame",
      name: "Coin Flip Game",
      url: `${appUrl}/frames/games/coinflip/`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const metadata: Metadata = {
  title: "Coin Flip Game",
  description: "Try your luck with a coin flip!",
  openGraph: {
    title: "Coin Flip Game",
    description: "Try your luck with a coin flip!",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function CoinFlipFrame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <CoinFlipClient />
    </div>
  );
} 