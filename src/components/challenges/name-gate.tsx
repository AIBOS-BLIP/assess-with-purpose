"use client";

import { useId, useState } from "react";
import { useChallenges } from "./challenge-context";

export default function NameGate() {
  const idPrefix = useId();
  const { setPlayer } = useChallenges();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !surname.trim()) return;
    setPlayer({ name: name.trim(), surname: surname.trim() });
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-heading text-xl font-semibold text-brand-purple">
        Before you start
      </h2>
      <p className="mt-2 text-sm text-brand-grey">
        Enter your name so we can personalise your badges and completion
        summary. This is stored only in your browser — it is not sent
        anywhere or shared with anyone.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-surname`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
          >
            Surname
          </label>
          <input
            id={`${idPrefix}-surname`}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        >
          Start the Challenges
        </button>
      </form>
    </div>
  );
}
