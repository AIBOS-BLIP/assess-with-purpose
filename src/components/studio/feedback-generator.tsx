"use client";

import { useId, useMemo, useState } from "react";
import { AlertTriangle, Check, Clipboard, Download } from "lucide-react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import ConfirmResetButton from "./confirm-reset-button";

interface FeedbackInputs {
  scope: "Individual" | "General";
  name: string;
  wentWell: string;
  toImprove: string;
  evidence: string;
  nextStep: string;
  tone: "Encouraging" | "Direct" | "Formal";
  detail: "Brief" | "Detailed";
}

const initialInputs: FeedbackInputs = {
  scope: "Individual",
  name: "",
  wentWell: "",
  toImprove: "",
  evidence: "",
  nextStep: "",
  tone: "Encouraging",
  detail: "Detailed",
};

function buildFeedback(inputs: FeedbackInputs): string {
  const greeting =
    inputs.scope === "Individual"
      ? `Hi ${inputs.name.trim() || "[student name]"},`
      : "Dear all,";

  const opener: Record<FeedbackInputs["tone"], string> = {
    Encouraging: "Thank you for your submission — here are some thoughts on your work.",
    Direct: "Here is your feedback, structured by strength and area for improvement.",
    Formal: "Please find feedback on your submission outlined below.",
  };

  const wentWellLine: Record<FeedbackInputs["tone"], string> = {
    Encouraging: `You did well here: ${inputs.wentWell.trim() || "[what went well]"}`,
    Direct: `Strength: ${inputs.wentWell.trim() || "[what went well]"}`,
    Formal: `The following was executed effectively: ${inputs.wentWell.trim() || "[what went well]"}`,
  };

  const improveLine: Record<FeedbackInputs["tone"], string> = {
    Encouraging: `An area to develop further: ${inputs.toImprove.trim() || "[area to improve]"}`,
    Direct: `Area for improvement: ${inputs.toImprove.trim() || "[area to improve]"}`,
    Formal: `The following area requires further development: ${inputs.toImprove.trim() || "[area to improve]"}`,
  };

  const evidenceLine = inputs.evidence.trim()
    ? `For example: "${inputs.evidence.trim()}"`
    : "";

  const nextStepLine: Record<FeedbackInputs["tone"], string> = {
    Encouraging: `A practical next step: ${inputs.nextStep.trim() || "[next step]"}`,
    Direct: `Next step: ${inputs.nextStep.trim() || "[next step]"}`,
    Formal: `It is recommended that the following action be taken: ${inputs.nextStep.trim() || "[next step]"}`,
  };

  const closing: Record<FeedbackInputs["tone"], string> = {
    Encouraging: "Keep up the good work, and feel free to come and discuss this further.",
    Direct: "Come to office hours if you'd like to discuss this in more detail.",
    Formal: "Please contact the module coordinator should you require clarification.",
  };

  const lines = [greeting, "", opener[inputs.tone], "", wentWellLine[inputs.tone]];

  if (inputs.detail === "Detailed" && evidenceLine) {
    lines.push(evidenceLine);
  }

  lines.push("", improveLine[inputs.tone]);

  if (inputs.detail === "Detailed") {
    lines.push("", nextStepLine[inputs.tone]);
  } else {
    lines.push(nextStepLine[inputs.tone]);
  }

  lines.push("", closing[inputs.tone]);

  return lines.join("\n");
}

export default function FeedbackGenerator() {
  const idPrefix = useId();
  const [inputs, setInputs, hydrated] = useLocalStorageState<FeedbackInputs>(
    "awp:studio:feedback-generator",
    initialInputs
  );
  const [copied, setCopied] = useState(false);

  const generated = useMemo(() => buildFeedback(inputs), [inputs]);

  function update<K extends keyof FeedbackInputs>(key: K, value: FeedbackInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function handleCopy() {
    navigator.clipboard?.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "draft-feedback.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-brand-grey">
        This tool assembles a structured feedback draft from what you enter
        below — it does not invent content about a student&apos;s work. Use
        anonymised or placeholder names in any examples.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Feedback scope
          </label>
          <select
            value={inputs.scope}
            onChange={(e) => update("scope", e.target.value as FeedbackInputs["scope"])}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <option>Individual</option>
            <option>General</option>
          </select>
        </div>
        {inputs.scope === "Individual" && (
          <div>
            <label
              htmlFor={`${idPrefix}-name`}
              className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
            >
              Student name (or placeholder)
            </label>
            <input
              id={`${idPrefix}-name`}
              value={inputs.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Student A"
              className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
            />
          </div>
        )}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Tone
          </label>
          <select
            value={inputs.tone}
            onChange={(e) => update("tone", e.target.value as FeedbackInputs["tone"])}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <option>Encouraging</option>
            <option>Direct</option>
            <option>Formal</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Level of detail
          </label>
          <select
            value={inputs.detail}
            onChange={(e) => update("detail", e.target.value as FeedbackInputs["detail"])}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <option>Brief</option>
            <option>Detailed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`${idPrefix}-wentwell`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            What the student did well
          </label>
          <textarea
            id={`${idPrefix}-wentwell`}
            value={inputs.wentWell}
            onChange={(e) => update("wentWell", e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-improve`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            What needs improvement
          </label>
          <textarea
            id={`${idPrefix}-improve`}
            value={inputs.toImprove}
            onChange={(e) => update("toImprove", e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-evidence`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            Evidence from the student&apos;s work (optional quote or example)
          </label>
          <textarea
            id={`${idPrefix}-evidence`}
            value={inputs.evidence}
            onChange={(e) => update("evidence", e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-nextstep`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            A practical next step
          </label>
          <textarea
            id={`${idPrefix}-nextstep`}
            value={inputs.nextStep}
            onChange={(e) => update("nextStep", e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
      </div>

      <div className="rounded-lg border border-black/10 bg-black/[0.02] p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-purple">
          Draft feedback
        </p>
        <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">{generated}</pre>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-accent-orange/40 bg-accent-orange/5 p-3 text-xs text-foreground">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-orange" />
        <p>
          This draft must be reviewed and edited by you before it is shared
          with a student. It is assembled only from what you typed above —
          nothing here has been checked against the student&apos;s actual work.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 pt-4">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
          {copied ? "Copied" : "Copy draft"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Download className="size-3.5" /> Download
        </button>
        <ConfirmResetButton onConfirm={() => setInputs(initialInputs)} />
        {!hydrated && <span className="text-xs text-brand-grey">Loading…</span>}
      </div>
    </div>
  );
}
