"use client";

import { useState } from "react";
import {
  PROJECT_TYPE_OPTIONS,
  FEATURES_BY_TYPE,
  buildClaudePrompt,
  type ProjectType,
  type ProjectTypeOption,
  type FeatureOption,
  type PromptBuilderInput,
} from "@coderecipe/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Step = "type" | "features" | "reference" | "result";

const STEP_ORDER: Step[] = ["type", "features", "reference", "result"];

function StepIndicator({ current }: { current: Step }) {
  const labels = ["유형 선택", "기능 선택", "참고 서비스", "프롬프트 완성"];
  const idx = STEP_ORDER.indexOf(current);
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i < idx
                ? "bg-purple-600 text-white"
                : i === idx
                  ? "bg-purple-600 text-white ring-2 ring-purple-300"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {i < idx ? "✓" : i + 1}
          </div>
          <span
            className={`hidden text-sm sm:block ${
              i === idx
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {label}
          </span>
          {i < labels.length - 1 && (
            <div
              className={`h-0.5 w-6 sm:w-10 ${i < idx ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Step 1: Project Type ──────────────────────────────────────────────────────

function StepType({
  selected,
  onSelect,
}: {
  selected: ProjectType | null;
  onSelect: (t: ProjectType) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        무엇을 만들고 싶나요?
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        가장 잘 맞는 유형을 골라보세요.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECT_TYPE_OPTIONS.map((option: ProjectTypeOption) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`rounded-xl border-2 p-5 text-left transition-all hover:border-purple-400 hover:shadow-md ${
              selected === option.value
                ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40"
                : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            <div className="mb-1 text-3xl">{option.emoji}</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {option.label}
            </div>
            <div className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Feature Checklist ─────────────────────────────────────────────────

function StepFeatures({
  projectType,
  selected,
  onToggle,
}: {
  projectType: ProjectType;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const features = FEATURES_BY_TYPE[projectType];
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        어떤 기능이 필요한가요?
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        필요한 기능을 모두 선택하세요. 나중에 추가도 가능해요.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature: FeatureOption) => {
          const checked = selected.includes(feature.value);
          return (
            <button
              key={feature.value}
              type="button"
              onClick={() => onToggle(feature.value)}
              className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all hover:border-purple-400 ${
                checked
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
            >
              <div
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                  checked
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-gray-400 bg-white dark:bg-gray-700"
                }`}
              >
                {checked && (
                  <svg
                    className="h-3 w-3"
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
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {feature.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 3: Reference Input ───────────────────────────────────────────────────

function StepReference({
  url,
  description,
  onUrlChange,
  onDescriptionChange,
  urlError,
}: {
  url: string;
  description: string;
  onUrlChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  urlError?: string;
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        비슷한 서비스가 있나요?
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        참고할 사이트 주소를 넣으면 더 정확한 결과를 얻을 수 있어요. 없어도
        괜찮아요!
      </p>

      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          참고 사이트 주소 (선택)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="예: https://www.naver.com"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 dark:bg-gray-800 dark:text-white ${urlError ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800" : "border-gray-300 focus:border-purple-500 focus:ring-purple-200 dark:border-gray-600 dark:focus:ring-purple-800"}`}
        />
        {urlError && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{urlError}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          추가로 하고 싶은 말 (선택)
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="예: 메인 색상은 초록색으로, 글씨는 크게 해주세요."
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-purple-800"
        />
      </div>
    </div>
  );
}

// ── Step 4: Result ────────────────────────────────────────────────────────────

function StepResult({
  prompt,
  onRestart,
}: {
  prompt: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        레시피 완성! 🎉
      </h2>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        아래 내용을 복사해서 Claude Code에 붙여넣으세요.
      </p>

      <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Claude Code 프롬프트
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              copied
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300"
            }`}
          >
            {copied ? "✓ 복사됨!" : "📋 복사하기"}
          </button>
        </div>
        <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap px-4 py-4 text-sm text-gray-800 dark:text-gray-200">
          {prompt}
        </pre>
      </div>

      <div className="rounded-lg bg-purple-50 px-4 py-3 text-sm text-purple-800 dark:bg-purple-950/40 dark:text-purple-200">
        💡 <strong>다음 단계:</strong> Claude Code를 열고 위 내용을 붙여넣으면
        AI가 코드를 만들어 줍니다.
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-4 text-sm text-gray-500 underline hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        처음부터 다시 만들기
      </button>
    </div>
  );
}

// ── Main Wizard ───────────────────────────────────────────────────────────────

export function PromptBuilder() {
  const [step, setStep] = useState<Step>("type");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [referenceUrl, setReferenceUrl] = useState("");
  const [description, setDescription] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [urlError, setUrlError] = useState("");

  const toggleFeature = (value: string) => {
    setFeatures((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const canAdvance = () => {
    if (step === "type") return projectType !== null;
    return true;
  };

  const advance = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (step === "reference") {
      // Generate prompt before showing result
      const input: PromptBuilderInput = {
        projectType: projectType!,
        features,
        referenceUrl: referenceUrl.trim() || undefined,
        description: description.trim() || undefined,
      };
      try {
        setGeneratedPrompt(buildClaudePrompt(input));
        setUrlError("");
      } catch (e) {
        setUrlError(e instanceof Error ? e.message : "URL을 확인해 주세요.");
        return;
      }
    }
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
    }
  };

  const back = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const restart = () => {
    setStep("type");
    setProjectType(null);
    setFeatures([]);
    setReferenceUrl("");
    setDescription("");
    setGeneratedPrompt("");
    setUrlError("");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator current={step} />

      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="sr-only">프롬프트 빌더</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-2">
          {step === "type" && (
            <StepType selected={projectType} onSelect={setProjectType} />
          )}
          {step === "features" && projectType && (
            <StepFeatures
              projectType={projectType}
              selected={features}
              onToggle={toggleFeature}
            />
          )}
          {step === "reference" && (
            <StepReference
              url={referenceUrl}
              description={description}
              onUrlChange={(v) => { setReferenceUrl(v); setUrlError(""); }}
              onDescriptionChange={setDescription}
              urlError={urlError}
            />
          )}
          {step === "result" && (
            <StepResult prompt={generatedPrompt} onRestart={restart} />
          )}

          {step !== "result" && (
            <div className="mt-8 flex justify-between">
              {step !== "type" ? (
                <Button variant="outline" onClick={back}>
                  ← 뒤로
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={advance}
                disabled={!canAdvance()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {step === "reference" ? "프롬프트 만들기 ✨" : "다음 →"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
