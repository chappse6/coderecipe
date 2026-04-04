"use client";

import { useRef, useState } from "react";
import { translateError, ERROR_PATTERNS } from "@coderecipe/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  Info,
  List,
} from "lucide-react";

const COMMON_EXAMPLES = [
  "ENOENT: no such file or directory, open '/app/config.json'",
  "Error: listen EADDRINUSE: address already in use :::3000",
  "Cannot find module 'react'",
  "SyntaxError: Unexpected token '}'",
  "TypeError: Cannot read properties of undefined (reading 'map')",
];

export function ErrorTranslator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [errorInput, setErrorInput] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<ReturnType<typeof translateError> | null>(
    null
  );
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleTranslate = () => {
    if (!errorInput.trim()) return;
    setResult(translateError(errorInput, context));
    setCopied(false);
    setHasCopied(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.suggestedPrompt);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExample = (example: string) => {
    setErrorInput(example);
    setResult(translateError(example, context));
    setCopied(false);
    setHasCopied(false);
  };

  const handleReset = () => {
    setErrorInput("");
    setContext("");
    setResult(null);
    setCopied(false);
    setHasCopied(false);
  };

  return (
    <div>
      {/* Input Section */}
      <Card className="mb-6 border border-stone-200 shadow-sm dark:border-stone-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800 dark:text-stone-100">
            에러 메시지를 붙여넣으세요
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder={`예시:\nERROR in ./src/index.js\nSyntaxError: Unexpected token '{'`}
            rows={5}
            className="w-full resize-none rounded-lg border border-stone-200 px-4 py-3 text-sm font-mono outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-stone-200 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:focus:ring-amber-900"
          />

          <div className="mb-4 mt-3">
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300">
              어떤 작업을 하다가 이 에러가 났나요?
              <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-normal text-stone-400 dark:bg-stone-700 dark:text-stone-500">
                선택사항
              </span>
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="예: npm install 실행 중 / Next.js 빌드할 때 / 로그인 버튼 클릭 시"
              className="mb-1.5 w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-stone-200 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:focus:ring-amber-900"
            />
            <p className="text-xs text-stone-400 dark:text-stone-500">
              상황을 적으면 Claude Code가 더 정확한 해결 방법을 알려줘요
            </p>
          </div>

          <div className="mb-4 border-t border-stone-100 pt-4 dark:border-stone-700">
            <p className="mb-2 text-xs text-stone-400 dark:text-stone-500">
              자주 나오는 에러 예시:
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => handleExample(ex)}
                  className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-100 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-400 dark:hover:bg-stone-600"
                >
                  {ex.length > 40 ? ex.slice(0, 40) + "…" : ex}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleTranslate}
              disabled={!errorInput.trim()}
              className="flex-1 gap-2 bg-recipe-primary text-stone-800 shadow-sm hover:bg-recipe-primary-hover"
            >
              <Search className="h-4 w-4" />
              에러 번역하기
            </Button>
            {result && (
              <Button variant="outline" onClick={handleReset}>
                초기화
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result Section */}
      {result && (
        <div ref={resultRef} className="animate-in fade-in space-y-4 duration-300">
          {/* Explanation */}
          <Card className="border border-stone-200 shadow-sm dark:border-stone-700">
            <CardContent className="px-6 py-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
                <div>
                  <p className="mb-1 font-semibold text-stone-800 dark:text-stone-100">
                    {result.title}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Prompt */}
          <Card className="border border-stone-200 shadow-sm dark:border-stone-700">
            <CardContent className="px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-stone-400" />
                  <p className="font-semibold text-stone-800 dark:text-stone-100">
                    Claude Code에게 이렇게 말하세요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    copied
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : `bg-recipe-primary text-stone-800 hover:bg-recipe-primary-hover${hasCopied ? "" : " animate-pulse-subtle"}`
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" /> 복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> 복사하기
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-700 dark:bg-stone-900">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                  {result.suggestedPrompt}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Hint */}
          <div className="flex items-start gap-2 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-400">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-400" />
            <p>
              위 내용을 복사해서 Claude Code 채팅창에 붙여넣으면 AI가 해결
              방법을 알려줍니다.
            </p>
          </div>
        </div>
      )}

      {/* Common Patterns Reference */}
      {!result && (
        <Card className="border border-stone-200 shadow-sm dark:border-stone-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
              <List className="h-4 w-4" />
              자주 나오는 에러 모음
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-2">
              {ERROR_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 rounded-lg border border-stone-200 px-4 py-2.5 dark:border-stone-700"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-400" />
                  <div>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                      {p.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
