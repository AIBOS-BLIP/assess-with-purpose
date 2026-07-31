"use client";

import { AlertTriangle, PenLine, Puzzle, Sparkles } from "lucide-react";
import { ChallengeProvider, useChallenges } from "./challenge-context";
import NameGate from "./name-gate";
import ChallengeCard from "./challenge-card";
import SpotTheMistake from "./spot-the-mistake";
import BuildTheRubric from "./build-the-rubric";
import MatchTheType from "./match-the-type";
import AiVsHuman from "./ai-vs-human";
import SummaryPanel from "./summary-panel";

function ChallengesContent() {
  const { player, hydrated } = useChallenges();

  if (!hydrated) return null;

  if (!player) {
    return <NameGate />;
  }

  return (
    <div className="space-y-6">
      <SummaryPanel />

      <ChallengeCard
        id="spot-the-mistake"
        title="Spot the Assessment Mistake"
        description="Read a scenario and identify the design mistakes in it."
        icon={AlertTriangle}
      >
        <SpotTheMistake />
      </ChallengeCard>

      <ChallengeCard
        id="build-the-rubric"
        title="Build the Best Rubric"
        description="Choose the stronger rubric descriptor for each criterion."
        icon={PenLine}
      >
        <BuildTheRubric />
      </ChallengeCard>

      <ChallengeCard
        id="match-the-type"
        title="Match the Assessment Type"
        description="Sort examples into formative, summative, and the for/of/as learning approaches."
        icon={Puzzle}
      >
        <MatchTheType />
      </ChallengeCard>

      <ChallengeCard
        id="ai-vs-human"
        title="AI vs Human Feedback Challenge"
        description="Evaluate feedback examples and decide where human judgement is essential."
        icon={Sparkles}
      >
        <AiVsHuman />
      </ChallengeCard>
    </div>
  );
}

export default function ChallengesDashboard() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-purple sm:text-4xl">
        Challenges
      </h1>
      <p className="mt-4 text-brand-grey">
        Put your assessment literacy into practice with four short,
        game-style challenges.
      </p>
      <div className="mt-8">
        <ChallengeProvider>
          <ChallengesContent />
        </ChallengeProvider>
      </div>
    </div>
  );
}
