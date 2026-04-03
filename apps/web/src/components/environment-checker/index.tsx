"use client";

import { useState } from "react";
import {
  OS_OPTIONS,
  DEV_TOOLS,
  type OsType,
  type OsOption,
  type DevTool,
} from "@coderecipe/shared";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ── OS Selector ──────────────────────────────────────────────────────────────

function OsSelector({
  selected,
  onSelect,
}: {
  selected: OsType | null;
  onSelect: (os: OsType) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-stone-800 dark:text-stone-100">
        어떤 컴퓨터를 쓰고 계신가요?
      </h2>
      <p className="mb-6 text-stone-500 dark:text-stone-400">
        운영 체제를 선택하면 딱 맞는 설치 방법을 안내해 드려요.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {OS_OPTIONS.map((opt: OsOption) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`rounded-lg border-2 p-5 text-center transition-all hover:border-stone-400 hover:shadow-sm ${
              selected === opt.value
                ? "border-stone-800 bg-stone-50 dark:border-stone-300 dark:bg-stone-700"
                : "border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-800"
            }`}
          >
            <div className="mb-2 text-4xl">{opt.emoji}</div>
            <div className="font-semibold text-stone-800 dark:text-stone-100">
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Tool Card ────────────────────────────────────────────────────────────────

function ToolCard({
  tool,
  os,
  checked,
  onToggle,
}: {
  tool: DevTool;
  os: OsType;
  checked: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const guide = tool.installGuide[os];

  return (
    <div
      className={`rounded-lg border-2 p-4 transition-all ${
        checked
          ? "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950/30"
          : "border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            checked
              ? "border-green-500 bg-green-500 text-white"
              : "border-stone-300 bg-white dark:bg-stone-700"
          }`}
          aria-label={checked ? "설치됨으로 표시" : "미설치로 표시"}
        >
          {checked && (
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-stone-800 dark:text-stone-100">
                {tool.name}
              </span>
              {tool.required && (
                <span className="ml-2 rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  필수
                </span>
              )}
            </div>
            {!checked && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex-shrink-0 rounded bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
              >
                {expanded ? "닫기 ▲" : "설치 방법 ▼"}
              </button>
            )}
          </div>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            {tool.description}
          </p>

          <div className="mt-2">
            <p className="text-xs text-stone-400 dark:text-stone-500">
              확인 방법: 터미널에서 입력
            </p>
            <code className="mt-0.5 block rounded bg-stone-100 px-2 py-1 text-xs font-mono text-stone-700 dark:bg-stone-700 dark:text-stone-200">
              {tool.checkCommand[os]}
            </code>
          </div>

          {!checked && expanded && (
            <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-stone-600 dark:bg-stone-800/50">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                설치 방법
              </p>
              <ol className="space-y-3">
                {guide.map((s) => (
                  <li key={s.step} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-recipe-primary text-xs font-bold text-stone-800">
                      {s.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                        {s.detail}
                      </p>
                      {s.command && (
                        <code className="mt-1 block rounded bg-stone-800 px-2 py-1 text-xs font-mono text-green-300">
                          $ {s.command}
                        </code>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ checked, total }: { checked: number; total: number }) {
  const pct = Math.round((checked / total) * 100);
  return (
    <div className="mb-6">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-stone-700 dark:text-stone-300">
          설치 완료 {checked}/{total}
        </span>
        <span className="font-bold text-amber-600 dark:text-amber-400">
          {pct}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
        <div
          className="h-2 rounded-full bg-recipe-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function EnvironmentChecker() {
  const [os, setOs] = useState<OsType | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleTool = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const allDone = checkedCount === DEV_TOOLS.length;

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border border-stone-200 shadow-sm dark:border-stone-700">
        <CardHeader className="pb-2">
          <CardTitle className="sr-only">환경 진단</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-2">
          <OsSelector selected={os} onSelect={setOs} />

          {os && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-stone-800 dark:text-stone-100">
                필요한 프로그램 확인
              </h3>
              <ProgressBar checked={checkedCount} total={DEV_TOOLS.length} />
              <div className="space-y-3">
                {DEV_TOOLS.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    os={os}
                    checked={!!checked[tool.id]}
                    onToggle={() => toggleTool(tool.id)}
                  />
                ))}
              </div>

              {allDone && (
                <div className="mt-6 text-center">
                  <p className="font-bold text-stone-800 dark:text-stone-100">
                    환경 설정 완료
                  </p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    이제 Claude Code로 앱을 만들 준비가 됐어요.
                  </p>
                  <Button
                    className="mt-4 bg-recipe-primary text-stone-800 hover:bg-recipe-primary-hover"
                    asChild
                  >
                    <Link href="/builder">프롬프트 만들러 가기 →</Link>
                  </Button>
                </div>
              )}

              {!allDone && (
                <p className="mt-4 text-center text-sm text-stone-400 dark:text-stone-500">
                  설치가 완료된 항목을 체크해 주세요. 설치 방법이 필요하면
                  &quot;설치 방법&quot; 버튼을 누르세요.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
