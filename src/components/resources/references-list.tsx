"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAllReferences } from "@/lib/resources-data";

export default function ReferencesList() {
  const [query, setQuery] = useState("");
  const allReferences = useMemo(() => getAllReferences(), []);

  const filtered = allReferences.filter((ref) =>
    `${ref.text} ${ref.moduleTitle}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-grey"
        />
        <label htmlFor="reference-search" className="sr-only">
          Search references
        </label>
        <input
          id="reference-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search references by author, year or module…"
          className="w-full rounded-lg border border-black/15 py-2 pl-9 pr-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        />
      </div>

      <p className="text-xs text-brand-grey">
        {filtered.length} of {allReferences.length} references
      </p>

      <ul className="space-y-3">
        {filtered.map((ref, i) => (
          <li key={i} className="rounded-lg border border-black/10 p-3 text-sm">
            <p className="text-foreground">{ref.text}</p>
            <p className="mt-1 text-xs font-medium text-brand-purple">
              Used in: {ref.moduleTitle}
            </p>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-lg border border-dashed border-black/15 p-4 text-center text-sm text-brand-grey">
            No references match &ldquo;{query}&rdquo;.
          </p>
        )}
      </ul>
    </div>
  );
}
