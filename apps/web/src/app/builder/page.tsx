import type { Metadata } from "next";
import { PromptBuilder } from "@/components/prompt-builder";
import { Nav } from "@/components/layout/nav";
import { NextStepCta } from "@/components/layout/next-step-cta";

export const metadata: Metadata = {
  title: "레시피 만들기 | CodeRecipe",
  description: "간단한 질문에 답하면 Claude Code 프롬프트가 완성됩니다.",
};

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              레시피 만들기
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              몇 가지 질문에 답하면 바로 사용할 수 있는 Claude Code 레시피가
              완성됩니다.
            </p>
          </div>

            <PromptBuilder />

          <NextStepCta
            href="/error-translator"
            label="에러 번역기"
            hint="만들다 에러가 나면 여기서 한국어로 번역해 드려요."
          />
        </div>
      </div>
    </div>
  );
}
