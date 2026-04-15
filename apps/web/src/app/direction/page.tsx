import { DirectionGuide } from "@/components/direction-guide";
import { Nav } from "@/components/layout/nav";

export const metadata = {
  title: "방향 잡기 - CodeRecipe",
  description:
    "Claude Code 플러그인(gstack + superpowers)으로 아이디어를 정리하고 단계별 계획까지 잡는 워크플로우 가이드.",
};

export default function DirectionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              방향 잡기
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              만들고 싶은 게 있는데 어디서부터 시작해야 할지 모르겠나요? 두 개의
              플러그인으로 같이 정리해 봐요.
            </p>
          </div>

          <DirectionGuide />
        </div>
      </div>
    </div>
  );
}
