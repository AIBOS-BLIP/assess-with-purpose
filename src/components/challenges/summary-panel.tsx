"use client";

import { Medal, RotateCcw } from "lucide-react";
import { useChallenges } from "./challenge-context";
import { badgeForScore, BADGE_LABEL, type BadgeTier } from "@/lib/badges";

const CHALLENGE_IDS = [
  "spot-the-mistake",
  "build-the-rubric",
  "match-the-type",
  "ai-vs-human",
];

export default function SummaryPanel() {
  const { player, results, resetAll } = useChallenges();
  if (!player) return null;

  const completed = CHALLENGE_IDS.filter((id) => results[id]?.completed);
  const totalCorrect = completed.reduce((sum, id) => sum + results[id].correct, 0);
  const totalQuestions = completed.reduce((sum, id) => sum + results[id].total, 0);

  const badgeCounts: Record<Exclude<BadgeTier, null>, number> = {
    gold: 0,
    silver: 0,
    bronze: 0,
  };
  for (const id of completed) {
    const badge = badgeForScore(results[id].correct, results[id].total);
    if (badge) badgeCounts[badge]++;
  }

  const allDone = completed.length === CHALLENGE_IDS.length;

  return (
    <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-5 sm:p-6">
      <h2 className="font-heading text-lg font-semibold text-brand-purple">
        {allDone
          ? `Well done, ${player.name}!`
          : `Your progress so far, ${player.name}`}
      </h2>
      <p className="mt-1 text-sm text-brand-grey">
        {completed.length} / {CHALLENGE_IDS.length} challenges completed
        {totalQuestions > 0 && ` — ${totalCorrect}/${totalQuestions} correct overall`}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {(["gold", "silver", "bronze"] as const).map((tier) => (
          <span
            key={tier}
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-foreground"
          >
            <Medal
              className="size-4"
              style={{
                color: tier === "gold" ? "#B8860B" : tier === "silver" ? "#78848E" : "#F47D3A",
              }}
            />
            {badgeCounts[tier]} {BADGE_LABEL[tier]}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={resetAll}
        className="mt-5 flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
      >
        <RotateCcw className="size-3.5" /> Start over
      </button>
    </div>
  );
}
