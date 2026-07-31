"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import type { InteractiveActivity } from "@/lib/module-content";

interface ClassifyActivityProps {
  activity: InteractiveActivity;
  onComplete: () => void;
}

export default function ClassifyActivity({
  activity,
  onComplete,
}: ClassifyActivityProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  function handleAnswer(itemIndex: number, category: string) {
    setAnswers((prev) => {
      if (prev[itemIndex]) return prev; // already answered — keep it locked in
      const next = { ...prev, [itemIndex]: category };
      if (Object.keys(next).length === activity.items.length) {
        onComplete();
      }
      return next;
    });
  }

  function handleReset() {
    setAnswers({});
  }

  const correctCount = activity.items.filter(
    (item, i) => answers[i] === item.correctCategory
  ).length;
  const allAnswered = Object.keys(answers).length === activity.items.length;

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground">{activity.instructions}</p>

      <div className="space-y-4">
        {activity.items.map((item, itemIndex) => {
          const answer = answers[itemIndex];
          const isAnswered = Boolean(answer);
          const isCorrect = answer === item.correctCategory;

          return (
            <div
              key={itemIndex}
              className="rounded-lg border border-black/10 p-3 sm:p-4"
            >
              <p className="text-sm text-foreground">{item.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activity.categories.map((category) => {
                  const isChosen = answer === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleAnswer(itemIndex, category)}
                      disabled={isAnswered}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple",
                        isAnswered
                          ? isChosen
                            ? isCorrect
                              ? "border-brand-teal bg-brand-teal/10 text-brand-teal"
                              : "border-accent-red bg-accent-red/10 text-accent-red"
                            : category === item.correctCategory
                              ? "border-brand-teal/60 text-brand-teal"
                              : "border-black/10 text-brand-grey opacity-50"
                          : "border-black/15 text-foreground hover:border-brand-purple hover:text-brand-purple"
                      )}
                    >
                      {isAnswered && isChosen && (
                        <span className="mr-1 inline-flex align-middle">
                          {isCorrect ? (
                            <Check className="size-3" />
                          ) : (
                            <X className="size-3" />
                          )}
                        </span>
                      )}
                      {category}
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className="mt-2 rounded-md bg-black/[0.03] p-2 text-xs text-brand-grey">
                  {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-brand-purple/5 p-4">
          <p className="font-heading text-base font-semibold text-brand-purple">
            {correctCount} / {activity.items.length} correct
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="ml-auto rounded-full border border-brand-purple px-4 py-1.5 text-sm font-semibold text-brand-purple hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
