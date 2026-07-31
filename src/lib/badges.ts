export type BadgeTier = "gold" | "silver" | "bronze" | null;

// Confirmed thresholds — badges are awarded per challenge, based on the
// percentage of correct answers in that challenge.
export const BADGE_THRESHOLDS = { gold: 80, silver: 60, bronze: 40 } as const;

export function badgeForScore(correct: number, total: number): BadgeTier {
  if (total === 0) return null;
  const percent = (correct / total) * 100;
  if (percent >= BADGE_THRESHOLDS.gold) return "gold";
  if (percent >= BADGE_THRESHOLDS.silver) return "silver";
  if (percent >= BADGE_THRESHOLDS.bronze) return "bronze";
  return null;
}

export const BADGE_LABEL: Record<Exclude<BadgeTier, null>, string> = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};
