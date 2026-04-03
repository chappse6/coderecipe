"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Copy, Check, ExternalLink } from "lucide-react";
import { GLOSSARY_TERMS } from "@coderecipe/shared";

export function NavSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.plain.toLowerCase().includes(q) ||
        (t.analogy?.toLowerCase().includes(q) ?? false)
    ).slice(0, 5);
  }, [query]);

  const noResults = query.trim().length > 0 && results.length === 0;

  const claudePrompt = `"${query}"이(가) 무슨 뜻인지 쉬운 한국어로 설명해 줘. 비유도 하나 들어줘.`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(claudePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 transition-colors focus-within:border-amber-400 focus-within:bg-white dark:border-stone-600 dark:bg-stone-800 dark:focus-within:border-amber-400">
        <Search className="h-3.5 w-3.5 text-stone-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder="용어 검색..."
          className="w-28 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400 dark:text-stone-200 dark:placeholder:text-stone-500 sm:w-36"
        />
      </div>

      {/* Dropdown */}
      {open && (results.length > 0 || noResults) && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg dark:border-stone-600 dark:bg-stone-800">
          {results.length > 0 && (
            <ul>
              {results.map((term) => (
                <li key={term.id}>
                  <Link
                    href="/glossary"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block px-4 py-3 transition-colors hover:bg-stone-50 dark:hover:bg-stone-700"
                  >
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                      {term.term}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
                      {term.plain}
                    </p>
                  </Link>
                </li>
              ))}
              <li className="border-t border-stone-100 dark:border-stone-700">
                <Link
                  href="/glossary"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-orange-500 transition-colors hover:bg-stone-50 dark:text-amber-400 dark:hover:bg-stone-700"
                >
                  <ExternalLink className="h-3 w-3" />
                  용어 사전에서 더 보기
                </Link>
              </li>
            </ul>
          )}

          {noResults && (
            <div className="px-4 py-4">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                <strong className="text-stone-700 dark:text-stone-200">&quot;{query}&quot;</strong>에
                해당하는 용어가 아직 레시피 사전에 없어요.
              </p>
              <p className="mt-3 text-xs font-medium text-stone-600 dark:text-stone-300">
                Claude Code에게 물어보세요:
              </p>
              <div className="mt-2 rounded-lg bg-stone-50 px-3 py-2.5 dark:bg-stone-900">
                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                  {claudePrompt}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  copied
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-recipe-primary text-stone-800 hover:bg-recipe-primary-hover"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" /> 복사됨
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> 프롬프트 복사하기
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
