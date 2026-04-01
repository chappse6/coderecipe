import { Glossary } from "@/components/glossary";
import Link from "next/link";

export const metadata = {
  title: "개발 용어 사전 - CodeRecipe",
  description: "개발 용어를 쉬운 한국어로 설명하는 1인 개발자 용어 사전이에요.",
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-purple-600 hover:underline dark:text-purple-400">
            ← 홈으로
          </Link>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            📚 개발 용어 사전
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            개발 용어가 어렵게 느껴지시나요? 일상적인 비유로 쉽게 설명해 드릴게요.
          </p>
        </div>

        <Glossary />

        {/* Setup link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            환경 설정이 필요하신가요?{" "}
            <Link href="/setup" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
              환경 진단 시작하기 →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
