"use client";

import { useId, useState } from "react";
import { Check, Clipboard, Download, Printer } from "lucide-react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import ConfirmResetButton from "./confirm-reset-button";

interface PlannerField {
  key: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
}

const FIELDS: PlannerField[] = [
  { key: "courseInfo", label: "Course / module information", type: "text", placeholder: "e.g. BIOL 201, Semester 2" },
  { key: "learningOutcomes", label: "Learning outcomes being assessed", type: "textarea" },
  { key: "purpose", label: "Assessment purpose", type: "textarea", placeholder: "Why are you assessing this, and what decision will the result inform?" },
  { key: "assessmentType", label: "Assessment type", type: "text", placeholder: "e.g. essay, practical exam, portfolio" },
  {
    key: "classification",
    label: "Formative or summative?",
    type: "select",
    options: ["Formative", "Summative", "Both"],
  },
  { key: "instructions", label: "Assessment instructions", type: "textarea" },
  { key: "evidence", label: "Evidence of learning expected", type: "textarea" },
  { key: "alignment", label: "Alignment with learning outcomes", type: "textarea" },
  { key: "feedbackApproach", label: "Feedback approach", type: "textarea", placeholder: "How and when will feedback be given?" },
  { key: "fairnessInclusion", label: "Fairness and inclusion considerations", type: "textarea" },
  { key: "digitalAI", label: "Digital or AI considerations", type: "textarea" },
  { key: "timeline", label: "Timeline", type: "text", placeholder: "Set date, submission date, feedback date" },
  { key: "weighting", label: "Weighting", type: "text", placeholder: "e.g. 30% of final module mark" },
  { key: "resources", label: "Required resources", type: "textarea" },
];

type PlannerData = Record<string, string>;

const initialData: PlannerData = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));

function toPlainText(data: PlannerData): string {
  return FIELDS.map((f) => `${f.label}:\n${data[f.key] || "—"}`).join("\n\n");
}

export default function AssessmentPlanner() {
  const idPrefix = useId();
  const [data, setData, hydrated] = useLocalStorageState<PlannerData>(
    "awp:studio:planner",
    initialData
  );
  const [copied, setCopied] = useState(false);

  function update(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleCopy() {
    navigator.clipboard?.writeText(toPlainText(data)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([toPlainText(data)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assessment-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-brand-grey print:hidden">
        Work through each field to build a complete assessment plan. Saved
        automatically in this browser.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = `${idPrefix}-${field.key}`;
          const wide = field.type === "textarea";
          return (
            <div key={field.key} className={wide ? "sm:col-span-2" : ""}>
              <label
                htmlFor={id}
                className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  value={data[field.key] || ""}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                />
              ) : field.type === "select" ? (
                <select
                  id={id}
                  value={data[field.key] || ""}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                >
                  <option value="">Select…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  value={data[field.key] || ""}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 pt-4 print:hidden">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
          {copied ? "Copied" : "Copy plan"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Download className="size-3.5" /> Download
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Printer className="size-3.5" /> Print
        </button>
        <ConfirmResetButton onConfirm={() => setData(initialData)} />
        {!hydrated && <span className="text-xs text-brand-grey">Loading saved plan…</span>}
      </div>
    </div>
  );
}
