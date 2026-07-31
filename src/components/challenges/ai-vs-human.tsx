"use client";

import ChallengeClassify from "./challenge-classify";

const categories = [
  "Specific and actionable",
  "Too generic to be useful",
  "Needs human verification",
];

const items = [
  {
    text: "\"Great job! Well done.\"",
    correctCategory: "Too generic to be useful",
    explanation: "No actionable information — the student doesn't know what to keep doing or improve.",
  },
  {
    text: "\"Nice work overall.\"",
    correctCategory: "Too generic to be useful",
    explanation: "Positive but empty — nothing to act on next time.",
  },
  {
    text: "\"Consider adding a topic sentence to paragraph 2, similar to the strong example in paragraph 4.\"",
    correctCategory: "Specific and actionable",
    explanation: "Points to a specific location, a specific fix, and a model to follow.",
  },
  {
    text: "\"Your use of headings makes the structure easy to follow — keep this for your next assignment.\"",
    correctCategory: "Specific and actionable",
    explanation: "Names the specific strength and tells the student to repeat it.",
  },
  {
    text: "\"Your citation of Smith (2020) misrepresents their conclusion.\"",
    correctCategory: "Needs human verification",
    explanation: "This is a factual claim about a source — only someone with subject expertise can confirm whether it's actually true before it reaches a student.",
  },
  {
    text: "\"This calculation in step 3 appears to contain an arithmetic error.\"",
    correctCategory: "Needs human verification",
    explanation: "A plausible-sounding claim about correctness that must be checked by a person who understands the maths, not taken on faith.",
  },
];

export default function AiVsHuman() {
  return (
    <ChallengeClassify
      challengeId="ai-vs-human"
      categories={categories}
      items={items}
      closingNote="Whether feedback like this comes from an AI tool or a busy human, the same rule applies: specific and actionable is good practice, and any claim about accuracy needs a human with subject expertise to verify it before a student sees it."
    />
  );
}
