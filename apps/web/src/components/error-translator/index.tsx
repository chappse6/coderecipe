"use client";

import { useState } from "react";
import { translateError, ERROR_PATTERNS } from "@coderecipe/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COMMON_EXAMPLES = [
  "ENOENT: no such file or directory, open '/app/config.json'",
  "Error: listen EADDRINUSE: address already in use :::3000",
  "Cannot find module 'react'",
  "SyntaxError: Unexpected token '}'",
  "TypeError: Cannot read properties of undefined (reading 'map')",
];

export function ErrorTranslator() {
  const [errorInput, setErrorInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof translateError> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    if (!errorInput.trim()) return;
    setResult(translateError(errorInput));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.suggestedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExample = (example: string) => {
    setErrorInput(example);
    setResult(translateError(example));
    setCopied(false);
  };

  const handleReset = () => {
    setErrorInput("");
    setResult(null);
    setCopied(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Input Section */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            에러 메시지를 붙여넣으세요
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder={`예시:\nERROR in ./src/index.js\nSyntaxError: Unexpected token '{'`}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-mono outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-red-900 resize-none"
          />

          {/* Example chips */}
          <div className="mt-3 mb-4">
            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">자주 나오는 에러 예시:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => handleExample(ex)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-950"
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
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              🔍 에러 번역하기
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
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Explanation */}
          <Card className="border-0 shadow-md">
            <CardContent className="px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-lg dark:bg-red-950">
                  {result.matched ? "🔴" : "❓"}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    {result.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Prompt */}
          <Card className="border-0 shadow-md">
            <CardContent className="px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-gray-900 dark:text-white">
                  💬 Claude Code에게 이렇게 말하세요
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    copied
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {copied ? "✓ 복사됨!" : "📋 복사하기"}
                </button>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 dark:bg-gray-900 dark:border-gray-700">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
                  {result.suggestedPrompt}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Hint */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300">
            💡 <strong>사용법:</strong> 위 내용을 복사해서 Claude Code 채팅창에 붙여넣으면 AI가 해결 방법을 알려줍니다.
          </div>
        </div>
      )}

      {/* Common Patterns Reference */}
      {!result && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-gray-700 dark:text-gray-300">
              📖 자주 나오는 에러 모음
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-2">
              {ERROR_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 px-4 py-2.5 dark:border-gray-700"
                >
                  <span className="mt-0.5 text-base">🔴</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
