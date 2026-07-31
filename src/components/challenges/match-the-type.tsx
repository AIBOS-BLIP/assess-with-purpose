"use client";

import ChallengeClassify from "./challenge-classify";

const categories = [
  "Formative",
  "Summative",
  "Assessment for Learning",
  "Assessment of Learning",
  "Assessment as Learning",
];

const items = [
  {
    text: "A weekly ungraded quiz used to check understanding as the module progresses.",
    correctCategory: "Formative",
    explanation: "Low-stakes and ongoing — a classic formative assessment.",
  },
  {
    text: "A final exam that counts towards the module mark.",
    correctCategory: "Summative",
    explanation: "High-stakes, end-of-instruction — a classic summative assessment.",
  },
  {
    text: "Students track their own progress against a shared rubric throughout the term.",
    correctCategory: "Assessment for Learning",
    explanation: "Students actively use ongoing evidence to guide their own progress towards standards.",
  },
  {
    text: "A graded essay used only to assign a final mark, with minimal feedback given.",
    correctCategory: "Assessment of Learning",
    explanation: "Focused on evaluating and grading what's already been learned, not on informing further learning.",
  },
  {
    text: "Students mark their own draft against model answers and revise before submitting.",
    correctCategory: "Assessment as Learning",
    explanation: "Student-driven self-assessment and self-regulation — the hallmark of AaL.",
  },
  {
    text: "A national board exam required for professional registration.",
    correctCategory: "Summative",
    explanation: "High-stakes, used for a placement/qualification decision.",
  },
  {
    text: "In-class polling to check who is following the lecture right now.",
    correctCategory: "Formative",
    explanation: "Informal, in-the-moment, diagnostic rather than graded.",
  },
  {
    text: "Peer feedback used by students to revise their own thinking before resubmission.",
    correctCategory: "Assessment as Learning",
    explanation: "Students are actively regulating and improving their own learning through the process.",
  },
];

export default function MatchTheType() {
  return (
    <ChallengeClassify
      challengeId="match-the-type"
      categories={categories}
      items={items}
    />
  );
}
