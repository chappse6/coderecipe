"use client";

import { useState, useMemo } from "react";
import { GLOSSARY_TERMS, GLOSSARY_TAGS, type GlossaryTerm } from "@coderecipe/shared";
import { Card, CardContent } from "@/components/ui/card";

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700">
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap items-start gap-2">
          <h3 className="font-bold text-gray-900 dark:text-white">{term.term}</h3>
          {term.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{term.plain}</p>
        {term.analogy && (
          <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
            💡 <strong>비유:</strong> {term.analogy}
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-purple-800"
        />
      </div>

      {/* Tag Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GLOSSARY_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-400 dark:text-gray-500">
          &quot;{query}&quot;에 해당하는 용어가 없어요.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((term) => (
            <GlossaryCard key={term.id} term={term} />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
        총 {GLOSSARY_TERMS.length}개 용어 수록 · 더 알고 싶은 용어가 있으면 알려주세요!
      </p>
    </div>
  );
}
