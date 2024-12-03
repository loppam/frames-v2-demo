import { Metadata } from "next";
import App from "~/app/app";

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
  return <App title={"Coin Flip Game"} />;
} 