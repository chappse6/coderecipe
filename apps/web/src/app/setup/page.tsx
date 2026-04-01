import { EnvironmentChecker } from "@/components/environment-checker";
import Link from "next/link";

export const metadata = {
  title: "환경 진단 - CodeRecipe",
  description: "Claude Code 사용을 위한 필수 프로그램 설치 여부를 확인하고 설치 방법을 안내받으세요.",
};

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-purple-600 hover:underline dark:text-purple-400">
            ← 홈으로
          </Link>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            🔧 환경 진단
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Claude Code를 사용하려면 몇 가지 프로그램이 필요해요.
            어떤 것이 설치되어 있는지 확인해 볼게요!
          </p>
        </div>

        <EnvironmentChecker />

        {/* Glossary link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            낯선 단어가 나오면?{" "}
            <Link href="/glossary" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
              개발 용어 사전 보기 →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
