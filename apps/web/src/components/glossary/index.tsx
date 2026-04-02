"use client";

import { useState, useMemo } from "react";
import { GLOSSARY_TERMS, GLOSSARY_TAGS, type GlossaryTerm } from "@coderecipe/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Card className="border border-stone-200 shadow-sm transition-shadow hover:shadow-md dark:border-stone-700">
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap items-start gap-2">
          <h3 className="font-semibold text-stone-800 dark:text-white">
            {term.term}
          </h3>
          {term.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-stone-700 dark:text-stone-300">{term.plain}</p>
        {term.analogy && (
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-amber-800 dark:text-amber-300">
              <strong>비유:</strong> {term.analogy}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function Glossary() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchTag = activeTag === "전체" || t.tags.includes(activeTag);
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.plain.toLowerCase().includes(q) ||
        (t.analogy?.toLowerCase().includes(q) ?? false);
      return matchTag && matchQuery;
    });
  }, [query, activeTag]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="용어 검색 (예: 터미널, 배포, Git...)"
          className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:border-stone-600 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
        />
      </div>

      {/* Tag Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GLOSSARY_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-amber-400 text-stone-800"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-stone-400 dark:text-stone-500">
          &quot;{query}&quot;에 해당하는 용어가 없어요.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((term) => (
            <GlossaryCard key={term.id} term={term} />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-stone-400 dark:text-stone-500">
        총 {GLOSSARY_TERMS.length}개 용어 수록
      </p>
    </div>
  );
}
