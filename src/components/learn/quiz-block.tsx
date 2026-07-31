"use client";

import { useState } from "react";
import clsx from "clsx";
import type { QuizQuestion } from "@/lib/module-content";

interface QuizBlockProps {
  questions: QuizQuestion[];
  onComplete: (scorePercent: number) => void;
}

export default function QuizBlock({ questions, onComplete }: QuizBlockProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (questions.length === 0) {
    return (
      <p className="text-sm text-brand-grey">
        [QUIZ QUESTIONS REQUIRED — a short formative quiz for this module is
        coming soon.]
      </p>
    );
  }

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  function handleSubmit() {
    setSubmitted(true);
    onComplete(scorePercent);
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => {
        const selected = answers[qIndex];
        return (
          <fieldset key={qIndex} className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">
              {qIndex + 1}. {q.question}
            </legend>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => {
                const isSelected = selected === oIndex;
                const isCorrect = oIndex === q.correctIndex;
                const showState = submitted && isSelected;
                return (
                  <label
                    key={oIndex}
                    className={clsx(
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                      submitted
                        ? isCorrect
                          ? "border-brand-teal bg-brand-teal/10"
                          : showState
                            ? "border-accent-red bg-accent-red/10"
                            : "border-black/10"
                        : isSelected
                          ? "border-brand-purple bg-brand-purple/5"
                          : "border-black/10 hover:border-brand-purple/50"
                    )}
                  >
                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      className="accent-brand-purple"
                      checked={isSelected ?? false}
                      disabled={submitted}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))
                      }
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            {submitted && (
              <p className="rounded-md bg-black/[0.03] p-2 text-xs text-brand-grey">
                {q.explanation}
              </p>
            )}
          </fieldset>
        );
      })}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Check my answers
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-brand-purple/5 p-4">
          <p className="font-heading text-lg font-semibold text-brand-purple">
            You scored {correctCount} / {questions.length}
          </p>
          <p className="text-sm text-brand-grey">
            {scorePercent === 100
              ? "Excellent work — you've got this."
              : "Nice effort — have another go whenever you're ready."}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto rounded-full border border-brand-purple px-4 py-1.5 text-sm font-semibold text-brand-purple hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
