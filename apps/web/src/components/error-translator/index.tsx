"use client";

import { useState } from "react";
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
  const [errorInput, setErrorInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof translateError> | null>(
    null
  );
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
      <Card className="mb-6 border border-gray-200 shadow-sm dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            에러 메시지를 붙여넣으세요
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder={`예시:\nERROR in ./src/index.js\nSyntaxError: Unexpected token '{'`}
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm font-mono outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-gray-800"
          />

          <div className="mb-4 mt-3">
            <p className="mb-2 text-xs text-gray-400 dark:text-gray-500">
              자주 나오는 에러 예시:
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => handleExample(ex)}
                  className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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
              className="flex-1 gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
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
        <div className="animate-in fade-in space-y-4 duration-300">
          {/* Explanation */}
          <Card className="border border-gray-200 shadow-sm dark:border-gray-800">
            <CardContent className="px-6 py-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
                <div>
                  <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                    {result.title}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Prompt */}
          <Card className="border border-gray-200 shadow-sm dark:border-gray-800">
            <CardContent className="px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Claude Code에게 이렇게 말하세요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    copied
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  {result.suggestedPrompt}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Hint */}
          <div className="flex items-start gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <p>
              위 내용을 복사해서 Claude Code 채팅창에 붙여넣으면 AI가 해결
              방법을 알려줍니다.
            </p>
          </div>
        </div>
      )}

      {/* Common Patterns Reference */}
      {!result && (
        <Card className="border border-gray-200 shadow-sm dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <List className="h-4 w-4" />
              자주 나오는 에러 모음
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-2">
              {ERROR_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 px-4 py-2.5 dark:border-gray-800"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
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
