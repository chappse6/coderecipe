import { ErrorTranslator } from "@/components/error-translator";
import Link from "next/link";

export const metadata = {
  title: "에러 번역기 - CodeRecipe",
  description: "Claude Code에서 나온 에러 메시지를 쉬운 한국어로 설명해 드려요.",
};

export default function ErrorTranslatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← 홈으로
        </Link>

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
            🔴 에러 번역기
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            에러 메시지,{" "}
            <span className="text-red-500 dark:text-red-400">쉽게 이해해요</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            에러 메시지를 붙여넣으면 한국어로 설명하고, Claude Code에 바로 쓸 수 있는
            해결 요청문을 만들어 드려요.
          </p>
        </div>

        <ErrorTranslator />
      </div>
    </main>
  );
}
