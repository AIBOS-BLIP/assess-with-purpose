import type { Metadata } from "next";
import ChallengesDashboard from "@/components/challenges/challenges-dashboard";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Game-style assessment challenges to test and reinforce your assessment literacy.",
};

export default function ChallengesPage() {
  return <ChallengesDashboard />;
}
