"use client";

import { Clipboard, Download, Printer, Check } from "lucide-react";
import { useState } from "react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import ConfirmResetButton from "./confirm-reset-button";

interface ChecklistState {
  checked: Record<string, boolean>;
  notes: Record<string, string>;
}

const CHECKLIST_ITEMS: { id: string; category: string; label: string }[] = [
  {
    id: "alignment",
    category: "Constructive alignment",
    label: "The assessment task is aligned with the module's stated learning outcomes.",
  },
  {
    id: "clarity",
    category: "Clarity of instructions",
    label: "Instructions clearly explain what students need to do and how it will be marked.",
  },
  {
    id: "method",
    category: "Appropriate assessment method",
    label: "The assessment method suits the learning outcome being tested.",
  },
  {
    id: "fairness",
    category: "Fairness",
    label: "All students have an equal opportunity to demonstrate their learning.",
  },
  {
    id: "inclusivity",
    category: "Inclusivity",
    label: "The assessment avoids unnecessary cultural, linguistic or contextual barriers.",
  },
  {
    id: "accessibility",
    category: "Accessibility",
    label: "The assessment is usable by students with disabilities, or reasonable alternatives are available.",
  },
  {
    id: "workload",
    category: "Workload",
    label: "The time required is reasonable relative to its weighting and the rest of the module.",
  },
  {
    id: "reliability",
    category: "Marking reliability",
    label: "A rubric or marking guide is in place to support consistent marking.",
  },
  {
    id: "feedback",
    category: "Feedback",
    label: "There is a clear plan for how and when feedback will be provided.",
  },
  {
    id: "integrity",
    category: "Academic integrity",
    label: "The task design reduces opportunities for plagiarism or contract cheating.",
  },
  {
    id: "ai",
    category: "Responsible AI use",
    label: "Expectations for permitted or prohibited AI use are clearly stated to students.",
  },
  {
    id: "technical",
    category: "Technical requirements",
    label: "Any required technology or platform has been tested and is accessible to all students.",
  },
];

const initialState: ChecklistState = {
  checked: Object.fromEntries(CHECKLIST_ITEMS.map((i) => [i.id, false])),
  notes: Object.fromEntries(CHECKLIST_ITEMS.map((i) => [i.id, ""])),
};

export default function AssessmentChecklist() {
  const [state, setState, hydrated] = useLocalStorageState<ChecklistState>(
    "awp:studio:checklist",
    initialState
  );
  const [copied, setCopied] = useState(false);

  const completedCount = CHECKLIST_ITEMS.filter((i) => state.checked[i.id]).length;
  const percent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  function toggle(id: string) {
    setState((prev) => ({
      ...prev,
      checked: { ...prev.checked, [id]: !prev.checked[id] },
    }));
  }

  function updateNote(id: string, value: string) {
    setState((prev) => ({ ...prev, notes: { ...prev.notes, [id]: value } }));
  }

  function toPlainText() {
    return CHECKLIST_ITEMS.map((item) => {
      const mark = state.checked[item.id] ? "[x]" : "[ ]";
      const note = state.notes[item.id];
      return `${mark} ${item.category}: ${item.label}${note ? `\n    Note: ${note}` : ""}`;
    }).join("\n");
  }

  function handleCopy() {
    navigator.clipboard?.writeText(toPlainText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([toPlainText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assessment-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    setState(initialState);
  }

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <p className="text-sm text-brand-grey">
          Work through this checklist before finalising an assessment. Saved
          automatically in this browser as you go.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-brand-teal transition-all duration-300"
              style={{ width: `${hydrated ? percent : 0}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-brand-teal">
            {hydrated ? percent : 0}% complete
          </span>
        </div>
      </div>

      <ul className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-black/10 p-3 sm:p-4"
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={state.checked[item.id] || false}
                onChange={() => toggle(item.id)}
                className="mt-0.5 size-4 shrink-0 accent-brand-teal"
              />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-brand-purple">
                  {item.category}
                </span>
                <span className="block text-sm text-foreground">{item.label}</span>
              </span>
            </label>
            <textarea
              value={state.notes[item.id] || ""}
              onChange={(e) => updateNote(item.id, e.target.value)}
              placeholder="Optional note..."
              rows={1}
              className="mt-2 w-full resize-y rounded-md border border-black/10 px-2 py-1 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple print:hidden"
            />
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 pt-4 print:hidden">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
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
        <ConfirmResetButton onConfirm={handleReset} />
      </div>
    </div>
  );
}
