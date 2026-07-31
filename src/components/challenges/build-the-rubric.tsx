"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import { useChallenges } from "./challenge-context";

interface Pair {
  criterion: string;
  options: { text: string; strong: boolean }[];
  explanation: string;
}

const PAIRS: Pair[] = [
  {
    criterion: "Argument quality",
    options: [
      { text: "Good argument.", strong: false },
      {
        text: "Presents a clear, well-structured argument supported by at least three relevant sources, with counterarguments addressed.",
        strong: true,
      },
    ],
    explanation: "The stronger descriptor is specific and observable — a marker can check for it consistently.",
  },
  {
    criterion: "Referencing",
    options: [
      {
        text: "A small number of references are missing or incorrectly formatted.",
        strong: true,
      },
      { text: "Bad referencing.", strong: false },
    ],
    explanation: "The stronger descriptor describes exactly what 'bad' looks like, so different markers would agree on it.",
  },
  {
    criterion: "Structure",
    options: [
      { text: "Structure is nice.", strong: false },
      {
        text: "Structure is generally clear, with minor lapses in paragraph transitions.",
        strong: true,
      },
    ],
    explanation: "'Nice' isn't measurable — the stronger version names the specific quality and its limits.",
  },
  {
    criterion: "Originality",
    options: [
      { text: "Highly original — 9/10.", strong: false },
      {
        text: "Demonstrates original thinking by applying course concepts to a novel context, beyond examples covered in class.",
        strong: true,
      },
    ],
    explanation: "A bare number doesn't tell students what originality looked like — the descriptor should.",
  },
];

export default function BuildTheRubric() {
  const { recordResult } = useChallenges();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  function choose(pairIndex: number, optionIndex: number) {
    setAnswers((prev) => {
      if (prev[pairIndex] !== undefined) return prev;
      const next = { ...prev, [pairIndex]: optionIndex };
      if (Object.keys(next).length === PAIRS.length) {
        const correct = PAIRS.filter(
          (pair, i) => pair.options[next[i]].strong
        ).length;
        recordResult("build-the-rubric", correct, PAIRS.length);
      }
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
        For each criterion, choose the descriptor that follows good
        rubric-writing practice.
      </p>
      {PAIRS.map((pair, pairIndex) => {
        const chosen = answers[pairIndex];
        const isAnswered = chosen !== undefined;
        return (
          <div key={pair.criterion} className="rounded-lg border border-black/10 p-3 sm:p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple">
              {pair.criterion}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {pair.options.map((option, optionIndex) => {
                const isChosen = chosen === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    onClick={() => choose(pairIndex, optionIndex)}
                    disabled={isAnswered}
                    className={clsx(
                      "flex items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors",
                      isAnswered
                        ? isChosen
                          ? option.strong
                            ? "border-brand-teal bg-brand-teal/10"
                            : "border-accent-red bg-accent-red/10"
                          : option.strong
                            ? "border-brand-teal/60"
                            : "border-black/10 opacity-50"
                        : "border-black/15 hover:border-brand-purple hover:bg-brand-purple/5"
                    )}
                  >
                    {isAnswered && (
                      <span className="mt-0.5 shrink-0">
                        {option.strong ? (
                          <Check className="size-4 text-brand-teal" />
                        ) : isChosen ? (
                          <X className="size-4 text-accent-red" />
                        ) : null}
                      </span>
                    )}
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p className="mt-2 rounded-md bg-black/[0.03] p-2 text-xs text-brand-grey">
                {pair.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
