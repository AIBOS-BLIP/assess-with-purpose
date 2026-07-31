"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import { useChallenges } from "./challenge-context";

const SCENARIO =
  "A lecturer sets a single 3-hour closed-book exam worth 100% of the final grade for a module whose learning outcome is 'design and critique a research study'. Students receive their overall mark six weeks after the module ends, with no comments.";

interface Option {
  id: string;
  text: string;
  isMistake: boolean;
  explanation: string;
}

const OPTIONS: Option[] = [
  {
    id: "alignment",
    text: "The assessment method doesn't match the learning outcome — designing and critiquing a study is hard to demonstrate in a closed-book exam.",
    isMistake: true,
    explanation: "This is a constructive alignment problem: the method doesn't let students demonstrate the actual outcome.",
  },
  {
    id: "weighting",
    text: "100% weighting on a single assessment is high-stakes, with no earlier opportunity for formative feedback.",
    isMistake: true,
    explanation: "A single high-stakes assessment gives students no chance to learn from feedback before it counts.",
  },
  {
    id: "feedback",
    text: "Feedback arrives six weeks after the module has ended, with no comments — students can't use it to improve.",
    isMistake: true,
    explanation: "By the time feedback arrives, there's no opportunity left to act on it, and there are no comments to learn from anyway.",
  },
  {
    id: "closedbook",
    text: "Closed-book exams are inherently unfair and should never be used.",
    isMistake: false,
    explanation: "This overgeneralises — closed-book exams can be entirely appropriate for outcomes involving recall or applying memorised procedures. The problem here is the mismatch with this specific outcome, not the format itself.",
  },
  {
    id: "duration",
    text: "Three hours is too long for any exam.",
    isMistake: false,
    explanation: "Exam length depends on the outcome and content — there's no fixed rule that three hours is inherently wrong.",
  },
];

export default function SpotTheMistake() {
  const { recordResult } = useChallenges();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    const correct = OPTIONS.filter(
      (o) => selected.includes(o.id) === o.isMistake
    ).length;
    recordResult("spot-the-mistake", correct, OPTIONS.length);
    setSubmitted(true);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-black/[0.03] p-3 text-sm text-foreground">
        {SCENARIO}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
        Tick every statement below that identifies a genuine design mistake.
      </p>
      <div className="space-y-2">
        {OPTIONS.map((option) => {
          const isChecked = selected.includes(option.id);
          const gotItRight = submitted && isChecked === option.isMistake;
          return (
            <label
              key={option.id}
              className={clsx(
                "flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm",
                submitted
                  ? gotItRight
                    ? "border-brand-teal bg-brand-teal/10"
                    : "border-accent-red bg-accent-red/10"
                  : "border-black/10 hover:border-brand-purple/50"
              )}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option.id)}
                disabled={submitted}
                className="mt-0.5 size-4 shrink-0 accent-brand-purple"
              />
              <span>
                <span className="block">{option.text}</span>
                {submitted && (
                  <span className="mt-1 flex items-start gap-1 text-xs text-brand-grey">
                    {option.isMistake ? (
                      <Check className="mt-0.5 size-3.5 shrink-0 text-brand-teal" />
                    ) : (
                      <X className="mt-0.5 size-3.5 shrink-0 text-accent-red" />
                    )}
                    {option.explanation}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Check my answers
        </button>
      ) : (
        <p className="font-heading text-sm font-semibold text-brand-purple">
          {OPTIONS.filter((o) => selected.includes(o.id) === o.isMistake).length} /{" "}
          {OPTIONS.length} correct
        </p>
      )}
    </div>
  );
}
