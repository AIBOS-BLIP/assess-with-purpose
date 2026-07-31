"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import clsx from "clsx";
import ConfirmResetButton from "./confirm-reset-button";

const CATEGORIES = [
  "Learning outcome",
  "Teaching activity",
  "Assessment method",
  "Feedback method",
  "Evidence of learning",
] as const;

type Category = (typeof CATEGORIES)[number];

interface DesignItem {
  id: string;
  text: string;
  correctCategory: Category;
}

const ITEMS: DesignItem[] = [
  {
    id: "1",
    text: "Students will be able to critically evaluate primary historical sources.",
    correctCategory: "Learning outcome",
  },
  {
    id: "2",
    text: "A weekly seminar discussing how to interpret and question primary sources.",
    correctCategory: "Teaching activity",
  },
  {
    id: "3",
    text: "A source-analysis essay submitted at the end of the module.",
    correctCategory: "Assessment method",
  },
  {
    id: "4",
    text: "Written comments returned within two weeks, referencing the marking rubric.",
    correctCategory: "Feedback method",
  },
  {
    id: "5",
    text: "The essay shows the student can identify bias in a primary source.",
    correctCategory: "Evidence of learning",
  },
  {
    id: "6",
    text: "Students will be able to apply an appropriate statistical test to a real dataset.",
    correctCategory: "Learning outcome",
  },
  {
    id: "7",
    text: "A lab session practising the statistical software on sample data.",
    correctCategory: "Teaching activity",
  },
  {
    id: "8",
    text: "A short data-analysis report submitted after the lab series.",
    correctCategory: "Assessment method",
  },
  {
    id: "9",
    text: "A live in-class discussion of common errors, before resubmission is allowed.",
    correctCategory: "Feedback method",
  },
  {
    id: "10",
    text: "The report correctly applies the chosen statistical test to the dataset.",
    correctCategory: "Evidence of learning",
  },
];

export default function DragDropActivity() {
  const [assignments, setAssignments] = useState<Record<string, Category | "">>(
    Object.fromEntries(ITEMS.map((i) => [i.id, ""]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [dragOverCategory, setDragOverCategory] = useState<Category | null>(null);

  function assign(itemId: string, category: Category | "") {
    setAssignments((prev) => ({ ...prev, [itemId]: category }));
  }

  function handleDrop(category: Category, e: React.DragEvent) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) assign(itemId, category);
    setDragOverCategory(null);
  }

  function handleReset() {
    setAssignments(Object.fromEntries(ITEMS.map((i) => [i.id, ""])));
    setSubmitted(false);
  }

  const allAssigned = ITEMS.every((i) => assignments[i.id]);
  const correctCount = ITEMS.filter(
    (i) => assignments[i.id] === i.correctCategory
  ).length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-brand-grey">
          Sort each element of an assessment design into the stage it belongs
          to. Drag a card into a category, or use its dropdown — both do the
          same thing, so use whichever is easiest (dropdown works best with a
          keyboard, screen reader, or touch screen).
        </p>
      </div>

      <div className="grid gap-3">
        {ITEMS.filter((item) => !assignments[item.id]).map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/15 bg-white p-3 text-sm shadow-sm"
          >
            <span className="flex-1">{item.text}</span>
            <label className="sr-only" htmlFor={`assign-${item.id}`}>
              Assign &ldquo;{item.text}&rdquo; to a category
            </label>
            <select
              id={`assign-${item.id}`}
              value=""
              onChange={(e) => assign(item.id, e.target.value as Category)}
              className="rounded-md border border-black/15 px-2 py-1 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
            >
              <option value="" disabled>
                Move to category…
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        ))}
        {ITEMS.every((item) => assignments[item.id]) && (
          <p className="rounded-lg border border-dashed border-black/15 p-4 text-center text-sm text-brand-grey">
            All items sorted — check your answers below.
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const itemsHere = ITEMS.filter((i) => assignments[i.id] === category);
          return (
            <div
              key={category}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverCategory(category);
              }}
              onDragLeave={() => setDragOverCategory(null)}
              onDrop={(e) => handleDrop(category, e)}
              className={clsx(
                "min-h-[140px] rounded-lg border-2 border-dashed p-3 transition-colors",
                dragOverCategory === category
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-black/15"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple">
                {category}
              </p>
              <div className="mt-2 space-y-2">
                {itemsHere.map((item) => {
                  const isCorrect = item.correctCategory === category;
                  return (
                    <div
                      key={item.id}
                      className={clsx(
                        "rounded-md border p-2 text-xs",
                        submitted
                          ? isCorrect
                            ? "border-brand-teal bg-brand-teal/10"
                            : "border-accent-red bg-accent-red/10"
                          : "border-black/10 bg-black/[0.02]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>{item.text}</span>
                        {submitted && (
                          <span className="shrink-0">
                            {isCorrect ? (
                              <Check className="size-3.5 text-brand-teal" />
                            ) : (
                              <X className="size-3.5 text-accent-red" />
                            )}
                          </span>
                        )}
                      </div>
                      {submitted && !isCorrect && (
                        <p className="mt-1 text-brand-grey">
                          This belongs under &ldquo;{item.correctCategory}&rdquo;.
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => assign(item.id, "")}
                        className="mt-1 text-brand-grey underline hover:text-brand-purple print:hidden"
                      >
                        Move back
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-black/10 pt-4">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAssigned}
          className="rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Check my answers
        </button>
        {submitted && (
          <p className="font-heading text-sm font-semibold text-brand-purple">
            {correctCount} / {ITEMS.length} correct
          </p>
        )}
        <ConfirmResetButton onConfirm={handleReset} />
      </div>
    </div>
  );
}
