import type { Metadata } from "next";
import Link from "next/link";
import { PromptBuilder } from "@/components/prompt-builder";

export const metadata: Metadata = {
  title: "레시피 만들기 | CodeRecipe",
  description: "간단한 질문에 답하면 Claude Code 프롬프트가 완성됩니다.",
};

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          >
            ← CodeRecipe 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            나만의 레시피 만들기 🍳
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            몇 가지 질문에 답하면 바로 사용할 수 있는 Claude Code 레시피가 완성됩니다.
          </p>
        </div>

        <PromptBuilder />
      </div>
    </main>
  );
}
