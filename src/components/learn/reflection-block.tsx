"use client";

import { useEffect, useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";

interface ReflectionBlockProps {
  moduleId: string;
  prompt: string;
  onSave: (hasContent: boolean) => void;
}

export default function ReflectionBlock({
  moduleId,
  prompt,
  onSave,
}: ReflectionBlockProps) {
  const storageKey = `awp:reflection:${moduleId}`;
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage, unavailable during SSR — an
    // intentional exception to react-hooks/set-state-in-effect.
    try {
      const stored = window.localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setText(stored);
    } catch {
      // localStorage unavailable — reflection just won't persist.
    }
  }, [storageKey]);

  function handleSave() {
    try {
      window.localStorage.setItem(storageKey, text);
    } catch {
      // Ignore — best-effort persistence only.
    }
    setSavedAt(new Date().toLocaleTimeString());
    onSave(text.trim().length > 0);
  }

  function handleCopy() {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${moduleId}-reflection.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground">{prompt}</p>
      <label htmlFor={`reflection-${moduleId}`} className="sr-only">
        Your reflection
      </label>
      <textarea
        id={`reflection-${moduleId}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Write your thoughts here..."
        className="w-full rounded-lg border border-black/15 p-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
      />
      <p className="text-xs text-brand-grey">
        Your reflection is saved only in this browser — it is not sent
        anywhere or seen by anyone else.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-brand-purple px-4 py-1.5 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Save locally
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          {copied ? <Check className="size-3.5" /> : <Clipboard className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1 rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-brand-grey hover:border-brand-purple hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          <Download className="size-3.5" />
          Download
        </button>
        {savedAt && (
          <span className="text-xs text-brand-teal">Saved at {savedAt}</span>
        )}
      </div>
    </div>
  );
}
