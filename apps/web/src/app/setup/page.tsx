import { EnvironmentChecker } from "@/components/environment-checker";
import { Nav } from "@/components/layout/nav";
import { NextStepCta } from "@/components/layout/next-step-cta";
import Link from "next/link";

export const metadata = {
  title: "환경 진단 - CodeRecipe",
  description:
    "Claude Code 사용을 위한 필수 프로그램 설치 여부를 확인하고 설치 방법을 안내받으세요.",
};

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              환경 진단
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              Claude Code를 사용하려면 몇 가지 프로그램이 필요해요. 어떤 것이
              설치되어 있는지 확인해 볼게요.
            </p>
          </div>

          <EnvironmentChecker />

          <div className="mt-8">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              낯선 단어가 나오면?{" "}
              <Link
                href="/glossary"
                className="font-medium text-orange-500 hover:underline dark:text-amber-400"
              >
                개발 용어 사전 보기
              </Link>
            </p>
          </div>

          <NextStepCta
            href="/direction"
            label="방향 잡기"
            hint="설치가 끝났다면, 뭘 만들지 같이 정리해 볼까요?"
          />
        </div>
      </div>
    </div>
  );
}
