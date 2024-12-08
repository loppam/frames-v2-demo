import { Metadata } from "next";
import UnderOverClient from "~/components/games/UnderOverClient";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/frames/games/underover/opengraph-image`,
  button: {
    title: "Play Under & Over 7",
    action: {
      type: "launch_frame",
      name: "Under & Over 7",
      url: `${appUrl}/frames/games/underover/`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const metadata: Metadata = {
  title: "Under & Over 7",
  description: "Try your luck with dice!",
  openGraph: {
    title: "Under & Over 7",
    description: "Try your luck with dice!",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function UnderOverFrame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <UnderOverClient />
    </div>
  );
} 