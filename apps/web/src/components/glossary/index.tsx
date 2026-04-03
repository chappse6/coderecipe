"use client";

import { useState, useMemo } from "react";
import { GLOSSARY_TERMS, GLOSSARY_TAGS, type GlossaryTerm } from "@coderecipe/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Copy, Check } from "lucide-react";

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
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
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

function NoResultsPrompt({ query }: { query: string }) {
  const [copied, setCopied] = useState(false);
  const prompt = `"${query}"이(가) 무슨 뜻인지 쉬운 한국어로 설명해 줘. 비유도 하나 들어줘.`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <p className="text-stone-500 dark:text-stone-400">
        <strong className="text-stone-700 dark:text-stone-200">&quot;{query}&quot;</strong>에
        해당하는 용어가 아직 레시피 사전에 없어요.
      </p>
      <p className="mt-4 text-sm font-medium text-stone-600 dark:text-stone-300">
        Claude Code에게 물어보세요:
      </p>
      <div className="mt-3 rounded-lg bg-stone-50 px-4 py-3 text-left dark:bg-stone-800">
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {prompt}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          copied
            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
            : "bg-recipe-primary text-stone-800 hover:bg-recipe-primary-hover"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" /> 복사됨
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> 프롬프트 복사하기
          </>
        )}
      </button>
    </div>
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
          className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-stone-200 dark:border-stone-600 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
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
                ? "bg-recipe-primary text-stone-800"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <NoResultsPrompt query={query} />
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
