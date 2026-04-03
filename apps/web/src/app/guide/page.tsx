import { ClaudeGuide } from "@/components/claude-guide";
import { Nav } from "@/components/layout/nav";

export const metadata = {
  title: "Claude Code 가이드 - CodeRecipe",
  description:
    "비개발자를 위한 Claude Code 사용법. 자주 쓰는 명령어, 단축키, 승인 요청 대응법까지.",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              Claude Code 가이드
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              처음이라 어렵게 느껴지시나요? 꼭 알아야 할 것만 모았어요.
            </p>
          </div>

          <ClaudeGuide />
        </div>
      </div>
    </div>
  );
}
