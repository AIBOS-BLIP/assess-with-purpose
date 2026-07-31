"use client";

import { useId } from "react";
import { Check, Clipboard, Download, Plus, Printer, Trash2 } from "lucide-react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import ConfirmResetButton from "./confirm-reset-button";
import { useState } from "react";

interface RubricLevel {
  id: string;
  name: string;
  points: number;
}

interface RubricCriterion {
  id: string;
  name: string;
  weight: number;
  descriptors: Record<string, string>;
}

interface RubricData {
  title: string;
  learningOutcome: string;
  levels: RubricLevel[];
  criteria: RubricCriterion[];
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function defaultRubric(): RubricData {
  const levelIds = [makeId(), makeId(), makeId(), makeId()];
  const levelNames = ["Excellent", "Good", "Satisfactory", "Needs Improvement"];
  const levelPoints = [4, 3, 2, 1];
  const levels: RubricLevel[] = levelIds.map((id, i) => ({
    id,
    name: levelNames[i],
    points: levelPoints[i],
  }));
  const criteriaNames = ["Content and understanding", "Structure and organisation", "Use of evidence"];
  const criteria: RubricCriterion[] = criteriaNames.map((name) => ({
    id: makeId(),
    name,
    weight: 0,
    descriptors: Object.fromEntries(levelIds.map((id) => [id, ""])),
  }));
  return { title: "", learningOutcome: "", levels, criteria };
}

function toPlainText(data: RubricData): string {
  const lines: string[] = [];
  lines.push(data.title || "Untitled rubric");
  if (data.learningOutcome) lines.push(`Learning outcome: ${data.learningOutcome}`);
  lines.push("");
  for (const criterion of data.criteria) {
    lines.push(`${criterion.name} (${criterion.weight}%)`);
    for (const level of data.levels) {
      const text = criterion.descriptors[level.id] || "—";
      lines.push(`  ${level.name} (${level.points} pts): ${text}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function toCSV(data: RubricData): string {
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const header = ["Criterion", "Weight (%)", ...data.levels.map((l) => `${l.name} (${l.points} pts)`)];
  const rows = data.criteria.map((c) => [
    c.name,
    String(c.weight),
    ...data.levels.map((l) => c.descriptors[l.id] || ""),
  ]);
  return [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}

export default function RubricBuilder() {
  const [data, setData, hydrated] = useLocalStorageState<RubricData>(
    "awp:studio:rubric",
    defaultRubric()
  );
  const [copied, setCopied] = useState(false);
  const idPrefix = useId();

  const totalWeight = data.criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);

  function addCriterion() {
    setData((prev) => ({
      ...prev,
      criteria: [
        ...prev.criteria,
        {
          id: makeId(),
          name: "New criterion",
          weight: 0,
          descriptors: Object.fromEntries(prev.levels.map((l) => [l.id, ""])),
        },
      ],
    }));
  }

  function removeCriterion(id: string) {
    setData((prev) => ({ ...prev, criteria: prev.criteria.filter((c) => c.id !== id) }));
  }

  function addLevel() {
    const id = makeId();
    setData((prev) => ({
      ...prev,
      levels: [...prev.levels, { id, name: "New level", points: 0 }],
      criteria: prev.criteria.map((c) => ({
        ...c,
        descriptors: { ...c.descriptors, [id]: "" },
      })),
    }));
  }

  function removeLevel(id: string) {
    setData((prev) => ({
      ...prev,
      levels: prev.levels.filter((l) => l.id !== id),
      criteria: prev.criteria.map((c) => ({
        ...c,
        descriptors: Object.fromEntries(
          Object.entries(c.descriptors).filter(([levelId]) => levelId !== id)
        ),
      })),
    }));
  }

  function handleCopy() {
    navigator.clipboard?.writeText(toPlainText(data)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownloadCSV() {
    const blob = new Blob([toCSV(data)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.title || "rubric").replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    setData(defaultRubric());
  }

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <p className="text-sm text-brand-grey">
          Build a rubric with your own criteria and performance levels. Your
          work is saved automatically in this browser.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-title`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            Assessment title
          </label>
          <input
            id={`${idPrefix}-title`}
            value={data.title}
            onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Second-year research essay"
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-outcome`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            Learning outcome
          </label>
          <input
            id={`${idPrefix}-outcome`}
            value={data.learningOutcome}
            onChange={(e) => setData((p) => ({ ...p, learningOutcome: e.target.value }))}
            placeholder="e.g. Critically evaluate primary sources"
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-black/10">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-brand-purple/5">
              <th className="min-w-[180px] border-b border-r border-black/10 p-2 text-left align-bottom">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
                  Criterion / Weight
                </span>
              </th>
              {data.levels.map((level) => (
                <th
                  key={level.id}
                  className="min-w-[180px] border-b border-r border-black/10 p-2 align-bottom last:border-r-0"
                >
                  <div className="flex items-center gap-1">
                    <input
                      value={level.name}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          levels: prev.levels.map((l) =>
                            l.id === level.id ? { ...l, name: e.target.value } : l
                          ),
                        }))
                      }
                      aria-label="Performance level name"
                      className="w-full rounded border border-black/15 px-2 py-1 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-brand-purple"
                    />
                    <button
                      type="button"
                      onClick={() => removeLevel(level.id)}
                      aria-label={`Remove ${level.name} level`}
                      className="shrink-0 rounded p-1 text-brand-grey hover:text-accent-red print:hidden"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <input
                    type="number"
                    value={level.points}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        levels: prev.levels.map((l) =>
                          l.id === level.id ? { ...l, points: Number(e.target.value) } : l
                        ),
                      }))
                    }
                    aria-label="Points for this level"
                    className="mt-1 w-16 rounded border border-black/15 px-2 py-1 text-xs focus-visible:outline-2 focus-visible:outline-brand-purple"
                  />
                  <span className="ml-1 text-xs text-brand-grey">pts</span>
                </th>
              ))}
              <th className="w-10 border-b border-black/10 p-2 print:hidden" />
            </tr>
          </thead>
          <tbody>
            {data.criteria.map((criterion) => (
              <tr key={criterion.id} className="align-top">
                <td className="border-b border-r border-black/10 p-2">
                  <input
                    value={criterion.name}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        criteria: prev.criteria.map((c) =>
                          c.id === criterion.id ? { ...c, name: e.target.value } : c
                        ),
                      }))
                    }
                    aria-label="Criterion name"
                    className="w-full rounded border border-black/15 px-2 py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-brand-purple"
                  />
                  <div className="mt-1 flex items-center gap-1">
                    <input
                      type="number"
                      value={criterion.weight}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          criteria: prev.criteria.map((c) =>
                            c.id === criterion.id
                              ? { ...c, weight: Number(e.target.value) }
                              : c
                          ),
                        }))
                      }
                      aria-label="Weight percentage"
                      className="w-16 rounded border border-black/15 px-2 py-1 text-xs focus-visible:outline-2 focus-visible:outline-brand-purple"
                    />
                    <span className="text-xs text-brand-grey">% weight</span>
                  </div>
                </td>
                {data.levels.map((level) => (
                  <td key={level.id} className="border-b border-r border-black/10 p-2 last:border-r-0">
                    <textarea
                      value={criterion.descriptors[level.id] || ""}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          criteria: prev.criteria.map((c) =>
                            c.id === criterion.id
                              ? {
                                  ...c,
                                  descriptors: {
                                    ...c.descriptors,
                                    [level.id]: e.target.value,
                                  },
                                }
                              : c
                          ),
                        }))
                      }
                      rows={3}
                      placeholder="Describe this level of performance..."
                      aria-label={`Descriptor for ${criterion.name} at ${level.name}`}
                      className="w-full resize-y rounded border border-black/15 px-2 py-1 text-xs focus-visible:outline-2 focus-visible:outline-brand-purple"
                    />
                  </td>
                ))}
                <td className="border-b border-black/10 p-2 print:hidden">
                  <button
                    type="button"
                    onClick={() => removeCriterion(criterion.id)}
                    aria-label={`Remove ${criterion.name} criterion`}
                    className="rounded p-1 text-brand-grey hover:text-accent-red"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addCriterion}
            className="flex items-center gap-1.5 rounded-full border border-brand-purple px-4 py-1.5 text-xs font-semibold text-brand-purple hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <Plus className="size-3.5" /> Add criterion
          </button>
          <button
            type="button"
            onClick={addLevel}
            className="flex items-center gap-1.5 rounded-full border border-brand-purple px-4 py-1.5 text-xs font-semibold text-brand-purple hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <Plus className="size-3.5" /> Add performance level
          </button>
        </div>
        <p
          className={
            totalWeight === 100
              ? "text-xs font-medium text-brand-teal"
              : "text-xs font-medium text-accent-orange"
          }
        >
          Total weight: {totalWeight}%{totalWeight !== 100 && " (should total 100%)"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 pt-4 print:hidden">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
          {copied ? "Copied" : "Copy as text"}
        </button>
        <button
          type="button"
          onClick={handleDownloadCSV}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Download className="size-3.5" /> Download CSV
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Printer className="size-3.5" /> Print / Save as PDF
        </button>
        <ConfirmResetButton onConfirm={handleReset} />
        {!hydrated && (
          <span className="text-xs text-brand-grey">Loading saved rubric…</span>
        )}
      </div>
    </div>
  );
}
