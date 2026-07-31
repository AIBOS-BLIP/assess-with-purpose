"use client";

import { useId, useState } from "react";
import { Clipboard, Download, Trash2 } from "lucide-react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import { modules } from "@/lib/modules";

interface JournalEntry {
  id: string;
  date: string;
  topic: string;
  text: string;
}

const PROMPTS = [
  "What went well in your assessment practice this week, and why?",
  "What would you do differently next time, and what's stopping you from trying it now?",
  "Where did students seem confused about what was expected of them?",
  "How did you use feedback (yours or a student's) to change something?",
];

export default function ReflectionJournal() {
  const idPrefix = useId();
  const [entries, setEntries] = useLocalStorageState<JournalEntry[]>(
    "awp:studio:journal",
    []
  );
  const [topic, setTopic] = useState("General reflection");
  const [text, setText] = useState("");
  const [promptIndex] = useState(() => Math.floor(Math.random() * PROMPTS.length));

  function handleSave() {
    if (!text.trim()) return;
    const entry: JournalEntry = {
      id: Math.random().toString(36).slice(2, 9),
      date: new Date().toLocaleDateString(),
      topic,
      text: text.trim(),
    };
    setEntries((prev) => [entry, ...prev]);
    setText("");
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleCopy(entry: JournalEntry) {
    navigator.clipboard?.writeText(`${entry.date} — ${entry.topic}\n\n${entry.text}`);
  }

  function handleDownload(entry: JournalEntry) {
    const blob = new Blob([`${entry.date} — ${entry.topic}\n\n${entry.text}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reflection-${entry.date.replace(/\//g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-brand-grey">
        A private space to reflect on your assessment practice. Entries are
        saved only in this browser — they are not sent anywhere.
      </p>

      <div className="rounded-lg border border-black/10 p-4 sm:p-5">
        <p className="text-sm italic text-brand-purple">
          Prompt: {PROMPTS[promptIndex]}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor={`${idPrefix}-topic`} className="sr-only">
              Topic
            </label>
            <select
              id={`${idPrefix}-topic`}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
            >
              <option>General reflection</option>
              {modules.map((m) => (
                <option key={m.id} value={m.title}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor={`${idPrefix}-text`} className="sr-only">
          Your reflection
        </label>
        <textarea
          id={`${idPrefix}-text`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Write freely here..."
          className="mt-3 w-full rounded-lg border border-black/15 p-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!text.trim()}
          className="mt-3 rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Save entry
        </button>
      </div>

      {entries.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Saved entries ({entries.length})
          </p>
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-black/10 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-brand-grey">
                  {entry.date} — <span className="text-brand-purple">{entry.topic}</span>
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(entry)}
                    aria-label="Copy entry"
                    className="rounded p-1.5 text-brand-grey hover:text-brand-purple"
                  >
                    <Clipboard className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(entry)}
                    aria-label="Download entry"
                    className="rounded p-1.5 text-brand-grey hover:text-brand-purple"
                  >
                    <Download className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    aria-label="Delete entry"
                    className="rounded p-1.5 text-brand-grey hover:text-accent-red"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
